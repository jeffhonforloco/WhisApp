import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Animated, { 
  FadeIn, 
  FadeOut,
  SlideInUp,
  SlideOutDown,
  useAnimatedStyle,
  withSpring,
  useSharedValue,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

interface MenuItem {
  id: string;
  label: string;
  icon?: string;
  onPress: () => void;
  destructive?: boolean;
}

interface BottomSheetMenuProps {
  visible: boolean;
  onClose: () => void;
  items: MenuItem[];
  title?: string;
}

export function BottomSheetMenu({ 
  visible, 
  onClose, 
  items,
  title 
}: BottomSheetMenuProps) {
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
        translateY.value = withSpring(400);
        onClose();
      } else {
        translateY.value = withSpring(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

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
          {items.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={() => {
                onClose();
                item.onPress();
              }}
              android_ripple={{
                color: 'rgba(255,255,255,0.1)',
              }}
            >
              <Text style={[
                styles.menuText,
                item.destructive && styles.destructiveText,
              ]}>
                {item.label}
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
    backgroundColor: 'rgba(0,0,0,0.5)',
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
  menuItem: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  menuText: {
    color: '#fff',
    fontSize: 16,
  },
  destructiveText: {
    color: '#FF3B30',
  },
});