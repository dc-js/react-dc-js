import React from 'react'
import { render } from '@testing-library/react'
import crossfilter from 'crossfilter'
import * as d3 from 'd3'
import { BoxPlot } from 'src/charts'
import testSet from '../morley.json'

describe('box plot', () => {
  it('should match snapshot', () => {
    const ndx = crossfilter(testSet)
    const dimension = ndx.dimension(d => 'exp-' + d.Expt)
    const group = dimension.group().reduce(
      function (p, v) {
        p.splice(d3.bisectLeft(p, +v.Speed), 0, +v.Speed)
        return p
      },
      function (p, v) {
        p.splice(d3.bisectLeft(p, +v.Speed), 1)
        return p
      },
      function () {
        return []
      }
    )
    const { container } = render(
      <BoxPlot dimension={dimension} group={group} transitionDuration={0} />
    )
    expect(container).toMatchSnapshot()
  })
})
