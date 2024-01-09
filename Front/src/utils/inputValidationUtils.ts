/**
 * Checks if a string is an email.
 * @param {string} email - The string to check.
 * @returns {boolean} - True if the string is an email, false otherwise.
 */
export function isValidEmail(email: string): boolean {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

/**
 * Checks if a string is a valid password.
 * This is a very basic check, replace with your own logic.
 * @param {string} password - The string to check.
 * @returns {boolean} - True if the string is a valid password, false otherwise.
 */
export function isValidPassword(password: string): boolean {
  return password.length >= 8
}

/**
 * Checks if a string is not empty.
 * @param {string} text - The string to check.
 * @returns {boolean} - True if the string is not empty, false otherwise.
 */
export function isNotEmpty(text: string): boolean {
  return text.trim().length > 0
}

/**
 * Checks if a city exists.
 * @param {string} city - The city to check.
 * @returns {Promise<boolean>} - True if the city exists, false otherwise.
 */
export async function doesCityExist(city: string): Promise<boolean> {
  const response = await axios.get(
    'https://countriesnow.space/api/v0.1/countries/population/cities'
  )
  const cities = response.data.data
  return cities.some((c: { city: string }) => c.city.toUpperCase() === city.toUpperCase())
}
