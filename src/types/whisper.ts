export interface Whisper {
  id: string;
  user_id: string;
  audio_url: string;
  title: string;
  description: string | null;
  location: {
    latitude: number;
    longitude: number;
  } | null;
  created_at: string;
  updated_at: string;
  profiles?: {
    username: string;
    avatar_url: string | null;
  };
  categories?: {
    name: string;
  }[];
  likes?: {
    user_id: string;
  }[];
}

export type WhisperCreate = Omit<Whisper, 'id' | 'created_at' | 'updated_at' | 'profiles' | 'categories' | 'likes'>;