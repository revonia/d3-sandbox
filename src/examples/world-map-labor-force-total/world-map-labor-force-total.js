const svg = d3.select('body')
  .append('svg')
  .attr('width', '100%')
  .attr('height', '500px')

const rect = svg.node().getBoundingClientRect()
const padding = 20
const size = [rect.width - padding * 2, rect.height - padding * 2]
const radius = d3.min(size) / 2
const range = [2000, 2018]

const projection = d3
  .geoOrthographic()
  .scale(radius)
  .translate([rect.width / 2, padding + radius])
  .precision(0)

const path = d3.geoPath(projection)

async function loadMap () {
  const world = await d3.json($sandbox.getResource('world-atlas@1/110m.json'))
  const land = topojson.feature(world, world.objects.land)
  const countries = topojson.feature(world, world.objects.countries).features

  const csv = '/resources/dataset/world-bank/labor-force-total-2018/API_SL.TLF.TOTL.IN_DS2_en_csv_v2_7748.csv'

  const data = new Map()
  d3.csvParse(
    skipLine(await d3.text($sandbox.withBase(csv)), 4),
    row => {
      data.set(row['Country Code'], splice(row))
    }
  )

  const info = new Map()

  await d3.tsv(
    $sandbox.getResource('world-atlas@1/110m.tsv'),
    ({ iso_n3: id, iso_a3: code, name }) => {
      info.set(id, { id, code, name })
    }
  )

  countries.forEach(d => {
    d.info = info.get(d.id)
    d.info.centroid = d3.geoCentroid(d)
    d.data = data.get(d.info.code)
  })

  return { land, countries }
}

function drawEarth (g, land, countries) {
  const landGroup = g.append('g')

  const center = projection(projection.center())

  landGroup.append('g')
    .classed('sea', true)
    .append('circle')
    .attr('r', radius)
    .attr('cx', center[0])
    .attr('cy', center[1])
    .style('fill', '#aaddff')

  const countriesGroup = g.append('g')

  function update () {
    landGroup
      .select('g.land')
      .selectAll('path')
      .data([path(land)])
      .join('path')
      .attr('d', d => d)
      .style('fill', '#ccc')

    const groups = countriesGroup
      .selectAll('g')
      .data(countries, d => d.id)
      .join('g')

    groups.selectAll('path')
      .data(d => [{ path: path(d), ...d.info }])
      .join('path')
      .attr('d', d => d.path)
      .attr('data-name', d => d.name)
      .attr('data-id', d => d.id)
      .attr('data-code', d => d.code)
      .style('fill', '#e9ebdf')
      .style('stroke', '#fff')
      .style('stroke-width', 1)

    // groups.selectAll('text')
    //   .data(d => [{ ...d.info, center: projection(d.info.centroid) }])
    //   .join('text')
    //   .classed('name-label', true)
    //   .attr('x', d => d.center[0])
    //   .attr('y', d => d.center[1])
    //   .text(d => d.id)
  }

  update()
  return update
}

async function load () {
  const { land, countries } = await loadMap()
  const earth = svg.append('g')

  const update = drawEarth(earth, land, countries)

  d3.timer(function (elapsed) {
    const lambda = (0.01 * elapsed) % 360
    projection.rotate([lambda, 0, 0])
    update()
  })
}

load()

function skipLine (text, n) {
  let pos = -1
  while (n > 0) {
    pos = text.indexOf('\n', pos + 1)
    n--
  }
  return text.substring(pos + 1)
}

function splice (data) {
  const ret = []
  for (let i = range[0]; i <= range[1]; i++) {
    ret[i] = data[i]
  }
  return ret
}
