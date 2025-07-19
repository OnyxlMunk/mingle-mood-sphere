
import { ReactNode } from 'react';
import { NavigationWrapper } from '@/components/navigation/NavigationWrapper';

interface AuthenticatedLayoutProps {
  children: ReactNode;
}

export function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
  return (
    <NavigationWrapper isAuthenticated={true}>
      {children}
    </NavigationWrapper>
  );
}
