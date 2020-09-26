import React, { createContext, useState } from 'react'

export const RangeChartContext = createContext(null)

export function RangeChart({ children }) {
  const [rangeChart, setRangeChart] = useState(null)

  return (
    <RangeChartContext.Provider value={{ rangeChart, setRangeChart }}>
      {children}
    </RangeChartContext.Provider>
  )
}
