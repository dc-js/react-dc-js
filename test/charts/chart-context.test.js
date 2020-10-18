import React from 'react'
import { render } from '@testing-library/react'
import { BarChart } from 'src/charts'
import { ChartRegistry, reducer } from 'src/charts/chart-context'

describe('chart context', () => {
  it('should register and not re-render', () => {
    const charts = []
    const dispatch = jest.fn()
    const { rerender, unmount } = render(
      <ChartRegistry.Provider value={{ charts, dispatch }}>
        <BarChart id="foo" />
      </ChartRegistry.Provider>
    )
    expect(dispatch).toBeCalledTimes(1)
    expect(dispatch).toBeCalledWith(
      expect.objectContaining({ type: 'register', id: 'foo' })
    )
    rerender(
      <ChartRegistry.Provider value={{ charts, dispatch }}>
        <BarChart id="foo" />
      </ChartRegistry.Provider>
    )
    expect(dispatch).toBeCalledTimes(1)
    unmount()
    expect(dispatch).toBeCalledTimes(2)
    expect(dispatch).toBeCalledWith(
      expect.objectContaining({ type: 'remove', id: 'foo' })
    )
  })

  it('should reduce the chart registry', () => {
    let state = {}
    state = reducer({}, { type: 'register', chart: null, id: 'chart_one' })
    expect(state).toEqual({ chart_one: null })
    state = reducer(state, { type: 'register', chart: null, id: 'chart_one' })
    expect(state).toEqual({ chart_one: null })
    state = reducer(state, { type: 'register', chart: null, id: 'chart_two' })
    expect(state).toEqual({ chart_one: null, chart_two: null })
  })
})
