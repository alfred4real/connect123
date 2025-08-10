import { useState } from "react";
import { Image, Video, MapPin, Smile } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

interface CreatePostProps {
  onPost: (content: string) => void;
}

const CreatePost = ({ onPost }: CreatePostProps) => {
  const [postContent, setPostContent] = useState("");

  const handlePost = () => {
    if (postContent.trim()) {
      onPost(postContent);
      setPostContent("");
    }
  };

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Textarea
              placeholder="What's on your mind, John?"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              className="border-none resize-none bg-muted/30 focus:bg-background placeholder:text-muted-foreground"
              rows={3}
            />
          </div>
        </div>
        
        <Separator className="my-4" />
        
        <div className="flex items-center justify-between">
          <div className="flex space-x-4">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary hover:bg-primary/10">
              <Image className="mr-2 h-4 w-4" />
              Photo
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary hover:bg-primary/10">
              <Video className="mr-2 h-4 w-4" />
              Video
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary hover:bg-primary/10">
              <MapPin className="mr-2 h-4 w-4" />
              Location
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary hover:bg-primary/10">
              <Smile className="mr-2 h-4 w-4" />
              Feeling
            </Button>
          </div>
          <Button 
            onClick={handlePost} 
            disabled={!postContent.trim()}
            variant="social"
            size="sm"
          >
            Post
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreatePost;