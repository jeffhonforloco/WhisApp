import * as Sentry from '@sentry/react-native';
import { Platform } from 'react-native';

// Enhanced performance monitoring
export function startPerformanceTransaction(name: string, options?: {
  op?: string;
  description?: string;
  tags?: Record<string, string>;
}) {
  const transaction = Sentry.startTransaction({
    name,
    op: options?.op || 'navigation',
    description: options?.description,
    tags: options?.tags,
  });

  return {
    transaction,
    end: (status: 'ok' | 'error' | 'cancelled' = 'ok') => {
      transaction.setStatus(status);
      transaction.finish();
    },
    addSpan: (name: string, operation: () => Promise<any>) => {
      const span = transaction.startChild({ op: name });
      return operation()
        .then((result) => {
          span.setStatus('ok');
          return result;
        })
        .catch((error) => {
          span.setStatus('error');
          throw error;
        })
        .finally(() => {
          span.finish();
        });
    },
  };
}

// Improved async operation measurement with retry support
export async function measureAsyncOperation<T>(
  name: string,
  operation: () => Promise<T>,
  options?: {
    retries?: number;
    backoff?: number;
    tags?: Record<string, string>;
  }
): Promise<T> {
  const span = Sentry.startTransaction({
    name: `async_op.${name}`,
    op: 'async',
    tags: options?.tags,
  });

  let attempt = 0;
  const maxRetries = options?.retries || 0;
  const backoff = options?.backoff || 1000;

  while (true) {
    try {
      const result = await operation();
      span.setStatus('ok');
      return result;
    } catch (error) {
      attempt++;
      if (attempt > maxRetries) {
        span.setStatus('error');
        throw error;
      }
      // Wait with exponential backoff
      await new Promise(resolve => 
        setTimeout(resolve, backoff * Math.pow(2, attempt - 1))
      );
    } finally {
      if (attempt >= maxRetries) {
        span.finish();
      }
    }
  }
}

// Web-specific performance monitoring
export const webVitals = Platform.select({
  web: () => {
    if ('performance' in window) {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          Sentry.addBreadcrumb({
            category: 'performance',
            message: entry.name,
            data: {
              value: entry.startTime,
              metric: entry.entryType,
            },
          });
        });
      });

      observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
    }
  },
  default: () => {},
});