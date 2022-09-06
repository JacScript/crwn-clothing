import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
// import { userRef } from 'react';

const config =  {
        apiKey: "AIzaSyC6RdmAnPCX5lgn-FI1bAVnti0qVlaEmxY",
        authDomain: "crown-db-18d09.firebaseapp.com",
        projectId: "crown-db-18d09",
        storageBucket: "crown-db-18d09.appspot.com",
        messagingSenderId: "440569374571",
        appId: "1:440569374571:web:1da346cd2beb1079cb4e2e",
        measurementId: "G-WPMPCG27Q7"
      };

export const createUserProfileDocuments = async (userAuth, additionalData) => {
    if(!userAuth) return ;
       
    const userRef = firestore.doc(`users/${userAuth.uid}`);
     
    const snapShot = await userRef.get();

    if(!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch(error) {
        console.log('error created user', error.message);
      }
    }
    
    return userRef;
};

 firebase.initializeApp(config);

 export const auth = firebase.auth();
 export const firestore = firebase.firestore();

 const provider = new firebase.auth.GoogleAuthProvider();
 provider.setCustomParameters({ prompt: 'select_account'});
 export const signInWithGoogle = () => auth.signInWithPopup(provider);

 export default firebase; 