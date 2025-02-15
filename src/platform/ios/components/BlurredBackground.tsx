import { StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';

interface BlurredBackgroundProps {
  intensity?: number;
  children: React.ReactNode;
}

export function BlurredBackground({ intensity = 70, children }: BlurredBackgroundProps) {
  return (
    <BlurView intensity={intensity} tint="dark" style={styles.container}>
      {children}
    </BlurView>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
});