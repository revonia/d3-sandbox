// initial

const spectatorsData = [1023, 432, 968]
d3.select('#sports')
  .selectAll('li')
  .data(spectatorsData)
  .select('span')
  .text(d => d)

const leftTickets = [23, 16, 39]
d3.select('#movies')
  .selectAll('li')
  .data(leftTickets)
  .select('span')
  .text(d => d)

// eslint-disable-next-line no-unused-vars
function getBasketballSpectators () {
  alert(d3.select('#basketball').datum())
}

// eslint-disable-next-line no-unused-vars
function setFightClubTicketsToZero () {
  d3.select('#fight-club')
    .datum(0)

  d3.select('#movies')
    .selectAll('li')
    .select('span')
    .text(d => d)
}

// eslint-disable-next-line no-unused-vars
function updateFruitsTotal () {
  d3.select('#fruits')
    .selectAll('li')
    .datum(function () {
      // notice: `this` in arrow function won't work as expected!
      return this.dataset['total']
    })
    .select('span')
    .text(d => d)
}
