import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface Message {
  id: string;
  content: string;
  sender_id: string;
  receiver_id: string;
  created_at: string;
  is_read: boolean;
}

export interface Conversation {
  id: string;
  participant1_id: string;
  participant2_id: string;
  last_message_at: string;
  profile?: {
    display_name: string;
    avatar_url?: string;
  };
  lastMessage?: string;
  unreadCount?: number;
}

export const useMessages = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<{ [conversationId: string]: Message[] }>({});
  const [isLoading, setIsLoading] = useState(false);

  // Fetch conversations
  const fetchConversations = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('conversations')
        .select('*')
        .or(`participant1_id.eq.${user.id},participant2_id.eq.${user.id}`)
        .order('last_message_at', { ascending: false });

      if (error) throw error;

      // Fetch profile data for other participants
      const conversationsWithProfiles = await Promise.all(
        (data || []).map(async (conv) => {
          const otherParticipantId = conv.participant1_id === user.id 
            ? conv.participant2_id 
            : conv.participant1_id;
          
          const { data: profile } = await supabase
            .from('profiles')
            .select('display_name, avatar_url')
            .eq('user_id', otherParticipantId)
            .single();
          
          return {
            ...conv,
            profile: profile || { display_name: 'Unknown User', avatar_url: undefined }
          };
        })
      );

      setConversations(conversationsWithProfiles);
    } catch (error) {
      console.error('Error fetching conversations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch messages for a conversation
  const fetchMessages = async (conversationId: string) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
        .order('created_at', { ascending: true });

      if (error) throw error;

      setMessages(prev => ({
        ...prev,
        [conversationId]: data || []
      }));
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  // Send a message
  const sendMessage = async (receiverId: string, content: string) => {
    if (!user || !content.trim()) return;

    try {
      // First, create or get conversation
      const { data: conversation, error: convError } = await supabase
        .from('conversations')
        .upsert({
          participant1_id: user.id < receiverId ? user.id : receiverId,
          participant2_id: user.id < receiverId ? receiverId : user.id,
          last_message_at: new Date().toISOString()
        }, {
          onConflict: 'participant1_id,participant2_id'
        })
        .select()
        .single();

      if (convError) throw convError;

      // Send the message
      const { data: message, error: msgError } = await supabase
        .from('messages')
        .insert({
          sender_id: user.id,
          receiver_id: receiverId,
          content: content.trim()
        })
        .select()
        .single();

      if (msgError) throw msgError;

      // Update local state
      setMessages(prev => ({
        ...prev,
        [conversation.id]: [...(prev[conversation.id] || []), message]
      }));

      // Refresh conversations
      fetchConversations();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchConversations();
    }
  }, [user]);

  return {
    conversations,
    messages,
    isLoading,
    sendMessage,
    fetchMessages,
    fetchConversations
  };
};