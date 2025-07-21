import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Trash2, Pin } from 'lucide-react';
import { format } from 'date-fns';
import { Post } from '@/hooks/usePosts';
import { useAuth } from '@/hooks/useAuth';
import { CommentSection } from './CommentSection';

interface PostCardProps {
  post: Post;
  onDelete: (id: string) => void;
}

export function PostCard({ post, onDelete }: PostCardProps) {
  const [showComments, setShowComments] = useState(false);
  const { user } = useAuth();

  const isAuthor = user?.id === post.author_id;
  const authorName = post.profiles?.display_name || post.profiles?.username || 'Unknown User';

  return (
    <Card className={post.is_pinned ? 'border-primary' : ''}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <CardTitle className="text-lg">{post.title}</CardTitle>
              {post.is_pinned && (
                <Badge variant="default" className="flex items-center space-x-1">
                  <Pin className="h-3 w-3" />
                  <span>Pinned</span>
                </Badge>
              )}
            </div>
            <CardDescription>
              By {authorName} • {format(new Date(post.created_at), 'MMM d, yyyy at h:mm a')}
              {post.communities && (
                <> • in {post.communities.name}</>
              )}
            </CardDescription>
          </div>
          {isAuthor && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(post.id)}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="whitespace-pre-wrap text-sm">{post.content}</div>
        
        <div className="flex items-center justify-between pt-2 border-t">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowComments(!showComments)}
            className="flex items-center space-x-2"
          >
            <MessageSquare className="h-4 w-4" />
            <span>{post.comment_count} {post.comment_count === 1 ? 'comment' : 'comments'}</span>
          </Button>
        </div>

        {showComments && (
          <div className="pt-4 border-t">
            <CommentSection postId={post.id} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}