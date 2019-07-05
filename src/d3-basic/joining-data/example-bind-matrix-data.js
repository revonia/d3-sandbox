const dataset = [
  [1, 2, 3, 4, 5, 6],
  [7, 8, 9, 10, 11, 12],
  [13, 14, 15, 16, 17, 18]
]

let body = d3.select('body')

let tr = body
  .append('table')
  .selectAll('tr')
  .data(dataset) // first selectAll and data, create a group
  .join('tr') // this join is shortcut of .enter().append('tr')
  // .enter().append('tr')

let td = tr.selectAll('td')
  .data(row => row) // second selectAll and data, create 3 groups, then data should typically be specified as a function
  .join('td')
  // .enter().append('td')
  .text(d => d)

body
  .append('h4')
  .text('a group after first selectAll and data:')

body.append('p')
  .text(JSON.stringify(tr._groups))

body
  .append('h4')
  .text('3 groups after second selectAll and data:')

body.append('p')
  .text(JSON.stringify(td._groups))
