import React, { useEffect, useState } from "react";
import {
  AlertDescription,
  AlertIcon,
  AlertTitle,
  CloseButton,
  Switch,
  useMediaQuery,
} from "@chakra-ui/react";
import {
  InputGroup,
  InputRightAddon,
  SimpleGrid,
  InputRightElement,
  Label,
  FormControl,
  FormLabel,
  Link,
  Checkbox,
  Image,
  Alert,
  Toast,
  FormHelperText,
  FormErrorMessage,
} from "@chakra-ui/react";
import {
  Flex,
  Input,
  Button,
  ChakraProvider,
  VStack,
  HStack,
  Heading,
  Text,
  Box,
  Select,
  Radio,
  RadioGroup,
  Stack,
  useToast,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Center,
  Modal,
  ModalOverlay,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
  Menu,
  MenuButton,
  useBoolean,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import axios from "axios";
import { GrAddCircle } from "react-icons/gr";
import { TiDelete } from "react-icons/ti";
import { addDoc, collection, setDoc } from "firebase/firestore";
import { authentic, db, db2 } from "@/FIREBASE/clientApp";
import { useRouter } from "next/router";
import { push, ref } from "@firebase/database";
import { onAuthStateChanged } from "firebase/auth";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import SignUpForm2 from "@/components/inscription/SignUpForm2";
import TransitionExample from "@/components/forgetPassword";
import { ChevronDownIcon } from "@chakra-ui/icons"
import Head from "next/head";
import PopUp from "@/components/DevisAddon/popUp";
import secureLocalStorage from "react-secure-storage";
function MyComponent2() {
  // gestion des dates
  const date = new Date();
  const dateDep = date.toLocaleDateString();
  const date2 = new Date();
  const dateExp = date2.setDate(date2.getDate() + 31);
  const dateExp2 = new Date(dateExp);
  const dateExp3 = dateExp2.toLocaleDateString();

  // fin gestion des dates
  ///login variable//

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const [isLagerThan768] = useMediaQuery("(min-width: 768px)");
  const [password, setPassword] = useState();
  const [email2, setEmail2] = useState();
  const [verif, setVerif] = useState();

  const getTime = () => {
    const currentTime = new Date();
    const timestanp = currentTime.getTime();
    secureLocalStorage.setItem("time", timestanp);
    // console.log("okay")
  };

  const loginUSer = async () => {
    await signInWithEmailAndPassword(authentic, email2, password)
      .then((userCredential) => {
        getTime();
        if (userCredential.user.emailVerified) {
          setEmail(userCredential.user.email);
          sessionStorage.setItem("email", userCredential.user.email);
          // router.back()
          toast({
            title: "ACCES AUTORISE.",
            description: "Bon Achat",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          router.back();
        } else {
          // sendEmailVerification(auth.currentUser)
          signOut(auth);
          // toast({
          //   title: "Email Non Verifié.",
          //   description: "Verifier Vos Mails Afin De Confirmer La Transaction",
          //   status: "error",
          //   duration: 200000,
          //   // isClosable: true,
          // });
          setVerif(true);
          // setTimeout( router.reload(), "10000")
          // router.reload()
        }
      })
      .catch((error) => {
        // throw error;
        const errorCode = error.code;
        const errorMessage = error.message;
        // console.log(error.message)
        // console.log(error.message)
        if (errorMessage == "Firebase: Error (auth/user-not-found).") {
          // console.log("VEUILLEZ VERIFIER VOS INFOS DE CONNEXION");
          toast({
            title: "ACCES REFUSE.",
            description: "VEUILLEZ VERIFIER VOS ACCES",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        } else if (
          errorMessage == "Firebase: Error (auth/too-many-requests)."
        ) {
          toast({
            title: "TROP DE TENTATIVES.",
            description: "VEUILLEZ REESAYER PLUS TARD",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        } else {
          if (errorMessage == "Firebase: Error (auth/wrong-password).") {
            toast({
              title: "MOT DE PASSE/IDENTIFIANT INCORRECT",
              description: "VEUILLEZ VERIFIER VOS ACCES",
              status: "error",
              duration: 9000,
              isClosable: true,
            });
          } else {
            if (errorMessage == "Firebase: Error (auth/invalid-email).") {
              toast({
                title: "MOT DE PASSE/IDENTIFIANT INCORRECT",
                description: "VEUILLEZ VERIFIER VOS ACCES",
                status: "error",
                duration: 9000,
                isClosable: true,
              });
            } else {
              // console.log(error);
            }
          }
        }
      });
  };
  const isError = email2 === "";
  //fin login variable

  //Variable inscription//

  //////Fin des variables

  //variable commune insc/conn//
  const [interup, setInterup] = useState(false);
  //fin des variables

  const [isOpenModal1, setIsOpenModal1] = useState(false);
  const toggleModal1 = () => setIsOpenModal1(!isOpenModal1);

  const router = useRouter();
  const CI = "Côte d'Ivoire";
  const toast = useToast();

  // const [tab2,setTab2] = useState([])
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [need, setNeed] = useState([{ besoin: 0 }]);

  const Option = [
    { id: "Carton 200 L", prix: 10, envoi: 110 },
    { id: "Barrique bleu 220 L", prix: 50, envoi: 130 },
    { id: "Barrique noir 250 L", prix: 50, envoi: 150 },
  ];
  const [prix, setPrix] = useState([
    { id: "Carton 200 L", prix: 10, envoi: 110 },
  ]);
  const [dest, setDest] = useState("france2");
  const [codeDest, setCodeDest] = useState("");
  const [arriv, setArriv] = useState("");
  const [radio2, setRadio2] = useState("");
  const [ville, setVille] = useState("");
  const [poste, setPoste] = useState("");
  const [rue, setRue] = useState("");
  const [email, setEmail] = useState("");


  const [adr, setAdr] = useState("");
  const [fEye, setFEye] = useBoolean(true);

  const [partenaire, setPartenaire] = useState("");
  var tab1 = 0;
  var tab2 = 0;
  var PrixPc = 0;
  const [inputGroups, setInputGroups] = useState([
    [
      { id: 1, value: "", title: "Description" },

      { id: 2, value: "", title: "Valeur en €" },
    ],
  ]);

  const makeDevis = (param1, param2) => {
    if (poste.length == 5 && (poste.slice(0, 2) == 91 || poste.slice(0, 2) == 94 || poste.slice(0, 2) == 93 || poste.slice(0, 2) == 92 || poste.slice(0, 2) == 78 || poste.slice(0, 2) == 77 || poste.slice(0, 2) == 75)) {
      onAuthStateChanged(authentic, (user) => {
        if (!user) {
          toggleModal1();
        } else {
          push(ref(db2, "DevisPerso"), {
            email: email,

            depart: dest,
            CodePostalDepart: codeDest,
            arrive: arriv,
            moyen: "Maritime",
            Status: "En Cours",
            contenant: prix,
            retrait_depot: radio2,
            total: param2 + (param2 * 5) / 100,
            partenaire: param1,
            ville: ville,
            codePostal: poste,

            rue: rue,
            besoin: need,
            produit: inputGroups,
          }).then(async (response) => {
            toast({
              title: "Devis envoyé",
              description: "Nous vous contacterons!!",
              status: "success",
              duration: 10000,
              isClosable: true,
            });
            onClose();
            await axios
              .post("/api/sendDevis", {
                id: response.key,
                email: email.toString(),
                adresse: adr,


                subject: `Recapitulatif du devis`,
                rue: rue,
                ville: ville,
                postal: poste,
                depot: radio2,
                jour: "30 jours estimés",
                quantity: inputGroups.length,
              })
              .then((response) => {
                alert(
                  "Veuillez verifier vos mails afin de prendre connaissance des details de votre devis"
                );
              });
          });
        }
      });
    } else {
      toast({
        title: "Devis impossible",
        description: "Nous nous excusons car nous ne pouvons donner suite a votre requête!!",
        status: "error",
        duration: 10000,
        isClosable: true,
      });
    }

  };

  const handleInputChange = (groupId, id, value) => {
    // Mettre à jour la valeur du champ de saisie en fonction de l'ID

    const updatedInputGroups = inputGroups.map((group, index) => {
      if (index === groupId) {
        const updatedFields = group.map((field) => {
          if (field.id === id) {
            return { ...field, value };
          }

          return field;
        });

        return updatedFields;
      }

      return group;
    });

    setInputGroups(updatedInputGroups);
  };

  const handleAddGroup = (groupId) => {
    const newGroup = Array.from({ length: 2 }, (_, index) => ({
      id: inputGroups.length > 0 ? inputGroups[0].length + 1 + index : 1,

      value: "",
    }));
    prix.push({ id: "Carton 200 L", prix: 10, envoi: 110 });
    need.push({ besoin: 0 });
    setInputGroups([...inputGroups, newGroup]);
  };

  const handleRemoveGroup = (groupId) => {
    const updatedInputGroups = inputGroups.filter(
      (_, index) => index !== groupId
    );
    const updatedPrix = prix.filter((_, index) => index !== groupId);
    const updatedBesoin = need.filter((_, index) => index !== groupId);
    setPrix(updatedPrix);
    setNeed(updatedBesoin);
    setInputGroups(updatedInputGroups);
  };





  const departAfricolis = ["09/10/2023", "13/10/2023", "16/10/2023", "20/10/2023", "23/10/2023", "27/10/2023", "30/10/2023", "03/11/2023"
  ]


  useEffect(() => {

    setEmail(sessionStorage.getItem('email') ?? "");
    setRue(secureLocalStorage.getItem('addresse') ?? "");
    setPoste(secureLocalStorage.getItem('po') ?? "");


  }, []);


  return (
    <ChakraProvider>
      <Head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-RFSVQTGJ87"
        ></script>
        <script strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments)}
           gtag('js', new Date()); 
           gtag('config', 'G-RFSVQTGJ87');
           `}

        </script>
      </Head>
      <Flex direction="column" align="center">
        <Box width={"100%"}>
          <Flex width={"100%"} mt={5}>
            <Box mr={5} width={"100%"}>
              <Text>Email :</Text>
              <Input
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                width={"100%"}
              />

              <Text>Adresse : </Text>
              <Input
                value={rue}
                onChange={(e) => {
                  setRue(e.target.value);
                }}
                placeholder={"Rue/Avenue"}
                mr={2}
              />
            </Box>
            <Box width={"100%"}>

              <Text>Code postal :</Text>
              <Input
                value={poste}
                onChange={(e) => {
                  setPoste(e.target.value);
                }}
                placeholder={"code postal"}
                mr={2}
              />
              <Text>Ville : </Text>
              <Input
                onChange={(e) => {
                  setVille(e.target.value);
                }}
                placeholder={"ville"}
              />
            </Box>
          </Flex>

          <Box mb={5}>
            <Text mb={2}>De</Text>
            <Flex>
              <Select
                variant="outline"
                placeholder="Pays"
                onChange={(e) => setDest(e.target.value)}
              // defaultValue={"france"}
              // mr={5}
              >
                <option value={"france"}>France</option>
                {/* <option value={"mali"}>Mali</option>
                      <option value={"senegal"}>Senegal</option>
                      <option value={"Côte D'Ivoire"}>{CI}</option> */}
              </Select>
              {/* {dest == "france" ? (
                <Input
                  ml={5}
                  placeholder="entrez votre code postal"
                  onChange={(e) => setCodeDest(e.target.value)}
                />
              ) : (
                <></>
              )} */}
            </Flex>
          </Box>
          <Box mb={5}>
            <Text mb={2}>A</Text>
            <Flex>
              <Select
                variant="outline"
                placeholder="Pays"
                onChange={(e) => setArriv(e.target.value)}
              // defaultValue={"Côte D'Ivoire"}
              >
                {/* <option value={"france"}>France</option> */}
                {/* <option value={"mali"}>Mali</option>
                      <option value={"senegal"}>Senegal</option> */}
                <option value={"Côte D'Ivoire"}>{CI}</option>
              </Select>
              {/* {arriv == "france" ? (
                      <Input
                        ml={5}
                        placeholder="entrez le code postal"
                        onChange={(e) => setCodeArriv(e.target.value)}
                      />
                    ) : (
                      <></>
                    )} */}
            </Flex>
          </Box>
          <Box>
            <Text>Reception du colis par la structure : </Text>

            <Flex justify={"space-around"}>
              <RadioGroup onChange={setRadio2} value={radio2}>
                <Stack direction="row">
                  <Radio value="En agence">Depot en agence</Radio>
                  <Radio value="Retrait à domicile">Retrait a domicile</Radio>
                </Stack>
              </RadioGroup>
            </Flex>
          </Box>
        </Box>
        {inputGroups.map((group, groupId) => (
          <>
            <HStack
              key={groupId}
              mt={5}
              display={["none", "none", "flex", "flex", "flex"]}
            >
              <Select
                width={"fit-content"}
                mt={-1}
                onChange={(e) => {
                  prix[groupId] = {
                    id: e.target.selectedOptions[0].innerHTML,
                  
                    prix: parseInt(e.target.selectedOptions[0].value),
                    envoi:
                      e.target.selectedOptions[0].innerHTML == "Carton 200 L"
                        ? 110
                        : e.target.selectedOptions[0].innerHTML ==
                          "Barrique bleu 220 L"
                          ? 130
                          : e.target.selectedOptions[0].innerHTML ==
                            "Barrique noir 250 L"
                            ? 150
                            : 0,
                  };
                }}
              >
                {Option.map((data) => [
                  <option key={data.prix} value={data.prix}>
                    {data.id}
                  </option>,
                ])}
              </Select>

              {group.map((field) => (
                <Box key={field.id}>
                  <HStack>
                    <Box mb={2}>
                      <Input
                        type="text"
                        value={field.value}
                        placeholder={field.title}
                        onChange={(e) =>
                          handleInputChange(groupId, field.id, e.target.value)
                        }
                      />
                    </Box>
                  </HStack>
                </Box>
              ))}
              <Box fontSize={"30px"} color={"cyan.700"}>
                {groupId === 0 ? (
                  <GrAddCircle onClick={() => handleAddGroup(groupId)} />
                ) : (
                  <TiDelete onClick={() => handleRemoveGroup(groupId)} />
                )}
              </Box>
            </HStack>

            <VStack
              key={groupId}
              my={5}
              display={["grid", "grid", "none", "none", "none"]}
            >
              <Select
                width={"fit-content"}
                mt={-1}
                onChange={(e) => {
                  prix[groupId] = {
                    id: e.target.selectedOptions[0].innerHTML,
                    prix: parseInt(e.target.selectedOptions[0].value),
                    envoi:
                      e.target.selectedOptions[0].innerHTML == "Carton 200 L"
                        ? 110
                        : e.target.selectedOptions[0].innerHTML ==
                          "Barrique bleu 220 L"
                          ? 130
                          : e.target.selectedOptions[0].innerHTML ==
                            "Barrique noir 250 L"
                            ? 150
                            : 0,
                  };
                }}
              >
                {Option.map((data) => [
                  <option key={data.prix} value={data.prix}>
                    {data.id}
                  </option>,
                ])}
              </Select>

              {group.map((field) => (
                <Box key={field.id}>
                  <HStack>
                    <Box mb={2}>
                      <Input
                        type="text"
                        value={field.value}
                        placeholder={field.title}
                        onChange={(e) =>
                          handleInputChange(groupId, field.id, e.target.value)
                        }
                      />
                    </Box>
                  </HStack>
                </Box>
              ))}
              <Box fontSize={"30px"} color={"cyan.700"}>
                {groupId === 0 ? (
                  <GrAddCircle onClick={() => handleAddGroup(groupId)} />
                ) : (
                  <TiDelete onClick={() => handleRemoveGroup(groupId)} />
                )}
              </Box>
            </VStack>
            <Flex width={"100%"} justifyContent={"space-between"}>
              <FormControl display={"flex"}>
                <Text>Besoin du materiel?</Text>
                <Checkbox
                  mb={5}
                  mt={1}
                  ml={5}
                  borderColor={"black"}
                  onChange={(e) => {
                    e.target.checked
                      ? (need[groupId].besoin = 10)
                      : (need[groupId].besoin = 0);
                  }}
                ></Checkbox>
              </FormControl>

              {/* <Text>{prix[groupId].prix}</Text> */}
            </Flex>
          </>
        ))}
      </Flex>
      <Button
        isDisabled={
          email.length < 10 ||

          dest.length < 4 ||

          arriv.length < 3 ||
          radio2.length < 3
        }
        width={"100%"}
        bgColor={"cyan.900"}
        color={"white"}
        onClick={onOpen}
      >
        Envoyer dès maintenant
      </Button>
      {/* information sur les differents fournisseurs et leur jour de livraison */}
      <Drawer onClose={onClose} isOpen={isOpen} size={"full"}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Selection de service</DrawerHeader>
          <DrawerBody>
            <Flex display={"grid"}>
              <Flex
                width={"100%"}
                // mr={40}
                mb={[10, 10, 10, 10, 10]}
                py={5}
                overflow={"visible"}
                boxShadow={"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;"}
                border={"1px white solid"}
                justifyContent={"space-between"}
                display={["grid", "grid", "grid", "flex", "flex"]}
              >
                <Flex
                  width={[
                    "fit-content",
                    "fit-content",
                    "fit-content",
                    "80%",
                    "80%",
                  ]}
                  justifyContent={"space-between"}
                  px={2}
                  display={["grid", "grid", "grid", "flex", "flex"]}
                >
                  <Box
                    width={["fit-content", "fit-content", "fit-content", "40%", "40%"]}
                    height={"fit-content"}
                    bgColor={"whiteAlpha.300"}
                    mr={20}
                  >
                    <Text
                      fontFamily={"sans-serif"}
                      fontWeight={700}
                      fontSize={"20px"}
                    >
                      Africolis
                    </Text>
                  </Box>
                  <Box
                    width={[
                      "fit-content",
                      "fit-content",
                      "fit-content",
                      "100%",
                      "100%",
                    ]}
                  >
                    <Text fontWeight={700}>Date de retrait estimée</Text>
                    <Flex>
                      <Text>{dateDep}</Text>
                    </Flex>
                  </Box>
                  <Box
                    width={[
                      "fit-content",
                      "fit-content",
                      "fit-content",
                      "100%",
                      "100%",
                    ]}
                  >
                    <Text fontWeight={700}>Date de départ estimée</Text>
                    <Flex>
                      <Menu>

                        <MenuButton >
                          <Flex>
                            <Text> Voir Toutes les dates</Text>
                            <ChevronDownIcon fontSize={30} />
                          </Flex>
                        </MenuButton>



                        <MenuList>
                          {departAfricolis.map((data, index) =>
                          (
                            <MenuItem key={index}>{data}</MenuItem>
                          ))}


                        </MenuList>
                      </Menu>
                    </Flex>
                  </Box>
                  <Box
                    width={[
                      "fit-content",
                      "fit-content",
                      "fit-content",
                      "100%",
                      "100%",
                    ]}
                  >
                    <Text fontWeight={700}>Durée estimée</Text>
                    <Text> 30 jours </Text>
                  </Box>
                  <Box
                    width={[
                      "fit-content",
                      "fit-content",
                      "fit-content",
                      "100%",
                      "100%",
                    ]}
                  >
                    <Text fontWeight={700}>Date de reception estimé</Text>
                    <Text>{dateExp3} </Text>
                  </Box>
                </Flex>

                <Box
                  mr={20}
                  width={"fit-content"}
                  ml={["50%", "50%", "50%", 0, 0]}
                >
                  {prix.map((prix, prixId) => {
                    // console.log(prix);
                    // console.log(need);
                    tab1 =
                      tab1 +
                      (parseFloat(prix.prix) +
                        parseFloat(need[prixId].besoin) +
                        parseFloat(prix.envoi));
                  })}
                  <Text>
                    {parseFloat(tab1) + (parseFloat(tab1) * 5) / 100}€
                  </Text>
                  <PopUp PrixChoisi={parseFloat(tab1) + (parseFloat(tab1) * 5) / 100}
                    Partenaire="Africolis"
                    email={email}
                      dest={dest}
                      poste={poste}
                      arriv={arriv}
                      radio2={radio2}
                      imageUri=""
                      ville={ville}
                      need={need}
                      inputGroups={inputGroups}
                      categorie={prix}
                      rue={rue}
                      moyen="Maritime"

                  />
                  {/* <Button
                    bgColor={"cyan.700"}
                    color="white"
                    mt={1}
                    onClick={() => {
                      makeDevis("Africolis", tab1);
                    }}
                  >
                    Choisir
                  </Button> */}
                </Box>
              </Flex>
              <Flex
                width={"100%"}
                // mr={40}
                mb={[10, 10, 10, 10, 10]}
                py={5}
                overflow={"visible"}
                boxShadow={"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;"}
                border={"1px white solid"}
                justifyContent={"space-between"}
                display={["grid", "grid", "grid", "flex", "flex"]}
              >
                <Flex
                  width={[
                    "fit-content",
                    "fit-content",
                    "fit-content",
                    "80%",
                    "80%",
                  ]}
                  justifyContent={"space-between"}
                  px={2}
                  display={["grid", "grid", "grid", "flex", "flex"]}
                >
                  <Box
                    width={[
                      "fit-content",
                      "fit-content",
                      "fit-content",
                      "40%",
                      "40%",
                    ]}
                    height={"fit-content"}
                    bgColor={"whiteAlpha.300"}
                    mr={20}
                  >
                    <Text
                      fontFamily={"sans-serif"}
                      fontWeight={700}
                      fontSize={"20px"}
                    >
                      CHALLENGE{" "}
                    </Text>
                  </Box>
                  <Box
                    width={[
                      "fit-content",
                      "fit-content",
                      "fit-content",
                      "100%",
                      "100%",
                    ]}
                  >
                    <Text fontWeight={700}>Date de retrait estimée</Text>
                    <Flex>
                      <Text>{dateDep}</Text>
                    </Flex>
                  </Box>
                  <Box
                    width={[
                      "fit-content",
                      "fit-content",
                      "fit-content",
                      "100%",
                      "100%",
                    ]}
                  >
                    <Text fontWeight={700}>Date de départ estimée</Text>
                    <Flex>
                      <Text>{dateDep}</Text>
                    </Flex>
                  </Box>
                  <Box
                    width={[
                      "fit-content",
                      "fit-content",
                      "fit-content",
                      "100%",
                      "100%",
                    ]}
                  >
                    <Text fontWeight={700}>Durée estimée</Text>
                    <Text> 30 jours </Text>
                  </Box>
                  <Box
                    width={[
                      "fit-content",
                      "fit-content",
                      "fit-content",
                      "100%",
                      "100%",
                    ]}
                  >
                    <Text fontWeight={700}>Date de livraison</Text>
                    <Text>{dateExp3} </Text>
                  </Box>
                </Flex>

                <Box mr={20}>
                  {" "}
                  <Box mr={20}>
                    {prix.map((prix, prixId) => {
                      {
                        tab2 =
                          tab2 +
                          (parseFloat(prix.prix) +
                            parseFloat(need[prixId].besoin) +
                            parseFloat(prix.envoi));
                      }
                    })}
                    <Text>
                      {parseFloat(tab2) + (parseFloat(tab2) * 5) / 100}€
                    </Text>
                    <PopUp PrixChoisi={parseFloat(tab2) + (parseFloat(tab2) * 5) / 100}
                      Partenaire="Challenge N°1"
                      email={email}
                      dest={dest}
                      poste={poste}
                      arriv={arriv}
                      radio2={radio2}
                      imageUri=""
                      ville={ville}
                      need={need}
                      inputGroups={inputGroups}
                      categorie={prix}
                      rue={rue}
                      moyen="Maritime"

                    />
                    {/* <Button
                      bgColor={"cyan.700"}
                      color="white"
                      mt={1}
                      onClick={() => {
                        makeDevis("Challenge N°1", tab2);
                      }}
                    >
                      Choisir
                    </Button> */}
                  </Box>
                </Box>
              </Flex>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Modal
        isCentered
        isOpen={isOpenModal1}
        onClose={toggleModal1}
        size={"xl"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Connexion/Inscription</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <>
              <Center>
                <Text mr={4}>Connexion</Text>
                <Switch
                  size="lg"
                  onChange={(e) => setInterup(e.target.checked)}
                  value={interup}
                />
                <Text ml={4}>Inscription</Text>
              </Center>
              {interup ? (
                <>
                  <SignUpForm2 />
                </>
              ) : (
                <Center display={"grid"}>
                  {verif ? (
                    <Alert status="error" w={"fit-content"}>
                      <AlertIcon />
                      <Box>
                        <AlertTitle>Mail Pas Verifié!</AlertTitle>
                        <AlertDescription>
                          <p>
                            {" "}
                            Merci de bien vouloir consulter vos mails afin de
                            confirmer votre inscription sur notre site{" "}
                          </p>
                        </AlertDescription>
                      </Box>
                      <CloseButton
                        alignSelf="flex-start"
                        position="relative"
                        right={-1}
                        top={-1}
                        onClick={onClose}
                      />
                    </Alert>
                  ) : (
                    <></>
                    // <Butto   n onClick={onOpen}>Show Alert</Butto>
                  )}
                  <Flex
                    textAlign={"center"}
                    bgColor={["white", "white", "white", "white", "white"]}
                    borderRadius={5}
                    w={"90%"}
                    h={500}
                    mx={[5, 5, 5, 5, 12]}
                    my={5}
                  // boxShadow={"0px 4px 24px "}
                  >
                    <Center width={"fit-content"}>
                      <Box width={"full"} color={"black"}>
                        <FormControl isInvalid={isError}>
                          <Stack spacing={4}>
                            <Heading
                              display={["none", "none", "none", "grid", "grid"]}
                              ml={["10%", "10%", "10%", "0%", "0%"]}
                            >
                              Bienvenue
                            </Heading>
                            <Text
                              display={["none", "none", "none", "grid", "grid"]}
                            >
                              Connectez-vous á votre compte
                            </Text>
                            <Center display={"grid"}>
                              <Input
                                mb={2}
                                type={"text"}
                                placeholder="Email"
                                border={"2px solid gray"}
                                // borderRadius={"50px"}
                                width={[
                                  "200px",
                                  "200px",
                                  "350px",
                                  "350px",
                                  "350px",
                                ]}
                                onChange={(ev) =>
                                  setEmail2(
                                    ev.target.value.trim().toLowerCase()
                                  )
                                }
                                color={"gray.500"}
                              />
                              <InputGroup>
                                <Input
                                  onChange={(e) => setPassword(e.target.value)}
                                  width={[
                                    "200px",
                                    "200px",
                                    "350px",
                                    "350px",
                                    "350px",
                                  ]}
                                  type={show ? "text" : "password"}
                                  placeholder="Entrez le mot de passe"
                                />
                                {/* <InputRightElement width="fit-content">
        <Button h='1.75rem'  onClick={handleClick}>
          {show ? 'Masquer' : 'voir'}
        </Button>
      </InputRightElement> */}
                              </InputGroup>
                            </Center>

                            <TransitionExample />
                            <Box display={"grid"}>
                              <Center>
                                <Button
                                  width={"fit-content"}
                                  // borderRadius={"50px"}
                                  bgColor={"#08566e"}
                                  color={"white"}
                                  _hover={{
                                    bg: "#08566e",
                                  }}
                                  onClick={() => loginUSer()}
                                >
                                  Connexion{" "}
                                </Button>
                              </Center>
                              <Button
                                as={Link}
                                bgColor={"white"}
                                _hover={{
                                  textDecoration: "none",
                                  bgColor: "white",
                                }}
                              >
                                Pas de compte? Créer un compte
                              </Button>
                              {/* <Button
                    display={["none","none","none","grid","grid"]}
                      as={Link}
                      width={"fit-content"}
                      mt={10}
                      fontSize={20}
                      // textAlign={"center"}
                      height={"40px"}
                      border={"1px solid #08566e"}
                      borderRadius={"5%"}
                      _hover={{
                        color: "#C0C0C0",
                      }}
                      href={"/Inscription"}
                    >
                      Inscription
                    </Button> */}
                            </Box>
                          </Stack>
                          {!isError ? (
                            <FormHelperText></FormHelperText>
                          ) : (
                            <FormErrorMessage>
                              Email is required.
                            </FormErrorMessage>
                          )}
                        </FormControl>
                      </Box>
                    </Center>
                  </Flex>
                </Center>
              )}
            </>
          </ModalBody>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
}

export default MyComponent2;
