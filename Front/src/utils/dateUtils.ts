export class DateUtils {
  /**
   * Formats a Date object as a string in the format YYYY-MM-DD.
   *
   * @param {Date} date - The date to format.
   * @returns {string} - The formatted date.
   */
  static formatDate(date: Date): string {
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  /**
   * Returns the number of days between two dates.
   *
   * @param {Date} date1 - The first date.
   * @param {Date} date2 - The second date.
   * @returns {number} - The number of days between the two dates.
   */
  static daysBetween(date1: Date, date2: Date): number {
    const oneDay = 24 * 60 * 60 * 1000 // hours*minutes*seconds*milliseconds
    const diffDays = Math.round(Math.abs((date1.getTime() - date2.getTime()) / oneDay))
    return diffDays
  }

  /**
   * Adds a specified number of days to a date.
   *
   * @param {Date} date - The date to add days to.
   * @param {number} days - The number of days to add.
   * @returns {Date} - The new date.
   */
  static addDays(date: Date, days: number): Date {
    const newDate = new Date(date)
    newDate.setDate(date.getDate() + days)
    return newDate
  }
}
