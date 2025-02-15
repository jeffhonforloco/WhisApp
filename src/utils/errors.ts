import { AuthError } from '@supabase/supabase-js';
import * as Sentry from '@sentry/react-native';

// Enhanced error types
export interface AppError extends Error {
  code: string;
  context?: Record<string, any>;
  originalError?: unknown;
}

// Error factory for consistent error creation
export class ErrorFactory {
  static create(options: {
    message: string;
    code: string;
    context?: Record<string, any>;
    originalError?: unknown;
  }): AppError {
    const error = new Error(options.message) as AppError;
    error.code = options.code;
    error.context = options.context;
    error.originalError = options.originalError;
    return error;
  }

  static fromAuthError(error: AuthError): AppError {
    return this.create({
      message: getAuthErrorMessage(error),
      code: `AUTH_${error.status || 'UNKNOWN'}`,
      originalError: error,
    });
  }

  static fromApiError(error: unknown): AppError {
    if (error instanceof Error) {
      return this.create({
        message: error.message,
        code: 'API_ERROR',
        originalError: error,
      });
    }
    return this.create({
      message: 'An unexpected error occurred',
      code: 'UNKNOWN_ERROR',
      originalError: error,
    });
  }
}

// Enhanced error handling with better context
export function handleError(error: unknown, context?: Record<string, any>) {
  let appError: AppError;

  if (error instanceof AuthError) {
    appError = ErrorFactory.fromAuthError(error);
  } else if (error instanceof Error) {
    appError = ErrorFactory.create({
      message: error.message,
      code: 'APP_ERROR',
      context,
      originalError: error,
    });
  } else {
    appError = ErrorFactory.create({
      message: 'An unexpected error occurred',
      code: 'UNKNOWN_ERROR',
      context,
      originalError: error,
    });
  }

  // Log to Sentry with enhanced context
  Sentry.captureException(appError, {
    extra: {
      ...appError.context,
      code: appError.code,
      originalError: appError.originalError,
    },
  });

  return appError;
}

// Improved auth error messages
export function getAuthErrorMessage(error: AuthError): string {
  const errorMessages: Record<string, string> = {
    'invalid-credentials': 'Invalid email or password',
    'email-not-confirmed': 'Please confirm your email address',
    'weak-password': 'Password must be at least 6 characters',
    'email-already-in-use': 'An account with this email already exists',
    'invalid-email': 'Please enter a valid email address',
    'network-request-failed': 'Network error. Please check your connection',
    'too-many-requests': 'Too many attempts. Please try again later',
    'user-disabled': 'This account has been disabled',
    'user-not-found': 'No account found with this email',
    'wrong-password': 'Incorrect password',
    'expired-action-code': 'This link has expired',
    'invalid-action-code': 'This link is invalid',
  };

  return errorMessages[error.message] || 'An unexpected error occurred';
}

// Error boundary component helper
export function getErrorBoundaryProps(error: Error) {
  return {
    title: 'Something went wrong',
    message: error.message,
    action: {
      label: 'Try Again',
      onPress: () => {
        // Implement retry logic
      },
    },
  };
}