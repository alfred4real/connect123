-- Add role column to profiles table for admin functionality
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin', 'moderator'));

-- Create index for role column for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);

-- Create RLS policy for admin access
CREATE POLICY "Admins can view all profiles" 
ON public.profiles 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

CREATE POLICY "Admins can update any profile" 
ON public.profiles 
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

-- Insert an admin user (you'll need to update this with your actual user_id after signing up)
-- This is just a placeholder - replace with actual admin user ID
-- INSERT INTO public.profiles (user_id, display_name, username, role) 
-- VALUES ('your-user-id-here', 'Admin User', 'admin', 'admin')
-- ON CONFLICT (user_id) DO UPDATE SET role = 'admin';