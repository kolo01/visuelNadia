
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
import Epicerie from "@/components/Categorie/Epicerie";
import Co from "@/components/Categorie/Co";
import Fret from "@/components/Categorie/Fret";
import Restaurant from "@/components/Categorie/Restaurant";
import Reste from "@/components/Categorie/Reste";
import secureLocalStorage from "react-secure-storage";
import { useSearchParams } from "next/navigation";
import Head from "next/head";
import Script from "next/script"

///fonction du panier

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
    Status: "Demande de Reservation",
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

async function saveCommande3(d1, d2) {
  let email = sessionStorage.getItem("email");

  let adress = secureLocalStorage.addresse;
  let nom2 = secureLocalStorage.name;
  let numero = secureLocalStorage.number;
  let date = new Date();

  if (d1.length != 0 && d2.length != 0) {
    push(ref(db2, "Reservation"), {
      initiateur: email,
      Status: "Demande de Reservation",
      ville: adress,
      // rue: adress,
      // code_postal: adress,
      // batiment: adress,
      // lieu: adress,
      Couverts: d2,
      numero: numero,
      // jour: "A définir",
      // moment: "",
      date: d1,
    });
    alert("réservation effectué");
  } else {
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

export default function Intermed1() {
  const [show, setShow] = useState(false);

  const handleToggle = () => setShow(!show);
  const { isOpen, onToggle, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const router = useRouter();
  const { asPath,query } = router;
 
  const [imageUrl, setImageUrl] = useState("");
  const [numero, setNumero] = useState("");
 
  const [Desc1, setDesc1] = useState("");
  const [nation, setNation] = useState("");
  const [addresse, setAddresse] = useState("");
  const [data, setData] = useState([]);

  const [data1, setData1] = useState();
  const [data2, setData2] = useState();
  const [link,setLink] = useState();
  const [new1,setNew1]=useState("")
  const searchParams = useSearchParams()
  ////HOraire
  const heure = "Horaire d'Ouverture";
  const [horaire, setHoraire] = useState({});

  const [paiement, setPaiement] = useState({});

  const [timert, setTimert] = useState();
  ///fin horaire
  const [slider, setSlider] = useState(null);

  const top = useBreakpointValue({ base: "90%", md: "50%" });
  const side = useBreakpointValue({ base: "30%", md: "10px" });


// console.log(query.categorie,"categorie")
try{
  if(query.categorie){return(
    <>
    
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-RFSVQTGJ87"
        ></Script>
        <Script id="script2" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments)}
           gtag('js', new Date()); 
           gtag('config', 'G-RFSVQTGJ87');
           `}
          
        </Script>
        
    {/* <Text>{query.categorie }</Text> */}
    {/* {query ?  <Restaurant categorie={query.categorie} magasin={query.magasin}/>:<></> } */}
    <Restaurant categorie={query.categorie} magasin={query.magasin}/>
    {/* <Text>{query.magasin}</Text> */}
    </>
  )}  
  else{
    return(
      <>

        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-RFSVQTGJ87"
        ></Script>
        <Script id="script1" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments)}
           gtag('js', new Date()); 
           gtag('config', 'G-RFSVQTGJ87');
           `}
          
        </Script>
        
      <Box>
        <Center display={"grid"}>
        <Image src="./loading.gif" alt="loading.gif" w={"84px"} h={"84px"} />
        <Link href="/">Retourner sur la page principale</Link>
        </Center>
      </Box>
      </>
    )
  }
}catch(error){
  console.log(error)
}
  

}
