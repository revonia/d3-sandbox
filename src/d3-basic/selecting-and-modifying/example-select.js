// select parent node
d3.selectAll('.my-item')
  .select(function () {
    return this.parentNode
  })
  .style('background-color', 'lightcyan')

// select by dataset
const dataset = [
  [1, 3],
  [2],
  [1, 2]
]

d3.selectAll('ul')
  .data(dataset)
  .selectAll(function (d) {
    return d.map(i => this.children[i - 1])
  })
  .style('color', 'red')
