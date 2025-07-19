
import { ReactNode } from 'react';
import { NavigationWrapper } from '@/components/navigation/NavigationWrapper';

interface PublicLayoutProps {
  children: ReactNode;
}

export function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <NavigationWrapper isAuthenticated={false}>
      {children}
    </NavigationWrapper>
  );
}
