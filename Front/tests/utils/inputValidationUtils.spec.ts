// @ts-nocheck
test('isValidEmail validates emails correctly', () => {
  expect(isValidEmail('test@example.com')).toBe(true);
  expect(isValidEmail('invalid-email')).toBe(false);
});

test('isValidPassword validates passwords correctly', () => {
  expect(isValidPassword('password123')).toBe(true);
  expect(isValidPassword('short')).toBe(false);
});

test('isNotEmpty checks if a string is not empty correctly', () => {
  expect(isNotEmpty('not empty')).toBe(true);
  expect(isNotEmpty('   ')).toBe(false);
});

test('doesCityExist checks if a city exists correctly', async () => {
  expect(await doesCityExist('Paris')).toBe(true);
  expect(await doesCityExist('Nonexistent City')).toBe(false);
});