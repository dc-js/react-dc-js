// @flow

type Stack = {
  group: Object,
  name?: string,
  accessor?: Function,
}

export type StackMixinProps = {
  stack?: Stack,
  stacks?: Array<Stack>,
}

export function stackMixin(
  chart: Object,
  props: StackMixinProps
): StackMixinProps {
  const { stacks, ...rest } = props
  stacks &&
    stacks.forEach(stack =>
      chart.stack(stack.group, stack.name, stack.accessor)
    )
  return rest
}
