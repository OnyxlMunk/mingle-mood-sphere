import { useMoods } from '@/hooks/useMoods';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trash2, Edit } from 'lucide-react';
import { format } from 'date-fns';

const moodEmojis: { [key: string]: string } = {
  happy: '😊',
  sad: '😢',
  anxious: '😰',
  calm: '😌',
  energetic: '⚡',
  tired: '😴',
};

export function MoodHistory() {
  const { moods, loading, deleteMood } = useMoods();

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Mood History</CardTitle>
          <CardDescription>Loading your mood history...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-16 bg-muted rounded-lg animate-pulse" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mood History</CardTitle>
        <CardDescription>Your recent mood entries</CardDescription>
      </CardHeader>
      <CardContent>
        {moods.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>No mood entries yet.</p>
            <p className="text-sm">Start logging your moods to see your history here.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {moods.map((mood) => (
              <div
                key={mood.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">
                    {moodEmojis[mood.mood_type] || '😐'}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium capitalize">{mood.mood_type}</span>
                      <Badge variant="secondary">{mood.mood_level}/10</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {format(new Date(mood.created_at), 'MMM d, yyyy at h:mm a')}
                    </div>
                    {mood.notes && (
                      <div className="text-sm text-muted-foreground mt-1">
                        "{mood.notes}"
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteMood(mood.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}