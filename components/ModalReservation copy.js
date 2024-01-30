import {
    Image, Button, useDisclosure, Select, SimpleGrid, Box, Flex, Link,
    Text, Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Input,
    RadioGroup,
    Radio,
    Checkbox,
    InputGroup,
    useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { db, db2 } from "@/FIREBASE/clientApp";
import { collection, getDocs, query, where } from "firebase/firestore";
import { push, ref } from "@firebase/database";


export default function Modaliser({ data, jour }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [mag, setMag] = useState("")
    const [etat, setEtat] = useState("")
    const [loader, setLoader] = useState(false)
    const [horaire,setHoraire] = useState([])
    const toast = useToast()

    const heure = jour.getHours();
    
    const makeHour = ({data,jour}) =>{
       
        const heureActu = jour.getHours()
        const plage = data.horaire[parseInt(jour.getDay())]
        console.log(plage)
        try{
            let debut = plage.slice(0,5)
            let fin = plage.slice(6,8)
            if(fin == 24){
                fin=0
            }
            console.log("debut",parseInt(debut))
            console.log("actu",heureActu)
            console.log("fin",fin)
            let i = 0;
            let deadline = debut;
            for (let index = 0; index < 24; index++) {
           
                if(parseInt(debut)<23){
                    if((heureActu+index+1)<=23){
                        horaire.push(heureActu+index+1)
                    }
                    debut= parseInt(debut)+1
                }else{
                    if (i<parseInt(fin)) {
                        horaire.push(i)
                    i=i+1
                    }
                    
                }
                
            }
        }catch(error){
            setHoraire(["Indisponible"])
        }
       
       
    }


    const [nom,setNom] = useState("")
    const [numero,setNumero] = useState("")
    const [journée,setJournée] = useState("")
    const [personnes,setPersonnes] = useState(1)
    const [heures,setHeures] = useState("")
 
    const handleSubmit = () => {
        setLoader(true)
        push(ref(db2, "Reservation"), {
           nom,
           numero,
           journée,
           personnes,
           heures,magasin:mag
          }).then((response)=>{
            toast({
                description:"Nous vous contacterons pour la confirmation",
                title:"Reservation enregistrée",
                status:"success",
                duration:9000,
                
            })
            onClose()
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

    useEffect(() => {
        if (data.horaire != undefined && data.horaire != null) {
            Object.values(data.horaire)[parseInt(jour.getDay())];
            //  console.log( Object.values(item.horaire)[parseInt(jour.getDay())].length)

            // console.log(Object.values(item.horaire)[parseInt(jour.getDay())].slice(0,5))
            if (Object.values(data.horaire)[parseInt(jour.getDay())] === "24h/24") {
                setEtat("Ouvert 24h/24h");
            } else if (
                Object.values(data.horaire)[parseInt(jour.getDay())].length == 0
            ) {
                setEtat("Non défini");
            } else if (
                Object.values(data.horaire)[parseInt(jour.getDay())] === "Fermé"
            ) {
                setEtat("Fermé");
            } else {
                //  console.log(((Object.values(item.horaire)[parseInt(jour.getDay())])).slice(6,8));
                //  console.log(((Object.values(item.horaire)[parseInt(jour.getDay())])).slice(0,2));
                //  console.log(item.horaire);
                // // console.log(parseInt(((Object.values(item.horaire)[parseInt(jour.getDay())])).slice(6,8))+24>parseInt(heure))
                if (
                    Object.values(data.horaire)[parseInt(jour.getDay())].slice(0, 2) <=
                    `${heure}`
                ) {
                    if (
                        parseInt(
                            Object.values(data.horaire)[parseInt(jour.getDay())].slice(6, 8)
                        ) +
                        24 >
                        parseInt(heure)
                    ) {
                        setEtat("Ouvert");
                    } else {
                        setEtat("Fermé");
                    }
                } else {
                    setEtat("Fermé");
                }
            }


        }
        
    })





    return (
        <>

            <Box

                mt={5}
                height={["20vh", "20vh", "20vh", "20vh", "20vh"]}
                width={{ base: "80%", md: "80%" }}
                marginBottom={[40, 40, 40, 10, 10]}
                mr={5}
                borderRadius={25}
            >
                {/* <Link
                    height={"15vh"}
                    width={{ base: "80%", md: "100%" }}
                    mt={5}
                    mr={{ base: "0%", md: "0%" }}
                    _hover={{ textDecoration: "none" }}
                    
                  > */}
                <Box
                    height={"100%"}
                    width={"100%"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    borderRadius={25}
                    onClick={() => { setMag(data.organisation), onOpen(),makeHour({data,jour}) }}
                >


                    <Flex
                        alignItems={"center"}
                        justifyContent={"center"}
                        borderRadius={25}
                        height={"100%"}
                        width={"100%"}
                        bg={"rgba(0, 0, 0, 0.277)"}
                    >
                        <Image src={data.imageUrl} alt={"image du magasin"} width={"100%"} height={"100%"} borderRadius={25} />

                    </Flex>

                    <Box mt={"-100px"}>
                        <Text
                            fontSize={"lg"}
                            color={"#fff"}
                            textAlign={"center"}
                            fontWeight={"bold"}
                        >
                            {data.organisation}
                        </Text>
                    </Box>
                </Box>

                {/* </Link> */}
                
                <Box

                    bgColor={"white"}
                    width={"100%"}
                    borderBottom={'1px solid  black'}
                    textAlign={"center"}
                >
                    {etat == "Ouvert" || etat == "Ouvert 24h/24h" ? (
                        <Text fontSize={"18px"} color={"green"}>
                            {etat}
                        </Text>
                    ) : (
                        <Text fontSize={"18px"} color={"red"}>
                            {etat}
                        </Text>
                    )}
                </Box>
                <Box>
                    <Text as={"h4"} pb={2} align={"center"}>
                        {data.adresse}
                    </Text>
                </Box>
            </Box>
            <Modal isOpen={isOpen} onClose={onClose} >
                <ModalOverlay />
                <ModalContent bgColor={"cyan"}>
                    <ModalHeader>Menu {mag}</ModalHeader>
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
                            <Select bgColor={"white"} onChange={(e)=>console.log(e.target.value)}>
                                <option value="1">1 personne</option>
                                <option value={"2"}>2 personnes</option>
                                <option value={"3"}>3 personnes</option>
                                <option value={"4"}>4 personnes</option>
                                <option value={"5"}>5 personnes</option>
                                <option value={"6"}>6 personnes</option>
                                <option value={"7"}>7 personnes</option>
                                <option value={"8"}>8 personnes</option>
                            </Select>
                            <Input type="date" onChange={(e)=>setJournée(e.target.valueAsDate)} bgColor={"white"} />
                        </SimpleGrid>
                        <Box bgColor={"white"} width={"100%"} pl={10} height={"fit-content"} py={2} border={"1px solid black"} mt={5} borderRadius={"5px"}>
                           
                        <SimpleGrid columns={2} >
                       
                            {horaire.map((data,index)=><Text key={index} onClick={()=>{handleSaveHours(data)}} _hover={{bgColor:"cyan.500"}}>{data<10? `0${data}` : data}:00</Text>)}

                        
                        </SimpleGrid>
                      
                        </Box>
                       
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' isLoading={loader} isDisabled={nom.length<3|| numero.length<8 ||  heures.length} onClick={()=>{handleSubmit()}} mr={3} py={2} px={4} >
                            Reserver
                        </Button>
                        <Button color={"white"}  py={2} px={4} bgColor={"red"} _hover={{
                            bgColor:"red.700"
                        }} onClick={onClose}>Annuler</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </>
    )
    
}