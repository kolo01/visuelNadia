
// import React, { useState, useEffect, useRef } from 'react';
// import {
//   Menu,
//   MenuButton,
//   MenuList,
//   MenuItem,
//   MenuItemOption,
//   MenuGroup,
//   MenuOptionGroup,
//   MenuIcon,
//   MenuCommand,
//   MenuDivider,
//   Button,
//   Flex,
//   Text,
//   chakra,
//   Box,
//   Switch,
//   IconButton,
//   HStack
// } from '@chakra-ui/react';

// import Favlist from '@/components/generale/FavLists';



// export default function App() {
//   return (
//    <>
//    <Favlist/>
//    </>
//   );
// }


import { Box,Container,
  Flex,
  Wrap,
  Heading,
  VStack,
  HStack,
  IconButton,
  WrapItem,
  InputGroup,
  Input,
  FormLabel,
  Textarea,
  FormControl,Text,
  Button } from '@chakra-ui/react';

  import {
    MdPhone,
    MdEmail,
    MdLocationOn,
    MdFacebook,
    MdOutlineEmail,
  } from "react-icons/md";
  import { BsGithub, BsDiscord, BsPerson } from "react-icons/bs";
  import InputBar from "@/components/InputBar";
  import Navbar from "@/components/Navbar";
  import FooterR from "@/components/footerResponsif";
  import Head from "next/head";
const ParentComponent = () => {
  return (<>
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
    <Box
      position="relative"
      minHeight="40vh" // Set a minimum height to the parent element
    >
        <Container maxW="full" mt={0} centerContent overflow="hidden">
      <InputBar />
      <Navbar></Navbar>
      <Flex>
        <Box
          bg="#eeeeee "
          color="white"
          borderRadius="lg"
          boxShadow={"10px red"}
          m={{ sm: 4, md: 16, lg: 10 }}
          p={{ sm: 5, md: 5, lg: 16 }}
        >
          <Box p={4}>
            <Wrap spacing={{ base: 20, sm: 3, md: 5, lg: 20 }}>
              <WrapItem>  
                <Box>
                  <Heading color={"black"}>Nous contacter</Heading>
                  <Text mt={{ sm: 3, md: 3, lg: 5 }} color="gray.500">
                   Veuillez renseigner vos informations
                  </Text>
                  <Box py={{ base: 5, sm: 5, md: 8, lg: 10 }}>
                    <VStack pl={0} spacing={3} alignItems="flex-start">
                      <Button
                        size="md"
                        height="48px"
                        width="200px"
                        variant="ghost"
                        color="blackAlpha.700"
                        _hover={{ border: "2px solid #1C6FEB" }}
                        leftIcon={<MdPhone color="#1970F1" size="20px" />}
                      >
                        06-05-79-90-59
                      </Button>
                      <Button
                        size="md"
                        height="48px"
                        width="200px"
                        variant="ghost"
                        color="blackAlpha.700"
                        _hover={{ border: "2px solid #1C6FEB" }}
                        leftIcon={<MdEmail color="#1970F1" size="20px" />}
                      >
                        srschain@gmail.com
                      </Button>
                      <Button
                        size="md"
                        height="48px"
                        width="250px"
                        variant="ghost"
                        color="blackAlpha.700"
                        _hover={{ border: "2px solid #1C6FEB" }}
                        leftIcon={<MdLocationOn color="#1970F1" size="20px" />}
                      >
                        14 Avenue De Bourgogne,<br/> 91300 Massy
                      </Button>
                    </VStack>
                  </Box>
                  <HStack
                    mt={{ lg: 10, md: 10 }}
                    spacing={5}
                    px={5}
                    alignItems="flex-start"
                  >
                    <IconButton
                      aria-label="facebook"
                      variant="ghost"
                      size="lg"
                      isRound={true}
                      _hover={{ bg: "#0D74FF" }}
                      icon={<MdFacebook size="28px" />}
                    />
                    <IconButton
                      aria-label="github"
                      variant="ghost"
                      size="lg"
                      isRound={true}
                      _hover={{ bg: "#0D74FF" }}
                      icon={<BsGithub size="28px" />}
                    />
                    <IconButton
                      aria-label="discord"
                      variant="ghost"
                      size="lg"
                      isRound={true}
                      _hover={{ bg: "#0D74FF" }}
                      icon={<BsDiscord size="28px" />}
                    />
                  </HStack>
                </Box>
              </WrapItem>
              <WrapItem>
                <Box bg="white" borderRadius="lg">
                  <Box m={8} color="#0B0E3F">
                    <VStack spacing={5}>
                      <FormControl id="name">
                        <FormLabel>Votre Nom</FormLabel>
                        <InputGroup borderColor="#0B0E3F" color="#0B0E3F">
                          {/* <InputLeftElement
                            pointerEvents="none"
                            // children={<BsPerson color="gray.800" />}
                          /> */}
                          <Input
                            type="text"
                            size="md"
                            onChange={(e) => setNom(e.target.value)}
                          />
                        </InputGroup>
                      </FormControl>
                      <FormControl id="name">
                        <FormLabel>E-Mail</FormLabel>
                        <InputGroup  borderColor="#0B0E3F">
                          {/* <InputLeftElement
                            pointerEvents="none"
                            // children={<MdOutlineEmail color="gray.800" />}
                          /> */}
                          <Input
                            type="text"
                            size="md"
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </InputGroup>
                      </FormControl>
                      <FormControl id="name">
                        <FormLabel>Message</FormLabel>
                        <Textarea
                        minLength={30}
                         borderColor="#0B0E3F"
                          // borderColor="gray.300"
                          _hover={{
                            borderRadius: "gray.300",
                          }}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="message"
                        />
                      </FormControl>
                      <FormControl id="name" float="right">
                        <Button
                          variant="solid"
                          bg="#0D74FF"
                          color="white"
                          _hover={{}}
                          // isDisabled={nom.length <= 3 || email.length <= 10 || message.length <= 30}
                          onClick={()=>{SendMail(),setNom(""),setEmail(""),setMessage("")}}
                        >
                          Envoyer
                        </Button>
                      </FormControl>
                    </VStack>
                  </Box>
                </Box>
              </WrapItem>
            </Wrap>
          </Box>
        </Box>
      </Flex>
      <FooterR />
    </Container>

      {/* Fixed element at the bottom */}
      <Box
        position="fixed"
        bottom="0"
        left="0"
        right="0"
        top={"90%"}
        textAlign="center"
        p="4"
        backgroundColor="blue.500"
        color="white"
      >
        This is fixed at the bottom
      </Box>
    </Box>
</>
  );
};

export default ParentComponent;
