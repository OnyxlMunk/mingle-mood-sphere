
import { useEffect } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { useNavigation } from '@/hooks/useNavigation';
import { useCommunities } from '@/hooks/useCommunities';
import { CreateCommunity } from '@/components/communities/CreateCommunity';
import { CommunityCard } from '@/components/communities/CommunityCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Communities() {
  const { updateBreadcrumbs } = useNavigation();
  const { communities, userCommunities, loading, joinCommunity, leaveCommunity } = useCommunities();

  useEffect(() => {
    updateBreadcrumbs([
      { name: 'Dashboard', href: '/dashboard' },
      { name: 'Communities' }
    ]);
  }, [updateBreadcrumbs]);

  return (
    <DashboardLayout title="Communities">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-semibold">Communities</h2>
            <p className="text-muted-foreground">Find and join communities that match your interests</p>
          </div>
          <CreateCommunity />
        </div>

        {/* User's Communities */}
        {userCommunities.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Your Communities</CardTitle>
              <CardDescription>Communities you're a member of</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {userCommunities.map((community) => (
                  <CommunityCard
                    key={community.id}
                    community={community}
                    onJoin={joinCommunity}
                    onLeave={leaveCommunity}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* All Communities */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Discover Communities</h3>
          {loading ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-48 bg-muted rounded-lg animate-pulse" />
              ))}
            </div>
          ) : communities.length === 0 ? (
            <div className="text-center py-12">
              <h4 className="text-lg font-semibold mb-2">No communities yet</h4>
              <p className="text-muted-foreground mb-4">Be the first to create a community!</p>
              <CreateCommunity />
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {communities.map((community) => (
                <CommunityCard
                  key={community.id}
                  community={community}
                  onJoin={joinCommunity}
                  onLeave={leaveCommunity}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
