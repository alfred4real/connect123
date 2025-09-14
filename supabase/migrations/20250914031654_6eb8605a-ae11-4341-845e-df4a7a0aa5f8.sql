-- Create a test friend suggestion that points to your own profile for testing
INSERT INTO public.friend_suggestions (user_id, suggested_user_id, mutual_friends_count)
VALUES (
  'c1034c22-d091-4ce8-afb9-e179f5093e39',
  'c1034c22-d091-4ce8-afb9-e179f5093e39',
  3
) ON CONFLICT DO NOTHING;