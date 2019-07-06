const dataset = [1, 2, 3]
const body = d3.select('body')

newExample(`Example join('tagName') shortcut`)
  .select('ul')
  .selectAll('li')
  .data([1, 3, 4, 5], d => d)
  .join('li')
  .text(d => d)

newExample(`selection.join(onEnter, onUpdate, onExit)`)
  .select('ul')
  .selectAll('li')
  .data([1, 3, 4, 5], d => d)
  .join(
    enter => enter.append('li').text(d => `enter ${d}`),
    update => update.text(d => `update ${d}`),
    exit => exit.text(d => `exit ${d}`)
  )

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
