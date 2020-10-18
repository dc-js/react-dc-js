import React from 'react'
import { render } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import { BaseChart } from 'src/charts/base-chart'
import { useChart } from 'src/charts/use-chart'
import { baseMixin } from 'src/mixins'
import chartMock from '../mocks/chart.mock'

describe('chart', () => {
  it('should render', () => {
    const chartOne = chartMock()
    jest.spyOn(chartOne, 'render')
    renderHook(() => useChart(() => chartOne, {}))
    expect(chartOne.render).toHaveBeenCalled()
  })

  it('should re-render and re-apply props if the signature is changed', () => {
    const chartOne = chartMock()
    chartOne.foo = jest.fn()
    const chartTwo = chartMock()
    chartTwo.foo = jest.fn()
    jest.spyOn(chartOne, 'render')
    jest.spyOn(chartOne, 'foo')
    jest.spyOn(chartTwo, 'render')
    jest.spyOn(chartTwo, 'render')

    const { rerender } = renderHook(
      chart => useChart(() => chart, { foo: 'bar' }),
      {
        initialProps: chartOne,
      }
    )
    expect(chartOne.render).toHaveBeenCalled()
    expect(chartOne.foo).toHaveBeenCalledWith('bar')
    rerender(chartTwo)
    expect(chartTwo.foo).toHaveBeenCalledWith('bar')
    expect(chartTwo.render).toHaveBeenCalled()
  })
})
