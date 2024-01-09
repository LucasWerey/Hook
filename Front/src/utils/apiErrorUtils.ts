export class ApiError extends Error {
  status: number
  message: string

  constructor(status: number, message: string) {
    super(message)
    this.status = status
    this.message = message
  }
}

/**
 * Handles API errors by creating and returning an ApiError object.
 *
 * @param {any} error - The error object thrown by axios.
 * @returns {ApiError} - An ApiError object with the status code and message.
 */
export function handleApiError(error: any): ApiError {
  if (error.response) {
    console.log(error.response.data)
    console.log(error.response.status)
    console.log(error.response.headers)

    if (error.response.status === 401) {
      return new ApiError(401, 'Unauthorized: Please login again.')
    } else if (error.response.status === 403) {
      return new ApiError(403, 'Forbidden: You do not have permission to perform this action.')
    } else if (error.response.status === 404) {
      return new ApiError(404, 'Not Found: The requested resource could not be found.')
    } else {
      return new ApiError(error.response.status, error.response.data)
    }
  } else if (error.request) {
    console.log(error.request)
    return new ApiError(500, 'No response received from server')
  } else {
    console.log('Error', error.message)
    return new ApiError(500, error.message)
  }
}
