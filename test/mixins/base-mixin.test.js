import React from 'react'
import { render } from '@testing-library/react'
import { BaseChart } from 'src/charts/base-chart'
import { baseMixin } from 'src/mixins'
import chartMock from '../mocks/chart.mock'

describe('base mixin', () => {
  it('should accept any prop', () => {
    const chartFunc = chartMock()

    chartFunc.foo = jest.fn()
    jest.spyOn(chartFunc, 'foo')

    const Chart = BaseChart(() => chartFunc, [])
    render(<Chart foo="bar" />)
    expect(chartFunc.foo).toHaveBeenCalledTimes(1)
    expect(chartFunc.foo).toHaveBeenCalledWith('bar')
  })

  it('should invoke props as methods', () => {
    const chartFunc = chartMock()
    const filterHandler = () => 'foo'
    const onPreTransition = () => 'foo'
    const onPreRender = () => 'foo'
    const onPostRender = () => 'foo'
    const onPreRedraw = () => 'foo'
    const onPostRedraw = () => 'foo'
    const onFiltered = () => 'foo'
    const onZoomed = () => 'foo'

    chartFunc.addFilterHandler = jest.fn()
    chartFunc.on = jest.fn()
    jest.spyOn(chartFunc, 'addFilterHandler')
    jest.spyOn(chartFunc, 'on')

    const Chart = BaseChart(() => chartFunc, [baseMixin])
    render(
      <Chart
        filterHandler={filterHandler}
        onPreTransition={onPreTransition}
        onPreRender={onPreRender}
        onPostRender={onPostRender}
        onPreRedraw={onPreRedraw}
        onPostRedraw={onPostRedraw}
        onFiltered={onFiltered}
        onZoomed={onZoomed}
      />
    )
    expect(chartFunc.addFilterHandler).toBeCalledWith(filterHandler)
    expect(chartFunc.on).toBeCalledTimes(7)
    expect(chartFunc.on).toBeCalledWith('onPreTransition', onPreTransition)
    expect(chartFunc.on).toBeCalledWith('onPreRender', onPreRender)
    expect(chartFunc.on).toBeCalledWith('onPostRender', onPostRender)
    expect(chartFunc.on).toBeCalledWith('onPreRedraw', onPreRedraw)
    expect(chartFunc.on).toBeCalledWith('onPostRedraw', onPostRedraw)
    expect(chartFunc.on).toBeCalledWith('onFiltered', onFiltered)
    expect(chartFunc.on).toBeCalledWith('onZoomed', onZoomed)
  })
})
