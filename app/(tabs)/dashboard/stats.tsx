import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Card } from '../../../src/components/ui';
import { Ionicons } from '@expo/vector-icons';
import { useAppSelector } from '../../../src/store';

export default function StatsScreen() {
  const { whispers } = useAppSelector((state) => state.whispers);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Card style={styles.overviewCard}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Ionicons name="mic" size={24} color="#FF3B30" />
              <Text style={styles.statValue}>{whispers.length}</Text>
              <Text style={styles.statLabel}>Total Whispers</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="heart" size={24} color="#FF3B30" />
              <Text style={styles.statValue}>128</Text>
              <Text style={styles.statLabel}>Likes Received</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="location" size={24} color="#FF3B30" />
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statLabel}>Places Visited</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="people" size={24} color="#FF3B30" />
              <Text style={styles.statValue}>45</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
          </View>
        </Card>

        <Card style={styles.activityCard}>
          <Text style={styles.sectionTitle}>Activity Streak</Text>
          <View style={styles.streakContainer}>
            <Ionicons name="flame" size={32} color="#FF3B30" />
            <Text style={styles.streakText}>7 Day Streak!</Text>
            <Text style={styles.streakSubtext}>Keep recording to maintain your streak</Text>
          </View>
        </Card>

        <Card style={styles.popularCard}>
          <Text style={styles.sectionTitle}>Most Popular Whispers</Text>
          {whispers.slice(0, 3).map((whisper, index) => (
            <View key={whisper.id} style={styles.popularItem}>
              <Text style={styles.popularRank}>#{index + 1}</Text>
              <View style={styles.popularInfo}>
                <Text style={styles.popularTitle}>{whisper.title}</Text>
                <Text style={styles.popularStats}>
                  24 likes • 12 comments
                </Text>
              </View>
            </View>
          ))}
        </Card>
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 16,
  },
  overviewCard: {
    marginBottom: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  statItem: {
    width: '50%',
    padding: 8,
    alignItems: 'center',
  },
  statValue: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  statLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
  },
  activityCard: {
    marginBottom: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  streakContainer: {
    alignItems: 'center',
  },
  streakText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 12,
  },
  streakSubtext: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    marginTop: 4,
  },
  popularCard: {
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  popularItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  popularRank: {
    color: '#FF3B30',
    fontSize: 20,
    fontWeight: 'bold',
    width: 40,
  },
  popularInfo: {
    flex: 1,
  },
  popularTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  popularStats: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 14,
    marginTop: 4,
  },
});