import { db } from "@/FIREBASE/clientApp";
import { collection, getDocs, query, where } from "firebase/firestore";

export default  function Reservation(req,res){
    const favlist =["Le Griffé","Abidjan-Paris","Le Massou Lounge"]
    const all = [];
    const all2 = {}
    favlist.map( async (data,index)=>{
        const cartRef = collection(db, 'Admin'); // Assurez-vous que la collection est correcte.
      const q = query(cartRef, where('organisation', '==', data));
  
      const querySnapshot = await getDocs(q);
     
      const data1 = querySnapshot.docs[0].data()
      all.push([all,data1]);
      
      all2[index] = data1;
      console.log(all2)
      //console.log(querySnapshot.docs[0].data());
    })
    res.status(200).json({all2})
}