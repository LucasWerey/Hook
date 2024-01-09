/**
 * Removes duplicates from an array.
 * @param {T[]} array - The array to remove duplicates from.
 * @returns {T[]} The array without duplicates.
 */
export function removeDuplicates<T>(array: T[]): T[] {
  return [...new Set(array)]
}

/**
 * Checks if an array includes all elements of another array.
 * @param {T[]} array - The array to check.
 * @param {T[]} subArray - The subarray to check for.
 * @returns {boolean} Whether the array includes all elements of the subarray.
 */
export function includesAll<T>(array: T[], subArray: T[]): boolean {
  return subArray.every(val => array.includes(val))
}

/**
 * Checks if an array includes any element of another array.
 * @param {T[]} array - The array to check.
 * @param {T[]} subArray - The subarray to check for.
 * @returns {boolean} Whether the array includes any element of the subarray.
 */
export function includesAny<T>(array: T[], subArray: T[]): boolean {
  return subArray.some(val => array.includes(val))
}

/**
 * Finds the difference between two arrays.
 * @param {T[]} array1 - The first array.
 * @param {T[]} array2 - The second array.
 * @returns {T[]} The difference between the two arrays.
 */
export function difference<T>(array1: T[], array2: T[]): T[] {
  return array1.filter(x => !array2.includes(x))
}
