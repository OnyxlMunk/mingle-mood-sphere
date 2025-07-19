
import { useEffect } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Edit, MapPin, Calendar, Heart, MessageSquare, Users } from 'lucide-react';
import { useNavigation } from '@/hooks/useNavigation';

export default function Profile() {
  const { updateBreadcrumbs } = useNavigation();

  useEffect(() => {
    updateBreadcrumbs([
      { name: 'Dashboard', href: '/dashboard' },
      { name: 'Profile' }
    ]);
  }, [updateBreadcrumbs]);

  return (
    <DashboardLayout title="My Profile">
      <div className="space-y-6">
        {/* Profile Header */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/placeholder-avatar.jpg" />
                <AvatarFallback className="text-lg">JD</AvatarFallback>
              </Avatar>
              
              <div className="flex-1 space-y-2">
                <div className="flex items-center space-x-3">
                  <h2 className="text-2xl font-bold">John Doe</h2>
                  <Badge variant="outline" className="bg-mood-happy/10 text-mood-happy border-mood-happy/20">
                    😊 Happy
                  </Badge>
                </div>
                <p className="text-muted-foreground">
                  Spreading positivity and good vibes. Mental health advocate and community supporter.
                </p>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>San Francisco, CA</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>Joined March 2024</span>
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
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">7-day streak</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Forum Posts</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">12 this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Communities</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">2 as moderator</p>
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
              {[
                { date: 'Today', mood: '😊 Happy', note: 'Great day at work!' },
                { date: 'Yesterday', mood: '😌 Calm', note: 'Meditation session helped' },
                { date: '2 days ago', mood: '😴 Tired', note: 'Long day, need rest' },
                { date: '3 days ago', mood: '🎉 Excited', note: 'Weekend plans!' }
              ].map((entry, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                  <div>
                    <div className="font-medium">{entry.mood}</div>
                    <div className="text-sm text-muted-foreground">{entry.note}</div>
                  </div>
                  <div className="text-sm text-muted-foreground">{entry.date}</div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Communities</CardTitle>
              <CardDescription>Groups you're active in</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { name: 'Anxiety Support', role: 'Member', activity: '5 posts this week' },
                { name: 'Mindfulness Circle', role: 'Moderator', activity: '12 posts this week' },
                { name: 'Daily Gratitude', role: 'Member', activity: '3 posts this week' },
                { name: 'Weekend Warriors', role: 'Member', activity: '1 post this week' }
              ].map((community, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                  <div>
                    <div className="font-medium">{community.name}</div>
                    <div className="text-sm text-muted-foreground">{community.activity}</div>
                  </div>
                  <Badge variant={community.role === 'Moderator' ? 'default' : 'secondary'}>
                    {community.role}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
