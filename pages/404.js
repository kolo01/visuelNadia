import InputBar from '@/components/InputBar';
import Navbar from '@/components/Navbar';
import { Box, Heading, Text, Button } from '@chakra-ui/react';
import Head from "next/head";
export default function NotFound() {
  const text1 = "Il semble que vous vous soyez trompé!! "
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
          <Navbar />
    
    <Box textAlign="center" py={10} px={6} mt={"100px"}>
      <Heading
        display="inline-block"
        as="h2"
        size="2xl"
        bgGradient="linear(to-r, teal.400, teal.600)"
        backgroundClip="text">
        404
      </Heading>
      <Text fontSize="18px" mt={3} mb={2}>
       Page Introuvable
      </Text>
      <Text color={'gray.500'} mb={6}>
      {text1}
      </Text>

      {/* <Button
        colorScheme="teal"
        bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
        color="white"
        variant="solid">
       Accueil
      </Button> */}
    </Box>
    </>
  );
}
