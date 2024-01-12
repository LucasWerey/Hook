// @ts-nocheck
test('getQueryParameter retrieves a string query parameter correctly', () => {
  const route = {
    query: {
      param: 'value'
    }
  }
  const result = getQueryParameter(route, 'param')
  expect(result).toBe('value')
})

test('getQueryParameter retrieves an array query parameter correctly', () => {
  const route = {
    query: {
      param: ['value1', 'value2']
    }
  }
  const result = getQueryParameter(route, 'param')
  expect(result).toBe('value1,value2')
})

test('getQueryParameter returns undefined for a non-existent query parameter', () => {
  const route = {
    query: {}
  }
  const result = getQueryParameter(route, 'param')
  expect(result).toBeUndefined()
})

