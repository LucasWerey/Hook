// @ts-nocheck
test('converts years to months', () => {
  const years = 3
  const result = convertYearsToMonths(years)
  expect(result).toBe(36)
})
