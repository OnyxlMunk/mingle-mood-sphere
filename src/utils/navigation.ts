
import { NavigationItem } from '@/types/navigation';
import { 
  Home, 
  User, 
  Heart, 
  MessageSquare, 
  Users, 
  Feed,
  Bot,
  Settings,
  LogIn,
  UserPlus
} from 'lucide-react';

export const publicNavigationItems: NavigationItem[] = [
  {
    name: 'Home',
    href: '/',
    icon: Home
  },
  {
    name: 'Sign In',
    href: '/auth/login',
    icon: LogIn
  },
  {
    name: 'Join Now',
    href: '/auth/register',
    icon: UserPlus
  }
];

export const authenticatedNavigationItems: NavigationItem[] = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: Home,
    requiresAuth: true
  },
  {
    name: 'My Profile',
    href: '/profile',
    icon: User,
    requiresAuth: true
  },
  {
    name: 'Mood Tracker',
    href: '/mood',
    icon: Heart,
    requiresAuth: true
  },
  {
    name: 'Forum',
    href: '/forum',
    icon: MessageSquare,
    requiresAuth: true
  },
  {
    name: 'Communities',
    href: '/communities',
    icon: Users,
    requiresAuth: true
  },
  {
    name: 'Feed',
    href: '/feed',
    icon: Feed,
    requiresAuth: true
  },
  {
    name: 'AI Support',
    href: '/support',
    icon: Bot,
    requiresAuth: true
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: Settings,
    requiresAuth: true
  }
];

export const mobileBottomNavItems: NavigationItem[] = [
  {
    name: 'Home',
    href: '/dashboard',
    icon: Home,
    requiresAuth: true
  },
  {
    name: 'Mood',
    href: '/mood',
    icon: Heart,
    requiresAuth: true
  },
  {
    name: 'Forum',
    href: '/forum',
    icon: MessageSquare,
    requiresAuth: true
  },
  {
    name: 'Feed',
    href: '/feed',
    icon: Feed,
    requiresAuth: true
  },
  {
    name: 'Profile',
    href: '/profile',
    icon: User,
    requiresAuth: true
  }
];

export const generateBreadcrumbs = (pathname: string) => {
  const segments = pathname.split('/').filter(Boolean);
  const breadcrumbs = [{ name: 'Home', href: '/dashboard' }];
  
  let currentPath = '';
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const isLast = index === segments.length - 1;
    
    // Capitalize and format segment names
    const name = segment.charAt(0).toUpperCase() + segment.slice(1).replace('-', ' ');
    
    breadcrumbs.push({
      name,
      href: isLast ? undefined : currentPath
    });
  });
  
  return breadcrumbs;
};
