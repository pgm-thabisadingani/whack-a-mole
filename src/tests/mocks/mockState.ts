import { RootState } from '../../redux/reducers';

export const mockInitialState: Partial<RootState> = {
  game: {
    score: 0,
    start: false,
    end: false,
    timer: 120,
    totalMoles: 12,
  },
  user: {
    id: 'mock-user-id',
    name: 'Test User',
  },
};
