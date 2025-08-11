import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Users, MessageCircle, UserPlus } from "lucide-react";

const Friends = () => {
  const friends = [
    {
      id: 1,
      name: "Alice Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      status: "online",
      mutualFriends: 15,
      location: "New York, NY"
    },
    {
      id: 2,
      name: "Mike Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      status: "offline",
      mutualFriends: 8,
      location: "San Francisco, CA"
    },
    {
      id: 3,
      name: "Sarah Williams",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      status: "online",
      mutualFriends: 22,
      location: "Los Angeles, CA"
    },
    {
      id: 4,
      name: "David Brown",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      status: "online",
      mutualFriends: 5,
      location: "Chicago, IL"
    }
  ];

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
                    <Button className="w-full" size="sm">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Message
                    </Button>
                    <Button variant="outline" className="w-full" size="sm">
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
    </div>
  );
};

export default Friends;