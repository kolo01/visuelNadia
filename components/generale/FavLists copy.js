import { db2 } from "@/FIREBASE/clientApp";
import { Box, Image, SimpleGrid, Text,Link,Flex } from "@chakra-ui/react";
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
const responsive = {
  superLargeDesktop: {
    breakpoint: { max:4000, min: 3000 },
    items: 14
  }, 
  MDesktop: {
    breakpoint: { max: 3000, min: 2500 },
    items: 13
  }, 
  LargeDesktop: {
    breakpoint: { max: 2500, min: 2000 },
    items: 12
  }, 
  desktopM: {
    breakpoint: { max: 2000, min: 1750 },
    items: 11
  },
  desktopL: {
    breakpoint: { max: 1750, min: 1500 },
    items: 9
  },
  desktop: {
    breakpoint: { max: 1500, min: 1024 },
    items: 8
  },
  tabletl: {
    breakpoint: { max: 1024, min: 750 },
    items: 6
  },
  tablet: {
    breakpoint: { max: 750, min: 500 },
    items: 4
  },
  mobile: {
    breakpoint: { max: 500, min: 0 },
    items: 3
  }
};


export default function FavlistC(card) {
  const [data,setData] = useState([])
  const [tout,setTout] = useState("")
  const [tou,setTou] = useState("")
  const [check,setCheck] = useState(0)
  
  const route = useRouter()
  const [all,setAll] = useState("none")


  const Fav = async (card) => {

    const q = query(collection(db, "ServicesFav"));
  
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
  // console.log(doc.data())
  // console.log(card)
  Object.keys(doc.data()).map((dat,index)=>{
    // console.log(dat)
   
    if(dat == card.card){
      setAll("grid")
      // console.log(doc.data())
      doc.data()[dat].map((datee,index)=>{
        if(datee.length >=3){
          console.log(datee,dat)
          const starCountRef = ref(db2, `${dat}/${datee}`);
          onValue(starCountRef, (snapshot) => {
            setData(snapshot.val());
            // console.log(snapshot.val())
          });
        }
       
        })
      
     
      
    }
  })
    });


    
    // const db = getDatabase();
   
  };
 

  



  const Up =()=>{
    
  }
  useEffect(()=>{
    if(check == 0 || check == 1){
      Fav(card)
     
      setCheck(check+1)
    }
   
    // setTout(data.length())
  },[check,card,Fav])
  const [slider, setSlider] = useState(null);
  return <>
    <Box ml={[5,5,5,10,10]} width={"95%"} mt={[10,10,10,10,10]} display={all}>
    <Carousel  responsive={responsive} style={"marginLeft='10px'"}
  >
          {Object.values(data).map((data, index) => (
            <Link key={index} onClick={()=>{secureLocalStorage.setItem("Fav",data.organisation)}}
            href={"/FavInt"}
            _hover={{
              textDecoration:"none"
            }}
            >
            <Box
            
            key={index} my={5}bgColor={"#eee2"} height={"fit-content"} boxShadow={"grey 1px 1px  5px"} width={["120px","120px","120px","120px","120px"]} >
              <Image height={["80px","80px","80px","80px","80px"]}  width={["150px","150px","150px","150px","150px"]} src={data.imageUrl}  alt={data.nom} />

              <Text fontWeight={"bold"} width={"fit-content"} noOfLines={1} pl={2} fontSize={["10px","10px","10px","10px","10px"]}>{data.nom}</Text>
              <Flex justifyContent={"space-between"}>
                <Text></Text>
              {/* <Text fontWeight={"bold"} width={"fit-content"} color={"orange.900"}  pl={2} fontSize={["10px","10px","10px","10px","10px"]}>{data.organisation}</Text> */}
              <Text color={"cyan.700"}  fontWeight={"bold"} fontSize={["15px","15px","15px","15px","15px"]}>{data.prix}€</Text>
              </Flex>
             
            </Box>
            </Link> 
          ))}</Carousel>
    </Box>
   
  </>;
}
