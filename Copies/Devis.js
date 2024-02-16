import {
  Box,
  Flex,
  Center,
  Heading,
  Text,
  Image,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  Select,
  SimpleGrid,
  useToast,
  Checkbox,
  Stack,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";
import InputBar from "@/components/InputBar";
import Navbar from "@/components/Navbar";
import { useState } from "react";
import {
  addDoc,
  collection,
  doc,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import { app, db } from "@/FIREBASE/clientApp";
import MyComponent from "./Aerien";
import MyComponent2 from "./Maritime";
import { BsFillArrowDownCircleFill } from "react-icons/bs";
import Head from "next/head";

export default function Devis() {
  const [email, setEmail] = useState("");
  const [numero, setNumero] = useState("");
  const [dest, setDest] = useState("");
  const [codeDest, setCodeDest] = useState("");
  const [arriv, setArriv] = useState("");
  const [codeArriv, setCodeArriv] = useState("");
 
  const [valeur, setValeur] = useState("");

  const toast = useToast();

  const [checkedItems, setCheckedItems] = useState([false, false, false]);

  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;
  const [radio1, setRadio1] = useState("");
  const [radio2, setRadio2] = useState("");

  const [hidden1, setHidden1] = useState("none");
  const [hidden2, setHidden2] = useState("none");

  const makeDevis = async () => {
    await addDoc(collection(db, "DevisPerso"), {
      email,
      numero,
      dest,
      codeDest,
      arriv,
      codeArriv,
      poids,
      longueur,
      largeur,
      hauteur,
      details,
      valeur,
    }).then(() => {
      toast({
        title: "Devis envoyé",
        description: "Nous vous contacterons!!",
        status: "success",
        duration: 10000,
        isClosable: true,
      });
    });
  };

  ///texte embetant
  const envoi = "Type d'envoi :";
  const CI = "Côte d'Ivoire";
  const slog =
    "Comparer différents transporteur et faites des économies avec CHAP  ";
  const slog1 =
    "Envoyez vos colis vers vers l'Afrique de l'ouest par nos partenaires. Remplissez le formulaire et attendez notre retour mail si vous ne possédez pas un CHAP, sinon vérifiez l'onglet devis de votre compte. Un fois reçu les différentes propositions de nos partenaires, vous pourrez choisir, payer et préparer le colis pour le transporteur.";
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
      <Navbar></Navbar>
      {/* <Center width="100%" mt={20} height="fit-content" mb={10}> */}

      <Box width="90%" ml={["5%", "5%", "5%", "10%", "10%"]} mt={10}>
       
        <Flex>
          <SimpleGrid columns={[1, 1, 1, 2, 2]} width={"100%"}>
           <Box width={["100%", "100%", "100%", "90%", "90%"]}>
           <Center display={"grid"}><Heading   fontSize={"20px"} mb={5}>Envoyer votre colis maintenant</Heading>
            <Center mb={5}><BsFillArrowDownCircleFill fontSize={40} color="#0097A7" />
            </Center></Center>
            <Box
              width={["100%", "100%", "100%", "100%", "100%"]}
              height={"fit-content"}
              boxShadow={"lg"}
              rounded={"xl"}
              p={5}
              border={"1px solid black"}
            >
               <Box fontSize={"15px"} fontWeight={600} mb={5} textAlign="center" textTransform={"uppercase"} >Les retraits à domicile sont uniquement disponible en île-de-France</Box>
             <Flex width={"100%"} justifyContent={"center"}>
              <Text mr={5} mt={-1}>Moyen de transport : </Text>
              <RadioGroup onChange={setRadio1} value={radio1}>
                <Radio value="Aerien" mr={10}>Aérien</Radio>
                <Radio value="Maritime">Maritime</Radio>
              </RadioGroup>
             </Flex>
             {radio1 == "Maritime" ? <MyComponent2/> : <></>}
             {radio1 == "Aerien" ? <MyComponent/> : <></>}
            </Box>
            </Box>
            <Box width={["100%", "100%", "100%", "50%", "50%"]}>
              <Center>
              <Image src="./Devis2.png" alt="image livraison" width={["50%", "50%", "50%", "100%", "100%"]}  />
              </Center>
              <Heading
                fontSize={"20px"}
                textAlign={["center", "center", "center", "left", "left"]}
              >
                {slog}
              </Heading>
            </Box>
          </SimpleGrid>
        </Flex>
        <Text
          fontWeight={"semibold"}
          textAlign={["center", "center", "center", "justify", "justify"]}
          width={["90%", "90%", "90%", "80%", "80%"]}
          my={"40px"}
        >
          {slog1}
        </Text>
      </Box>

      {/* </Center> */}
    </>
  );
}
