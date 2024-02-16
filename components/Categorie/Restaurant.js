import { ChevronDownIcon, ChevronUpIcon, ExternalLinkIcon, StarIcon } from "@chakra-ui/icons";
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
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
  Link
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
import { authentic, db, db2 } from "@/FIREBASE/clientApp";
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
import AffPlats from "./AffichePlats";
import { TfiWorld } from "react-icons/tfi";
import secureLocalStorage from "react-secure-storage";
import ReservationButton from "../ReservationButton";
import ReservationCoiff from "../ReservationCoiffure";
import { MdLocationOn } from "react-icons/md";
import AvisMag from "./AvisMag";
import BoxRestau from "./boxed/BoxRestau";
import BoxCommerce from "./boxed/BoxCommerce";

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

          { }
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

export function StarM({ data }) {
  let total = 0;
  let star = 0;
  if (data) {
    Object.values(data).map((dat, key) => {

      star = star + parseInt(dat.rating);
      total = total + 1;

    });
  }

  return (
    <>
      {total ? (
        <Flex>
          {/* {data.length} */}
          {/* {star} */}

          { }
          {Array(5)
            .fill("")
            .map((_, i) => (
              <StarIcon
                key={i}
                fontSize={"12px"}
                color={i < star / total ? "yellow" : "gray.500"}
              />
            ))}
          <Text width={"60px"} ml={1} mt={-1}>
          {total} avis
          </Text>
        </Flex>
      ) : (
        <Flex>
          {Array(5)
            .fill("")
            .map((_, i) => (
              <StarIcon key={i} fontSize={"12px"} color={"gray.500"} />
            ))}
          <Text width={"45px"} ml={2} mt={-1}>
          {total} avis
          </Text>
        </Flex>
      )}
    </>
  );
}

export function StarM2({ data }) {
  let total = 0;
  let star = 0;
  let ex = 0;
  let tB = 0;
  let B=0;
  let M=0;
  let Med=0;
  if (data) {
    Object.values(data).map((dat, key) => {

      star = star + parseInt(dat.rating);
      total = total + 1;
      if(parseInt(dat.rating)==5){
        ex =ex+1;
      }else if(parseInt(dat.rating)==4){
        tB =tB+1;
      }else if(parseInt(dat.rating)==3){
        B =B+1;
      }else if(parseInt(dat.rating)==2){
        M =M+1;
      }else if(parseInt(dat.rating)==1){
        Med =Med+1;
      }
    });
  }

  return (
    <>
      {total ? (
       
        <Box display={"block"}>
          {/* {data.length} */}
          {/* {star} */}

          { }
          {Array(5)
            .fill("")
            .map((_, i) => (
              <StarIcon
                key={i}
                fontSize={"20px"}
                color={i < star / total ? "yellow" : "gray.500"}
              />
            ))}
          <Text ml={5} fontSize={"25px"} fontWeight={"bold"} mt={-1}>
            {star / total}/ 5
          </Text>
         <Flex>
          <Box width={'15px'} height={"15px"} mt={1} mr={2} border={"1px solid black"}></Box>
          <Text>Excellent ({ex})</Text>
         </Flex>
         <Flex>
          <Box width={'15px'} height={"15px"} mt={1} mr={2} border={"1px solid black"}></Box>
          <Text>Trés bien ({tB})</Text>
         </Flex>
         <Flex>
          <Box width={'15px'} height={"15px"} mt={1} mr={2} border={"1px solid black"}></Box>
          <Text>Bien ({B})</Text>
         </Flex>
         <Flex>
          <Box width={'15px'} height={"15px"} mt={1} mr={2} border={"1px solid black"}></Box>
          <Text>Moyen ({M})</Text>
         </Flex>
         <Flex>
          <Box width={'15px'} height={"15px"} mt={1} mr={2} border={"1px solid black"}></Box>
          <Text>Mediocre ({Med})</Text>
         </Flex>
        </Box>
      
      ) : (
        <Box display={"block"}>
          {Array(5)
            .fill("")
            .map((_, i) => (
              <StarIcon key={i} fontSize={"12px"} color={"gray.500"} />
            ))}
          <Text ml={2} mt={-1}>
            {total} avis
          </Text>
        </Box>
      )}
    </>
  );
}


