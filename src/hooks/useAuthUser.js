import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectCurrentUser } from '../features/auth/authSlice';

import { isInitialized } from '../services/firebase';

export default () => {
  const dispatch = useDispatch();

  let currentUser = useSelector(selectCurrentUser);
  if (!currentUser) {
    currentUser = JSON.parse(localStorage.getItem('authUser'));
  }

  useEffect(() => {
    const setUser = (user) => {
      if (user) {
        const newUser = {
          id: user.uid,
          email: user.email,
          refreshToken: user.refreshToken,
        };
        dispatch(login(newUser));
        localStorage.setItem('authUser', JSON.stringify(newUser));
      } else {
        dispatch(logout());
        localStorage.removeItem('authUser');
      }
    };

    const unsubscribe = isInitialized(setUser);
    return () => unsubscribe();
  }, [dispatch]);

  return currentUser;
};
