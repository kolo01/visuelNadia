import { db } from "@/FIREBASE/clientApp";
import InputBar from "@/components/InputBar";
import Modaliser from "@/components/ModalReservation";
import Navbar from "@/components/Navbar";
import { Box, Center, Heading, SimpleGrid, Text, useMediaQuery } from "@chakra-ui/react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function RestRes(){
    const favlist = ["Le Griffé", "Abidjan-Paris", "Le Massou Lounge"];
    const [all, setAll] = useState([]);
    const [etat, setEtat] = useState([]);
    const jour = new Date();
    const router = useRouter()
    const heure = jour.getHours();
    const [disChoi,setDisChoi] = useState("none")
    const [disVoir,setDisVoir] = useState("grid")
    const fetched = async (data,index) => {
        const cartRef = collection(db, "Admin"); // Assurez-vous que la collection est correcte.
        const q = query(cartRef, where("organisation", "==", data));
  
        const querySnapshot = await getDocs(q);
  
        const data1 = querySnapshot.docs[0].data();
  
        etat[index]=data1;
        //console.log(querySnapshot.docs[0].data());
        setAll(etat)
    };
useEffect(()=>{
    if (all.length<2) {
        favlist.map(async (data, index) => {
            fetched(data,index)
          
        });
    }
   

})
    const [isLagerThan768] = useMediaQuery("(min-width: 768px)");
    
        return(
            <>
             <InputBar />
          {isLagerThan768 ? <Navbar></Navbar> : <></>}
             <Box mt={5}>
          
            <Box>
        
              {/* <Heading>Reservation </Heading> */}
              <Box>
                <Center >
                  <Text
                    fontSize={["15px", "15px", "15px", "25px", "25px"]}
                    fontWeight={700}
                  >
                    Choissisez votre restaurant
                  </Text>
                </Center>
                {/* <Center display={disVoir} onClick={fetched} >
                  <Text py={2} px={4}
                  border={"1px solid black"}
                    fontSize={["15px", "15px", "15px", "25px", "25px"]}
                    fontWeight={700}
                  >
                    Voir tout les magasins
                  </Text>
                </Center> */}
                <SimpleGrid columns={[2, 2, 2, 3, 3]}>
                  {all.map((data, index) => (
                    <Modaliser key={index} data={data} jour={jour} />
                  ))}
                </SimpleGrid>
              </Box>
            </Box>
          </Box>
            </>
        )
   
}