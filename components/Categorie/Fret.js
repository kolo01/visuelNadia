import { db2 } from "@/FIREBASE/clientApp";
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
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import FooterR from "@/components/footerResponsif";
import secureLocalStorage from "react-secure-storage";
import Favlist2 from "../generale/FavLists2";

///fonction du panier
function saveCart(product) {
  secureLocalStorage.setItem("Cart", JSON.stringify(product));
}
function getCart() {
  let Cart = secureLocalStorage.getItem("Cart");
  if (Cart == null) {
    return [];
  } else {
    return JSON.parse(Cart);
  }
}
function AddToCart(Product) {
  let Cart = getCart();
  let foundit = Cart.find((p) => p.id == Product.id);
  if (foundit != undefined) {
    foundit.quantite++;
    foundit.prix = foundit.quantite * parseInt(Product.prix);
  } else {
    Product.quantite = 1;
    Cart.push(Product);
  }

  saveCart(Cart);
}
////ffin fonction de la cart

/// fonction d'enregistrement des commandes

async function saveCommande2(data) {
  let email = sessionStorage.getItem("email");

  let adress = secureLocalStorage.addresse;
  let nom2 = secureLocalStorage.name;
  let numero = secureLocalStorage.number;
  let date = new Date();

  push(ref(db2, "Commandes"), {
    productID: data.id,
    nom: data.nom,
    description: data.description,
    quantite: data.quantite,
    imageUrl: data.imageUrl,
    organisation: data.organisation,
    totalPrix: data.prix,
    initiateur: email,
    status: "Demande de Reservation",
    ville: adress,
    rue: adress,
    code_postal: adress,
    batiment: adress,
    lieu: adress,
    receveur: nom2,
    numero: numero,
    jour: "A définir",
    moment: "A définir",
    date,
  });
  axios
    .post("/api/sendmail", {
      message: data.description,
      email: email.toString(),
      subject: data.nom,
      image: data.imageUrl,
      price: data.prix,
      quantity: "A Definir",
    })
    .then((response) => {
      alert("Vous Allez recevoir un email");
    })
    .catch((error) => {
      // console.log(error);
    });
}

async function saveCommande3(d1, d2,d3,d4,d5,d6,d7) {
  let email = sessionStorage.getItem("email");

  let organisation = sessionStorage.getItem("nom");
  // let nom2 = secureLocalStorage.name;
  let numero =  d7;
  // let date = new Date();
  if (d1 != undefined && d2 != undefined && d3 != undefined && d4 != undefined && d5!= undefined && d6 != undefined){
    if (d1.length != 0 && d2.length != 0 && d3.length != 0 && d4.length != 0 && d5.length != 0 && d6.length != 0) {
      push(ref(db2, "Devis"), {
        initiateur: email,
        Status: "Demande de Devis",
        organisation: organisation,
        Destination: d2,
        numero: numero,
        longueur: d3,
        date: d1,
        largeur: d4,
        hauteur: d5,
        poids: d6,
      });
      alert("En cours d'estimation, nous vous recontacterons!! ");
    } 
  }
 else {
    alert("Veuillez remplir les champs svp");
  }

  // axios
  //   .post("/api/sendmail", {
  //     message: '',
  //     email: email.toString(),
  //     subject: "Reservation",
  //     image: data.imageUrl,
  //     price: data.prix,
  //     quantity: "A Definir",
  //   })
  //   .then((response) => {
  //     alert("Vous Allez recevoir un email");
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
}

/// fin des fonctions

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

