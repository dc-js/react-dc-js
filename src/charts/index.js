// @flow

import { BaseChart } from './base-chart'
import { barChart, bubbleChart, pieChart } from 'dc'
import { baseMixin, stackMixin } from '../mixins'

export const BarChart = props =>
  BaseChart(props, barChart, [baseMixin, stackMixin])
export const PieChart = props => BaseChart(props, pieChart)
export const BubbleChart = props => BaseChart(props, bubbleChart)
