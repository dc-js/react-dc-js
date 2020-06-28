// @flow

import {
  barChart,
  boxPlot,
  bubbleChart,
  bubbleOverlay,
  cboxMenu,
  compositeChart,
  dataCount,
  dataTable,
  geoChoroplethChart,
  heatMap,
  htmlLegend,
  legend,
  lineChart,
  numberDisplay,
  pieChart,
  rowChart,
  scatterPlot,
  selectMenu,
  seriesChart,
  sunburstChart,
  textFilterWidget,
} from 'dc'
import { useChart } from '../charts/use-chart'
import { baseMixin, stackMixin } from '../mixins'
import type { BaseMixinProps } from '../mixins'
import { BaseChart } from './base-chart'

export const BarChart = (props: BaseMixinProps) =>
  BaseChart(props, barChart, [baseMixin, stackMixin])
export const BoxPlot = (props: BaseMixinProps) => BaseChart(props, boxPlot)
export const BubbleChart = (props: BaseMixinProps) =>
  BaseChart(props, bubbleChart)
export const PieChart = (props: BaseMixinProps) => BaseChart(props, pieChart)
export const BubbleOverlay = (props: BaseMixinProps) =>
  BaseChart(props, bubbleOverlay)
export const CboxMenu = (props: BaseMixinProps) => BaseChart(props, cboxMenu)
export const CompositeChart = (props: BaseMixinProps) =>
  BaseChart(props, compositeChart)
export const DataCount = (props: BaseMixinProps) => BaseChart(props, dataCount)
export const DataTable = (props: BaseMixinProps) => BaseChart(props, dataTable)
export const GeoChoroplethChart = (props: BaseMixinProps) =>
  BaseChart(props, geoChoroplethChart)
export const Heatmap = (props: BaseMixinProps) => BaseChart(props, heatMap)
export const HtmlLegend = (props: BaseMixinProps) =>
  BaseChart(props, htmlLegend)
export const Legend = (props: BaseMixinProps) => BaseChart(props, legend)
export const LineChart = (props: BaseMixinProps) => BaseChart(props, lineChart)
export const NumberDisplay = (props: BaseMixinProps) =>
  BaseChart(props, numberDisplay)
export const RowChart = (props: BaseMixinProps) => BaseChart(props, rowChart)
export const ScatterPlot = (props: BaseMixinProps) =>
  BaseChart(props, scatterPlot)
export const SelectMenu = (props: BaseMixinProps) =>
  BaseChart(props, selectMenu)
export const SeriesChart = (props: BaseMixinProps) =>
  BaseChart(props, seriesChart)
export const SunburstChart = (props: BaseMixinProps) =>
  BaseChart(props, sunburstChart)
export const TextFilterWidget = (props: BaseMixinProps) =>
  BaseChart(props, textFilterWidget)
export { useChart }
