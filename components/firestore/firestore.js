// firestore.js
import {  collection, addDoc } from 'firebase/firestore';

import { db } from '@/FIREBASE/clientApp';



export async function storeDataInFirestore(data,email) {
  try {
    const docRef = await addDoc(collection(db, 'orders'), {data,email });
    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}