import InputBar from "@/components/InputBar";
import Navbar from "@/components/Navbar";
import FooterR from "@/components/footerResponsif";
import { Button, Center, Flex, Link, useMediaQuery,Box,Icon,Text} from "@chakra-ui/react";
import {FaRegUserCircle} from 'react-icons/fa'
import Head from "next/head";
export default function Intermediary() {
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
      <InputBar />
      {isLagerThan768 ? <Navbar></Navbar> : <></>}
      <Center mt={"15%"} mb="20%">
        <Flex display={["grid","grid","flex","flex","flex"]}>
          {/* <Box>
          <Link
            href={"/Connexion"}
            _hover={{
              textDecoration: "none",
            }}
          >
            <Box>
              <Icon as={FaRegUserCircle} fontSize={70} />
              <Text fontSize={30} fontWeight={'semibold'}>Client</Text>
            </Box>
          </Link>
          </Box>
           */}


          <Box mr={[0,0,0,20,20]} mb={10} _hover={{color:"cyan.700"}}>
          <Link
            href={"/Connexion"}
            _hover={{ 
              textDecoration: "none",
            }}
          >
            <Box color={"cyan.700"} >
             <Center> <Icon as={FaRegUserCircle}  fontSize={"90px"} /></Center>
             <Center><Text fontSize={"30px"} fontWeight={'semibold'}>Client</Text></Center>
            </Box>
          </Link>
          </Box>


          
          


         
          <Box  _hover={{color:"cyan.700"}}>
        
          <Link
           href={"https://chapbackofficefournisseur.vercel.app/"}
           isExternal
            _hover={{
              textDecoration: "none",
            }}
          >
            <Box color={"cyan.700"}>
             <Center> <Icon as={FaRegUserCircle} fontSize={"90px"} /></Center>
             <Center><Text fontSize={"30px"} fontWeight={'semibold'}>Partenaire</Text></Center>
            </Box>
          </Link>
          </Box>

        
        </Flex>
      </Center>
      <FooterR/>
    </>
  );
}
