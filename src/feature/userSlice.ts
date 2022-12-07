import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface for currentUser
export interface UserState {
  id: number | string;
  name: string;
  profile?: string;
}

//
const initialState: UserState = {
  id: 19,
  name: 'Me',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
});

export const {} = userSlice.actions;

export default userSlice.reducer;
