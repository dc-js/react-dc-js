import React from 'react'

export default function ChartContext({ children }) {
  const [charts, dispatch] = React.useReducer(reducer, {})

  return (
    <ChartRegistry.Provider value={{ charts, dispatch }}>
      {children}
    </ChartRegistry.Provider>
  )
}

function reducer(state, action) {
  switch (action.type) {
    case 'register':
      console.log({ ...state, [action.id]: action.chart })
      return { ...state, [action.id]: action.chart }
    case 'remove':
      const { [action.id]: _, ...rest } = state
      return rest
    default:
      throw new Error('Unknown chart action')
  }
}

export const ChartRegistry = React.createContext(null)
