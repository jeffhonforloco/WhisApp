import * as Sentry from '@sentry/react-native';

type EventName = 
  | 'whisper_created'
  | 'whisper_liked'
  | 'user_signup'
  | 'user_login'
  | 'profile_updated';

type EventProperties = Record<string, string | number | boolean>;

export function trackEvent(name: EventName, properties?: EventProperties) {
  try {
    Sentry.addBreadcrumb({
      category: 'analytics',
      message: name,
      data: properties,
    });

    // Here you would typically also send to your analytics service
    // like Segment, Mixpanel, etc.
    
  } catch (error) {
    console.error('Failed to track event:', error);
  }
}

export function trackError(error: Error, context?: Record<string, any>) {
  Sentry.captureException(error, {
    extra: context,
  });
}