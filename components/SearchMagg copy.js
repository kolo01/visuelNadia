import { Image,Button, Drawer,
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
    DrawerCloseButton,useDisclosure,Input,Box,Center,InputGroup, InputRightElement} from "@chakra-ui/react";
import { useState } from "react";
import { db } from "@/FIREBASE/clientApp";
import { collection, getCountFromServer, getDocs, limit, orderBy, query, where, startAfter, startAt, endAt } from "firebase/firestore";
import { checkStoreAvailability } from "@/utils/dates";

export default function SearchMagg(){
    const { isOpen, onOpen, onClose } = useDisclosure();
    const commerceTypes = [
        "Epicerie", "Textile", "Restaurant", "Cosmétique", "Mèches", "Fret", "Coiffure"
    ];
    let lastConstraints = [];

    const [nameInputValue, setNameInputValue] = useState("");
    const [cityInputValue, setCityInputValue] = useState("");
    const [postalCodeInputValue, setPostalCodeInputValue] = useState("");
    const [tradeTypeInputValue, setTradeTypeInputValue] = useState("");
    const [result, setResult] = useState([]);
    const [progressiveLoadingData, setProgressiveLoadingData] = useState({
        end: false
    });
    const [isLoading, setIsLoading] = useState(false);

    const onNameInputValueChange = (event) => {
        setNameInputValue(event.target.value);
    };
    const onCityInputValueChange = (event) => {
        setCityInputValue(event.target.value);
    };
    const onTradeTypeInputValueChange = (event) => {
        setTradeTypeInputValue(event.target.value);
    };
    const onPostalCodeInputValueChange = (event) => {
        setPostalCodeInputValue(event.target.value);
    };
    const handleSubmit = (event) => {console.log(progressiveLoadingData)
        event.preventDefault();
        fetchStores();
    };
    const handleShowMore = (event) => {console.log(progressiveLoadingData, lastConstraints)
        event.preventDefault();
        fetchMoreStores();
    };
    const resetFilters = () => {
        setCityInputValue("");
        setPostalCodeInputValue("");
        setTradeTypeInputValue("");
    };
    
    const fetchStores = async () => {
        setIsLoading(true);
        let constraints = [];
        if(nameInputValue != ""){
            constraints.push(where("organisation", "==", nameInputValue));
            constraints.push(where("organisation", "==", nameInputValue + "\uf8ff"));
        }
        if(cityInputValue != ""){
            constraints.push(where("ville", "==", cityInputValue));
        }
        if(postalCodeInputValue != ""){
            constraints.push(where("codePostal", "==", postalCodeInputValue));
        }
        if(tradeTypeInputValue != ""){
            constraints.push(where("categorie", "==", tradeTypeInputValue));
        }
        let totalResultsWithoutPagination = (await getCountFromServer(query(collection(db, "Admin"), ...constraints, orderBy("organisation", "asc")))).data().count;
        constraints.push(limit(20));
        let fQuery = query(collection(db, "Admin"), ...constraints, orderBy("organisation", "asc"));
        let querySnapshot = await getDocs(fQuery);
        let stores = [];
        querySnapshot.forEach((doc) => {
            stores.push(doc);
        });
        setProgressiveLoadingData({
            end: (totalResultsWithoutPagination <= stores.length),
        });
        setResult(stores);
        lastConstraints = constraints;
        setIsLoading(false);
    };
    const fetchMoreStores = async () => {
        setIsLoading(true);
        let constraints = lastConstraints;
        let totalResultsWithoutPagination = (await getCountFromServer(query(collection(db, "Admin"), ...constraints, orderBy("organisation", "asc")))).data().count;
        let fQuery = query(collection(db, "Admin"), ...constraints, limit(20), orderBy("organisation", "asc"), startAt(result[result.length - 1]));
        let querySnapshot = await getDocs(fQuery);
        let stores = [];
        querySnapshot.forEach((doc) => {
            stores.push(doc);
        });
        setProgressiveLoadingData({
            end: (totalResultsWithoutPagination <= stores.length),
        });
        setResult([...result, ...stores]);
        setIsLoading(false);
    };

    return(
        <>
        <Box onClick={onOpen} ml={[-4,-4,-4,5,5]} width={["100px","100px","100px","130px","130px"]}   _hover={{
            bgColor: "transparent",
            opacity: "0.7",
            textDecoration: "none",
        }}>
            <Image ml={[6,6,6,10,10]}width={["70px","70px","70px","90px","90px"]} src='./new/mag2.png' cursor={"pointer"} alt="search mag"   />
         
      <Text mt={[0,0,0,8,8]}  width={["130px","130px","130px","180px","180px"]}fontSize={["15px","15px","15px","25px","25px"]}textAlign={"center"}  borderRadius={"25px"} fontWeight={700} color={"black"}>RECHERCHER</Text>
      <Text  ml={4} width={["100px","100px","100px","150px","150px"]}fontSize={["10px","10px","10px","15px","15px"]}  textAlign={"center"} borderRadius={"25px"} color={"black"} fontWeight={600} >Un commerce</Text>
            </Box>
            <Drawer onClose={onClose} isOpen={isOpen} size={"full"}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Recherche un magasin</DrawerHeader>
          <DrawerBody>
           <Box>
            <Center>
                <InputGroup>
                <InputRightElement></InputRightElement>
                
                <Box display={"flex"} width={"100%"} justifyContent={"center"} flexDirection={{base: "column", lg: "row"}}>
                    <Box display={"flex"} width={{base: "95%", lg: "70%"}}>
                        <Input type={"search"}  value={nameInputValue} onChange={onNameInputValueChange} placeholder="Entrez le nom du magasin" />
                        <Button onClick={handleSubmit} marginLeft={2} isLoading={isLoading} >Rechercher</Button>
                    </Box>
                    <Box height={20} width={{base: "95%", lg: "20%"}} marginLeft={2}>
                        <Accordion border={"none"}>
                            <AccordionItem border={"none"}>
                                <h2>
                                <AccordionButton>
                                    <Box as="span" flex='1' textAlign='left'>
                                        Filtres
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                                </h2>
                                <AccordionPanel pb={4}>
                                    <Select placeholder='Type de commerce' variant='filled' mb={2} size={"sm"} value={tradeTypeInputValue} onChange={onTradeTypeInputValueChange}>
                                        {
                                            commerceTypes.map((type,index) => (
                                                <option key={type} value={ type }>{ type }</option>
                                            ))
                                        }
                                    </Select>
                                    <Input placeholder='Ville' variant='filled' size={"sm"} mb={2} value={cityInputValue} onChange={onCityInputValueChange} disabled={(postalCodeInputValue.length != 0)} />
                                    <Input placeholder='Code Postal' size={"sm"} variant='filled' mb={2} value={postalCodeInputValue} onChange={onPostalCodeInputValueChange} disabled={(cityInputValue.length != 0)} />
                                    <Box display={"flex"} justifyContent={"end"}>
                                        <Button size={"sm"} display={"block"} mr={2} onClick={resetFilters} >Effacer</Button>
                                        <Button size={"sm"} display={"block"} onClick={fetchStores} isLoading={isLoading} >Appliquer</Button>
                                    </Box>
                                </AccordionPanel>
                            </AccordionItem>
                        </Accordion>
                    </Box>
                </Box>
                </InputGroup>
                
            </Center>
           </Box>
           <Box textAlign={"start"}>
                <Box columns={5} display={"block"} textAlign={"start"} >
                    {
                        result.map((storeDoc,index) => {
                            let data = storeDoc.data();
                            let isAvailable = data.horaire? checkStoreAvailability(
                                ["lundi", "mardi", "mercredi", "jeudi", "venredi", "samedi", "dimanche"].map(j => data.horaire[j])
                            ) : null;
                            return (
                                <Box key={index} width={300} display={"inline-block"} margin={2} _hover={{cursor: "pointer"}} >
                                    <Box height={150} backgroundColor={"gray.300"} margin={1} backgroundSize={"cover"} borderRadius={"3%"} display={"flex"} overflow={"hidden"} className="store-img-box">
                                        <Image src={ data.imageUrl } display={"block"} height={"100%"} width={"100%"} fit={"cover"} ></Image>
                                        <Box height={"100%"} width={"100%"} marginLeft={"-100%"} display={"flex"} flexDirection={"column"} justifyContent={"center"} backgroundColor={"black"} opacity={0.2} transition={"0.3s"} sx={{
                                            '.store-img-box:hover &': {
                                                transition: "0.3s",
                                                opacity: 0.5
                                            },
                                        }} ></Box>
                                        <Box height={"100%"} width={"100%"} marginLeft={"-100%"} display={"flex"} flexDirection={"column"} justifyContent={"center"} opacity={1} >
                                            <Center>
                                                <Text fontSize={"25"} color={"white"} textAlign={"center"} fontWeight={"bolder"} padding={2} lineHeight={"100%"}>{ data.organisation }</Text>
                                            </Center>
                                        </Box>
                                    </Box>
                                    <Text textAlign={"center"} color={isAvailable? "green.400" : "red.400"} fontSize={15} fontWeight={"bold"}>{ isAvailable != null?
                                        (isAvailable? "Ouvert" : "Fermé") : "Non défini"
                                    }</Text>
                                    <Divider orientation='horizontal' width={"70%"} margin={"auto"} />
                                    <Text textAlign={"center"} fontSize={15} textOverflow={"clip"} overflow={"hidden"} whiteSpace={"nowrap"} > { data.adresse } </Text>
                                </Box>
                            );
                        })
                    }
                </Box>
                <Button display={(!progressiveLoadingData.end && result.length > 0)? "block" : "none" } margin={"auto"} marginTop={10} marginBottom={10} onClick={handleShowMore} isLoading={isLoading} >Plus de résultats</Button>
           </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
        </>
    )
}
