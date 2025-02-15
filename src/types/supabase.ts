export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string
          full_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      whispers: {
        Row: {
          id: string
          user_id: string
          audio_url: string
          title: string
          description: string | null
          location: unknown | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          audio_url: string
          title: string
          description?: string | null
          location?: unknown | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          audio_url?: string
          title?: string
          description?: string | null
          location?: unknown | null
          created_at?: string
          updated_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          created_at?: string
        }
      }
      whisper_categories: {
        Row: {
          whisper_id: string
          category_id: string
        }
        Insert: {
          whisper_id: string
          category_id: string
        }
        Update: {
          whisper_id?: string
          category_id?: string
        }
      }
      likes: {
        Row: {
          user_id: string
          whisper_id: string
          created_at: string
        }
        Insert: {
          user_id: string
          whisper_id: string
          created_at?: string
        }
        Update: {
          user_id?: string
          whisper_id?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}