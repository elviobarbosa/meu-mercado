/*
  # Fix profile creation and add backfill

  1. Changes
    - Update trigger function to handle profile creation more robustly
    - Add backfill for existing users without profiles
    - Add error handling
  
  2. Security
    - Maintain existing RLS policies
    - Function runs with security definer to ensure proper permissions
*/

-- Drop existing trigger and function if they exist
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Create improved trigger function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, username, full_name)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'username', NULL),
    COALESCE(new.raw_user_meta_data->>'full_name', NULL)
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Backfill profiles for existing users
DO $$
BEGIN
  INSERT INTO public.profiles (id)
  SELECT id FROM auth.users
  WHERE id NOT IN (SELECT id FROM public.profiles)
  ON CONFLICT (id) DO NOTHING;
END $$;