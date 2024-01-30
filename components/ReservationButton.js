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
    Button, SimpleGrid, InputGroup, Input, Select, Box, Text, useToast, Textarea
} from '@chakra-ui/react'
import { push, ref, set } from '@firebase/database'
import axios from 'axios'
import sha256 from 'crypto-js/sha256';
import CryptoJS from "crypto-js";
import { useEffect, useState } from 'react'


export default function ReservationButton({ mag, adresse, imageMag }) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [nom, setNom] = useState("")
    const [email, setEmail] = useState("Non connecté")
    const [numero, setNumero] = useState("")
    const [journée, setJournée] = useState("")
    const [note, setNote] = useState("")
    const [personnes, setPersonnes] = useState(1)
    const [heures, setHeures] = useState("")
    const toast = useToast()
    const [loader, setLoader] = useState(false)

    const horaire = ["12:00 - 14:00", "14:00 - 16:00", "16:00 - 18:00", "18:00 - 20:00", "20:00 - 22:00", "22:00 - 24:00"]
    function generateCustomKey() {
        // Obtenez le timestamp actuel en millisecondes
        const timestamp = Date.now();

        // Utilisez un format de date pour formater le timestamp
        const dateFormat = new Intl.DateTimeFormat('fr-FR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: 'UTC'
        });

        const [{ value: month }, , { value: day }, , { value: year }, , { value: hour }, , { value: minute }, , { value: second }] = dateFormat.formatToParts(timestamp);

        // Créez la clé personnalisée en utilisant le timestamp formaté
        const formattedTimestamp = `${year}${day}${month}${hour}${minute}${second}`;

        return `RE${formattedTimestamp}`;
    }

    const handleSubmit = async () => {
        setLoader(true)
        const dat = new Date;

        const year = dat.getUTCFullYear();
        const day = dat.getUTCDate();
        const month = dat.getUTCMonth() + 1;
        const hours = dat.getUTCHours();
        const minutes = dat.getUTCMinutes();
        const seconds = dat.getUTCSeconds();

        const idRes = generateCustomKey()


        const hashDigest = sha256("RE" + year + month + day + hours + minutes + seconds).toString(CryptoJS.enc.Hex);

        const hash = hashDigest.slice(0, 3).toString()

        set(ref(db2, `Reservation/${idRes}${hash}`), {
            nom,

            numero,
            dateReservation: journée,
            reservationId: `${idRes}${hash}`,
            note,
            nbrePerson: personnes,
            type: "Reservation restaurant",
            heureReservation: heures,
            organisation: mag,
            status: "En cours",
            email,
            adresse,
            imageMag

        }).then(async (response) => {

            toast({
                description: "Nous vous contacterons pour la confirmation",
                title: "Reservation enregistrée",
                status: "success",
                duration: 9000,

            })
            await axios.post("/api/SendReservation", {
                email: email,
                client: nom,
                partner: mag,
                note: note,
                date: journée,
                Restaurant: mag,
                couverts: personnes,
                horaire: heures,
            });
            onClose()
            setLoader(false)
        }).catch((error) => {
            console.log(error)
            setLoader(false)
            toast({
                description: "Veuillez verifier votre saisies",
                title: "Erreur lors de la reservation",
                status: "error",
                duration: 9000,

            })
        });

    }



    const handleSaveHours = (data) => {
        setHeures(data),
            toast({
                status: "info", position: "top", title: "Heure enregistré"
            })
    }


    useEffect(() => {
        try {
            setEmail(sessionStorage.getItem("email"))
        } catch {
            console.log("inexistant")
        }

    }, [])




    return (<>
        <Button colorScheme='blue' my={5} onClick={onOpen} mr={3} py={2} px={4} >
            Reserver une table
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
                            <Input type="text" onChange={(e) => setNom(e.target.value)} bgColor={"white"} placeholder="Nom" />
                        </InputGroup>
                        <InputGroup display={"grid"}>
                            <Text>Numéro : </Text>
                            <Input type="number" maxLength={10} onChange={(e) => setNumero(e.target.value)} bgColor={"white"} placeholder="Numéro" />
                        </InputGroup>
                        <InputGroup display={"grid"} >
                            <Text>Email : </Text>
                            <Input type="text" value={email} onChange={(e) => setEmail(e.target.value)} bgColor={"white"} placeholder="Email" />
                        </InputGroup>
                        <Box>
                            <Text mb={0}>Nombre de personnes : </Text>
                            <Select bgColor={"white"} onChange={(e) => setPersonnes(e.target.value)}>
                                <option value="1">1 personne</option>
                                <option value={"2"}>2 personnes</option>
                                <option value={"3"}>3 personnes</option>
                                <option value={"4"}>4 personnes</option>
                                <option value={"5"}>5 personnes</option>
                                <option value={"6"}>6 personnes</option>
                                <option value={"7"}>7 personnes</option>
                                <option value={"8"}>8 personnes</option>
                            </Select>
                        </Box>
                        <Box>
                            <Text mb={0}>Date : </Text>
                            <Input type="date" onChange={(e) => setJournée(e.target.value)} bgColor={"white"} /></Box>
                    </SimpleGrid>
                    <Box mt={5}>
                        <Text color>heure :</Text>
                        <Box bgColor={"white"} width={"100%"} pl={10} height={"fit-content"} py={2} border={"1px solid black"} mt={2} borderRadius={"5px"}>

                            <SimpleGrid columns={2} >
                                {horaire.map((data, index) => <Text key={index} onClick={() => { handleSaveHours(data) }} _hover={{ bgColor: "cyan.500" }}>{data < 10 ? `0${data}` : data}</Text>)}
                            </SimpleGrid>

                        </Box>
                    </Box>
                    <Box>
                        <Text mr={2} fontWeight={700}>
                            Note:
                        </Text>
                        <Textarea bgColor={"white"} onChange={(e) => setNote(e.target.value)} />
                    </Box>

                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' isLoading={loader} onClick={() => { handleSubmit() }} mr={3} py={2} px={4} >
                        Reserver
                    </Button>
                    <Button color={"white"} py={2} px={4} bgColor={"red"} _hover={{
                        bgColor: "red.700"
                    }} onClick={onClose}>Annuler</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </>)
}