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
import { BaseChart } from './base-chart'
import ChartContext from './chart-context'
import { LineChart } from './line-chart'

export const BarChart = BaseChart(barChart, [baseMixin, stackMixin])
export const BoxPlot = BaseChart(boxPlot)
export const BubbleChart = BaseChart(bubbleChart)
export const PieChart = BaseChart(pieChart)
export const BubbleOverlay = BaseChart(bubbleOverlay)
export const CboxMenu = BaseChart(cboxMenu)
export const CompositeChart = BaseChart(compositeChart)
export const DataCount = BaseChart(dataCount)
export const DataTable = BaseChart(dataTable)
export const GeoChoroplethChart = BaseChart(geoChoroplethChart)
export const Heatmap = BaseChart(heatMap)
export const HtmlLegend = BaseChart(htmlLegend)
export const Legend = BaseChart(legend)
export const NumberDisplay = BaseChart(numberDisplay)
export const RowChart = BaseChart(rowChart)
export const ScatterPlot = BaseChart(scatterPlot)
export const SelectMenu = BaseChart(selectMenu)
export const SeriesChart = BaseChart(seriesChart)
export const SunburstChart = BaseChart(sunburstChart)
export const TextFilterWidget = BaseChart(textFilterWidget)
export { useChart, LineChart, ChartContext }
