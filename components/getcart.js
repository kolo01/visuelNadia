import { db } from '@/FIREBASE/clientApp';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';


// Fonction pour récupérer tous les paniers d'un utilisateur
export async function getCartsByUserId(userId) {
  try {
    const cartRef = collection(db, 'orders'); // Assurez-vous que la collection est correcte.
    const q = query(cartRef, where('email', '==', userId));

    const querySnapshot = await getDocs(q);

    const userCarts = [];

    querySnapshot.forEach((doc) => {
      userCarts.push(doc.data());
    });
    // console.log("successful")
    return userCarts;
  } catch (error) {
    console.error("Erreur lors de la récupération du panier :", error);
    return [];
  }
}
