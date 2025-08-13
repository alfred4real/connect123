import { useState } from "react";
import { Heart, MessageCircle, Share, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";

interface Comment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  time: string;
}

interface PostProps {
  author: {
    name: string;
    avatar: string;
    time: string;
  };
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
}

const Post = ({ author, content, image, likes, comments, shares }: PostProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [currentLikes, setCurrentLikes] = useState(likes);
  const [showComments, setShowComments] = useState(false);
  const [commentsList, setCommentsList] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  const handleLike = () => {
    setIsLiked(!isLiked);
    setCurrentLikes(isLiked ? currentLikes - 1 : currentLikes + 1);
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        author: "John Doe", // Current user
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        content: newComment.trim(),
        time: "now"
      };
      setCommentsList([...commentsList, comment]);
      setNewComment("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddComment();
    }
  };

  return (
    <Card className="shadow-sm hover:shadow-md transition-all duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={author.avatar} />
              <AvatarFallback>{author.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-sm">{author.name}</p>
              <p className="text-xs text-muted-foreground">{author.time}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-sm mb-4 leading-relaxed">{content}</p>
        
        {image && (
          <div className="mb-4 rounded-lg overflow-hidden">
            <img 
              src={image} 
              alt="Post content" 
              className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        
        {/* Engagement Stats */}
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
          <span>{currentLikes} likes</span>
          <div className="flex space-x-4">
            <span>{comments + commentsList.length} comments</span>
            <span>{shares} shares</span>
          </div>
        </div>
        
        <Separator className="mb-3" />
        
        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            className={`hover:bg-red-50 hover:text-red-600 transition-colors ${
              isLiked ? "text-red-600 bg-red-50" : ""
            }`}
          >
            <Heart className={`mr-2 h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
            Like
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowComments(!showComments)}
            className="hover:bg-primary/10 hover:text-primary"
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            Comment
          </Button>
          <Button variant="ghost" size="sm" className="hover:bg-primary/10 hover:text-primary">
            <Share className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>
        
        {/* Comment Section */}
        {showComments && (
          <>
            <Separator className="my-3" />
            
            {/* Existing Comments */}
            {commentsList.length > 0 && (
              <div className="space-y-3 mb-4">
                {commentsList.map((comment) => (
                  <div key={comment.id} className="flex space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={comment.avatar} />
                      <AvatarFallback>{comment.author[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="bg-muted/50 rounded-lg p-3">
                        <p className="font-medium text-sm">{comment.author}</p>
                        <p className="text-sm">{comment.content}</p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{comment.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Add New Comment */}
            <div className="flex space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex-1 flex space-x-2">
                <Input 
                  placeholder="Write a comment..." 
                  className="bg-muted/30 border-none flex-1"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <Button 
                  size="sm" 
                  onClick={handleAddComment}
                  disabled={!newComment.trim()}
                >
                  Post
                </Button>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default Post;