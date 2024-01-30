import {
    Box,
    Button,
    Center,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure,
    useMediaQuery,
    useToast,
  } from "@chakra-ui/react";
  import axios from "axios";
  import { useEffect, useState } from "react";
  import { BiCurrentLocation } from "react-icons/bi";
  import { BsGeoAlt } from "react-icons/bs";
  import secureLocalStorage from "react-secure-storage";


export default function Location(){
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [longitude, setLongitude] = useState();
    const [latitude, setLatitude] = useState();
    const [local,setLocal] =useState() 
    const toast = useToast();
    const [ville, setVille] = useState([]);
    const geoloc = async () => {
      
  
      await axios
        .get(
          `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=975de90e9b63426da3ac641fe43acd73`
        )
        .then((response) => {
         
          
          secureLocalStorage.setItem("location",JSON.stringify(response.data.results[0].components))
            setLocal((response.data.results[0].components))
        })
        .catch((error) => {
          toast({
            title: "position introuvable",
            // description: "Bon Achat",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        });
    };
    useEffect(() => {
      
      function success(position) {
        setLongitude(position.coords.longitude);
        setLatitude(position.coords.latitude);
      }
  
      function error() {
        // alert("Sorry, no position available.");
      }
  
      const options = {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 27000,
      };
  
      const watchID = navigator.geolocation.watchPosition(
        success,
        error,
        options
      );
      geoloc()
    });
    
      return(
        <Box>
        <Center>
         {local ?   (<Text fontWeight={"semibold"} fontSize={"2xl"}>
            
            Vous etes en : {local.country},{local.city}
          
       
        </Text>) : (<InputGroup width={"lg"}>
                <InputLeftElement
                  borderLeftRadius={50}
                  pointerEvents="none"
                  bgColor={"#1a94da"}
                 
                />

                <Input
                  borderLeftRadius={50}
                  type="text"
                 
                  onClick={onOpen}
                  borderRight={"none"}
                />
                <Button
                  borderLeft={0}
                  leftIcon={<BiCurrentLocation />}
                  colorScheme="teal"
                  onClick={() => geoloc()}
                  variant="solid"
                >
                  Recupérer ma position
                </Button>
              </InputGroup>)}
            
              
            
        
        </Center>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>RECHERCHE DE LOCALISATION</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Button
                borderLeft={0}
                leftIcon={<BiCurrentLocation />}
                colorScheme="teal"
                onClick={() => {geoloc(),onClose}}
                variant="solid"
              >
                Recupérer ma position
              </Button>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant="ghost">Secondary Action</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    )
      // }
   
}