
import { useEffect } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { useNavigation } from '@/hooks/useNavigation';
import { MoodLogger } from '@/components/mood/MoodLogger';
import { MoodHistory } from '@/components/mood/MoodHistory';

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
      <div className="space-y-6">
        <MoodLogger />
        <MoodHistory />
      </div>
    </DashboardLayout>
  );
}
