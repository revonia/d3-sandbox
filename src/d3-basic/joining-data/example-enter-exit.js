const dataset = [1, 2, 3]
const body = d3.select('body')

newExample('Example enter')
  .select('ul')
  .selectAll('li')
  .data([4, 5], d => d)
  .enter()
  .append('li')
  .text(d => `enter ${d}`)

newExample('Example exit')
  .select('ul')
  .selectAll('li')
  .data([1, 2], d => d)
  .exit()
  .text(d => `exit ${d}`)

function newExample (legend) {
  const fieldset = body
    .append('fieldset')

  fieldset.append('legend')
    .text(legend)

  // init data
  fieldset.append('ul')
    .selectAll('li')
    .data(dataset, d => d)
    .enter()
    .append('li')
    .text(d => d)

  return fieldset
}
