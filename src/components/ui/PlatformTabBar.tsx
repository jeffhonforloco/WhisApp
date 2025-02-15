import { Platform, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { platformStyles } from '../../platform';

interface PlatformTabBarProps {
  children: React.ReactNode;
}

export function PlatformTabBar({ children }: PlatformTabBarProps) {
  return Platform.OS === 'ios' ? (
    <View style={platformStyles.tabBar}>
      <BlurView
        tint="dark"
        intensity={100}
        style={platformStyles.blurView}
      />
      {children}
    </View>
  ) : (
    <View style={platformStyles.tabBar}>
      {children}
    </View>
  );
}