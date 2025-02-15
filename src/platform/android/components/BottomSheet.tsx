import { useCallback } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, BackHandler } from 'react-native';
import Animated, { 
  FadeIn, 
  FadeOut, 
  SlideInUp, 
  SlideOutDown,
  useAnimatedStyle,
  withSpring,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

interface BottomSheetOption {
  label: string;
  onPress: () => void;
  icon?: string;
  destructive?: boolean;
}

interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  options: BottomSheetOption[];
  title?: string;
}

export function BottomSheet({ visible, onClose, options, title }: BottomSheetProps) {
  const translateY = useSharedValue(0);
  const context = useSharedValue(0);

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = translateY.value;
    })
    .onUpdate((event) => {
      translateY.value = event.translationY + context.value;
      if (translateY.value < 0) {
        translateY.value = 0;
      }
    })
    .onEnd((event) => {
      if (event.velocityY > 500 || translateY.value > 200) {
        translateY.value = withSpring(400, { velocity: event.velocityY });
        onClose();
      } else {
        translateY.value = withSpring(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const handleOptionPress = useCallback((option: BottomSheetOption) => {
    onClose();
    option.onPress();
  }, [onClose]);

  if (!visible) return null;

  return (
    <Animated.View 
      entering={FadeIn}
      exiting={FadeOut}
      style={styles.overlay}
    >
      <TouchableOpacity 
        style={styles.backdrop} 
        onPress={onClose} 
        activeOpacity={1}
      />
      <GestureDetector gesture={gesture}>
        <Animated.View
          entering={SlideInUp}
          exiting={SlideOutDown}
          style={[styles.sheet, animatedStyle]}
        >
          <View style={styles.handle} />
          {title && (
            <Text style={styles.title}>{title}</Text>
          )}
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.option}
              onPress={() => handleOptionPress(option)}
            >
              <Text style={[
                styles.optionText,
                option.destructive && styles.destructiveText,
              ]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </Animated.View>
      </GestureDetector>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    zIndex: 1000,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  sheet: {
    backgroundColor: '#2C2C2E',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: 32,
    elevation: 24,
  },
  handle: {
    width: 32,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 2,
    marginVertical: 8,
    alignSelf: 'center',
  },
  title: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 16,
  },
  option: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  optionText: {
    color: '#fff',
    fontSize: 16,
  },
  destructiveText: {
    color: '#FF3B30',
  },
});