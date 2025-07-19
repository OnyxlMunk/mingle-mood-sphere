-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT NOT NULL UNIQUE,
  display_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create moods table
CREATE TABLE public.moods (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  mood_level INTEGER NOT NULL CHECK (mood_level BETWEEN 1 AND 10),
  mood_type TEXT NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create communities table
CREATE TABLE public.communities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  creator_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  is_private BOOLEAN NOT NULL DEFAULT false,
  member_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create community memberships table
CREATE TABLE public.community_memberships (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  community_id UUID NOT NULL REFERENCES public.communities(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('member', 'moderator', 'admin')),
  joined_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(community_id, user_id)
);

-- Create forum posts table
CREATE TABLE public.forum_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  community_id UUID REFERENCES public.communities(id) ON DELETE CASCADE,
  is_pinned BOOLEAN NOT NULL DEFAULT false,
  comment_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create forum comments table
CREATE TABLE public.forum_comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  content TEXT NOT NULL,
  author_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  post_id UUID NOT NULL REFERENCES public.forum_posts(id) ON DELETE CASCADE,
  parent_comment_id UUID REFERENCES public.forum_comments(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.moods ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.communities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_comments ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for moods
CREATE POLICY "Users can view their own moods" ON public.moods FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own moods" ON public.moods FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own moods" ON public.moods FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own moods" ON public.moods FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for communities
CREATE POLICY "Anyone can view public communities" ON public.communities FOR SELECT USING (NOT is_private);
CREATE POLICY "Members can view private communities" ON public.communities FOR SELECT USING (
  is_private AND EXISTS (
    SELECT 1 FROM public.community_memberships 
    WHERE community_id = communities.id AND user_id = auth.uid()
  )
);
CREATE POLICY "Authenticated users can create communities" ON public.communities FOR INSERT WITH CHECK (auth.uid() = creator_id);
CREATE POLICY "Creators and admins can update communities" ON public.communities FOR UPDATE USING (
  auth.uid() = creator_id OR EXISTS (
    SELECT 1 FROM public.community_memberships 
    WHERE community_id = communities.id AND user_id = auth.uid() AND role = 'admin'
  )
);

-- RLS Policies for community memberships
CREATE POLICY "Users can view memberships of visible communities" ON public.community_memberships FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.communities WHERE id = community_id AND (NOT is_private OR creator_id = auth.uid()))
  OR user_id = auth.uid()
);
CREATE POLICY "Users can join communities" ON public.community_memberships FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can leave communities" ON public.community_memberships FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for forum posts
CREATE POLICY "Users can view posts in accessible communities" ON public.forum_posts FOR SELECT USING (
  community_id IS NULL OR EXISTS (
    SELECT 1 FROM public.communities c 
    WHERE c.id = community_id AND (
      NOT c.is_private OR EXISTS (
        SELECT 1 FROM public.community_memberships 
        WHERE community_id = c.id AND user_id = auth.uid()
      )
    )
  )
);
CREATE POLICY "Authenticated users can create posts" ON public.forum_posts FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Authors can update their posts" ON public.forum_posts FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "Authors can delete their posts" ON public.forum_posts FOR DELETE USING (auth.uid() = author_id);

-- RLS Policies for forum comments
CREATE POLICY "Users can view comments on accessible posts" ON public.forum_comments FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.forum_posts p
    WHERE p.id = post_id AND (
      p.community_id IS NULL OR EXISTS (
        SELECT 1 FROM public.communities c 
        WHERE c.id = p.community_id AND (
          NOT c.is_private OR EXISTS (
            SELECT 1 FROM public.community_memberships 
            WHERE community_id = c.id AND user_id = auth.uid()
          )
        )
      )
    )
  )
);
CREATE POLICY "Authenticated users can create comments" ON public.forum_comments FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Authors can update their comments" ON public.forum_comments FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "Authors can delete their comments" ON public.forum_comments FOR DELETE USING (auth.uid() = author_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_moods_updated_at BEFORE UPDATE ON public.moods FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_communities_updated_at BEFORE UPDATE ON public.communities FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_forum_posts_updated_at BEFORE UPDATE ON public.forum_posts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_forum_comments_updated_at BEFORE UPDATE ON public.forum_comments FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, username, display_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'username', 'user_' || substr(NEW.id::text, 1, 8)),
    COALESCE(NEW.raw_user_meta_data ->> 'display_name', NEW.email)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update community member count
CREATE OR REPLACE FUNCTION public.update_community_member_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.communities 
    SET member_count = member_count + 1 
    WHERE id = NEW.community_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.communities 
    SET member_count = member_count - 1 
    WHERE id = OLD.community_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update member count
CREATE TRIGGER update_member_count_trigger
  AFTER INSERT OR DELETE ON public.community_memberships
  FOR EACH ROW EXECUTE FUNCTION public.update_community_member_count();

-- Function to update forum post comment count
CREATE OR REPLACE FUNCTION public.update_post_comment_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.forum_posts 
    SET comment_count = comment_count + 1 
    WHERE id = NEW.post_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.forum_posts 
    SET comment_count = comment_count - 1 
    WHERE id = OLD.post_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update comment count
CREATE TRIGGER update_comment_count_trigger
  AFTER INSERT OR DELETE ON public.forum_comments
  FOR EACH ROW EXECUTE FUNCTION public.update_post_comment_count();