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
   } , {});
 };

 export const auth = firebase.auth();
 export const firestore = firebase.firestore();

 const provider = new firebase.auth.GoogleAuthProvider();
 provider.setCustomParameters({ prompt: 'select_account'});
 export const signInWithGoogle = () => auth.signInWithPopup(provider);

 export default firebase; 