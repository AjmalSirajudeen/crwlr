/*
  # Add friend system tables and functions

  1. New Tables
    - `friend_requests`
      - `id` (uuid, primary key)
      - `sender_id` (uuid, references profiles)
      - `receiver_id` (uuid, references profiles)
      - `status` (enum: pending, accepted, rejected)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on friend_requests table
    - Add policies for friend request management
    - Add policies for viewing friend lists

  3. Functions
    - Function to accept friend request
    - Function to reject friend request
*/

-- Create friend request status enum
CREATE TYPE friend_request_status AS ENUM ('pending', 'accepted', 'rejected');

-- Create friend requests table
CREATE TABLE IF NOT EXISTS friend_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  receiver_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  status friend_request_status NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(sender_id, receiver_id)
);

-- Enable RLS
ALTER TABLE friend_requests ENABLE ROW LEVEL SECURITY;

-- Create policies for friend requests
CREATE POLICY "Users can view their own friend requests"
  ON friend_requests
  FOR SELECT
  TO public
  USING (
    auth.uid() = sender_id OR 
    auth.uid() = receiver_id
  );

CREATE POLICY "Users can send friend requests"
  ON friend_requests
  FOR INSERT
  TO public
  WITH CHECK (
    auth.uid() = sender_id AND
    sender_id != receiver_id AND
    NOT EXISTS (
      SELECT 1 FROM friend_requests
      WHERE (sender_id = NEW.sender_id AND receiver_id = NEW.receiver_id)
         OR (sender_id = NEW.receiver_id AND receiver_id = NEW.sender_id)
    )
  );

CREATE POLICY "Users can update their received friend requests"
  ON friend_requests
  FOR UPDATE
  TO public
  USING (auth.uid() = receiver_id)
  WITH CHECK (auth.uid() = receiver_id);

-- Create updated_at trigger
CREATE TRIGGER update_friend_requests_updated_at
  BEFORE UPDATE ON friend_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

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
      WHEN fr.sender_id = user_id THEN p.id
      ELSE fr.sender_id
    END as friend_id,
    p.username,
    p.full_name,
    p.avatar_url,
    p.level,
    p.points
  FROM friend_requests fr
  JOIN profiles p ON (
    CASE 
      WHEN fr.sender_id = user_id THEN fr.receiver_id = p.id
      ELSE fr.sender_id = p.id
    END
  )
  WHERE (fr.sender_id = user_id OR fr.receiver_id = user_id)
    AND fr.status = 'accepted';
END;
$$ LANGUAGE plpgsql;