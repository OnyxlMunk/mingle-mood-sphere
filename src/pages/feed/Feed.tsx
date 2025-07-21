
import { useEffect } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { useNavigation } from '@/hooks/useNavigation';
import { usePosts } from '@/hooks/usePosts';
import { useCommunities } from '@/hooks/useCommunities';
import { PostCard } from '@/components/forum/PostCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function Feed() {
  const { updateBreadcrumbs } = useNavigation();
  const { posts, loading, deletePost } = usePosts();
  const { userCommunities } = useCommunities();

  useEffect(() => {
    updateBreadcrumbs([
      { name: 'Dashboard', href: '/dashboard' },
      { name: 'Feed' }
    ]);
  }, [updateBreadcrumbs]);

  // Filter posts from user's communities
  const communityPosts = posts.filter(post => 
    post.community_id && userCommunities.some(community => community.id === post.community_id)
  );

  return (
    <DashboardLayout title="Social Feed">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold">Your Feed</h2>
          <p className="text-muted-foreground">Latest posts from your communities</p>
        </div>

        {/* Community Summary */}
        {userCommunities.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Your Communities</CardTitle>
              <CardDescription>You're active in {userCommunities.length} communities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {userCommunities.map((community) => (
                  <Badge key={community.id} variant="secondary">
                    {community.name}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Posts Feed */}
        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-48 bg-muted rounded-lg animate-pulse" />
            ))}
          </div>
        ) : userCommunities.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <h3 className="text-lg font-semibold mb-2">Join communities to see posts</h3>
              <p className="text-muted-foreground">
                Your feed will show posts from communities you join. Visit the Communities page to get started!
              </p>
            </CardContent>
          </Card>
        ) : communityPosts.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <h3 className="text-lg font-semibold mb-2">No posts yet</h3>
              <p className="text-muted-foreground">
                There are no posts from your communities yet. Check the Forum to see all posts!
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {communityPosts.map((post) => (
              <PostCard key={post.id} post={post} onDelete={deletePost} />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
