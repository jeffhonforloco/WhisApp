import { supabase } from './client';
import { Category } from '../types/category';

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name');

  if (error) throw error;
  return data;
}

export async function addWhisperToCategory(whisperId: string, categoryId: string) {
  const { error } = await supabase
    .from('whisper_categories')
    .insert({ whisper_id: whisperId, category_id: categoryId });

  if (error) throw error;
}

export async function removeWhisperFromCategory(whisperId: string, categoryId: string) {
  const { error } = await supabase
    .from('whisper_categories')
    .delete()
    .match({ whisper_id: whisperId, category_id: categoryId });

  if (error) throw error;
}