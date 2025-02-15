import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

interface MaterialInputProps extends TextInputProps {
  label: string;
  error?: string;
}

export function MaterialInput({ label, error, style, ...props }: MaterialInputProps) {
  const labelPosition = useSharedValue(props.value ? 1 : 0);

  const labelStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: withSpring(labelPosition.value ? -20 : 0, {
          damping: 20,
          stiffness: 200,
        }),
      },
      {
        scale: withSpring(labelPosition.value ? 0.8 : 1, {
          damping: 20,
          stiffness: 200,
        }),
      },
    ],
  }));

  return (
    <View style={[styles.container, style]}>
      <Animated.Text style={[styles.label, labelStyle]}>{label}</Animated.Text>
      <TextInput
        style={[styles.input, error && styles.inputError]}
        onFocus={() => (labelPosition.value = 1)}
        onBlur={() => {
          if (!props.value) {
            labelPosition.value = 0;
          }
        }}
        placeholderTextColor="rgba(255, 255, 255, 0.6)"
        {...props}
      />
      {error && <Text style={styles.error}>{error}</Text>}
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    position: 'absolute',
    left: 0,
    color: '#fff',
    fontSize: 16,
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(255, 255, 255, 0.3)',
    paddingVertical: 8,
    color: '#fff',
    fontSize: 16,
  },
  inputError: {
    borderBottomColor: '#FF3B30',
  },
  error: {
    color: '#FF3B30',
    fontSize: 12,
    marginTop: 4,
  },
});