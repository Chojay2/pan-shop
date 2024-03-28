// src/state/authSlice.ts
import { auth } from '@/firebase/clientApp';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  user: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null
};

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    }, 
    logOutUser(state) {
      state.user = null;
      state.isAuthenticated = false;
    }
  }
});

export const { setUser, logOutUser } = AuthSlice.actions;

export const initAuth = ()=> dispatch => {
  auth.onAuthStateChanged(user => {
    dispatch(setUser(user?.uid));
  });
};

export default AuthSlice.reducer;
