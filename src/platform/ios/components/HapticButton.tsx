import { TouchableOpacity, TouchableOpacityProps, ActivityIndicator } from 'react-native';
import * as Haptics from 'expo-haptics';
import { isIOS } from '../../index';
import Animated, { 
  useAnimatedStyle, 
  withSpring,
  useSharedValue 
} from 'react-native-reanimated';

interface HapticButtonProps extends TouchableOpacityProps {
  hapticStyle?: 'light' | 'medium' | 'heavy';
  loading?: boolean;
  loadingColor?: string;
  animated?: boolean;
  children: React.ReactNode;
}

export function HapticButton({ 
  hapticStyle = 'medium',
  loading = false,
  loadingColor = '#fff',
  animated = true,
  onPress,
  children,
  style,
  ...props 
}: HapticButtonProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = async () => {
    if (animated) {
      scale.value = withSpring(0.95);
    }

    if (isIOS) {
      switch (hapticStyle) {
        case 'light':
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          break;
        case 'medium':
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          break;
        case 'heavy':
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
          break;
      }
    }
  };

  const handlePressOut = () => {
    if (animated) {
      scale.value = withSpring(1);
    }
  };

  const handlePress = () => {
    if (!loading && onPress) {
      onPress();
    }
  };

  const Container = animated ? Animated.View : View;
  const containerStyle = animated ? animatedStyle : undefined;

  return (
    <Container style={[containerStyle, style]}>
      <TouchableOpacity
        {...props}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={loading || props.disabled}
      >
        {loading ? (
          <ActivityIndicator color={loadingColor} />
        ) : (
          children
        )}
      </TouchableOpacity>
    </Container>
  );
}