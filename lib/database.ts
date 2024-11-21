import { supabase } from './supabase';

export type Profile = {
  id: number;
  name: string;
  image_url: string;
  votes: number;
  win_rate: number;
  rank: number;
  elo_rating: number;
  total_comparisons: number;
};

export async function getRandomProfiles(count: number = 2): Promise<Profile[]> {
  // First, get total count of profiles
  const { count: totalProfiles } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true });

  if (!totalProfiles) return [];

  // Generate random offset
  const randomOffset = Math.floor(Math.random() * (totalProfiles - count));

  // Fetch random profiles using offset
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .range(randomOffset, randomOffset + count - 1);

  if (error) {
    console.error('Error fetching random profiles:', error);
    return [];
  }

  return data || [];
}

export async function getLeaderboard(limit: number = 15): Promise<Profile[]> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .order('elo_rating', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching leaderboard:', error);
    return [];
  }

  // Calculate win rate for each profile
  return (data || []).map((profile, index) => ({
    ...profile,
    rank: index + 1,
    win_rate: calculateWinRate(profile.votes, profile.total_comparisons || 0)
  }));
}

export async function updateVotes(winnerId: number, loserId: number) {
  const { error } = await supabase.rpc('update_elo_ratings', {
    winner_id: winnerId,
    loser_id: loserId
  });

  if (error) {
    console.error('Error updating ratings:', error);
    return false;
  }

  return true;
}

function calculateWinRate(votes: number, totalComparisons: number): number {
  if (totalComparisons === 0) return 0;
  return Math.round((votes / totalComparisons) * 100);
}

export async function getTotalVotes(): Promise<number> {
  const { data, error } = await supabase
    .from('profiles')
    .select('total_comparisons')
    .single();

  if (error || !data) {
    console.error('Error fetching total votes:', error);
    return 0;
  }

  return Math.floor(data.total_comparisons / 2); // Divide by 2 since each comparison counts as 2 total_comparisons
}