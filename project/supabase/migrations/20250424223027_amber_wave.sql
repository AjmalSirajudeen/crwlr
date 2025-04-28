/*
  # Friends System Setup

  1. New Tables
    - `friend_requests`
      - `id` (uuid, primary key)
      - `sender_id` (uuid, references profiles)
      - `receiver_id` (uuid, references profiles)
      - `status` (text: 'pending', 'accepted', 'rejected')
      - `created_at` (timestamp)

  2. Functions
    - `get_user_friends`: Returns a list of friends for a given user
      - Handles both directions of friendship (sender and receiver)
      - Includes friend profile information

  3. Security
    - Enable RLS on friend_requests table
    - Add policies for friend request management
    - Ensure users can only manage their own requests
*/

-- Create friend_requests table
CREATE TABLE IF NOT EXISTS friend_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  receiver_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  status text NOT NULL CHECK (status IN ('pending', 'accepted', 'rejected')),
  created_at timestamptz DEFAULT now(),
  UNIQUE(sender_id, receiver_id)
);

-- Enable RLS
ALTER TABLE friend_requests ENABLE ROW LEVEL SECURITY;

-- Create policies for friend_requests
CREATE POLICY "Users can view their own friend requests"
  ON friend_requests
  FOR SELECT
  TO public
  USING (auth.uid() IN (sender_id, receiver_id));

CREATE POLICY "Users can send friend requests"
  ON friend_requests
  FOR INSERT
  TO public
  WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Users can manage received friend requests"
  ON friend_requests
  FOR UPDATE
  TO public
  USING (auth.uid() = receiver_id);

-- Create function to get user's friends
CREATE OR REPLACE FUNCTION get_user_friends(user_id uuid)
RETURNS TABLE (
  friend_id uuid,
  username text,
  full_name text,
  avatar_url text,
  level integer,
  points integer
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    CASE 
      WHEN fr.sender_id = user_id THEN fr.receiver_id
      ELSE fr.sender_id
    END AS friend_id,
    p.username,
    p.full_name,
    p.avatar_url,
    p.level,
    p.points
  FROM friend_requests fr
  JOIN profiles p ON (
    CASE 
      WHEN fr.sender_id = user_id THEN fr.receiver_id
      ELSE fr.sender_id
    END = p.id
  )
  WHERE 
    (fr.sender_id = user_id OR fr.receiver_id = user_id)
    AND fr.status = 'accepted';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;