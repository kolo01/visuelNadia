import React, { useState,useEffect } from "react";
import {
  Box,
  IconButton,
  useBreakpointValue,
  useMediaQuery,
  Flex,
  Text,
  Input,
  InputGroup,
  Image,
  Center,
  InputRightElement,
  Button,
  InputLeftAddon,
  InputLeftElement
} from "@chakra-ui/react";
import {RiSendPlaneLine} from "react-icons/ri"
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
// And react-slick as our Carousel Lib
import Slider from "react-slick";
import axios from "axios";
import {useRouter} from "next/router";
import secureLocalStorage from "react-secure-storage";

const settings = {
  dots: false,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  
  speed: 500,
  autoplaySpeed: 1500,
  slidesToShow: 1,
  slidesToScroll: 1,
};
const settings2 = {
  dots: true,
  arrows: true,
  fade: true,
  infinite: true,
  autoplay: true,
  
  speed: 500,
  autoplaySpeed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};
const SliderComponents = () => {
  //position variable//
//taille de l'input
  const [lat,setLat]= useState("18em")
  const [long,setLong]= useState()
  //end
  const [locate, setLocate] = useState("");
  const [check,setCheck] = useState(0);
  const [data,setData] = useState([]);
  const [final,setFinal] = useState([""]);
  const router = useRouter();
  


 const [code,setCode] = useState([]);
  const [slider, setSlider] = useState(null);
  const top = useBreakpointValue({ base: "90%", md: "50%" });
  const side = useBreakpointValue({ base: "30%", md: "10px" });
  const cards = [
    "https://firebasestorage.googleapis.com/v0/b/appchapfinal.appspot.com/o/slider%2FabjPars.png?alt=media&token=c037631d-b5d7-47e8-b844-beb8b7fdca71",
    "https://firebasestorage.googleapis.com/v0/b/appchapfinal.appspot.com/o/slide%2FBakery.png?alt=media&token=574eecdf-7fc8-449f-a8d0-e5f9e14f9325",
    "https://firebasestorage.googleapis.com/v0/b/appchapfinal.appspot.com/o/slide%2FMicrosoftTeams-image1.png?alt=media&token=58788349-42b9-4b70-ae4e-6de227c5cb04",
    "https://firebasestorage.googleapis.com/v0/b/appchapfinal.appspot.com/o/slider%2F3.png?alt=media&token=e5393663-2adf-4ea1-96be-a097839ec561",
    "https://firebasestorage.googleapis.com/v0/b/appchapfinal.appspot.com/o/slider%2F4.png?alt=media&token=7eaa7ac6-28cb-4d7b-877f-e2014116b87a",
    "https://firebasestorage.googleapis.com/v0/b/appchapfinal.appspot.com/o/slider%2F5.png?alt=media&token=513878-493e-4457-b4e4-f4217d7fba8c",
    "https://firebasestorage.googleapis.com/v0/b/appchapfinal.appspot.com/o/slider%2F7.png?alt=media&token=9938ab34-a4eb-4fa5-9527-d1e741f048c3",
    "https://firebasestorage.googleapis.com/v0/b/appchapfinal.appspot.com/o/slider%2F1.png?alt=media&token=b6f83978-875d-429f-88ab-1dd2d962b49e",
    "https://firebasestorage.googleapis.com/v0/b/appchapfinal.appspot.com/o/slider%2F2.png?alt=media&token=caa391bd-bffb-491f-9679-a655d3fee05f",
    "https://firebasestorage.googleapis.com/v0/b/appchapfinal.appspot.com/o/slider%2F6.png?alt=media&token=11b0ef49-fc5e-44bd-b104-bb750053d133"
  ];
  const [isLagerThan768] = useMediaQuery("(min-width: 768px)");




  const Search = (id) => {
    if (data.filter((order) => order.num_dep === id).length != 0) {
      const Final = data.filter((order) => order.num_dep === id);
      secureLocalStorage.setItem("location", Object.values(Final[0])[1]);
    }
  };

useEffect(() => {

  if(check == 0 || check == 1){
    const  GetAll= async ()=>{
      setData([])
      await axios.get("api/GetJson").then((response)=>{

          setData(JSON.parse(Object.values(response.data)))
      })
  };
  GetAll()
    setCheck(check+1);
  }
 

  setFinal((secureLocalStorage.getItem("location"))?? "")
  setLocate(secureLocalStorage.getItem("postal") ?? " ");

  //updateAll()
}, [   locate,check]);



 async function  coordonnees (pos)  {
  let crd = pos.coords;

  let latitude = crd.latitude;
  let longitude = crd.longitude;
  await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyAoJQLE8uAbWnyPHCv-_udEUhH7HQooJlM`).then((response)=>{
    
  if(response.data.results[0].address_components.length >4){
    
    secureLocalStorage.setItem("location",response.data.results[0].address_components[2].long_name);
    secureLocalStorage.setItem("postal",response.data.results[0].address_components[6].long_name);
    router.reload();
  }else{
    
    secureLocalStorage.setItem("location",response.data.results[0].address_components[2].long_name);
    secureLocalStorage.setItem("postal",response.data.results[0].address_components[1].long_name);
    router.reload();
  }
 
  }).catch((error)=>console.error(error))

  
}

const handleLocate = () => {
  navigator.geolocation.watchPosition(coordonnees)
}




  return (
    <>
      <Box
        overflow="-moz-hidden-unscrollable"
        position={"relative"}
        height={{ base: "auto", md: "auto", lg: "auto" }}
        width={{ base: "full", md: "full", lg: "auto" }}
      >
        {/* CSS files for react-slick */}
        <link
          rel="stylesheet"
          type="text/css"
          charSet="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />

        {isLagerThan768 ? (
          <>
            <IconButton
              aria-label="left-arrow"
              // colorScheme="messenger"
              display={"none"}
              borderRadius="full"
              position="absolute"
              left={side}
              top={top}
              transform={"translate(0%, -50%)"}
              zIndex={2}
              onClick={() => slider?.slickPrev()}
              bg={"#fff"}
            >
              <BiLeftArrowAlt color="#000" />
            </IconButton>

            <IconButton
            display={"none"}
              aria-label="right-arrow"
              // colorScheme="messenger"
              borderRadius="full"
              position="absolute"
              right={side}
              top={top}
              transform={"translate(0%, -50%)"}
              zIndex={2}
              onClick={() => slider?.slickNext()}
              bg={"#fff"}
            >
              <BiRightArrowAlt color="#000" />
            </IconButton>
          </>
        ) : (
          <></>
        )}

        {/* Slider */}
        <Flex width={"100%"} mb={[0,0,0,5,5]}>
          <Box width={["100%","100%","100%","70%","70%"]}  height={{ base: "xs", md: "xs", lg: "xl" }} mr={3}>
          <Slider {...settings} ref={(slider) => setSlider(slider)}>
          {cards.map((url, index) => (
            <Box
              key={index}
              overflow={"auto"}
              height={{ base: "xs", md: "xs", lg: "xl" }}
              minw={{ base: "full", md: "full", lg: "xl" }}
              position="relative"
              backgroundPosition="center"
              backgroundRepeat="no-repeat"
              backgroundSize="contain"
              backgroundImage={url}
            ></Box>
          ))}</Slider> 
          </Box>
          <Box display={["none","none","none","grid","grid",]}width={"28%"} mb={10} textAlign={"center"}   height={"fit-content"} bgColor={"white"}  >
            <Center>
          <Box  width={"95%"}  height={"xs"} mt={10} >
            <Text fontSize={"20px"} width={"95%"}color={"black"}>Entrez votre adresse pour trouver les commerces à proximité</Text>
            <Flex mt={5} display={"grid"} >
              
           <Box display={"grid"}width={"80%"} mb={2}  >
            <Center>
            <InputGroup width={"60%"} >
             
              {/* <InputLeftAddon as={Box}  bgColor={"#5543"} borderRaduis={"20px"} color={"black"} width={"50%"}>
            
             <Text  >
            
             </Text>
             
            
              </InputLeftAddon> */}
            <InputRightElement _hover={
                {
                  cursor:"pointer"   ,
                  border:"3px solid cyan",
                  borderRadius:"10px"            
                 }
              }
              onClick={()=>handleLocate()}>
              <RiSendPlaneLine color={"cyan.700"} fontSize={"25px"} />

            </InputRightElement>
            <Input placeholder={"Saisir le Code postal"} borderRadius={"4px"} 
             value={locate}
              height={"50px"}
              width={"400px"}
             onChange={(e) => {
               setLocate(e.target.value)
               secureLocalStorage.setItem("postal", e.target.value),
               setCode(e.target.value),
               Search(code.slice(0,2))
               if((e.target.value).length>4){
                router.reload()
               }
             }}
            />
            </InputGroup>
            </Center>
          
            <Box    borderRaduis={"20px"} width={"300px"}> 
            
            <Text fontSize={"15px"} ml={10}>Dernière position : </Text>
             <Text  fontSize={"15px"} ml={10}>{final}</Text>
            
            
            </Box>
            </Box> 
            <Center>
            <Box >
           
            <Image src={"./head21.png"}width={"300px"} alt="info origine"/>
             {/* <Image src={"./head.png"} width={"275px"}alt="info paiement"/> */}
            </Box>
            </Center>
            {/* <Button bgColor={"cyan.600"} color="white" o>Trouver</Button> */}
            </Flex>
           
          </Box>
          </Center>
          </Box>
        </Flex>
    
      
        
      </Box>
    </>
  );
};

export default SliderComponents;
