import Navbar from "@/components/Navbar";
import InputBar from "@/components/InputBar";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Input,
  Text,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import Footer from "@/components/footer";
import FooterR from "@/components/footerResponsif";
import { app, authentic, db } from "@/FIREBASE/clientApp";
import {
  getAuth,
  onAuthStateChanged,
  sendEmailVerification,
  signOut,
  updateEmail,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { deleteDoc, doc, getDoc, getFirestore, setDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import secureLocalStorage from "react-secure-storage";
import Head from "next/head";

export default function Profiles() {
  const router = useRouter();
  const [users, setUsers] = useState("");
  const [email, setEmail] = useState("");
  const auth = getAuth(app);
  const toast = useToast();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [Ville, setVille] = useState("");
  const [Postale, setPostale] = useState("");
  const firestore = getFirestore(app);
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // console.log()
        setUsers(user);
        setEmail(user.email);
        const docRef = doc(db, "Utilisateurs/" + user.email);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setAddress(docSnap.data().address);
          setVille(docSnap.data().ville);
          setPostale(docSnap.data().code);
          setName(docSnap.data().name);
          setNumber(docSnap.data().number);
          setSurname(docSnap.data().surname);
        }
      } else {
        router.push("/Choose");
      }
    });
  }, [auth,router]);
  const createNew=async ()=>{
    await deleteDoc(doc(db, "Utilisateurs", email));
        const _user = doc(firestore, `Utilisateurs/${users}`);
        // structure the todo data
        const Users = {
          name,
          surname,
          number,
          address,
          email: users,
          state: "active",
        };
        await setDoc(_user, Users);
        toast({
          title: "Mail Mise A Jour",
          description: "Vous serez deconnecté",
          status: "success",
          duration: 10000,
          isClosable: true,
        });
        signOut(authentic);
        secureLocalStorage.clear()
  }

  const updateLang=async ()=>{
    const _user = doc(firestore, 'Utilisateurs/',email.toString());
    // structure the todo data
    const Users = {
      name:name,
      surname:surname,
      number:number,
      address:address,
      email: email,
      ville: Ville,
      code: Postale,
      state: "active",
    };
    await updateDoc(_user, Users);
    toast({
      title: "Information Mise A Jour",
      description: "Vous serez deconnecté",
      status: "success",
      duration: 10000,
      isClosable: true,
    });
    signOut(authentic);
  }
  const updatEmail = () => {
    updateEmail(auth.currentUser, users)
      .then( () => {
        createNew()
      })
      .catch((error) => {
        // console.log(error)
        toast({
          title: "Erreur",
          description: "Veuillez reesayer apres vous etes reconnecté(e)",
          status: "error",
          duration: 10000,
          isClosable: true,
        });
      });
  };
  const sendVerif = () => {
    sendEmailVerification(auth.currentUser)
  .then(() => {
    toast({
      title: "Erreur",
      description: "Veuillez reesayer apres vous etes reconnecté(e)",
      status: "error",
      duration: 10000,
      isClosable: true,
    });
  });
  }
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
        <Box display={{base:"grid",lg:"none"}} mb={5}>
        <InputBar />
        {isLagerThan768 ? <Navbar></Navbar> : <></>}
        </Box>
      <Box
        

      
      >
       
        <Center >
          <Box
            w="lg"
            borderWidth="1px"
            px={10}
            mb={5}
            pb={10}
            shadow="md"
            borderRadius="lg"
            overflow="hidden"
          >
            <Flex pt={5}>
              <Text pt={2} width={"110px"} fontWeight={600} >Email</Text>
              <Input
                type={"text"}
                defaultValue={users.email}
                w={"xs"}
                onChange={(e) => setUsers(e.target.value)}
                ml={5}
              />
            </Flex>
         <Center>   <Button onClick={() => updatEmail()} mt={2}bgColor={"cyan.800"} color="white">Modifier</Button></Center>
            <Heading pt={5} fontSize={"28px"} fontWeight={700}>Informations personnelles</Heading>
            <Flex pt={5}>
              <Text pt={2} width={"110px"} fontWeight={600} >Nom</Text>
              <Input
                type={"text"}
                value={name}
                onChange={(e) => setName(e.target.value)}
                w={"xs"}
                ml={5}
              />
            </Flex>
            <Flex pt={5}>
              <Text pt={2} width={"110px"} fontWeight={600} >Prenom{"(s)"}</Text>
              <Input
                type={"text"}
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                w={"xs"}
                ml={5}
              />
            </Flex>            
            <Flex pt={5}>
              <Text pt={2} width={"110px"} fontWeight={600} >Numéro</Text>
              <Input
                type={"text"}
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                w={"xs"}
                ml={5}
              />
            </Flex>
            <Flex pt={5}>
              <Text pt={2} width={"110px"} fontWeight={600} >Adresse</Text>
              <Input
                type={"text"}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                w={"xs"}
                ml={5}
              />
            </Flex>
            <Flex pt={5}>
              <Text pt={2} width={"110px"} fontWeight={600} >Ville</Text>
              <Input
                type={"text"}
                value={Ville}
                onChange={(e) => setVille(e.target.value)}
                w={"xs"}
                ml={5}
              />
            </Flex>
            <Flex pt={5}>
              <Text pt={2} width={"110px"} fontWeight={600} >Code postale</Text>
              <Input
                type={"text"}
                value={Postale}
                onChange={(e) => setPostale(e.target.value)}
                w={"xs"}
                ml={5}
              />
            </Flex>
            <Center>
              <Flex mt={10}>
                <Button onClick={()=>updateLang()} bgColor={"cyan.800"} color="white">Mettre à jour</Button>
              </Flex>
            </Center>

            {/* <Center>
              <Flex mt={10}>
                <Button onClick={()=>sendVerif()} bgColor={"cyan.800"} color="white">Verifier</Button>
              </Flex>
            </Center> */}
          </Box>
        </Center>
      </Box>
    </>
  );
}
