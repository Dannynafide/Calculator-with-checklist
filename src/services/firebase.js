import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);

export const emailAuth = async (email, password) => {
  // await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

  return firebase.auth().signInWithEmailAndPassword(email, password);
};

export const createUser = async (email, password) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
};

export const isInitialized = (setUser) => {
  return firebase.auth().onAuthStateChanged(setUser);
};

export const logout = () => firebase.auth().signOut();

export const { auth } = firebase;
