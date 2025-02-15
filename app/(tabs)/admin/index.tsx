import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../../../src/components/ui';
import { WebContainer, WebMetaTags } from '../../../src/components/web';

export default function AdminDashboardScreen() {
  return (
    <WebContainer>
      <WebMetaTags 
        title="Admin Dashboard - WhisApp"
        description="WhisApp admin dashboard for managing users, content, and analytics."
      />
      
      <ScrollView style={styles.container}>
        <LinearGradient
          colors={['rgba(0,0,0,0.8)', 'transparent']}
          style={styles.headerGradient}
        />

        <View style={styles.header}>
          <Text style={styles.title}>Admin Dashboard</Text>
          <Text style={styles.subtitle}>Manage your WhisApp community</Text>
        </View>

        <View style={styles.grid}>
          <Link href="/admin/users" asChild>
            <Card style={styles.card}>
              <View style={styles.cardHeader}>
                <Ionicons name="people" size={24} color="#FF3B30" />
                <Text style={styles.cardTitle}>User Management</Text>
              </View>
              <Text style={styles.cardDescription}>
                Manage users, roles, and permissions
              </Text>
              <View style={styles.statsRow}>
                <View style={styles.stat}>
                  <Text style={styles.statValue}>1,234</Text>
                  <Text style={styles.statLabel}>Total Users</Text>
                </View>
                <View style={styles.stat}>
                  <Text style={styles.statValue}>56</Text>
                  <Text style={styles.statLabel}>New Today</Text>
                </View>
              </View>
            </Card>
          </Link>

          <Link href="/admin/content" asChild>
            <Card style={styles.card}>
              <View style={styles.cardHeader}>
                <Ionicons name="shield-checkmark" size={24} color="#007AFF" />
                <Text style={styles.cardTitle}>Content Moderation</Text>
              </View>
              <Text style={styles.cardDescription}>
                Review and moderate user content
              </Text>
              <View style={styles.statsRow}>
                <View style={styles.stat}>
                  <Text style={styles.statValue}>89</Text>
                  <Text style={styles.statLabel}>Pending Review</Text>
                </View>
                <View style={styles.stat}>
                  <Text style={styles.statValue}>12</Text>
                  <Text style={styles.statLabel}>Flagged</Text>
                </View>
              </View>
            </Card>
          </Link>

          <Link href="/admin/analytics" asChild>
            <Card style={styles.card}>
              <View style={styles.cardHeader}>
                <Ionicons name="analytics" size={24} color="#30D158" />
                <Text style={styles.cardTitle}>Analytics</Text>
              </View>
              <Text style={styles.cardDescription}>
                Track platform performance and metrics
              </Text>
              <View style={styles.statsRow}>
                <View style={styles.stat}>
                  <Text style={styles.statValue}>5.2K</Text>
                  <Text style={styles.statLabel}>Active Users</Text>
                </View>
                <View style={styles.stat}>
                  <Text style={styles.statValue}>12.8K</Text>
                  <Text style={styles.statLabel}>Whispers</Text>
                </View>
              </View>
            </Card>
          </Link>
        </View>

        <Card style={styles.activityCard}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityList}>
            {[1, 2, 3].map((_, index) => (
              <View key={index} style={styles.activityItem}>
                <View style={styles.activityIcon}>
                  <Ionicons 
                    name={index === 0 ? 'person-add' : index === 1 ? 'flag' : 'create'} 
                    size={20} 
                    color="#fff" 
                  />
                </View>
                <View style={styles.activityContent}>
                  <Text style={styles.activityText}>
                    {index === 0 ? 'New user registration' : 
                     index === 1 ? 'Content flagged for review' : 
                     'Whisper reported by user'}
                  </Text>
                  <Text style={styles.activityTime}>2 minutes ago</Text>
                </View>
              </View>
            ))}
          </View>
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
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 8,
  },
  grid: {
    padding: 20,
  },
  card: {
    marginBottom: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 12,
  },
  cardDescription: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 12,
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
  activityList: {
    gap: 16,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    color: '#fff',
    fontSize: 14,
  },
  activityTime: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 12,
    marginTop: 4,
  },
});