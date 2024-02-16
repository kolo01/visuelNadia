import { Search2Icon } from '@chakra-ui/icons';
import { Box, Button, IconButton, Image, Input, InputGroup, InputLeftAddon, InputLeftElement, InputRightAddon, InputRightElement, Link, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, SimpleGrid, Text, useDisclosure } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
// fontawesone Icone 
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/FIREBASE/clientApp';
import secureLocalStorage from "react-secure-storage";

const SearcheIcone =  (message) => {

    const [terms,setTerms] = useState("")
    const [check,setCheck] = useState(0)
    const [categorie,setCategorie] = useState()
    const [modalData,setModalData] = useState([])
   

    const recherche =async (terms,categorie)=>{
        
        // console.log("Hello all i need help")
        // console.log(terms)
        // console.log(categorie)
        const q = query(collection(db, "Admin"), where("codePostal", "==", String(terms).trim()),where("categorie", "==", categorie));
    
    const querySnapshot = await getDocs(q);
    // if (querySnapshot.docs) {
    //     querySnapshot.docs.forEach((doc)=>{
    //         console.log(doc.data())
    //     })
    // }
    setModalData(querySnapshot.docs)
    // console.log(querySnapshot.docs)
    // querySnapshot.forEach((doc) => {

    // // doc.data() is never undefined for query doc snapshots
    // modalData.push(doc.data())
    // });
    }


useEffect(()=>{
    setCategorie(secureLocalStorage.getItem("service"))
    
             
    // if (message.message == "Recherchez un magasin") {
               
    //     recherche(terms,categorie)
         
    //  }
  
        
          
         
    }
    ,[check,message,recherche,terms])
   





    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
  <InputGroup>
  <Input type='search' placeholder={Object.values(message)} w={["5em","5em","10em","20em","20em",]} onClick={onOpen}/>
    <InputRightAddon pointerEvents='none'>
    <Text >Rechercher</Text>
    </InputRightAddon>
  </InputGroup>

        
            {/* <IconButton
                variant='outline'
                color={"#08566E"}
                fontSize={'2xl'}
                aria-label='Send email'
                icon={<Search2Icon />}
                onClick={onOpen}
                border={'none'}
            /> */}

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader  color={"#08566E"}>{Object.values(message)}</ModalHeader>
                    <ModalCloseButton color={"#08566E"} />
                    <ModalBody>
                        <InputGroup>
                            <InputLeftAddon
                                pointerEvents='none'
                            >
                                <Text>Rechercher</Text>
                            </InputLeftAddon>
                            <Input
                            
                                type='search'
                                onChange={e=>recherche(e.target.value,categorie)}
                                placeholder='Code Postal'
                                _placeholder={{ color: '#000' }}
                                variant={'outline'}
                                color={"#000"}
                                borderRadius={'full'}
                                outline={'none'}
                            />
                        </InputGroup>
                        
                        {modalData.length == 0 ?<> Aucun Commerce de disponible</> : <>
                            <SimpleGrid columns={2}>
                                {modalData.map((doc,index)=>(
                                    <Box key={index}  m={2} mt={5} as={Link}  onClick={() => {
                                        sessionStorage.setItem("savefrom", doc.data().number),
                                          sessionStorage.setItem("image", doc.data().imageUrl),
                                          sessionStorage.setItem("nom", doc.data().organisation),
                                          sessionStorage.setItem("adresse", doc.data().adresse),
                                          sessionStorage.setItem("categorie", doc.data().categorie);
                                          sessionStorage.setItem("description", doc.data().description);
                                          sessionStorage.setItem("horaire", JSON.stringify(doc.data().horaire));
                                          sessionStorage.setItem("paiement", JSON.stringify(doc.data().methodeDePaiement));
                                      }}
                      _hover={{ textDecoration: "none" }}
                      href={"/otherContent/intermed1"}>
                                       <Image alt={doc.data().organisation} src={doc.data().imageUrl} maxWidth={"150px"} maxHeight={"100px"} minHeight={"100px"} minWidth={"150px"}/>
                                       <Text fontWeight={"bold"} fontSize={"20px"}>{doc.data().organisation}</Text>
                                       <Text fontWeight={"medium"}>{doc.data().adresse}</Text>
                                     </Box>
                                ))}
                            </SimpleGrid>
                        </>}
                    </ModalBody>

                    <ModalFooter>
                        <Button background={'#08566E'} color={'#fff'} mr={3} onClick={onClose}>
                            Annuler
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default SearcheIcone;