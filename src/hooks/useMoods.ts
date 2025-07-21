import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export interface Mood {
  id: string;
  mood_type: string;
  mood_level: number;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export function useMoods() {
  const [moods, setMoods] = useState<Mood[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchMoods();
    }
  }, [user]);

  const fetchMoods = async () => {
    try {
      const { data, error } = await supabase
        .from('moods')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMoods(data || []);
    } catch (error) {
      toast({
        title: "Error loading moods",
        description: "Failed to load your mood history.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const addMood = async (moodType: string, moodLevel: number, notes?: string) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('moods')
        .insert([{
          user_id: user.id,
          mood_type: moodType,
          mood_level: moodLevel,
          notes
        }])
        .select()
        .single();

      if (error) throw error;

      setMoods(prev => [data, ...prev]);
      toast({
        title: "Mood logged",
        description: `Your ${moodType} mood has been recorded.`
      });
    } catch (error) {
      toast({
        title: "Error logging mood",
        description: "Failed to save your mood. Please try again.",
        variant: "destructive"
      });
    }
  };

  const updateMood = async (id: string, moodType: string, moodLevel: number, notes?: string) => {
    try {
      const { data, error } = await supabase
        .from('moods')
        .update({
          mood_type: moodType,
          mood_level: moodLevel,
          notes
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setMoods(prev => prev.map(mood => mood.id === id ? data : mood));
      toast({
        title: "Mood updated",
        description: "Your mood entry has been updated."
      });
    } catch (error) {
      toast({
        title: "Error updating mood",
        description: "Failed to update your mood. Please try again.",
        variant: "destructive"
      });
    }
  };

  const deleteMood = async (id: string) => {
    try {
      const { error } = await supabase
        .from('moods')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setMoods(prev => prev.filter(mood => mood.id !== id));
      toast({
        title: "Mood deleted",
        description: "Your mood entry has been deleted."
      });
    } catch (error) {
      toast({
        title: "Error deleting mood",
        description: "Failed to delete your mood. Please try again.",
        variant: "destructive"
      });
    }
  };

  return {
    moods,
    loading,
    addMood,
    updateMood,
    deleteMood,
    refetch: fetchMoods
  };
}