import { authentic, db2 } from "@/FIREBASE/clientApp";
import {
  Badge,
  Box,
  Button,
  Center,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuList,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useMediaQuery,
  Modal,
ModalOverlay,
ModalContent,
ModalHeader,
ModalCloseButton,
ModalBody,
ModalFooter,
useDisclosure,
Heading,
Drawer,
DrawerOverlay,
DrawerContent,
DrawerCloseButton,
DrawerHeader,
DrawerBody,
CloseButton,
AspectRatio,
} from "@chakra-ui/react";
import { onValue, ref, update } from "@firebase/database";
import { useEffect, useState } from "react";
import Profiles from "./profiles";
import Navbar from "@/components/Navbar";
import InputBar from "@/components/InputBar";
import FooterR from "@/components/footerResponsif";
import secureLocalStorage from "react-secure-storage";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import Head from "next/head";
import { ArrowRightIcon, CalendarIcon, CloseIcon } from "@chakra-ui/icons";
import { BsClock, BsPerson } from "react-icons/bs";
import { CiGps, CiLocationOn } from "react-icons/ci";
import { BiLocationPlus } from "react-icons/bi";

function Cancel2(id, state) {
  console.log(id);
  update(ref(db2, "Reservation/" + String(id)), {
    status: state,
  });
  console.log(state);
}
function Valide2(id, state) {
  // console.log(id);
  update(ref(db2, "Reservation/" + String(id)), {
    status: state,
  });
}


