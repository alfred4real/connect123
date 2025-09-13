import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

export interface Friend {
  id: string;
  user_id: string;
  friend_id: string;
  status: 'pending' | 'accepted' | 'blocked';
  profile: {
    display_name: string;
    avatar_url: string | null;
    bio: string | null;
    location: string | null;
    username: string | null;
    created_at: string;
  };
  mutual_friends_count?: number;
}

export interface FriendSuggestion {
  id: string;
  user_id: string;
  suggested_user_id: string;
  mutual_friends_count: number;
  profile: {
    display_name: string;
    avatar_url: string | null;
    location: string | null;
    username: string | null;
    bio?: string | null;
    created_at?: string;
  };
}

export const useFriends = () => {
  const { user } = useAuth();
  const [friends, setFriends] = useState<Friend[]>([]);
  const [suggestions, setSuggestions] = useState<FriendSuggestion[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFriends = async () => {
    if (!user) return;

    try {
      // Get friends where current user is either the requester or the recipient
      const { data, error } = await supabase
        .from('friends')
        .select(`
          *,
          requester_profile:profiles!friends_user_id_fkey(
            display_name,
            avatar_url,
            bio,
            location,
            username,
            created_at
          ),
          friend_profile:profiles!friends_friend_id_fkey(
            display_name,
            avatar_url,
            bio,
            location,
            username,
            created_at
          )
        `)
        .or(`user_id.eq.${user.id},friend_id.eq.${user.id}`)
        .eq('status', 'accepted');

      if (error) throw error;
      
      // Transform the data to show the other person's profile
      const transformedFriends = (data || []).map((friendship: any) => ({
        ...friendship,
        profile: friendship.user_id === user.id 
          ? friendship.friend_profile 
          : friendship.requester_profile
      }));
      
      setFriends(transformedFriends as Friend[]);
    } catch (error) {
      console.error('Error fetching friends:', error);
      toast.error('Failed to load friends');
    }
  };

  const fetchSuggestions = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('friend_suggestions')
        .select(`
          *,
          profile:profiles!friend_suggestions_suggested_user_id_fkey(
            display_name,
            avatar_url,
            location,
            username
          )
        `)
        .eq('user_id', user.id)
        .limit(8);

      if (error) throw error;
      setSuggestions((data || []) as FriendSuggestion[]);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      toast.error('Failed to load friend suggestions');
    }
  };

  const sendFriendRequest = async (friendId: string) => {
    if (!user) return;

    try {
      // Create bidirectional friendship for immediate acceptance
      const { error: requestError } = await supabase
        .from('friends')
        .insert([
          {
            user_id: user.id,
            friend_id: friendId,
            status: 'accepted'  // Auto-accept for demo purposes
          },
          {
            user_id: friendId,
            friend_id: user.id,
            status: 'accepted'  // Auto-accept for demo purposes
          }
        ]);

      if (requestError) throw requestError;
      
      toast.success('Friend added successfully!');
      
      // Refresh both friends and suggestions
      await Promise.all([fetchFriends(), fetchSuggestions()]);
    } catch (error) {
      console.error('Error sending friend request:', error);
      toast.error('Failed to add friend');
    }
  };

  const acceptFriendRequest = async (friendshipId: string) => {
    try {
      const { error } = await supabase
        .from('friends')
        .update({ status: 'accepted' })
        .eq('id', friendshipId);

      if (error) throw error;
      
      toast.success('Friend request accepted!');
      await fetchFriends();
    } catch (error) {
      console.error('Error accepting friend request:', error);
      toast.error('Failed to accept friend request');
    }
  };

  const removeFriend = async (friendshipId: string) => {
    try {
      const { error } = await supabase
        .from('friends')
        .delete()
        .eq('id', friendshipId);

      if (error) throw error;
      
      toast.success('Friend removed');
      await fetchFriends();
    } catch (error) {
      console.error('Error removing friend:', error);
      toast.error('Failed to remove friend');
    }
  };

  useEffect(() => {
    if (user) {
      Promise.all([fetchFriends(), fetchSuggestions()]).finally(() => {
        setLoading(false);
      });

      // Set up real-time subscription for friends updates
      const channel = supabase
        .channel('friends-changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'friends',
            filter: `user_id=eq.${user.id},friend_id=eq.${user.id}`
          },
          () => {
            fetchFriends();
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [user]);

  return {
    friends,
    suggestions,
    loading,
    sendFriendRequest,
    acceptFriendRequest,
    removeFriend,
    refetch: () => Promise.all([fetchFriends(), fetchSuggestions()])
  };
};