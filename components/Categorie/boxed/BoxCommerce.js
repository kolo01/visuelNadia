import React from 'react'
import { ChevronDownIcon, ChevronUpIcon, ExternalLinkIcon, StarIcon } from "@chakra-ui/icons";
import {
  AspectRatio,
  Box,
  Button,
  Center,
  Collapse,
  Flex,
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
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
  Link
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { onValue, push, ref } from "@firebase/database";
import { onAuthStateChanged } from "firebase/auth";
import {
  addDoc,
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useState } from "react";
import { authentic, db, db2 } from "@/FIREBASE/clientApp";
import Navbar from "../../Navbar";
import InputBar from "../../InputBar";
import {
  BsCashCoin,
  BsFillTelephoneOutboundFill,
  BsTelephoneOutboundFill,
} from "react-icons/bs";
import Mapped from "../Map";
import { BiWorld } from "react-icons/bi";
import Favlist2 from "../../generale/FavLists2";
import FooterR from "../../footerResponsif";
import { IoMdAddCircle } from "react-icons/io";
import { FaTruckPickup } from "react-icons/fa";
import AffPlats from "../AffichePlats";
import { TfiWorld } from "react-icons/tfi";
import secureLocalStorage from "react-secure-storage";
import ReservationButton from "../../ReservationButton";
import ReservationCoiff from "../../ReservationCoiffure";
import { MdLocationOn } from "react-icons/md";
import { StarM } from '../Restaurant'; 

function BoxCommerce({mag,
    categorie}) {
        const [show, setShow] = useState(false);
        const handleToggle = () => setShow(!show);
        const day = [
            "lundi",
            "mardi",
            "mercredi",
            "jeudi",
            "vendredi",
            "samedi",
            "dimanche",
          ];
  return (
    <>
      <Image
        src={mag.imageUrl}
        display={"block"}
        alt={`logo de ${mag.organisation}`}
        width={"100%"}
        maxHeight={"70vh"}
        fit={"cover"}
        bgSize={"cover"}

      />
      <Box bgColor={"white"} mb={10} display={"flex"} justifyContent={"center"} flexDirection={{ base: "column", lg: "row" }} padding={{ base: 5, lg: 7 }}>
        <Box width={{ base: "90%", lg: "40%" }} borderRight={["", "", "", "2px solid black", "2px solid black"]}>

          <Flex mb={5} fontSize={20} justifyContent={"space-between"} color={"gray"}>
            <Heading fontSize={{ base: 35, lg: 50 }} color={"black"}>{mag.organisation}</Heading>
            <Flex mt={5} fontSize={15}>
              <Flex>
                <StarM data={mag.feedback} />
              </Flex>

            </Flex>
          </Flex>
          <Flex my={2} ml={-2}>
            <Box mt={-2}>
              <MdLocationOn fontSize={30} ></MdLocationOn>
            </Box>
            <Text fontSize={"15px"} fontWeight={"medium"}>
              {mag.adresse}
            </Text>
          </Flex>

          <Flex display={"flex"}>
            {mag.siteWeb ?
              <Flex mb={2} cursor={"pointer"} display={{ base: "flex", lg: "flex" }} mt={2} mr={5} as={Link} isExternal href={`${mag.siteWeb}`} >
                <TfiWorld fontSize={20} />
                <Text

                  fontSize={"15px"}
                  fontWeight={"medium"}
                  ml={1}
                  color={"green"}
                >
                  Site web
                </Text>
              </Flex> : <Flex display={{ base: "flex", lg: "flex" }} mb={2} mt={2} >
                <TfiWorld fontSize={20} />
                <Text
                  fontSize={"15px"}

                  fontWeight={"medium"}
                  ml={2}
                  color={"green"}
                >
                  Non defini
                </Text>
              </Flex>
            }

            <Flex mb={2} ml={2} mt={2} as={Link} href={`tel:${mag.number}`}>
              <BsFillTelephoneOutboundFill fontSize={20} />
              <Text

                fontSize={"15px"}
                fontWeight={"medium"}
                ml={2}
                color={"green"}
              >
                {mag.number}
              </Text>
            </Flex>

          </Flex>

          {categorie == "Restaurant" ? <ReservationButton mag={mag.organisation} adresse={mag.adresse} imageMag={mag.imageUrl} /> : categorie == "Salon de Coiffure" ? <ReservationCoiff mag={mag.organisation} adresse={mag.adresse} imageMag={mag.imageUrl} /> : <></>}
        </Box>

        <Box width={{ base: "100%", lg: "80%" }} mx={{ base: "0", lg: 10 }} height={"fit-content"} pb={20} borderRight={["", "", "", "2px solid black", "2px solid black"]}>
          <Flex>
            <Text fontWeight={"bold"} pr={2}>
              Description :{" "}
            </Text>
            {mag.description == "undefined" ? (
              <Text width={"58%"} maxWidth={"58%"} textAlign={"justify"}>
                {`${mag.categorie} Africain`}
              </Text>
            ) : (
              <Text width={"58%"} maxWidth={"58%"} textAlign={"justify"}>
                {mag.description}
              </Text>
            )}
          </Flex>
          <Flex>
            <Text fontWeight={"bold"}>Nationalité : </Text>
            {mag.nationalite == "undefined" ? (
              <Text ml={2} fontSize={"15px"}>
                Africaine
              </Text>
            ) : (
              <Text ml={2} fontSize={"15px"}>
                {`${(" ", mag.nationalite)} `}
              </Text>
            )}
          </Flex>
          <Flex width={"100%"} >
            <Text fontWeight={"bold"} width={"280px"} >
              Moyen de paiement :{" "}
            </Text>
            <Box display={["grid", "grid", "grid", "flex", "flex"]} width={"full"} >
              {mag.methodeDePaiement != "undefined" &&
                mag.methodeDePaiement != null
                ? Object.values(mag.methodeDePaiement).map(methPaiement => {
                  return (
                    <Text key={methPaiement} mr={2}>
                      {methPaiement},
                    </Text>
                  );
                })
                : "Espèces"}
            </Box>
          </Flex>
          <Flex>
            <Text fontWeight={"bold"}>Reservation : </Text>
            <Text width={"58%"} textAlign={"justify"}>
              {(mag.categorie != "Cosmetique" ||
                mag.categorie != "Epicerie" ||
                mag.categorie != "Commerce de meches" ||
                mag.categorie != "Fret" ||
                mag.categorie != "Salon de Coiffure") != 0 ? (
                <Text color={"messenger.500"} ml={2}>
                  En ligne
                </Text>
              ) : (
                <Text color={"red.400"} ml={2}>
                  Non Disponible
                </Text>
              )}
            </Text>
          </Flex>
          <Heading
            as={"h3"}
            fontWeight={"bold"}
            _hover={{
              cursor: "pointer",
            }}
            onClick={handleToggle}
            color={"blue.700"}
            fontSize={"15px"}
            mt={3}
          >
            {"Horaire"}{" "}
            {"show" ? (
              <ChevronUpIcon fontSize={"20px"} />
            ) : (
              <ChevronDownIcon fontSize={"20px"} />
            )}{" "}
            :
          </Heading>
          <Collapse in={"show"}>
            <Box ml={10}>
              {day.map((data, index) => (
                <Text key={index} fontSize={"15px"}>
                  {data}:
                  {mag.horaire != undefined && mag.horaire != null
                    ? `${" "} ${mag.horaire[index] ? mag.horaire[index] : "Non Renseigné"}`
                    : " Non Renseigné"}
                </Text>
              ))}
            </Box>
          </Collapse>
        </Box>
        <Box width={{ base: "100%", lg: "40%" }} >
          <Mapped adresse={mag.adresse} numero={mag.number} web={mag.siteWeb} />
        </Box>
      </Box>
    </>
  )
}

export default BoxCommerce