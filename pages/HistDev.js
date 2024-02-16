import { authentic, db2 } from "@/FIREBASE/clientApp";
import {
  Badge,
  Box,
  Button,
  Center,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Image,
  RadioGroup,
Radio,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
  useMediaQuery,
  SimpleGrid,
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
import { PayPalButtons } from "@paypal/react-paypal-js";
import Head from "next/head";

function Cancel2(id, state) {
  // console.log(id);
  update(ref(db2, "DevisPerso/" + String(id)), {
    status: state,
  });
}
function Valide2(id, state) {
  // console.log(id);
  update(ref(db2, "DevisPerso/" + String(id)), {
    Status: state,
  });
}
function Paiement(id, state) {
  // console.log(id);
  const date=  new Date();
  if(state=="Espéces"){
    update(ref(db2, "DevisPerso/" + String(id)), {
      Paiement: state,
      status : "Reglé",
      PayerLe : "transaction non soldé/en vérification"
    });
  }
  else{
    update(ref(db2, "DevisPerso/" + String(id)), {
      Paiement: state,
      PayerLe: `${date.getUTCDate()}/${date.getUTCMonth()}/${date.getUTCFullYear()}`,
      status : "Reglé"
    });
  }
 
}


function Valide({ items, email,id }) {
  const {onOpen,onClose,isOpen} = useDisclosure()
  const [isOpenModal1, setIsOpenModal1] = useState(false);
  const toggleModal1 = () => setIsOpenModal1(!isOpenModal1);

  const [payp,setPayp] = useState("none");
  const [esp,setEsp] = useState("")


  if (items.status == "Validé" && items.email == email) {
    return (
      <>
        <Box
        mt={2}
          maxW="fit-content"
          maxH={"fit-content"}
          display={["grid","grid","grid","flex","flex"]}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden" 
        >
          <Image src={"./Valide.png"} alt={items.nom} h="150px" w="150px"/>

          <Box p="6">
            <Box display="flex" alignItems="baseline">
              <Badge borderRadius="full" px="2" colorScheme="blue">
                {items.Status}
              </Badge>
              <Badge borderRadius="full" px="2" colorScheme="green">
                {items.partenaire}
              </Badge>
              <Badge borderRadius="full" px="2" colorScheme="cyan">
                {items.moyen}
              </Badge> 
            </Box>

            <Box
              mt="1"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              
            > <Text> {id }</Text>
            <Text> Numéro : {items.numero ? items.numero : "introuvable"}</Text>
             <Flex><Text mr={2}>Départ : </Text>{items.depart}</Flex>
             <Flex><Text mr={2}>Arrivé : </Text>{items.arrive}</Flex>
            </Box>

            <Box>
              {items.total + " "}
              <Box as="span" color="gray.600" fontSize="sm">
                €
              </Box>
            </Box>
            <Box>
              <Button bgColor={'facebook.700'} _hover={{
                bgColor:'messenger'
              }} color={'white'} onClick={()=>onOpen()}>
                Payer
              </Button>
            </Box>
          
            <Drawer isOpen={isOpen} onClose={onClose} size={"full"}>
              <DrawerOverlay/>
              <DrawerContent>
              <Center> <DrawerHeader width={"fit-content"} mt={10}>Validation du devis N°{id}</DrawerHeader></Center>
                <DrawerCloseButton fontSize={"30px"}/>
                <DrawerBody>
                  { items.produit ?
                  items.produit.map((data,index)=>(
                    <>
                    
                    <Box width={"80%"}>
                    <Flex justifyContent={"space-between"}>
                      {data.length  == 3 ? <>
                      <Text fontWeight={600} my={5}>Colis{index+1}</Text>
                      <Text>Description</Text>
                        
                        <Text>Valeur</Text>
                        <Text>poids</Text></>: <> 
                       
                        </>}
                      </Flex>
                    <Flex justifyContent={"space-between"}>
                     {data.length ==3 ?  <>
                      <Text>{}</Text> 
                      <Text>{data[0].value ? data[0].value : "Non renseigné" }</Text>
                      <Text>{data[1].value ? data[1].value : "Non renseigné" }</Text>
                      <Text>{data[2].value ? data[2].value : "Non renseigné" }</Text>
                      </>:<>
                     
                      </>}
                    
                    </Flex>
                    </Box>
                    </>
                  )): 
                  <>  </>}
                   <Box >
                    
                      {items.contenant ? 
                      items.contenant.map((data,index)=>(
                        <>
                         <Text fontWeight={600} my={5}>Colis{index+1}</Text>
                        <Flex justifyContent={"space-between"}>
                        
                         
                        <Text fontWeight={"medium"}>Contenant</Text>
                        
                    
                        <Text  fontWeight={"medium"}>Prix envoi</Text>
                        <Text  fontWeight={"medium"}>Prix du materiel</Text>
                        <Text fontWeight={"medium"}>Besoin du materiel</Text>
                        </Flex>
                        <Flex justifyContent={"space-between"}>
                          <Text>{data.id }</Text>
                          <Text>{data.envoi }</Text>
                          <Text>{data.prix }</Text>
                         
                         
                      
                          <Text>{items.besoin[index].besoin == 0 ? "non":`oui` }</Text>
                        
                          </Flex>

                    
                          </>
                      )): <></>}
                     
                     </Box>
                </DrawerBody>
               <DrawerFooter>
                <Box>
                <Text>Total a payer : {' ' + items.total }€</Text>
                <Button bgColor={"blue"} onClick={toggleModal1}>Payer</Button>
                <Modal  isOpen={isOpenModal1} onClose={toggleModal1}>
                  <ModalOverlay/>
                  <ModalContent>
                  {items.moyen == "Maritime" ?<></> : <ModalHeader>Especes/Paypal</ModalHeader>} 
                    <ModalCloseButton/>
                    <ModalBody>
                        <RadioGroup justifyContent={"space-between"}>
                          <Radio value={"1"}onClick={()=>{setPayp("none"),setEsp("Espéces")}} mr={10} >Espèces</Radio>
                          <Radio value={"2"}onClick={()=>{setPayp("grid"),setEsp("Paypal")}}>Paypal</Radio>
                        </RadioGroup>
                        <Box display={payp}>
                        <PayPalButtons
                                    
                                    
                                    createOrder={(data, actions) => {
                                      return actions.order.create({
                                        purchase_units: [
                                          {
                                            amount: {
                                              value: `${items.total}`,
                                            },
                                          },
                                        ],
                                      });
                                    }}
                                    onApprove={(data, actions) => {
                                      return actions.order
                                        .capture()
                                        .then((details) => {
                                          const name =
                                            details.payer.name.given_name;
                                            Paiement(id, esp);
                                          toggleModal1;
                                          
                                        });
                                    }}
                                  />
                        </Box>
                       
                    </ModalBody>
                    <ModalFooter>
                      <Button onClick={toggleModal1} mr={5}>Close</Button>
                      <Button onClick={()=>{ Paiement(id, esp)}} color={"white"} bgColor={"messenger.700"} _hover={{
                        bgColor:"messenger.500"
                      }}>Valider</Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
                </Box>
               </DrawerFooter>
              </DrawerContent>
           </Drawer>
          </Box>      
        </Box>
    </>
    );
  } else {
    return <></>;
  }
}
function Cancel({ items, email,id }) {
  // console.log(items.Status);
  if (items.status == "Annulé" && items.email == email) {
    return (
     <>
          <Box
        mt={2}
          maxW="fit-content"
          maxH={"fit-content"}
          display={["grid","grid","grid","flex","flex"]}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden" 
        >
          <Image src={"./Annule.png"} alt={items.nom} h="150px" w="150px"/>

          <Box p="6">
            <Box display="flex" alignItems="baseline">
              <Badge borderRadius="full" px="2" colorScheme="blue">
                {items.Status}
              </Badge>
              <Badge borderRadius="full" px="2" colorScheme="green">
                {items.partenaire}
              </Badge>
              <Badge borderRadius="full" px="2" colorScheme="cyan">
                {items.moyen}
              </Badge> 
            </Box>

            <Box
              mt="1"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              
            >
               <Text>{id}</Text>
               <Text> Numéro : {items.numero ? items.numero : "introuvable"}</Text>
             <Flex><Text mr={2}>Depart : </Text>{items.depart}</Flex>
             <Flex><Text mr={2}>Arrivé : </Text>{items.arrive}</Flex>
            </Box>

            <Box>
              {items.total + " "}
              <Box as="span" color="gray.600" fontSize="sm">
                €
              </Box>
            </Box>
           
           
          </Box>      
        </Box>
      </>
    );
  } else {
    return <></>;
  }
}
function Launch({ items, email,id }) {
  // console.log(items);
  if (items.status == "En cours" && items.email == email) {
    return (
      <>
          <Box
        mt={2}
          maxW="fit-content"
          maxH={"fit-content"}
          display={["grid","grid","grid","flex","flex"]}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden" 
        >
          <Box alignItems={["center","center","center","normal","normal"]}>
          <Image src={"./En cours.png"} alt={items.nom} h="150px" w="150px"/>
          </Box>
          <Box p="6" width={"fit-content"}>
            <Box display="flex" alignItems="baseline">
              <Badge borderRadius="full" px="2" colorScheme="blue">
                {items.Status}
              </Badge>
              <Badge borderRadius="full" px="2" colorScheme="green">
                {items.partenaire}
              </Badge>
              <Badge borderRadius="full" px="2" colorScheme="cyan">
                {items.moyen}
              </Badge> 
            </Box>
        
            <Box
              mt="1"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              
            >
              <Text>{id}</Text>
              <Text> Numéro : {items.numero ? items.numero : "introuvable"}</Text>
             <Flex><Text mr={2}>Depart : </Text>{items.depart}</Flex>
             <Flex><Text mr={2}>Arrivé : </Text>{items.arrive}</Flex>
            </Box>

            <Box>
              {items.total + " "}
              <Box as="span" color="gray.600" fontSize="sm">
                €
              </Box>
            </Box>
            <Box>
              <Button bgColor={'red.500'} _hover={{
                bgColor:'#FF6969'
              }} color={'white'} onClick={() => Cancel2(id, "Annulé")}>
                Annuler
              </Button>
            </Box>
           
          </Box>      
        </Box>
      </>
    );
  } else {
    return <></>;
  }
}
function Regle({ items, email,id }) {
  // console.log(items.Status);
  if (items.status == "Reglé" && items.email == email) {
    return (
     <>
        <Box
        mt={2}
          maxW="fit-content"
          maxH={"fit-content"}
          display={["grid","grid","grid","flex","flex"]}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden" 
        >
          <Image src={"./Regle.jpg"} alt={items.nom} h="150px" w="150px"/>

          <Box p="6">
            <Box display="flex" alignItems="baseline">
              <Badge borderRadius="full" px="2" colorScheme="blue">
                {items.Status}
              </Badge>
              <Badge borderRadius="full" px="2" colorScheme="green">
                {items.partenaire}
              </Badge>
              <Badge borderRadius="full" px="2" colorScheme="cyan">
                {items.moyen}
              </Badge> 
            </Box>

            <Box
              mt="1"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              
            >
               <Text>{id}</Text>
               <Text> Numéro : {items.numero ? items.numero : "introuvable"}</Text>
             <Flex><Text mr={2}>Depart : </Text>{items.depart}</Flex>
             <Flex><Text mr={2}>Arrivé : </Text>{items.arrive}</Flex>
             <Flex><Text mr={2}>Remarque : </Text>{items.PayerLe}</Flex>
            </Box>

            <Box>
              {items.total + " "}
              <Box as="span" color="gray.600" fontSize="sm">
                €
              </Box>
            </Box>
           
           
          </Box>      
        </Box>
      </>
    );
  } else {
    return <></>;
  }
}

export default function HistDev() {
  const [commandeListe, setCommandeListe] = useState([]);
  const [email, setEmail] = useState();
  const [id, setId] = useState([]);
  const [inde, setInde] = useState();
  const router = useRouter()
  const Getall = async () => {
    const starCountRef = ref(db2, "DevisPerso/");
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
       <Box>
       <Text fontSize={"15px"} ml={5} display={{base:"block",lg:"none"}} fontWeight={600}>Mes devis</Text>
        <Tabs
          isManual
          orientation={["horizontal","horizontal","horizontal","vertical","vertical"]}
          variant="outfitted"
          isLazy
          w={"100% "}
          // defaultIndex={1}
         
        >
         
          <TabPanels>
            <TabPanel>
              <Tabs isManual isLazy  w={"100% "}>
                <TabList>
                  <Tab>Devis en cours</Tab>
                  <Tab>Devis validés</Tab>
                  <Tab>Devis reglés</Tab>
                  <Tab>Devis annulés</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <Box >
                      <SimpleGrid columns={[1,1,1,3,3]}>
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
                      )}</SimpleGrid>
                    </Box>
                   
                  </TabPanel>
                  <TabPanel>
                   <Box >
                    <SimpleGrid columns={[1,1,1,3,3]}>
                      {commandeListe ? (
                        Object.values(commandeListe).map((items,index) => (
                          <Valide
                            key={items.key}
                            items={items}
                            id={id[index]}
                            email={email}
                          />
                        ))
                      ) : (
                        <Box>Aucune donnee</Box>
                      )}</SimpleGrid>
                    </Box>
                  </TabPanel>
                  <TabPanel>
                    
                    <Box >
                      <SimpleGrid columns={[1,1,1,3,3]}>
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
                      )}</SimpleGrid>
                    </Box>
                  </TabPanel>
                  <TabPanel>
                  <Box >
                    <SimpleGrid columns={[1,1,1,2,2]}>
                    {commandeListe ? (
              Object.values(commandeListe).map((items,index) => (
                <Cancel key={items.key} items={items} id={id[index]} email={email} />
              ))
            ) : (
              <Box>Aucune donnee</Box>
            )}</SimpleGrid>
            </Box>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </TabPanel>
           
          </TabPanels>
        </Tabs>
       </Box>
      <Center  mt={10} width="100%" display={{base:"grid",lg:"none"}}>
      <Text fontSize={"15px"} ml={5} display={{base:"block",lg:"none"}} fontWeight={600}>Mes devis</Text>
        <Tabs
          isManual
          orientation={["horizontal","horizontal","horizontal","vertical","vertical"]}
          variant="outfitted"
          isLazy
          w={"100% "}
          // defaultIndex={1}
         
        >
         
          <TabPanels>
            <TabPanel>
              <Tabs isManual isLazy  w={"100% "}>
                <TabList>
                  <Tab>Devis en cours</Tab>
                  <Tab>Devis validés</Tab>
                  <Tab>Devis reglés</Tab>
                  <Tab>Devis annulés</Tab>
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
                          <Valide
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
