import { Pressable, StyleSheet, View } from 'react-native';
import { Platform } from 'react-native';

interface RippleButtonProps {
  onPress?: () => void;
  children: React.ReactNode;
  borderless?: boolean;
  rippleColor?: string;
}

export function RippleButton({
  onPress,
  children,
  borderless = false,
  rippleColor = 'rgba(255, 255, 255, 0.2)',
}: RippleButtonProps) {
  if (Platform.OS !== 'android') {
    return (
      <Pressable onPress={onPress} style={styles.container}>
        {children}
      </Pressable>
    );
  }

  return (
    <View style={styles.container}>
      <Pressable
        onPress={onPress}
        android_ripple={{
          color: rippleColor,
          borderless,
        }}>
        {children}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
});