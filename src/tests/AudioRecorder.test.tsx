import { render, fireEvent } from '@testing-library/react-native';
import { AudioRecorder } from '../components/ui/AudioRecorder';
import { useAudioRecorder } from '../hooks/useAudioRecorder';

jest.mock('../hooks/useAudioRecorder');

describe('AudioRecorder', () => {
  const mockStartRecording = jest.fn();
  const mockStopRecording = jest.fn();
  const mockResetRecording = jest.fn();

  beforeEach(() => {
    (useAudioRecorder as jest.Mock).mockReturnValue({
      isRecording: false,
      formattedDuration: '00:00',
      audioUri: null,
      startRecording: mockStartRecording,
      stopRecording: mockStopRecording,
      resetRecording: mockResetRecording,
    });
  });

  it('renders start recording button initially', () => {
    const { getByText } = render(<AudioRecorder />);
    expect(getByText('Start Recording')).toBeTruthy();
  });

  it('shows recording state when recording', () => {
    (useAudioRecorder as jest.Mock).mockReturnValue({
      isRecording: true,
      formattedDuration: '00:05',
      audioUri: null,
      startRecording: mockStartRecording,
      stopRecording: mockStopRecording,
      resetRecording: mockResetRecording,
    });

    const { getByText } = render(<AudioRecorder />);
    expect(getByText('Stop Recording')).toBeTruthy();
    expect(getByText('00:05')).toBeTruthy();
  });

  it('calls onRecordingComplete when recording is stopped', async () => {
    const onRecordingComplete = jest.fn();
    const audioUri = 'file://test.m4a';

    (useAudioRecorder as jest.Mock).mockReturnValue({
      isRecording: true,
      formattedDuration: '00:05',
      audioUri,
      startRecording: mockStartRecording,
      stopRecording: mockStopRecording,
      resetRecording: mockResetRecording,
    });

    const { getByText } = render(
      <AudioRecorder onRecordingComplete={onRecordingComplete} />
    );

    fireEvent.press(getByText('Stop Recording'));
    expect(mockStopRecording).toHaveBeenCalled();
  });
});