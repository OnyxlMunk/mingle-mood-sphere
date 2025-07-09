import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Menu, X, User, MessageCircle, TrendingUp } from "lucide-react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-mood-calm rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-mood-calm bg-clip-text text-transparent">
              MoodMingle
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#home" className="text-foreground hover:text-primary transition-colors">
              Home
            </a>
            <a href="#forum" className="text-muted-foreground hover:text-primary transition-colors">
              Forum
            </a>
            <a href="#moods" className="text-muted-foreground hover:text-primary transition-colors">
              Moods
            </a>
            <a href="#communities" className="text-muted-foreground hover:text-primary transition-colors">
              Communities
            </a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <Badge variant="secondary" className="bg-gradient-calm text-sm">
              Beta
            </Badge>
            <Button variant="outline" size="sm">
              <User className="w-4 h-4 mr-2" />
              Sign In
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              Join MoodMingle
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-accent transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-3">
              <a href="#home" className="px-3 py-2 text-foreground hover:text-primary transition-colors">
                Home
              </a>
              <a href="#forum" className="px-3 py-2 text-muted-foreground hover:text-primary transition-colors flex items-center">
                <MessageCircle className="w-4 h-4 mr-2" />
                Forum
              </a>
              <a href="#moods" className="px-3 py-2 text-muted-foreground hover:text-primary transition-colors flex items-center">
                <TrendingUp className="w-4 h-4 mr-2" />
                Moods
              </a>
              <a href="#communities" className="px-3 py-2 text-muted-foreground hover:text-primary transition-colors">
                Communities
              </a>
              <div className="px-3 py-2 space-y-2">
                <Button variant="outline" className="w-full">
                  <User className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
                <Button className="w-full bg-primary hover:bg-primary/90">
                  Join MoodMingle
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}