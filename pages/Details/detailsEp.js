'use client'
import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Center,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  List,
  ListItem,
  useToast,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  Textarea,
  Icon,
  Avatar,
  Select,
} from '@chakra-ui/react'
import { useEffect,useState } from 'react'
import secureLocalStorage from 'react-secure-storage'
import Navbar from "@/components/Navbar";
import InputBar from '@/components/InputBar'
import FooterR from '@/components/footerResponsif'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { StarIcon } from '@chakra-ui/icons'
import { ref, set, push, onValue } from "@firebase/database";
import { authentic, db, db2 } from "@/FIREBASE/clientApp";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app } from "@/FIREBASE/clientApp";
import { storeCartInFirestore } from '/components/firestore/firestore';
import { addDoc, collection, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { useRouter } from 'next/router';
import {Image as Imd} from 'next/image'
import Link from 'next/link';
import { FacebookIcon, FacebookShareButton, WhatsappIcon, WhatsappShareButton } from 'next-share';
import Head from "next/head";

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
  };
  const settings2 = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true,
  };



export function Comment ({id,data}){
  if(id== data.productID){
    return(
      <>
      <Box>
        <Flex>
        <Avatar size='md' name='' src=''  mr={5}/>
      <Box>
        <Flex justify={"space-between"}>
        <Text fontWeight={700}>{data.title}</Text>
        <Text fontWeight={700}>{data.date}</Text>
        </Flex>
     
      <Text fontWeight={"light"} width={"200px"}>{data.message}</Text>
        {Array(5)
            .fill('')
            .map((_, i) => (
              <StarIcon
                key={i}
                color={i < data.rate ? 'yellow' : 'gray.300'}
              />
            ))}
      </Box>
        
        </Flex>
      
        
      </Box>
    
      </>
    )
  }

}

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
    {total ? <Box display={"flex"}>
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
            <Text mt={-1} ml={2}>({total})</Text>
    </Box> : <></>}
    
  
    </>
  )
}






