import { TextInput, TextInputProps, ViewStyle } from 'react-native';
import { platformStyles } from '../../platform';

interface PlatformInputProps extends TextInputProps {
  style?: ViewStyle;
}

export function PlatformInput({ style, ...props }: PlatformInputProps) {
  return (
    <TextInput
      style={[platformStyles.input, style]}
      placeholderTextColor="rgba(255,255,255,0.6)"
      {...props}
    />
  );
}