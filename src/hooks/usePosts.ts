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
  profiles?: {
    username: string;
    display_name?: string;
  };
  communities?: {
    name: string;
  };
}

export interface Comment {
  id: string;
  content: string;
  author_id: string;
  post_id: string;
  parent_comment_id?: string;
  created_at: string;
  updated_at: string;
  profiles?: {
    username: string;
    display_name?: string;
  };
}

export function usePosts(communityId?: string) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchPosts();
  }, [communityId]);

  const fetchPosts = async () => {
    try {
      let query = supabase
        .from('forum_posts')
        .select('*')
        .order('is_pinned', { ascending: false })
        .order('created_at', { ascending: false });

      if (communityId) {
        query = query.eq('community_id', communityId);
      }

      const { data, error } = await query;

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      toast({
        title: "Error loading posts",
        description: "Failed to load forum posts.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (title: string, content: string, communityId?: string) => {
    if (!user) return;

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
    } catch (error) {
      toast({
        title: "Error creating post",
        description: "Failed to create your post. Please try again.",
        variant: "destructive"
      });
    }
  };

  const deletePost = async (id: string) => {
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
    } catch (error) {
      toast({
        title: "Error deleting post",
        description: "Failed to delete your post. Please try again.",
        variant: "destructive"
      });
    }
  };

  return {
    posts,
    loading,
    createPost,
    deletePost,
    refetch: fetchPosts
  };
}

export function useComments(postId: string) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (postId) {
      fetchComments();
    }
  }, [postId]);

  const fetchComments = async () => {
    try {
      const { data, error } = await supabase
        .from('forum_comments')
        .select('*')
        .eq('post_id', postId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setComments(data || []);
    } catch (error) {
      toast({
        title: "Error loading comments",
        description: "Failed to load comments.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const addComment = async (content: string, parentCommentId?: string) => {
    if (!user) return;

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
    } catch (error) {
      toast({
        title: "Error adding comment",
        description: "Failed to post your comment. Please try again.",
        variant: "destructive"
      });
    }
  };

  const deleteComment = async (id: string) => {
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
    } catch (error) {
      toast({
        title: "Error deleting comment",
        description: "Failed to delete your comment. Please try again.",
        variant: "destructive"
      });
    }
  };

  return {
    comments,
    loading,
    addComment,
    deleteComment,
    refetch: fetchComments
  };
}