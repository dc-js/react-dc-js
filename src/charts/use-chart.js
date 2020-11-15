// @flow

import { useEffect, useRef } from 'react'
import { InvalidStateException } from 'dc'
import type { MixinProps } from '../mixins'

import { baseMixin } from '../mixins'
import { combineMixins } from '../utils'

export function useChart(
  chartFunc: any => mixed,
  props: $Shape<MixinProps>,
  mixin: (any, MixinProps) => mixed = combineMixins([baseMixin])
) {
  const chartRef = useRef<null | any>(null)
  const chart = useRef<null | any>(null)
  const isRendered = useRef(false)

  useEffect(() => {
    chart.current = chartFunc(chartRef.current)
    isRendered.current = false
  }, [chartFunc])

  useEffect(() => {
    if (!chart.current) return
    mixin && mixin(chart.current, props)
    if (!isRendered.current) {
      try {
        chart.current.render()
        isRendered.current = true
      } catch (e) {
        if (!(e instanceof InvalidStateException)) throw e
      }
    } else {
      chart.current.redraw()
    }
  }, [chartFunc, mixin, props])

  return [chart, chartRef]
}
