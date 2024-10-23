// __mocks__/supabaseService.js

jest.mock('./supabase/supabaseService', () => ({
  fetchScores: jest.fn(() =>
    Promise.resolve([
      { name: 'Player1', score: 50, userId: 'test-user-id' },
      { name: 'Player2', score: 40, userId: 'another-user-id' },
      { name: 'Test User', score: 60, userId: 'mock-user-id' },
    ])
  ),
  saveUserData: jest.fn(() => Promise.resolve({ success: true })),
}));

// Simulating empty leaderboard for "No scores yet"
export const fetchEmptyScores = jest.fn(() => Promise.resolve([]));

// Simulate failure case for leaderboard fetch
export const fetchScoresWithError = jest.fn(() =>
  Promise.reject(new Error('Failed to fetch leaderboard'))
);

// Simulate failure case for saving user data
export const saveUserDataWithError = jest.fn(() =>
  Promise.reject(new Error('Failed to save user data'))
);
