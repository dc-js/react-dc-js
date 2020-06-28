// @flow

import React from 'react'
import { baseMixin } from '../mixins'
import type { MixinProps } from '../mixins'
import { combineMixins } from '../utils'
import { useChart } from './use-chart'

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
  const [, chartRef] = useChart(chartFunc, props, combineMixins(mixins))

  return <div ref={chartRef} />
}
