import React, { createContext, useReducer } from 'react'

export default function ChartContext({ children }) {
  const [charts, dispatch] = useReducer(reducer, {})

  return (
    <ChartRegistry.Provider value={{ charts, dispatch }}>
      {children}
    </ChartRegistry.Provider>
  )
}

// Only exported for testing
export function reducer(state, action) {
  switch (action.type) {
    case 'register':
      return { ...state, [action.id]: action.chart }
    case 'remove':
      const { [action.id]: _, ...rest } = state
      return rest
    default:
      throw new Error('Unknown chart action')
  }
}

export const ChartRegistry = createContext(null)
