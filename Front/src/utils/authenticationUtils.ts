export class AuthenticationUtils {
  /**
   * Stores the authentication token.
   *
   * @param {string} token - The authentication token.
   */
  static setToken(token: string): void {
    localStorage.setItem('authToken', token)
  }

  /**
   * Retrieves the authentication token.
   *
   * @returns {string | null} - The authentication token, or null if no token is stored.
   */
  static getToken(): string | null {
    return localStorage.getItem('authToken')
  }

  /**
   * Removes the authentication token.
   */
  static removeToken(): void {
    localStorage.removeItem('authToken')
  }

  /**
   * Checks if an authentication token is present.
   *
   * @returns {boolean} - True if a token is stored, false otherwise.
   */
  static isAuthenticated(): boolean {
    return this.getToken() !== null
  }

  /**
   * Generates a mock authentication token.
   * This function creates a random string by generating a random number, converting it to a base-36 string,
   * and then removing the leading '0.' from the string. It then appends the current timestamp (also in base-36)
   * to ensure uniqueness.
   *
   * @returns {string} The generated mock token.
   */
  static generateMockToken(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36)
  }
}
