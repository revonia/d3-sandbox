const dataset = [
  { id: 1, name: 'Alex', age: 30, gender: 'male' },
  { id: 2, name: 'Bob', age: 24, gender: 'male' },
  { id: 3, name: 'Catherine', age: 22, gender: 'female' },
  { id: 4, name: 'Dan', age: 42, gender: 'male' }
]

const body = d3.select('body')
const head = Object.keys(dataset[0])
let table = body.append('table')

// add table head
table.append('thead')
  .append('tr')
  .selectAll('th')
  .data(head)
  .join('th')
  .text(d => d)

const tbody = table.append('tbody')

// then fill data
function setData (dataset) {
  const tr = tbody.selectAll('tr')
    .data(dataset, row => row.id)

  tr.style('color', 'blue')

  tr.join('tr') // notice: shortcut of .enter().append('tr')

  const td = tr.selectAll('td')
    .data(
      row => head.map(key => row[key]) // make sure next 'join' will receive ordered array of data
    )

  td.join('td')
    .text(d => d)
}

setData(dataset)
