/*
  # Activity Feed Implementation

  1. New Types
    - activity_type enum for different activity categories

  2. New Tables
    - activities table for storing user activities
    - activity_likes for social interactions

  3. Security
    - RLS policies for activities table
    - RLS policies for activity_likes table

  4. Indexes
    - Optimized indexes for feed queries
*/

-- Create activity type enum
create type activity_type as enum (
  'check_in',
  'crawl_created',
  'crawl_joined',
  'friend_added',
  'venue_rated',
  'photo_posted',
  'achievement_earned'
);

-- Create activities table
create table activities (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  type activity_type not null,
  entity_type text not null,
  entity_id uuid not null,
  metadata jsonb default '{}',
  created_at timestamptz default now(),
  
  constraint valid_entity_types check (
    entity_type = any(array['venue', 'crawl', 'profile', 'achievement'])
  )
);

-- Create activity_likes table
create table activity_likes (
  activity_id uuid references activities(id) on delete cascade,
  user_id uuid references profiles(id) on delete cascade,
  created_at timestamptz default now(),
  primary key (activity_id, user_id)
);

-- Create indexes
create index activities_feed_idx on activities (created_at desc);
create index activities_user_idx on activities (user_id);
create index activities_type_idx on activities (type);

-- Enable RLS
alter table activities enable row level security;
alter table activity_likes enable row level security;

-- RLS Policies for activities
create policy "Activities are viewable by friends"
  on activities for select
  to authenticated
  using (
    exists (
      select 1 from friendships
      where (friendships.user_id = auth.uid() and friendships.friend_id = activities.user_id)
      or (friendships.friend_id = auth.uid() and friendships.user_id = activities.user_id)
      and friendships.status = 'accepted'
    )
    or user_id = auth.uid()
  );

create policy "Users can create their own activities"
  on activities for insert
  to authenticated
  with check (user_id = auth.uid());

-- RLS Policies for activity_likes
create policy "Users can like activities they can view"
  on activity_likes for all
  to authenticated
  using (
    exists (
      select 1 from activities
      where activities.id = activity_likes.activity_id
      and (
        exists (
          select 1 from friendships
          where (friendships.user_id = auth.uid() and friendships.friend_id = activities.user_id)
          or (friendships.friend_id = auth.uid() and friendships.user_id = activities.user_id)
          and friendships.status = 'accepted'
        )
        or activities.user_id = auth.uid()
      )
    )
  );