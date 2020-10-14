// @flow

type Primitive = number | string | boolean | null
type FilterableExact = Primitive
type FilterableRange = Array<Primitive>
type FilterableFunction = ({}) => Primitive
type Filterable = FilterableExact | FilterableRange | FilterableFunction

/**
 * Defines the props allowed to be used with any chart that inherits
 * from a BaseMixin.
 */
export type BaseMixinProps = {
  id: string,
  dimension: {
    filter: Filterable => Array<Primitive>,
    filterExact: FilterableExact => Array<Primitive>,
    filterRange: FilterableRange => Array<Primitive>,
    filterFunction: FilterableFunction => Array<Primitive>,
    filterAll: void => Array<Primitive>,
    currentFilter: Filterable,
    hasCurrentFilter: boolean,
    top: (number, number) => Array<Primitive>,
    bottom: (number, number) => Array<Primitive>,
    group: any,
    groupAll: any,
    dispose: () => void,
    accessor: any,
    id: () => number,
  },
  group: any,
  filterHandler?: Function,
  renderlet?: Function,
  pretransition?: Function,
  showControls?: boolean,
  onRenderlet?: Function,
  onPreTransition?: Function,
  onPreRender?: Function,
  onPostRender?: Function,
  onPreRedraw?: Function,
  onPostRedraw?: Function,
  onFiltered?: Function,
  onZoomed?: Function,
}

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
export function baseMixin(chart: any, props: BaseMixinProps) {
  const { filterHandler, showControls, id, ...rest } = props

  // chart[showControls ? 'turnOffControls' : 'turnOnControls']()
  filterHandler && chart.addFilterHandler(filterHandler)
  events.forEach(event => event in rest && chart.on(event, rest[event]))
  return rest
}
