import { useState, useCallback } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, useWindowDimensions } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
} from 'react-native-reanimated';

interface Tab {
  key: string;
  title: string;
  content: React.ReactNode;
}

interface TabViewProps {
  tabs: Tab[];
  initialTab?: number;
}

export function TabView({ tabs, initialTab = 0 }: TabViewProps) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const { width } = useWindowDimensions();
  const translateX = useSharedValue(0);

  const handleTabPress = useCallback((index: number) => {
    translateX.value = withSpring(index * width);
    setActiveTab(index);
  }, [width]);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value / tabs.length }],
  }));

  const contentStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: -translateX.value }],
  }));

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={tab.key}
            style={styles.tab}
            onPress={() => handleTabPress(index)}
          >
            <Text style={[
              styles.tabText,
              activeTab === index && styles.activeTabText,
            ]}>
              {tab.title}
            </Text>
          </TouchableOpacity>
        ))}
        <Animated.View 
          style={[
            styles.indicator,
            { width: width / tabs.length },
            indicatorStyle,
          ]} 
        />
      </View>
      <Animated.View 
        style={[
          styles.content,
          { width: width * tabs.length },
          contentStyle,
        ]}
      >
        {tabs.map((tab) => (
          <View key={tab.key} style={{ width }}>
            {tab.content}
          </View>
        ))}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#2C2C2E',
    height: 48,
    position: 'relative',
    elevation: 4,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 14,
    fontWeight: '500',
  },
  activeTabText: {
    color: '#fff',
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    height: 2,
    backgroundColor: '#FF3B30',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
  },
});