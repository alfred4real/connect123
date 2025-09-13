-- For testing purposes, let's create a friendship where you sent a request to yourself (which you can accept)
-- This will demonstrate the system working

-- Enable real-time for the friends table
ALTER PUBLICATION supabase_realtime ADD TABLE public.friends;
ALTER PUBLICATION supabase_realtime ADD TABLE public.friend_suggestions;

-- Add a friend suggestion for the current user (suggesting another existing profile if any)
-- Since we can't create fake users, let's modify the friends query to handle bidirectional friendships properly