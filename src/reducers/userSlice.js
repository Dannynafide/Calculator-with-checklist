import { createSlice } from '@reduxjs/toolkit';
// import firebase, { auth, provider } from '../firebase.js';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
  },
  reducers: {
    login: (state, action) => {
      // auth
      //   .signInWithEmailAndPassword(
      //     action.payload.email,
      //     action.payload.password
      //   )
      //   .then((cred) => {
      //     // add state user
      //     return { user: cred.user };
      //   });
    },
    logout: (state) => {
      // auth.signOut().then(() => {
      //   return { user: null };
      // });
    },
  },
});

export const { login, logout } = userSlice.actions;
export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