export default function Fret({categorie,magasin}) {
  const [show, setShow] = useState(false);

  const handleToggle = () => setShow(!show);
  const { isOpen, onToggle, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState("");
  const [numero, setNumero] = useState("");
  const [nom, setNom] = useState("");
  const [Desc1, setDesc1] = useState("");
  const [nation, setNation] = useState("");
  const [addresse, setAddresse] = useState("");
  const [data, setData] = useState([]);
 
  const [data1, setData1] = useState();
  const [data2, setData2] = useState();
  const [data3, setData3] = useState();
  const [data4, setData4] = useState();
  const [data5, setData5] = useState();
  const [data6, setData6] = useState();
  const [data7, setData7] = useState();
  const [link, setLink] = useState();
  const [etat1,setEtat1] = useState(false);


  ////HOraire
  const heure = "Horaire d'Ouverture";
  const [horaire, setHoraire] = useState({});

  const [paiement, setPaiement] = useState({});

  const [timert, setTimert] = useState();
  ///fin horaire
  const [slider, setSlider] = useState(null);

  const top = useBreakpointValue({ base: "90%", md: "50%" });
  const side = useBreakpointValue({ base: "30%", md: "10px" });

  useEffect(() => {
   


  

    const starCountRef = ref(
      db2,
      `${categorie}/${magasin}`
    );

    onValue(starCountRef, (snapshot) => {
      // console.log(snapshot.val());
      const donnes = snapshot.val();

      if (donnes != null) {
        const newProducts = Object.keys(donnes).map((key) => ({
          id: key,
          ...donnes[key],
        }));

        setData(newProducts);
      }
    });
  }, [
    setImageUrl,
    setAddresse,
    setNom,
    setNumero,
    setHoraire,
    setDesc1,
    setCategorie,
  ]);

  const images = [imageUrl, imageUrl, imageUrl, imageUrl];
  return (
    <>
      <InputBar />
      <Navbar />
      {/* CSS files for react-slick */}

      <Box ml={["3%", "3%", "3%", "10%", "10%"]} mt={10} mb={10}>
        <Box display={["none", "none", "none", "grid", "grid"]}>
          <Flex>
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

            <Box>
              <Heading fontSize={"35px"}>{nom}</Heading>
              <Text fontSize={"15px"}  opacity={0.5}fontWeight={"medium"}>
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
                  <Text width={"58%"} textAlign={"justify"}>
                    {`${(" ", categorie)} Africain`}
                  </Text>
                ) : (
                  <Text width={"58%"} textAlign={"justify"}>
                    {`${(" ", Desc1)} `}
                  </Text>
                )}
              </Flex>

              <Flex>
                <Text fontWeight={"bold"}>Nationalité : </Text>
                {nation == "undefined" ? (
                  <Text ml={2} fontSize={"15px"}>
                    Africaine
                  </Text>
                ) : (
                  <Text ml={2} fontSize={"15px"}>
                    {`${(" ", nation)} `}
                  </Text>
                )}
              </Flex>
              <Flex>
              <Text fontWeight={"bold"} mr={2}>Moyen de paiement : </Text>
                <Flex>
                {paiement != "undefined" && paiement != null
                      ? Object.values(paiement).map((data,index)=>{return(<Text key={index}>{data}</Text>)})
                      : "Espèces"}
                
                  {/* <Text ml={2} fontSize={"15px"}>
                    {paiement != "undefined" && paiement != null
                      ? paiement.methodeDePaiement2
                      : ""}
                  </Text> */}
                </Flex>
              </Flex>
              <Flex>
                <Text fontWeight={"bold"}>Reservation : </Text>
                <Text width={"58%"} ml={2} textAlign={"justify"}>
                  {data.length != 0 ? (
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
              <Box display={["none", "none", "none", "grid", "grid"]}>
                <iframe
                  width="400"
                  height="200"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src={link}
                ></iframe>
              </Box>
              <Box
                width={"300px"}
                display={["grid", "grid", "grid", "none", "none"]}
              >
                <iframe
                  width="300"
                  height="200"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src={link}
                ></iframe>
              </Box>
            </Box>
          </Flex>
          <Box mt={5} width={"90%"}>
            <Center>
              <Box mr={2}>
                <Button
                  color={"#fff"}
                  width={"150px"}
                  height={"30px"}
                  as={"a"}
                 
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
                  onClick={onOpen}
                  // isDisabled={true}
                  bgColor={"cyan.700"}
                  _hover={{
                    backgroundColor: " cyan.900",
                    color: "white ",
                  }}
                  // leftIcon={<BsTelephoneOutboundFill />}
                >
                  Devis
                </Button>
               
              </Box>
            </Center>
          </Box>
        </Box>
        <Flex
          display={["grid", "grid", "none", "none", "none"]}
          width={"fit-content"}
        >
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
                <Text width={"58%"} textAlign={"justify"}>
                  {categorie} Africain
                </Text>
              ) : (
                <Text width={"58%"} textAlign={"justify"}>
                  {Desc1}
                </Text>
              )}
            </Flex>
            <Flex>
              <Text fontWeight={"bold"}>Nationalité : </Text>
              {nation == "undefined" ? (
                <Text ml={2} fontSize={"15px"}>
                  Africaine
                </Text>
              ) : (
                <Text ml={2} fontSize={"15px"}>
                  {`${(" ", nation)} `}
                </Text>
              )}
            </Flex>
            <Flex>
            <Text fontWeight={"bold"}  mr={2}>Moyen de paiement : </Text>
                <Flex>
                {paiement != "undefined" && paiement != null
                      ? Object.values(paiement).map((data,index)=>{return(<Text key={index}>{data}</Text>)})
                      : "Espèces"}
                
                  {/* <Text ml={2} fontSize={"15px"}>
                    {paiement != "undefined" && paiement != null
                      ? paiement.methodeDePaiement2
                      : ""}
                  </Text> */}
                </Flex>
            </Flex>
            <Flex>
              <Text fontWeight={"bold"}>Reservation : </Text>
              <Text width={"58%"} textAlign={"justify"}>
                {data.length != 0 ? (
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
              <Box mt={5}>
                <Button
                py={5}
                px={5}
                  color={"#fff"}
                  width={"150px"}
                  height={"30px"}
                  as={"a"}
                 
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

              <Box mt={5}>
                <Button
                py={5}
                px={5}
                  color={"#fff"}
                  width={"150px"}
                  height={"30px"}
                  as={"a"}
                  // isDisabled={true}
                  onClick={onOpen}
                  bgColor={"cyan.700"}
                  _hover={{
                    backgroundColor: " cyan.900",
                    color: "white ",
                  }}
                  // leftIcon={<BsTelephoneOutboundFill />}
                >
                  Devis
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
              <Box
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
              </Box>
            </Box>
          </Center>
        </Flex>
        <Flex
          display={["none", "none", "grid", "none", "none"]}
          width={"fit-content"}
        >
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
            <Text fontSize={"30px"}>{nom}</Text>
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
                <Text width={"58%"} textAlign={"justify"}>
                  {categorie} Africain
                </Text>
              ) : (
                <Text width={"58%"} textAlign={"justify"}>
                  {Desc1}
                </Text>
              )}
            </Flex>
            <Flex>
              <Text fontWeight={"bold"}>Nationalité : </Text>
              {nation == "undefined" ? (
                <Text ml={2} fontSize={"15px"}>
                  Africaine
                </Text>
              ) : (
                <Text ml={2} fontSize={"15px"}>
                  {`${(" ", nation)} `}
                </Text>
              )}
            </Flex>
            <Flex>
            <Text fontWeight={"bold"}  mr={2}>Moyen de paiement : </Text>
                <Flex>
                {paiement != "undefined" && paiement != null
                      ? Object.values(paiement).map((data,index)=>{return(<Text key={index}>{data}</Text>)})
                      : "Espèces"}
                
                  {/* <Text ml={2} fontSize={"15px"}>
                    {paiement != "undefined" && paiement != null
                      ? paiement.methodeDePaiement2
                      : ""}
                  </Text> */}
                </Flex>
            </Flex>
            <Flex>
              <Text fontWeight={"bold"}>Reservation : </Text>
              <Text width={"58%"} textAlign={"justify"}>
                {data.length != 0 ? (
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
              <Box mt={5}>
                <Button
                py={5}
                px={5}
                  color={"#fff"}
                  width={"150px"}
                  height={"30px"}
                  as={"a"}
                
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
                  // isDisabled={true}
                  onClick={onOpen}
                  bgColor={"cyan.700"}
                  _hover={{
                    backgroundColor: " cyan.900",
                    color: "white ",
                  }}
                  // leftIcon={<BsTelephoneOutboundFill />}
                >
                  Devis
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
              <Box
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
              </Box>
            </Box>
          </Center>
        </Flex>
        <Modal isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Demande de Devis</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <Center>
                      <Box >
                        <Text>Date & heure expedition: </Text>

                        <Input
                          type="datetime-local"
                          width={"180px"}
                          onChange={(e) => setData1(e.target.value)}
                        />
                      </Box>
                      </Center>
                     
                      <SimpleGrid columns={2}>
                      <Box >
                        <Text>Destination: </Text>
                        <Input
                          placeholder="lieu de destination"
                          type="text"
                          width={"180px"}
                          onChange={(e) => setData2(e.target.value)}
                        />
                      </Box>
                        <Box>
                              <Text >Votre Numero : </Text>
                              <Input
                              // placeholder="votre numero"
                              value={data7}
                              isDisabled={etat1}
                                type="number"
                                width={"180px"}
                                onChange={(e) => setData7(e.target.value)}
                              />
                            </Box>
                     
                      <Box >
                        <Text>Longueur: </Text>
                        <Input
                          // placeholder="longueur en metres"
                          type="number"
                          width={"180px"}
                          onChange={(e) => setData3(e.target.value)}
                        />
                      </Box>
                      
                      <Box>
                        <Text>Largeur: </Text>
                        <Input
                          // placeholder="largeur en metres"
                          type="number"
                          width={"180px"}
                          onChange={(e) => setData4(e.target.value)}
                        />
                      </Box>
                     
                      <Box>
                        <Text>hauteur : </Text>
                        <Input
                          // placeholder="hauteur en metres"
                          type="number"
                          width={"180px"}
                          onChange={(e) => setData5(e.target.value)}
                        />
                      </Box>
                     
                      <Box >
                        <Text>Poids: </Text>
                        <Input
                          // placeholder="poids  en kg"
                          type="number"
                          width={"180px"}
                          onChange={(e) => setData6(e.target.value)}
                        />
                      </Box>
                      </SimpleGrid>
                      
                    
                    
                    </ModalBody>

                    <ModalFooter>
                      {/* <Button colorScheme="ghost" mr={3} onClick={onClose}>
                    Annuler
                  </Button> */}

                      <Button
                        bgColor={"cyan.700"}
                        color={"white"}
                        _hover={{ bgColor: "cyan.900" }}
                        onClick={() => {
                          saveCommande3(data1, data2,data3,data4,data5,data6,data7),
                            setData1(""),
                            setData2("");
                        }}
                      >
                        Valider
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
        {/* fin slide  */}
      </Box>
      <Box>
          
        </Box>
      <FooterR />
    </>
  );
}
