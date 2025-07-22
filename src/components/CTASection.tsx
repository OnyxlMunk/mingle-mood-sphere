
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, ArrowRight, CheckCircle, Sparkles, UserPlus, LogIn } from "lucide-react";
import { Link } from "react-router-dom";

export function CTASection() {
  const benefits = [
    "Connect with 10,000+ supportive community members",
    "Track your mood patterns with AI-powered insights",
    "Access 24/7 mental health resources and support",
    "Join specialized communities that understand you",
    "Maintain complete privacy control over your data"
  ];

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="relative overflow-hidden bg-gradient-energy border-0 shadow-mood">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-mood-happy/10"></div>
          <div className="relative p-8 lg:p-12">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              
              {/* Header */}
              <div className="space-y-4">
                <Badge className="bg-card/80 text-primary border-primary/20 backdrop-blur">
                  <Heart className="w-3 h-3 mr-1" />
                  Join the Movement
                </Badge>
                
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                  Ready to Transform Your
                  <span className="block text-primary">Mental Health Journey?</span>
                </h2>
                
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Join our caring community today. Create your profile, start tracking your moods, 
                  and connect with others who understand your journey.
                </p>
              </div>

              {/* Benefits List */}
              <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto text-left">
                {benefits.map((benefit, index) => (
                  <div 
                    key={index}
                    className="flex items-start space-x-3 p-3 rounded-lg bg-card/60 backdrop-blur border"
                  >
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-primary hover:bg-primary/90 shadow-mood group" asChild>
                  <Link to="/auth/register">
                    <Sparkles className="w-4 h-4 mr-2 group-hover:animate-pulse" />
                    Join MoodMingle Now
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="bg-card/80 backdrop-blur" asChild>
                  <Link to="/auth/login">
                    <LogIn className="w-4 h-4 mr-2" />
                    Already a Member? Sign In
                  </Link>
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-8 text-sm text-muted-foreground pt-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-mood-happy rounded-full animate-pulse"></div>
                  <span>HIPAA Compliant</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-mood-calm rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                  <span>End-to-End Encrypted</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-mood-grateful rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                  <span>Privacy First</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
