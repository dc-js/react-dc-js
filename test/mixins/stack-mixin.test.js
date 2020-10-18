import React from 'react'
import { render } from '@testing-library/react'
import { BaseChart } from 'src/charts/base-chart'
import { stackMixin } from 'src/mixins'
import chartMock from '../mocks/chart.mock'

describe('stack mixin', () => {
  it('should invoke props as methods', () => {
    const chartFunc = chartMock()
    const stacks = [
      {
        group: {},
        name: 'foo',
        accessor: null,
      },
      {
        group: {},
        name: 'bar',
        accessor: null,
      },
    ]

    chartFunc.stack = jest.fn()
    jest.spyOn(chartFunc, 'stack')

    const Chart = BaseChart(() => chartFunc, [stackMixin])
    render(<Chart stacks={stacks} />)
    expect(chartFunc.stack).toBeCalledTimes(2)
    expect(chartFunc.stack).toBeCalledWith({}, 'foo', null)
    expect(chartFunc.stack).toBeCalledWith({}, 'bar', null)
    chartFunc.stack.mockReset()

    render(<Chart stack={stacks[0]} />)
    expect(chartFunc.stack).toBeCalledTimes(1)
    expect(chartFunc.stack).toBeCalledWith({}, 'foo', null)
    chartFunc.stack.mockReset()

    render(<Chart />)
    expect(chartFunc.stack).not.toBeCalled()
  })
})
