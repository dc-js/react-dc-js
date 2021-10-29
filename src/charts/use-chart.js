import { useEffect, useRef } from 'react'
import { InvalidStateException } from 'dc'

import { baseMixin } from '../mixins'
import { combineMixins } from '../utils'

export function useChart(chartFunc, props, mixin = combineMixins([baseMixin])) {
  const chartRef = useRef(null)
  const chart = useRef(null)
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
