import { db2 } from "@/FIREBASE/clientApp";
import { Box, Image, SimpleGrid, Text,Link,Flex,Tooltip} from "@chakra-ui/react";
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
import { BsCashCoin } from "react-icons/bs";
import { StarIcon } from "@chakra-ui/icons";
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
export function Star ({id,data}){
  let total = 0
  let star = 0
  if(data){
    Object.values(data).map((dat,key)=>{
      if(id== dat.productID)
      {
        star = star + parseInt(dat.rate)
        total = total+1
       
      }
     }
     )
     
  }
  
    
  
    return(
      <>
      {total ? <Flex mb={10}>
       
        {Array(5)
              .fill('')
              .map((_, i) => (
                <StarIcon
                  key={i}
                  fontSize={"10px"}
                  color={i < star/total ? 'yellow' : 'gray.500'}
                />
              ))}
                <Text ml={1} mt={-1}>({total})</Text>
      </Flex> : <Flex mb={10}> 
      
      {Array(5)
              .fill('')
              .map((_, i) => (   
                <StarIcon
                  key={i}
                  fontSize={"10px"}
                  color={'gray.500'}
                 
                />
              ))}
              <Text ml={2} mt={-1} fontSize={"10px"}>{total} avis</Text>
              </Flex>}
      
    
      </>
    )
  }


export default function Favlist(card) {
  const [data,setData] = useState([])
  const [data2,setData2] = useState([])
  const [dataKey,setDataKey] = useState([])
  const [tout,setTout] = useState("")
  const [tou,setTou] = useState("")
  const [check,setCheck] = useState(0)
  
  const route = useRouter()
  const [all,setAll] = useState("none")

  const Fav2 = async () => {
    
    const starCountRef = ref(db2, "Feedback");
    onValue(starCountRef, (snapshot) => {
      setData2(snapshot.val());
    
    });

    
    // const db = getDatabase();
   
  };

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
 

  



  
  useEffect(()=>{
    if(check == 0 || check == 1){
      Fav(card)
      Fav2()
      setDataKey(Object.keys(data))
     
      setCheck(check+1)
    }
   
    // setTout(data.length())
  },[check,card,Fav,data])




  const date = new Date();
  const dateDep = date.toLocaleDateString();
  const date2 = new Date();
  const dateExp = date2.setDate(date2.getDate() + 1);
  const dateExp2 = new Date(dateExp);
  const dateExp3 = dateExp2.toLocaleDateString();
  
  return <>
    <Box ml={[5,5,5,10,10]} width={"95%"} mt={[0,0,0,10,10]} display={all}>
    <Carousel  responsive={responsive} style={"marginLeft='10px'"}
  >
    
          {Object.values(data).map((dat, index) => (
            <Link key={index} 
            href={`/otherContent/intermed1?categorie=${card.card}&magasin=${dat.organisation}`}
          
            _hover={{
              textDecoration:"none"
            }}
            >
             <Box
            
            key={index} my={[0,0,0,5,5]} height={"fit-content"} pb={10}   width={["150px","150px","150px","200px","200px"]} >
              <Image height={["100px","100px","150px","150px","150px"]}  width={["150px","150px","150px","200px","200px"]} src={dat.imageUrl}  alt={dat.nom} />
              <Box height={["10vh","10vh","10vh","10vh","10vh"]} >
              <Text width={["150px","150px","150px","200px","200px"]}  noOfLines={2}  fontSize={"15px"}>{dat.nom}</Text>
              <Text fontWeight={"bold"} width={"fit-content"} color={"orange.900"}   fontSize={"10px"}>{dat.organisation}</Text>
              <Flex >
                {}
                {/* {console.log("data",data)} */}
              
                {/* {console.log("feedback",data2)} */}
                <Star id={Object.keys(data)[index]} data={data2}/>
              </Flex>
              </Box>
              <Box>
              {dat.duree == "Expedié en 24h" ? <Text className={"Exp"}  mb={2}>Livré le {dateExp3} </Text> : <Text  className={"Exp"} mb={2}>{ dat.duree} </Text>}
              </Box>
              <Flex mb={1}>
                <BsCashCoin/>
                <Text ml={2} fontSize={"10px"} >Payez en espèce</Text>
              </Flex>
              
              

              <Flex  >
                <FaTruckPickup />
                <Tooltip label={`Livraison à partir de 2,99€`} >
                  <Flex>
                <Text ml={2} fontSize={"10px"} fontWeight={700}>Livraison partout en France </Text>
                <Text fontSize={"15px"} mt={-1} color={"red"}>*</Text>
                </Flex>
                </Tooltip>
              </Flex>
             
              <Flex justifyContent={"space-between"}  
              >
              <Text></Text>
           
              <Text color={"cyan.700"}  fontWeight={"bold"} fontSize={"20px"}>{dat.prix}€</Text>
              </Flex>
               
            </Box>  
            </Link> 
          ))}</Carousel>      
    </Box>
   
  </>;
}
