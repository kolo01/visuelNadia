import { db } from "@/FIREBASE/clientApp";
import { query,collection,where,getDocs} from "firebase/firestore";
import { useRouter } from "next/router";
import { useState,useEffect} from "react";
import secureLocalStorage from "react-secure-storage";

export default function FavInt(){
    const [mag,setMag] = useState("")
    const router  = useRouter()

    const recherche = async (terms) => {
       
        const q = query(
          collection(db, "Admin"),
          where("organisation", "==", String(terms).trim())
        );
    
        const querySnapshot = await getDocs(q);
       querySnapshot.forEach((doc) => {

            

            sessionStorage.setItem("savefrom", doc.data().number),
            sessionStorage.setItem("image", doc.data().imageUrl),
            sessionStorage.setItem("nom", doc.data().organisation),
            sessionStorage.setItem("adresse", doc.data().adresse),
            sessionStorage.setItem("categorie", doc.data().categorie);
          sessionStorage.setItem("description", doc.data().description);
          sessionStorage.setItem("nationalite", doc.data().nationalite);
          sessionStorage.setItem("horaire", JSON.stringify(doc.data().horaire));
          sessionStorage.setItem(
            "paiement",
            JSON.stringify(doc.data().methodeDePaiement)
          );
            secureLocalStorage.removeItem("Fav")


        });
       router.push("/otherContent/intermed1")
       
      };
      useEffect(()=>{
        if(secureLocalStorage.getItem("Fav")!= undefined && secureLocalStorage.getItem("Fav")!= null){
            recherche(secureLocalStorage.getItem("Fav"))
        }else{
            router.push("/")
        }
       
      },[mag,recherche,router])
    
    return <></>
}