import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import Animated, { 
  FadeIn, 
  FadeOut, 
  SlideInDown, 
  SlideOutUp 
} from 'react-native-reanimated';

interface WebModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  showClose?: boolean;
  width?: number | string;
}

export function WebModal({ 
  visible, 
  onClose, 
  title,
  children,
  showClose = true,
  width = 500,
}: WebModalProps) {
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
        exiting={SlideOutUp}
        style={[styles.modal, { width }]}
      >
        {(title || showClose) && (
          <View style={styles.header}>
            {title && <Text style={styles.title}>{title}</Text>}
            }
            {showClose && (
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Text style={styles.closeText}>×</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
        <View style={styles.content}>
          {children}
        </View>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modal: {
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    maxHeight: '90vh',
    maxWidth: '90vw',
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  closeButton: {
    padding: 8,
  },
  closeText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 24,
    lineHeight: 24,
  },
  content: {
    padding: 20,
  },
});