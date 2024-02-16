import { authentic, db, db2 } from "@/FIREBASE/clientApp";
import InputBar from "@/components/InputBar";
import Navbar from "@/components/Navbar";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {
  Box,
  Button,
  Collapse,
  Flex,
  Center,
  Heading,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Stack,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
  useBreakpointValue,
  IconButton,
  Link,
  AspectRatio,
} from "@chakra-ui/react";
import { onValue, push, ref } from "@firebase/database";
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import {
  BsFillTelephoneOutboundFill,
  BsTelephoneOutboundFill,
} from "react-icons/bs";
import { IoMdAddCircle, IoMdAddCircleOutline } from "react-icons/io";
import Slider from "react-slick";
import { BiWorld } from "react-icons/bi";
import { ChevronDownIcon, ChevronUpIcon, StarIcon } from "@chakra-ui/icons";
import FooterR from "@/components/footerResponsif";
import secureLocalStorage from "react-secure-storage";
import Favlist2 from "../generale/FavLists2";
import { FaTruckPickup } from "react-icons/fa";
import { AiFillExclamationCircle, AiOutlineStar } from "react-icons/ai";
import { BsCashCoin } from "react-icons/bs";
import { onAuthStateChanged } from "firebase/auth";
import { addDoc, collection, getDocs, query, updateDoc, where } from "firebase/firestore";





////////////////////////////////////////////////////////SLIDER CONFIG /////////////////////////////////////////////////////

const responsive = {
  desktop: {
    breakpoint: { max: 1550, min: 1350 },
    items: 7,
    // partialVisibilityGutter: 60,
  },
  desktopL: {
    breakpoint: { max: 1705, min: 1550 },
    items: 8,
    // partialVisibilityGutter: 60,
  },
  desktopM: {
    breakpoint: { max: 2000, min: 1705 },
    items: 9,
    // partialVisibilityGutter: 60,
  },
  desktopX: {
    breakpoint: { max: 2150, min: 2000 },
    items: 10,
    // partialVisibilityGutter: 60,
  },
  desktopXL: {
    breakpoint: { max: 2500, min: 2150 },
    items: 11,
    // partialVisibilityGutter: 60,
  },
  desktopXLL: {
    breakpoint: { max: 3000, min: 2500 },
    items: 12,
    // partialVisibilityGutter: 60,
  },
  tablet: {
    breakpoint: { max: 750, min: 550 },
    items: 4,
    // partialVisibilityGutter: 50,
  },
  tabletM: {
    breakpoint: { max: 1125, min: 750 },
    items: 5,
    // partialVisibilityGutter: 50,
  },
  tabletL: {
    breakpoint: { max: 1350, min: 1125 },
    items: 6,
    // partialVisibilityGutter: 50,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
    // partialVisibilityGutter: 30,
  },
  mobileM: {
    breakpoint: { max: 550, min: 464 },
    items: 3,
    // partialVisibilityGutter: 30,
  },
};

const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 1500,
  autoplaySpeed: 3000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

/////////////////////////////////////////////FIN SLIDER CONFIG//////////////////////////////////////////////////////////////


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
      {total ? <Flex>
        {/* {data.length} */}
        {/* {star} */}
       
      
  
        {}
        {Array(5)
              .fill('')
              .map((_, i) => (
                <StarIcon
                  key={i}
                  color={i < star/total ? 'yellow' : 'gray.500'}
                />
              ))}
                <Text ml={1} mt={-1}>({total})</Text>
      </Flex> : <Flex> 
      
      {Array(5)
              .fill('')
              .map((_, i) => (
                <StarIcon
                  key={i}
                  color={'gray.500'}
                />
              ))}
              <Text ml={2} mt={-1}>{total} avis</Text>
              </Flex>}
      
    
      </>
    )
  }
  
  
  