export default function Simple() {
  const router = useRouter();
  const { asPath,query } = router;
  const [data,setData] = useState([])
  const [data1,setData1] = useState([])
  const [indexed,setIndexed] = useState(0)
  const [taille,setTaille] = useState("Default")
  const [color,setColor] = useState("Default")
  const [id,setId] = useState("")
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
 


  
  const Fav = async () => {
    
    const starCountRef = ref(db2, "Feedback");
    onValue(starCountRef, (snapshot) => {
      setData1(snapshot.val());
    
    });   
  };
const RetreiveProd=(cat,org,pid)=>{
  const starCountRef = ref(
    db2,
    `${cat}/${org}/${pid}`
  );

  onValue(starCountRef, (snapshot) => {
    // console.log("snapshot", snapshot.val());
    const donnes = snapshot.val();
    setData(donnes)
   
    
    
 
})
  
    setId(pid)
}





  useEffect(()=>{
    
    Fav()
    RetreiveProd(query.c,query.m,query.p)    
  },[data,query])
  const avis = "Titre de l'avis"
  const [avisTitle,setAvisTitle] = useState("")
  const [avisDesc,setAvisDesc] = useState("")
  const [detailsLink,setDetailsLink] = useState("")
  const [] = useState("")
  
  const [rating, setRating] = useState(0); 

  const handleRatingClick = (selectedRating) => {
    setRating(selectedRating);
  };


  const SendReport =()=>{
    const auth = getAuth(app);


    onAuthStateChanged(auth, (user) => {
      if (!user) {
        toast({
          title: "Veuillez vous connecter SVP!!!",

          status: "error",
          duration: 10000,
          isClosable: true,
        })
      }else{
        const date = new Date();
        const dateDep = date.toLocaleDateString();
        push(ref(db2, "Feedback"), {
          productID: id,
          rate : rating,
          title: avisTitle,
          message : avisDesc,
          date : dateDep,
        });
      }
    });
   
  }
///fonction du panier


async function Exist(productKey,email,product,color,taille){
  const cartRef = collection(db, 'orders'); // Supposons que la collection se nomme 'carts'.
  const q = query(cartRef, where('email', '==', email),where("productId", '==' , productKey)); // Requête pour récupérer le panier par userId.

  const querySnapshot = await getDocs(q);

  if (querySnapshot.size === 1 ) {
    const cartDoc = querySnapshot.docs[0];
    const cartData = cartDoc.data();
    // console.log(cartData)
    const itemIndex = Object.values(cartData).find((item) => item.productId === productKey);
    if (itemIndex !== -1) {
      const sd = collection(db, 'orders')
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





function AddToCart(product,productKey,color,taille) {


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
        Exist(productKey,user.email,product,color,taille);
        toast({
          title: "Produit ajouté!!!",

          status: "success",
          duration: 9000,
          isClosable: true,
        });
      } catch (error) {
        // console.error("Error adding document: ", error);
        toast({
          title: "veuillez reessayer svp!!!",

          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
  
    }
  })

}
////ffin fonction de la cart  


const Preced = () =>{
  try {
    router.back()
  } catch (error) {
    router.push("/")
  }
}


if(data != null){

  if(Object.values(data).length>0){
    return (
      <>
     <Head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-RFSVQTGJ87"
        ></script>
        <script strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments)}
           gtag('js', new Date()); 
           gtag('config', 'G-RFSVQTGJ87');
           `}
          
        </script>
        </Head>
      <InputBar />
  <Navbar />
      <Container maxW={'7xl'}>
        <SimpleGrid
        
          columns={{ base: 1, lg: 2 }}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 18, md: 24 }}>
          <Box>
            <Center display={["grid","grid","grid","none","none"]}>
            <Image
            mb={5}
            
              alt={'product image'}
              src={
               data.imageUrl[indexed]
              }
             
              
              
              w={{ base: '250px', sm: '350px', lg: '400px' }}
              ml={[10,10,10,10,20]}
              h={{ base: '250px', sm: '350px', lg: '400px' }}
            />
          </Center>
          <Box display={["none","none","none","grid","grid"]}>
          <Image
          
            mb={5}
             
              alt={'product image'}
              src={
               data.imageUrl[indexed]
              }
             
              
              
              w={{ base: '250px', sm: '350px', lg: '400px' }}
              ml={[10,10,10,10,20]}
              h={{ base: '443px', sm: '620px', lg: '400px' }}
            />
            </Box>
            <Box  width={"500px"} display={["none","none","none","block","block"]}>
           {data.imageUrl.length > 1 ?
           <Slider {...settings}>
        {data.imageUrl.map((image, index) => (
        
            <Image key={index} src={image} width={["100px","100px","100px","150px","150px"]} height={["100px","100px","100px","150px","150px"]} onClick={()=>setIndexed(index)} cursor={"pointer"} alt={`Product Image ${index}`}  px={2}/>
          
        ))}
      </Slider> : <> <Image  src={data.imageUrl} width={["100px","100px","100px","150px","150px"]} height={["100px","100px","100px","150px","150px"]} cursor={"pointer"} alt={`Product Image `} /></>} 
      </Box>
      
      <Box  width={"350px"} display={["block","block","block","none","none"]}>
           {data.imageUrl.length > 1 ?
           <Slider {...settings2}>
        {data.imageUrl.map((image, index) => (
        
            <Image key={index} src={image} width={["100px","100px","100px","150px","150px"]}  height={["100px","100px","100px","150px","150px"]} onClick={()=>setIndexed(index)} cursor={"pointer"} alt={`Product Image ${index}`}  px={2}/>
          
        ))}
      </Slider> : <> <Image  src={data.imageUrl} width={["100px","100px","100px","150px","150px"]} height={["100px","100px","100px","150px","150px"]} cursor={"pointer"} alt={`Product Image `} /></>} 
      </Box>
  
      
              </Box> 
          <Stack spacing={{ base: 6, md: 10 }}>
            <Box as={'header'}>
            <Flex  borderBottom={"1px solid gray"} py={5}>
           <Box mr={5}>
            <FacebookShareButton 
       
        url={`https://www.appchap.fr${router.asPath}`} > 
        <FacebookIcon size={32} m round /> 
      </FacebookShareButton> 
   
      </Box>
     
      <WhatsappShareButton
       
       url={`https://www.appchap.fr${router.asPath}`} >  
        <WhatsappIcon size={32} round /> 

      </WhatsappShareButton> 
            </Flex>
              <Flex mt={5}justifyContent={"space-between"}>  
              <Heading
              mb={5}
                // lineHeight={1.1}
                fontWeight={600}
                fontSize={"25px"}
                width={"50%"}>
               {data.nom}
              </Heading>
              {/* {console.log("data",data)} */}
              <Flex>
                <Text 
                width={"fit-content"}
              color={"black"}
              fontSize={["25px","25px","25px","30px","30px"]}
              fontWeight={"hairline"}
              mr={2}>
                {data.prix} € 
              </Text>
             <Text as={"sub"} mt={["25px","25px","25px","30px","30px"]}>TTC</Text>
                </Flex>
              </Flex>
             
              <Text
              mb={5}
                  color={'gray.500'}
                  fontSize={'xl'}
                  fontWeight={'300'}>
                 {data.description} 
                </Text>
               
             
              
            </Box>
            <Star id={id} data={data1}/>
            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={'column'}
              divider={
                <StackDivider borderColor={'gray.200'} />
              }>
              <VStack spacing={{ base: 4, sm: 6 }}>
            
               <Flex>
               <Text mr={2}>Expédié par </Text>
                <Text color={"cyan.700"} fontWeight={"bold"}>CHAP</Text>
               </Flex>
              
              </VStack>
            
              
              <Box>
                <Text
                  fontSize={{ base: '16px', lg: '18px' }}
                  color={'yellow.500'}
                  fontWeight={'500'}
                 
                  mb={'4'}>
                  <u>Détails du produit</u>
                </Text>
  
                <List spacing={2}>
                  <ListItem>
                    <Text as={'span'} fontSize={"12px"}fontWeight={'bold'}>
                      Quantité:
                    </Text>{' '}
                    {data.quantite}
                  </ListItem>
                  <ListItem>
                    <Text as={'span'}  fontSize={"12px"}fontWeight={'bold'}>
                      Origine:
                    </Text>{' '}
                    {data.origine}
                  </ListItem>
                  <ListItem>
                    <Text as={'span'}  fontSize={"12px"} fontWeight={'bold'}>
                      Etat:
                    </Text>{' '}
                    {data.etat}
                  </ListItem>
                
                </List>
              </Box>
            </Stack>
  <Center display={"grid"}>
            <Button
            className={"button-85"}
            
              onClick={()=>{AddToCart(data,id,color,taille)}}>
              Ajouter au panier
            </Button>
           
            <Flex mt={2} ml={10}>
              <Text mr={2}>Expédié en  </Text>
              <Text color={"green"}>48H</Text>
            </Flex>
            </Center>
            <Flex justifyContent={"space-between"}>
      <Box mr={20}>
      <Text mt={10} fontSize={["20px","20px","20px","25px","25px"]} fontWeight={600}>Avis des clients</Text>
  
  <Box> 
     {data1 ?Object.values(data1).map((data,key)=>(<Comment key={key} id={id} data={data}/>)) : <></>}
     </Box>
      </Box>
      <Button  bgColor={"gray.500"} color={"white"} _hover={{
        bgColor:"gray.900"
      }} mt={10}  onClick={onOpen} width={"fit-content"}>Donner votre avis </Button>
      </Flex>
  
            
          </Stack>
        </SimpleGrid>
      </Container>
      <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Votre avis sur {data.nom}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <Stack direction="row" spacing={2}>
        {[1, 2, 3, 4, 5].map((star,index) => (
          <Box
          key={index}
           
            as="button"
            onClick={() => handleRatingClick(star)}
          >
            <Icon
              as={StarIcon}
              w={6}
              h={6}
              color={star <= rating ? "yellow.400" : "gray.300"}
            />
          </Box>
        ))}
      </Stack>
                <Box>
                  
                    <Text>{avis} : </Text>
                    <Input type='text' onChange={(e)=>setAvisTitle(e.target.value)} maxLength={50}/>
                  
                    <Text>Avis : </Text>
                    <Textarea width={"full"}onChange={(e)=>setAvisDesc(e.target.value)} maxLength={220} height={"20vh"} />
                  
                </Box>
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' isDisabled={avisTitle.length<3|| avisDesc.length<3} mr={3} onClick={()=>{SendReport()}}>
                Enregistrer
              </Button>
              <Button  onClick={onClose} variant='ghost'>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      <FooterR/>
      </>
    )
  }
}
else{
  return(
    <>
    <Head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-RFSVQTGJ87"
        ></script>
        <script strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments)}
           gtag('js', new Date()); 
           gtag('config', 'G-RFSVQTGJ87');
           `}
          
        </script>
        </Head>
    <Navbar/>
    <Center display={"grid"}>
    <Text fontWeight={700} mb={5}>Produit introuvable</Text>
    <Button fontWeight={600} ml={-5} bgColor={"transparent"} _hover={{
      bgColor:"transparent"
    }} fontSize={"20px"} color={"blue.700"} onClick={()=>Preced()}>Page précedente</Button>
         </Center>
    </>
  )
}


  
}
