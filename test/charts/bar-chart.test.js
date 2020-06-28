import React from 'react'
import { render } from '@testing-library/react'
import crossfilter from 'crossfilter'
import * as d3 from 'd3'
import * as dc from 'dc'
import { BarChart } from 'src/charts'
import testSet from '../countries.json'

describe('bar chart', () => {
  it('should match snapshot', () => {
    const ndx = crossfilter(testSet)
    const dimension = ndx.dimension(d => d.title)
    const { container } = render(
      <BarChart
        dimension={dimension}
        group={dimension.group().reduceCount()}
        x={d3.scaleBand()}
        xUnits={dc.units.ordinal}
        transitionDuration={0}
      />
    )
    expect(container).toMatchSnapshot()
  })
})
