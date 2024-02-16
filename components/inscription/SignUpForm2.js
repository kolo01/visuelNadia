"use client";
import {
  Box,
  Button,
  Center,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Link,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
// fontawesone Icone
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAdd,
  faPhone,
  faHome,
  faEnvelope,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
// React icone
import {} from "react-icons/fa";
import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import { app } from "@/FIREBASE/clientApp";
import { getFirestore } from "firebase/firestore";
import { doc } from "@firebase/firestore"; // for creating a pointer to our Document
import { setDoc } from "firebase/firestore"; // for adding the Document to Collection
import FooterR from "../footerResponsif";
import axios from "axios";

const SignUpForm = () => {
  const [name, setName] = useState();
  const [surname, setSurname] = useState();
  const [number, setNumber] = useState();
  const [address, setAdress] = useState();
  const [rue, setRue] = useState();
  const [ville, setVille] = useState("");
  const [code, setCode] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  const [password2, setPassword2] = useState();
  const auth = getAuth(app);
  const router = useRouter();
  const toast = useToast();
  const firestore = getFirestore(app);
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const createUSer = async () => {
    if (password == password2) {
      // create a pointer to our Document
      const _user = doc(firestore, `Utilisateurs/${email.toString()}`);
      // structure the todo data
      const Users = {
        name,
        surname,
        number,
        address,
        email,
      
        ville,
        code,

        state: "active",
      };
      await setDoc(_user, Users);

      await createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          await axios.post("/api/SendWelcome",{
            message: "Bienvenue Sur CHAP",
            email:userCredential.user.email,
          });
          await sendEmailVerification(userCredential.user);
          // console.log(userCredential.user);
          setEmail(userCredential.user.email);
          // router.back()
          signOut(auth);
          alert("Verifier vos Emails svp");
          toast({
            title: "SUCCES.",
            description: "INSCRIPTION VALIDEE",
            status: "success",
            duration: 3000,
            isClosable: true,   
          });
          router.push("/");
        })
        .catch((error) => {
          // throw error;
          const errorCode = error.code;
          const errorMessage = error.message;
          //   console.log(errorMessage)
          //   console.log(errorCode)
          if (errorCode == "auth/email-already-in-use") {
            // console.log("VEUILLEZ VERIFIER VOS INFOS DE CONNEXION");
            toast({
              title: "VEUILLEZ VOUS CONNECTER",
              description: "CET EMAIL EXISTE DEJA DANS NOTRE BASE DE DONNEE",
              status: "error",
              duration: 5000,
              isClosable: true,
            });
          }
        });
    } else {
      // console.log("okay la");
      toast({
        title: "MAUVAISE SAISIE",
        description: "MOT DE PASSE NON IDENTIQUE",
        status: "error",
        duration: 7000,
        isClosable: true,
      });
    }
  };

  const terms1 = ` Nous utilisons vos données personnelles pour vous offrir une expérience personnalisée, ainsi que pour mieux comprendre et améliorer notre service. Pour plus de détails, cliquez ici.`
  const terms = " En continuant, vous acceptez nos "
  const welcome = "BIENVENUE SUR LA PAGE D'INSCRIPTION";

  return (
    <>
      <Center width={"100%"} minHeight={"80vh"} mt={""}>
        <Box
          width={{ base: "95%", md: "50%", xl: "40%", "2xl": "30%" }}
          height={{ base: "fit-content" }}
          
        >
          <Text fontWeight={"bold"} fontSize={"2xl"}>
            Bonjour!
          </Text>
          <Text fontWeight={"light"}>{welcome}</Text>
          <Stack spacing={5} marginTop={"1em"} width={{ base: "100%" }}>
            {/* le nom  */}
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <FontAwesomeIcon icon={faAdd} color={"gray"} />
              </InputLeftElement>
              <Input
                type="text"
                onChange={(ev) => setName(ev.target.value)}
                placeholder="Nom"
                _placeholder={{ color: "gray.400" }}
                variant={"outline"}
                color={"gray.400"}
                borderRadius={"full"}
                required
              />
            </InputGroup>

            {/* le prenom */}
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <FontAwesomeIcon icon={faAdd} color={"gray"} />
              </InputLeftElement>
              <Input
                required
                type="text"
                onChange={(ev) => setSurname(ev.target.value)}
                placeholder="Prenom"
                _placeholder={{ color: "gray.400" }}
                variant={"outline"}
                color={"gray.400"}
                borderRadius={"full"}
              />
            </InputGroup>

            {/* le telephone  */}
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <FontAwesomeIcon icon={faPhone} color={"gray"} />
              </InputLeftElement>
              <Input
                type="number"
                required
                onChange={(ev) => setNumber(ev.target.value)}
                placeholder="Telephone"
                _placeholder={{ color: "gray.400" }}
                variant={"outline"}
                color={"gray.400"}
                borderRadius={"full"}
              />
            </InputGroup>

            {/* le adresse */}
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <FontAwesomeIcon icon={faHome} color={"gray"} />
              </InputLeftElement>
              <Input
                type="text"
                required
                onChange={(ev) => setAdress(ev.target.value)}
                placeholder="Adresse"
                _placeholder={{ color: "gray.400" }}
                variant={"outline"}
                color={"gray.400"}
                borderRadius={"full"}
              />
            </InputGroup>

            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <FontAwesomeIcon icon={faHome} color={"gray"} />
              </InputLeftElement>
              <Input
                type="text"
                required
                onChange={(ev) => setCode(ev.target.value)}
                placeholder="Code postal"
                _placeholder={{ color: "gray.400" }}
                variant={"outline"}
                color={"gray.400"}
                borderRadius={"full"}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <FontAwesomeIcon icon={faHome} color={"gray"} />
              </InputLeftElement>
              <Input
                type="text"
                required
                onChange={(ev) => setVille(ev.target.value)}
                placeholder="Ville"
                _placeholder={{ color: "gray.400" }}
                variant={"outline"}
                color={"gray.400"}
                borderRadius={"full"}
              />
            </InputGroup>
           
            {/* le Email  */}
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <FontAwesomeIcon icon={faEnvelope} color={"gray"} />
              </InputLeftElement>
              <Input
                type="text"
                required
                onChange={(ev) =>
                  setEmail(ev.target.value.trim().toLowerCase())
                }
                placeholder="Email"
                _placeholder={{ color: "gray.400" }}
                variant={"outline"}
                color={"gray.400"}
                borderRadius={"full"}
              />
            </InputGroup>

            {/* mot de passe */}
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <FontAwesomeIcon icon={faLock} color={"gray"} />
              </InputLeftElement>
              <Input
                required
                type={show ? "text" : "password"}
                placeholder="mot de passe"
                _placeholder={{ color: "gray.400" }}
                onChange={(ev) => setPassword(ev.target.value)}
                variant={"outline"}
                color={"gray.400"}
                borderRadius={"full"}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>

            {/* confimer mot de passe */}
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <FontAwesomeIcon icon={faLock} color={"gray"} />
              </InputLeftElement>
              <Input
                required
                onChange={(ev) => setPassword2(ev.target.value)}
                type={show ? "text" : "password"}
                placeholder="confimer  mot de passe"
                _placeholder={{ color: "gray.400" }}
                variant={"outline"}
                color={"gray.400"}
                borderRadius={"full"}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </Stack>
          <Button
            colorScheme="blue"
            variant="solid"
            mt={"2em"}
            // borderRadius={"full"}
            width={"100%"}
            onClick={() => createUSer()}
            bgColor={"#08566e"}
            _hover={{
              bgColor: "#08566e",
            }}
          >
            Inscription
          </Button>
          <Text width={{md:"350px",lg:"480px"}}  pb={20} ml={5}>
        {terms}<Link href="/Terms" color={"blue"} _hover={{textDecoration:"none"}}>Terrmes et Conditions.</Link>{terms1}
        
        </Text>
        </Box>
      </Center>
      
     
        
  
      <FooterR/>
    </>
  );
};

export default SignUpForm;
