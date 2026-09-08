export function validateUserResponse(response: unknown): void {
  if (
    typeof response !== 'object' ||
    response === null
  ) {
    throw new Error('Response must be a valid object');
  }

  const data = response as Record<string, unknown>;

  if (typeof data.id !== 'number') {
    throw new Error('id must exist and be numeric');
  }

  if (
    typeof data.name !== 'string' ||
    data.name.trim() === ''
  ) {
    throw new Error('name must exist and be non-empty');
  }

  if (
    typeof data.email !== 'string' ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)
  ) {
    throw new Error('email must exist and have a valid format');
  }

  if (
    !Array.isArray(data.roles) ||
    data.roles.length === 0
  ) {
    throw new Error('roles must exist and contain at least one role');
  }
}