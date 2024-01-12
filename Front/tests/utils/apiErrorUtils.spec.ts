// @ts-nocheck

test('handleApiError handles response errors correctly', () => {
  const error = {
    response: {
      data: 'Not Found',
      status: 404,
      headers: {}
    }
  }
  const result = handleApiError(error)
  expect(result).toBeInstanceOf(ApiError)
  expect(result.status).toBe(404)
  expect(result.message).toBe('Not Found: The requested resource could not be found.')
})

test('handleApiError handles request errors correctly', () => {
  const error = {
    request: {}
  }
  const result = handleApiError(error)
  expect(result).toBeInstanceOf(ApiError)
  expect(result.status).toBe(500)
  expect(result.message).toBe('No response received from server')
})

test('handleApiError handles other errors correctly', () => {
  const error = {
    message: 'An unknown error occurred'
  }
  const result = handleApiError(error)
  expect(result).toBeInstanceOf(ApiError)
  expect(result.status).toBe(500)
  expect(result.message).toBe('An unknown error occurred')
})
