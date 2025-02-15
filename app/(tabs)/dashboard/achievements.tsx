import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Card } from '../../../src/components/ui';
import { Ionicons } from '@expo/vector-icons';

const ACHIEVEMENTS = [
  {
    id: '1',
    title: 'First Whisper',
    description: 'Record your first travel whisper',
    icon: 'mic',
    color: '#FF3B30',
    unlocked: true,
  },
  {
    id: '2',
    title: 'Popular Creator',
    description: 'Receive 100 likes on your whispers',
    icon: 'heart',
    color: '#FF2D55',
    unlocked: true,
  },
  {
    id: '3',
    title: 'Globe Trotter',
    description: 'Share whispers from 5 different countries',
    icon: 'globe',
    color: '#007AFF',
    unlocked: true,
  },
  {
    id: '4',
    title: 'Community Leader',
    description: 'Reach 1,000 followers',
    icon: 'people',
    color: '#5856D6',
    unlocked: false,
  },
  {
    id: '5',
    title: 'Hidden Gem Hunter',
    description: 'Discover and share 10 unique locations',
    icon: 'diamond',
    color: '#FF9500',
    unlocked: false,
  },
];

export default function AchievementsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Your Achievements</Text>
          <Text style={styles.subtitle}>
            {ACHIEVEMENTS.filter(a => a.unlocked).length} of {ACHIEVEMENTS.length} unlocked
          </Text>
        </View>

        {ACHIEVEMENTS.map((achievement) => (
          <Card 
            key={achievement.id} 
            style={[
              styles.achievementCard,
              !achievement.unlocked && styles.lockedCard,
            ]}
          >
            <View style={styles.achievementContent}>
              <View 
                style={[
                  styles.iconContainer,
                  { backgroundColor: achievement.color },
                  !achievement.unlocked && styles.lockedIcon,
                ]}
              >
                <Ionicons 
                  name={achievement.icon as any} 
                  size={24} 
                  color="#fff" 
                />
              </View>
              <View style={styles.achievementInfo}>
                <Text style={styles.achievementTitle}>
                  {achievement.title}
                </Text>
                <Text style={styles.achievementDescription}>
                  {achievement.description}
                </Text>
              </View>
              {achievement.unlocked ? (
                <Ionicons name="checkmark-circle" size={24} color="#4CD964" />
              ) : (
                <Ionicons name="lock-closed" size={24} color="rgba(255,255,255,0.3)" />
              )}
            </View>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  content: {
    padding: 20,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.7)',
  },
  achievementCard: {
    marginBottom: 16,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  lockedCard: {
    opacity: 0.6,
  },
  achievementContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  lockedIcon: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  achievementDescription: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
  },
});