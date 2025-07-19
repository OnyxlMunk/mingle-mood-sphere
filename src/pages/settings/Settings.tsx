
import { useEffect } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { useNavigation } from '@/hooks/useNavigation';

export default function Settings() {
  const { updateBreadcrumbs } = useNavigation();

  useEffect(() => {
    updateBreadcrumbs([
      { name: 'Dashboard', href: '/dashboard' },
      { name: 'Settings' }
    ]);
  }, [updateBreadcrumbs]);

  return (
    <DashboardLayout title="Settings">
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold mb-4">Settings Coming Soon</h2>
        <p className="text-muted-foreground">Manage your account preferences and privacy settings.</p>
      </div>
    </DashboardLayout>
  );
}
