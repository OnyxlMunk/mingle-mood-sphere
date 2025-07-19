
import { Link } from 'react-router-dom';
import { NavigationItem } from '@/types/navigation';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface NavigationItemsProps {
  items: NavigationItem[];
  isActiveRoute: (href: string) => boolean;
  variant?: 'desktop' | 'mobile' | 'sidebar';
  onItemClick?: () => void;
}

export function NavigationItems({ 
  items, 
  isActiveRoute, 
  variant = 'desktop',
  onItemClick 
}: NavigationItemsProps) {
  const getItemClasses = (item: NavigationItem) => {
    const isActive = isActiveRoute(item.href);
    const baseClasses = "flex items-center transition-colors duration-200";
    
    switch (variant) {
      case 'mobile':
        return cn(
          baseClasses,
          "flex-col space-y-1 px-3 py-2 text-sm",
          isActive 
            ? "text-primary bg-primary/10" 
            : "text-muted-foreground hover:text-primary hover:bg-accent"
        );
      case 'sidebar':
        return cn(
          baseClasses,
          "space-x-3 px-4 py-3 rounded-lg",
          isActive 
            ? "text-primary bg-primary/10 font-medium" 
            : "text-muted-foreground hover:text-primary hover:bg-accent"
        );
      default:
        return cn(
          baseClasses,
          "space-x-2 px-3 py-2 rounded-md",
          isActive 
            ? "text-primary bg-primary/10" 
            : "text-muted-foreground hover:text-primary hover:bg-accent"
        );
    }
  };

  return (
    <>
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = isActiveRoute(item.href);
        
        return (
          <Link
            key={item.name}
            to={item.href}
            className={getItemClasses(item)}
            onClick={onItemClick}
          >
            <Icon className={cn(
              "h-5 w-5",
              variant === 'mobile' && "h-6 w-6"
            )} />
            <span className={cn(
              variant === 'mobile' && "text-xs"
            )}>
              {item.name}
            </span>
            {item.badge && item.badge > 0 && (
              <Badge variant="secondary" className="ml-auto text-xs">
                {item.badge}
              </Badge>
            )}
          </Link>
        );
      })}
    </>
  );
}
