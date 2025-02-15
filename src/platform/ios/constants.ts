import { Platform } from 'react-native';

export const constants = {
  statusBarHeight: 44,
  tabBarHeight: 90,
  bottomInset: 34,
  cornerRadius: 10,
  shadowConfig: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  animation: {
    spring: {
      damping: 500,
      mass: 3,
      stiffness: 200,
    },
  },
  haptics: {
    enabled: Platform.OS === 'ios',
    impactStyle: 'medium',
  },
};