import { StyleSheet, View, Text, ScrollView, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Card, AudioRecorder } from '../../../src/components/ui';
import { supabase } from '../../../src/lib/supabase';
import { useAuth } from '../../../src/contexts/AuthContext';

export default function JournalScreen() {
  const { session } = useAuth();

  const handleRecordingComplete = async (audioUri: string) => {
    try {
      if (!session?.user) return;

      // Upload audio file to Supabase Storage
      const filename = `${session.user.id}/${Date.now()}.m4a`;
      const response = await fetch(audioUri);
      const blob = await response.blob();
      
      const { data, error } = await supabase.storage
        .from('whispers')
        .upload(filename, blob);

      if (error) throw error;

      // Create whisper record in database
      const { error: dbError } = await supabase
        .from('whispers')
        .insert([
          {
            user_id: session.user.id,
            audio_url: data.path,
            title: `Recording ${new Date().toLocaleDateString()}`,
          },
        ]);

      if (dbError) throw dbError;

    } catch (error) {
      console.error('Failed to save recording:', error);
      // Show error to user
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(0,0,0,0.8)', 'transparent']}
        style={styles.headerGradient}
      />
      
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Audio Journal</Text>
          <Text style={styles.subtitle}>Capture your travel moments</Text>
        </View>

        <Card variant="elevated" style={styles.recorderCard}>
          <AudioRecorder onRecordingComplete={handleRecordingComplete} />
        </Card>

        <View style={styles.recentContainer}>
          <Text style={styles.sectionTitle}>Recent Recordings</Text>
          
          <Card>
            <View style={styles.recordingItem}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3' }}
                style={styles.recordingImage}
              />
              <View style={styles.recordingInfo}>
                <Text style={styles.recordingTitle}>Sunset in Paris</Text>
                <Text style={styles.recordingDate}>2 hours ago</Text>
              </View>
            </View>
          </Card>
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
  content: {
    flex: 1,
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
  recorderCard: {
    margin: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  recentContainer: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 16,
  },
  recordingItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recordingImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  recordingInfo: {
    flex: 1,
    marginLeft: 12,
  },
  recordingTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  recordingDate: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 14,
    marginTop: 2,
  },
});