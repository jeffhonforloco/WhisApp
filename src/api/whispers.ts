import { supabase } from './client';
import { Whisper, WhisperCreate } from '../types/whisper';

export async function getWhispers() {
  const { data, error } = await supabase
    .from('whispers')
    .select(`
      *,
      profiles:user_id (
        username,
        avatar_url
      ),
      categories (
        name
      ),
      likes (
        user_id
      )
    `)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function getWhisperById(id: string) {
  const { data, error } = await supabase
    .from('whispers')
    .select(`
      *,
      profiles:user_id (
        username,
        avatar_url
      ),
      categories (
        name
      ),
      likes (
        user_id
      )
    `)
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

export async function createWhisper(whisper: WhisperCreate) {
  const { data, error } = await supabase
    .from('whispers')
    .insert(whisper)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function uploadAudio(userId: string, file: File) {
  const fileName = `${userId}/${Date.now()}.m4a`;

  const { error: uploadError } = await supabase.storage
    .from('whispers')
    .upload(fileName, file);

  if (uploadError) throw uploadError;

  const { data: { publicUrl } } = supabase.storage
    .from('whispers')
    .getPublicUrl(fileName);

  return publicUrl;
}

export async function likeWhisper(whisperId: string, userId: string) {
  const { error } = await supabase
    .from('likes')
    .insert({ whisper_id: whisperId, user_id: userId });

  if (error) throw error;
}

export async function unlikeWhisper(whisperId: string, userId: string) {
  const { error } = await supabase
    .from('likes')
    .delete()
    .match({ whisper_id: whisperId, user_id: userId });

  if (error) throw error;
}