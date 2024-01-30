import {
  ArrowForwardIcon,
  ChevronRightIcon,
  Search2Icon,
} from "@chakra-ui/icons";
import All from "@/components/ResultResarch/All";

import {
  Box,
  Button,
  Center,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  InputRightAddon,
  InputRightElement,
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
  Link,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState, useEffect, useRef } from "react";
import { MdLocationOn } from "react-icons/md";
import { db, db2 } from "@/FIREBASE/clientApp";
import { ref, onValue } from "firebase/database";
import Location from "../location";
import { useRouter } from "next/router";
import { collection, query, where, getDocs } from "firebase/firestore";
import Favlist from "./FavLists";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import Favlist2 from "./FavLists2";
import queryString from "query-string";
import { FaWhatsapp } from "react-icons/fa";
import SearchMagg from "../SearchMagg";
import Reservations from "../Reservations";

// les card des differntes cartegories qui seront mapés
export function ItemCard({ item, card}) {
  const [imageUrl, setImageUrl] = useState();
  const [adresse, setAdresse] = useState();
  const [numero, setNumero] = useState();
  const [url, se] = useState();
  const [etat, setEtat] = useState(" ");
  const router = useRouter();

  useEffect(() => {
    const jour = new Date();
    const heure = jour.getHours();
    const minute = jour.getMinutes();
    if (item.horaire != undefined && item.horaire != null) {
      Object.values(item.horaire)[parseInt(jour.getDay())];
      //  console.log( Object.values(item.horaire)[parseInt(jour.getDay())].length)

      // console.log(Object.values(item.horaire)[parseInt(jour.getDay())].slice(0,5))
      if (Object.values(item.horaire)[parseInt(jour.getDay())] === "24h/24") {
        setEtat("Ouvert 24h/24h");
      } else if (
        Object.values(item.horaire)[parseInt(jour.getDay())].length == 0
      ) {
        setEtat("Non défini");
      } else if (
        Object.values(item.horaire)[parseInt(jour.getDay())] === "Fermé"
      ) {
        setEtat("Fermé");
      } else {
        //  console.log(((Object.values(item.horaire)[parseInt(jour.getDay())])).slice(6,8));
        //  console.log(((Object.values(item.horaire)[parseInt(jour.getDay())])).slice(0,2));
        //  console.log(item.horaire);
        // console.log(parseInt(((Object.values(item.horaire)[parseInt(jour.getDay())])).slice(6,8))+24>parseInt(heure))
        if (
          Object.values(item.horaire)[parseInt(jour.getDay())].slice(0, 2) <=
          `${heure}`
        ) {
          if (
            parseInt(
              Object.values(item.horaire)[parseInt(jour.getDay())].slice(6, 8)
            ) +
              24 >
            parseInt(heure)
          ) {
            setEtat("Ouvert");
          } else {
            setEtat("Fermé");
          }
        } else {
          setEtat("Fermé");
        }
      }

      secureLocalStorage.setItem("jour", parseInt(jour.getDay()));
    }
  }, [item.horaire, etat]);

  const [categorie, setCategorie] = useState();

  return (
    <>
      {/* card  */}
      <Box
        mt={5}
        height={["20vh", "20vh", "20vh", "20vh", "20vh"]}
        width={{ base: "25%", md: "15%" }}
        marginBottom={[40, 40, 40, 10, 10]}
        mr={5}
        borderRadius={25}
      >
        <Link
          height={"15vh"}
          width={{ base: "80%", md: "30%" }}
          mt={5}
          mr={{ base: "0%", md: "0%" }}
          _hover={{ textDecoration: "none" }}
          href={`/otherContent/intermed1?categorie=${item.categorie}&magasin=${item.organisation}`}
        >
          <Box
            height={"100%"}
            width={"100%"}
            alignItems={"center"}
            justifyContent={"center"}
            borderRadius={25}
           >

           
            <Flex
              alignItems={"center"}
              justifyContent={"center"}
              borderRadius={25}
              height={"100%"}
              width={"100%"}
              bg={"rgba(0, 0, 0, 0.277)"}
            >
               <Image src={item.imageUrl} alt={"image du magasin"} width={"100%"} height={"100%"} borderRadius={25}/>
              
            </Flex>
            <Box mt={"-100px"}>
                <Text
                  fontSize={"lg"}
                  color={"#fff"}
                  textAlign={"center"}
                  fontWeight={"bold"}
                >
                  {item.organisation}
                </Text>
              </Box>
          </Box>
         
        </Link>
        <Box
          bgColor={"white"}
          width={"100%"}
          borderBottom={"1px solid black"}
          textAlign={"center"}
        >
          {etat == "Ouvert" || etat == "Ouvert 24h/24h" ? (
            <Text fontSize={"18px"} color={"green"}>
              {etat}
            </Text>
          ) : (
            <Text fontSize={"18px"} color={"red"}>
              {etat}
            </Text>
          )}
        </Box>
        <Box>
          <Text as={"h4"} pb={2} align={"center"}>
            {item.adresse}
          </Text>
        </Box>
      </Box>
    </>
  );
}

