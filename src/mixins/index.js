// @flow

import type { BaseMixinProps } from './base-mixin'
import type { StackMixinProps } from './stack-mixin'

export type MixinProps = BaseMixinProps & StackMixinProps

export { baseMixin } from './base-mixin'
export { stackMixin } from './stack-mixin'
export type { BaseMixinProps, StackMixinProps }
