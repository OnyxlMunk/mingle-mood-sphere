import { Heart, Github, Twitter, Mail, Shield } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-mood-calm rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-mood-calm bg-clip-text text-transparent">
                MoodMingle
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Building authentic connections through shared emotional experiences. 
              Your mental health journey matters.
            </p>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h3 className="font-semibold">Features</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Mood Tracking</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Community Forums</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">AI Sentiment Analysis</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Mental Health Support</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold">Support</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Crisis Resources</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h3 className="font-semibold">Connect</h3>
            <div className="flex space-x-3">
              <a href="#" className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Mail className="w-4 h-4" />
              </a>
            </div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <Shield className="w-3 h-3" />
              <span>Privacy Protected</span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
          <p className="text-sm text-muted-foreground">
            © {currentYear} MoodMingle. Made with love for mental health awareness.
          </p>
          <p className="text-xs text-muted-foreground">
            If you're in crisis, call 988 (Suicide & Crisis Lifeline)
          </p>
        </div>
      </div>
    </footer>
  );
}