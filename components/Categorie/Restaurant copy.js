import { ChevronDownIcon, ChevronUpIcon, StarIcon } from "@chakra-ui/icons";
import {
  AspectRatio,
  Box,
  Button,
  Center,
  Collapse,
  Flex,
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
  Text,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { onValue, push, ref } from "@firebase/database";
import { onAuthStateChanged } from "firebase/auth";
import {
  addDoc,
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useState } from "react";
import { db, db2 } from "@/FIREBASE/clientApp";
import Navbar from "../Navbar";
import InputBar from "../InputBar";
import {
  BsCashCoin,
  BsFillTelephoneOutboundFill,
  BsTelephoneOutboundFill,
} from "react-icons/bs";
import Mapped from "./Map";
import { BiWorld } from "react-icons/bi";
import Favlist2 from "../generale/FavLists2";
import FooterR from "../footerResponsif";
import { IoMdAddCircle } from "react-icons/io";
import { FaTruckPickup } from "react-icons/fa";
import Link from "next/link";

///etoiles du feedback
export function Star({ id, data }) {
  let total = 0;
  let star = 0;
  if (data) {
    Object.values(data).map((dat, key) => {
      if (id == dat.productID) {
        star = star + parseInt(dat.rate);
        total = total + 1;
      }
    });
  }

  return (
    <>
      {total ? (
        <Flex>
          {/* {data.length} */}
          {/* {star} */}

          {}
          {Array(5)
            .fill("")
            .map((_, i) => (
              <StarIcon
                key={i}
                fontSize={"12px"}
                color={i < star / total ? "yellow" : "gray.500"}
              />
            ))}
          <Text ml={1} mt={-1}>
            ({total})
          </Text>
        </Flex>
      ) : (
        <Flex>
          {Array(5)
            .fill("")
            .map((_, i) => (
              <StarIcon key={i} fontSize={"12px"} color={"gray.500"} />
            ))}
          <Text ml={2} mt={-1}>
            {total} avis
          </Text>
        </Flex>
      )}
    </>
  );
}


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





///Fonction principale
export default function Resto({ categorie, magasin }) {

///variable des produits
const [produit,setProduit] = useState([])
const [produitKeys,setProduitKeys] = useState([])
const [changeC,setChangeC] = useState("")


  const toast = useToast();
  const { isOpen, onToggle, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const day = [
    "lundi",
    "mardi",
    "mercredi",
    "jeudi",
    "vendredi",
    "samedi",
    "dimanche",
  ];

///Variable de la modal 
const [heures,setHeures] = useState("")
const [couvert,setCouvert] = useState("")
const [numero,setNumero] = useState("")
const [detailsLink,setDetailsLink] = useState("")



  ///Variable contenant des données
  const [feed, setFeed] = useState([]);
  const [mag, setMag] = useState([]);

  ///Fonction de fetch des feedback
  const Fav = async () => {
    try {
      const starCountRef = ref(db2, "Feedback");
      onValue(starCountRef, (snapshot) => {
        setFeed(snapshot.val());
      });
    } catch {
      (error) => {
        console.log("Waiting time!!!");
      };
    }
  };

  ///Fonction de recherche de magasin et de ses informations
  const SearchMagasin = async (magasin) => {
    console.log("cherche magasin");
    try {
      const cartRef = collection(db, "Admin"); // Assurez-vous que la collection est correcte.
      const q = query(cartRef, where("organisation", "==", magasin));

      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs[0].data();
      console.log(data, "data");
      setMag(data);
    } catch {
      (error) => {
        console.log(error, "eeeeeeerrrrroooooorrrrrr");
      };
    }
  };
  const [show, setShow] = useState(false);
  const handleToggle = () => setShow(!show);

  const HandleRes = (categorie) => {
    if (
      categorie == "Epicerie" ||
      categorie == "Textile" ||
      categorie == "Cosmetique" ||
      categorie == "Commerce de meches" ||
      categorie == "Salon de Coiffure"
    ) {
    } else {
      onOpen();
    }
  };

  useEffect(() => {
    categorie=="Epicerie"?setDetailsLink("/Details/detailsEp"): categorie=="Textile"?setDetailsLink("/Details/details") : setDetailsLink("/Details/detailsCo")
    if (categorie=="Resto") {
      setChangeC("Restaurant")
    }
    else{
      setChangeC(categorie)
    }
    Fav();
    SearchMagasin(magasin);
    // categorie=="Epicerie"?setDetailsLink("/Details/detailsEp"): categorie=="Textile"?setDetailsLink("/Details/details") : setDetailsLink("/Details/detailsCo")
    try {
      const starCountRef = ref(db2, `${changeC}/${magasin}`);

      onValue(starCountRef, (snapshot) => {
        // console.log(snapshot.val());
        const donnes = snapshot.val();
        if(donnes != null && donnes != undefined){
          Object.keys(donnes).map((data)=>{
            produitKeys.push(data)
            
          })}

        if (donnes != null) {
          const newProducts = Object.keys(donnes).map((key) => ({
            id: key,
            ...donnes[key],
          }));

          setProduit(newProducts);
        }
      });
    } catch {
      (error) => {
        console.log("waiting time!!!");
      };
    }
  }, [categorie, magasin,changeC]);

  ///variable de types textes
  const heure = "Horaire d'ouverture";

  const date2 = new Date();
  const dateExp = date2.setDate(date2.getDate() + 1);
  const dateExp2 = new Date(dateExp);
  const dateExp3 = dateExp2.toLocaleDateString();
  const date3= new Date();
  const dateExp4 = date3.setDate(date3.getDate() + 2);
  const dateExp5 = new Date(dateExp4);
  const dateExp6 = dateExp5.toLocaleDateString();
  return (
    <>
      <InputBar />
      <Navbar />
      <Image
        src={mag.imageUrl}
        display={"block"}
        alt={`logo de ${mag.organisation}`}
        width={"100%"}
        maxHeight={"70vh"}
        fit={"cover"}
        bgSize={"cover"}
        mb={10}
      />
      <Box display={"flex"} justifyContent={"center"} flexDirection={{base: "column", lg: "row"}} padding={{base: 5, lg: 7}}>
      <Box width={{base: "90%", lg: "40%"}}>
          <Heading fontSize={{base: 35, lg: 50}}>{mag.organisation}</Heading>
          <Text fontSize={"15px"} fontWeight={"medium"}>
            {mag.adresse}
          </Text>
          <Flex mb={2} mt={2}>
            <BsFillTelephoneOutboundFill />
            <Text
              fontSize={"15px"}
              fontWeight={"medium"}
              ml={2}
              color={"green"}
            >
              {mag.number}
            </Text>
          </Flex>
        </Box>
        <Box width={{base: "90%", lg: "30%"}} m={{base: "auto", lg: 10}} mt={{base: 10}} mb={{base: 10}}>
          <Flex>
            <Text fontWeight={"bold"} pr={2}>
              Description :{" "}
            </Text>
            {mag.description == "undefined" ? (
              <Text width={"58%"} maxWidth={"58%"} textAlign={"justify"}>
                {`${mag.categorie} Africain`}
              </Text>
            ) : (
              <Text width={"58%"} maxWidth={"58%"} textAlign={"justify"}>
                {mag.description}
              </Text>
            )}
          </Flex>
          <Flex>
            <Text fontWeight={"bold"}>Nationalité : </Text>
            {mag.nationalite == "undefined" ? (
              <Text ml={2} fontSize={"15px"}>
                Africaine
              </Text>
            ) : (
              <Text ml={2} fontSize={"15px"}>
                {`${(" ", mag.nationalite)} `}
              </Text>
            )}
          </Flex>
          <Flex>
            <Text fontWeight={"bold"} mr={2}>
              Moyen de paiement :{" "}
            </Text>
            <Box>
              {mag.methodeDePaiement != "undefined" &&
              mag.methodeDePaiement != null
                ? Object.values(mag.methodeDePaiement).map(methPaiement => {
                  return (
                    <Text key={methPaiement} mr={2}>
                      {methPaiement},
                    </Text>
                  );
                })
                : "Espèces"}
            </Box>
          </Flex>
          <Flex>
            <Text fontWeight={"bold"}>Reservation : </Text>
            <Text width={"58%"} textAlign={"justify"}>
              {(mag.categorie != "Cosmetique" ||
                mag.categorie != "Epicerie" ||
                mag.categorie != "Commerce de meches" ||
                mag.categorie != "Fret" ||
                mag.categorie != "Salon de Coiffure") != 0 ? (
                <Text color={"messenger.500"} ml={2}>
                  En ligne
                </Text>
              ) : (
                <Text color={"red.400"} ml={2}>
                  Non Disponible
                </Text>
              )}
            </Text>
          </Flex>
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
            {"heure"}{" "}
            {"show" ? (
              <ChevronUpIcon fontSize={"20px"} />
            ) : (
              <ChevronDownIcon fontSize={"20px"} />
            )}{" "}
            :
          </Heading>
          <Collapse in={"show"}>
            <Box ml={10}>
              {day.map((data, index) => (
                <Text key={index} fontSize={"15px"}>
                  {data}:
                  {mag.horaire != undefined && mag.horaire != null
                    ? `${" "} ${mag.horaire[index]? mag.horaire[index] : "Non Renseigné"}`
                    : " Non Renseigné"}
                </Text>
              ))}
            </Box>
          </Collapse>
        </Box>
        <Box width={{base: "100%", lg: "25%"}} m={"auto"} mt={{base: 10}} mb={{base: 10}}>
          <Mapped adresse={mag.adresse} />
        </Box>
      </Box>
        <Box display={"grid"} width={"100%"}>
          {produit.length != 0 ? (
            <>
              {" "}
              <Box ml={["0%","0%","5%","5%","5%"]}>
              <Heading fontSize={"20px"} mt={10} ml={["5%","5%","0%","0%","0%"]}>
                A la carte{" "}
              </Heading>
              <Flex mt={10} ml={[0,0,10,0,0]}>
               
              <Center>
              <SimpleGrid columns={[2, 2, 3,3, 5]} >
                  {produit.map((data, key) => (
                    <Box key={key} boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"} mx={[2,2,2,5,5]} mb={5} >
                    <Link key={key} _hover={{
                      textDecoration:"none"
                    }}
                    href={`${detailsLink}?c=${categorie}&m=${data.organisation}&p=${produitKeys[key]}`}
                    >
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
                          <Text  width={["150px","190px","190px","200px","200px"]} noOfLines={3}  fontSize={"15px"} my={2}>
                            {data.nom}
                          </Text>
                        
                          <Box mb={2}>
                          <Star  id={produitKeys[key]} data={data}/> 
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
                              AddToCart(data,donneeId[key])
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
            <>
            <Heading fontSize={"30px"} mt={10} ml={5}>
                A la carte{" "}
              </Heading>
            <Center mb={20}>
              <Text fontSize={"25px"} fontWeight={600}>Aucun produit de disponibles</Text>
            </Center>
            
            
            </>
          )}
          </Box>
          <Box>
            <Text fontWeight={700} fontSize={"20px"} ml={5}>Liste de produits sponsorisés</Text>
            <Favlist2 categorie={categorie} magasin={magasin}/>
          </Box>
          <FooterR />
    </>
  );
}