import { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Users, MessageCircle, UserPlus, MapPin, Calendar, Mail } from "lucide-react";
import Chat from "@/components/Chat";

const Friends = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState<any>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const friends = [
    {
      id: 1,
      name: "Alice Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      status: "online",
      mutualFriends: 15,
      location: "New York, NY",
      email: "alice.johnson@email.com",
      joinDate: "January 2023",
      bio: "Digital marketing specialist who loves photography and travel. Always looking for new adventures!"
    },
    {
      id: 2,
      name: "Mike Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      status: "offline",
      mutualFriends: 8,
      location: "San Francisco, CA",
      email: "mike.chen@email.com",
      joinDate: "March 2023",
      bio: "Software engineer at a tech startup. Passionate about AI and machine learning."
    },
    {
      id: 3,
      name: "Sarah Williams",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      status: "online",
      mutualFriends: 22,
      location: "Los Angeles, CA",
      email: "sarah.williams@email.com",
      joinDate: "December 2022",
      bio: "Creative director and designer. Love creating beautiful user experiences and interfaces."
    },
    {
      id: 4,
      name: "David Brown",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      status: "online",
      mutualFriends: 5,
      location: "Chicago, IL",
      email: "david.brown@email.com",
      joinDate: "February 2024",
      bio: "Entrepreneur and business consultant. Helping startups grow and scale their operations."
    }
  ];

  const handleMessage = (friend: any) => {
    setSelectedFriend(friend);
    setIsChatOpen(true);
  };

  const handleViewProfile = (friend: any) => {
    setSelectedFriend(friend);
    setIsProfileOpen(true);
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {friends.map((friend) => (
                <Card key={friend.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center">
                    <div className="relative mx-auto">
                      <Avatar className="h-20 w-20">
                        <AvatarImage src={friend.avatar} />
                        <AvatarFallback>{friend.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className={`absolute -bottom-1 -right-1 h-6 w-6 rounded-full border-2 border-background ${
                        friend.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                      }`} />
                    </div>
                    <CardTitle className="text-lg">{friend.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{friend.location}</p>
                    <p className="text-xs text-muted-foreground">{friend.mutualFriends} mutual friends</p>
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
                    <AvatarImage src={selectedFriend.avatar} />
                    <AvatarFallback>{selectedFriend.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-background ${
                    selectedFriend.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                  }`} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{selectedFriend.name}</h3>
                  <Badge variant={selectedFriend.status === 'online' ? 'default' : 'secondary'}>
                    {selectedFriend.status}
                  </Badge>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{selectedFriend.location}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{selectedFriend.email}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Joined {selectedFriend.joinDate}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-sm">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{selectedFriend.mutualFriends} mutual friends</span>
                </div>
              </div>
              
              <div className="pt-2">
                <h4 className="font-medium mb-2">About</h4>
                <p className="text-sm text-muted-foreground">{selectedFriend.bio}</p>
              </div>
              
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