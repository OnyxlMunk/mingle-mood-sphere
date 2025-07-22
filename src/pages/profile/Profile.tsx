
import { useEffect } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Edit, MapPin, Calendar, Heart, MessageSquare, Users } from 'lucide-react';
import { useNavigation } from '@/hooks/useNavigation';
import { useAuth } from '@/hooks/useAuth';
import { useMoods } from '@/hooks/useMoods';
import { usePosts } from '@/hooks/usePosts';
import { useCommunities } from '@/hooks/useCommunities';
import { format } from 'date-fns';

export default function Profile() {
  const { updateBreadcrumbs } = useNavigation();
  const { user } = useAuth();
  const { moods } = useMoods();
  const { posts } = usePosts();
  const { userCommunities } = useCommunities();

  useEffect(() => {
    updateBreadcrumbs([
      { name: 'Dashboard', href: '/dashboard' },
      { name: 'Profile' }
    ]);
  }, [updateBreadcrumbs]);

  // Get user display info
  const getUserName = () => {
    return user?.user_metadata?.username || 
           user?.user_metadata?.display_name || 
           user?.email?.split('@')[0] || 
           'Anonymous User';
  };

  const getUserInitials = () => {
    const name = getUserName();
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  // Calculate stats
  const userPosts = posts.filter(post => post.author_id === user?.id);
  const todaysMood = moods.find(mood => {
    const today = new Date();
    const moodDate = new Date(mood.created_at);
    return moodDate.toDateString() === today.toDateString();
  });

  return (
    <DashboardLayout title="My Profile">
      <div className="space-y-6">
        {/* Profile Header */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user?.user_metadata?.avatar_url} />
                <AvatarFallback className="text-lg">{getUserInitials()}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1 space-y-2">
                <div className="flex items-center space-x-3">
                  <h2 className="text-2xl font-bold">{getUserName()}</h2>
                  {todaysMood && (
                    <Badge variant="outline" className="bg-mood-happy/10 text-mood-happy border-mood-happy/20">
                      {todaysMood.mood_type} ({todaysMood.mood_level}/10)
                    </Badge>
                  )}
                </div>
                <p className="text-muted-foreground">
                  {user?.user_metadata?.bio || "Welcome to MoodMingle! Start sharing your journey and connect with our caring community."}
                </p>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{user?.user_metadata?.location || "Location not set"}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>Joined {user?.created_at ? format(new Date(user.created_at), 'MMMM yyyy') : 'Recently'}</span>
                  </div>
                </div>
              </div>
              
              <Button>
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Mood Entries</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{moods.length}</div>
              <p className="text-xs text-muted-foreground">
                {todaysMood ? 'Logged today' : 'Log today\'s mood'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Forum Posts</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userPosts.length}</div>
              <p className="text-xs text-muted-foreground">Total contributions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Communities</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userCommunities.length}</div>
              <p className="text-xs text-muted-foreground">Active memberships</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Moods</CardTitle>
              <CardDescription>Your mood journey this week</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {moods.slice(0, 4).length > 0 ? (
                moods.slice(0, 4).map((mood, index) => (
                  <div key={mood.id} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                    <div>
                      <div className="font-medium">{mood.mood_type} ({mood.mood_level}/10)</div>
                      <div className="text-sm text-muted-foreground">{mood.notes || 'No notes'}</div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {format(new Date(mood.created_at), 'MMM d')}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Heart className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No mood entries yet</p>
                  <p className="text-xs">Start tracking your emotions today!</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Communities</CardTitle>
              <CardDescription>Groups you're active in</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {userCommunities.length > 0 ? (
                userCommunities.slice(0, 4).map((community) => (
                  <div key={community.id} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                    <div>
                      <div className="font-medium">{community.name}</div>
                      <div className="text-sm text-muted-foreground">{community.member_count} members</div>
                    </div>
                    <Badge variant="secondary">Member</Badge>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No communities joined yet</p>
                  <p className="text-xs">Explore communities to connect!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