function Cancel({ items, email,id }) {
  // console.log(items.Status);
  if (items.status == "Annulé" && items.email == email) {
    return (
     <>
      {/* <Box>
        <Flex>
          <Box width={"10%"}><Image src="./photoRes.jpg" alt="image restaurant" width={"100px"} height={"100px"}/> </Box>
          <Box width={"30%"}>
            <Heading>{items.magasin}</Heading>
            <Badge  borderRadius='full' px='2' colorScheme='red'>{items.Status}</Badge>
          </Box>
          <Box mt={10}>
            <ArrowRightIcon/>
          </Box>
        </Flex>

      </Box> */}
       <Box mb={5}>
        <Flex>
          <Box width={["30%","30%","20%","10%","10%"]}><Image src={items.imageMag} alt="image restaurant" width={"100px"} height={"100px"}/> </Box>
          <Box width={["60%","60%","40%","40%","40%"]} >
            <Heading>{items.magasin}</Heading>
            <Badge  borderRadius='full' px='2' colorScheme='red'>{items.status}</Badge>
            <Text>ref : {id}</Text>
          </Box>
          {/* <Box mt={10}>
            <ArrowRightIcon/>
          </Box> */}
        </Flex>
        <Flex mt={5} py={2} px={4} bgColor={"gray.100"} borderRadius={"25px"} border={"1px solid black"} justifyContent={"space-evenly"} width={["100%","100%","60%","50%","50%"]}>
          <Flex>
            <CalendarIcon mr={2} mt={1}/><Text>{items.dateReservation}</Text>
          </Flex>
          <Flex>
            <Box  mr={2} mt={1}>
            <BsClock /></Box>
            <Text>{items.heureReservation}</Text>
          </Flex>
          <Flex>
          <Box  mr={2} mt={1}>
            <BsPerson mr={2} mt={1}/>
            </Box>
            <Text>{items.nbrePerson}</Text>
          </Flex>
        </Flex>
     

      </Box>
     
      </>
    );
  } else {
    return <></>;
  }
}
function Launch({ items, email,id }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  // console.log(items);
  if (items.email == email && items.status == "En cours") {
    return (
      <>
          {/* <Box
        mt={2}
          maxW="fit-content"
          maxH={"fit-content"}
          display={["grid","grid","grid","flex","flex"]}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden" 
        >
      

          <Box p="6">
          <Box display="flex" alignItems="baseline">
              <Badge borderRadius="full" px="2" colorScheme="blue">
                {items.Status}
              </Badge>
            
            </Box>

            <Box
              mt="1"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              
            >
             Numero : {items.numero}
             <Flex><Text mr={2}>Date : </Text>{items.date}</Flex>
             <Flex><Text mr={2}>Couverts : </Text>{items.Couverts}</Flex>
            </Box>
            <Box>
              <Button bgColor={'red.500'} _hover={{
                bgColor:'#FF6969'
              }} color={'white'} onClick={() => Cancel2(id, "ANNULE")}>
                Annuler
              </Button>
            </Box>
           
          </Box>      
        </Box> */}
         <Box mb={5}>
        <Flex>
          <Box width={["30%","30%","20%","10%","10%"]}><Image src={items.imageMag} alt="image restaurant" width={"100px"} height={"100px"}/> </Box>
          <Box width={["60%","60%","40%","40%","40%"]} ml={2}>
            <Heading>{items.magasin}</Heading>
            <Badge  borderRadius='full' px='2' colorScheme='teal'>{items.status}</Badge>
            <Text>ref : {id}</Text>
          </Box>
          <Box mt={10}>
            <ArrowRightIcon cursor={"pointer"}  onClick={onOpen}/>
          </Box>
        </Flex>
        <Flex mt={5} py={2} px={4} bgColor={"gray.100"} borderRadius={"25px"} border={"1px solid black"} justifyContent={"space-evenly"} width={["100%","100%","60%","50%","50%"]}>
          <Flex>
            <CalendarIcon mr={2} mt={1}/><Text>{items.dateReservation}</Text>
          </Flex>
          <Flex>
            <Box  mr={2} mt={1}>
            <BsClock /></Box>
            <Text>{items.heureReservation}</Text>
          </Flex>
          <Flex>
          <Box  mr={2} mt={1}>
            <BsPerson mr={2} mt={1}/>
            </Box>
            <Text>{items.nbrePerson}</Text>
          </Flex>
        </Flex>

      </Box>
     




      <Drawer onClose={onClose} isOpen={isOpen} size={"full"}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader> Gérer ma réservation</DrawerHeader>
          <DrawerBody>
            <Center>
           <Box mt={5} px={4} py={2}boxShadow={ "rgba(0, 0, 0, 0.24) 0px 3px 8px"} borderRadius={"25px"}  width={["100%","100%","50%","50%","50%"]}>
            <Flex justifyContent={"space-between"}>
              <Heading>{items.magasin}</Heading>
              <Badge colorScheme="teal" borderRadius='full' width={"fit-content"} height={"fit-content"} py={2} px={4}>{items.status}</Badge>
            </Flex>
            <Flex mt={5} py={2} px={4} bgColor={"gray.100"} borderRadius={"25px"} border={"1px solid black"} justifyContent={"space-evenly"} width={"100%"} mx={0}>
          <Flex>
            <CalendarIcon mr={2} mt={1}/><Text>{items.dateReservation}</Text>
          </Flex>
          <Flex>
            <Box  mr={2} mt={1}>
            <BsClock /></Box>
            <Text>{items.heureReservation}</Text>
          </Flex>
          <Flex>
          <Box  mr={2} mt={1}>
            <BsPerson mr={2} mt={1}/>
            </Box>
            <Text>{items.nbrePerson}</Text>
          </Flex>
        </Flex>
        {/* <Button rightIcon={CloseIcon}></Button> */}
        <Box cursor={"pointer"} color={"red"} onClick={()=>Cancel2(id, "Annulé")} fontSize={"20px"} py={5} mt={5} borderTop={"1px solid black"} >
          <Center display={"grid"}>
          <CloseButton ml={5}/>
          <Text>Annuler</Text>
          </Center>
        </Box>
           </Box>
       
           </Center>
           <Center>
           <Box width={["100%","100%","50%","50%","50%"]} mt={5} borderRadius={"25px"} boxShadow={ "rgba(0, 0, 0, 0.24) 0px 3px 8px"} py={2} px={4}>
            <Flex>
              <Flex mb={2}>
                <CiLocationOn fontSize={"25px"} color="black"/> <Heading  fontSize={["15px","15px","15px","20px","20px"]}>{items.adresse}</Heading>
              </Flex>
            </Flex>
      <AspectRatio ratio={ {base: 16/6, lg: 16/5} }>
  <iframe
    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAoJQLE8uAbWnyPHCv-_udEUhH7HQooJlM&q=${items.adresse}`}
  />
</AspectRatio>
      </Box>
      </Center>
          </DrawerBody>
        </DrawerContent>
      </Drawer>



      </>
    );
  } else {
    return <></>;
  }
}
function Regle({ items, email,id }) {
  // console.log(items.Status);
  if (items.email == email && items.status == "Validé") {
    return (
     <>
    <Box mb={5}>
        <Flex>
          <Box width={["30%","30%","20%","10%","10%"]}><Image src={items.imageMag} alt="image restaurant" width={"100px"} height={"100px"}/> </Box>
          <Box width={["60%","60%","40%","40%","40%"]} >
            <Heading>{items.magasin}</Heading>
            <Badge  borderRadius='full' px='2' colorScheme='green'>{items.status}</Badge>
            <Text>ref : {id}</Text>
          </Box>
          {/* <Box mt={10}>
            <ArrowRightIcon/>
          </Box> */}
        </Flex>
        <Flex mt={5} py={2} px={4} bgColor={"gray.100"} borderRadius={"25px"} border={"1px solid black"} justifyContent={"space-evenly"} width={["100%","100%","60%","50%","50%"]}>
          <Flex>
            <CalendarIcon mr={2} mt={1}/><Text>{items.dateReservation}</Text>
          </Flex>
          <Flex>
            <Box  mr={2} mt={1}>
            <BsClock /></Box>
            <Text>{items.heureReservation}</Text>
          </Flex>
          <Flex>
          <Box  mr={2} mt={1}>
            <BsPerson mr={2} mt={1}/>
            </Box>
            <Text>{items.nbrePerson}</Text>
          </Flex>
        </Flex>
     

      </Box>
     
      </>
    );
  } else {
    return <></>;
  }
}

export default function HistRes() {


  const [commandeListe, setCommandeListe] = useState([]);
  const [email, setEmail] = useState();
  const [id, setId] = useState([]);
  const [inde, setInde] = useState();
  const router = useRouter()
  const Getall = async () => {
    const starCountRef = ref(db2, "Reservation/");
    onValue(starCountRef, (snapshot) => {
      setCommandeListe(snapshot.val());
      if (snapshot.val() != undefined || snapshot.val() != null) {
        setId(Object.keys(snapshot.val()));
      }

      // console.log(snapshot.val())
    });
  };

  useEffect(() => {
    onAuthStateChanged(authentic, (user) => {
      if (!user) {
        router.push("/Choose");
        router.reload()
      }
    });
    Getall();
    setEmail(sessionStorage.getItem("email"));

    setInde(parseInt(secureLocalStorage.index));
  }, [setCommandeListe,router]);
  const [isLagerThan768] = useMediaQuery("(min-width: 768px)");

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
        <Box display={{base:"grid",lg:"none"}}>
        <InputBar />
        {isLagerThan768 ? <Navbar></Navbar> : <></>}
        </Box>
      <Center width="100%">
        <Tabs
          isManual
          orientation={["horizontal","horizontal","horizontal","vertical","vertical"]}
          variant="outfitted"
          isLazy
          w={"100% "}
          // defaultIndex={1}
          mt={10}
        >
         
          <TabPanels>
            <TabPanel>
              <Tabs isManual isLazy  w={"100% "}>
                <TabList>
                  <Tab>Reservation en cours</Tab>
                  
                  <Tab>Reservation validés</Tab>
                  <Tab>Reservation annulés</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <Box >
                      {commandeListe ? (
                        Object.values(commandeListe).map((items,index) => (
                          <Launch
                            key={items.key}
                            items={items}
                            id={id[index]}
                            email={email}
                          />
                        ))
                      ) : (
                        <Box>Aucune donnee</Box>
                      )}
                    </Box>
                   
                  </TabPanel>
                 
                  <TabPanel>
                    
                    <Box >
                      {commandeListe ? (
                        Object.values(commandeListe).map((items,index) => (
                          <Regle
                            key={items.key}
                            items={items}
                            id={id[index]}
                            email={email}
                          />
                        ))
                      ) : (
                        <Box>Aucune donnee</Box>
                      )}
                    </Box>
                  </TabPanel>
                  <TabPanel>
                  <Box >
                    {commandeListe ? (
              Object.values(commandeListe).map((items,index) => (
                <Cancel key={items.key} items={items} id={id[index]} email={email} />
              ))
            ) : (
              <Box>Aucune donnee</Box>
            )}
            </Box>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </TabPanel>
           
          </TabPanels>
        </Tabs>
      </Center>
 
    </>
  );
}
