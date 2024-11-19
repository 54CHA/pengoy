import { supabase } from './supabase';

export type Profile = {
  id: string;
  name: string;
  image_url: string;
  votes: number;
  win_rate: number;
  rank: number;
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
    .order('votes', { ascending: false })
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
  // Update winner
  const { error: winnerError } = await supabase.rpc('increment_votes', {
    profile_id: winnerId
  });

  // Update loser's total_comparisons
  const { error: loserError } = await supabase.rpc('increment_comparisons', {
    profile_id: loserId
  });

  if (winnerError || loserError) {
    console.error('Error updating votes:', winnerError || loserError);
    return false;
  }

  return true;
}

function calculateWinRate(votes: number, totalComparisons: number): number {
  if (totalComparisons === 0) return 0;
  return Math.round((votes / totalComparisons) * 100);
}