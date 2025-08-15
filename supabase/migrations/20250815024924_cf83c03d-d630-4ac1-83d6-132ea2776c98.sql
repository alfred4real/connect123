-- Create friends table to store friendship relationships
CREATE TABLE public.friends (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  friend_id UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  status TEXT NOT NULL CHECK (status IN ('pending', 'accepted', 'blocked')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, friend_id)
);

-- Create friend suggestions table
CREATE TABLE public.friend_suggestions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  suggested_user_id UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  mutual_friends_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, suggested_user_id)
);

-- Enable RLS
ALTER TABLE public.friends ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.friend_suggestions ENABLE ROW LEVEL SECURITY;

-- Create policies for friends table
CREATE POLICY "Users can view their own friendships" 
ON public.friends 
FOR SELECT 
USING (auth.uid() = user_id OR auth.uid() = friend_id);

CREATE POLICY "Users can create friend requests" 
ON public.friends 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own friend requests" 
ON public.friends 
FOR UPDATE 
USING (auth.uid() = user_id OR auth.uid() = friend_id);

CREATE POLICY "Users can delete their own friendships" 
ON public.friends 
FOR DELETE 
USING (auth.uid() = user_id OR auth.uid() = friend_id);

-- Create policies for friend suggestions table
CREATE POLICY "Users can view their own suggestions" 
ON public.friend_suggestions 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "System can manage suggestions" 
ON public.friend_suggestions 
FOR ALL 
USING (true);

-- Create indexes for better performance
CREATE INDEX idx_friends_user_id ON public.friends(user_id);
CREATE INDEX idx_friends_friend_id ON public.friends(friend_id);
CREATE INDEX idx_friends_status ON public.friends(status);
CREATE INDEX idx_friend_suggestions_user_id ON public.friend_suggestions(user_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_friends_updated_at
BEFORE UPDATE ON public.friends
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to get mutual friends count
CREATE OR REPLACE FUNCTION public.get_mutual_friends_count(user1_id UUID, user2_id UUID)
RETURNS INTEGER AS $$
BEGIN
  RETURN (
    SELECT COUNT(*)
    FROM public.friends f1
    JOIN public.friends f2 ON f1.friend_id = f2.friend_id
    WHERE f1.user_id = user1_id 
      AND f2.user_id = user2_id 
      AND f1.status = 'accepted' 
      AND f2.status = 'accepted'
      AND f1.friend_id != user1_id 
      AND f1.friend_id != user2_id
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;