import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function CommunityScreen() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(0,0,0,0.8)', 'transparent']}
        style={styles.headerGradient}
      />

      <View style={styles.header}>
        <Text style={styles.title}>Community</Text>
        <Text style={styles.subtitle}>Discover travel stories</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.storyContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.storiesScroll}>
            {[1, 2, 3, 4].map((_, index) => (
              <TouchableOpacity key={index} style={styles.storyItem}>
                <Image
                  source={{ uri: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3' }}
                  style={styles.storyImage}
                />
                <Text style={styles.storyUsername}>Travel Story {index + 1}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.whisperContainer}>
          <Text style={styles.sectionTitle}>Latest Whispers</Text>
          
          {[1, 2, 3].map((_, index) => (
            <View key={index} style={styles.whisperCard}>
              <View style={styles.whisperHeader}>
                <Image
                  source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3' }}
                  style={styles.userAvatar}
                />
                <View style={styles.userInfo}>
                  <Text style={styles.username}>Sarah Parker</Text>
                  <Text style={styles.location}>Paris, France</Text>
                </View>
              </View>
              
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3' }}
                style={styles.whisperImage}
              />
              
              <View style={styles.whisperContent}>
                <Text style={styles.whisperText}>
                  Found this amazing hidden spot near the Eiffel Tower! The view is absolutely breathtaking 😍
                </Text>
                
                <View style={styles.whisperActions}>
                  <TouchableOpacity style={styles.actionButton}>
                    <Ionicons name="heart-outline" size={24} color="#fff" />
                    <Text style={styles.actionText}>128</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity style={styles.actionButton}>
                    <Ionicons name="chatbubble-outline" size={24} color="#fff" />
                    <Text style={styles.actionText}>24</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
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
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 5,
  },
  content: {
    flex: 1,
    paddingTop: 20,
  },
  storyContainer: {
    marginBottom: 24,
  },
  storiesScroll: {
    paddingHorizontal: 20,
  },
  storyItem: {
    marginRight: 12,
    alignItems: 'center',
  },
  storyImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: '#FF3B30',
  },
  storyUsername: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
  },
  whisperContainer: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 16,
  },
  whisperCard: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    marginBottom: 20,
    overflow: 'hidden',
  },
  whisperHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userInfo: {
    marginLeft: 12,
  },
  username: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  location: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 14,
  },
  whisperImage: {
    width: '100%',
    height: 200,
  },
  whisperContent: {
    padding: 12,
  },
  whisperText: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  whisperActions: {
    flexDirection: 'row',
    marginTop: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  actionText: {
    color: '#fff',
    marginLeft: 4,
  },
});