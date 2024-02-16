import { authentic, db2 } from "@/FIREBASE/clientApp";
import {
  Badge,
  Box,
  Button,
  Center,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
  useMediaQuery,
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
import HistDev from "./HistDev";
import HistRest from "./HistRes";
import Head from "next/head";
function Cancel2(id, state) {
  // console.log(id);
  update(ref(db2, "Commandes/" + String(id)), {
    status: state,
  });
}

function Valide({ items, email }) {
  // console.log(items.Status);
  const { isOpen, onOpen, onClose } = useDisclosure()
  if (items.status == "Validé" && items.email == email) {
    return (
      <>
      <Box
      mt={2}
        maxW="full"
        maxH={"170px"}
        display={"flex"}
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden" 
        onClick={onOpen}
      >
        <Image src={"./image.jpeg"} alt={"Representant commande"} h="170px" w={"170px"}/>

        <Box p="2">
          <Box display="flex" alignItems="baseline">
            <Badge borderRadius="full" px="2" colorScheme="green">
              {items.status}
            </Badge>
          </Box>

          <Box
            mt="1"
            fontWeight="light"
           as={Text}
            lineHeight="tight"
            fontSize={[14,14,14,15,15]}
            noOfLines={2}
          >
            {items.commandeId}
          </Box>
          <Box
          fontSize={[14,14,14,15,15]}
            mt="1"
            fontWeight="light"
            as="h4"
            lineHeight="tight"
            noOfLines={1}
          >
            {items.email}
          </Box>
          <Flex fontSize={[14,14,14,15,15]}>
          <Box mr={10}
            mt="1"
            fontWeight="light"
            as="h4"
            lineHeight="tight"
            noOfLines={1}
          >
            {items.dateCommande}
          </Box>
          <Box fontSize={[14,14,14,15,15]}  mt="1">
            {items.totalPrice? items.totalPrice : (items.Prix? items.Prix : "0") + " "}
            <Box as="span" color="gray.600" fontSize="sm">
              €
            </Box>
          </Box>
          </Flex>
         
          
        </Box>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Liste des produits</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
            {(items.cartlist).map((item,index) =>{
              return(
                <>
                  <Box
      mt={2}
        maxW="full"
        maxH={"190px"}
        display={"flex"}
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden" 
       
      >
        <Image src={item.orderImageUrl[0]} alt={item.orderName} h="170px" w={"170px"}/>

        <Box p="2">
          {/* <Box display="flex" alignItems="baseline">
            <Badge borderRadius="full" px="2" colorScheme="blue">
              {items.status}
            </Badge>
          </Box> */}

          <Box
            mt="1"
            fontWeight="semibold"
           as={Text}
            lineHeight="tight"
            fontSize={[14,14,14,15,15]}
            noOfLines={2}
          >
            {item.orderName} 
          </Box>
          <Box
          fontSize={[14,14,14,15,15]}
            mt="1"
            fontWeight="light"
            as="h4"
            lineHeight="tight"
            noOfLines={3}
          >
           {item.orderDescription} 
          </Box>
          <Flex display={"grid"} fontSize={[14,14,14,15,15]}>
          <Box display={"flex"} mr={2}
            mt="1"
           
            as="h4"
            lineHeight="tight"
            noOfLines={2}
          >
            <Text>Quantité : {item.orderQte}</Text>
            
          </Box>
          <Box display={"flex"}  fontSize={[14,14,14,15,15]}  mt="1" mr={2}>
            <Text>Prix unitaire: </Text>
            { (item.orderPrice )}
            <Box as="span" color="gray.600" fontSize="sm">
              €
            </Box>
          </Box>
          <Box display={"flex"}  fontSize={[14,14,14,15,15]}  mt="1">
            <Text>Prix : </Text>
            { (item.orderPrice * item.orderQte)}
            <Box as="span" color="gray.600" fontSize="sm">
              €
            </Box>
          </Box>
          </Flex>
         
         
        </Box>
      </Box>
                </>
              )
            })}
        </ModalBody>

        <ModalFooter>
          <Button  variant='ghost' mr={3} onClick={onClose}>
            Fermer
          </Button>
         
        </ModalFooter>
      </ModalContent>
    </Modal>
    </>
    );
  } else {
    return <></>;
  }
}
function Cancel({ items, email }) {
  // console.log(items.Status);
  const { isOpen, onOpen, onClose } = useDisclosure()
  if (items.status == "Annulé" && items.email == email) {
    return (
      <>
        <Box
        mt={2}
          maxW="full"
          maxH={"170px"}
          display={"flex"}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden" 
          onClick={onOpen}
        >
          <Image src={"./image.jpeg"} alt={"Representant commande"} h="170px" w={"170px"}/>

          <Box p="2">
            <Box display="flex" alignItems="baseline">
              <Badge borderRadius="full" px="2" colorScheme="red">
                {items.status}
              </Badge>
            </Box>

            <Box
              mt="1"
              fontWeight="light"
             as={Text}
              lineHeight="tight"
              fontSize={[14,14,14,15,15]}
              noOfLines={2}
            >
              {items.commandeId}
            </Box>
            <Box
            fontSize={[14,14,14,15,15]}
              mt="1"
              fontWeight="light"
              as="h4"
              lineHeight="tight"
              noOfLines={1}
            >
              {items.email}
            </Box>
            <Flex fontSize={[14,14,14,15,15]}>
            <Box mr={10}
              mt="1"
              fontWeight="light"
              as="h4"
              lineHeight="tight"
              noOfLines={1}
            >
             {items.dateCommande}
            </Box>
            <Box fontSize={[14,14,14,15,15]}  mt="1">
              {items.totalPrice? items.totalPrice : (items.Prix? items.Prix : "0") + " "}
              <Box as="span" color="gray.600" fontSize="sm">
                €
              </Box>
            </Box>
            </Flex>
           
            
          </Box>
        </Box>
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Liste des produits</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
              {(items.cartlist).map((item,index) =>{
                return(
                  <>
                    <Box
        mt={2}
          maxW="full"
          maxH={"190px"}
          display={"flex"}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden" 
         
        >
          <Image src={item.orderImageUrl[0]} alt={item.orderName} h="170px" w={"170px"}/>

          <Box p="2">
            {/* <Box display="flex" alignItems="baseline">
              <Badge borderRadius="full" px="2" colorScheme="blue">
                {items.status}
              </Badge>
            </Box> */}

            <Box
              mt="1"
              fontWeight="semibold"
             as={Text}
              lineHeight="tight"
              fontSize={[14,14,14,15,15]}
              noOfLines={2}
            >
              {item.orderName} 
            </Box>
            <Box
            fontSize={[14,14,14,15,15]}
              mt="1"
              fontWeight="light"
              as="h4"
              lineHeight="tight"
              noOfLines={3}
            >
             {item.orderDescription} 
            </Box>
            <Flex display={"grid"} fontSize={[14,14,14,15,15]}>
            <Box display={"flex"} mr={2}
              mt="1"
             
              as="h4"
              lineHeight="tight"
              noOfLines={2}
            >
              <Text>Quantité : {item.orderQte}</Text>
              
            </Box>
            <Box display={"flex"}  fontSize={[14,14,14,15,15]}  mt="1" mr={2}>
              <Text>Prix unitaire: </Text>
              { (item.orderPrice )}
              <Box as="span" color="gray.600" fontSize="sm">
                €
              </Box>
            </Box>
            <Box display={"flex"}  fontSize={[14,14,14,15,15]}  mt="1">
              <Text>Prix : </Text>
              { (item.orderPrice * item.orderQte)}
              <Box as="span" color="gray.600" fontSize="sm">
                €
              </Box>
            </Box>
            </Flex>
           
           
          </Box>
        </Box>
                  </>
                )
              })}
          </ModalBody>

          <ModalFooter>
            <Button  variant='ghost' mr={3} onClick={onClose}>
              Fermer
            </Button>
           
          </ModalFooter>
        </ModalContent>
      </Modal>
      </>
    );
  } else {
    return <></>;
  }
}
function Launch({ items, email,id }) {
  // console.log(items);
  const { isOpen, onOpen, onClose } = useDisclosure()
  if (items.status == "En cours" && items.email == email) {
    return (
      <>
        <Box
        mt={2}
          maxW="full"
          maxH={"170px"}
          display={"flex"}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden" 
          onClick={onOpen}
        >
          <Image src={"./image.jpeg"} alt={"Representant commande"} h="170px" w={"170px"}/>

          <Box p="2">
            <Box display="flex" alignItems="baseline">
              <Badge borderRadius="full" px="2" colorScheme="blue">
                {items.status}
              </Badge>
            </Box>

            <Box
              mt="1"
              fontWeight="light"
             as={Text}
              lineHeight="tight"
              fontSize={[14,14,14,15,15]}
              noOfLines={2}
            >
              {items.commandeId}
            </Box>
            <Box
            fontSize={[14,14,14,15,15]}
              mt="1"
              fontWeight="light"
              as="h4"
              lineHeight="tight"
              noOfLines={1}
            >
              {items.email}
            </Box>
            <Flex fontSize={[14,14,14,15,15]}>
            <Box mr={10}
              mt="1"
              fontWeight="light"
              as="h4"
              lineHeight="tight"
              noOfLines={1}
            >
              {items.dateCommande}
            </Box>
            <Box fontSize={[14,14,14,15,15]}  mt="1">
              {items.totalPrice? items.totalPrice : (items.Prix? items.Prix : "0") + " "}
              <Box as="span" color="gray.600" fontSize="sm">
                €
              </Box>
            </Box>
            </Flex>
           
            <Box >
              <Button bgColor={'red.500'} _hover={{
                bgColor:'#FF6969'
              }} color={'white'} onClick={() => Cancel2(id, "Annulé")}>
                Annuler
              </Button>
            </Box>
          </Box>
        </Box>
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Liste des produits</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
              {(items.cartlist).map((item,index) =>{
                return(
                  <>
                    <Box
        mt={2}
          maxW="full"
          maxH={"190px"}
          display={"flex"}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden" 
         
        >
          <Image src={item.orderImageUrl[0]} alt={item.orderName} h="170px" w={"170px"}/>

          <Box p="2">
            {/* <Box display="flex" alignItems="baseline">
              <Badge borderRadius="full" px="2" colorScheme="blue">
                {items.status}
              </Badge>
            </Box> */}

            <Box
              mt="1"
              fontWeight="semibold"
             as={Text}
              lineHeight="tight"
              fontSize={[14,14,14,15,15]}
              noOfLines={2}
            >
              {item.orderName} 
            </Box>
            <Box
            fontSize={[14,14,14,15,15]}
              mt="1"
              fontWeight="light"
              as="h4"
              lineHeight="tight"
              noOfLines={3}
            >
             {item.orderDescription} 
            </Box>
            <Flex display={"grid"} fontSize={[14,14,14,15,15]}>
            <Box display={"flex"} mr={2}
              mt="1"
             
              as="h4"
              lineHeight="tight"
              noOfLines={2}
            >
              <Text>Quantité : {item.orderQte}</Text>
              
            </Box>
            <Box display={"flex"}  fontSize={[14,14,14,15,15]}  mt="1" mr={2}>
              <Text>Prix unitaire: </Text>
              { (item.orderPrice )}
              <Box as="span" color="gray.600" fontSize="sm">
                €
              </Box>
            </Box>
            <Box display={"flex"}  fontSize={[14,14,14,15,15]}  mt="1">
              <Text>Prix : </Text>
              { (item.orderPrice * item.orderQte)}
              <Box as="span" color="gray.600" fontSize="sm">
                €
              </Box>
            </Box>
            </Flex>
           
           
          </Box>
        </Box>
                  </>
                )
              })}
          </ModalBody>

          <ModalFooter>
            <Button  variant='ghost' mr={3} onClick={onClose}>
              Fermer
            </Button>
           
          </ModalFooter>
        </ModalContent>
      </Modal>
      </>
    );
  } else {
    return <></>;
  }
}

export default function Commande() {
  const [commandeListe, setCommandeListe] = useState([]);
  const [email, setEmail] = useState();
  const [id, setId] = useState([]);
  const [inde, setInde] = useState();
  const router = useRouter()
  const Getall = async () => {
    const starCountRef = ref(db2, "Commandes/");
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
      <InputBar />
      {isLagerThan768 ? <Navbar></Navbar> : <></>}
      {/* <Box width="100%">
        {commandeListe ? (
          Object.values(commandeListe).map((items) => (
            <Valide key={items.key} items={items} id={id} email={email} />
          ))
        ) : (
          <Box>Aucune donnee</Box>
        )} */}
      {/* </Box> */}
      {/* <Center width="100%"> */}
        <Tabs
          isManual
          orientation={["horizontal","horizontal","horizontal","vertical","vertical"]}
          variant="outfitted"
          isLazy
          w={"100%"}
          // defaultIndex={1}
          mt={10}
        >
          <Center>
          <TabList width={"fit-content"} h={"10em"} display={{base: "none", lg: "flex"}} >
            <SimpleGrid columns={[2,2,2,4,4]}>
            <Tab id="Commandes"> Mes commandes</Tab>
            <Tab id="Devis"> Mes devis</Tab>
            <Tab id="Devis"> Mes reservations</Tab>
            <Tab id="Compte" >
              Mes informations
            </Tab>
            </SimpleGrid>
          </TabList>

          </Center>
          <TabPanels>
            <TabPanel>
              <Tabs isManual isLazy  w={"100% "}>
                <TabList>
                  <Tab>Commandes en cours</Tab>
                  <Tab>Commandes validé(s)</Tab>
                  <Tab>Commandes annulé(s)</Tab>
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
                        Object.values(commandeListe).map((items) => (
                          <Valide
                            key={items.key}
                            items={items}
                            id={id}
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
              Object.values(commandeListe).map((items) => (
                <Cancel key={items.key} items={items} email={email} />
              ))
            ) : (
              <Box>Aucune donnee</Box>
            )}
            </Box>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </TabPanel>
            <TabPanel>
              <HistDev/>
            </TabPanel>
            <TabPanel>
              <HistRest />
            </TabPanel>
            <TabPanel>
              <Profiles />
            </TabPanel>
          </TabPanels>
        </Tabs>
      {/* </Center> */}
      <FooterR />
    </>
  );
}
//TODO Remove tabs for mobile
//FIXME Fix order price view