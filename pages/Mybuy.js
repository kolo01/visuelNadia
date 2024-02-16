import { db2 } from "@/FIREBASE/clientApp";
import InputBar from "@/components/InputBar";
import Navbar from "@/components/Navbar";
import {
  Badge,
  Box,
  Image,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,Button,
  SimpleGrid,
  useMediaQuery,
} from "@chakra-ui/react";
import { onValue, ref, update } from "@firebase/database";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { app, db } from "@/FIREBASE/clientApp";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  updateEmail,
} from "firebase/auth";
import Head from "next/head";

function Cancel({ items, email }) {
  // console.log(items.Status);
  if (items.Status == "ANNULE" && items.initiateur == email) {
    return (
      <>
        <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
          <Image src={items.imageUrl} alt={items.nom} />

          <Box p="6">
            <Box display="flex" alignItems="baseline">
              <Badge borderRadius="full" px="2" colorScheme="red">
                {items.Status}
              </Badge>
            </Box>

            <Box
              mt="1"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              noOfLines={1}
            >
              {items.nom}
            </Box>

            <Box>
              {items.totalPrix + " "}
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

function Valide({ items, email }) {
  // console.log(items.Status);
  if (items.Status == "VALIDE" && items.initiateur == email) {
    return (
      <>
        <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
          <Image src={items.imageUrl} alt={items.nom} />

          <Box p="6">
            <Box display="flex" alignItems="baseline">
              <Badge borderRadius="full" px="2" colorScheme="green">
                {items.Status}
              </Badge>
            </Box>

            <Box
              mt="1"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              noOfLines={1}
            >
              {items.nom}
            </Box>

            <Box>
              {items.totalPrix + " "}
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
function Cancel2(id, state) {
  update(ref(db2, "Commandes/" + String(id)), {
    Status: state,
  });
}

function Launch({ items, email,id }) {
  // console.log(items.Status);
  if (items.Status == "En Cours" && items.email == email) {
    return (
      <>
        <Box
          maxW="300px"
          maxH={"150px"}
          display={"flex"}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden" 
        >
          <Image src={items.imageUrl} alt={items.nom} h="75px" w="150px"/>

          <Box p="6">
            <Box display="flex" alignItems="baseline">
              <Badge borderRadius="full" px="2" colorScheme="blue">
                {items.Status}
              </Badge>
            </Box>

            <Box
              mt="1"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              noOfLines={1}
            >
              {items.nom}
            </Box>

            <Box>
              {items.totalPrix + " "}
              <Box as="span" color="gray.600" fontSize="sm">
                €
              </Box>
            </Box>
            <Box>
              <Button bgColor={'red'} _hover={{
                bgColor:'#FF6969'
              }} color={'white'} onClick={() => Cancel2(id, "ANNULE")}>
                ANNULER COMMANDE
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

export default function Buy() {
  const [isLagerThan768] = useMediaQuery("(min-width: 768px)");
  const [commandeListe, setCommandeListe] = useState([]);
  const auth = getAuth(app);
  const router = useRouter();
  const [email, setEmail] = useState();
  const [id,setId] =useState()
  const Getall = async () => {
    const starCountRef = ref(db2, "Commandes/");
    onValue(starCountRef, (snapshot) => {
      setCommandeListe(snapshot.val());
      if (snapshot.val()!=undefined || snapshot.val()!=null) {
        setId(Object.keys(snapshot.val()))
      }
     
      // console.log(snapshot.val())
    });
  };

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/Choose");
      } 
    },[auth,router]);
    Getall();
    setEmail(sessionStorage.getItem("email"));
  }, [setCommandeListe]);

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
      {isLagerThan768 ? <Navbar></Navbar> : <></>}
      <Tabs isFitted variant="enclosed">
        <TabList mb="1em">
          <Tab>VALIDEE</Tab>
          <Tab>EN COURS</Tab>
          <Tab>ANNULEE</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {commandeListe ? (
              Object.values(commandeListe).map((items) => (
                <Valide key={items.key} items={items} email={email} />
              ))
            ) : (
              <Box>Aucune donnee</Box>
            )}
          </TabPanel>
          <TabPanel>
            <Box as={SimpleGrid} columns={2} spacing={10}>
              {commandeListe ? (
                Object.values(commandeListe).map((items) => (
                  <Launch key={items.key} items={items} id={id} email={email} />
                ))
              ) : (
                <Box>Aucune donnee</Box>
              )}
            </Box>
          </TabPanel>
          <TabPanel>
            {commandeListe ? (
              Object.values(commandeListe).map((items) => (
                <Cancel key={items.key} items={items} email={email} />
              ))
            ) : (
              <Box>Aucune donnee</Box>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}
