/**
 * Fetches all users.
 * @returns {Promise<any>} The users data.
 * @throws {Error} When an error occurs.
 */
export async function getAllUsers() {
  try {
    const response = await axios.get('http://127.0.0.1:8000/users')
    return response.data
  } catch (error) {
    throw handleApiError(error)
  }
}

/**
 * Fetches a user by ID.
 * @param {string} id - The ID of the user to fetch.
 * @returns {Promise<any>} The user data.
 * @throws {Error} When an error occurs.
 */
export async function getUser(id: string) {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/user/${id}`)
    return response.data
  } catch (error) {
    throw handleApiError(error)
  }
}

/**
 * Creates a new user.
 * @param {any} userData - The data for the new user.
 * @returns {Promise<any>} The created user data.
 * @throws {Error} When an error occurs.
 */
export async function createUser(userData: any) {
  try {
    const response = await axios.post('http://127.0.0.1:8000/user', userData)
    return response.data
  } catch (error) {
    throw handleApiError(error)
  }
}

/**
 * Updates a user.
 * @param {string} id - The ID of the user to update.
 * @param {any} userData - The new data for the user.
 * @returns {Promise<any>} The updated user data.
 * @throws {Error} When an error occurs.
 */
export async function updateUser(id: string, userData: any) {
  try {
    const response = await axios.put(`http://127.0.0.1:8000/user/${id}`, userData)
    return response.data
  } catch (error) {
    throw handleApiError(error)
  }
}

/**
 * Deletes a user.
 * @param {string} id - The ID of the user to delete.
 * @returns {Promise<any>} The response data.
 * @throws {Error} When an error occurs.
 */
export async function deleteUser(id: string) {
  try {
    const response = await axios.delete(`http://127.0.0.1:8000/user/${id}`)
    return response.data
  } catch (error) {
    throw handleApiError(error)
  }
}

/**
 * Logs in a user.
 * @param {string} email - The email of the user to log in.
 * @param {string} password - The password of the user to log in.
 * @returns {Promise<any>} The user data.
 * @throws {Error} When an error occurs.
 */
export async function loginUser(email: string, password: string) {
  try {
    const response = await axios.post(`http://127.0.0.1:8000/login`, { email, password })
    return response.data
  } catch (error) {
    throw handleApiError(error)
  }
}

/**
 * Fetches the email from a JWT token by making a GET request to the /user/email endpoint.
 *
 * @param {string} token - The JWT token.
 * @returns {Promise<string>} The email from the JWT token.
 */
export async function getEmailFromToken(token: string): Promise<string> {
  const response = await axios.get(`http://127.0.0.1:8000/user/email/${token}`)
  return response.data
}

/**
 * Fetches the user information from a JWT token by making a GET request to the /user/info endpoint.
 *
 * @param {string} token - The JWT token.
 * @returns {Promise<any>} The user information from the JWT token.
 */
export async function getUserInfoFromToken(token: string): Promise<any> {
  const response = await axios.get(`http://127.0.0.1:8000/user/info/${token}`)
  return response.data
}
