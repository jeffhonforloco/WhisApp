import { StyleSheet, TouchableOpacity, Text, View, ActivityIndicator, Platform } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  withSpring,
  useSharedValue 
} from 'react-native-reanimated';

interface WebButtonProps {
  onPress: () => void;
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  loading?: boolean;
  loadingText?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  disabled?: boolean;
  style?: any;
  textStyle?: any;
}

export function WebButton({ 
  onPress,
  title,
  variant = 'primary',
  size = 'medium',
  fullWidth,
  loading,
  loadingText,
  startIcon,
  endIcon,
  disabled,
  style,
  textStyle,
}: WebButtonProps) {
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
    <Animated.View 
      style={[
        animatedStyle,
        fullWidth && styles.fullWidth,
      ]}
    >
      <TouchableOpacity
        onPress={loading ? undefined : onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
        style={[
          styles.button,
          styles[variant],
          styles[size],
          disabled && styles.disabled,
          Platform.select({
            web: {
              cursor: disabled || loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease',
              ':hover': {
                transform: 'translateY(-1px)',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
              },
            },
          }),
          style,
        ]}
      >
        <View style={styles.content}>
          {loading && (
            <ActivityIndicator 
              color={variant === 'outline' || variant === 'ghost' ? '#FF3B30' : '#fff'} 
              style={styles.loader}
            />
          )}
          {startIcon && !loading && (
            <View style={styles.startIcon}>{startIcon}</View>
          )}
          <Text style={[
            styles.text,
            styles[`${size}Text`],
            variant === 'outline' && styles.outlineText,
            variant === 'ghost' && styles.ghostText,
            disabled && styles.disabledText,
            textStyle,
          ]}>
            {loading ? loadingText || 'Loading...' : title}
          </Text>
          {endIcon && !loading && (
            <View style={styles.endIcon}>{endIcon}</View>
          )}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  fullWidth: {
    width: '100%',
  },
  button: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: '#FF3B30',
  },
  secondary: {
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#FF3B30',
  },
  ghost: {
    backgroundColor: 'transparent',
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
  outlineText: {
    color: '#FF3B30',
  },
  ghostText: {
    color: '#FF3B30',
  },
  disabled: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderColor: 'transparent',
  },
  disabledText: {
    color: 'rgba(255,255,255,0.3)',
  },
  loader: {
    marginRight: 8,
  },
  startIcon: {
    marginRight: 8,
  },
  endIcon: {
    marginLeft: 8,
  },
});