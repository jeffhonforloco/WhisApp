import { useState, useCallback } from 'react';
import { Audio } from 'expo-av';
import * as Sentry from '@sentry/react-native';
import { formatDuration } from '../utils/validation';

interface AudioRecorderState {
  isRecording: boolean;
  duration: number;
  audioUri: string | null;
}

export function useAudioRecorder() {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [state, setState] = useState<AudioRecorderState>({
    isRecording: false,
    duration: 0,
    audioUri: null,
  });

  const startRecording = useCallback(async () => {
    try {
      // Request permissions
      const permission = await Audio.requestPermissionsAsync();
      if (!permission.granted) {
        throw new Error('Audio recording permission not granted');
      }

      // Configure audio
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      // Create and start recording
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      setRecording(recording);
      setState(prev => ({ ...prev, isRecording: true, duration: 0 }));

      // Start duration timer
      const startTime = Date.now();
      const intervalId = setInterval(() => {
        setState(prev => ({
          ...prev,
          duration: Math.floor((Date.now() - startTime) / 1000),
        }));
      }, 1000);

      // Store interval ID in recording object for cleanup
      (recording as any)._intervalId = intervalId;

    } catch (error) {
      Sentry.captureException(error);
      throw error;
    }
  }, []);

  const stopRecording = useCallback(async () => {
    try {
      if (!recording) return;

      // Clear duration timer
      clearInterval((recording as any)._intervalId);

      // Stop recording
      await recording.stopAndUnloadAsync();
      await Audio.setAudioModeAsync({ allowsRecordingIOS: false });

      // Get recording URI
      const uri = recording.getURI();
      
      // Update state
      setState(prev => ({
        ...prev,
        isRecording: false,
        audioUri: uri || null,
      }));
      setRecording(null);

    } catch (error) {
      Sentry.captureException(error);
      throw error;
    }
  }, [recording]);

  const resetRecording = useCallback(() => {
    setState({
      isRecording: false,
      duration: 0,
      audioUri: null,
    });
  }, []);

  return {
    ...state,
    formattedDuration: formatDuration(state.duration),
    startRecording,
    stopRecording,
    resetRecording,
  };
}