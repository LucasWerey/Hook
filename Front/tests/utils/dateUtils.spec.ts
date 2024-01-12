// @ts-nocheck
test('formatDate formats a date correctly', () => {
  const date = new Date(2022, 0, 1) // January 1, 2022
  const result = DateUtils.formatDate(date)
  expect(result).toBe('2022-01-01')
})

test('daysBetween calculates the number of days between two dates correctly', () => {
  const date1 = new Date(2022, 0, 1) // January 1, 2022
  const date2 = new Date(2022, 0, 5) // January 5, 2022
  const result = DateUtils.daysBetween(date1, date2)
  expect(result).toBe(4)
})

test('addDays adds a number of days to a date correctly', () => {
  const date = new Date(2022, 0, 1) // January 1, 2022
  const result = DateUtils.addDays(date, 5)
  expect(result).toEqual(new Date(2022, 0, 6)) // January 6, 2022
})
