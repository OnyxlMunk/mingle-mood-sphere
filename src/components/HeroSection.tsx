
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Heart, Users, TrendingUp, Shield, Sparkles, ArrowRight, LogIn, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";

export function HeroSection() {
  const moods = [
    { emoji: "😊", label: "Happy", color: "mood-happy" },
    { emoji: "😌", label: "Calm", color: "mood-calm" },
    { emoji: "😅", label: "Anxious", color: "mood-anxious" },
    { emoji: "🎉", label: "Excited", color: "mood-excited" },
    { emoji: "💙", label: "Grateful", color: "mood-grateful" },
  ];

  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-calm opacity-30"></div>
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">
                <Sparkles className="w-3 h-3 mr-1" />
                Mental Health First
              </Badge>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Share Your
                <span className="block bg-gradient-to-r from-primary via-mood-calm to-mood-happy bg-clip-text text-transparent">
                  Authentic Mood
                </span>
                Connect Meaningfully
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-lg">
                Join a supportive community where your feelings matter. Track your emotional journey, 
                connect with others who understand, and discover resources for mental wellbeing.
              </p>
            </div>

            {/* Quick Mood Selector */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-muted-foreground">How are you feeling today?</p>
              <div className="flex flex-wrap gap-2">
                {moods.map((mood, index) => (
                  <Button
                    key={mood.label}
                    variant="outline"
                    size="sm"
                    className={`bg-${mood.color}/10 border-${mood.color}/30 hover:bg-${mood.color}/20 transition-all duration-300 animate-gentle-float`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <span className="text-lg mr-2">{mood.emoji}</span>
                    {mood.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 shadow-mood" asChild>
                <Link to="/auth/register">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Start Your Journey
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/auth/login">
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </Link>
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center space-x-6 pt-4">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Users className="w-4 h-4" />
                <span>10K+ caring members</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Shield className="w-4 h-4" />
                <span>Privacy protected</span>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image & Stats */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-mood">
              <img 
                src={heroImage} 
                alt="MoodMingle Community" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent"></div>
            </div>

            {/* Floating Stats Cards */}
            <Card className="absolute -top-4 -left-4 p-4 bg-card/95 backdrop-blur border shadow-soft animate-gentle-float">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-mood-happy/20 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-mood-happy" />
                </div>
                <div>
                  <p className="text-sm font-medium">Mood Improved</p>
                  <p className="text-xs text-muted-foreground">85% of users</p>
                </div>
              </div>
            </Card>

            <Card className="absolute -bottom-4 -right-4 p-4 bg-card/95 backdrop-blur border shadow-soft animate-gentle-float" style={{ animationDelay: '1s' }}>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-mood-calm/20 rounded-full flex items-center justify-center">
                  <Heart className="w-5 h-5 text-mood-calm" />
                </div>
                <div>
                  <p className="text-sm font-medium">Daily Support</p>
                  <p className="text-xs text-muted-foreground">24/7 community</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
