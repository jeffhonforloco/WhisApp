import { StyleSheet } from 'react-native';

export const iosStyles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    elevation: 0,
    height: 90,
    paddingBottom: 30,
  },
  blurView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  input: {
    borderRadius: 8,
    padding: 16,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  button: {
    borderRadius: 8,
    backgroundColor: '#FF3B30',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});