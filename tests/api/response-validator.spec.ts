import { test, expect } from '@playwright/test';
import { validateUserResponse } from '../../utils/response-validator';

test.describe('API Response Validation', () => {

  test('should accept a valid response', () => {
    const response = {
      id: 101,
      name: 'Test',
      email: 'test@example.com',
      roles: ['ADMIN', 'USER'],
    };

    expect(() => validateUserResponse(response)).not.toThrow();
  });

  test('should reject response when id is not numeric', () => {
    const response = {
      id: '101',
      name: 'Test',
      email: 'test@example.com',
      roles: ['ADMIN'],
    };

    expect(() => validateUserResponse(response))
      .toThrow('id must exist and be numeric');
  });

  test('should reject response when name is empty', () => {
    const response = {
      id: 101,
      name: '   ',
      email: 'test@example.com',
      roles: ['ADMIN'],
    };

    expect(() => validateUserResponse(response))
      .toThrow('name must exist and be non-empty');
  });

  test('should reject response when email is invalid', () => {
    const response = {
      id: 101,
      name: 'Test',
      email: 'invalid-email',
      roles: ['ADMIN'],
    };

    expect(() => validateUserResponse(response))
      .toThrow('email must exist and have a valid format');
  });

  test('should reject response when roles are empty', () => {
    const response = {
      id: 101,
      name: 'Test',
      email: 'test@example.com',
      roles: [],
    };

    expect(() => validateUserResponse(response))
      .toThrow('roles must exist and contain at least one role');
  });

  test('should reject response when id is missing', () => {
    const response = {
      name: 'Test',
      email: 'test@example.com',
      roles: ['ADMIN'],
    };

    expect(() => validateUserResponse(response))
      .toThrow('id must exist and be numeric');
  });

  test('should reject response when name is missing', () => {
    const response = {
      id: 101,
      email: 'test@example.com',
      roles: ['ADMIN'],
    };

    expect(() => validateUserResponse(response))
      .toThrow('name must exist and be non-empty');
  });

  test('should reject response when email is missing', () => {
    const response = {
      id: 101,
      name: 'Test',
      roles: ['ADMIN'],
    };

    expect(() => validateUserResponse(response))
      .toThrow('email must exist and have a valid format');
  });

  test('should reject response when roles are missing', () => {
    const response = {
      id: 101,
      name: 'Test',
      email: 'test@example.com',
    };

    expect(() => validateUserResponse(response))
      .toThrow('roles must exist and contain at least one role');
  });

});