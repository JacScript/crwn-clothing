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

firebase.initializeApp(config);

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


 export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
  
    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
      const newDocRef = collectionRef.doc();
      batch.set(newDocRef, obj);
    });

    return await batch.commit();
 };

 export const convertCollectionsSnapshotToMap = (collections) => {
   const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    };
   });

   return transformedCollection.reduce((accumulator, collection) => {
     accumulator[collection.title.toLowerCase()] = collection;
     return accumulator;
   }, {});
 };

 export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject)
  })
 }

 export const auth = firebase.auth();
 export const firestore = firebase.firestore();

 export const googleProvider = new firebase.auth.GoogleAuthProvider();
 googleProvider.setCustomParameters({ prompt: 'select_account'});
 export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

 export default firebase; 