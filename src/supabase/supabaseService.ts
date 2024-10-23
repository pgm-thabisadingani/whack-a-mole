import { supabase } from './supabaseClient';

// Save or update user data with userId, name, and score
export const saveUserData = async (
  userId: string,
  name: string,
  score: number
) => {
  try {
    // Check if the user already exists in the database
    const { data: existingUser, error: fetchError } = await supabase
      .from('user_scores')
      .select('score')
      .eq('userId', userId)
      .maybeSingle(); // Use maybeSingle to handle cases where no row is returned

    // If an error occurs during fetch (not due to no rows)
    if (fetchError) {
      console.log('Error fetching user', fetchError);
      return;
    }

    // Handle case when there is no existing user (new user)
    if (!existingUser) {
      // Insert new user and score
      const { data, error: insertError } = await supabase
        .from('user_scores')
        .insert([{ userId: userId, name, score }]);

      if (insertError) {
        console.log('Error inserting new user score', insertError);
      } else {
        console.log('New user score added:', data);
      }
      return;
    }

    // If user exists and the new score is higher, update the score
    if (existingUser.score < score) {
      const { data, error: updateError } = await supabase
        .from('user_scores')
        .update({ score })
        .eq('userId', userId);

      if (updateError) {
        console.log('Error updating user score', updateError);
      } else {
        console.log('User score updated:', data);
      }
    } else {
      console.log('New score is not higher, not updating.');
    }
  } catch (error) {
    console.error('Error in saveUserData:', error);
  }
};

// Fetch all user scores for the leaderboard
export const fetchScores = async () => {
  const { data, error } = await supabase
    .from('user_scores')
    .select('name, score, userId')
    .order('score', { ascending: false });

  if (error) {
    console.error('Error fetching scores:', error);
    return [];
  }

  if (!data) {
    console.error('No data returned');
    return [];
  }

  console.log('Leaderboard data:', data);
  return data;
};
