import { WellnessSidebar } from "@/components/wellness/WellnessSidebar";
import { WellnessHeader } from "@/components/wellness/WellnessHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, Share, MoreHorizontal, Plus, Search } from "lucide-react";
import { useState } from "react";

const mockPosts = [
  {
    id: 1,
    user: { name: "Alex Chen", handle: "@alexchen", avatar: "/placeholder.svg" },
    content: "Just completed my first 7-day meditation streak! Feeling so much more centered. The breathing exercises in AuroraMind really helped me through exam stress. 🧘‍♀️",
    timestamp: "2h ago",
    likes: 24,
    comments: 8,
    isLiked: false
  },
  {
    id: 2,
    user: { name: "Sarah M.", handle: "@sarahm", avatar: "/placeholder.svg" },
    content: "Anyone else using the mood tracking feature? I've noticed my anxiety levels have decreased significantly since I started journaling daily. The AI insights are surprisingly accurate!",
    timestamp: "4h ago",
    likes: 18,
    comments: 12,
    isLiked: true
  },
  {
    id: 3,
    user: { name: "Dr. Priya", handle: "@drpriya", avatar: "/placeholder.svg" },
    content: "Pro tip: Try the 4-7-8 breathing technique before important presentations. It's been a game-changer for my students. Remember, mental wellness is just as important as academic success! 💜",
    timestamp: "6h ago",
    likes: 42,
    comments: 15,
    isLiked: false
  },
  {
    id: 4,
    user: { name: "Mike R.", handle: "@miker", avatar: "/placeholder.svg" },
    content: "The community here is amazing. Thanks to everyone who shared their study stress tips. Finally found a routine that works for me!",
    timestamp: "1d ago",
    likes: 31,
    comments: 6,
    isLiked: true
  }
];

const Community = () => {
  const [posts, setPosts] = useState(mockPosts);
  const [newPost, setNewPost] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isLiked: !post.isLiked, likes: post.likes + (post.isLiked ? -1 : 1) }
        : post
    ));
  };

  const handlePost = () => {
    if (!newPost.trim()) return;
    const post = {
      id: Date.now(),
      user: { name: "You", handle: "@you", avatar: "/placeholder.svg" },
      content: newPost,
      timestamp: "now",
      likes: 0,
      comments: 0,
      isLiked: false
    };
    setPosts([post, ...posts]);
    setNewPost("");
  };

  const filteredPosts = posts.filter(post => 
    post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-bg-gradient">
      <WellnessSidebar />
      <div className="flex-1 flex flex-col">
        <WellnessHeader />
        <div className="flex-1 p-6">
          <div className="max-w-2xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">Community</h1>
                <p className="text-muted-foreground">Connect with others on their wellness journey</p>
              </div>
              <Button className="rounded-full">
                <Plus className="h-4 w-4 mr-2" />
                New Post
              </Button>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search posts and people..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 rounded-full"
              />
            </div>

            {/* New Post */}
            <Card className="p-4">
              <div className="flex space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>You</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-3">
                  <textarea
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    placeholder="What's on your mind? Share your wellness journey..."
                    className="w-full min-h-[80px] p-3 border border-border/50 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-neon-purple/20"
                  />
                  <div className="flex justify-end">
                    <Button onClick={handlePost} disabled={!newPost.trim()}>
                      Post
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Posts Feed */}
            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="p-4 hover:shadow-lg transition-shadow">
                  <div className="flex space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={post.user.avatar} />
                      <AvatarFallback>{post.user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-semibold text-sm">{post.user.name}</span>
                        <span className="text-muted-foreground text-sm">{post.user.handle}</span>
                        <span className="text-muted-foreground text-sm">·</span>
                        <span className="text-muted-foreground text-sm">{post.timestamp}</span>
                        <Button variant="ghost" size="sm" className="ml-auto h-6 w-6 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-sm leading-relaxed mb-3">{post.content}</p>
                      <div className="flex items-center space-x-6">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleLike(post.id)}
                          className={`h-8 px-3 ${post.isLiked ? 'text-red-500' : 'text-muted-foreground'}`}
                        >
                          <Heart className={`h-4 w-4 mr-1 ${post.isLiked ? 'fill-current' : ''}`} />
                          {post.likes}
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 px-3 text-muted-foreground">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          {post.comments}
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 px-3 text-muted-foreground">
                          <Share className="h-4 w-4 mr-1" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
