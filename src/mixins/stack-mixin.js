export function stackMixin(chart, props) {
  const { stacks, stack, ...rest } = props
  const _stacks = stacks || (stack && [stack])
  _stacks &&
    _stacks.forEach(stack =>
      chart.stack(stack.group, stack.name, stack.accessor)
    )
  return rest
}
