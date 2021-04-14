import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCmUm5tw1sIatBea7SoUUaLmHfnaNqO_us',
  authDomain: 'calculator-with-checklist.firebaseapp.com',
  projectId: 'calculator-with-checklist',
  storageBucket: 'calculator-with-checklist.appspot.com',
  messagingSenderId: '113912159105',
  appId: '1:113912159105:web:27e90fdf335c6bc4abe680',
  measurementId: 'G-WPC9VDJ2KV',
};

class Firebase {
  constructor() {
    firebase.initializeApp(firebaseConfig);
    this.auth = firebase.auth();
    this.db = firebase.firestore();
    this.db2 = firebase.database();
  }

  login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  async register(name, email, password) {
    await this.auth.createUserWithEmailAndPassword(email, password);
    return this.auth.currentUser.updateProfile({
      displayName: name,
    });
  }

  addQuote(quote) {
    if (!this.auth.currentUser) {
      return alert('Not authorized');
    }

    return this.db.doc(`users/${this.auth.currentUser.uid}`).set({
      quote,
    });
  }

  isInitialized() {
    return new Promise((resolve) => this.auth.onAuthStateChanged(resolve));
  }

  getCurrentUsername() {
    return this.auth.currentUser && this.auth.currentUser.displayName;
  }

  async getCurrentUserQuote() {
    const quote = await this.db
      .doc(`users/${this.auth.currentUser.uid} `)
      .get();
    return quote.get('quote');
  }

  addItem(title, user) {
    const itemsRef = this.db2.ref('items');
    return itemsRef.push({
      title,
      user,
    });
  }

  removeItem(itemId) {
    const itemRef = this.db2.ref(`/items/${itemId}`);
    return itemRef.remove();
  }

  getItem() {
    const itemsRef = this.db2.ref('items');
    itemsRef.on('value', (snapshot) => {
      const items = snapshot.val();
      const newState = [];
      for (const item in items) {
        newState.push({
          id: item,
          title: items[item].title,
          user: items[item].user,
        });
      }
      return newState;
    });
  }
}

export default new Firebase();
