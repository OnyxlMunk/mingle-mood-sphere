import { useState } from 'react';
import { useComments } from '@/hooks/usePosts';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { useAuth } from '@/hooks/useAuth';

interface CommentSectionProps {
  postId: string;
}

export function CommentSection({ postId }: CommentSectionProps) {
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { comments, loading, addComment, deleteComment } = useComments(postId);
  const { user } = useAuth();

  const handleSubmit = async () => {
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    await addComment(newComment);
    setNewComment('');
    setIsSubmitting(false);
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="text-sm text-muted-foreground">Loading comments...</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Add new comment */}
      <div className="space-y-3">
        <Textarea
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          rows={3}
        />
        <Button
          onClick={handleSubmit}
          disabled={!newComment.trim() || isSubmitting}
          size="sm"
        >
          {isSubmitting ? 'Posting...' : 'Post Comment'}
        </Button>
      </div>

      {/* Comments list */}
      <div className="space-y-3">
        {comments.length === 0 ? (
          <div className="text-sm text-muted-foreground text-center py-4">
            No comments yet. Be the first to comment!
          </div>
        ) : (
          comments.map((comment) => {
            const isAuthor = user?.id === comment.author_id;
            const authorName = comment.profiles?.display_name || comment.profiles?.username || 'Unknown User';

            return (
              <div
                key={comment.id}
                className="p-3 bg-muted/50 rounded-lg space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-xs">
                      {authorName}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {format(new Date(comment.created_at), 'MMM d, h:mm a')}
                    </span>
                  </div>
                  {isAuthor && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteComment(comment.id)}
                      className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  )}
                </div>
                <div className="text-sm whitespace-pre-wrap">{comment.content}</div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}