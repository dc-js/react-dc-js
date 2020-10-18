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
  return function Chart({ id, ...rest }: $Shape<MixinProps>) {
    const [chart, chartRef] = useChart(chartFunc, rest, combineMixins(mixins))
    const { dispatch } = useContext(ChartRegistry) || {}

    useEffect(() => {
      if (dispatch && id) {
        dispatch({ type: 'register', chart, id })
        return () => dispatch({ type: 'remove', chart, id })
      }
    }, [id, chart, dispatch])

    return <div ref={chartRef} />
  }
}
