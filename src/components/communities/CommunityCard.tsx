import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Lock } from 'lucide-react';
import { Community } from '@/hooks/useCommunities';

interface CommunityCardProps {
  community: Community;
  onJoin: (id: string) => void;
  onLeave: (id: string) => void;
}

export function CommunityCard({ community, onJoin, onLeave }: CommunityCardProps) {
  const canJoin = !community.is_member && !community.is_private;
  const canLeave = community.is_member && community.membership_role !== 'admin';

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="flex items-center space-x-2">
              <span>{community.name}</span>
              {community.is_private && (
                <Lock className="h-4 w-4 text-muted-foreground" />
              )}
            </CardTitle>
            <CardDescription>
              {community.description || 'No description provided'}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{community.member_count} {community.member_count === 1 ? 'member' : 'members'}</span>
          </div>
          
          {community.is_member && (
            <Badge variant="secondary">
              {community.membership_role === 'admin' ? 'Admin' : 'Member'}
            </Badge>
          )}
        </div>

        <div className="flex space-x-2">
          {canJoin && (
            <Button onClick={() => onJoin(community.id)} className="flex-1">
              Join Community
            </Button>
          )}
          
          {canLeave && (
            <Button 
              variant="outline" 
              onClick={() => onLeave(community.id)}
              className="flex-1"
            >
              Leave
            </Button>
          )}
          
          {community.is_private && !community.is_member && (
            <Button disabled className="flex-1">
              Private Community
            </Button>
          )}
          
          {community.membership_role === 'admin' && (
            <Button disabled className="flex-1">
              You're Admin
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}