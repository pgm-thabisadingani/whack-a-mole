import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the shape of the user state
interface UserState {
  id: string;
  name: string;
}

const initialState: UserState = {
  id: '',
  name: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (
      state: UserState,
      action: PayloadAction<{ id: string; name: string }>
    ) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
    },
  },
});

export const { setUserData } = userSlice.actions;

export default userSlice.reducer;
