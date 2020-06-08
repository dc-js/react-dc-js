// @flow

import type { BaseMixinProps } from './base-mixin'
import type { StackMixinProps } from './stack-mixin'

export type MixinProps = BaseMixinProps & StackMixinProps
export type Mixin = (Object, MixinProps) => $Shape<MixinProps>

export { baseMixin } from './base-mixin'
export { stackMixin } from './stack-mixin'
