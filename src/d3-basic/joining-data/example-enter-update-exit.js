const dataset = [12, 14, 16, 24, 32, 48]
function drawOn (id) {
  let selection = d3.select('#' + id)
    .selectAll('span')
    .data(dataset)

  selection.style('font-size', d => d + 'px')
    .text(d => d)

  selection.join(
    enter => enter
      .append('span')
      .style('font-size', d => d + 'px')
      .text(d => 'New:' + d),

    update => update
      .style('background-color', 'blue')
      .text(d => 'Update:' + d),

    exit => exit
      .style('background-color', 'orange')
      .text('No data')
  )

  // it works too, but d3-selection 1.4 no more update()
  // just write code before exit()
  //
  // selection
  //   .style('background-color', 'blue')
  //   .text(d => 'Update:' + d)
  //
  // selection
  //   .enter()
  //   .append('span')
  //   .style('font-size', d => d + 'px')
  //   .text(d => 'New:' + d)
  //
  // selection
  //   .exit()
  //   .style('background-color', 'orange')
  //   .text('No data')
}

drawOn('six-spans')
drawOn('one-span')
drawOn('seven-spans')
