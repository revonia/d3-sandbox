const dataset = JSON.parse(document.querySelector('#dataset').innerText)
const rectHeight = 25 // 每个矩形所占的像素高度(包括空白)

const chart = d3.select('#chart')

const linear = d3.scaleLinear()
  .domain([0, d3.max(dataset)])
  .range([0, 300])

const xAxis = d3.axisBottom(linear)
  .ticks(10)

chart.selectAll('rect')
  .data(dataset)
  .enter()
  .append('rect')
  .attr('x', 20)
  .attr('y', (d, i) => i * rectHeight)
  .attr('width', d => linear(d))
  .attr('height', rectHeight - 2)
  .attr('fill', 'steelblue')

chart.selectAll('text')
  .data(dataset)
  .enter()
  .append('text')

chart.append('g').call(xAxis)
  .attr('x', 20)
  .attr('y', 140)
