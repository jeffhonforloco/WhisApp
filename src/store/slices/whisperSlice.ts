import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../../lib/supabase';

export interface Whisper {
  id: string;
  user_id: string;
  audio_url: string;
  title: string;
  description: string | null;
  location: any;
  created_at: string;
  updated_at: string;
}

interface WhisperState {
  whispers: Whisper[];
  loading: boolean;
  error: string | null;
}

const initialState: WhisperState = {
  whispers: [],
  loading: false,
  error: null,
};

export const fetchWhispers = createAsyncThunk(
  'whispers/fetchWhispers',
  async () => {
    const { data, error } = await supabase
      .from('whispers')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }
);

export const createWhisper = createAsyncThunk(
  'whispers/createWhisper',
  async (whisper: Omit<Whisper, 'id' | 'created_at' | 'updated_at'>) => {
    const { data, error } = await supabase
      .from('whispers')
      .insert([whisper])
      .select()
      .single();

    if (error) throw error;
    return data;
  }
);

const whisperSlice = createSlice({
  name: 'whispers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWhispers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWhispers.fulfilled, (state, action) => {
        state.loading = false;
        state.whispers = action.payload;
      })
      .addCase(fetchWhispers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch whispers';
      })
      .addCase(createWhisper.fulfilled, (state, action) => {
        state.whispers.unshift(action.payload);
      });
  },
});

export default whisperSlice.reducer;