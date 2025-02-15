import { configureStore } from '@reduxjs/toolkit';
import profileReducer, { fetchProfile, updateProfile } from '../store/slices/profileSlice';

describe('profileSlice', () => {
  const store = configureStore({
    reducer: {
      profile: profileReducer,
    },
  });

  it('should handle initial state', () => {
    expect(store.getState().profile).toEqual({
      profile: null,
      loading: false,
      error: null,
    });
  });

  it('should handle fetchProfile.pending', () => {
    store.dispatch(fetchProfile.pending('', 'user1'));
    expect(store.getState().profile.loading).toBe(true);
    expect(store.getState().profile.error).toBe(null);
  });

  it('should handle fetchProfile.fulfilled', () => {
    const mockProfile = {
      id: 'user1',
      username: 'testuser',
      full_name: 'Test User',
      avatar_url: null,
      created_at: '2025-02-15T00:00:00Z',
      updated_at: '2025-02-15T00:00:00Z',
    };

    store.dispatch(fetchProfile.fulfilled(mockProfile, '', 'user1'));
    expect(store.getState().profile.profile).toEqual(mockProfile);
    expect(store.getState().profile.loading).toBe(false);
  });
});