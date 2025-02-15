import { useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, RefreshControl } from 'react-native';
import { Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../../src/contexts/AuthContext';
import { useAppDispatch, useAppSelector } from '../../../src/store';
import { fetchProfile } from '../../../src/store/slices/profileSlice';
import { fetchWhispers } from '../../../src/store/slices/whisperSlice';
import { Card, PlatformButton } from '../../../src/components/ui';
import { WebContainer } from '../../../src/components/web';

export default function DashboardScreen() {
  const { session } = useAuth();
  const dispatch = useAppDispatch();
  const { profile } = useAppSelector((state) => state.profile);
  const { whispers, loading } = useAppSelector((state) => state.whispers);

  useEffect(() => {
    if (session?.user) {
      dispatch(fetchProfile(session.user.id));
      dispatch(fetchWhispers());
    }
  }, [session, dispatch]);

  const handleRefresh = () => {
    if (session?.user) {
      dispatch(fetchProfile(session.user.id));
      dispatch(fetchWhispers());
    }
  };

  return (
    <WebContainer>
      <ScrollView 
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={handleRefresh}
            tintColor="#fff"
          />
        }
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.8)', 'transparent']}
          style={styles.headerGradient}
        />

        <View style={styles.header}>
          <Text style={styles.welcomeText}>
            Welcome back, {profile?.full_name || 'Traveler'}
          </Text>
          <Text style={styles.subtitle}>Your travel journey at a glance</Text>
        </View>

        <View style={styles.statsContainer}>
          <Link href="/dashboard/stats" asChild>
            <Card style={styles.statsCard}>
              <Ionicons name="analytics" size={24} color="#FF3B30" />
              <Text style={styles.statsTitle}>Your Stats</Text>
              <Text style={styles.statsValue}>{whispers.length} Whispers</Text>
            </Card>
          </Link>

          <Link href="/dashboard/achievements" asChild>
            <Card style={styles.statsCard}>
              <Ionicons name="trophy" size={24} color="#FFD700" />
              <Text style={styles.statsTitle}>Achievements</Text>
              <Text style={styles.statsValue}>3 Unlocked</Text>
            </Card>
          </Link>
        </View>

        <Card style={styles.activityCard}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          {whispers.slice(0, 3).map((whisper) => (
            <View key={whisper.id} style={styles.activityItem}>
              <Ionicons name="mic" size={20} color="#fff" />
              <View style={styles.activityInfo}>
                <Text style={styles.activityTitle}>{whisper.title}</Text>
                <Text style={styles.activityDate}>
                  {new Date(whisper.created_at).toLocaleDateString()}
                </Text>
              </View>
            </View>
          ))}
          <PlatformButton
            title="Record New Whisper"
            onPress={() => {}}
            style={styles.recordButton}
          />
        </Card>
      </ScrollView>
    </WebContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  headerGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 200,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  statsCard: {
    flex: 1,
    marginHorizontal: 6,
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  statsTitle: {
    color: '#fff',
    fontSize: 14,
    marginTop: 8,
  },
  statsValue: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 4,
  },
  activityCard: {
    margin: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 16,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  activityInfo: {
    marginLeft: 12,
    flex: 1,
  },
  activityTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  activityDate: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 14,
    marginTop: 2,
  },
  recordButton: {
    marginTop: 16,
  },
});