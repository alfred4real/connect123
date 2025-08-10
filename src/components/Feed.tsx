import Post from "./Post";
import CreatePost from "./CreatePost";

const Feed = () => {
  const posts = [
    {
      author: {
        name: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
        time: "2 hours ago"
      },
      content: "Just finished building an amazing React component library! The power of modern web development never ceases to amaze me. 🚀",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop",
      likes: 24,
      comments: 8,
      shares: 3
    },
    {
      author: {
        name: "Mike Chen",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
        time: "4 hours ago"
      },
      content: "Beautiful sunset from my evening walk today. Sometimes you need to step away from the screen and enjoy nature's beauty. What's your favorite way to unwind after a long day of coding?",
      image: "https://images.unsplash.com/photo-1495216875107-c6c043550862?w=600&h=400&fit=crop",
      likes: 42,
      comments: 12,
      shares: 7
    },
    {
      author: {
        name: "Alex Rivera",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        time: "6 hours ago"
      },
      content: "Excited to announce that our team just launched a new social platform! It's been months of hard work, but seeing it come together is incredibly rewarding. Can't wait to see how the community grows! 💙",
      likes: 89,
      comments: 23,
      shares: 15
    },
    {
      author: {
        name: "Emma Wilson",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
        time: "8 hours ago"
      },
      content: "Working on some exciting new features for our platform. The developer experience is getting better every day! What features would you love to see in a social platform?",
      likes: 31,
      comments: 16,
      shares: 5
    }
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-6 p-4">
      <CreatePost />
      {posts.map((post, index) => (
        <Post key={index} {...post} />
      ))}
    </div>
  );
};

export default Feed;