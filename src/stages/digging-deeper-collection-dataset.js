import * as d3 from 'd3'
import SceneManager from '../base/SceneManager'

export default function (root, emitter) {
  const int = parseInt
  const svg = d3.select(root)
    .append('svg')
    .attr('width', '100%')
    .attr('height', '50vh')

  const width = int(svg.style('width'))
  const height = int(svg.style('height'))
  const center = [width / 2, height / 2]

  const sm = new SceneManager()
  sm.applyEmitter(emitter)

  sm.scenes.set('hi-narrator', () => {
    const y = center[1] - 50
    const text = svg.append('text')
      .style('font-size', '6rem')
      .style('font-weight', 'bold')
      .attr('x', center[0])
      .attr('y', y)
      .attr('opacity', 0)
      .text('Hi!')

    text.transition()
      .attr('opacity', 1)
      .attr('y', center[1])

    return () => text
      .transition()
      .attr('opacity', 0)
      .attr('y', y)
      .remove()
  })
}
