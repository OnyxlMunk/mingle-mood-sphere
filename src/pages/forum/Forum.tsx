
import { useEffect } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { useNavigation } from '@/hooks/useNavigation';
import { usePosts } from '@/hooks/usePosts';
import { CreatePost } from '@/components/forum/CreatePost';
import { PostCard } from '@/components/forum/PostCard';

export default function Forum() {
  const { updateBreadcrumbs } = useNavigation();
  const { posts, loading, deletePost } = usePosts();

  useEffect(() => {
    updateBreadcrumbs([
      { name: 'Dashboard', href: '/dashboard' },
      { name: 'Forum' }
    ]);
  }, [updateBreadcrumbs]);

  return (
    <DashboardLayout title="Community Forum">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-semibold">Discussions</h2>
            <p className="text-muted-foreground">Share your thoughts and connect with the community</p>
          </div>
          <CreatePost />
        </div>

        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-48 bg-muted rounded-lg animate-pulse" />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold mb-2">No posts yet</h3>
            <p className="text-muted-foreground mb-4">Be the first to start a conversation!</p>
            <CreatePost />
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} onDelete={deletePost} />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
