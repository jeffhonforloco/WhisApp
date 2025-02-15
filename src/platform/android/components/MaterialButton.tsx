import { StyleSheet, Pressable, Text, View, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  withSpring,
  useSharedValue 
} from 'react-native-reanimated';

interface MaterialButtonProps {
  onPress: () => void;
  title: string;
  variant?: 'contained' | 'outlined' | 'text';
  color?: string;
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  loadingColor?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  fullWidth?: boolean;
}

export function MaterialButton({ 
  onPress,
  title,
  variant = 'contained',
  color = '#FF3B30',
  size = 'medium',
  loading = false,
  loadingColor,
  startIcon,
  endIcon,
  style,
  textStyle,
  disabled,
  fullWidth,
}: MaterialButtonProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.98);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  return (
    <Animated.View style={[
      animatedStyle,
      fullWidth && styles.fullWidth,
      style,
    ]}>
      <Pressable
        onPress={loading ? undefined : onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
        android_ripple={{
          color: 'rgba(255,255,255,0.2)',
          borderless: false,
        }}
        style={[
          styles.button,
          styles[size],
          variant === 'contained' && { backgroundColor: color },
          variant === 'outlined' && { 
            borderWidth: 2, 
            borderColor: color 
          },
          disabled && styles.disabled,
        ]}
      >
        <View style={styles.content}>
          {loading ? (
            <ActivityIndicator 
              color={loadingColor || (variant === 'contained' ? '#fff' : color)} 
              size={size === 'small' ? 'small' : 'small'}
            />
          ) : (
            <>
              {startIcon && <View style={styles.startIcon}>{startIcon}</View>}
              }
              <Text style={[
                styles.text,
                styles[`${size}Text`],
                variant !== 'contained' && { color },
                disabled && styles.disabledText,
                textStyle,
              ]}>
                {title}
              </Text>
              {endIcon && <View style={styles.endIcon}>{endIcon}</View>}
              }
            </>
          )}
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  fullWidth: {
    width: '100%',
  },
  button: {
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  small: {
    height: 32,
    paddingHorizontal: 16,
  },
  medium: {
    height: 40,
    paddingHorizontal: 20,
  },
  large: {
    height: 48,
    paddingHorizontal: 24,
  },
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },
  text: {
    color: '#fff',
    fontWeight: '600',
  },
  disabled: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderColor: 'transparent',
    elevation: 0,
  },
  disabledText: {
    color: 'rgba(255,255,255,0.3)',
  },
  startIcon: {
    marginRight: 8,
  },
  endIcon: {
    marginLeft: 8,
  },
});