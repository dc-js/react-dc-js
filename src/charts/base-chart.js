// @flow

import React from 'react'
import { useChart } from './use-chart'
import { combineMixins } from '../utils'
import { baseMixin } from '../mixins'
import type { Mixin } from '../mixins'

export function BaseChart(
  props: any,
  chartFunc: any => mixed,
  mixins: Array<Mixin> = [baseMixin]
) {
  const [, chartRef] = useChart(chartFunc, props, combineMixins(mixins))

  return <div ref={chartRef} />
}
