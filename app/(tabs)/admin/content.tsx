import { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card, PlatformButton } from '../../../src/components/ui';
import { WebContainer, WebMetaTags } from '../../../src/components/web';

const MOCK_CONTENT = [
  {
    id: '1',
    type: 'whisper',
    title: 'Hidden Café in Paris',
    user: 'sarah_parker',
    reportCount: 2,
    reportReason: 'Inappropriate content',
    date: '2025-02-15',
    status: 'pending',
  },
  {
    id: '2',
    type: 'comment',
    content: 'This is spam content...',
    user: 'john_doe',
    reportCount: 5,
    reportReason: 'Spam',
    date: '2025-02-14',
    status: 'pending',
  },
  {
    id: '3',
    type: 'whisper',
    title: 'Secret Beach Location',
    user: 'mike_smith',
    reportCount: 1,
    reportReason: 'Location accuracy',
    date: '2025-02-13',
    status: 'reviewed',
  },
];

export default function ContentModerationScreen() {
  const [selectedContent, setSelectedContent] = useState<string | null>(null);

  return (
    <WebContainer>
      <WebMetaTags 
        title="Content Moderation - WhisApp Admin"
        description="Moderate and manage WhisApp user content."
      />
      
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Content Moderation</Text>
          <View style={styles.stats}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>89</Text>
              <Text style={styles.statLabel}>Pending Review</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statLabel}>Flagged Today</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>45</Text>
              <Text style={styles.statLabel}>Resolved</Text>
            </View>
          </View>
        </View>

        {MOCK_CONTENT.map((item) => (
          <Card 
            key={item.id} 
            style={[
              styles.contentCard,
              selectedContent === item.id && styles.selectedCard,
            ]}
          >
            <View style={styles.contentHeader}>
              <View style={styles.contentType}>
                <Ionicons 
                  name={item.type === 'whisper' ? 'mic' : 'chatbubble'} 
                  size={20} 
                  color="#fff" 
                />
                <Text style={styles.contentTypeText}>
                  {item.type === 'whisper' ? 'Whisper' : 'Comment'}
                </Text>
              </View>
              <View style={[
                styles.statusBadge,
                item.status === 'reviewed' && styles.reviewedBadge,
              ]}>
                <Text style={styles.statusText}>{item.status}</Text>
              </View>
            </View>

            <View style={styles.contentBody}>
              {item.type === 'whisper' && (
                <Image
                  source={{ uri: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800' }}
                  style={styles.contentImage}
                />
              )}
              <View style={styles.contentInfo}>
                <Text style={styles.contentTitle}>
                  {item.type === 'whisper' ? item.title : item.content}
                </Text>
                <Text style={styles.contentMeta}>
                  Posted by @{item.user} • {item.date}
                </Text>
              </View>
            </View>

            <View style={styles.reportInfo}>
              <View style={styles.reportBadge}>
                <Ionicons name="flag" size={16} color="#FF3B30" />
                <Text style={styles.reportCount}>
                  {item.reportCount} {item.reportCount === 1 ? 'report' : 'reports'}
                </Text>
              </View>
              <Text style={styles.reportReason}>{item.reportReason}</Text>
            </View>

            <View style={styles.actions}>
              <PlatformButton
                title="Approve"
                onPress={() => {}}
                style={[styles.actionButton, styles.approveButton]}
              />
              <PlatformButton
                title="Remove"
                onPress={() => {}}
                style={[styles.actionButton, styles.removeButton]}
              />
              <PlatformButton
                title="Review Details"
                onPress={() => setSelectedContent(item.id)}
                style={styles.actionButton}
              />
            </View>
          </Card>
        ))}
      </ScrollView>
    </WebContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: 16,
  },
  statItem: {
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
  contentCard: {
    margin: 20,
    marginTop: 0,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  selectedCard: {
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  contentType: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentTypeText: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 8,
  },
  statusBadge: {
    backgroundColor: '#FF9500',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  reviewedBadge: {
    backgroundColor: '#30D158',
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  contentBody: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  contentImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  contentInfo: {
    flex: 1,
  },
  contentTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  contentMeta: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 12,
  },
  reportInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  reportBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,59,48,0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 12,
  },
  reportCount: {
    color: '#FF3B30',
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
  reportReason: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 8,
  },
  approveButton: {
    backgroundColor: '#30D158',
  },
  removeButton: {
    backgroundColor: '#FF3B30',
  },
});