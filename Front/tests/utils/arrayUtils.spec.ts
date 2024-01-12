// @ts-nocheck
test('removeDuplicates removes duplicates from an array', () => {
  const array = [1, 2, 2, 3, 3, 3]
  const result = removeDuplicates(array)
  expect(result).toEqual([1, 2, 3])
})

test('includesAll checks if an array includes all elements of another array', () => {
  const array = [1, 2, 3, 4, 5]
  const subArray = [2, 3, 4]
  const result = includesAll(array, subArray)
  expect(result).toBe(true)
})

test('includesAny checks if an array includes any element of another array', () => {
  const array = [1, 2, 3, 4, 5]
  const subArray = [0, 6, 3]
  const result = includesAny(array, subArray)
  expect(result).toBe(true)
})

test('difference finds the difference between two arrays', () => {
  const array1 = [1, 2, 3, 4, 5]
  const array2 = [4, 5, 6, 7, 8]
  const result = difference(array1, array2)
  expect(result).toEqual([1, 2, 3])
})
