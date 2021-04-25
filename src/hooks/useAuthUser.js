import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectCurrentUser } from '../features/auth/authSlice';

import { isInitialized } from '../services/firebase';

export default () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    const setUser = (user) => {
      if (user) {
        dispatch(
          login({
            id: user.uid,
            email: user.email,
            refreshToken: user.refreshToken,
          })
        );
      } else {
        dispatch(logout());
      }
    };

    const unsubscribe = isInitialized(setUser);
    return () => unsubscribe();
  }, [dispatch]);

  return currentUser;
};
