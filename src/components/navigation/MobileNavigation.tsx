
import { Link } from 'react-router-dom';
import { mobileBottomNavItems } from '@/utils/navigation';
import { useNavigation } from '@/hooks/useNavigation';
import { cn } from '@/lib/utils';

export function MobileNavigation() {
  const { isActiveRoute } = useNavigation();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background border-t">
      <div className="flex items-center justify-around py-2">
        {mobileBottomNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = isActiveRoute(item.href);
          
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex flex-col items-center justify-center px-3 py-2 text-xs transition-colors",
                isActive 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-primary"
              )}
            >
              <Icon className={cn(
                "h-6 w-6 mb-1",
                isActive && "text-primary"
              )} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
