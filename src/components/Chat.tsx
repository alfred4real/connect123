import { useState } from "react";
import { Send, X, Smile, Phone, Video, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useMessages } from "@/hooks/useMessages";
import { useAuth } from "@/hooks/useAuth";

interface ChatProps {
  isOpen: boolean;
  onClose: () => void;
  selectedFriend?: any;
}

const Chat = ({ isOpen, onClose, selectedFriend }: ChatProps) => {
  const { user } = useAuth();
  const { conversations, messages, sendMessage, fetchMessages } = useMessages();
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation) return;
    
    const conversation = conversations.find(c => c.id === selectedConversation);
    if (!conversation) return;

    const receiverId = conversation.participant1_id === user?.id 
      ? conversation.participant2_id 
      : conversation.participant1_id;

    await sendMessage(receiverId, newMessage);
    setNewMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleConversationSelect = (conversationId: string) => {
    setSelectedConversation(conversationId);
    fetchMessages(conversationId);
  };

  const currentMessages = selectedConversation ? (messages[selectedConversation] || []) : [];

  if (!isOpen) return null;

  return (
    <div className="fixed top-16 right-4 z-[60] w-80">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/20 z-[-1]" onClick={onClose} />
      
      {/* Dropdown */}
      <div className="bg-background border shadow-lg rounded-lg max-h-96 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MessageCircle className="h-5 w-5" />
            <h3 className="font-semibold">Messages</h3>
          </div>
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Conversations List */}
        <ScrollArea className="flex-1">
          <div className="p-2">
            {conversations.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <MessageCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No conversations yet</p>
              </div>
            ) : (
              <div className="space-y-1">
                {conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className="flex items-center p-3 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => handleConversationSelect(conversation.id)}
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={conversation.profile?.avatar_url} />
                      <AvatarFallback>
                        {conversation.profile?.display_name?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="ml-3 flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-sm truncate">
                          {conversation.profile?.display_name || 'Unknown User'}
                        </p>
                        <span className="text-xs text-muted-foreground">
                          {new Date(conversation.last_message_at).toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        {conversation.lastMessage || 'No messages yet'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default Chat;