export const practiceFormData = {
  firstName: 'Test',
  lastName: 'User',
  email: 'test.user@example.com',
  gender: 'Male' as const,
  mobile: '9876543210',
  dateOfBirth: '01 Jan 1990',
  subjects: ['Maths', 'English'],
  hobbies: ['Sports', 'Reading'] as ('Sports' | 'Reading' | 'Music')[],
  address: '123 Test Street',
  state: 'NCR',
  city: 'Delhi',
};