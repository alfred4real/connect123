import { useState, useEffect } from "react";
import { Home, Users, BookOpen, Calendar, Settings, TrendingUp, Shield } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useNavigate, useLocation } from "react-router-dom";
import { useFriends } from "@/hooks/useFriends";
const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [addedFriends, setAddedFriends] = useState<string[]>([]);
  const [userRole, setUserRole] = useState<string>('');
  const { friends } = useFriends();
  useEffect(() => {
    const fetchUserRole = async () => {
      if (!user) return;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('user_id', user.id)
        .single();
      
      if (error) {
        console.error('Error fetching user role:', error);
        return;
      }
      
      setUserRole(data.role);
    };

    fetchUserRole();
  }, [user]);

  const baseMenuItems = [
    { icon: Home, label: "Feed", path: "/" },
    { icon: Users, label: "Friends", path: "/friends", count: 12 },
    { icon: BookOpen, label: "Pages", path: "/pages", count: 3 },
    { icon: Calendar, label: "Events", path: "/events", count: 2 },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  const adminMenuItem = { icon: Shield, label: "Admin Panel", path: "/admin", count: undefined };
  
  const menuItems = userRole === 'admin' 
    ? [...baseMenuItems, adminMenuItem] 
    : baseMenuItems;

  const dynamicMenuItems = menuItems.map((item) =>
    item.label === 'Friends' ? { ...item, count: friends.length } : item
  );

  const trendingTopics = [
    "#TechNews",
    "#WebDevelopment", 
    "#React",
    "#SocialMedia",
    "#Innovation"
  ];

  const friendSuggestions = [
    { name: "Alice Johnson", mutualFriends: 5, avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face" },
    { name: "Mike Chen", mutualFriends: 3, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" },
    { name: "Sarah Williams", mutualFriends: 8, avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face" },
  ];

  const handleAddFriend = (friendName: string) => {
    setAddedFriends([...addedFriends, friendName]);
  };

  return (
    <aside className="w-80 h-screen sticky top-16 overflow-y-auto border-r bg-card/50 p-4 space-y-4">
      {/* Navigation Menu */}
      <Card>
        <CardContent className="p-4">
          <nav className="space-y-2">
            {dynamicMenuItems.map((item, index) => (
              <Button
                key={index}
                variant={location.pathname === item.path ? "default" : "ghost"}
                className={`w-full justify-start ${location.pathname === item.path ? "bg-primary text-primary-foreground" : ""}`}
                onClick={() => navigate(item.path)}
              >
                <item.icon className="mr-3 h-4 w-4" />
                {item.label}
                {item.count && (
                  <Badge variant="secondary" className="ml-auto">
                    {item.count}
                  </Badge>
                )}
              </Button>
            ))}
          </nav>
        </CardContent>
      </Card>

      {/* Trending Topics */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm flex items-center">
            <TrendingUp className="mr-2 h-4 w-4" />
            Trending
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="space-y-2">
            {trendingTopics.map((topic, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                className="w-full justify-start text-primary hover:bg-primary/10 font-medium"
              >
                {topic}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Friend Suggestions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm flex items-center">
            <Users className="mr-2 h-4 w-4" />
            People You May Know
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0 space-y-3">
          {friendSuggestions.map((friend, index) => (
            <div key={index} className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={friend.avatar} />
                <AvatarFallback>{friend.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-medium text-sm">{friend.name}</p>
                <p className="text-xs text-muted-foreground">
                  {friend.mutualFriends} mutual friends
                </p>
              </div>
              {addedFriends.includes(friend.name) ? (
                <Button size="sm" variant="outline" disabled>
                  Added
                </Button>
              ) : (
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleAddFriend(friend.name)}
                >
                  Add
                </Button>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </aside>
  );
};

export default Sidebar;