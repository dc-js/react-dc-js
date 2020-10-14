// @flow

type Stack = {
  group: Object,
  name?: string,
  accessor?: Function,
}

export type StackMixinProps = {
  stack?: Stack,
  stacks: Array<Stack>,
}

export function stackMixin(
  chart: any,
  props: StackMixinProps
): $Shape<StackMixinProps> {
  const { stacks, stack, ...rest } = props
  const _stacks = stacks || (stack && [stack])
  _stacks &&
    _stacks.forEach(stack =>
      chart.stack(stack.group, stack.name, stack.accessor)
    )
  return rest
}
