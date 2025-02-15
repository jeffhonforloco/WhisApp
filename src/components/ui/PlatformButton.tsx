import { TouchableOpacity, Text, ViewStyle, TextStyle } from 'react-native';
import { platformStyles } from '../../platform';

interface PlatformButtonProps {
  onPress: () => void;
  title: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function PlatformButton({ 
  onPress, 
  title, 
  style, 
  textStyle 
}: PlatformButtonProps) {
  return (
    <TouchableOpacity
      style={[platformStyles.button, style]}
      onPress={onPress}
    >
      <Text style={[{ color: '#fff', fontSize: 16, fontWeight: '600' }, textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}