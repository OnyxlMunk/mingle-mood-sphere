
import { useEffect } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { useNavigation } from '@/hooks/useNavigation';

export default function MoodTracker() {
  const { updateBreadcrumbs } = useNavigation();

  useEffect(() => {
    updateBreadcrumbs([
      { name: 'Dashboard', href: '/dashboard' },
      { name: 'Mood Tracker' }
    ]);
  }, [updateBreadcrumbs]);

  return (
    <DashboardLayout title="Mood Tracker">
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold mb-4">Mood Tracker Coming Soon</h2>
        <p className="text-muted-foreground">Track your daily moods and see patterns over time.</p>
      </div>
    </DashboardLayout>
  );
}
