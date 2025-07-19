
import { ReactNode } from 'react';
import { AuthenticatedLayout } from './AuthenticatedLayout';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import { useNavigation } from '@/hooks/useNavigation';

interface DashboardLayoutProps {
  children: ReactNode;
  title?: string;
  showBreadcrumbs?: boolean;
}

export function DashboardLayout({ 
  children, 
  title, 
  showBreadcrumbs = true 
}: DashboardLayoutProps) {
  const { navigationState } = useNavigation();

  return (
    <AuthenticatedLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {showBreadcrumbs && navigationState.breadcrumbs.length > 1 && (
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              {navigationState.breadcrumbs.map((breadcrumb, index) => {
                const isLast = index === navigationState.breadcrumbs.length - 1;
                
                return (
                  <BreadcrumbItem key={breadcrumb.name}>
                    {isLast ? (
                      <BreadcrumbPage>{breadcrumb.name}</BreadcrumbPage>
                    ) : (
                      <>
                        <BreadcrumbLink href={breadcrumb.href}>
                          {breadcrumb.name}
                        </BreadcrumbLink>
                        <BreadcrumbSeparator />
                      </>
                    )}
                  </BreadcrumbItem>
                );
              })}
            </BreadcrumbList>
          </Breadcrumb>
        )}
        
        {title && (
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground">{title}</h1>
          </div>
        )}
        
        {children}
      </div>
    </AuthenticatedLayout>
  );
}
