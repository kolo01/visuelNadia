import { db2 } from '@/FIREBASE/clientApp'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Heading,
    Center,
    useDisclosure,
    Button,SimpleGrid,InputGroup,Input,Select,Box, Text, useToast, Textarea
  } from '@chakra-ui/react'
import { push, ref } from '@firebase/database'
import { useEffect, useState } from 'react'


export default function ReservationCoiff({mag,adresse,imageMag}){
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [nom,setNom] = useState("")
    const [email,setEmail] = useState("Non connecté")
    const [numero,setNumero] = useState("")
    const [journée,setJournée] = useState("")
    const [note,setNote] = useState("")
    const [personnes,setPersonnes] = useState(1)
    const [heures,setHeures] = useState("")
    const toast = useToast()
    const [loader, setLoader] = useState(false)

const horaire =["12:00 - 14:00","14:00 - 16:00","16:00 - 18:00","18:00 - 20:00","20:00 - 22:00","22:00 - 24:00"]


    const handleSubmit = () => {
        setLoader(true)
        push(ref(db2, "Reservation"), {
           nom,
           numero,
           journée,
           note,
        type:"Reservation coiffure",
           heures,magasin:mag,status:"En cours",email,adresse,imageMag
           
          }).then((response)=>{
            toast({
                description:"Nous vous contacterons pour la confirmation",
                title:"Reservation enregistrée",
                status:"success",
                duration:9000,
                
            })
            onClose()
            setLoader(false)
          }).catch((error)=>{
            setLoader(false)
            toast({
                description:"Veuille",
                title:"Erreur lors de la reservation",
                status:"error",
                duration:9000,
                
            })
          });
    }

   

    const handleSaveHours = (data) =>{
        setHeures(data),
        toast({
            status:"info",position:"top",title:"Heure enregistré"
        })
    }


    useEffect(()=>{
        try{
            setEmail(sessionStorage.getItem("email"))
        }catch{
            console.log("inexistant")
        }
    },[])




    return(<>
     <Button colorScheme='blue' my={5}  onClick={onOpen} mr={3} py={2} px={4} >
                            Reserver un jour
                        </Button>

   <Modal isOpen={isOpen} onClose={onClose} >
                <ModalOverlay />
                <ModalContent >
                    <ModalHeader>Reservation chez {mag}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

                        <SimpleGrid columns={[1, 1, 1, 2, 2]} spacingX={5} spacingY={5}>
                            <InputGroup display={"grid"}>
                            <Text>Nom : </Text>
                            <Input type="text" onChange={(e)=>setNom(e.target.value)} bgColor={"white"} placeholder="Nom" />
                            </InputGroup>
                            <InputGroup display={"grid"}>
                            <Text>Numéro : </Text>
                            <Input type="number" maxLength={10} onChange={(e)=>setNumero(e.target.value)} bgColor={"white"} placeholder="Numéro" />
                            </InputGroup>
                          
                            <Box>
                            <Text mb={0}>Date : </Text>
                            <Input type="date" onChange={(e)=>setJournée(e.target.value)} bgColor={"white"} /></Box>
                        </SimpleGrid>
                        <Box mt={5}>
                        <Text color>heure :</Text>
                        <Box bgColor={"white"} width={"100%"} pl={10} height={"fit-content"} py={2} border={"1px solid black"} mt={2} borderRadius={"5px"}>
                           
                        <SimpleGrid columns={2} >
                            {horaire.map((data,index)=><Text key={index} onClick={()=>{handleSaveHours(data)}} _hover={{bgColor:"cyan.500"}}>{data<10? `0${data}` : data}</Text>)}
                        </SimpleGrid>
                      
                        </Box>
                        </Box>
                        <Box>
                            <Text mr={2} fontWeight={700}>
                                Note:
                            </Text>
                            <Textarea bgColor={"white"} onChange={(e)=>setNote(e.target.value)}/>
                        </Box>
                       
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' isLoading={loader} onClick={()=>{handleSubmit()}} mr={3} py={2} px={4} >
                            Reserver
                        </Button>
                        <Button color={"white"}  py={2} px={4} bgColor={"red"} _hover={{
                            bgColor:"red.700"
                        }} onClick={onClose}>Annuler</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
    </>)
}