import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Users, Heart, MessageCircle } from "lucide-react";

const Pages = () => {
  const pages = [
    {
      id: 1,
      name: "Tech Innovators",
      avatar: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=100&h=100&fit=crop",
      followers: 15420,
      category: "Technology",
      description: "Latest updates in tech innovation and startup culture",
      isFollowing: true
    },
    {
      id: 2,
      name: "Design Community",
      avatar: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=100&h=100&fit=crop",
      followers: 8930,
      category: "Design",
      description: "A community for UI/UX designers and creative professionals",
      isFollowing: false
    },
    {
      id: 3,
      name: "Fitness & Wellness",
      avatar: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop",
      followers: 12680,
      category: "Health",
      description: "Tips, workouts, and motivation for a healthy lifestyle",
      isFollowing: true
    },
    {
      id: 4,
      name: "Travel Enthusiasts",
      avatar: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=100&h=100&fit=crop",
      followers: 23450,
      category: "Travel",
      description: "Discover amazing destinations and travel tips",
      isFollowing: false
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
              <BookOpen className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold">Pages</h1>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pages.map((page) => (
                <Card key={page.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start space-x-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={page.avatar} />
                        <AvatarFallback>{page.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{page.name}</CardTitle>
                        <Badge variant="secondary" className="mb-2">
                          {page.category}
                        </Badge>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Users className="mr-1 h-4 w-4" />
                          {page.followers.toLocaleString()} followers
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">{page.description}</p>
                    <div className="flex space-x-2">
                      <Button 
                        variant={page.isFollowing ? "outline" : "default"} 
                        className="flex-1"
                        size="sm"
                      >
                        {page.isFollowing ? (
                          <>
                            <Heart className="mr-2 h-4 w-4 fill-current" />
                            Following
                          </>
                        ) : (
                          <>
                            <Heart className="mr-2 h-4 w-4" />
                            Follow
                          </>
                        )}
                      </Button>
                      <Button variant="outline" size="sm">
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                    </div>
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

export default Pages;