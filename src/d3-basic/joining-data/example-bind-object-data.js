const dataset = [
  { id: 1, name: 'Alex', votes: 0 },
  { id: 2, name: 'Bob', votes: 0 },
  { id: 3, name: 'Catherine', votes: 0 },
  { id: 4, name: 'Dan', votes: 0 }
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
function update (inputDataset) {
  tbody
    .selectAll('tr')
    .data(
      inputDataset,
      row => row.id
    )
    .join(
      enter => enter
        .append('tr')
        .selectAll('td')
        .data(row => head.map(key => row[key]))
        .enter()
        .append('td')
        .text(d => d),

      update => update
        .style('color', 'blue')
        .selectAll('td')
        .data(row => head.map(key => row[key]))
        .filter(d => d != null)
        .text(d => d),

      // reset
      exit => exit.style('color', null)
    )
}

update(dataset)

d3.interval(() => {
  // random int between 0 and dataset.length - 1
  const i = Math.floor(Math.random() * Math.floor(dataset.length))

  dataset[i].votes++

  update([
    { id: dataset[i].id, votes: dataset[i].votes }
  ])
}, 1000)
