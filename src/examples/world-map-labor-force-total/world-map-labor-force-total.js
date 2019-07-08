const svg = d3.select('#chart')
  .append('svg')
  .attr('width', '100%')
  .attr('height', '550px')

const rect = svg.node().getBoundingClientRect()
const padding = 100
const size = [rect.width - padding * 2, rect.height - padding * 2]
const earthRadius = d3.min(size) / 2
const range = [2000, 2018]
const rotateSpeed = 0.02
const topN = 40
const donutWidth = 15

const projection = d3
  .geoOrthographic()
  .scale(earthRadius)
  .precision(0)

const center = projection(projection.center())
const path = d3.geoPath(projection)

;(async function run () {
  const { land, countries, stat } = await loadData()

  const defs = svg.append('defs')

  const scale = d3.scaleLinear()
    .domain([stat.min, stat.max])

  const colors = scale.copy().range(['#b3e2d7', '#00431b'])
  const applyColors = defLinearGradient(defs, colors)

  const earth = svg.append('g')
  const earthUpdater = drawEarth(earth, land, countries, colors)

  const donut = svg.append('g')
  const updateDonut = drawDonut(donut, stat, colors, earthRadius + donutWidth, donutWidth)

  const valueAxis = svg.append('g')
  drawValueAxis(valueAxis, scale, applyColors)

  const yearLine = svg.append('g')
  const updateYearAxis = drawYearLine(yearLine, stat)

  let prevYear = range[0]
  d3.timer(function (elapsed) {
    const lambda = (rotateSpeed * elapsed) % 360
    const year = range[0] + parseInt(elapsed / 2 / 1000) % (range[1] - range[0] + 1)

    projection.rotate([lambda, 0, 0])
    earthUpdater.updateRotate()

    if (year !== prevYear) {
      updateDonut(year)
      updateYearAxis(year)
      earthUpdater.updateColor(year)
      prevYear = year
    }
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

  const sliced = stat.slice(range[0], range[1] + 1)
  stat.min = d3.min(sliced, data => data.min)
  stat.max = d3.max(sliced, data => data.max)

  countries.forEach(d => {
    d.info = info.get(d.id)
    d.info.centroid = d3.geoCentroid(d)
    d.data = data.get(d.info.code)
  })

  return { land, countries, stat, info }
}

function defLinearGradient (root, colors) {
  const id = 'linearGradient-' + d3.randomUniform(0, 1)()
  const [min, max] = colors.domain()
  const data = d3.range(11, 0, -1).map(d => min + d * (max - min) / 11)
  root.append('linearGradient')
    .attr('gradientTransform', 'rotate(90)')
    .attr('id', id)
    .selectAll('stop')
    .data(data)
    .join('stop')
    .attr('offset', (d, i) => (i * 10) + '%')
    .attr('stop-color', d => colors(d))
  return function apply (root) {
    root.attr('fill', `url(#${id})`)
  }
}

function drawEarth (root, land, countries, colors) {
  const landGroup = root.append('g')

  root.classed('earth', true)

  landGroup.append('g')
    .classed('sea', true)
    .append('circle')
    .attr('r', earthRadius)
    .attr('cx', center[0])
    .attr('cy', center[1])
    .style('fill', '#aaddff')

  const landPath = landGroup.append('g')
    .append('path')
    .style('fill', '#ccc')

  const countriesGroup = root.append('g')

  const countriesPaths = countriesGroup
    .append('g')
    .classed('countries', true)
    .selectAll('path')
    .data(countries, d => d.id)
    .join('path')
    .attr('d', d => path(d))
    .attr('data-name', d => d.info.name)
    .attr('data-id', d => d.id)
    .attr('data-code', d => d.info.code)
    .style('stroke', '#fff')
    .style('stroke-width', 1)

  function updateRotate () {
    landPath.attr('d', path(land))
    countriesPaths.attr('d', d => path(d))
  }

  function updateColor (year) {
    countriesPaths.style('fill', d => colors(d.data && d.data[year] ? d.data[year] : 0))
  }

  updateColor(range[0])
  return {
    updateRotate,
    updateColor
  }
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
      .attr('data-code', d => d.data.code)
      .attr('data-value', d => d.value)
      .style('fill', d => colors(d.value))
      .transition()
      .duration(300)
      .attr('d', d => arc({
        ...d,
        innerRadius: innerRadius,
        outerRadius: innerRadius + width
      }))
  }

  update(range[0])
  return update
}

function drawValueAxis (root, scale, applyColors) {
  const height = 100
  const width = 10

  const axis = d3.axisRight(scale.copy().range([height, 0]))
  const position = {
    x: center[0] + earthRadius + 2 * width + padding,
    y: padding / 2
  }

  root.attr('transform', `translate(${position.x}, ${position.y})`)

  root.append('g')
    .call(axis)
    .attr('transform', `translate(${width}, 0)`)

  root.append('g')
    .append('rect')
    .attr('width', width)
    .attr('height', height + 1)
    .call(applyColors)
}

function drawYearLine (root, stat) {
  const sliced = stat.slice(range[0], range[1] + 1)
  const parseYear = d3.timeParse('%Y')
  const width = 600
  const height = 50
  const [min, max] = d3.extent(sliced, d => d.total)
  const indicatorWidth = width / (range[1] - range[0])
  const xScale = d3.scaleTime()
    .domain([parseYear(range[0]), parseYear(range[1])])
    .range([0, width])
  const yScale = d3.scaleLinear().domain([min * 0.9, max]).range([height, 0])

  const position = {
    x: center[0] - width / 2,
    y: padding + earthRadius * 2 + donutWidth
  }

  root.attr('transform', `translate(${position.x}, ${position.y})`)

  const line = d3.line()
    .x(d => xScale(parseYear(d.year)))
    .y(d => yScale(d.total))
    .curve(d3.curveMonotoneX)

  root.append('g')
    .call(d3.axisBottom(xScale))
    .attr('transform', 'translate(0,' + height + ')')

  root.append('path')
    .datum(sliced)
    .attr('d', line)
    .attr('fill', 'none')
    .attr('stroke', '#aaddff')
    .attr('stroke-width', 1)

  root.append('g')
    .selectAll('circle')
    .data(sliced)
    .join('circle')
    .attr('cx', d => xScale(parseYear(d.year)))
    .attr('cy', d => yScale(d.total))
    .attr('r', 2)
    .attr('fill', '#aaddff')
    .attr('stroke', 'write')

  const indicator = root.append('rect')
    .classed('indicator', true)
    .attr('width', indicatorWidth)
    .attr('height', height + 30)
    .attr('fill', '#aaddff')
    .attr('transform', `translate(${toX(range[0])}, -5)`)
    .attr('opacity', 0.5)

  function toX (year) {
    return xScale(parseYear(year)) - indicatorWidth / 2
  }

  function update (year) {
    indicator
      .transition()
      .duration(300)
      .attr('transform', `translate(${toX(year)}, -5)`)
  }

  return update
}
