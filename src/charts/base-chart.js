// @flow

import React, { useContext, useEffect } from 'react'
import { baseMixin } from '../mixins'
import type { MixinProps } from '../mixins'
import { combineMixins } from '../utils'
import { RangeChartContext } from './range-chart-provider'
import { useChart } from './use-chart'

import 'dc/dist/style/dc.css'

/**
 * A helper function for generic charts.
 * Allows the hook to remain modular and not return HTML.
 * @param props
 * @param chartFunc
 * @param mixins
 */
export function BaseChart(
  props: $Shape<MixinProps>,
  chartFunc: any => mixed,
  mixins: Array<(any, MixinProps) => mixed> = [baseMixin]
) {
  const [chart, chartRef] = useChart(chartFunc, props, combineMixins(mixins))
  const { setRangeChart } = useContext(RangeChartContext)

  useEffect(() => {
    setRangeChart(chart.current)
  }, [chart, setRangeChart])

  return <div ref={chartRef} />
}
