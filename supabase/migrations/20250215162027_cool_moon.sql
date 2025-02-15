/*
  # Initial WhisApp Schema

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key) - References auth.users
      - `username` (text, unique)
      - `full_name` (text)
      - `avatar_url` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `whispers`
      - `id` (uuid, primary key)
      - `user_id` (uuid) - References profiles
      - `audio_url` (text)
      - `title` (text)
      - `description` (text)
      - `location` (geography)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `categories`
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `description` (text)
      - `created_at` (timestamp)
    
    - `whisper_categories`
      - `whisper_id` (uuid) - References whispers
      - `category_id` (uuid) - References categories
      - Primary key (whisper_id, category_id)
    
    - `likes`
      - `user_id` (uuid) - References profiles
      - `whisper_id` (uuid) - References whispers
      - `created_at` (timestamp)
      - Primary key (user_id, whisper_id)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Public profiles are readable by everyone
    - Whispers are readable by everyone but only editable by owners
    - Categories are readable by everyone but only manageable by admins
*/

-- Create profiles table
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  username text UNIQUE NOT NULL,
  full_name text,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create whispers table
CREATE TABLE whispers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles ON DELETE CASCADE NOT NULL,
  audio_url text NOT NULL,
  title text NOT NULL,
  description text,
  location geography(POINT),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create categories table
CREATE TABLE categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

-- Create whisper_categories junction table
CREATE TABLE whisper_categories (
  whisper_id uuid REFERENCES whispers ON DELETE CASCADE,
  category_id uuid REFERENCES categories ON DELETE CASCADE,
  PRIMARY KEY (whisper_id, category_id)
);

-- Create likes table
CREATE TABLE likes (
  user_id uuid REFERENCES profiles ON DELETE CASCADE,
  whisper_id uuid REFERENCES whispers ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (user_id, whisper_id)
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE whispers ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE whisper_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Whispers policies
CREATE POLICY "Whispers are viewable by everyone"
  ON whispers FOR SELECT
  USING (true);

CREATE POLICY "Users can insert own whispers"
  ON whispers FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own whispers"
  ON whispers FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own whispers"
  ON whispers FOR DELETE
  USING (auth.uid() = user_id);

-- Categories policies
CREATE POLICY "Categories are viewable by everyone"
  ON categories FOR SELECT
  USING (true);

-- Whisper categories policies
CREATE POLICY "Whisper categories are viewable by everyone"
  ON whisper_categories FOR SELECT
  USING (true);

CREATE POLICY "Users can manage categories for own whispers"
  ON whisper_categories FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM whispers
      WHERE whispers.id = whisper_categories.whisper_id
      AND whispers.user_id = auth.uid()
    )
  );

-- Likes policies
CREATE POLICY "Likes are viewable by everyone"
  ON likes FOR SELECT
  USING (true);

CREATE POLICY "Users can manage own likes"
  ON likes FOR ALL
  USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX whispers_user_id_idx ON whispers(user_id);
CREATE INDEX whispers_location_idx ON whispers USING GIST(location);
CREATE INDEX likes_whisper_id_idx ON likes(whisper_id);