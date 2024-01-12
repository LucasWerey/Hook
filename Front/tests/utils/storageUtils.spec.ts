// @ts-nocheck
test('setLocalStorage stores a value correctly', () => {
  setLocalStorage('testKey', 'testValue');
  expect(localStorage.getItem('testKey')).toBe('testValue');
});

test('getLocalStorage retrieves a stored value correctly', () => {
  localStorage.setItem('testKey', 'testValue');
  const result = getLocalStorage('testKey');
  expect(result).toBe('testValue');
});

test('removeLocalStorage removes a stored value correctly', () => {
  localStorage.setItem('testKey', 'testValue');
  removeLocalStorage('testKey');
  expect(localStorage.getItem('testKey')).toBeNull();
});

test('setSessionStorage stores a value correctly', () => {
  setSessionStorage('testKey', 'testValue');
  expect(sessionStorage.getItem('testKey')).toBe('testValue');
});

test('getSessionStorage retrieves a stored value correctly', () => {
  sessionStorage.setItem('testKey', 'testValue');
  const result = getSessionStorage('testKey');
  expect(result).toBe('testValue');
});

test('removeSessionStorage removes a stored value correctly', () => {
  sessionStorage.setItem('testKey', 'testValue');
  removeSessionStorage('testKey');
  expect(sessionStorage.getItem('testKey')).toBeNull();
});

test('clearLocalStorage clears all keys correctly', () => {
  localStorage.setItem('testKey1', 'testValue1');
  localStorage.setItem('testKey2', 'testValue2');
  clearLocalStorage();
  expect(localStorage.getItem('testKey1')).toBeNull();
  expect(localStorage.getItem('testKey2')).toBeNull();
});

test('clearSessionStorage clears all keys correctly', () => {
  sessionStorage.setItem('testKey1', 'testValue1');
  sessionStorage.setItem('testKey2', 'testValue2');
  clearSessionStorage();
  expect(sessionStorage.getItem('testKey1')).toBeNull();
  expect(sessionStorage.getItem('testKey2')).toBeNull();
});