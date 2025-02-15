import { useCallback } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import Animated, { FadeIn, FadeOut, SlideInDown, SlideOutDown } from 'react-native-reanimated';

interface ActionSheetOption {
  label: string;
  onPress: () => void;
  destructive?: boolean;
}

interface ActionSheetProps {
  visible: boolean;
  onClose: () => void;
  options: ActionSheetOption[];
  title?: string;
}

export function ActionSheet({ visible, onClose, options, title }: ActionSheetProps) {
  const handleOptionPress = useCallback((option: ActionSheetOption) => {
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
      <Animated.View
        entering={SlideInDown}
        exiting={SlideOutDown}
        style={styles.sheetContainer}
      >
        <BlurView intensity={100} tint="dark" style={styles.sheet}>
          {title && (
            <Text style={styles.title}>{title}</Text>
          )}
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.option,
                index === options.length - 1 && styles.lastOption,
              ]}
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
          <TouchableOpacity
            style={[styles.option, styles.cancelOption]}
            onPress={onClose}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </BlurView>
      </Animated.View>
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
  sheetContainer: {
    marginHorizontal: 8,
    marginBottom: 34,
  },
  sheet: {
    borderRadius: 14,
    overflow: 'hidden',
  },
  title: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 13,
    textAlign: 'center',
    paddingVertical: 12,
  },
  option: {
    paddingVertical: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  optionText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
  },
  destructiveText: {
    color: '#FF3B30',
  },
  cancelOption: {
    marginTop: 8,
  },
  cancelText: {
    color: '#007AFF',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
});