export function combineMixins(mixins = []) {
  return function (chart, props) {
    // Transforms the received props into corresponding chart methods
    // Ensures that we can map only a subset of props to mixin methods
    const unhandledProps = mixins.reduce(
      (value, mixin) => mixin(chart, value),
      props
    );
    // Invoke the remaining generic props to corresponding methods
    Object.keys(unhandledProps).forEach(
      prop => prop in chart && chart[prop](unhandledProps[prop])
    );
  };
}
