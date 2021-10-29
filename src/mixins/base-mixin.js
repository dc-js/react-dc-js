const events = [
  'onRenderlet',
  'onPreTransition',
  'onPreRender',
  'onPostRender',
  'onPreRedraw',
  'onPostRedraw',
  'onFiltered',
  'onZoomed',
]

/**
 * Transforms the previous props to dc.js compatible chart methods
 * This can become useful to combine multiple props into a single function
 * Or to provide proper naming, eg. setMyProp(5) to myProp=5
 * This method will return the raw chart input
 * @param chart
 * @param props
 */
export function baseMixin(chart, props) {
  const { filterHandler, showControls, id, ...rest } = props

  // chart[showControls ? 'turnOffControls' : 'turnOnControls']()
  filterHandler && chart.addFilterHandler(filterHandler)
  events.forEach(event => event in rest && chart.on(event, rest[event]))
  return rest
}
