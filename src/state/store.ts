import { configureStore } from '@reduxjs/toolkit';
import AuthReducer, { initAuth } from './auth/auth.slice';
import { useDispatch } from 'react-redux';

const store = configureStore({
  reducer: {
    auth: AuthReducer
  }
});

store.dispatch(initAuth());

// Infer the `RootState` from the store itself
export type RootState = ReturnType<typeof store.getState>;



export default store;


