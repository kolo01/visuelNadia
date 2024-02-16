import Navbar from "@/components/Navbar";
import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Flex,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BiStar } from "react-icons/bi";
import InputBar from "@/components/InputBar";
import { useMediaQuery } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app, authentic } from "@/FIREBASE/clientApp";
import Carte from "@/components/Cart";
import Head from "next/head";

export default function Cart() {
  const router = useRouter();
  const auth = getAuth(app);
  const [user,setUser] = useState(false)
  useEffect(() => {
    onAuthStateChanged(authentic, (user) => {
      if (!user) {
        sessionStorage.clear();
        localStorage.clear();
        router.push("/Choose");
       
        router.reload();
      }else{
        setUser(true)
      }
    });
  }, [auth, router]);

  
  

  const [isLagerThan768] = useMediaQuery("(min-width: 768px)");
  if(user){
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
        {/* <Navbar />
         */}
        <InputBar />
        {isLagerThan768 ? <Navbar></Navbar> : <></>}
        <Box bgColor={"#EAEDED"}>
          <Center>
            <Flex pb={20}>
              <Text fontSize={40} fontWeight={"bold"}>
                Panier
              </Text>
            </Flex>
            <Flex></Flex>
          </Center>
          <Carte />
        </Box>
      </>
    );
  }
 
}
