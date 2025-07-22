
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export interface Post {
  id: string;
  title: string;
  content: string;
  author_id: string;
  community_id?: string;
  comment_count: number;
  is_pinned: boolean;
  created_at: string;
  updated_at: string;
}

export interface Comment {
  id: string;
  content: string;
  author_id: string;
  post_id: string;
  parent_comment_id?: string;
  created_at: string;
  updated_at: string;
}

export function usePosts(communityId?: string) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    // Don't fetch posts until auth is loaded
    if (!authLoading) {
      fetchPosts();
    }
  }, [communityId, authLoading, user]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      
      // Check if user is authenticated
      if (!user) {
        console.log('User not authenticated, cannot fetch posts');
        setPosts([]);
        return;
      }

      let query = supabase
        .from('forum_posts')
        .select('*')
        .order('is_pinned', { ascending: false })
        .order('created_at', { ascending: false });

      if (communityId) {
        query = query.eq('community_id', communityId);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching posts:', error);
        throw error;
      }
      
      console.log('Posts fetched successfully:', data?.length || 0);
      setPosts(data || []);
    } catch (error: any) {
      console.error('Error in fetchPosts:', error);
      toast({
        title: "Error loading posts",
        description: error.message || "Failed to load forum posts. Please try again.",
        variant: "destructive"
      });
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (title: string, content: string, communityId?: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to create a post.",
        variant: "destructive"
      });
      return;
    }

    try {
      const { data, error } = await supabase
        .from('forum_posts')
        .insert([{
          title,
          content,
          author_id: user.id,
          community_id: communityId
        }])
        .select('*')
        .single();

      if (error) throw error;

      setPosts(prev => [data, ...prev]);
      toast({
        title: "Post created",
        description: "Your post has been published."
      });
    } catch (error: any) {
      console.error('Error creating post:', error);
      toast({
        title: "Error creating post",
        description: error.message || "Failed to create your post. Please try again.",
        variant: "destructive"
      });
    }
  };

  const deletePost = async (id: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to delete posts.",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('forum_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setPosts(prev => prev.filter(post => post.id !== id));
      toast({
        title: "Post deleted",
        description: "Your post has been deleted."
      });
    } catch (error: any) {
      console.error('Error deleting post:', error);
      toast({
        title: "Error deleting post",
        description: error.message || "Failed to delete your post. Please try again.",
        variant: "destructive"
      });
    }
  };

  return {
    posts,
    loading: loading || authLoading,
    createPost,
    deletePost,
    refetch: fetchPosts
  };
}

export function useComments(postId: string) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (postId && !authLoading) {
      fetchComments();
    }
  }, [postId, authLoading, user]);

  const fetchComments = async () => {
    try {
      setLoading(true);
      
      if (!user) {
        console.log('User not authenticated, cannot fetch comments');
        setComments([]);
        return;
      }

      const { data, error } = await supabase
        .from('forum_comments')
        .select('*')
        .eq('post_id', postId)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching comments:', error);
        throw error;
      }
      
      console.log('Comments fetched successfully:', data?.length || 0);
      setComments(data || []);
    } catch (error: any) {
      console.error('Error in fetchComments:', error);
      toast({
        title: "Error loading comments",
        description: error.message || "Failed to load comments. Please try again.",
        variant: "destructive"
      });
      setComments([]);
    } finally {
      setLoading(false);
    }
  };

  const addComment = async (content: string, parentCommentId?: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to comment.",
        variant: "destructive"
      });
      return;
    }

    try {
      const { data, error } = await supabase
        .from('forum_comments')
        .insert([{
          content,
          author_id: user.id,
          post_id: postId,
          parent_comment_id: parentCommentId
        }])
        .select('*')
        .single();

      if (error) throw error;

      setComments(prev => [...prev, data]);
      toast({
        title: "Comment added",
        description: "Your comment has been posted."
      });
    } catch (error: any) {
      console.error('Error adding comment:', error);
      toast({
        title: "Error adding comment",
        description: error.message || "Failed to post your comment. Please try again.",
        variant: "destructive"
      });
    }
  };

  const deleteComment = async (id: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to delete comments.",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('forum_comments')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setComments(prev => prev.filter(comment => comment.id !== id));
      toast({
        title: "Comment deleted",
        description: "Your comment has been deleted."
      });
    } catch (error: any) {
      console.error('Error deleting comment:', error);
      toast({
        title: "Error deleting comment",
        description: error.message || "Failed to delete your comment. Please try again.",
        variant: "destructive"
      });
    }
  };

  return {
    comments,
    loading: loading || authLoading,
    addComment,
    deleteComment,
    refetch: fetchComments
  };
}
