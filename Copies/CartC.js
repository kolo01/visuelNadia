import {
  Box,
  Center,
  Flex,
  Text,
  Image,
  Button,
  Input,
  Heading,
  Icon,
  SimpleGrid,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  InputGroup,
  FormControl,
  FormLabel,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Radio,
  RadioGroup,
  Stack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Code,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import FooterR from "./footerResponsif";
import { useRouter } from "next/router";
import { FaTrashAlt } from "react-icons/fa";
import { ref as rf, set, push,serverTimestamp } from "@firebase/database";
import { db, db2 } from "@/FIREBASE/clientApp";
import { PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import { BsCashCoin, BsPaypal } from "react-icons/bs";
import secureLocalStorage from "react-secure-storage";
import { collection, deleteDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { getCartsByUserId } from "./getcart";
import {usePathname} from 'next/navigation'
import sha256 from 'crypto-js/sha256';
import CryptoJS from "crypto-js";


export default function Carte() {
  const toast = useToast();
  const router = useRouter();

  ///Variable d'affichage
  const [sect1, setSect1] = useState("none");
  const [sect2, setSect2] = useState("none");
  const [sect4, setSect4] = useState("none");
  const [sect3, setSect3] = useState("none");

  //fin

  ///// variable du drawner
  const [moyen, setMoyen] = useState("");
 
  const [day, setDay] = useState("");
  const [hours, setHours] = useState("");
  const [way, setWay] = useState("");
  // const [lieu,setLieu]= useState("")
  const [rue, setRue] = useState("NON DEFINI");
  const [postal, setPostal] = useState("NON DEFINI");
  const [ville, setVille] = useState("non renseigner");
  const [batiment, setBatiment] = useState("NON DEFINI");

  ////fin
  const [email,setEmail] = useState("")
  const [cart, setCart] = useState([]);
  const [lieu, setLieu] = useState(" NON DEFINI");
  const [numero, setNumero] = useState("NON DEFINI ");
  const [nom, setNom] = useState(" NON DEFINI");
  const [prix, setPrix] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const path =usePathname()
 

  const [frais, setFrais] = useState();
  const [dis, setDis] = useState();
  const [month2, setMonth2] = useState("");
  const [day2, setDay2] = useState("");

  ////ACCESS AU PANIER
  const getCart2 = async (email)=>{
    try {
      const cartRef = collection(db, 'orders'); // Assurez-vous que la collection est correcte.
      const q = query(cartRef, where('email', '==', email));
  
      const querySnapshot = await getDocs(q);
      if (querySnapshot.size >= 1) {
        const cartDoc = querySnapshot.docs;
        const po = secureLocalStorage.getItem("po")
        // console.log("po",po)
        let PrixT = 0;
        
        const All = cartDoc;
    
        
        if (All != null) {
          All.map((data, index) => {
            PrixT = parseFloat(data.data().orderPrice) + PrixT;
          });
          setPrix(PrixT);
        }
        if (PrixT <= 30) {
          setDis("grid");
          (po.slice(0, 2) == 91 ||
          po.slice(0, 2) == 94 ||
          po.slice(0, 2) == 93 ||
          po.slice(0, 2) == 92 ||
          po.slice(0, 2) == 78 ||
          po.slice(0, 2) == 77 ||
          po.slice(0, 2) == 75) ?setFrais("2.99") : setFrais("5.99");
          
        } else {
          setDis("grid");
          if (PrixT < 40 && PrixT > 29) {
            setFrais((PrixT * 10) / 100);
          } else {
            if (PrixT < 51) {
              setFrais((PrixT * 9) / 100);
            } else {
              if (PrixT < 71) {
                setFrais((PrixT * 8) / 100);
              } else {
                if (PrixT < 81) {
                  setFrais((PrixT * 7) / 100);
                } else {
                  if (PrixT < 91) {
                    setFrais((PrixT * 6) / 100);
                  } else {
                    if (90 < PrixT) {
                      setFrais((PrixT * 5) / 100);
                    }
                  }
                }
              }
            }
          }
        }
    
        secureLocalStorage.setItem("prix", PrixT);
      
        return cartDoc;
      } else {
        return null; // Aucun panier trouvé pour cet utilisateur.
      }
    } catch (error) {
      console.error("Erreur lors de la récupération du panier :", error);
      return null;
    }
}


  ///

const DeleteProduct = async (product)=>{
  try{
    const cartRef = collection(db, 'orders'); // Supposons que la collection se nomme 'carts'.
  const q = query(cartRef, where('email', '==', email),where("productId", '==' , product));
  const querySnapshot = await getDocs(q);
  const cartDoc = querySnapshot.docs[0]; 
  await deleteDoc(cartDoc.ref)
  router.replace(path)
  }catch(error){
    toast({
      title: "Veuillez reesayer!!!",

      status: "error",
      duration: 9000,
      isClosable: true,
    });
  }
  
}

const DeleteAll = async ()=>{
  try{
    console.log(email)
    const cartRef = collection(db, 'orders'); // Supposons que la collection se nomme 'carts'.
  const q = query(cartRef, where('email', '==', email));
  const querySnapshot = await getDocs(q);
  const size = querySnapshot.size
  querySnapshot.docs.map(async (data,index)=>{
    await deleteDoc(data.ref)
  })
  // const cartDoc = querySnapshot.docs[0]; 
  toast({
    title: "Merci pour votre confiance!!!",

    status: "success",
    duration: 9000,
    isClosable: true,
  });
  router.replace(path)
  }catch(error){
    toast({
      title: "Veuillez reesayer!!!",

      status: "error",
      duration: 9000,
      isClosable: true,
    });
  }
  
}


const Increment = async (product)=>{
  try{
    const cartRef = collection(db, 'orders'); // Supposons que la collection se nomme 'carts'.
  const q = query(cartRef, where('email', '==', email),where("productId", '==' , product));
  const querySnapshot = await getDocs(q);
  const cartDoc = querySnapshot.docs[0]; 
  await updateDoc(cartDoc.ref,{orderQte:querySnapshot.docs[0].data().orderQte+1})
  router.replace(path)
  }catch(error){
    toast({
      title: "Veuillez reesayer!!!",

      status: "error",
      duration: 9000,
      isClosable: true,
    });
  }
}

const Decrement = async (product)=>{
  try{
    const cartRef = collection(db, 'orders'); // Supposons que la collection se nomme 'carts'.
  const q = query(cartRef, where('email', '==', email),where("productId", '==' , product));
  const querySnapshot = await getDocs(q);
  const cartDoc = querySnapshot.docs[0]; 
  if(querySnapshot.docs[0].data().orderQte<2){
    await DeleteProduct(product)
  }else{
    await updateDoc(cartDoc.ref,{orderQte:querySnapshot.docs[0].data().orderQte-1})
  }

  router.replace(path)
  }catch(error){
    toast({
      title: "Veuillez reesayer!!!",

      status: "error",
      duration: 9000,
      isClosable: true,
    });
  }
}
const [ref,setRef] = useState([])

function generateCustomKey() {
  // Obtenez le timestamp actuel en millisecondes
  const timestamp = Date.now();

  // Utilisez un format de date pour formater le timestamp
  const dateFormat = new Intl.DateTimeFormat('fr-FR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'UTC'
  });

  const [{ value: month },,{ value: day },,{ value: year },,{ value: hour },,{ value: minute },,{ value: second }] = dateFormat.formatToParts(timestamp);

  // Créez la clé personnalisée en utilisant le timestamp formaté
  const formattedTimestamp = `${year}${day}${month}${hour}${minute}${second}`;

  return `CO${formattedTimestamp}`;
}

function generateCustomDate() {
  // Obtenez le timestamp actuel en millisecondes
  const timestamp = Date.now();

  // Utilisez un format de date pour formater le timestamp
  const dateFormat = new Intl.DateTimeFormat('fr-FR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'UTC'
  });

  const [{ value: month },,{ value: day },,{ value: year },,{ value: hour },,{ value: minute },,{ value: second }] = dateFormat.formatToParts(timestamp);

  // Créez la clé personnalisée en utilisant le timestamp formaté
  const formattedTimestamp = `${day}/${month}/${year}`;

  return `${formattedTimestamp}`;
}







  useEffect(() => {
   
    setEmail(sessionStorage.getItem("email"))
   
    getCartsByUserId(email).then((userCarts) => {
      
      if (userCarts.length > 0) {
        setCart(userCarts);
        const po = secureLocalStorage.getItem("po")
    // console.log("po",po)
    let PrixT = 0;
    
    const All = userCarts;

    
    if (All != null) {
      All.map((data, index) => {
        PrixT = (parseFloat(data.orderPrice)* data.orderQte )+ PrixT;
      });
      setPrix(PrixT);
    }
    if (PrixT <= 30) {
      setDis("grid");
      (po.slice(0, 2) == 91 ||
      po.slice(0, 2) == 94 ||
      po.slice(0, 2) == 93 ||
      po.slice(0, 2) == 92 ||
      po.slice(0, 2) == 78 ||
      po.slice(0, 2) == 77 ||
      po.slice(0, 2) == 75) ?setFrais("2.99") : setFrais("5.99");
      
    } else {
      setDis("grid");
      if (PrixT < 40 && PrixT > 29) {
        setFrais((PrixT * 10) / 100);
      } else {
        if (PrixT < 51) {
          setFrais((PrixT * 9) / 100);
        } else {
          if (PrixT < 71) {
            setFrais((PrixT * 8) / 100);
          } else {
            if (PrixT < 81) {
              setFrais((PrixT * 7) / 100);
            } else {
              if (PrixT < 91) {
                setFrais((PrixT * 6) / 100);
              } else {
                if (90 < PrixT) {
                  setFrais((PrixT * 5) / 100);
                }
              }
            }
          }
        }
      }
    }

    secureLocalStorage.setItem("prix", PrixT);

      } else {
        // console.log("Aucun panier trouvé pour cet utilisateur.");
        setCart([])
      }
    });
    
  }, [email,cart]);
  if (cart != undefined && cart.length != 0){
     async function saveCommande3() {
    
      let email = sessionStorage.getItem("email");
      let Cart = cart;
      const dateCommande = generateCustomDate();
     const idCom = generateCustomKey();

     
      const hashDigest = sha256(idCom).toString(CryptoJS.enc.Hex);
      
      const hash = hashDigest.slice(0,3).toString()

      
       
        // Cart.map(async (data, index) => {
        //   push(rf(db2, "Commandes"), {
        //     productID: data.productId,
        //     payment: moyen,
        //     nom: data.orderName,
        //     livraison:way,
           
        //     quantite: data.quantity,
        //     imageUrl: data.orderImageUrl,
        //     organisation: data.orderOrganisation,
        //     Prix: data.orderPrice,
        //     initiateur: email,
        //     Status: "En Cours",
        //     ville: ville,
        //     rue: rue,
        //     code_postal: postal,
        //     batiment: batiment,
        //     lieu: lieu,
        //     receveur: nom,
        //     numero: numero,
        //     jour: day,
        //     moment: hours,
        //     date: new Date(),
        //   });
        
        // });
       
       
          set(rf(db2, `Commandes/${idCom}${hash}`), {
           cartlist:Cart,
            payment: moyen,
            commandeId:`${idCom}${hash}`,
            livraison:way,
            email,
            status: "En cours",
            ville: ville,
            rue: rue,
            code_postal: postal,
            batiment: batiment,
            lieu: lieu,
            receveur: nom,
            numero: numero,
            jour: day,
            moment: hours,
            dateCommande,
            subtotalPrice:`€${prix}`,
            totalPrice:`€${parseFloat(prix +parseFloat(frais)).toFixed(2)}`,
            createdAt: serverTimestamp()}
          );
        
       
        await axios
        .post("/api/sendmail", {
          adresse:lieu,
          email: email.toString(),
          paiement:moyen,
          comande:`${idCom}${hash}`,
          ttc:`${parseFloat(prix +parseFloat(frais)).toFixed(2)}`,
          frais:parseFloat(frais),
          product:Cart,
        })
        .then((response) => {
          toast({
            title: "SUCCES",
            description: `merci pour la confiance`,
            status: "success",
            duration: 9000,
            isClosable: true,
          });;
        })
        .catch((error)=>{});
      await  DeleteAll()
        setLieu("");
        setNom("");
        setNumero("");
        // router.reload();
      
    }
    
    return (
          <>
            <Center display={"grid"} width={"full"} position={"relative"}  >
              <SimpleGrid
                width={"full"}
                columns={[1, 1, 2, 2, 2]}
                spacing={10}
                justifyContent={"space-around"}
               
               
              >
                <Box
                  bgColor={"whiteAlpha.700"}
                  width={{ base: "90%", md: "100%" }}
                  mb={40}
                  ml={["5%", "5%", "5%", "10%", "10%"]}
               
                  borderRadius={"15px"}
                >
                  
                  
                  {cart.map((data, index) => (
                    <Center
                      key={data.productId}
                      width={"100%"}
                      // borderTop={"1px solid gray"}
                      
                    >
                      <SimpleGrid
                      
                        columns={1}
                        display={"grid"}
                        // spacing={2}
                        backgroundColor={"#fbfbfbfc"}
                        width={"fit-content"}
                        // border={"1px solid #e6e6e6"}
                        // boxShadow={"0px 2px 10px"}
                        // boxSizing={"border-box"}
                        // borderRadius={"9px"}
                        py={5}
                        ml={10}
                        marginBottom={5}
                      >
                        <Box>
                          <Flex>
                            <Box w="100px" h="100px" bgImage={data.orderImageUrl} bgSize={"contain"} bgRepeat={"no-repeat"} mr={2}/>
                            <Box mr={5}>
                              <Text fontSize={"15px"} fontWeight={600} noOfLines={2}> {data.orderName}</Text>
                              <Text fontSize={"10px"} fontWeight={400} noOfLines={2}> {data.orderorganisation || data.orderOrganisation}</Text>
                              <Text fontSize={"15px"} fontWeight={700} noOfLines={1} color={"cyan.700"}> {data.orderPrice} €</Text>
                              {/* <Text fontSize={"20px"} fontWeight={700} noOfLines={1}> {data.orderPrice} €</Text> */}
                              <Flex  mt={5}>
                                <Box display={"flex"}>
                                  <Button w={"fit-content"} onClick={() => Decrement(data.productId)}>
                                    -
                                  </Button>
                                  <Input
                                    type={"number"}
                                    width={"50px"}
                                    value={data.orderQte}
                                  />
                                  <Button w={"fit-content"}   mr={2} onClick={() => Increment(data.productId)}>
                                    +
                                  </Button>
                                  </Box>
                                          <Flex  >
                      
                      <SimpleGrid columns={1}>
                      <Button
                      // mr={2}
                      // my={2}
                          color={"red.500"}
                          w={"fit-content"}
                          fontSize={"15px"}
                          onClick={() => DeleteProduct(data.productId )}
                          > Supprimer</Button>
                         
                      </SimpleGrid>
              </Flex>
                                </Flex>
                        
                            </Box>
                          </Flex>
                        </Box>
                       
                      </SimpleGrid>
                    </Center>
                  ))}
                 
                </Box>
                <Flex
              
                  mx={["0", "0", "0", "10%", "10%"]}
                  border={"1px solid #e6e6e6"}
                  // boxShadow={"0px 2px 10px"}
                 
                  bottom="0"
                  left="0"
                  right="0"
                  top={["80%","80%","80%","0","0"]}
                  boxSizing={"border-box"}
                  borderRadius={"15px"}
                  position={["fixed","fixed","fixed","relative","relative",]}
                  as={"footer"}
                  width={["100%","100%","100%","fit-content","fit-content"]}
                  backgroundColor={"#fff"}
                  height={"fit-content"}
                  paddingBottom={5}
                  
                  marginBottom={[5, 5, 5, 0, 0]}
                  marginTop={0}
                  px={10}
                  justifyContent={"space-between"}
                 
                >
                  <Box w={"full"}>
                    <Box fontSize={20}  >
                      
                      <Text  fontSize={["15px","15px","15px","15px"]} fontWeight={600}>Recapitulatif de la commande :</Text>
                      <Text  mr={2} fontSize={["15px","15px","15px","15px","15px"]}>Prix commande : {parseFloat(prix).toFixed(2)} €</Text>
                      <Text  mr={2} fontSize={["15px","15px","15px","15px","15px"]}>Frais de livraison : {parseFloat(frais).toFixed(2)} €</Text>
                      
                      <Flex borderTop={"1px solid gray"} my={2}  fontSize={["15px","15px","15px","15px","15px"]}   >
                      <Text> Total  : </Text>
                      <Text fontWeight={600} color={"red.700"} ml={2}> {parseFloat(prix +parseFloat(frais)).toFixed(2)} €</Text>
                      </Flex>
                    </Box>
                    <Button
                      onClick={onOpen}
                      color={"white "}
                      bgColor={"cyan.700"}
                      width={"fit-content"}
                      height={"fit-content"}
                      py={2}
                      px={5}
                      _hover={{
                        bgColor:"cyan.500",color:"black"
                      }}
                    >
                      Valider commande
                    </Button>
                  </Box>
                  <Drawer onClose={onClose} isOpen={isOpen} size={"full"}>
                    <DrawerOverlay />
                    <DrawerContent>
                      <DrawerCloseButton />
                      <DrawerHeader fontSize={{ base: 20, md: 30 }}>
                        Validation de la commande
                      </DrawerHeader>
                      <DrawerBody>
                      <Box >
                          <Text fontWeight={700} fontSize={20}>
                            {" "}
                            Mode de paiement
                          </Text>
    
                          <RadioGroup
                            display={"flex"}
                            onChange={setMoyen}
                            value={moyen}
                            onClick={() => {
                              setSect1("flex");
                            }}
                          >
                            <Radio mr={20} value="Especes">
                              <Flex>
                                <BsCashCoin fontSize={20} />
                                <Text ml={2}> Espèces</Text>
                              </Flex>
                            </Radio>
                            <Radio value="Paypal">
                              <Flex>
                                <BsPaypal fontSize={20} />
                                <Text ml={2}> Paypal</Text>
                              </Flex>
                            </Radio>
                          </RadioGroup>
                        </Box>
                        <Box >
                          <Text fontWeight={700} fontSize={20}>
                            Date de livraison
                          </Text>
                          <Box display={sect1}>
                            <RadioGroup
                            fontSize={["10px","10px","10px","15px","15px"]}
                              onChange={setDay}
                              value={day}
                              onClick={() => setSect2("grid")}
                            >
                              <Radio mr={20} value="Mercredi">
                                Mercredi{" "}
                              </Radio>
                              <Radio mr={20} value="Vendredi">
                                {" "}
                                Vendredi
                              </Radio>
                              <Radio mr={20} value="Samedi">
                                {" "}
                                Samedi
                              </Radio>
                            </RadioGroup>
                          </Box>
                          <Box ml={{base:0,md:10}} display={sect2}>
                            <Text fontWeight={700} fontSize={20}>
                              {" "}
                              Heure de livraison
                            </Text>
                            {day == "Samedi" ? (
                              <RadioGroup
                                display={["grid","grid","grid","flex","flex"]}
                                onChange={setHours}
                                value={hours}
                                onClick={() => {
                                 setSect3("flex")
                                }}
                              >
                               
                                  <Radio value="Soir(13h-16h)" mr={2}>
                                          Apres-Midi (de 13h ----- 16h)
                                        </Radio>
                                        <br />
                                        <Radio value="Soir(16h-20h)" mr={2}>
                                          Soir (de 16h ----- 20h)
                                        </Radio>
                                        <br />
                                        <Radio value="Soir(20h-00h)" mr={2}>
                                          Nuit (de 20h ----- 00h)
                                        </Radio>
                                        
                              </RadioGroup>
                            ) : (
                              <RadioGroup
                              display={["grid","grid","grid","flex","flex"]}
                                onChange={setHours}
                                value={hours}
                                onClick={() => {
                                  setSect3("flex")
                                }}
                              >
                                <Radio value="Matin" mr={2}>
                                          Matin(de 09h30 ----- 12h)
                                        </Radio>
                                        <br />
                                        <Radio value="Soir(13h-16h)" mr={2}>
                                          Apres-Midi (de 13h ----- 16h)
                                        </Radio>
                                        <br />
                                        <Radio value="Soir(16h-20h)" mr={2}>
                                          Soir (de 16h ----- 20h)
                                        </Radio>
                                        <br />
                                        <Radio value="Soir(20h-00h)" mr={2}>
                                          Nuit (de 20h ----- 00h)
                                        </Radio>
                              </RadioGroup>
                            )}
                          </Box>
                        </Box>
                        <Box  mb={10}>
                          <Text fontWeight={700} fontSize={20}>
                            {" "}
                            Adresse de livraison
                          </Text>
                                <Box display={sect3}>
                          <RadioGroup
                            display={["grid","grid","grid","flex","flex"]}
                            onChange={setWay}
                            value={way}
                            onClick={() => {
                             setSect4("grid")
                            }}
                          >
                            <Radio mr={20} value="me"  onClick={() => {
                              setLieu(secureLocalStorage.getItem("addresse")),
                                setNumero(secureLocalStorage.getItem("number")),
                                setNom(secureLocalStorage.getItem("name"));
                            }}>
                             Utiliser mon Adresse
                            </Radio>
                            <Radio value="other"  onClick={() => {
                                setLieu(""),
                                setNumero(""),
                                setNom("");
                            }}>
                              Utiliser une autre adresse
                            </Radio>
                          </RadioGroup>
                          </Box>
                          {way == "other" ?
                          <>
                          <Box width={"300px"}>
                                          <FormControl>
                                            <FormLabel>Nom </FormLabel>
                                            <Input
                                              onChange={(e) =>
                                                setNom(e.target.value)
                                              }
                                            />
                                          </FormControl>
                                          <FormControl>
                                            <FormLabel>
                                              Numero 
                                            </FormLabel>
                                            <Input
                                              type="number"
                                              onChange={(e) =>setNumero(e.target.value)}/>
                                          </FormControl>
                                          <FormControl >
                                            <FormLabel>Ville</FormLabel>
                                            <Input
                                              onChange={(e) =>
                                                setVille(e.target.value)
                                              }
                                            />
                                          </FormControl>
                                        </Box > 
                                        <Box  width={"300px"}>
                                          <FormControl>
                                            <FormLabel>Nom de la Rue</FormLabel>
                                            <Input
                                              onChange={(e) =>
                                                setRue(e.target.value)
                                              }
                                            />
                                          </FormControl>
                                          <FormControl>
                                            <FormLabel>
                                              Numero du batiment
                                            </FormLabel>
                                            <Input
                                              type="number"
                                              onChange={(e) =>
                                                setBatiment(e.target.value)
                                              }
                                            />
                                          </FormControl>
                                          <FormControl>
                                            <FormLabel>Code Postal</FormLabel>
                                            <Input
                                              onChange={(e) =>
                                                setPostal(e.target.value)
                                              }
                                            />
                                          </FormControl>
                                        </Box>
                                        </>
                                      :<></>}
                        </Box>
                        <Box  display={sect4} mb={20}>
                          
                         
                          
                        {moyen == "Paypal" ? <Box width={"300px"}> <PayPalButtons
                                          
                                          createOrder={(data, actions) => {
                                            return actions.order.create({
                                              purchase_units: [
                                                {
                                                  amount: {
                                                    value: `${prix + frais}`,
                                                  },
                                                },
                                              ],
                                            });
                                          }}
                                          onApprove={(data, actions) => {
                                            return actions.order
                                              .capture()
                                              .then(async (details) => {
                                                const name =
                                                  details.payer.name.given_name;
                                                  toast({
                                                    title: "Achat effectué avec succès",
                                                    description: `Merci ${name} pour votre achat!!! `,
                                                    status: "success",
                                                    duration: 9000,
                                                    isClosable: true,
                                                  });
                                                  // secureLocalStorage.removeItem("Cart");
                                                  await DeleteAll()
                                                  // router.reload();
                                              });
                                          }}
                                        /></Box>:<Box width={"300px"}><Button bgColor={"cyan.700"} py={2} px={5} color={"white"} onClick={()=>{ saveCommande3()}}>Confirmer achat</Button></Box>}
                        </Box>
                      </DrawerBody>
                    </DrawerContent>
                  </Drawer>
                </Flex>
              </SimpleGrid>
            </Center>
            
            {/* <FooterR /> */}
           
          </>)
  }
    else {
    return (
      <>
        <Center>
          <Flex
            bgColor={"#fff"}
            width={"621px"}
            height={"205px"}
            border={"1px solid #e6e6e6"}
            // boxShadow={"0px 2px 10px"}
            boxSizing={"border-box"}
            borderRadius={"9px"}
            fontSize={30}
            justifyContent={"center"}
            // pb={10}
            marginBottom={20}
          >
            <Text marginTop={20}>Votre panier est vide</Text>
            {/* <Button marginTop={20} onClick={()=>Hashed()}>Votre panier est vide</Button> */}
          </Flex>
        </Center>
      </>
    );
  }
 
}
