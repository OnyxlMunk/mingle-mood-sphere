
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, MessageSquare, Users, TrendingUp, Plus } from 'lucide-react';
import { useNavigation } from '@/hooks/useNavigation';
import { useMoods } from '@/hooks/useMoods';
import { usePosts } from '@/hooks/usePosts';
import { useCommunities } from '@/hooks/useCommunities';
import { format } from 'date-fns';

export default function Dashboard() {
  const { updateBreadcrumbs } = useNavigation();
  const navigate = useNavigate();
  const { moods } = useMoods();
  const { posts } = usePosts();
  const { userCommunities } = useCommunities();

  useEffect(() => {
    updateBreadcrumbs([{ name: 'Dashboard' }]);
  }, [updateBreadcrumbs]);

  // Calculate real stats
  const todaysMood = moods.find(mood => {
    const today = new Date();
    const moodDate = new Date(mood.created_at);
    return moodDate.toDateString() === today.toDateString();
  });

  const userPosts = posts.filter(post => post.author_id);
  const moodStreak = moods.length > 0 ? Math.min(moods.length, 7) : 0;

  const quickStats = [
    { 
      name: 'Current Mood', 
      value: todaysMood ? `${todaysMood.mood_type} (${todaysMood.mood_level}/10)` : 'Not logged today',
      change: todaysMood ? 'Logged today' : 'Log your mood',
      icon: Heart 
    },
    { 
      name: 'Forum Posts', 
      value: userPosts.length.toString(), 
      change: `${userPosts.length} total posts`, 
      icon: MessageSquare 
    },
    { 
      name: 'Communities', 
      value: userCommunities.length.toString(), 
      change: `${userCommunities.length} joined`, 
      icon: Users 
    },
    { 
      name: 'Mood Entries', 
      value: moods.length.toString(), 
      change: `${moodStreak} recent entries`, 
      icon: TrendingUp 
    }
  ];

  return (
    <DashboardLayout title="Welcome back!" showBreadcrumbs={false}>
      <div className="space-y-6">
        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {quickStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.name}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">{stat.change}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Heart className="h-5 w-5 text-mood-happy" />
                <span>Today's Mood</span>
              </CardTitle>
              <CardDescription>How are you feeling today?</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" onClick={() => navigate('/mood')}>
                <Plus className="h-4 w-4 mr-2" />
                Log Current Mood
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                <span>Active Discussions</span>
              </CardTitle>
              <CardDescription>Join the conversation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {userCommunities.slice(0, 2).map((community) => (
                <div key={community.id} className="flex items-center justify-between">
                  <span className="text-sm">{community.name}</span>
                  <Badge variant="secondary">Member</Badge>
                </div>
              ))}
              {userCommunities.length === 0 && (
                <p className="text-sm text-muted-foreground">No communities joined yet</p>
              )}
              <Button variant="outline" className="w-full mt-2" onClick={() => navigate('/forum')}>
                View All Forums
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-mood-energetic" />
                <span>Communities</span>
              </CardTitle>
              <CardDescription>Connect with like-minded people</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-sm">You're in {userCommunities.length} communities</div>
                <Button variant="outline" className="w-full" onClick={() => navigate('/communities')}>
                  Explore Communities
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest interactions and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todaysMood && (
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-mood-happy rounded-full"></div>
                  <span className="text-sm">
                    You logged a {todaysMood.mood_type} mood today ({todaysMood.mood_level}/10)
                  </span>
                </div>
              )}
              {userPosts.slice(0, 1).map((post) => (
                <div key={post.id} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm">
                    You posted "{post.title.substring(0, 50)}..." {format(new Date(post.created_at), 'h:mm a')}
                  </span>
                </div>
              ))}
              {userCommunities.slice(0, 1).map((community) => (
                <div key={community.id} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-mood-energetic rounded-full"></div>
                  <span className="text-sm">You're a member of {community.name}</span>
                </div>
              ))}
              {!todaysMood && userPosts.length === 0 && userCommunities.length === 0 && (
                <div className="text-center text-muted-foreground py-4">
                  <p>No recent activity</p>
                  <p className="text-xs">Start by logging your mood or joining a community!</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
