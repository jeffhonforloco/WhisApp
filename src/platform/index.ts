import { Platform } from 'react-native';
import * as iOSComponents from './ios/components';
import * as androidComponents from './android/components';
import { constants as iOSConstants } from './ios/constants';
import { constants as androidConstants } from './android/constants';
import { iosStyles } from './ios/styles';
import { androidStyles } from './android/styles';
import { webStyles } from './web/styles';

// Improved platform detection with web support
export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';
export const isWeb = Platform.OS === 'web';
export const isMobile = isIOS || isAndroid;

// Enhanced platform-specific exports with better type safety
export const platformComponents = Platform.select({
  ios: iOSComponents,
  android: androidComponents,
  default: isWeb ? {} : iOSComponents, // Fallback to iOS components on other platforms
}) as typeof iOSComponents; // Ensure consistent typing

export const platformConstants = Platform.select({
  ios: iOSConstants,
  android: androidConstants,
  default: iOSConstants,
});

// Enhanced styles with web support
export const platformStyles = Platform.select({
  ios: iosStyles,
  android: androidStyles,
  web: webStyles,
  default: iosStyles,
});

// Helper for platform-specific implementations
export function getPlatformComponent<T>(config: {
  ios?: T;
  android?: T;
  web?: T;
  default?: T;
}): T | undefined {
  return Platform.select(config);
}

// Type-safe platform check
export function runIfPlatform(platform: 'ios' | 'android' | 'web', fn: () => void) {
  if (Platform.OS === platform) {
    fn();
  }
}