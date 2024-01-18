/**
 * Fetches all students.
 * @returns {Promise<any>} The users data.
 * @throws {Error} When an error occurs.
 */
export async function getAllStudents() {
  try {
    const response = await axios.get('http://127.0.0.1:8000/students')
    return response.data
  } catch (error) {
    throw handleApiError(error)
  }
}

/**
 * Fetches a student by ID.
 * @param {string} id - The ID of the user to fetch.
 * @returns {Promise<any>} The user data.
 * @throws {Error} When an error occurs.
 */
export async function getStudent(id: string) {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/student/${id}`)
    return response.data
  } catch (error) {
    throw handleApiError(error)
  }
}

/**
 * Creates a new student.
 * @param {any} userData - The data for the new user.
 * @returns {Promise<any>} The created user data.
 * @throws {Error} When an error occurs.
 */
export async function createStudent(userData: any) {
  try {
    const response = await axios.post('http://127.0.0.1:8000/student', userData)
    return response.data
  } catch (error) {
    throw handleApiError(error)
  }
}

/**
 * Updates a student.
 * @param {string} id - The ID of the user to update.
 * @param {any} userData - The new data for the user.
 * @returns {Promise<any>} The updated user data.
 * @throws {Error} When an error occurs.
 */
export async function updateStudent(id: string, userData: any) {
  try {
    const response = await axios.put(`http://127.0.0.1:8000/student/${id}`, userData)
    return response.data
  } catch (error) {
    throw handleApiError(error)
  }
}

/**
 * Deletes a student.
 * @param {string} id - The ID of the user to delete.
 * @returns {Promise<any>} The response data.
 * @throws {Error} When an error occurs.
 */
export async function deleteStudent(id: string) {
  try {
    const response = await axios.delete(`http://127.0.0.1:8000/student/${id}`)
    return response.data
  } catch (error) {
    throw handleApiError(error)
  }
}
