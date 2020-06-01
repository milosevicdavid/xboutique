import firebase from 'firebase/app';
import 'firebase/firestore';
import'firebase/auth';

const config  = {
    apiKey: "AIzaSyCvyVFKc45wmF5Fn6cyzgBDcYn7891J3OQ",
    authDomain: "xboutique-db.firebaseapp.com",
    databaseURL: "https://xboutique-db.firebaseio.com",
    projectId: "xboutique-db",
    storageBucket: "xboutique-db.appspot.com",
    messagingSenderId: "142222529604",
    appId: "1:142222529604:web:3c1510219dc80846205811",
    measurementId: "G-HHV4G7WZ50"
  };

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);


export const auth = firebase.auth();
export const firestore = firebase.firestore();


const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;




