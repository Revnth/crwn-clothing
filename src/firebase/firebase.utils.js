import firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyAwluqBDUiE_HFw_jWcXjGicP-S_dc1X-I",
  authDomain: "crwn-db-428ec.firebaseapp.com",
  projectId: "crwn-db-428ec",
  storageBucket: "crwn-db-428ec.appspot.com",
  messagingSenderId: "589962784326",
  appId: "1:589962784326:web:ea471df2ff5e899e146447",
  measurementId: "G-3DJH48CS2K",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({ displayName, email, createdAt, ...additionalData });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
