
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Heart, Menu, X } from 'lucide-react';
import { publicNavigationItems } from '@/utils/navigation';
import { NavigationItems } from './NavigationItems';
import { useNavigation } from '@/hooks/useNavigation';

export function PublicNavigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isActiveRoute } = useNavigation();

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-mood-calm rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-mood-calm bg-clip-text text-transparent">
              MoodMingle
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <NavigationItems 
              items={publicNavigationItems.slice(0, 1)} 
              isActiveRoute={isActiveRoute}
            />
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <Button variant="outline" size="sm" asChild>
              <Link to="/auth/login">Sign In</Link>
            </Button>
            <Button size="sm" asChild>
              <Link to="/auth/register">Join MoodMingle</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-accent transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-3">
              <NavigationItems 
                items={publicNavigationItems}
                isActiveRoute={isActiveRoute}
                variant="mobile"
                onItemClick={() => setIsMenuOpen(false)}
              />
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
