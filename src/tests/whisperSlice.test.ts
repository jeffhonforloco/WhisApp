import { configureStore } from '@reduxjs/toolkit';
import whisperReducer, { fetchWhispers, createWhisper } from '../store/slices/whisperSlice';

describe('whisperSlice', () => {
  const store = configureStore({
    reducer: {
      whispers: whisperReducer,
    },
  });

  it('should handle initial state', () => {
    expect(store.getState().whispers).toEqual({
      whispers: [],
      loading: false,
      error: null,
    });
  });

  it('should handle fetchWhispers.pending', () => {
    store.dispatch(fetchWhispers.pending(''));
    expect(store.getState().whispers.loading).toBe(true);
    expect(store.getState().whispers.error).toBe(null);
  });

  it('should handle fetchWhispers.fulfilled', () => {
    const mockWhispers = [
      {
        id: '1',
        user_id: 'user1',
        audio_url: 'test.mp3',
        title: 'Test Whisper',
        description: 'Test Description',
        location: null,
        created_at: '2025-02-15T00:00:00Z',
        updated_at: '2025-02-15T00:00:00Z',
      },
    ];

    store.dispatch(fetchWhispers.fulfilled(mockWhispers, ''));
    expect(store.getState().whispers.whispers).toEqual(mockWhispers);
    expect(store.getState().whispers.loading).toBe(false);
  });
});