export function ContainerCard({ card }) {
  const router = useRouter();
  const [datos, setDatos] = useState([]);
  const [keys, setKeys] = useState([]);
  const [datas, setDatas] = useState(0);

 
  useEffect(() => {
    const GetAgain = async () => {
      const q = query(collection(db, `f${card}`));

      const querySnapshot = await getDocs(q);
      
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots

        datos.push(doc.data());
       
      });
      setDatas(1);
    };

    if (datas == 0) {
      GetAgain();
      setDatas(1);
    }
  }, [datas, card, datos]);
  if (datos == null) {
    router.reload();
  }

  return (
    <>
      {/* categorie*/}
      <Flex
        mt={2}
        width={"95%"}
        height={"fit-content"}
        // mb={10}
        // pb={10}
        direction={"column"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        {/* la box de l'entete de la cartegorie  */}
        <Flex
          id={card}
          height={"auto"}
          width={"100%"}
          mt={5}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Text
            height={"auto"}
            width={"100%"}
            display={"flex"}
            fontWeight={"bold"}
            fontSize={"25px"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            {card}
          </Text>
          <Link
            href="/otherContent/intermed2"
            onClick={() => {
              if (card == "Coiffure") {
                secureLocalStorage.setItem("service", "Salon de Coiffure");
              } else if (card == "Mèches") {
                secureLocalStorage.setItem("service", "Commerce de meches");
              } else {
                secureLocalStorage.setItem("service", card);
              }
            }}
            _hover={{ textDecoration: "none" }}
          >
            <Button
              border={"none"}
              rightIcon={<ArrowForwardIcon />}
              colorScheme="#08566f"
              variant="outline"
              fontSize={"14px"}
            >
              Voir Plus
            </Button>
          </Link>
        </Flex>

        {/* contient les card's  */}
        <Flex
          mb={[0, 0, 0, 2, 2]}
          pb={[0, 0, 0, 2, 2]}
          maxHeight={"auto"}
          width={"100%"}
          flexWrap={"wrap"}
          direction={"row"}
          alignItems={{ base: "center", md: "normal" }}
          justifyContent={{ base: "center", md: "space-between" }}
        >
          <SimpleGrid
            display={["none", "none", "none", "flex", "flex"]}
            width={"100%"}
            flexWrap={"wrap"}
            direction={"row"}
            alignItems={{ base: "center", md: "normal" }}
            justifyContent={{ base: "center", md: "space-between" }}
          >
            {
              
              datos.map((item, key) => (
                <ItemCard key={key} item={item} card={card}></ItemCard>
              ))
            }
          </SimpleGrid>

          <SimpleGrid
            display={["flex", "flex", "flex", "none", "none"]}
            mb={2}
            pb={2}
            width={"100%"}
            flexWrap={"wrap"}
            direction={"row"}
            alignItems={{ base: "center", md: "normal" }}
            justifyContent={{ base: "center", md: "space-between" }}
          >
            {
              //  console.log(datas)

              datos.slice(0, 3).map((item, key) => (
                <ItemCard key={key} item={item} card={card}></ItemCard>
              ))
            }
          </SimpleGrid>
        </Flex>

        {/* <Favlist2 card={card} /> */}
      </Flex>
    </>
  );
}

// le rendu final qui sera affiché
const LadingCorps = () => {
  const [cat, setCat] = useState([]);
  const [postal, setPostal] = useState("");
  const [datos, setDatos] = useState([]);
  const [locate, setLocate] = useState("");
  const [datas, setDatas] = useState(0);
  const [data, setData] = useState([]);
  const [code, setCode] = useState([]);
  const [final, setFinal] = useState([""]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [check, setCheck] = useState(0);

  const devis = " Des colis a envoyé depuis et vers l'Afrique ?";
  //recherche un magasin
  const recherche = async (terms) => {
    const q = query(
      collection(db, "Admin"),
      where("codePostal", "==", String(terms).trim())
    );
    const querySnapshot = await getDocs(q);
    setModalData(querySnapshot.docs);
  };

  const router = useRouter();
  //fin de recherche

  const Search = (id) => {
    if (data.filter((order) => order.num_dep === id).length != 0) {
      setFinal(data.filter((order) => order.num_dep === id));
    } else {
      setFinal([""]);
    }
  };
const afrique = "Vers l'afrique"
  useEffect(() => {
    const update = async () => {
      // console.log(cat);
      if (datas == 0) {
        const q = query(collection(db, "Services"));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          cat.push(doc.data().nom);
        });
      }

      setDatas(1);
    };
    if (check == 0 || check == 1) {
      const GetAll = async () => {
        setData([]);
        await axios.get("api/GetJson").then((response) => {
          setData(JSON.parse(Object.values(response.data)));
        });
      };
      GetAll();
      setCheck(check + 1);
    }

    if (datas == 0) {
      update();
      setDatas(1);
    }
    setLocate(secureLocalStorage.getItem("postal") ?? " ");

    //updateAll()
  }, [datas, cat, postal, locate, check]);
  if (datas != 0) {
    return (
      <>
        {/* <Location /> */}
        <Center width={"100%"} height={"auto"}>
          <Box height={"100%"} width={"100%"}>
            <Center>
          <Flex                            
              width={"100%"}
              height={"fit-content"}
              display={["flex", "flex", "flex", "none", "none"]}
              mt={3}
              color={"white"}
            >
              <Flex width={"full"} display={"flex"} >
                <SimpleGrid columns={[2,2,2,4,4]} >
                  <Box  ml={"60px"} mr={10} my={10}>
                     <Reservations/>
                  </Box>
                  <Box  ml={10}  my={10}>
              <SearchMagg/>
              </Box>
              <Box display={"grid"} ml={"10px"}  my={20} mt={-1}  as={Link} 
 href={"/Devis"}   _hover={{
  bgColor: "transparent",
  opacity: "0.7",
  textDecoration: "none",
}}>
                  <Box textAlign={"center"}>
                    <Center display={"grid"}>
                    <Image src={'./new/colis2.png'} ml={4} alt={"Envoie de colis"} bgColor={"rgba(255,255,255,0.2)"}  width={["90px","90px","90px","80px","80px"]} />
                    <Text mt={-1} width={"120px"} borderRadius={"25px"} color={"black"} fontSize={"15px"} fontWeight={700}>ENVOYER </Text>
                    <Text width={"120px"} borderRadius={"25px"} color={"black"} fontWeight={600} fontSize={"10px"}>{afrique} </Text>
                    </Center>
                  </Box>
                  <Center>
                    
                  </Center>
                </Box>
                
                <Box display={"grid"} ml={10}  my={20} mt={-1}  as={Link}
href={
                        "https://chapbackofficefournisseur.vercel.app/Connexion"
                      }
                      _hover={{
                        bgColor: "transparent",
                        opacity: "0.7",
                        textDecoration: "none",
                        
                      }}>
                  <Box textAlign={"center"}>
                    <Center display={"grid"}>
                    <Image src={'./new/partnerTag.png'}  ml={8}  width={["70px","70px","70px","190px","190px"]}  alt={"Entrepreneur"}  />
                    <Text   color={"black"}  width={"130px"} borderRadius={"25px"}fontSize={"15px"} fontWeight={700} mt={2}>PARTENAIRE</Text>
                    <Text  color={"black"}  width={"120px"} borderRadius={"25px"}fontSize={"10px"} fontWeight={600}>Rejoignez nous </Text>
                    </Center>
                  </Box>
                  <Center>
                    
                  </Center>
                </Box>
                </SimpleGrid>
              </Flex>
             
            </Flex>
            </Center>
            <Flex                            
              width={"100%"}
              height={"fit-content"}
              display={["none", "none", "none", "flex", "flex"]}
              mt={-3}
              color={"white"}
            >
              <Center width={"100%"} display={"flex"} >
              <Reservations/>
              <SearchMagg/>
              <Box display={"grid"} pr={10} as={Link} ml={20}
 href={"/Devis"}   _hover={{
  bgColor: "transparent",
  opacity: "0.7",
  textDecoration: "none",
}}>
                  <Box textAlign={"center"}>
                    <Center display={"grid"}>
                    <Image ml={4} src={'./new/colis2.png'} alt={"Envoie de colis"} bgColor={"rgba(255,255,255,0.2)"} width={"120px"}/>
                    <Text mt={5} width={["100px","100px","100px","150px","150px"]} fontSize={["15px","15px","15px","25px","25px"]} textAlign={"center"} borderRadius={"25px"} color={"black"} fontWeight={700}>ENVOYER </Text>
                    <Text width={["100px","100px","100px","150px","150px"]} fontSize={["10px","10px","10px","15px","15px"]} textAlign={"center"} borderRadius={"25px"} color={"black"} fontWeight={600} >{afrique} </Text>
                    </Center>
                  </Box>
                  <Center>
                    
                  </Center>
                </Box>
                
                <Box display={"grid"} pr={10} as={Link}
href={
                        "https://chapbackofficefournisseur.vercel.app/Connexion"
                      }
                      _hover={{
                        bgColor: "transparent",
                        opacity: "0.7",
                        textDecoration: "none",
                      }}>
                  <Box textAlign={"center"}>
                    <Center display={"grid"}>
                    <Image src={'./new/partnerTag.png'}  ml={5} width={"100px"} alt={"Entrepreneur"}  />
                    <Text   color={"black"} mt={8} width={["100px","100px","100px","fit-content","fit-content"]} fontSize={["15px","15px","15px","25px","25px"]}textAlign={"center"} borderRadius={"25px"} fontWeight={700}>PARTENAIRE</Text>
                    <Text  color={"black"} width={["100px","100px","100px","150px","150px"]} fontSize={["10px","10px","10px","15px","15px"]}textAlign={"center"} borderRadius={"25px"} fontWeight={600}>Rejoignez nous </Text>
                    </Center>
                  </Box>
                  <Center>
                    
                  </Center>
                </Box>
                
              </Center>
             
            </Flex>
            {/* <Heading
              textAlign={"start"}
              fontSize={"25px"}
              color={"#08566e"}
              mb={2}
              mt={9}
            >
              Les produits sponsorisés
            </Heading> */}
            {/* <Favlist /> */}
            <Center display={"none"}>
            
              <Box
                display={["grid", "grid", "grid", "none", "none"]}
                width={"210px"}
              >
                <Flex>
                  <Image
                    bgColor={"white"}
                    src={"./operator.png"}
                    alt={"Operator"}
                    width={"50px"}
                    height={"50px"}
                  />
                  <Box width={"180px"}>
                    <Text fontSize={"15px"}>Commandes possible au :</Text>
                    <Flex w={"full"}>
                      <FaWhatsapp />
                      <Text fontSize={"15px"} ml={2}>
                        
                        0033751466218
                      </Text>
                    </Flex>
                    <Text fontSize={"15px"} ml={"22px"} h={"fit-content"}>
                      0033605799059
                    </Text>
                  </Box>
                </Flex>
              </Box>
              <Image
                src={"./head21.png"}
                display={["grid", "grid", "grid", "none", "none"]}
                width={"190px"}
                alt="info origine"
              />
            </Center>
            {/* l'entet principale */}
            <Heading
              textAlign={"start"}
              fontSize={"25px"}
              color={"#08566e"}
              mt={[10, 10, 10, 9, 9]}
            >
              Nos Services
            </Heading>

            {/* la box de toutes les cartegorie */}
            {locate.length <= 4 ? (
              <Flex
                height={"fit-content"}
                position={"relative"}
                width={"100%"}
                direction={"column"}
                alignItems={"center"}
                mb={10}
                pb={5}
                justifyContent={"center"}
              >
                {cat.map((card, key) => {
                  // console.log('card',card)

                  return (
                    <>
                      <ContainerCard key={key} card={card} />
                      <Favlist card={card} />
                    </>
                  );
                })}
              </Flex>
            ) : (
              <>
                <All />
              </>
            )}
          </Box>
        </Center>
      </>
    );
  }
};

export default LadingCorps;
