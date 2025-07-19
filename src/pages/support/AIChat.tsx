
import { useEffect } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { useNavigation } from '@/hooks/useNavigation';

export default function AIChat() {
  const { updateBreadcrumbs } = useNavigation();

  useEffect(() => {
    updateBreadcrumbs([
      { name: 'Dashboard', href: '/dashboard' },
      { name: 'AI Support' }
    ]);
  }, [updateBreadcrumbs]);

  return (
    <DashboardLayout title="AI Mental Health Support">
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold mb-4">AI Support Chat Coming Soon</h2>
        <p className="text-muted-foreground">Get mental health support and resources from our AI assistant.</p>
      </div>
    </DashboardLayout>
  );
}
