import { View, ViewProps, StyleSheet, useWindowDimensions } from 'react-native';
import { isWeb } from '../../platform';

interface WebResponsiveGridProps extends ViewProps {
  children: React.ReactNode;
  minChildWidth?: number;
}

export function WebResponsiveGrid({ 
  children, 
  style, 
  minChildWidth = 300,
  ...props 
}: WebResponsiveGridProps) {
  const { width } = useWindowDimensions();
  
  if (!isWeb) {
    return (
      <View style={[styles.mobileGrid, style]} {...props}>
        {children}
      </View>
    );
  }

  const columns = Math.max(1, Math.floor(width / minChildWidth));
  
  return (
    <View 
      style={[
        styles.grid,
        { 
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
        },
        style
      ]} 
      {...props}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    width: '100%',
    gap: 20,
  },
  mobileGrid: {
    width: '100%',
  },
});