import { db2 } from "@/FIREBASE/clientApp";
import { Box, Image, SimpleGrid, Text,Link,Flex,Tooltip } from "@chakra-ui/react";
import { ref, onValue  } from "@firebase/database";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useState,} from "react";
import { useEffect } from "react";
import ReactDOM from 'react-dom';
import Slider from "react-slick";
import { useRouter } from "next/router";
import secureLocalStorage from "react-secure-storage";
import { db } from "@/FIREBASE/clientApp";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useCallback } from "react";
import { FaTruckPickup } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";
const responsive = {
  superLargeDesktop: {
    breakpoint: { max:4000, min: 3000 },
    items: 12
  }, 
  MDesktop: {
    breakpoint: { max: 3000, min: 2500 },
    items: 11
  }, 
  LargeDesktop: {
    breakpoint: { max: 2500, min: 2050 },
    items: 10
  }, 
  desktopM: {
    breakpoint: { max: 2050, min: 1750 },
    items: 8
  },
  desktopL: {
    breakpoint: { max: 1750, min: 1550 },
    items: 7
  },
  desktop: {
    breakpoint: { max: 1550, min: 1050 },
    items: 5
  },
  tabletl: {
    breakpoint: { max: 1050, min: 850 },
    items: 4
  },
  tablet: {
    breakpoint: { max: 850, min: 650 },
    items: 3
  }, 
  mobile: {
    breakpoint: { max: 650, min: 0 },
    items: 2
  } 
}; 

export default function Favlist2({categorie,magasin}) {
  const [data,setData] = useState([])
  const [tout,setTout] = useState("")
  const [tou,setTou] = useState("")
  const [check,setCheck] = useState(0)
  
  const route = useRouter()
  const [all,setAll] = useState("none")


  const Fav = async () => {
    try{
    //   const starCountRef = ref(db2, `${categorie}/${magasin}`);
    // onValue(starCountRef, (snapshot) => {
    //   setData(snapshot.val());
    //   // console.log(snapshot.val())
    // });
    const q = query(collection(db, "ServicesFav"));
  
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
  // console.log(doc.data())
  // console.log(card)
  Object.keys(doc.data()).map((dat,index)=>{
    // console.log(dat)
   
    if(dat != categorie){
      setAll("grid")
      // console.log(doc.data())
      doc.data()[dat].map((datee,index)=>{
        if(datee.length >=3 && datee != magasin){
          console.log(datee,dat)
          const starCountRef = ref(db2, `${dat}/${datee}`);
          onValue(starCountRef, (snapshot) => {
            setTout(dat)
            setData(snapshot.val());
            // console.log(snapshot.val())
          });
        }
       
        })
      
     
      
    }
  })
    });


    }catch{(error)=>{
      console.log("Waiting time 2!!!")
    }}
    

    
    // const db = getDatabase();
   
  };
 

  



  const Up =()=>{
    
  }
  useEffect(()=>{
    if(check == 0 || check == 1){
      Fav()
     
      setCheck(check+1)
    } 
   
    // setTout(data.length())
  },[check,Fav])
  const [slider, setSlider] = useState(null);

  const date2 = new Date();
  const dateExp = date2.setDate(date2.getDate() + 1);
  const dateExp2 = new Date(dateExp);
  const dateExp3 = dateExp2.toLocaleDateString();
  return <> 
  {data ?
   <Box ml={[5,5,5,10,10]} width={"95%"} my={[10,10,10,10,10]} >
   <Carousel  responsive={responsive} style={"marginLeft='10px'"}
 >
         {Object.values(data).map((data, index) => (
           <Link key={index} href={`/otherContent/intermed1?categorie=${tout}&magasin=${data.organisation}`}
           _hover={{
             textDecoration:"none"
           }}
           >
               <Box
           
           key={index} my={[0,0,0,5,5]} height={["40vh","40vh","40vh","45vh","45vh"]} width={["200px","200px","200px","200px","200px"]} >
             <Image height={["150px","150px","150px","150px","150px"]}  width={["200px","200px","200px","200px","200px"]} src={data.imageUrl}  alt={data.nom} />
             <Box height={["10vh","10vh","10vh","8vh","8vh"]} mb={2}>
             <Text  width={"200px"} noOfLines={3}  fontSize={"15px"}>{data.nom}</Text>
             <Text fontWeight={"bold"} width={"fit-content"} color={"orange.900"}   fontSize={"10px"}>{data.organisation}</Text>
             </Box>
             <Flex>
               <AiOutlineStar fontSize={"12px"}/>
               <AiOutlineStar fontSize={"12px"}/>
               <AiOutlineStar fontSize={"12px"}/>
               <AiOutlineStar fontSize={"12px"}/>
               <AiOutlineStar fontSize={"12px"}/> 
             </Flex>
             <Flex  >
               <FaTruckPickup />
               <Tooltip label={`Prix superieur à 30€ Ou être en île-de-france`} >
                  <Flex>
                <Text ml={2} fontSize={"10px"} fontWeight={700}>Livraison gratuite </Text>
                <Text fontSize={"15px"} mt={-1} color={"red"}>*</Text>
                </Flex>
                </Tooltip>
             </Flex>
             
             <Flex justifyContent={"space-between"}  
             >
               {data.duree == "Expedié en 24h" ? <Text className={"Exp"}>Livré le {dateExp3} </Text> : <Text fontSize={"12px"} mt={2}>{ data.duree} </Text>}
          
             <Text color={"cyan.700"}  fontWeight={"bold"} fontSize={"20px"}>{data.prix}€</Text>
             </Flex>
              
           </Box>  
           </Link> 
         ))}</Carousel>
   </Box>
  : 
  <></>
  }
   
   
  </>;
}
