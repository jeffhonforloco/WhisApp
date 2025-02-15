import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAudioRecorder } from '../../hooks/useAudioRecorder';

interface AudioRecorderProps {
  onRecordingComplete?: (uri: string) => void;
}

export function AudioRecorder({ onRecordingComplete }: AudioRecorderProps) {
  const {
    isRecording,
    formattedDuration,
    audioUri,
    startRecording,
    stopRecording,
    resetRecording,
  } = useAudioRecorder();

  const handleStartRecording = async () => {
    try {
      await startRecording();
    } catch (error) {
      // Handle error (show error message to user)
      console.error('Failed to start recording:', error);
    }
  };

  const handleStopRecording = async () => {
    try {
      await stopRecording();
      if (audioUri && onRecordingComplete) {
        onRecordingComplete(audioUri);
      }
    } catch (error) {
      // Handle error
      console.error('Failed to stop recording:', error);
    }
  };

  return (
    <View style={styles.container}>
      {!isRecording && !audioUri ? (
        <TouchableOpacity
          style={styles.recordButton}
          onPress={handleStartRecording}
        >
          <Ionicons name="mic" size={32} color="#fff" />
          <Text style={styles.buttonText}>Start Recording</Text>
        </TouchableOpacity>
      ) : isRecording ? (
        <View style={styles.recordingContainer}>
          <Text style={styles.duration}>{formattedDuration}</Text>
          <TouchableOpacity
            style={[styles.recordButton, styles.recording]}
            onPress={handleStopRecording}
          >
            <Ionicons name="stop" size={32} color="#fff" />
            <Text style={styles.buttonText}>Stop Recording</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.recordingContainer}>
          <TouchableOpacity
            style={styles.resetButton}
            onPress={resetRecording}
          >
            <Ionicons name="refresh" size={24} color="#fff" />
            <Text style={styles.buttonText}>Record Again</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  recordButton: {
    backgroundColor: '#FF3B30',
    borderRadius: 32,
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  recording: {
    backgroundColor: '#FF453A',
  },
  recordingContainer: {
    alignItems: 'center',
  },
  duration: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 8,
    textAlign: 'center',
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 12,
    borderRadius: 8,
  },
});