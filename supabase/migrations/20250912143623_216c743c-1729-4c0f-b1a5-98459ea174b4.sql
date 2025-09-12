-- Create a sample user profile for Mike Chen
INSERT INTO public.profiles (user_id, display_name, username, bio, location, avatar_url)
VALUES (
  gen_random_uuid(),
  'Mike Chen',
  'mikechen',
  'Software engineer passionate about building great products.',
  'San Francisco, CA',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
);

-- Create another sample user profile 
INSERT INTO public.profiles (user_id, display_name, username, bio, location, avatar_url)
VALUES (
  gen_random_uuid(),
  'Sarah Johnson',
  'sarahjohnson',
  'Product manager who loves design and user experience.',
  'New York, NY',
  'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
);

-- Add friend suggestions for the current user
INSERT INTO public.friend_suggestions (user_id, suggested_user_id, mutual_friends_count)
SELECT 
  'c1034c22-d091-4ce8-afb9-e179f5093e39' as user_id,
  p.user_id as suggested_user_id,
  floor(random() * 5) + 1 as mutual_friends_count
FROM public.profiles p
WHERE p.user_id != 'c1034c22-d091-4ce8-afb9-e179f5093e39'
AND p.display_name IN ('Mike Chen', 'Sarah Johnson');

-- Enable real-time for the friends table
ALTER PUBLICATION supabase_realtime ADD TABLE public.friends;
ALTER PUBLICATION supabase_realtime ADD TABLE public.friend_suggestions;