export function StarAvis({ data }) {
  let total = 1;
  let star = data;


  return (
    <>
      {total ? (
        <Flex>
          {/* {data.length} */}
          {/* {star} */}

          { }
          {Array(5)
            .fill("")
            .map((_, i) => (
              <StarIcon
                key={i}
                fontSize={"12px"}
                color={i < star / total ? "yellow" : "gray.500"}
              />
            ))}

        </Flex>
      ) : (
        <Flex>
          {Array(5)
            .fill("")
            .map((_, i) => (
              <StarIcon key={i} fontSize={"12px"} color={"gray.500"} />
            ))}

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
  const [produit, setProduit] = useState([])
  const [produitKeys, setProduitKeys] = useState([])
  const [changeC, setChangeC] = useState("")


  const toast = useToast();
  const { isOpen, onToggle, onOpen, onClose } = useDisclosure();
  const router = useRouter();
 
  ///Variable de la modal 
  const [heures, setHeures] = useState("")
  const [couvert, setCouvert] = useState("")
  const [numero, setNumero] = useState("")
  const [detailsLink, setDetailsLink] = useState("")



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
  ///fonction du panier

  async function Exist(productKey, email, uid, product) {
    const cartRef = collection(db, 'orders'); // Supposons que la collection se nomme 'carts'.
    const q = query(cartRef, where('email', '==', email), where("productId", '==', productKey)); // Requête pour récupérer le panier par userId.

    const querySnapshot = await getDocs(q);

    if (querySnapshot.size === 1) {
      const cartDoc = querySnapshot.docs[0];
      const cartData = cartDoc.data();
      // console.log(cartData)
      const itemIndex = Object.values(cartData).find((item) => item.productId === productKey);
      if (itemIndex !== -1) {
        await updateDoc(cartDoc.ref, {
          productId: productKey,
          currentUID: uid,
          orderDescription: product.description,
          orderEtat: product.etat,
          orderNote: product.note,
          orderImageUrl: product.imageUrl,
          orderName: product.nom,
          orderPrice: product.prix,
          orderOrganisation: product.organisation,
          orderQte: querySnapshot.docs[0].data().quantity + 1,
          email: email
        });
      }


    } else {
      await addDoc(collection(db, 'orders'), {
        productId: productKey,
        currentUID: uid,
        orderDescription: product.description,
        orderEtat: product.etat,
        orderNote: product.note,
        orderImageUrl: product.imageUrl,
        orderName: product.nom,
        orderPrice: product.prix,
        orderOrganisation: product.organisation,
        orderQte: 1,
        email: email
      });
    }
  }





  function AddToCart(product, productKey) {


    onAuthStateChanged(authentic, async (user) => {
      if (!user) {
        toast({
          title: "Connectez vous!!!",

          status: "error",
          duration: 9000,
          isClosable: true,
        });
        router.push("/Connexion");
        router.reload();
      } else {
        try {
          await Exist(productKey, user.email, user.uid, product);
          router.reload()
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


  const FavM = async (magasin) => {
    try {
      const cartRef = collection(db, "Admin"); // Assurez-vous que la collection est correcte.
      const q = query(cartRef, where("organisation", "==", magasin));

      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs[0].data();

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
    categorie == "Epicerie" ? setDetailsLink("/Details/detailsEp") : categorie == "Textile" ? setDetailsLink("/Details/details") : setDetailsLink("/Details/detailsCo")
    if (categorie == "Resto") {
      setChangeC("Restaurant")
    }
    else {
      setChangeC(categorie)
    }
    Fav();
    FavM(magasin);
    SearchMagasin(magasin);
    // categorie=="Epicerie"?setDetailsLink("/Details/detailsEp"): categorie=="Textile"?setDetailsLink("/Details/details") : setDetailsLink("/Details/detailsCo")
    try {
      const starCountRef = ref(db2, `${changeC}/${magasin}`);

      onValue(starCountRef, (snapshot) => {
        // console.log(snapshot.val());
        const donnes = snapshot.val();
        if (donnes != null && donnes != undefined) {
          Object.keys(donnes).map((data) => {
            produitKeys.push(data)

          })
        }

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
  }, [categorie, magasin, changeC, produitKeys]);

  ///variable de types textes
  const heure = "Horaire d'ouverture";

  const date2 = new Date();
  const dateExp = date2.setDate(date2.getDate() + 1);
  const dateExp2 = new Date(dateExp);
  const dateExp3 = dateExp2.toLocaleDateString();
  const date3 = new Date();
  const dateExp4 = date3.setDate(date3.getDate() + 2);
  const dateExp5 = new Date(dateExp4);
  const dateExp6 = dateExp5.toLocaleDateString();
  return (
    <Box bgColor={"#f3f3f3"}>
      <InputBar />
      <Navbar />
    {/* {categorie == "Restaurant" ? <BoxRestau mag={mag} categorie={categorie}/> : <BoxCommerce mag={mag} categorie={categorie}/>} */}
    <BoxRestau mag={mag} categorie={categorie}/>

      <Box display={"grid"} width={"100%"} mt={10} >
        {categorie == "Restaurant" ?
          produit.length != 0 ? (
            <Box bgColor={"white"}>










              {" "}
              <Box ml={["5%", "5%", "5%", "5%", "5%"]}>
                <Center><Heading fontSize={"20px"} mt={10} fontWeight={700} ml={["5%", "5%", "0%", "0%", "0%"]}>
                  A la carte{" "}
                </Heading></Center>




                <Flex mt={2} width={"100%"}>

                  <Box w={["400px", "450px", "450px", "100%", "100%"]} overflowX={"auto"} contentAlign={'center'} >
                   <Center>
                    <Tabs   >
                      <TabList ml={["15%","15%","15%","0%","0%"]}>

                        <Tab>Entrées</Tab>
                        <Tab>Plats</Tab>
                        <Tab>Accomp.</Tab>
                        <Tab>Specialités</Tab>

                        <Tab>Boissons</Tab>
                        <Tab>Cocktails</Tab>

                      </TabList>

                      <TabPanels ml={["15%","15%","15%","0%","0%"]}  >
                        <TabPanel width={["400px","400px","400px","full","full"]}>
                          <SimpleGrid columns={2} textAlign={"left"}  >
                            {produit.map((data, key) => (
                              <AffPlats key={key} data={data} type={"Entrées"} />
                            ))}
                          </SimpleGrid>
                        </TabPanel>
                        <TabPanel width={["400px","400px","400px","full","full"]}>
                          <SimpleGrid columns={2} textAlign={"left"}  >
                            {produit.map((data, key) => (
                              <AffPlats key={key} data={data} type={"Plats"} />
                            ))}
                          </SimpleGrid>
                        </TabPanel>
                        <TabPanel width={["400px","400px","400px","full","full"]}>
                          <SimpleGrid columns={2} textAlign={"left"}  >
                            {produit.map((data, key) => (
                              <AffPlats key={key} data={data} type={"Accompagnements"} />
                            ))}
                          </SimpleGrid>
                        </TabPanel>
                        <TabPanel width={["400px","400px","400px","full","full"]}>
                          <SimpleGrid columns={2} textAlign={"left"}  >
                            {produit.map((data, key) => (
                              <AffPlats key={key} data={data} type={"Spécialités"} />
                            ))}
                          </SimpleGrid>
                        </TabPanel>


                        <TabPanel width={["400px","400px","400px","full","full"]}>
                          <SimpleGrid columns={2} textAlign={"left"}  >
                            {produit.map((data, key) => (
                              <AffPlats key={key} data={data} type={"Boissons"} />
                            ))}
                          </SimpleGrid>
                        </TabPanel>
                        <TabPanel width={["400px","400px","400px","full","full"]}>
                          <SimpleGrid columns={2} spacingX={[0,0,0,2,2]} textAlign={"left"}  >
                            {produit.map((data, key) => (
                              <AffPlats key={key} data={data} type={"Cocktails"} />
                            ))}
                          </SimpleGrid>
                        </TabPanel>
                      </TabPanels>
                    </Tabs>
                    </Center>
                  </Box>

                </Flex>
              </Box>
            </Box>
          ) : (
            <>
              <Box mb={5}></Box>
          


            </>
          )
          :
          produit.length != 0 ? (
            <Box bgColor={"white"}>
              {" "}
              <Box pl={["0%", "0%", "5%", "5%", "5%"]} bgColor={"#f3f3f3"}>
                <Heading fontSize={"20px"}  ml={["5%", "5%", "0%", "0%", "0%"]}>
                  Les produits{" "}
                </Heading>
                <Flex mt={5} ml={[0, 0, 10, 0, 0]}>

                  <Center>
                    <SimpleGrid columns={[2, 2, 3, 3, 5]} >
                      {produit.map((data, key) => (
                        <Box key={key} boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"} mx={[2, 2, 2, 5, 5]} mb={5} bgColor={"white"}>
                          <Link key={key} _hover={{
                            textDecoration: "none"
                          }}
                            href={`/Details/details?c=${categorie}&m=${data.organisation}&p=${produitKeys[key]}`}
                            onClick={() => {
                              
                              secureLocalStorage.setItem("items", data)
                              secureLocalStorage.setItem("i", produitKeys[key])
                              

                            }}>
                            <Box
                              mx={5}
                              key={data.id}
                              maxW={"fit-content"}
                              // height={"400px"}
                              my={[0, 0, 0, 5, 5]}
                              borderRadius="lg"
                              display={"grid"}
                              pb={10}
                            // border={"1px solid black"}
                            >
                              <Box
                                width={["130px", "200px", "200px", "200px", "200px"]}
                                height={"fit-content"}
                              // pt={10}


                              >
                                <Image
                                  src={data.imageUrl}
                                  alt={data.nom}
                                  width={["130px", "190px", "190px", "200px", "200px"]}
                                  height={["110px", "160px", "160px", "200px", "200px"]}
                                  maxH={["120px", "160px", "160px", "200px", "200px"]}
                                  maxW={["140px", "200px", "200px", "200px", "200px"]}
                                // borderRadius={"25px"}
                                />
                              </Box>

                              <Box >
                                <Box
                                  height={"fit-content"}

                                  fontWeight="semibold"

                                  lineHeight="tight"

                                  width={["150px", "190px", "190px", "200px", "200px"]}

                                  display={"grid"}
                                  justifyContent={"space-between"}
                                >
                                  <Box width={"100%"} >
                                    <Text width={["150px", "150px", "150px", "200px", "200px"]} noOfLines={3} fontSize={"15px"} my={2}>
                                      {data.nom}
                                    </Text>
                                    <Box mb={2}>
                                      <Star id={produitKeys[key]} data={feed} />
                                      {data.duree == "Expedié en 24h" ? <Text className={"Exp"} my={2}>Livré le {dateExp3} </Text> : <Text className={"Exp"} my={2}>Livré le {dateExp6} </Text>}
                                      <Flex>
                                        <Box mt={2}>
                                          <BsCashCoin />
                                        </Box>
                                        <Text ml={2} mt={-1} fontSize={"12px"} my={2}>Payez en espèce</Text>
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
                                    <Box as="span" fontSize="sm">
                                      €
                                    </Box>
                                  </Box>
                                </Flex>




                              </Box>
                            </Box>
                          </Link>
                          <Flex mb={5} justifyContent={"space-between"} width={"95%"}>
                            <Text ></Text>
                            <Button

                              bgColor={"cyan.700"}
                              // borderRadius={"66px"}
                              width={"fit-content"}
                              as={"a"}
                              onClick={() => {
                                AddToCart(data, produitKeys[key])

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
            </Box>
          ) : (
            <></>
          )

        }

      </Box>
      <Box mt={2}  >
        <Text fontWeight={700} fontSize={"20px"} ml={5}>Produits recommandés</Text>
        <Favlist2 categorie={categorie} magasin={magasin} />
      </Box>
      <AvisMag mag={magasin} email={mag.email} />
      <Center bgColor={"white"} >
        <SimpleGrid mt={2} columns={[1,1,1,2,2]} ml={['30%','30%','30%','20%','20%']} spacingX={20} display={["grid","grid","grid","flex","flex"]} >
          <Box mr={10} display={["none","none","none","block","block"]}>
            <StarM2 data={mag.feedback} />
          </Box>
          <SimpleGrid columns={1}  bgColor={"white"} ml={[0, 0, 0, 10, 10]} >
            {mag.feedback ? (Object.values(mag.feedback).map((data) => {
              return (<>
                <Box width={"400px"} justifyContent={"flex-start"} m={5} ml={0} bgColor={"white"}>
                  <Flex justifyContent={"start"}>
                    <StarAvis data={data.rating} />
                    <Text fontWeight={700} ml={10} mt={-1} fontSize={"15px"}>{data.dateDep ?? ""}</Text>


                  </Flex>
                  <Heading fontSize={"20px"}>{data.avisTitle}</Heading>
                  <Text>{data.avisDesc}</Text>
                  <Text fontSize={"15px"} >{data.usermail}</Text>
                </Box>
              </>)
            }
            )
            )

              : <></>}
          </SimpleGrid>
          <Box mr={10} display={["block","block","block","none","none"]}>
            <StarM2 data={mag.feedback} />
          </Box>
        </SimpleGrid>
      </Center>
      <FooterR />






    </Box>
  );
}