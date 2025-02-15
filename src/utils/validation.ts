// Enhanced validation with better error handling and type safety
export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export function validateEmail(email: string): ValidationResult {
  const errors: ValidationError[] = [];
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email) {
    errors.push({
      field: 'email',
      message: 'Email is required',
      code: 'REQUIRED',
    });
  } else if (!emailRegex.test(email)) {
    errors.push({
      field: 'email',
      message: 'Invalid email format',
      code: 'INVALID_FORMAT',
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function validatePassword(password: string): ValidationResult {
  const errors: ValidationError[] = [];
  
  if (!password) {
    errors.push({
      field: 'password',
      message: 'Password is required',
      code: 'REQUIRED',
    });
    return { isValid: false, errors };
  }

  const validations = [
    {
      test: (p: string) => p.length >= 8,
      message: 'Password must be at least 8 characters long',
      code: 'MIN_LENGTH',
    },
    {
      test: (p: string) => /[A-Z]/.test(p),
      message: 'Password must contain at least one uppercase letter',
      code: 'UPPERCASE_REQUIRED',
    },
    {
      test: (p: string) => /[a-z]/.test(p),
      message: 'Password must contain at least one lowercase letter',
      code: 'LOWERCASE_REQUIRED',
    },
    {
      test: (p: string) => /[0-9]/.test(p),
      message: 'Password must contain at least one number',
      code: 'NUMBER_REQUIRED',
    },
    {
      test: (p: string) => /[!@#$%^&*]/.test(p),
      message: 'Password must contain at least one special character',
      code: 'SPECIAL_CHAR_REQUIRED',
    },
  ];

  validations.forEach(({ test, message, code }) => {
    if (!test(password)) {
      errors.push({
        field: 'password',
        message,
        code,
      });
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function validateUsername(username: string): ValidationResult {
  const errors: ValidationError[] = [];
  
  if (!username) {
    errors.push({
      field: 'username',
      message: 'Username is required',
      code: 'REQUIRED',
    });
    return { isValid: false, errors };
  }

  const validations = [
    {
      test: (u: string) => u.length >= 3,
      message: 'Username must be at least 3 characters long',
      code: 'MIN_LENGTH',
    },
    {
      test: (u: string) => u.length <= 20,
      message: 'Username must be less than 20 characters long',
      code: 'MAX_LENGTH',
    },
    {
      test: (u: string) => /^[a-zA-Z0-9_]+$/.test(u),
      message: 'Username can only contain letters, numbers, and underscores',
      code: 'INVALID_CHARS',
    },
  ];

  validations.forEach(({ test, message, code }) => {
    if (!test(username)) {
      errors.push({
        field: 'username',
        message,
        code,
      });
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function validateAudioFile(file: File): ValidationResult {
  const errors: ValidationError[] = [];
  const maxSize = 10 * 1024 * 1024; // 10MB
  const allowedTypes = ['audio/mpeg', 'audio/mp4', 'audio/wav', 'audio/ogg'];
  
  if (!file) {
    errors.push({
      field: 'file',
      message: 'Audio file is required',
      code: 'REQUIRED',
    });
    return { isValid: false, errors };
  }

  if (file.size > maxSize) {
    errors.push({
      field: 'file',
      message: 'Audio file must be less than 10MB',
      code: 'FILE_TOO_LARGE',
    });
  }

  if (!allowedTypes.includes(file.type)) {
    errors.push({
      field: 'file',
      message: 'Invalid audio file format',
      code: 'INVALID_FORMAT',
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}