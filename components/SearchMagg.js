import {
  Image,
  Button,
  Drawer,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Select,
  Text,
  Card,
  DrawerBody,
  Divider,
  DrawerFooter,
  SimpleGrid,
  Icon,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Input,
  Box,
  Center,
  InputGroup,
  InputRightElement,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Link,
} from "@chakra-ui/react";
import { useState } from "react";
import { db } from "@/FIREBASE/clientApp";
import {
  collection,
  getCountFromServer,
  getDocs,
  limit,
  orderBy,
  query,
  where,
  startAfter,
  startAt,
  endAt,
} from "firebase/firestore";
import { checkStoreAvailability } from "@/utils/dates";
import { set } from "@firebase/database";
import { useRouter } from "next/router";

export default function SearchMagg() {
 const router = useRouter()

 const handleRedirect= ()=>{
  router.push("/RechercheMag")
  router.reload()
  
 }
  return (
    <>
      <Box
       as={Link}
       href={"/RechercheMag"}
        ml={[-3, -3, -3, 5, 5]}
        width={["100px", "100px", "100px", "130px", "130px"]}
        _hover={{
          bgColor: "white",
          opacity: "0.7",
          textDecoration: "none",
        }}
      >
        <Image
        mb={2}
          ml={[12, 12, 12, 10, 10]}
          bgColor= "white"
          width={["50px", "50px", "50px", "90px", "90px"]}
          src="./new/searchTag.png"
          cursor={"pointer"}
          alt="search mag"
        />

        <Text
         ml={[4, 4, 4, 0, 0]}
          mt={[-1, -1, -1, 7, 7]}
          width={["130px", "130px", "130px", "180px", "180px"]}
          fontSize={["15px", "15px", "15px", "25px", "25px"]}
          textAlign={"center"}
          borderRadius={"25px"}
          fontWeight={700}
          color={"black"}
        >
          RECHERCHER
        </Text>
        <Text
          ml={8}
          width={["100px", "100px", "100px", "150px", "150px"]}
          fontSize={["10px", "10px", "10px", "15px", "15px"]}
          textAlign={"center"}
          borderRadius={"25px"}
          color={"black"}
          fontWeight={600}
        >
          Un commerce
        </Text>
      </Box>
     
    </>
  );
}
