const chartMock = jest.fn().mockImplementation(ref => {
  let rendered = false
  return {
    render: () => (rendered = true),
    redraw: () => {
      if (!rendered) throw new Error('fail')
    },
  }
})

export default chartMock
