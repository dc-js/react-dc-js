import React, { useContext } from 'react'
import { lineChart } from 'dc'
import { baseMixin, stackMixin } from '../mixins'
import { combineMixins } from '../utils'
import { RangeChartContext } from './range-chart-provider'
import { useChart } from './use-chart'

export function LineChart({ children, ...rest }) {
  const { rangeChart } = useContext(RangeChartContext)
  const focusProps = rangeChart ? { ...rest, rangeChart: rangeChart } : rest
  const [, chartRef] = useChart(
    lineChart,
    focusProps,
    combineMixins([baseMixin, stackMixin]) // TODO: ignore extraneous values
  )

  return (
    <>
      <div ref={chartRef} />
    </>
  )
}
