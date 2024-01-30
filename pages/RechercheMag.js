import {
  Box,
  Button,
  Center,
  Divider,
  useMediaQuery,
  Heading,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useDisclosure,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Select,
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
import InputBar from "@/components/InputBar";
import Navbar from "@/components/Navbar";
import { set } from "@firebase/database";
import { Search2Icon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

export default function RechercheMag() {
  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure();
  const commerceTypes = [
    "Epicerie",
    "Textile",
    "Restaurant",
    "Cosmetique",
    "Commerce de meches",
    "Fret",
    "Salon de Coiffure",
  ];

  const [nameInputValue, setNameInputValue] = useState("");
  const [etat, setEtat] = useState("");
  const [found, setFound] = useState("");

  const [result, setResult] = useState([]);
  const [tradeTypeInputValue, setTradeTypeInputValue] = useState("");
  const [cityInputValue, setCityInputValue] = useState("");
  const [postalCodeInputValue, setPostalCodeInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    let all = (
      await getCountFromServer(
        query(
          collection(db, "Admin"),

          where("ville", "==", nameInputValue)
        )
      )
    ).data();
    let fetched = query(
      collection(db, "Admin"),
      where("ville", "==", nameInputValue)
    );

    let data = await getDocs(fetched);

    if (all.count > 0) {
    
    
      setResult(data.docs)
    } else {
      setResult([]);
      setFound("Aucun commerce trouvé");
    }
  };

  const handleApplied = async () => {
    if (nameInputValue.length > 3) {
      if (tradeTypeInputValue.length > 3) {
        let all = (
          await getCountFromServer(
            query(
              collection(db, "Admin"),
              where("ville", "==", nameInputValue),
              where("categorie", "==", tradeTypeInputValue)
            )
          )
        ).data();
        let fetched = query(
          collection(db, "Admin"),
          where("ville", "==", nameInputValue),
          where("categorie", "==", tradeTypeInputValue)
        );

        let data = await getDocs(fetched);
        if (all.count > 0) {
          data.forEach((doc, index) => {
            setResult(doc.data());
          });
        } else {
          setResult([]);
          setFound("Aucun commerce trouvé");
        }
      } else if (cityInputValue.length > 3) {
        let all = (
          await getCountFromServer(
            query(
              collection(db, "Admin"),
              where("ville", "==", nameInputValue),
              where("organisation", "==", cityInputValue)
            )
          )
        ).data();
        let fetched = query(
          collection(db, "Admin"),
          where("ville", "==", nameInputValue),
          where("organisation", "==", cityInputValue)
        );

        let data = await getDocs(fetched);

        if (all.count > 0) {
          data.forEach((doc, index) => {
            setResult(doc.data());
          });
        } else {
          setResult([]);
          setFound("Aucun commerce trouvé");
        }
      } else if (postalCodeInputValue.length > 3) {
        let all = (
          await getCountFromServer(
            query(
              collection(db, "Admin"),
              where("ville", "==", nameInputValue),
              where("codePostal", "==", postalCodeInputValue)
            )
          )
        ).data();
        let fetched = query(
          collection(db, "Admin"),
          where("ville", "==", nameInputValue),
          where("codePostal", "==", postalCodeInputValue)
        );

        let data = await getDocs(fetched);

        if (all.count > 0) {
          data.forEach((doc, index) => {
            setResult(doc.data());
          });
        } else {
          setResult([]);
          setFound("Aucun commerce trouvé");
        }
      }
    } else {
      if (tradeTypeInputValue.length > 3) {
        
        let all = (
          await getCountFromServer(
            query(
              collection(db, "Admin"),

              where("categorie", "==", tradeTypeInputValue)
            )
          )
        ).data();
        let fetched = query(
          collection(db, "Admin"),
          where("categorie", "==", tradeTypeInputValue)
        );

        let data = await getDocs(fetched);

        if (all.count > 0) {
          // data.forEach((doc, index) => {
          //   result.push(doc.data());
          // });
          // console.log(data.docs,"input avec code")
        
          setResult(data.docs)
        } else {
          setResult([]);
          setFound("Aucun commerce trouvé");
        }
      } else if (cityInputValue.length > 3) {
        let all = (
          await getCountFromServer(
            query(
              collection(db, "Admin"),

              where("organisation", "==", cityInputValue)
            )
          )
        ).data();
        let fetched = query(
          collection(db, "Admin"),
          where("organisation", "==", cityInputValue)
        );

        let data = await getDocs(fetched);

        if (all.count > 0) {
        
        
          setResult(data.docs)
        } else {
          setResult([]);
          setFound("Aucun commerce trouvé");
        }
      } else if (postalCodeInputValue.length > 3) {
        let all = (
          await getCountFromServer(
            query(
              collection(db, "Admin"),

              where("codePostal", "==", postalCodeInputValue)
            )
          )
        ).data();
        let fetched = query(
          collection(db, "Admin"),
          where("codePostal", "==", postalCodeInputValue)
        );

        let data = await getDocs(fetched);

        if (all.count > 0) {
        
        
          setResult(data.docs)
        } else {
          setResult([]);
          setFound("Aucun commerce trouvé");
        }
      }
    }
  };

  const resetFilters = () => {
    setTradeTypeInputValue("");
    setCityInputValue("");
    setPostalCodeInputValue("");
  };
  const fetchStores = () => {
    console.log("okay");
  };
  const [isLagerThan768] = useMediaQuery("(min-width: 768px)");

  const handleReload =(categorie,organisation) =>{
    router.push(`/otherContent/intermed1?categorie=${categorie}&magasin=${organisation}`)
    router.reload()
  }


  return (
    <>
      <InputBar />
      {isLagerThan768 ? <Navbar></Navbar> : <></>}
      <Center width={"100%"}>
        <Box width={"80%"} mt={10}>
          <Box>
            <Heading fontSize={"20px"} fontWeight={"none"}>Rechercher un magasin</Heading>
            <Box>
              <Box>
                <Center display={"grid"} width={"full"}>
                  <InputGroup minWidth={["300px","400px","500px","900px","900px",]}>
                    <InputRightElement></InputRightElement>

                    <Box
                      display={"flex"}
                      width={"100%"}
                      justifyContent={"center"}
                      flexDirection={{ base: "column", lg: "row" }}
                    >
                      <Box display={"flex"} width={{ base: "95%", lg: "70%" }}>
                        <Input
                          type={"search"}
                          value={nameInputValue}
                          onChange={(e) => {
                            setNameInputValue(e.target.value);
                          }}
                          placeholder="Entrez la ville"
                        />
                        <Button
                          display={["none", "none", "none", "flex", "flex"]}
                          onClick={handleSubmit}
                          marginLeft={2}
                          isLoading={isLoading}
                        >
                          Rechercher
                        </Button>
                        <Button
                          rightIcon={<Search2Icon />}
                          cursor={"pointer"}
                          ml={2}
                          width={"fit-content"}
                          onClick={handleSubmit}
                          display={["flex", "flex", "flex", "none", "none"]}
                        ></Button>
                        {/* <Search2Icon onClick={handleSubmit} cursor={"pointer"} bgColor={"gray.300"} fontSize={"35px"} ml={2}  px={2} display={["flex","flex","flex","none","none"]}/> */}
                      </Box>
                    </Box>
                  </InputGroup>
                
                </Center>
                <Center position={"relative"} bgColor={"white"}>
                <Box
                bgColor={"white"}
                h={"fit-content"} pb={5}
                    width={{ base: "45%", lg: "20%" }}
                    
                  >
                    <Accordion allowToggle >
                      <AccordionItem border={"none"}>
                        <h2>
                          <AccordionButton border={"1px solid black"} mt={5}>
                            <Box as="span" flex="1" textAlign="left">
                              Filtres
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4} bgColor={"white"} position={"relative"}>
                          {/* <Select
                            placeholder="Type de commerce"
                            variant="filled"
                            mb={2}
                            size={"sm"}
                            value={tradeTypeInputValue}
                            onChange={(e) =>
                              setTradeTypeInputValue(e.target.value)
                            }
                          >
                            {commerceTypes.map((type, index) => (
                              <option key={type} value={type}>
                                {type}
                              </option>
                            ))}
                          </Select> */}
                          <Input
                            placeholder="Nom"
                            variant="filled"
                            size={"sm"}
                            value={cityInputValue}
                            mb={2}
                            onChange={(e) => setCityInputValue(e.target.value)}
                            disabled={postalCodeInputValue.length != 0}
                          />
                          <Input
                            placeholder="Code Postal"
                            type={"number"}
                            size={"sm"}
                            value={postalCodeInputValue}
                            variant="filled"
                            mb={2}
                            onChange={(e) =>
                              setPostalCodeInputValue(e.target.value)
                            }
                            disabled={cityInputValue.length != 0}
                          />
                          <Box display={"flex"} justifyContent={"end"}>
                            <Button
                              size={"sm"}
                              display={"block"}
                              mr={2}
                              onClick={() => resetFilters()}
                            >
                              Effacer
                            </Button>
                            <Button
                              size={"sm"}
                              display={"block"}
                              onClick={() => handleApplied()}
                              isLoading={isLoading}
                            >
                              Appliquer
                            </Button>
                          </Box>
                        </AccordionPanel>
                      </AccordionItem>
                    </Accordion>
                  </Box>
                  </Center>
              </Box>

{typeof(result[0]) =="object" ?<Box> 
  { result.map((doc,index)=>(
    <>
    <Center display={["grid","grid","grid","none","none"]}>
                <Box
                as={Link}
                href={`/otherContent/intermed1?categorie=${doc.data().categorie}&magasin=${doc.data().organisation}`}
                    key={index}
                  width={300}
                  display={"inline-block"}
                  margin={2}
                  _hover={{ cursor: "pointer" }}
                >
                 {/* <Text>{doc.data().organisation}</Text> */}
                  <Box
                    height={150}
                    backgroundColor={"gray.300"}
                    margin={1}
                    backgroundSize={"cover"}
                    borderRadius={"3%"}
                    display={"flex"}
                    overflow={"hidden"}
                    className="store-img-box"
                  >
                    <Image
                      alt={doc.data().organisation}
                      src={doc.data().imageUrl}
                      display={"block"}
                      height={"100%"}
                      width={"100%"}
                      fit={"cover"}
                    ></Image>
                    <Box
                      height={"100%"}
                      width={"100%"}
                      marginLeft={"-100%"}
                      display={"flex"}
                      flexDirection={"column"}
                      justifyContent={"center"}
                      backgroundColor={"black"}
                      opacity={0.2}
                      transition={"0.3s"}
                      sx={{
                        ".store-img-box:hover &": {
                          transition: "0.3s",
                          opacity: 0.5,
                        },
                      }}
                    ></Box>
                    <Box
                      height={"100%"}
                      width={"100%"}
                      marginLeft={"-100%"}
                      display={"flex"}
                      flexDirection={"column"}
                      justifyContent={"center"}
                      opacity={1}
                    >
                      <Center>
                        <Text
                          fontSize={"25"}
                          color={"white"}
                          textAlign={"center"}
                          fontWeight={"bolder"}
                          padding={2}
                          lineHeight={"100%"}
                        >
                          {doc.data().organisation}
                        </Text>
                      </Center>
                    </Box>
                  </Box>
                  <Text textAlign={"center"} fontSize={15} fontWeight={"bold"}>
                    {etat}
                  </Text>
                  <Divider
                    orientation="horizontal"
                    width={"70%"}
                    margin={"auto"}
                  />
                  <Text
                    textAlign={"center"}
                    fontSize={15}
                    textOverflow={"clip"}
                    overflow={"hidden"}
                    whiteSpace={"nowrap"}
                  >
                    {" "}
                    {doc.data().adresse}{" "}
                  </Text>
                </Box>
                </Center>
                <Box
                display={["none","none","none","inline-block","inline-block"]}
                as={Link}
                href={`/otherContent/intermed1?categorie=${doc.data().categorie}&magasin=${doc.data().organisation}`}
                    key={index}
                  width={300}
                
                  margin={2}
                  _hover={{ cursor: "pointer" }}
                >
                 {/* <Text>{doc.data().organisation}</Text> */}
                  <Box
                    height={150}
                    backgroundColor={"gray.300"}
                    margin={1}
                    backgroundSize={"cover"}
                    borderRadius={"3%"}
                    display={"flex"}
                    overflow={"hidden"}
                    className="store-img-box"
                  >
                    <Image
                      alt={doc.data().organisation}
                      src={doc.data().imageUrl}
                      display={"block"}
                      height={"100%"}
                      width={"100%"}
                      fit={"cover"}
                    ></Image>
                    <Box
                      height={"100%"}
                      width={"100%"}
                      marginLeft={"-100%"}
                      display={"flex"}
                      flexDirection={"column"}
                      justifyContent={"center"}
                      backgroundColor={"black"}
                      opacity={0.2}
                      transition={"0.3s"}
                      sx={{
                        ".store-img-box:hover &": {
                          transition: "0.3s",
                          opacity: 0.5,
                        },
                      }}
                    ></Box>
                    <Box
                      height={"100%"}
                      width={"100%"}
                      marginLeft={"-100%"}
                      display={"flex"}
                      flexDirection={"column"}
                      justifyContent={"center"}
                      opacity={1}
                    >
                      <Center>
                        <Text
                          fontSize={"25"}
                          color={"white"}
                          textAlign={"center"}
                          fontWeight={"bolder"}
                          padding={2}
                          lineHeight={"100%"}
                        >
                          {doc.data().organisation}
                        </Text>
                      </Center>
                    </Box>
                  </Box>
                  <Text textAlign={"center"} fontSize={15} fontWeight={"bold"}>
                    {etat}
                  </Text>
                  <Divider
                    orientation="horizontal"
                    width={"70%"}
                    margin={"auto"}
                  />
                  <Text
                    textAlign={"center"}
                    fontSize={15}
                    textOverflow={"clip"}
                    overflow={"hidden"}
                    whiteSpace={"nowrap"}
                  >
                    {" "}
                    {doc.data().adresse}{" "}
                  </Text>
                </Box>
    </>
   
              ) )}
</Box> : 
<Box>{Object.values(result).length > 5 ? (
  <Center>
                <Box
                onClick={()=>handleReload(result.categorie,result.organisation)}
                  //   key={index}result
                  width={300}
                  display={"inline-block"}
                  margin={2}
                  _hover={{ cursor: "pointer" }}
                >
                  <Box
                    height={150}
                    backgroundColor={"gray.300"}
                    margin={1}
                    backgroundSize={"cover"}
                    borderRadius={"3%"}
                    display={"flex"}
                    overflow={"hidden"}
                    className="store-img-box"
                  >
                    <Image
                      alt={result.organisation}
                      src={result.imageUrl}
                      display={"block"}
                      height={"100%"}
                      width={"100%"}
                      fit={"cover"}
                    ></Image>
                    <Box
                      height={"100%"}
                      width={"100%"}
                      marginLeft={"-100%"}
                      display={"flex"}
                      flexDirection={"column"}
                      justifyContent={"center"}
                      backgroundColor={"black"}
                      opacity={0.2}
                      transition={"0.3s"}
                      sx={{
                        ".store-img-box:hover &": {
                          transition: "0.3s",
                          opacity: 0.5,
                        },
                      }}
                    ></Box>
                    <Box
                      height={"100%"}
                      width={"100%"}
                      marginLeft={"-100%"}
                      display={"flex"}
                      flexDirection={"column"}
                      justifyContent={"center"}
                      opacity={1}
                    >
                      <Center>
                        <Text
                          fontSize={"25"}
                          color={"white"}
                          textAlign={"center"}
                          fontWeight={"bolder"}
                          padding={2}
                          lineHeight={"100%"}
                        >
                          {result.organisation}
                        </Text>
                      </Center>
                    </Box>
                  </Box>
                  <Text textAlign={"center"} fontSize={15} fontWeight={"bold"}>
                    {etat}
                  </Text>
                  <Divider
                    orientation="horizontal"
                    width={"70%"}
                    margin={"auto"}
                  />
                  <Text
                    textAlign={"center"}
                    fontSize={15}
                    textOverflow={"clip"}
                    overflow={"hidden"}
                    whiteSpace={"nowrap"}
                  >
                    {" "}
                    {result.adresse}{" "}
                  </Text>
                </Box>
                </Center>
              ) : (
                <Center>
                  <Text fontWeight={700}>{found}</Text>
                </Center>
              )}</Box>}
              

              {/* ); */}
              {/* })} */}
            </Box>
          </Box>
        </Box>
      </Center>
    </>
  );
}
