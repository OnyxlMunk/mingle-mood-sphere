import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  MessageSquare, 
  TrendingUp, 
  Users, 
  Shield, 
  Bot,
  Calendar,
  Heart,
  Zap,
  Eye,
  Lock,
  Smartphone
} from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: Brain,
      title: "AI Sentiment Analysis",
      description: "Understand the emotional tone of your posts with advanced AI that provides insights into your mental state patterns.",
      color: "mood-happy",
      badge: "AI Powered"
    },
    {
      icon: MessageSquare,
      title: "Supportive Forums",
      description: "Join mood-based communities where you can share experiences, seek advice, and support others on similar journeys.",
      color: "mood-calm",
      badge: "Community"
    },
    {
      icon: TrendingUp,
      title: "Mood Tracking",
      description: "Visualize your emotional journey with beautiful charts and insights that help you understand your patterns over time.",
      color: "mood-excited",
      badge: "Analytics"
    },
    {
      icon: Users,
      title: "Niche Communities",
      description: "Find your tribe in specialized groups like 'Anxiety Allies', 'Joyful Journeys', or 'Mindfulness Masters'.",
      color: "mood-grateful",
      badge: "Social"
    },
    {
      icon: Bot,
      title: "Mental Health Bot",
      description: "Get 24/7 support from our AI companion trained on mental health resources and crisis intervention techniques.",
      color: "mood-love",
      badge: "Support"
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "Granular privacy controls let you decide who sees your moods, posts, and profile. Your mental health, your rules.",
      color: "mood-calm",
      badge: "Security"
    }
  ];

  const additionalFeatures = [
    { icon: Calendar, text: "Daily mood logging with calendar view" },
    { icon: Heart, text: "Follow users and get personalized feeds" },
    { icon: Zap, text: "AI-powered content recommendations" },
    { icon: Eye, text: "Ephemeral content that disappears after 24h" },
    { icon: Lock, text: "End-to-end encryption for sensitive data" },
    { icon: Smartphone, text: "Mobile-first design for on-the-go support" }
  ];

  return (
    <section className="py-16 lg:py-24 bg-gradient-support">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <Badge className="bg-primary/10 text-primary border-primary/20">
            Features Built for Wellbeing
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Everything You Need for
            <span className="block text-primary">Mental Health Support</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            MoodMingle combines cutting-edge technology with human empathy to create 
            a safe space for authentic emotional expression and community support.
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card 
              key={feature.title}
              className="group hover:shadow-mood transition-all duration-300 border-0 bg-card/80 backdrop-blur"
            >
              <CardHeader className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 bg-${feature.color}/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className={`w-6 h-6 text-${feature.color}`} />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Features List */}
        <Card className="bg-card/60 backdrop-blur border-0 shadow-soft">
          <CardHeader>
            <CardTitle className="text-center text-2xl">
              Plus Many More Features
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {additionalFeatures.map((feature, index) => (
                <div 
                  key={feature.text}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}