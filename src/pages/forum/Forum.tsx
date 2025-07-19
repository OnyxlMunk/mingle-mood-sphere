
import { useEffect } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { useNavigation } from '@/hooks/useNavigation';

export default function Forum() {
  const { updateBreadcrumbs } = useNavigation();

  useEffect(() => {
    updateBreadcrumbs([
      { name: 'Dashboard', href: '/dashboard' },
      { name: 'Forum' }
    ]);
  }, [updateBreadcrumbs]);

  return (
    <DashboardLayout title="Forum">
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold mb-4">Forum Coming Soon</h2>
        <p className="text-muted-foreground">Join discussions with the community.</p>
      </div>
    </DashboardLayout>
  );
}
