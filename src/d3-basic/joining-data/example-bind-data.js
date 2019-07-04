const dataset = [12, 14, 16, 24, 32, 48]
function drawOn (id) {
  d3.select('#' + id)
    .selectAll('span')
    .data(dataset)
    .style('font-size', d => d + 'px')
    .text(d => d)
}

drawOn('six-spans')
drawOn('one-span')
drawOn('seven-spans')
