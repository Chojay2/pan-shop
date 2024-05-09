import { auth } from '@/firebase/clientApp';
import { User } from '@/model/user.model';
import UserService from '@/services/user.service';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  user: User | undefined;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: undefined
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
      state.user = undefined;
      state.isAuthenticated = false;
    }
  }
});

export const { setUser, logOutUser } = AuthSlice.actions;

export const initAuth = () => async (dispatch) => {
  auth.onAuthStateChanged(async (user) => {
    if (user?.uid) {
      try {
        const userDetails = await UserService.fetchUser(user.uid);
        dispatch(setUser(userDetails));
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    } else {
      dispatch(setUser(undefined));
    }
  });
};


export default AuthSlice.reducer;
