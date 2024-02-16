import { Text,SimpleGrid,Box,Image,Link, Center } from "@chakra-ui/react"
import { useEffect } from "react"
import { useState } from "react"
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/FIREBASE/clientApp";
import Restaurant from "./Restaurant";
import Epicerie from "./Epicerie";
import Cosmetique from "./Cosmetique";
import Coiffure from "./Coiffure";
import Meches from "./Meches";
import Textile from "./Textile";
import Fret from "./Fret";
import InputBar from "../InputBar";
import Navbar from "../Navbar";
import secureLocalStorage from "react-secure-storage";

export default function All (){
    const [postal,setPostal] = useState()
    const [modalData, setModalData] = useState([]);


    const recherche = async (terms,terms2) => {
        // console.log(terms,typeof(terms2))
          if(terms.length>=4){
          const q = query(
            collection(db, "Admin"),
            where("codePostal", "==", String(terms).trim())
          );
      
          const querySnapshot = await getDocs(q);
         
          setModalData(querySnapshot.docs);
        }
        if(terms2.length>3){
          const q = query(
            collection(db, "Admin"),
            where("ville", "==", String(terms2).trim().replace('"'," ").replace('"'," "))
          );
      
          const querySnapshot = await getDocs(q);
         
          setModalData(querySnapshot.docs);
        }
       
        
      };
    useEffect(()=>{
        setPostal(secureLocalStorage.getItem("postal"))
        // console.log(secureLocalStorage.getItem("location") )
        if (secureLocalStorage.getItem("location") != undefined && secureLocalStorage.getItem("location") != null){
          recherche(secureLocalStorage.getItem("postal"),secureLocalStorage.getItem("postal"))
        }else{
          recherche(secureLocalStorage.getItem("postal")," ")
        }
        
    },[postal])
    return(
        <>
       
        
        <Center mt={10}>
        <Box width={"100%"}>
        <Restaurant data={modalData} />
        <Epicerie data={modalData} />
        <Textile data={modalData} />
        <Cosmetique data={modalData} />
        <Coiffure data={modalData} />
        <Meches data={modalData} />
        <Fret data={modalData} />
        </Box>
        </Center>
      
        </>
    )
}