export default function Epicerie({categorie,magasin}){
    const [show, setShow] = useState(false);

    const handleToggle = () => setShow(!show);
    const { isOpen, onToggle, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const router = useRouter();

    console.log(router)

    const [imageUrl, setImageUrl] = useState("");
    const [numero, setNumero] = useState("");
    const [nom, setNom] = useState("");
    const [Desc1, setDesc1] = useState("");
    const [nation, setNation] = useState("");
    const [addresse, setAddresse] = useState("");
    const [data, setData] = useState([]);
    // const [categorie, setCategorie] = useState("");
    const [data1, setData1] = useState([]);
    const [data2, setData2] = useState();
    const [link,setLink] = useState();
  


  ///fonction du panier

async function Exist(productKey,email,product){
  const cartRef = collection(db, 'orders'); // Supposons que la collection se nomme 'carts'.
  const q = query(cartRef, where('email', '==', email),where("productId", '==' , productKey)); // Requête pour récupérer le panier par userId.

  const querySnapshot = await getDocs(q);

  if (querySnapshot.size === 1 ) {
    const cartDoc = querySnapshot.docs[0];
    const cartData = cartDoc.data();
    console.log(cartData)
    const itemIndex = Object.values(cartData).find((item) => item.productId === productKey);
    if (itemIndex !== -1) {
      await updateDoc(cartDoc.ref, {productId:productKey  ,  
      orderImageUrl:product.imageUrl,
      orderName: product.nom,
      orderPrice: product.prix,
      orderOrganisation: product.organisation,
      quantity:querySnapshot.docs[0].data().quantity+1,
      email:email});
    }
     
     
  }else{
    await addDoc(collection(db, 'orders'), {productId:productKey,
      orderImageUrl:product.imageUrl,
      orderName: product.nom,
      orderPrice: product.prix,
      orderOrganisation: product.organisation,
      quantity:1,
      email:email});
  }
}





function AddToCart(product,productKey) {


  onAuthStateChanged(authentic, async (user) => {
    if (!user) {
      toast({
        title: "svp enregistré vous, merci!!!",

        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }else{
      try {
       await  Exist(productKey,user.email,product);
        toast({
          title: "Produit ajouté!!!",

          status: "success",
          duration: 9000,
          isClosable: true,
        });
      } catch (error) {
        
      }
  
    }
  })

}
////ffin fonction de la cart



    ////HOraire
    const heure = "Horaire d'Ouverture";
    const [horaire, setHoraire] = useState({});
  
    const [paiement, setPaiement] = useState({});
  
    const [timert, setTimert] = useState();
    ///fin horaire
    const [slider, setSlider] = useState(null);
  
    const top = useBreakpointValue({ base: "90%", md: "50%" });
    const side = useBreakpointValue({ base: "30%", md: "10px" });
  
    

    const Fav = async () => {
    
      const starCountRef = ref(db2, "Feedback");
      onValue(starCountRef, (snapshot) => {
        setData2(snapshot.val());
      
      });
  
      
      // const db = getDatabase();
     
    };
    

    const SearchMagasin = async (magasin) =>{
      try{

        const cartRef = collection(db, 'Admin'); // Assurez-vous que la collection est correcte.
      const q = query(cartRef, where('organisation', '==', magasin));
  
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs[0].data()
      setNom(data.organisation)
      setTimert(data.horaire);
      setImageUrl(data.imageUrl)
      setNumero(data.number)
       setPaiement(data.paiement)
 setAddresse(data.adresse)
setDesc1(data.description)
setNation(data.nationalite)
 setLink(`https://www.google.com/maps/embed/v1/place?key=AIzaSyAoJQLE8uAbWnyPHCv-_udEUhH7HQooJlM
    &q=${data.adresse}`);
      }catch{(error)=>{
        
      }}
      
    }

    useEffect(() => {
     Fav()
     SearchMagasin(magasin)

  
     try{
      const starCountRef = ref(
        db2,
        `${categorie}/${magasin}`
      );
        
      onValue(starCountRef, (snapshot) => {
        
        const donnes = snapshot.val();
        if(donnes != null && donnes != undefined){
          Object.keys(donnes).map((data)=>{
            data1.push(data)
              console.log("data",data)
          })
          
        }
        
  
        if (donnes != null) {
          const newProducts = Object.keys(donnes).map((key) => ({
            id: key,
            ...donnes[key],
          }));
  
          setData(newProducts);
          
        } 
      }); 
     }catch{(error)=>setData([])}
  
     
    }, [
      setImageUrl,
      setAddresse,
      setNom,
      setNumero,
      setHoraire,
      setDesc1,
     
      data1,categorie,nom,router
    ]);
  

  const date2 = new Date();
  const dateExp = date2.setDate(date2.getDate() + 1);
  const dateExp2 = new Date(dateExp);
  const dateExp3 = dateExp2.toLocaleDateString();
  const date3= new Date();
  const dateExp4 = date3.setDate(date3.getDate() + 2);
  const dateExp5 = new Date(dateExp4);
  const dateExp6 = dateExp5.toLocaleDateString();


    return(<>
      <InputBar />
      <Navbar />
     
      <Box  mt={10} mb={10}>

       
      <Box display={["none", "none", "none", "grid", "grid"]} ml={["3%", "3%", "3%", "10%", "10%"]}>
        <Flex >
          <Box mr={5}>
            <Image
              src={`${imageUrl}`}
              alt={`logo de ${magasin}`}
              width={["150px", "150px", "150px", "200px", "200px"]}
              height={["150px", "150px", "150px", "200px", "200px"]}
              maxHeight={"200px"}
              maxWidth={"200px"}
              minHeight={"80px"}
              minWidth={"100px"}
            />
          </Box>

          <Box>
            <Heading fontSize={"35px"}>{nom}</Heading>
            <Text fontSize={"15px"} opacity={0.5} fontWeight={"medium"}>
              {addresse}
            </Text>
            <Flex mb={2} mt={2}>
              <BsFillTelephoneOutboundFill />
              <Text
                fontSize={"15px"}
                fontWeight={"medium"}
                ml={2}
                color={"green"}
              >
                {numero}
              </Text>
            </Flex>
            <Flex>
              <Text fontWeight={"bold"} pr={2}>
                Description :{" "}
              </Text>
              {Desc1 == "undefined" ? (
                <Text width={"58%"}  textAlign={"justify"}>
                  {`${" ",categorie} Africain`} 
                </Text>
              ) : (
                <Text width={"58%"} textAlign={"justify"}>
                   {`${" ",Desc1} `} 
                </Text>
              )}
            </Flex>
            <Flex>
              <Text fontWeight={"bold"}>
              Nationalité :{" "}
              </Text>
              {nation == "undefined" ? (
                <Text  ml={2} fontSize={"15px"} >
                   Africaine
                </Text>
              ) : (
                <Text  ml={2} fontSize={"15px"} >
                  {`${" ",nation} `}
                </Text>
              )}
            </Flex>
            <Flex>
              <Text fontWeight={"bold"} mr={2}>Moyen de paiement : </Text>
              <Flex>
              {paiement != "undefined" && paiement != null
                      ? Object.values(paiement).map((data,index)=>{return(<Text key={index} mr={2}>{data},</Text>)})
                      : "Espèces"}
              </Flex>
            </Flex>
            <Flex>
              <Text fontWeight={"bold"}>
                Réservation :{" "}
              </Text>
              <Text width={"58%"}ml={2} textAlign={"justify"}>
                {data.length != 0 ? (
                  <Text color={"messenger.500"} ml={2}>En ligne</Text>
                ) : (
                  <Text color={"red.400"} ml={2} >Non Disponible</Text>
                )}
              </Text>
            </Flex>

            <Flex>
              <Heading
                as={"h3"}
                fontWeight={"bold"}
                _hover={{
                  cursor: "pointer",
                }}
                onClick={handleToggle}
                color={"blue.700"}
                fontSize={"15px"}
                mt={3}
              >
                {heure}{" "}
                {show ? (
                  <ChevronUpIcon fontSize={"20px"} />
                ) : (
                  <ChevronDownIcon fontSize={"20px"} />
                )}{" "}
                :
              </Heading>
            </Flex>
            <Collapse in={show}>
              <Box ml={10}>
                <Text fontSize={"15px"}>
                  lundi:{" "}
                  {timert != "undefined" && timert != null
                    ? `${" "} ${timert.lundi}`
                    : " Non Renseigné"}
                </Text>
                <Text fontSize={"15px"}>
                  mardi:{" "}
                  {timert != "undefined" && timert != null
                    ? `${" "} ${timert.mardi}`
                    : " Non Renseigné"}
                </Text>
                <Text fontSize={"15px"}>
                  mercredi:{" "}
                  {timert != "undefined" && timert != null
                    ? `${" "} ${timert.mercredi}`
                    : " Non Renseigné"}
                </Text>
                <Text fontSize={"15px"}>
                  jeudi:{" "}
                  {timert != "undefined" && timert != null
                    ? `${" "} ${timert.jeudi}`
                    : " Non Renseigné"}
                </Text>
                <Text fontSize={"15px"}>
                  vendredi:{" "}
                  {timert != "undefined" && timert != null
                    ? `${" "} ${timert.vendredi}`
                    : " Non Renseigné"}
                </Text>
                <Text fontSize={"15px"}>
                  samedi:{" "}
                  {timert != "undefined" && timert != null
                    ? `${" "} ${timert.samedi}`
                    : " Non Renseigné"}
                </Text>
                <Text fontSize={"15px"}>
                  dimanche:{" "}
                  {timert != "undefined" && timert != null
                    ? `${" "} ${timert.dimanche}`
                    : " Non Renseigné"}
                </Text>
              </Box>
            </Collapse>
          </Box>
          <Box ml={10}>
            <AspectRatio ratio={16 / 9}>

              <iframe
                width="400"
                height="200"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={link}
              ></iframe>
              
            </AspectRatio>
            
          
          </Box>
        </Flex>
        <Box mt={5} width={"90%"}>
                <Center >
                  <Box mr={2}>
                    <Button
                      color={"#fff"}
                      width={"150px"}
                      height={"30px"}
                      as={"a"}
                      // onClick={onOpen}
                      bgColor={"green"}
                      _hover={{
                        backgroundColor: " cyan.900",
                        color: "white ",
                      }}
                      href={`tel:${numero}`}
                      leftIcon={<BsTelephoneOutboundFill />}
                    >
                      Nous contacter
                    </Button>
                  </Box>
                  <Box mr={2}>
                    <Button
                      color={"#fff"}
                      width={"150px"}
                      height={"30px"}
                      isDisabled={true}
                      as={"a"}
                      // onClick={onOpen}
                      bgColor={"red"}
                      _hover={{
                        backgroundColor: " red.500",
                        color: "white ",
                      }}
                      // href={`${sessionStorage.getItem("website")}`}
                      leftIcon={<BiWorld />}
                      // isExternal
                    >
                      Site Web
                    </Button>
                  </Box>
                  <Box>
                    <Button
                      color={"#fff"}
                      width={"150px"}
                      height={"30px"}
                      as={"a"}
                      // onClick={onOpen}
                      isDisabled={true}
                      bgColor={"cyan.700"}
                      _hover={{
                        backgroundColor: " cyan.900",
                        color: "white ",
                      }}
                      // leftIcon={<BsTelephoneOutboundFill />}
                    >
                      Réserver
                    </Button>
                  
                  </Box>
                </Center>
                
              </Box>
        </Box>
        <Flex display={["grid", "grid", "none", "none", "none"]} width={"fit-content"} ml={["3%", "3%", "3%", "10%", "10%"]}>
        <Box display={"flex"} mb={5}>
           <Box mr={5}>
             <Image
               src={`${imageUrl}`}
               alt={`logo de ${nom}`}
               width={["150px", "150px", "150px", "200px", "200px"]}
               height={["150px", "150px", "150px", "200px", "200px"]}
               maxHeight={"200px"}
               maxWidth={"200px"}
               minHeight={"80px"}
               minWidth={"100px"}
             />
             
           </Box>
           <Heading fontSize={"35px"}>{nom}</Heading>
         </Box>

         <Box>
           <Text fontSize={"15px"} fontWeight={"medium"}>
             {addresse}
           </Text>
           <Flex mb={2} mt={2}>
             <BsFillTelephoneOutboundFill />
             <Text
               fontSize={"15px"}
               fontWeight={"medium"}
               ml={2}
               color={"green"}
             >
               {numero}
             </Text>
           </Flex>
           <Flex>
             <Text fontWeight={"bold"} pr={2}>
               Description :{" "}
             </Text>
             {Desc1 == "undefined" ? (
               <Text width={"58%"}  textAlign={"justify"}>
                 {categorie} Africain
               </Text>
             ) : (
               <Text width={"58%"}  textAlign={"justify"}>
                 {Desc1}
               </Text>
             )}
           </Flex>
           <Flex>
              <Text fontWeight={"bold"}>
              Nationalité :{" "}
              </Text>
              {nation == "undefined" ? (
                <Text  ml={2} fontSize={"15px"} >
                   Africaine
                </Text>
              ) : (
                <Text  ml={2} fontSize={"15px"} >
                  {`${" ",nation} `}
                </Text>
              )}
            </Flex>
           <Flex>
           <Text fontWeight={"bold"}  mr={2}>Moyen de paiement : </Text>
                <Flex>
                {paiement != "undefined" && paiement != null
                      ? Object.values(paiement).map((data,index)=>{return(<Text key={index} mr={2}>{data},</Text>)})
                      : "Espèces"}
                
                  {/* <Text ml={2} fontSize={"15px"}>
                    {paiement != "undefined" && paiement != null
                      ? paiement.methodeDePaiement2
                      : ""}
                  </Text> */}
                </Flex>
           </Flex>
           <Flex>
             <Text fontWeight={"bold"} >
               Réservation :{" "}
             </Text>
             <Text width={"58%"} textAlign={"justify"}>
               {data.length != 0 ? (
                 <Text color={"messenger.500"} ml={2}>En ligne</Text>
               ) : (
                 <Text color={"red.400"} ml={2}>Non Disponible</Text>
               )}
             </Text>
           </Flex>
           <Center >
             <Box>
             <Box mt={5}>
               <Button
               py={5}
               px={5}
                 color={"#fff"}
                 width={"150px"}
                 height={"30px"}
                 as={"a"}
                 // onClick={onOpen}
                 bgColor={"green"}
                 _hover={{
                   backgroundColor: " green.200",
                   color: "white ",
                 }}
                 href={`tel:${numero}`}
                 leftIcon={<BsTelephoneOutboundFill />}
               >
                 Nous contacter
               </Button>
             </Box>
             <Box mt={5} >
               <Button
               py={5}
               px={5}
                 color={"#fff"}
                 width={"150px"}
                 height={"30px"}
                 as={"a"}
                 // onClick={onOpen}
                 bgColor={"red"}
                 _hover={{
                   backgroundColor: " red.500",
                   color: "white ",
                 }}
                 isDisabled = {true}
                 // href={`${sessionStorage.getItem("website")}`}
                 leftIcon={<BiWorld />}
                 // isExternal
               >
                 Site Web
               </Button>
             </Box>
            
             <Box mt={5} >
               <Button
               py={5}
               px={5}
                 color={"#fff"}
                 width={"150px"}
                 height={"30px"}
                 as={"a"}
                 // onClick={onOpen}
                 bgColor={"cyan.700"}
                 _hover={{
                   backgroundColor: " cyan.900",
                   color: "white ",
                 }}
                 // leftIcon={<BsTelephoneOutboundFill />}
               >
                 Réserver
               </Button>
              
             </Box>
             </Box>
            </Center>

           <Flex>
             <Heading
               as={"h3"}
               fontWeight={"bold"}
               _hover={{
                 cursor: "pointer",
               }}
               onClick={handleToggle}
               color={"blue.700"}
               fontSize={"15px"}
               mt={3}
             >
               {heure}{" "}
               {show ? (
                 <ChevronUpIcon fontSize={"20px"} />
               ) : (
                 <ChevronDownIcon fontSize={"20px"} />
               )}{" "}
               :
             </Heading>
           </Flex>

           <Box ml={10}>
             <Text fontSize={"15px"}>
               lundi:{" "}
               {timert != "undefined" && timert != null
                 ? `${" "} ${timert.lundi}`
                 : " Non Renseigné"}
             </Text>
             <Text fontSize={"15px"}>
               mardi:{" "}
               {timert != "undefined" && timert != null
                 ? `${" "} ${timert.mardi}`
                 : " Non Renseigné"}
             </Text>
             <Text fontSize={"15px"}>
               mercredi:{" "}
               {timert != "undefined" && timert != null
                 ? `${" "} ${timert.mercredi}`
                 : " Non Renseigné"}
             </Text>
             <Text fontSize={"15px"}>
               jeudi:{" "}
               {timert != "undefined" && timert != null
                 ? `${" "} ${timert.jeudi}`
                 : " Non Renseigné"}
             </Text>
             <Text fontSize={"15px"}>
               vendredi:{" "}
               {timert != "undefined" && timert != null
                 ? `${" "} ${timert.vendredi}`
                 : " Non Renseigné"}
             </Text>
             <Text fontSize={"15px"}>
               samedi:{" "}
               {timert != "undefined" && timert != null
                 ? `${" "} ${timert.samedi}`
                 : " Non Renseigné"}
             </Text>
             <Text fontSize={"15px"}>
               dimanche:{" "}
               {timert != "undefined" && timert != null
                 ? `${" "} ${timert.dimanche}`
                 : " Non Renseigné"}
             </Text>
           </Box>
         </Box>
         <Text mt={5} as={"h3"} fontWeight={"bold"}>
           Nous rejoindre
         </Text>
         <Center>
           <Box mt={10}>
            
             <AspectRatio maxWidth={"400px"}ratio={4/3}
               width={"300px"}
               display={["grid", "grid", "grid", "none", "none"]}
             >
               <iframe
                 width="300"
                 height="250"
                 loading="lazy"
                 allowFullScreen
                 referrerPolicy="no-referrer-when-downgrade"
                 src={link}
               ></iframe>
             </AspectRatio>
           </Box>
         </Center>
        </Flex>
       
       <Flex display={["none", "none", "grid", "none", "none"]} width={"fit-content"} ml={["3%", "3%", "3%", "10%", "10%"]}>
        
        <Box display={"flex"} mb={5}>
         <Box mr={5}>
           <Image
             src={`${imageUrl}`}
             alt={`logo de ${nom}`}
             width={["150px", "150px", "150px", "200px", "200px"]}
             height={["150px", "150px", "150px", "200px", "200px"]}
             maxHeight={"200px"}
             maxWidth={"200px"}
             minHeight={"80px"}
             minWidth={"100px"}
           />
           
         </Box>
         <Heading fontSize={"35px"}>{nom}</Heading>
       </Box>

       <Box>
         <Text fontSize={"15px"} fontWeight={"medium"}>
           {addresse}
         </Text>
         <Flex mb={2} mt={2}>
           <BsFillTelephoneOutboundFill />
           <Text
             fontSize={"15px"}
             fontWeight={"medium"}
             ml={2}
             color={"green"}
           >
             {numero}
           </Text>
         </Flex>
         <Flex>
           <Text fontWeight={"bold"} pr={2}>
             Description :{" "}
           </Text>
           {Desc1 == "undefined" ? (
             <Text width={"58%"}  textAlign={"justify"}>
               {categorie} Africain
             </Text>
           ) : (
             <Text width={"58%"}   textAlign={"justify"}>
               {Desc1}
             </Text>
           )}
         </Flex>
         <Flex>
              <Text fontWeight={"bold"}>
              Nationalité :{" "}
              </Text>
              {nation == "undefined" ? (
                <Text  ml={2} fontSize={"15px"} >
                   Africaine
                </Text>
              ) : (
                <Text  ml={2} fontSize={"15px"} >
                  {`${" ",nation} `}
                </Text>
              )}
            </Flex>
         <Flex>
         <Text fontWeight={"bold"}  mr={2}>Moyen de paiement : </Text>
                <Flex>
                {paiement != "undefined" && paiement != null
                      ? Object.values(paiement).map((data,index)=>{return(<Text key={index} mr={2}>{data},</Text>)})
                      : "Espèces"}
                
                  {/* <Text ml={2} fontSize={"15px"}>
                    {paiement != "undefined" && paiement != null
                      ? paiement.methodeDePaiement2
                      : ""}
                  </Text> */}
                </Flex>
         </Flex>
         <Flex>
           <Text fontWeight={"bold"}>
             Réservation :{" "}
           </Text>
           <Text width={"58%"} textAlign={"justify"}>
             {data.length != 0 ? (
               <Text color={"messenger.500"} ml={2}>En ligne</Text>
             ) : (
               <Text color={"red.400"} ml={2}>Non Disponible</Text>
             )}
           </Text>
         </Flex>
         <Center>
         <Box>
           <Box mt={5}>
             <Button
             py={5}
             px={5}
               color={"#fff"}
               width={"150px"}
               height={"30px"}
               as={"a"}
               // onClick={onOpen}
               bgColor={"green"}
               _hover={{
                 backgroundColor: " green.200",
                 color: "white ",
               }}
               href={`tel:${numero}`}
               leftIcon={<BsTelephoneOutboundFill />}
             >
               Nous contacter
             </Button>
           </Box>
           <Box mt={5} >
             <Button
             py={5}
             px={5}
               color={"#fff"}
               width={"150px"}
               height={"30px"}
               as={"a"}
               // onClick={onOpen}
               bgColor={"red"}
               _hover={{
                 backgroundColor: " red.500",
                 color: "white ",
               }}
               isDisabled={true}
               // href={`${sessionStorage.getItem("website")}`}
               leftIcon={<BiWorld />}
               // isExternal
             >
               Site Web
             </Button>
           </Box>
          
           <Box mt={5} >
             <Button
             py={5}
             px={5}
               color={"#fff"}
               width={"150px"}
               height={"30px"}
               as={"a"}
               // onClick={onOpen}
               bgColor={"cyan.700"}
               _hover={{
                 backgroundColor: " cyan.900",
                 color: "white ",
               }}
               // leftIcon={<BsTelephoneOutboundFill />}
             >
               Réserver
             </Button>
            
           </Box>
           </Box>
           </Center>
         <Flex>
           <Heading
             as={"h3"}
             fontWeight={"bold"}
             _hover={{
               cursor: "pointer",
             }}
             onClick={handleToggle}
             color={"blue.700"}
             fontSize={"15px"}
             mt={3}
           >
             {heure}{" "}
             {show ? (
               <ChevronUpIcon fontSize={"20px"} />
             ) : (
               <ChevronDownIcon fontSize={"20px"} />
             )}{" "}
             :
           </Heading>
         </Flex>

         <Box ml={10}>
           <Text fontSize={"15px"}>
             lundi:{" "}
             {timert != "undefined" && timert != null
               ? `${" "} ${timert.lundi}`
               : " Non Renseigné"}
           </Text>
           <Text fontSize={"15px"}>
             mardi:{" "}
             {timert != "undefined" && timert != null
               ? `${" "} ${timert.mardi}`
               : " Non Renseigné"}
           </Text>
           <Text fontSize={"15px"}>
             mercredi:{" "}
             {timert != "undefined" && timert != null
               ? `${" "} ${timert.mercredi}`
               : " Non Renseigné"}
           </Text>
           <Text fontSize={"15px"}>
             jeudi:{" "}
             {timert != "undefined" && timert != null
               ? `${" "} ${timert.jeudi}`
               : " Non Renseigné"}
           </Text>
           <Text fontSize={"15px"}>
             vendredi:{" "}
             {timert != "undefined" && timert != null
               ? `${" "} ${timert.vendredi}`
               : " Non Renseigné"}
           </Text>
           <Text fontSize={"15px"}>
             samedi:{" "}
             {timert != "undefined" && timert != null
               ? `${" "} ${timert.samedi}`
               : " Non Renseigné"}
           </Text>
           <Text fontSize={"15px"}>
             dimanche:{" "}
             {timert != "undefined" && timert != null
               ? `${" "} ${timert.dimanche}`
               : " Non Renseigné"}
           </Text>
         </Box>
       </Box>
       <Text mt={5} as={"h3"} fontWeight={"bold"}>
         Nous rejoindre
       </Text>
       <Center>
         <Box mt={10}>
          
           <AspectRatio maxWidth={"400px"}ratio={4/3}
             width={"300px"}
             display={["grid", "grid", "grid", "none", "none"]}
           >
             <iframe
               width="300"
               height="250"
               loading="lazy"
               allowFullScreen
               referrerPolicy="no-referrer-when-downgrade"
               src={link}
             ></iframe>
           </AspectRatio>
         </Box>
       </Center> 
       </Flex>
       <Box display={"grid"} width={"100%"}>
          {data.length != 0 ? (
            <>
              {" "}
              <Box ml={["0%","0%","5%","5%","5%"]}>
              <Heading fontSize={"20px"} mt={10} ml={["5%","5%","0%","0%","0%"]}>
                Les produits{" "}
              </Heading>
              <Flex mt={10} ml={[0,0,10,0,0]}>
               
              <Center>
              <SimpleGrid columns={[2, 2, 3,3, 5]} >
                  {data.map((data, key) => (
                    <Box key={key} boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"} mx={[2,2,2,5,5]} mb={5} >
                    <Link key={key} _hover={{
                      textDecoration:"none"
                    }}
                    href={`/Details/details?c=${categorie}&m=${data.organisation}&p=${data1[key]}`}
                    onClick={()=>{
                      console.log("categorie",data.categorie)
                      secureLocalStorage.setItem("items",data)
                      
                      secureLocalStorage.setItem("i",data1[key])
                      
                      
                    }}>
                      <Box 
                    mx={5}
                      key={data.id}
                      maxW={"fit-content"}
                      // height={"400px"}
                      my={[0,0,0,5,5]} 
                      borderRadius="lg"
                      display={"grid"}
                      pb={10}
                      // border={"1px solid black"}
                    >
                      <Box
                       width={["130px","200px","200px","200px","200px"]}
                        height={"fit-content"}
                        // pt={10}
                        

                      >
                        <Image
                          src={data.imageUrl}
                          alt={data.nom}
                          width={["130px","190px","190px","200px","200px"]}
                          height={["110px","160px","160px","200px","200px"]}
                          maxH={["120px","160px","160px","200px","200px"]}
                          maxW={["140px","200px","200px","200px","200px"]}
                          // borderRadius={"25px"}
                        />
                      </Box>

                      <Box >
                        <Box
                        height={"fit-content"}
                      
                          fontWeight="semibold"
                         
                          lineHeight="tight"
                         
                          width={["150px","190px","190px","200px","200px"]}
                         
                          display={"grid"}
                          justifyContent={"space-between"}
                        >
                          <Box width={"100%"} >
                          <Text  width={["150px","150px","150px","200px","200px"]} noOfLines={3}  fontSize={"15px"} my={2}>
                            {data.nom}
                          </Text>
                          <Box mb={2}>
                          <Star  id={data1[key]} data={data2}/> 
                          {data.duree == "Expedié en 24h" ? <Text className={"Exp"} my={2}>Livré le {dateExp3} </Text> : <Text  className={"Exp"}my={2}>Livré le {dateExp6} </Text>}
                          <Flex>
                            <Box mt={2}>
                            <BsCashCoin />
                            </Box>
                            <Text ml={2} mt={-1}  fontSize={"12px"} my={2}>Payez en espèce</Text>
                          </Flex>
                          </Box>
                         
                          </Box>
                          
                        </Box>
                        
                        <Flex>
             
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
                        <Flex width={"90%"} justifyContent={"space-between"}>
                       <Text></Text>
                          <Box textColor={"blue"} color={"blue.400"} fontWeight={"semibold"}>
                            {data.prix}
                            <Box as="span"  fontSize="sm">
                              €
                            </Box>
                          </Box>
                        </Flex>
                       

                     
                        
                      </Box>
                    </Box> 
                    </Link>
                    <Flex mb={5} justifyContent={"space-between"}   width={"95%"}>
                          <Text ></Text>
                          <Button
                       
                            bgColor={"cyan.700"}
                            // borderRadius={"66px"}
                            width={"fit-content"}
                            as={"a"}
                            onClick={() => {
                              AddToCart(data,data1[key])
                       
                            }}
                            color={"white"}
                            _hover={{
                              backgroundColor: " cyan.900",
                              color: "white ",
                            }}
                            leftIcon={<IoMdAddCircle />}
                          >
                            {" "}
                            Ajouter
                          </Button>
                        </Flex>
                    </Box>
                  ))}
                </SimpleGrid>
                </Center>
                
              </Flex>
              </Box>
            </>
          ) : (
            <></>
          )}
          </Box>
      </Box>
      <Box>
   
          <Text fontSize={"24px"} lineHeight={"32px"}  fontWeight={700} ml={5}>Produits recommandés</Text>
         
          <Favlist2 />
          
        </Box>
      <FooterR />
    </>);}