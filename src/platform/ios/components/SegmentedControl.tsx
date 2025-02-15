import { useCallback, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, LayoutChangeEvent } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  withSpring,
  useSharedValue,
} from 'react-native-reanimated';

interface SegmentedControlProps {
  values: string[];
  selectedIndex: number;
  onChange: (index: number) => void;
  style?: any;
}

export function SegmentedControl({ 
  values, 
  selectedIndex, 
  onChange,
  style,
}: SegmentedControlProps) {
  const [segmentWidth, setSegmentWidth] = useState(0);
  const translateX = useSharedValue(0);

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    const width = event.nativeEvent.layout.width / values.length;
    setSegmentWidth(width);
    translateX.value = width * selectedIndex;
  }, [values.length, selectedIndex]);

  const handlePress = useCallback((index: number) => {
    translateX.value = withSpring(segmentWidth * index);
    onChange(index);
  }, [segmentWidth, onChange]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    width: segmentWidth,
  }));

  return (
    <View style={[styles.container, style]} onLayout={handleLayout}>
      <Animated.View style={[styles.selector, animatedStyle]} />
      {values.map((value, index) => (
        <TouchableOpacity
          key={index}
          style={styles.segment}
          onPress={() => handlePress(index)}
        >
          <Text style={[
            styles.text,
            index === selectedIndex && styles.activeText,
          ]}>
            {value}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 32,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 8,
    flexDirection: 'row',
    padding: 2,
  },
  segment: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selector: {
    position: 'absolute',
    top: 2,
    bottom: 2,
    backgroundColor: '#fff',
    borderRadius: 6,
  },
  text: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 13,
    fontWeight: '600',
  },
  activeText: {
    color: '#000',
  },
});