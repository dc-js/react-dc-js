import React, { useEffect, useState } from 'react'
import crossfilter from 'crossfilter2'
import * as d3 from 'd3'
import csv from './ndx.csv'
import { BarChart, PieChart, BubbleChart } from 'react-dc-js'

import 'dc/dist/style/dc.css'
import './App.css'

const numberFormat = d3.format('.2f')

function App() {
  const [cx, setCx] = useState(null)

  useEffect(() => {
    ;(async () => {
      const data = await d3.csv(csv)
      const dateFormatSpecifier = '%m/%d/%Y'
      const dateFormatParser = d3.timeParse(dateFormatSpecifier)
      data.forEach(d => {
        d.dd = dateFormatParser(d.date)
        d.month = d3.timeMonth(d.dd) // pre-calculate month for better performance
        d.close = +d.close // coerce to number
        d.open = +d.open
      })
      const cx = crossfilter(data)
      setCx(cx)
    })()
  }, [])

  if (!cx) {
    return <p>Loading Data...</p>
  }

  const moveMonths = cx.dimension(d => d.month)
  const volumeByMonthGroup = moveMonths
    .group()
    .reduceSum(d => d.volume / 500000)

  const gainOrLoss = cx.dimension(d => (d.open > d.close ? 'Loss' : 'Gain'))
  const gainOrLossGroup = gainOrLoss.group()

  const yearlyDimension = cx.dimension(d => d3.timeYear(d.dd).getFullYear())
  const yearlyPerformanceGroup = yearlyDimension.group().reduce(
    (p, v) => {
      ++p.count
      p.absGain += v.close - v.open
      p.fluctuation += Math.abs(v.close - v.open)
      p.sumIndex += (v.open + v.close) / 2
      p.avgIndex = p.sumIndex / p.count
      p.percentageGain = p.avgIndex ? (p.absGain / p.avgIndex) * 100 : 0
      p.fluctuationPercentage = p.avgIndex
        ? (p.fluctuation / p.avgIndex) * 100
        : 0
      return p
    },
    (p, v) => {
      --p.count
      p.absGain -= v.close - v.open
      p.fluctuation -= Math.abs(v.close - v.open)
      p.sumIndex -= (v.open + v.close) / 2
      p.avgIndex = p.count ? p.sumIndex / p.count : 0
      p.percentageGain = p.avgIndex ? (p.absGain / p.avgIndex) * 100 : 0
      p.fluctuationPercentage = p.avgIndex
        ? (p.fluctuation / p.avgIndex) * 100
        : 0
      return p
    },
    () => ({
      count: 0,
      absGain: 0,
      fluctuation: 0,
      fluctuationPercentage: 0,
      sumIndex: 0,
      avgIndex: 0,
      percentageGain: 0,
    })
  )

  return (
    <div className="App">
      <header className="App-header">
        <BubbleChart
          width={990}
          height={250}
          transitionDuration={1500}
          margins={{ top: 10, right: 50, bottom: 30, left: 40 }}
          dimension={yearlyDimension}
          group={yearlyPerformanceGroup}
          colors={d3.schemeRdYlGn[9]}
          colorDomain={[-500, 500]}
          colorAccessor={d => d.value.absGain}
          keyAccessor={p => p.value.absGain}
          valueAccessor={p => p.value.percentageGain}
          radiusValueAccessor={p => p.value.fluctuationPercentage}
          maxBubbleRelativeSize={0.3}
          x={d3.scaleLinear().domain([-2500, 2500])}
          y={d3.scaleLinear().domain([-100, 100])}
          r={d3.scaleLinear().domain([0, 4000])}
          elasticY={true}
          elasticX={true}
          yAxisPadding={100}
          xAxisPadding={500}
          renderHorizontalGridLines={true}
          renderVerticalGridLines={true}
          xAxisLabel={'Index Gain'}
          yAxisLabel={'Index Gain %'}
          renderLabel={true}
          label={p => p.key}
          renderTitle={true}
          title={p =>
            [
              p.key,
              `Index Gain: ${numberFormat(p.value.absGain)}`,
              `Index Gain in Percentage: ${numberFormat(
                p.value.percentageGain
              )}%`,
              `Fluctuation / Index Ratio: ${numberFormat(
                p.value.fluctuationPercentage
              )}%`,
            ].join('\n')
          }
        />
        <PieChart
          dimension={gainOrLoss}
          group={gainOrLossGroup}
          width={180}
          height={180}
          radius={80}
        />
        <BarChart
          dimension={moveMonths}
          group={volumeByMonthGroup}
          width={990}
          height={40}
          margins={{ top: 0, right: 50, bottom: 20, left: 40 }}
          centerBar={true}
          gap={1}
          x={d3
            .scaleTime()
            .domain([new Date(1985, 0, 1), new Date(2012, 11, 31)])}
          round={d3.timeMonth.round}
          alwaysUseRounding={true}
          xUnits={d3.timeMonths}
        />
      </header>
    </div>
  )
}

export default App
