
import { useEffect } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { useNavigation } from '@/hooks/useNavigation';

export default function Communities() {
  const { updateBreadcrumbs } = useNavigation();

  useEffect(() => {
    updateBreadcrumbs([
      { name: 'Dashboard', href: '/dashboard' },
      { name: 'Communities' }
    ]);
  }, [updateBreadcrumbs]);

  return (
    <DashboardLayout title="Communities">
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold mb-4">Communities Coming Soon</h2>
        <p className="text-muted-foreground">Find and join communities that match your interests.</p>
      </div>
    </DashboardLayout>
  );
}
