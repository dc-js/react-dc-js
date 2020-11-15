import { useContext } from 'react'
import { lineChart } from 'dc'
import { baseMixin, stackMixin } from '../mixins'
import { BaseChart } from './base-chart'
import { ChartRegistry } from './chart-context'

export function LineChart({ rangeChart: rangeChartId, ...rest }) {
  const { charts } = useContext(ChartRegistry) || {}
  const rangeChart = rangeChartId && charts[rangeChartId]
  const focusProps = rangeChart
    ? { ...rest, rangeChart: rangeChart.current }
    : rest

  return BaseChart(lineChart, [baseMixin, stackMixin])(focusProps)
}
