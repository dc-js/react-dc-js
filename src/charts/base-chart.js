// @flow

import React, { useContext, useEffect } from 'react'
import { baseMixin } from '../mixins'
import type { MixinProps } from '../mixins'
import { combineMixins } from '../utils'
import { ChartRegistry } from './chart-context'
import { useChart } from './use-chart'

import 'dc/dist/style/dc.css'

/**
 * A generic chart component factory
 * @param chartFunc
 * @param mixins
 */

export function BaseChart(
  chartFunc: any => mixed,
  mixins: Array<(any, MixinProps) => mixed> = [baseMixin]
) {
  const mixin = combineMixins(mixins)
  return function Chart(props: $Shape<MixinProps>) {
    const [chart, chartRef] = useChart(chartFunc, props, mixin)
    const { dispatch } = useContext(ChartRegistry) || {}

    useEffect(() => {
      if (dispatch && props.id) {
        dispatch({ type: 'register', chart, id: props.id })
        return () => dispatch({ type: 'remove', chart, id: props.id })
      }
    }, [props.id, chart, dispatch])

    return <div ref={chartRef} />
  }
}
