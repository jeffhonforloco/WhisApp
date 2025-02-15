import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import * as Sentry from '@sentry/react-native';
import Constants from 'expo-constants';
import { AuthProvider } from '../src/contexts/AuthContext';
import { store } from '../src/store';

// Initialize Sentry
Sentry.init({
  dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
  enableInExpoDevelopment: true,
  debug: __DEV__,
  tracesSampleRate: 1.0,
});

declare global {
  interface Window {
    frameworkReady?: () => void;
  }
}

function ErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <Sentry.ErrorBoundary
      fallback={({ error }) => (
        <Stack>
          <Stack.Screen
            name="error"
            options={{
              title: 'Something went wrong',
              headerShown: true,
            }}
          />
        </Stack>
      )}>
      {children}
    </Sentry.ErrorBoundary>
  );
}

export default function RootLayout() {
  useEffect(() => {
    window.frameworkReady?.();
  }, []);

  return (
    <Provider store={store}>
      <AuthProvider>
        <ErrorBoundary>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
          <StatusBar style="light" />
        </ErrorBoundary>
      </AuthProvider>
    </Provider>
  );
}