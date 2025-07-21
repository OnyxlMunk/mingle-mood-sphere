import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export interface Community {
  id: string;
  name: string;
  description?: string;
  creator_id: string;
  is_private: boolean;
  member_count: number;
  created_at: string;
  updated_at: string;
  is_member?: boolean;
  membership_role?: string;
}

export function useCommunities() {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [userCommunities, setUserCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchCommunities();
    if (user) {
      fetchUserCommunities();
    }
  }, [user]);

  const fetchCommunities = async () => {
    try {
      const { data, error } = await supabase
        .from('communities')
        .select('*')
        .order('member_count', { ascending: false });

      if (error) throw error;

      // Check membership status for each community
      if (user) {
        const { data: memberships } = await supabase
          .from('community_memberships')
          .select('community_id, role')
          .eq('user_id', user.id);

        const membershipMap = new Map(
          memberships?.map(m => [m.community_id, m.role]) || []
        );

        const communitiesWithMembership = data?.map(community => ({
          ...community,
          is_member: membershipMap.has(community.id),
          membership_role: membershipMap.get(community.id)
        })) || [];

        setCommunities(communitiesWithMembership);
      } else {
        setCommunities(data || []);
      }
    } catch (error) {
      toast({
        title: "Error loading communities",
        description: "Failed to load communities.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchUserCommunities = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('community_memberships')
        .select(`
          role,
          communities (*)
        `)
        .eq('user_id', user.id);

      if (error) throw error;

      const userComms = data?.map(membership => ({
        ...membership.communities,
        membership_role: membership.role,
        is_member: true
      })) || [];

      setUserCommunities(userComms);
    } catch (error) {
      toast({
        title: "Error loading your communities",
        description: "Failed to load your communities.",
        variant: "destructive"
      });
    }
  };

  const createCommunity = async (name: string, description?: string, isPrivate: boolean = false) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('communities')
        .insert([{
          name,
          description,
          creator_id: user.id,
          is_private: isPrivate
        }])
        .select()
        .single();

      if (error) throw error;

      // Automatically join the creator as admin
      await joinCommunity(data.id, 'admin');

      toast({
        title: "Community created",
        description: `${name} community has been created.`
      });

      fetchCommunities();
      fetchUserCommunities();
    } catch (error) {
      toast({
        title: "Error creating community",
        description: "Failed to create community. Please try again.",
        variant: "destructive"
      });
    }
  };

  const joinCommunity = async (communityId: string, role: string = 'member') => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('community_memberships')
        .insert([{
          user_id: user.id,
          community_id: communityId,
          role
        }]);

      if (error) throw error;

      toast({
        title: "Joined community",
        description: "You have successfully joined the community."
      });

      fetchCommunities();
      fetchUserCommunities();
    } catch (error) {
      toast({
        title: "Error joining community",
        description: "Failed to join community. Please try again.",
        variant: "destructive"
      });
    }
  };

  const leaveCommunity = async (communityId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('community_memberships')
        .delete()
        .eq('user_id', user.id)
        .eq('community_id', communityId);

      if (error) throw error;

      toast({
        title: "Left community",
        description: "You have left the community."
      });

      fetchCommunities();
      fetchUserCommunities();
    } catch (error) {
      toast({
        title: "Error leaving community",
        description: "Failed to leave community. Please try again.",
        variant: "destructive"
      });
    }
  };

  return {
    communities,
    userCommunities,
    loading,
    createCommunity,
    joinCommunity,
    leaveCommunity,
    refetch: fetchCommunities
  };
}