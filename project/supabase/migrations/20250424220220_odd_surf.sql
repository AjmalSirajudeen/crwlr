/*
  # Add default profile

  1. Changes
    - Insert default profile for testing
    - Username: ajz101
    - Full name: Ajmal Zaheen
    - Avatar URL: Professional headshot from Pexels
    - Level: 0
    - Points: 0

  2. Security
    - No changes to RLS policies
*/

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM profiles 
    WHERE username = 'ajz101'
  ) THEN
    INSERT INTO profiles (
      id,
      username,
      full_name,
      avatar_url,
      level,
      points,
      created_at,
      updated_at
    ) VALUES (
      '4d53c0b0-0000-4000-a000-000000000000',
      'ajz101',
      'Ajmal Zaheen',
      'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
      0,
      0,
      now(),
      now()
    );
  END IF;
END $$;