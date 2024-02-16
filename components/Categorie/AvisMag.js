import { app, db } from "@/FIREBASE/clientApp";
import { StarIcon } from "@chakra-ui/icons";
import { Box, Button, Center, Flex, Icon, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, Textarea, useDisclosure, useToast } from "@chakra-ui/react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";

export default function AvisMag({mag,email}){
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [rating, setRating] = useState(0); 
    const [avisTitle,setAvisTitle] = useState("")
    const [avisDesc,setAvisDesc] = useState("")
    const router = useRouter()
 
    const avis = "Titre de l'avis"
  const toast = useToast()
    const handleRatingClick = (selectedRating) => {
      setRating(selectedRating);
    };

    const SendReport =()=>{
      const auth = getAuth(app);
  
  
      onAuthStateChanged(auth,  async(user) => {
        if (!user) {
          toast({
            title: "Veuillez vous connecter SVP!!!",
  
            status: "error",
            duration: 10000,
            isClosable: true,
          })
        }else{
         
          const usermail = secureLocalStorage.getItem("name")
          const docRef = doc(db, "Admin/" + email);
          const date = new Date();
          const dateDep = date.toLocaleDateString();
          await updateDoc(docRef,{
            feedback: arrayUnion({usermail,rating,avisTitle,avisDesc,magasin:email,dateDep})
          })
         router.reload()
        }
      });
     
    }


    return(
      <>
        <Box bgColor={"white"} display={["none","none","none","grid","grid"]}>
          <Center>
         <Box  width={"50%"} mt={5}  >
           <Flex display={"flex"} justifyContent={"space-around"}>
            <Text fontWeight={700} ml={40} textDecoration={"underline"} fontSize={"20px"} fontFamily={"heading"} >Avis </Text>
            <Button colorScheme="cyan"  color={"white"} onClick={onOpen}>Ecrire un avis</Button>
           </Flex>
          </Box>
          </Center>
       
            <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent mr={5}>
            <ModalHeader>Votre avis sur {mag}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <Stack direction="row" spacing={2}>
        {[1, 2, 3, 4, 5].map((star,index) => (
          <Box
          key={index}
           
            as="button"
            onClick={() => handleRatingClick(star)}
          >
            <Icon
              as={StarIcon}
              w={6}
              h={6}
              color={star <= rating ? "yellow.400" : "gray.300"}
            />
          </Box>
        ))}
      </Stack>
                <Box>
                  
                    <Text>{avis} : </Text>
                    <Input type='text' onChange={(e)=>setAvisTitle(e.target.value)} maxLength={50}/>
                  
                    <Text>Avis : </Text>
                    <Textarea width={"full"}onChange={(e)=>setAvisDesc(e.target.value)} maxLength={220} height={"20vh"} />
                  
                </Box>
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' isDisabled={avisTitle.length<3|| avisDesc.length<3} mr={3} onClick={()=>{SendReport()}}>
                Enregistrer
              </Button>
              <Button  onClick={onClose} variant='ghost'>Fermer</Button>
            </ModalFooter>
          </ModalContent>
      </Modal>
        </Box>
          <Box bgColor={"white"} display={["grid","grid","grid","none","none"]}>
          <Center>
         <Box  width={"100%"} mt={5}  >
           <Flex display={"flex"} mx={10} justifyContent={"space-between"}>
            <Text fontWeight={700}  textDecoration={"underline"} fontSize={"20px"} fontFamily={"heading"} >Avis </Text>
            <Button colorScheme="cyan"  color={"white"} onClick={onOpen}>Ecrire un avis</Button>
           </Flex>
          </Box>
          </Center>
       
            <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent mr={5}>
            <ModalHeader>Votre avis sur {mag}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <Stack direction="row" spacing={2}>
        {[1, 2, 3, 4, 5].map((star,index) => (
          <Box
          key={index}
           
            as="button"
            onClick={() => handleRatingClick(star)}
          >
            <Icon
              as={StarIcon}
              w={6}
              h={6}
              color={star <= rating ? "yellow.400" : "gray.300"}
            />
          </Box>
        ))}
      </Stack>
                <Box>
                  
                    <Text>{avis} : </Text>
                    <Input type='text' onChange={(e)=>setAvisTitle(e.target.value)} maxLength={50}/>
                  
                    <Text>Avis : </Text>
                    <Textarea width={"full"}onChange={(e)=>setAvisDesc(e.target.value)} maxLength={220} height={"20vh"} />
                  
                </Box>
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' isDisabled={avisTitle.length<3|| avisDesc.length<3} mr={3} onClick={()=>{SendReport()}}>
                Enregistrer
              </Button>
              <Button  onClick={onClose} variant='ghost'>Fermer</Button>
            </ModalFooter>
          </ModalContent>
      </Modal>
        </Box>
        </>
    )
}