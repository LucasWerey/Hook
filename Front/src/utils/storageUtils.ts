/**
 * Stores a value in localStorage.
 * @param {string} key - The key under which to store the value.
 * @param {string} value - The value to store.
 */
export function setLocalStorage(key: string, value: string): void {
  localStorage.setItem(key, value)
}

/**
 * Retrieves a value from localStorage.
 * @param {string} key - The key of the value to retrieve.
 * @returns {string | null} - The retrieved value, or null if not found.
 */
export function getLocalStorage(key: string): string | null {
  return localStorage.getItem(key)
}

/**
 * Removes a value from localStorage.
 * @param {string} key - The key of the value to remove.
 */
export function removeLocalStorage(key: string): void {
  localStorage.removeItem(key)
}

/**
 * Stores a value in sessionStorage.
 * @param {string} key - The key under which to store the value.
 * @param {string} value - The value to store.
 */
export function setSessionStorage(key: string, value: string): void {
  sessionStorage.setItem(key, value)
}

/**
 * Retrieves a value from sessionStorage.
 * @param {string} key - The key of the value to retrieve.
 * @returns {string | null} - The retrieved value, or null if not found.
 */
export function getSessionStorage(key: string): string | null {
  return sessionStorage.getItem(key)
}

/**
 * Removes a value from sessionStorage.
 * @param {string} key - The key of the value to remove.
 */
export function removeSessionStorage(key: string): void {
  sessionStorage.removeItem(key)
}

/**
 * Clears all keys from localStorage.
 */
export function clearLocalStorage(): void {
  localStorage.clear()
}

/**
 * Clears all keys from sessionStorage.
 */
export function clearSessionStorage(): void {
  sessionStorage.clear()
}
