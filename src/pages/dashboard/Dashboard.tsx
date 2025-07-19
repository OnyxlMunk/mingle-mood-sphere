
import { useEffect } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, MessageSquare, Users, TrendingUp, Plus } from 'lucide-react';
import { useNavigation } from '@/hooks/useNavigation';

export default function Dashboard() {
  const { updateBreadcrumbs } = useNavigation();

  useEffect(() => {
    updateBreadcrumbs([{ name: 'Dashboard' }]);
  }, [updateBreadcrumbs]);

  const quickStats = [
    { name: 'Current Mood', value: '😊 Happy', change: '+2 from yesterday', icon: Heart },
    { name: 'Forum Posts', value: '12', change: '+3 this week', icon: MessageSquare },
    { name: 'Communities', value: '5', change: '2 new joins', icon: Users },
    { name: 'Mood Streak', value: '7 days', change: 'Personal best!', icon: TrendingUp }
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
              <Button className="w-full">
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
              <div className="flex items-center justify-between">
                <span className="text-sm">Anxiety Support</span>
                <Badge variant="secondary">5 new</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Daily Gratitude</span>
                <Badge variant="secondary">2 new</Badge>
              </div>
              <Button variant="outline" className="w-full mt-2">
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
                <div className="text-sm">You're in 5 communities</div>
                <Button variant="outline" className="w-full">
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
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-mood-happy rounded-full"></div>
                <span className="text-sm">You logged a Happy mood 2 hours ago</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm">Sarah liked your post in Gratitude Circle</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-mood-energetic rounded-full"></div>
                <span className="text-sm">New member joined Mindfulness Community</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
