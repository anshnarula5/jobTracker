import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  value: AuthState;
  isLoading: boolean;
};

type AuthState = {
  name: string;
  id: number;
  email: string;
  authToken: any;
};

const storedUser = localStorage.getItem('USER');
const initialState: InitialState = {
  value: storedUser ? JSON.parse(storedUser) : { name: '', id: 0, email: '', authToken: null },
  isLoading: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: (state) => {
      localStorage.removeItem('USER');
      state.value = { name: '', id: 0, email: '', authToken: null };
    },
    logIn: (state, action: PayloadAction<AuthState>) => {
      state.isLoading = true;
    // Simulating async login request
      localStorage.setItem('USER', JSON.stringify(action.payload));
      state.value = action.payload;
      state.isLoading = false;
    },
  },
});

export const { logIn, logOut } = authSlice.actions;
export default authSlice.reducer;
