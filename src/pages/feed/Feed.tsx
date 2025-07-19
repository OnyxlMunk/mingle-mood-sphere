
import { useEffect } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { useNavigation } from '@/hooks/useNavigation';

export default function Feed() {
  const { updateBreadcrumbs } = useNavigation();

  useEffect(() => {
    updateBreadcrumbs([
      { name: 'Dashboard', href: '/dashboard' },
      { name: 'Feed' }
    ]);
  }, [updateBreadcrumbs]);

  return (
    <DashboardLayout title="Social Feed">
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold mb-4">Social Feed Coming Soon</h2>
        <p className="text-muted-foreground">See updates from people you follow.</p>
      </div>
    </DashboardLayout>
  );
}
