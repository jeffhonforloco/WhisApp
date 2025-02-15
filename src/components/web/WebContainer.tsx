import { View, ViewProps, StyleSheet } from 'react-native';
import { isWeb } from '../../platform';

interface WebContainerProps extends ViewProps {
  children: React.ReactNode;
}

export function WebContainer({ children, style, ...props }: WebContainerProps) {
  if (!isWeb) {
    return <View style={style} {...props}>{children}</View>;
  }

  return (
    <View style={[styles.container, style]} {...props}>
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  content: {
    maxWidth: 1200,
    width: '100%',
    marginHorizontal: 'auto',
    paddingHorizontal: 20,
  },
});