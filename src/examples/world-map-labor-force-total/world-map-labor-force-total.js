const svg = d3.select('body')
  .append('svg')
  .attr('width', '100%')
  .attr('height', '500px')

const rect = svg.node().getBoundingClientRect()
const padding = 60
const size = [rect.width - padding * 2, rect.height - padding * 2]
const radius = d3.min(size) / 2
const range = [2000, 2018]
const rotateSpeed = 0.02
const topN = 40
const donutWidth = 15

const projection = d3
  .geoOrthographic()
  .scale(radius)
  .translate([rect.width / 2, padding + radius])
  .precision(0)

const center = projection(projection.center())
const path = d3.geoPath(projection)

;(async function run () {
  const { land, countries, stat } = await loadData()

  const scale = d3.scaleLinear()
    .domain([stat.min, stat.max])

  const colors = scale.copy().range(['#b3e2d7', '#00431b'])

  const earth = svg.append('g')
  const updateEarth = drawEarth(earth, land, countries, colors)

  const donut = svg.append('g')
  const updateDonut = drawDonut(donut, stat, colors, radius + donutWidth, donutWidth)

  const valueAxis = svg.append('g')
  drawValueAxis(valueAxis, scale)

  const yearAxis = svg.append('g')
  const updateYearAxis = drawYearAxis(yearAxis)

  d3.timer(function (elapsed) {
    const lambda = (rotateSpeed * elapsed) % 360

    const year = range[0] + parseInt(elapsed / 3 / 1000) % (range[1] - range[0] + 1)
    projection.rotate([lambda, 0, 0])
    updateEarth(year)
    updateDonut(year)
    updateYearAxis(year)
  })
})()

function skipLine (text, n) {
  let pos = -1
  while (n > 0) {
    pos = text.indexOf('\n', pos + 1)
    n--
  }
  return text.substring(pos + 1)
}

function byValueDesc (a, b) {
  return b.value - a.value
}

function calculate (acc, code, row) {
  const ret = []
  for (let year = range[0]; year <= range[1]; year++) {
    const thisYear = parseInt(row[year]) || 0
    ret[year] = thisYear
    let stat
    if (!acc[year]) {
      stat = acc[year] = {
        year,
        total: 0,
        max: 0,
        min: Infinity,
        top: []
      }
    } else {
      stat = acc[year]
    }
    if (thisYear !== 0) {
      stat.total += thisYear
      if (thisYear > stat.max) {
        stat.max = thisYear
      }

      if (thisYear < stat.min) {
        stat.min = thisYear
      }

      if (stat.top.length === 0) {
        stat.top.push({ code, value: thisYear })
      } else {
        if (thisYear > stat.top[stat.top.length - 1].value) {
          stat.top.push({ code, value: thisYear })
          stat.top.sort(byValueDesc)
          if (stat.top.length > topN) {
            stat.top.pop()
          }
        }
      }
    }
  }
  return ret
}

async function loadData () {
  const world = await d3.json($sandbox.getResource('world-atlas@1/110m.json'))
  const land = topojson.feature(world, world.objects.land)
  const countries = topojson.feature(world, world.objects.countries).features

  const info = new Map()
  await d3.tsv(
    $sandbox.getResource('world-atlas@1/110m.tsv'),
    ({ iso_n3: id, iso_a3: code, name }) => {
      const data = { id, code, name }
      info.set(id, data)
      info.set(code, data)
    }
  )

  const stat = []

  const csv = '/resources/dataset/world-bank/labor-force-total-2018/API_SL.TLF.TOTL.IN_DS2_en_csv_v2_7748.csv'
  const data = new Map()
  d3.csvParse(
    skipLine(await d3.text($sandbox.withBase(csv)), 4),
    row => {
      const code = row['Country Code']
      if (info.has(code)) {
        data.set(code, calculate(stat, code, row))
      }
    }
  )

  const sliced = stat.slice(range[0], range[1])
  stat.min = d3.min(sliced, data => data.min)
  stat.max = d3.max(sliced, data => data.max)

  countries.forEach(d => {
    d.info = info.get(d.id)
    d.info.centroid = d3.geoCentroid(d)
    d.data = data.get(d.info.code)
  })

  return { land, countries, stat, info }
}

function drawEarth (root, land, countries, colors) {
  const landGroup = root.append('g')

  landGroup.append('g')
    .classed('sea', true)
    .append('circle')
    .attr('r', radius)
    .attr('cx', center[0])
    .attr('cy', center[1])
    .style('fill', '#aaddff')

  const countriesGroup = root.append('g')

  function update (year) {
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
      .data(d => [{ path: path(d), ...d.info, data: d.data }])
      .join('path')
      .attr('d', d => d.path)
      .attr('data-name', d => d.name)
      .attr('data-id', d => d.id)
      .attr('data-code', d => d.code)
      .style('fill', d => colors(d.data && d.data[year] ? d.data[year] : 0))
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

  update(range[0])
  return update
}

function drawDonut (root, stat, colors, innerRadius, width) {
  const arc = d3.arc()
  const pie = d3.pie()
    .value(d => d.value)
    .padAngle(Math.PI * 2 / 360)
    .sort((a, b) => {
      if (a.code === 'OTH') {
        return 1
      }
      if (b.code === 'OTH') {
        return -1
      }
      return b.value - a.value
    })

  root.attr('transform', `translate(${center[0]}, ${center[1]})`)

  function update (year) {
    const data = pie(stat[year].top)

    root.selectAll('path')
      .data(data)
      .join('path')
      .attr('d', d => arc({
        ...d,
        innerRadius: innerRadius,
        outerRadius: innerRadius + width
      }))
      .attr('data-code', d => d.data.code)
      .attr('data-value', d => d.value)
      .style('fill', d => colors(d.value))
  }

  update(range[0])
  return update
}

function drawValueAxis (root, scale) {
  const height = 440
  const ticksCount = 20
  const axis = d3.axisRight(scale.copy().range([0, height])).ticks(ticksCount)
  const position = {
    x: center[0] + radius + 2 * donutWidth + padding / 2,
    y: padding / 2
  }

  root.attr('transform', `translate(${position.x}, ${position.y})`)

  root.append('g')
    .call(axis)

  // root.append('g')
  //   .selectAll('rect')
  //   .data(d3.range(0, height, height / ticksCount))
  //   .join('rect')
  //   .attr('width', 30)
  //   .attr('height', height / ticksCount)
  //   .attr('x', position.x)
  //   .attr('y', d => d)
  //   .attr('fill', 'red')
}

function drawYearAxis () {
  function update (year) {

  }
  return update
}
