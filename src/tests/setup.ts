import '@testing-library/jest-native/extend-expect';
import 'react-native-gesture-handler/jestSetup';
import { jest } from '@jest/globals';

// Mock Reanimated
global.ReanimatedDataMock = {
  now: () => 0,
};

// Mock Expo modules
jest.mock('expo-blur');
jest.mock('expo-haptics');
jest.mock('expo-secure-store');
jest.mock('expo-av');
jest.mock('expo-location');

// Mock safe area context
jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, right: 0, bottom: 0, left: 0 }),
  SafeAreaProvider: ({ children }: { children: React.ReactNode }) => children,
}));

// Mock platform components
jest.mock('../platform', () => ({
  isIOS: false,
  isAndroid: false,
  isWeb: true,
  platformComponents: {},
  platformConstants: {
    statusBarHeight: 0,
    tabBarHeight: 60,
  },
}));