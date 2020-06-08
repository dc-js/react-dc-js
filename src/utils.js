// @flow

import type { Mixin, MixinProps } from './mixins'

export function combineMixins(mixins: Array<Mixin> = []) {
  return function (chart: any, props: MixinProps) {
    // Transforms the received props into corresponding chart methods
    // Ensures that we can map only a subset of props to mixin methods
    const unhandledProps = mixins.reduce(
      (value, mixin) => mixin(chart, value),
      props
    )
    // Invoke the remaining generic props to corresponding methods
    Object.keys(unhandledProps).forEach(prop => unhandledProps[prop])
    Object.keys(unhandledProps).forEach(
      prop => prop in chart.current && chart.current[prop](unhandledProps[prop])
    )
  }
}
