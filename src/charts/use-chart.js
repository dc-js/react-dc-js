// @flow

import type { MixinProps } from '../mixins'

import { useEffect, useRef } from 'react'
import { combineMixins } from '../utils'
import { baseMixin } from '../mixins'
import { InvalidStateException } from 'dc'

export function useChart(
  chartFunc: any => mixed,
  props: MixinProps,
  mixin: ({}, MixinProps) => mixed = combineMixins([baseMixin])
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
    mixin && mixin(chart, props)
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
  }, [chartFunc, props, mixin])

  return [chart, chartRef]
}
