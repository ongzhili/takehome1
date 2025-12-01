const { validateEmail, validatePhoneNumber } = require('../src/utils/validators');

describe('Validators', () => {
  describe('validateEmail', () => {
    test('should return true for valid email', () => {
      expect(validateEmail('test@example.com')).toBe(true);
    });

    test('should return true for email with subdomain', () => {
      expect(validateEmail('user@mail.example.com')).toBe(true);
    });

    test('should return false for email without @', () => {
      expect(validateEmail('testexample.com')).toBe(false);
    });

    test('should return false for email without domain', () => {
      expect(validateEmail('test@')).toBe(false);
    });

    test('should return false for email with spaces', () => {
      expect(validateEmail('test @example.com')).toBe(false);
    });

    test('should trim whitespace', () => {
      expect(validateEmail('  test@example.com  ')).toBe(true);
    });
  });

  describe('validatePhoneNumber', () => {
    test('should return true for valid phone number', () => {
      expect(validatePhoneNumber('5551234567')).toBe(true);
    });

    test('should return false for phone number with letters', () => {
      expect(validatePhoneNumber('555ABC4567')).toBe(false);
    });

    test('should return false for phone number with special characters', () => {
      expect(validatePhoneNumber('555-123-4567')).toBe(false);
    });

    test('should return false for phone number with spaces', () => {
      expect(validatePhoneNumber('555 123 4567')).toBe(false);
    });
  });
});