import React, { useContext } from 'react'
import { lineChart } from 'dc'
import { baseMixin, stackMixin } from '../mixins'
import { combineMixins } from '../utils'
import { ChartRegistry } from './chart-context'
import { useChart } from './use-chart'

export function LineChart({ children, rangeChart: rangeChartId, ...rest }) {
  const { charts } = useContext(ChartRegistry) || {}
  const rangeChart = rangeChartId && charts[rangeChartId]
  const focusProps = rangeChart ? { ...rest, rangeChart: rangeChart } : rest
  const [, chartRef] = useChart(
    lineChart,
    focusProps,
    combineMixins([baseMixin, stackMixin])
  )

  return <div ref={chartRef} />
}
