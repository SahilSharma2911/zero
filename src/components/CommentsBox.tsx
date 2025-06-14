"use client";

import { useState } from "react";
import { Send, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

type Comment = {
  id: string;
  text: string;
  user: {
    name: string;
    avatar: string;
  };
  timestamp: Date;
  isCurrentUser: boolean;
};

const CommentsBox = () => {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      text: "Seq ut perspiciatis unde omnis iste natus. cedas wedge thgha eaaeg hgrtes.",
      user: {
        name: "John Doe",
        avatar: "/avatars/john.jpg",
      },
      timestamp: new Date(Date.now() - 1000 * 60 * 3), // 3 minutes ago
      isCurrentUser: false,
    },
    {
      id: "2",
      text: "Seq ut perspiciatis unde omnis iste natus. cedas wedge thgha eaaeg hgrtes.",
      user: {
        name: "You",
        avatar: "/avatars/you.jpg",
      },
      timestamp: new Date(Date.now() - 1000 * 60 * 2), // 2 minutes ago
      isCurrentUser: true,
    },
  ]);

  const [newComment, setNewComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      text: newComment,
      user: {
        name: "You",
        avatar: "/avatars/you.jpg",
      },
      timestamp: new Date(),
      isCurrentUser: true,
    };

    setComments([...comments, comment]);
    setNewComment("");
  };

  const handleDeleteComment = (commentId: string) => {
    setComments(comments.filter(comment => comment.id !== commentId));
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return "now";
    if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    return date.toLocaleDateString();
  };

  return (
    <div className="border flex flex-col justify-between rounded-lg p-4 max-w-2xl mx-auto h-[500px]">
      <div className="flex items-center justify-between py-2">
        <h2 className="text-xl font-semibold">Comments</h2>
        <Input
          placeholder="Q Search"
          className="w-48"
        />
      </div>

      <div className="flex flex-col justify-end pt-1">
        <div className="space-y-6 mb-6 !overflow-y-scroll h-[350px] flex flex-col justify-end">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-3 group relative">
              <Avatar className="h-8 w-8">
                <AvatarImage src={comment.user.avatar} />
                <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">
                    {comment.user.name}
                    {comment.isCurrentUser && (
                      <span className="ml-1 text-xs text-muted-foreground">you</span>
                    )}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {formatTime(comment.timestamp)}
                  </span>
                </div>
                <p className="text-sm mt-1 whitespace-pre-line">{comment.text}</p>
              </div>

              {comment.isCurrentUser && (
                <button
                  onClick={() => handleDeleteComment(comment.id)}
                  className="absolute right-0 top-0 p-1 rounded-full bg-red-100 text-red-600 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-200 hover:cursor-pointer"
                  title="Delete comment"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/avatars/you.jpg" />
            <AvatarFallback>Y</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 relative">
            <Input
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Type your comment..."
              className="pr-10"
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 p-2 rounded-full hover:cursor-pointer h-10 w-10 hover:bg-green-600 text-black flex justify-center items-center"
            disabled={!newComment.trim()}
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default CommentsBox;