import { auth } from '@/firebase/clientApp';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  uid: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  uid: null
};

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.uid = action.payload;
      state.isAuthenticated = !!action.payload;
    }, 
    logOutUser(state) {
      state.uid = null;
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
