import { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Users, MessageCircle, UserPlus, MapPin, Calendar, Mail, Loader2 } from "lucide-react";
import Chat from "@/components/Chat";
import { useFriends, type Friend, type FriendSuggestion } from "@/hooks/useFriends";
import { useAuth } from "@/hooks/useAuth";

const Friends = () => {
  const { user } = useAuth();
  const { friends, suggestions, loading, sendFriendRequest } = useFriends();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState<Friend | FriendSuggestion | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [requestingSuggestions, setRequestingSuggestions] = useState<string[]>([]);

  const handleMessage = (friend: Friend | FriendSuggestion) => {
    setSelectedFriend(friend);
    setIsChatOpen(true);
  };

  const handleViewProfile = (friend: Friend | FriendSuggestion) => {
    setSelectedFriend(friend);
    setIsProfileOpen(true);
  };

  const handleAddFriend = async (suggestion: FriendSuggestion) => {
    setRequestingSuggestions([...requestingSuggestions, suggestion.id]);
    await sendFriendRequest(suggestion.suggested_user_id);
    setRequestingSuggestions(requestingSuggestions.filter(id => id !== suggestion.id));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 min-h-screen p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center space-x-3">
              <Users className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold">Friends</h1>
            </div>

            {loading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : (
              <>
                {/* People You May Know Section */}
                {suggestions.length > 0 && (
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold">People You May Know</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {suggestions.map((person) => (
                        <Card key={person.id} className="hover:shadow-lg transition-shadow">
                          <CardHeader className="text-center pb-3">
                            <Avatar className="h-16 w-16 mx-auto">
                              <AvatarImage src={person.profile.avatar_url || undefined} />
                              <AvatarFallback>{person.profile.display_name?.[0] || '?'}</AvatarFallback>
                            </Avatar>
                            <CardTitle className="text-base">{person.profile.display_name}</CardTitle>
                            <p className="text-xs text-muted-foreground">{person.profile.location}</p>
                            <p className="text-xs text-muted-foreground">{person.mutual_friends_count} mutual friends</p>
                          </CardHeader>
                          <CardContent className="pt-0">
                            {requestingSuggestions.includes(person.id) ? (
                              <Button 
                                variant="outline" 
                                className="w-full" 
                                size="sm"
                                disabled
                              >
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Sending...
                              </Button>
                            ) : (
                              <Button 
                                className="w-full" 
                                size="sm"
                                onClick={() => handleAddFriend(person)}
                              >
                                <UserPlus className="mr-2 h-4 w-4" />
                                Add
                              </Button>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Your Friends Section */}
            {!loading && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Your Friends ({friends.length})</h2>
                
                {friends.length === 0 ? (
                  <div className="text-center py-8">
                    <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-lg font-medium">No friends yet</p>
                    <p className="text-muted-foreground">Add some friends to see them here!</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {friends.map((friend) => (
                      <Card key={friend.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader className="text-center">
                          <div className="relative mx-auto">
                            <Avatar className="h-20 w-20">
                              <AvatarImage src={friend.profile.avatar_url || undefined} />
                              <AvatarFallback>{friend.profile.display_name?.[0] || '?'}</AvatarFallback>
                            </Avatar>
                            <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full border-2 border-background bg-green-500" />
                          </div>
                          <CardTitle className="text-lg">{friend.profile.display_name}</CardTitle>
                          <p className="text-sm text-muted-foreground">{friend.profile.location}</p>
                          <p className="text-xs text-muted-foreground">{friend.mutual_friends_count || 0} mutual friends</p>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <Button 
                            className="w-full" 
                            size="sm"
                            onClick={() => handleMessage(friend)}
                          >
                            <MessageCircle className="mr-2 h-4 w-4" />
                            Message
                          </Button>
                          <Button 
                            variant="outline" 
                            className="w-full" 
                            size="sm"
                            onClick={() => handleViewProfile(friend)}
                          >
                            <UserPlus className="mr-2 h-4 w-4" />
                            View Profile
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Profile Modal */}
      <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Profile</DialogTitle>
          </DialogHeader>
          {selectedFriend && (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={selectedFriend.profile.avatar_url || undefined} />
                    <AvatarFallback>{selectedFriend.profile.display_name?.[0] || '?'}</AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-background bg-green-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{selectedFriend.profile.display_name}</h3>
                  <Badge variant="default">Online</Badge>
                </div>
              </div>
              
              <div className="space-y-3">
                {selectedFriend.profile.location && (
                  <div className="flex items-center space-x-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedFriend.profile.location}</span>
                  </div>
                )}
                
                {selectedFriend.profile.username && (
                  <div className="flex items-center space-x-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>@{selectedFriend.profile.username}</span>
                  </div>
                )}
                
                 {selectedFriend.profile.created_at && (
                   <div className="flex items-center space-x-2 text-sm">
                     <Calendar className="h-4 w-4 text-muted-foreground" />
                     <span>Joined {new Date(selectedFriend.profile.created_at).toLocaleDateString()}</span>
                   </div>
                 )}
                
                <div className="flex items-center space-x-2 text-sm">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{('mutual_friends_count' in selectedFriend ? selectedFriend.mutual_friends_count : 0)} mutual friends</span>
                </div>
              </div>
              
              {selectedFriend.profile.bio && (
                <div className="pt-2">
                  <h4 className="font-medium mb-2">About</h4>
                  <p className="text-sm text-muted-foreground">{selectedFriend.profile.bio}</p>
                </div>
              )}
              
              <div className="flex space-x-2 pt-2">
                <Button 
                  className="flex-1"
                  onClick={() => {
                    setIsProfileOpen(false);
                    handleMessage(selectedFriend);
                  }}
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Message
                </Button>
                <Button variant="outline" className="flex-1">
                  Add Friend
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Chat Component */}
      <Chat 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)}
        selectedFriend={selectedFriend}
      />
    </div>
  );
};

export default Friends;