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
  Link as LinkC,
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
  useToast,
  Radio,
  RadioGroup,
  Stack,
  Select,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
  Center,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  ModalContent,
  ModalOverlay,
  Modal,
} from "@chakra-ui/react";
import Link from "next/link";
import { GrAddCircle } from "react-icons/gr";
import { TiDelete } from "react-icons/ti";
import { addDoc, collection } from "firebase/firestore";
import { authentic, db, db2, storage } from "@/FIREBASE/clientApp";
import { push, ref, set } from "@firebase/database";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import SignUpForm2 from "@/components/inscription/SignUpForm2";
import axios from "axios";
import TransitionExample from "@/components/forgetPassword";
import { ref as _rf, uploadBytes, getDownloadURL } from 'firebase/storage';
import Head from "next/head";
import sha256 from 'crypto-js/sha256';
import CryptoJS from "crypto-js";
import secureLocalStorage from "react-secure-storage";
import PopUp from "@/components/DevisAddon/popUp";


function MyComponent() {
  ///login variable//

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

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

          signOut(auth);

          setVerif(true);

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
  //fin ogin variable

  //Variable inscription//

  //////Fin des variables

  //variable commune insc/conn//
  const [interup, setInterup] = useState(false);
  //fin des variables

  ///gestion des dates///

  const date = new Date();
  const dateDep = date.toLocaleDateString();
  const date2 = new Date();
  const dateExp = date2.setDate(date2.getDate() + 3);
  const dateExp2 = new Date(dateExp);
  const dateExp3 = dateExp2.toLocaleDateString();
  const date2C = new Date();
  const dateExpC = date2C.setDate(date2C.getDate() + 31);
  const dateExp2C = new Date(dateExpC);
  const dateExp3C = dateExp2C.toLocaleDateString();

  ////fin gestion des dates
  //debut toggle select

  const toggleFileInputVisibility = (index, value) => {
    if (value != "Textile" && value != "Aliment") {
      const newFileInputsVisible = [...fileInputsVisible];
      newFileInputsVisible[index] = true;
      setFileInputsVisible(newFileInputsVisible);
    } else {
      const newFileInputsVisible = [...fileInputsVisible];
      newFileInputsVisible[index] = false;
      setFileInputsVisible(newFileInputsVisible);
    }
  };



  const CI = "Côte d'Ivoire";
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [dest, setDest] = useState("");
  // const [codeDest, setCodeDest] = useState("");
  const [arriv, setArriv] = useState("");
  const [radio2, setRadio2] = useState("");
  const [email, setEmail] = useState("");

  const [ville, setVille] = useState("");
  const [poste, setPoste] = useState("");
  const [rue, setRue] = useState("");




  const [check, setCheck] = useState("none")

  const [selection, setSelection] = useState([{ id: "Textile" }]);
  const [fileInputsVisible, setFileInputsVisible] = useState([false]);
  var tab1 = 0;
  var tab2 = 0;
  var tab3 = 0;
  var checker = 0;
  var PrixPc = 0;






  const [categorie, setCategorie] = useState([{ contenu: "Textile", prix: 10 }]);
  const [image, setImage] = useState([{ file: " ", nom: "" }]);
  const [imageUri, setImageUri] = useState([{ link: [], collection: "" }]);
  const toast = useToast();

  const [inputGroups, setInputGroups] = useState([
    [
      { id: 1, value: "", title: "Description" },

      { id: 2, value: "", title: "Valeur" },

      { id: 3, value: "", title: "Poids" },
    ],
  ]);

  const Option = [
    { id: "Textile", prix: 0 },
    { id: "Aliment", prix: 0 },
    { id: "Ordinateur", prix: 50 },
    { id: "Appareil electronique", prix: 0 },
    { id: "Bijou", prix: 0 },
    { id: "Cosmetique", prix: 0 },
  ];

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

  const handleAddGroup = () => {
    const newGroup = Array.from({ length: 3 }, (_, index) => ({
      id: inputGroups.length > 0 ? inputGroups[0].length + 1 + index : 1,

      value: "",
    }));
    categorie.push({
      contenu: "Textile", prix: 10
    });
    image.push({ file: "" });
    imageUri.push({ link: [], collection: "" })
    setFileInputsVisible([...fileInputsVisible, false]);
    setInputGroups([...inputGroups, newGroup]);
  };

  const handleRemoveGroup = (groupId) => {
    const updatedInputGroups = inputGroups.filter(
      (_, index) => index !== groupId
    );

    setInputGroups(updatedInputGroups);
    image[groupId].file = "";
    image[groupId].nom = "";
    imageUri[groupId].link = "";
    imageUri[groupId].collection = "";
    fileInputsVisible[groupId] = false;
  };
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

    return `DE${formattedTimestamp}`;
  }
  const makeDevis = async (param1, param2, param3, param4) => {

    console.log("dans le else")
    if (
      poste.length == 5
    ) {
      onAuthStateChanged(authentic, (user) => {
        if (!user) {
          toggleModal1();
        } else {




          const idDev = generateCustomKey();


          const hashDigest = sha256(idDev).toString(CryptoJS.enc.Hex);

          const hash = hashDigest.slice(0, 3).toString()



          set(ref(db2, `DevisPerso/${idDev}${hash}`), {
            email: email,

            depart: dest,
            CodePostalDepart: poste,
            arrive: arriv,
            moyen: "Aerien",
            retrait_depot: radio2,
            imageColis: imageUri,
            ville: ville,
            status: "En cours",

            devisId: `${idDev}${hash}`,
            rue: rue,
            partenaire: param1,
            total: param2 * param3 + (param2 * param3 * 5) / 100,
            produit: inputGroups,
            categories: categorie,
          }).then(async (response) => {
        
            toast({
              title: "Devis envoyé",
              description: "Nous vous contacterons!!",
              status: "success",
              duration: 10000,
              isClosable: true,
            });
            await axios.post("/api/sendDevis", {

              email: email.toString(),
              partenaire: param1,


              depot: radio2,
              category: categorie,
              rue: rue,
              postal: poste,
              ville: ville,


              subject: `Demande de devis `,
              price: param2 * param3 + (param2 * param3 * 5) / 100,
              jour: "2 jours estimés",
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
        description:
          "Nos services se limite qu'a une certaine zone",
        status: "error",
        duration: 10000,
        isClosable: true,
      });
    }

  };
  const handleSelect = (groupId, e) => {
    setSelection(selection);
    selection[groupId] = { id: e };
  };

  useEffect(() => {
    setSelection(selection);
    setEmail(sessionStorage.getItem('email') ?? "");
    setRue(secureLocalStorage.getItem('addresse') ?? "");
    setPoste(secureLocalStorage.getItem('po') ?? "");


  }, [selection]);

  const handleFileUpload = async (ed, files, emai) => {
    const storageRef = _rf(storage, `Devis/${emai}/${files.name}`);

    const snapshot = await uploadBytes(storageRef, files);
    const downloadURL = await getDownloadURL(snapshot.ref);
    if(categorie[ed].contenu !="Textile" && categorie[ed].contenu !="Aliment"){
      if (ed > imageUri.length) {
     
        const getInd = ed - 1
        imageUri[getInd].collection = `colis${ed}`
        imageUri[getInd].link.push(downloadURL)
        console.log("imageUri", imageUri)
      } else {
        imageUri[ed].collection = `colis${ed}`
        imageUri[ed].link.push(downloadURL)
        console.log("imageUri", imageUri)
      }
    }
  };

  const Tester = (data, index) => {
    console.log(data)
    const donnee = data.file;


    for (let i = 0; i < donnee.length; i++) {
      console.log("for de tester", donnee[i])
      // makeDevis(0,0,0,index,donnee[i])
      handleFileUpload(index, donnee[i], email)
    }

  }

  ////Functions du bouton envoyer des maintenant
  const LaunchAll = () => {
    {
      inputGroups.map((group, groupId) => {
        {
          checker = checker + parseFloat(group[2].value);
        }
      })
    }
    if (checker > 0) {
      onOpen();
      image.map((data, index) => { Tester(data, index) });

    }
    else {
      alert("merci de bien vouloir renseigner le poids de chaque article")

    }


  }

  ///Fin de functions

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
      <Flex direction="column" align="center" >
        {/* {console.log(router.asPath.indexOf('?s')-1)} */}
        <Box width={"100%"}>
          <Flex width={"100%"} mt={5}>
            <Box mr={5} width={"100%"}>
              <Box>
                <Text>Email :</Text>
                <Input
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  width={"100%"}
                />
              </Box>

              <Box>
                <Text>Adresse : </Text>
                <Input
                  value={rue}
                  placeholder="Rue/Avenue"
                  onChange={(e) => setRue(e.target.value)}
                  width={"100%"}
                />
              </Box>

            </Box>
            <Box width={"100%"}>

              <Box>
                <Text>Code postal : </Text>
                <Input
                  placeholder="Code postal du client"
                  value={poste}
                  onChange={(e) => setPoste(e.target.value)}
                  width={"100%"}
                />
              </Box>
              <Box>
                <Text>Ville : </Text>
                <Input
                  placeholder="Ville du client"
                  onChange={(e) => setVille(e.target.value)}
                  width={"100%"}
                />
              </Box>

            </Box>
          </Flex>
          <Box mb={5}>
            <Text mb={2}>De</Text>
            <Flex>
              <Select
                variant="outline"
                placeholder="Pays"
                onChange={(e) => setDest(e.target.value)}
              >
                <option value={"France"}>France</option>
              </Select>
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
            <Flex justify={"space-around"} my={5}>
              <RadioGroup onChange={setRadio2} value={radio2}>
                <Stack direction="row">
                  <Radio value="Dépôt en agence" mr={5}>
                    Dépôt en agence
                  </Radio>
                  <Radio value="Retrait à domicile">Retrait a domicile</Radio>
                </Stack>
              </RadioGroup>
            </Flex>

            <Text my={5}></Text>
          </Box>
        </Box>
        <Text
          fontSize={20}
          fontWeight={600}
          display={["grid", "grid", "grid", "none", "none"]}
        >
          Informations du/des colis
        </Text>

        {inputGroups.map((group, groupId) => (
          <>
            {" "}
            <HStack

              borderTop={"1px solid grey"}
              key={groupId}
              display={["none", "none", "none", "flex", "flex"]}
            >
              <Box>
                <Select
                  width={"fit-content"}
                  mt={-5}
                  onChange={(e) => {
                    handleSelect(
                      groupId,
                      e.target.selectedOptions[0].innerHTML
                    );

                    categorie[groupId] = {
                      contenu: e.target.selectedOptions[0].innerHTML,
                      prix: parseInt(e.target.selectedOptions[0].value),
                    };
                    toggleFileInputVisibility(groupId, e.target.selectedOptions[0].innerHTML);
                  }}
                >
                  {Option.map((data) => [
                    <option key={data.prix} value={data.prix}>
                      {data.id}
                    </option>,
                  ])}
                </Select>
                {fileInputsVisible[groupId] && ( // Afficher le champ input type file si la visibilité est true
                  <Input
                    mt={5}
                    width={"200px"}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => {
                      image[groupId].file = e.target.files;
                      image[groupId].nom = `colis${groupId}`;
                    }}
                  />
                )}
              </Box>
              <SimpleGrid mt={2}>
                {group.map((field) => (
                  <HStack key={field.id}>
                    {/* {console.log(field.id )} */}
                    {field.id == 1 ? (
                      <Input
                        mb={5}
                        as={"textarea"}
                        placeholder={field.title}
                        value={field.value}
                        onChange={(e) =>
                          handleInputChange(groupId, field.id, e.target.value)
                        }
                      />
                    ) : (
                      <Input
                        mb={5}
                        type="text"
                        placeholder={field.title}
                        value={field.value}
                        onChange={(e) =>
                          handleInputChange(groupId, field.id, e.target.value)
                        }
                      />
                    )}
                  </HStack>
                ))}
              </SimpleGrid>

              <Box fontSize={"25px"} color={"cyan.700"}>
                {groupId === 0 ? (
                  <GrAddCircle onClick={handleAddGroup} />
                ) : (
                  <TiDelete onClick={() => handleRemoveGroup(groupId)} />
                )}
              </Box>
            </HStack>
            <VStack
              key={groupId + 1}
              display={["grid", "grid", "grid", "none", "none"]}
            >
              <Box>
                <Select
                  width={"fit-content"}
                  mt={5}
                  onChange={(e) => {
                    handleSelect(
                      groupId,
                      e.target.selectedOptions[0].innerHTML
                    );
                    categorie[groupId] = {
                      contenu: e.target.selectedOptions[0].innerHTML,
                      prix: e.target.selectedOptions[0].value,
                    };
                    toggleFileInputVisibility(groupId, e.target.value);
                  }}
                >
                  {Option.map((data) => [
                    <option key={data.prix} value={data.prix}>
                      {data.id}
                    </option>,
                  ])}
                </Select>
                {fileInputsVisible[groupId] && ( // Afficher le champ input type file si la visibilité est true
                  <Input
                    mt={5}
                    width={"200px"}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => {
                      console.log(e.target.files);
                    }}
                  />
                )}
              </Box>
              {group.map((field) => (
                <HStack key={field.id}>
                  <Box mb={5}>
                    <Input
                      type="text"
                      placeholder={field.title}
                      value={field.value}
                      onChange={(e) =>
                        handleInputChange(groupId, field.id, e.target.value)
                      }
                    />
                  </Box>
                </HStack>
              ))}

              <Box fontSize={"25px"} color={"cyan.700"}>
                {groupId === 0 ? (
                  <GrAddCircle onClick={handleAddGroup} />
                ) : (
                  <TiDelete
                    fontSize={"30px"}
                    onClick={() => handleRemoveGroup(groupId)}
                  />
                )}
              </Box>
            </VStack>
          </>
        ))}
      </Flex>
      <Button
        isDisabled={
          email.length < 10 ||

          dest.length < 4 ||
          radio2.length < 3
        }
        width={"100%"}
        bgColor={"cyan.900"}
        color={"white"}
        onClick={() => {
          LaunchAll()
        }}
        mt={5}
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
            <Flex display={"grid"} width={"100%"}>
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
                  width={["100%", "100%", "100%", "80%", "80%"]}
                  justifyContent={"space-between"}
                  px={2}
                  display={["grid", "grid", "grid", "flex", "flex"]}
                >
                  <Box
                    width={"40%"}
                    height={"fit-content"}
                    bgColor={"whiteAlpha.300"}
                    mr={20}
                    display={"grid"}
                  >
                    <Text
                      fontFamily={"sans-serif"}
                      fontWeight={700}
                      fontSize={"20px"}
                    >
                      CICV
                    </Text>
                    <Image
                      src="airplane.jpg"
                      alt={"image Avion"}
                      width={"40px"}
                    />
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
                    <Text
                      fontSize={["20px", "20px", "20px", "15px", "15px"]}
                      fontWeight={700}
                    >
                      Date de retrait estimée
                    </Text>
                    <Text fontSize={["15px", "15px", "20px", "20px", "20px"]}>
                      {dateDep}
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
                    <Text
                      fontSize={["20px", "20px", "20px", "15px", "15px"]}
                      fontWeight={700}
                    >
                      Date de départ estimée
                    </Text>
                    <Text fontSize={["15px", "15px", "20px", "20px", "20px"]}>
                      {dateDep}
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
                    <Text
                      fontSize={["20px", "20px", "20px", "15px", "15px"]}
                      fontWeight={700}
                    >
                      Durée estimée
                    </Text>
                    <Text fontSize={["15px", "15px", "20px", "20px", "20px"]}>
                      2 jours{" "}
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
                    <Text
                      fontSize={["20px", "20px", "20px", "15px", "15px"]}
                      fontWeight={700}
                    >
                      Date de livraison estimée{" "}
                    </Text>
                    <Text fontSize={["15px", "15px", "20px", "20px", "20px"]}>
                      {dateExp3}{" "}
                    </Text>
                  </Box>
                </Flex>

                <Box
                  mr={20}
                  width={["100%", "100%", "100%", "fit-content", "fit-content"]}
                >
                  {categorie.map((data, indexe) => {
                    if (data.contenu == "Ordinateur") {
                      PrixPc = PrixPc + 50
                      console.log(PrixPc, "prix pc")
                    } else {
                      console.log(inputGroups[indexe][2].value)
                      tab1 = tab1 + parseFloat(inputGroups[indexe][2].value);
                      // inputGroups.map((datos,index) =>{
                      //   if(categorie[index].contenu != "Ordinateur"){
                      //     tab1 = tab1 + parseFloat(datos[2].value);
                      //   }

                      // })
                    }
                    // console.log(tab1,"tab1")
                  })}
                  {/* {inputGroups.map((group, groupId) => {
                    {
                      tab1 = tab1 + parseFloat(group[2].value);
                    }
                  })} */}
                  <Flex
                    display={["flex", "flex", "flex", "grid", "grid"]}
                    width={"100%"}
                    justifyContent={[
                      "space-between",
                      "space-between",
                      "space-between",
                      "normal",
                      "normal",
                    ]}
                  >
                    <Text fontSize={"20px"} fontWeight={700} color={"green"}>
                      {parseFloat(tab1) * 13 +
                        ((parseFloat(tab1) * 13 * 5 + parseFloat(PrixPc)) / 100) + parseFloat(PrixPc)}
                      €
                    </Text>
                    <PopUp PrixChoisi={parseFloat(tab1) * 13 +
                      ((parseFloat(tab1) * 13 * 5 + parseFloat(PrixPc)) / 100) + parseFloat(PrixPc)}
                      Partenaire={"CICV"}
                      email={email}
                      dest={dest}
                      poste={poste}
                      arriv={arriv}
                      radio2={radio2}
                      imageUri={imageUri}
                      ville={ville}
                      inputGroups={inputGroups}
                      categorie={categorie}
                      rue={rue}
                      moyen={"Aerien"}
                    />
                    {/* <Button
                      bgColor={"cyan.700"}
                      color="white"
                      mt={1}
                      onClick={() => {
                        makeDevis("CICV", tab1, 13, PrixPc);
                      }}
                    >
                      Choisir
                    </Button> */}
                  </Flex>
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
                    display={"grid"}
                  >
                    <Text
                      fontFamily={"sans-serif"}
                      fontWeight={700}
                      fontSize={"20px"}
                    >
                      BAMBA BAGAGE
                    </Text>
                    <Image
                      src="airplane.jpg"
                      alt={"image Avion"}
                      width={"40px"}
                    />
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
                    <Text
                      fontSize={["20px", "20px", "20px", "15px", "15px"]}
                      fontWeight={700}
                    >
                      Date de retrait estimée
                    </Text>
                    <Text fontSize={["15px", "15px", "20px", "20px", "20px"]}>
                      {dateDep}
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
                    <Text
                      fontSize={["20px", "20px", "20px", "15px", "15px"]}
                      fontWeight={700}
                    >
                      Date de départ estimée
                    </Text>
                    <Text fontSize={["15px", "15px", "20px", "20px", "20px"]}>
                      {dateDep}
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
                    <Text
                      fontSize={["20px", "20px", "20px", "15px", "15px"]}
                      fontWeight={700}
                    >
                      Durée estimée
                    </Text>
                    <Text fontSize={["15px", "15px", "20px", "20px", "20px"]}>
                      2 jours{" "}
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
                    <Text
                      fontSize={["20px", "20px", "20px", "15px", "15px"]}
                      fontWeight={700}
                    >
                      Date de livraison{" "}
                    </Text>
                    <Text fontSize={["15px", "15px", "20px", "20px", "20px"]}>
                      {dateExp3}{" "}
                    </Text>
                  </Box>
                </Flex>

                <Box
                  mr={20}
                  width={["80%", "80%", "80%", "fit-content", "fit-content"]}
                >
                  {categorie.map((data, indexe) => {
                    if (data.contenu == "Ordinateur") {
                      PrixPc = PrixPc + 50
                      // console.log(PrixPc,"prix pc")
                    } else {
                      console.log(inputGroups[indexe][2].value)
                      tab2 = tab2 + parseFloat(inputGroups[indexe][2].value);
                      // inputGroups.map((datos,index) =>{
                      //   if(categorie[index].contenu != "Ordinateur"){
                      //     tab1 = tab1 + parseFloat(datos[2].value);
                      //   }

                      // })
                    }
                    // console.log(tab1,"tab1")
                  })}
                  <Flex
                    display={["flex", "flex", "flex", "grid", "grid"]}
                    width={"100%"}
                    justifyContent={[
                      "space-between",
                      "space-between",
                      "space-between",
                      "normal",
                      "normal",
                    ]}
                  >
                    <Text
                      fontSize={"20px"}
                      ml={5}
                      fontWeight={700}
                      color={"green"}
                    >
                      {parseFloat(tab2) * 10 +
                        ((parseFloat(tab2) * 10 * 5 + parseFloat(PrixPc)) / 100) + parseFloat(PrixPc)}
                      €
                    </Text>
                    <PopUp PrixChoisi={parseFloat(tab2) * 10 +
                      ((parseFloat(tab2) * 10* 5 + parseFloat(PrixPc)) / 100) + parseFloat(PrixPc)}
                      Partenaire={"BAMBA BAGAGE"}
                      email={email}
                      dest={dest}
                      poste={poste}
                      arriv={arriv}
                      radio2={radio2}
                      imageUri={imageUri}
                      ville={ville}
                      inputGroups={inputGroups}
                      categorie={categorie}
                      rue={rue}
                      moyen={"Aerien"}
                    />
                    {/* <Button
                      bgColor={"cyan.700"}
                      color="white"
                      mt={1}
                      onClick={() => {
                        makeDevis("BAMBA BAGAGE", tab2, 10, PrixPc);
                      }}
                    >
                      Choisir
                    </Button> */}
                  </Flex>
                </Box>
              </Flex>
              <Text>Sponsorisés par CHAP</Text>
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
                  width={["100%", "100%", "100%", "80%", "80%"]}
                  justifyContent={"space-between"}
                  px={2}
                  display={["grid", "grid", "grid", "flex", "flex"]}
                >
                  <Box
                    width={"40%"}
                    height={"fit-content"}
                    bgColor={"whiteAlpha.300"}
                    mr={20}
                    display={"grid"}
                  >
                    <Text
                      fontFamily={"sans-serif"}
                      fontWeight={700}
                      fontSize={"20px"}
                    >
                      CHAP
                    </Text>
                    <Image
                      src="bateau.png"
                      alt={"image Avion"}
                      width={"40px"}
                    />
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
                    <Text
                      fontSize={["20px", "20px", "20px", "15px", "15px"]}
                      fontWeight={700}
                    >
                      Date de retrait estimée
                    </Text>
                    <Text fontSize={["15px", "15px", "20px", "20px", "20px"]}>
                      {dateDep}
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
                    <Text
                      fontSize={["20px", "20px", "20px", "15px", "15px"]}
                      fontWeight={700}
                    >
                      Date de départ estimée
                    </Text>
                    <Text fontSize={["15px", "15px", "20px", "20px", "20px"]}>
                      {dateDep}
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
                    <Text
                      fontSize={["20px", "20px", "20px", "15px", "15px"]}
                      fontWeight={700}
                    >
                      Durée estimée
                    </Text>
                    <Text fontSize={["15px", "15px", "20px", "20px", "20px"]}>
                      3/4 semaines{" "}
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
                    <Text
                      fontSize={["20px", "20px", "20px", "15px", "15px"]}
                      fontWeight={700}
                    >
                      Date de livraison estimée{" "}
                    </Text>
                    <Text fontSize={["15px", "15px", "20px", "20px", "20px"]}>
                      {dateExp3C}{" "}
                    </Text>
                  </Box>
                </Flex>

                <Box
                  mr={20}
                  width={["100%", "100%", "100%", "fit-content", "fit-content"]}
                >

                  {categorie.map((data, indexe) => {
                    if (data.contenu == "Ordinateur") {
                      PrixPc = PrixPc + 50
                      // console.log(PrixPc,"prix pc")
                    } else {
                      console.log(inputGroups[indexe][2].value)
                      tab3 = tab3 + parseFloat(inputGroups[indexe][2].value);
                      // inputGroups.map((datos,index) =>{
                      //   if(categorie[index].contenu != "Ordinateur"){
                      //     tab1 = tab1 + parseFloat(datos[2].value);
                      //   }

                      // })
                    }
                    // console.log(tab1,"tab1")
                  })}
                  <Flex
                    display={["flex", "flex", "flex", "grid", "grid"]}
                    width={"100%"}
                    justifyContent={[
                      "space-between",
                      "space-between",
                      "space-between",
                      "normal",
                      "normal",
                    ]}
                  >
                    <Text fontSize={"20px"} fontWeight={700} color={"green"}>
                      {parseFloat(tab2) * 5 +
                        ((parseFloat(tab2) * 5 * 5 + parseFloat(PrixPc)) / 100) + parseFloat(PrixPc)}
                      €
                    </Text>
                    <PopUp PrixChoisi={parseFloat(tab2) * 5 +
                      ((parseFloat(tab2) * 5* 5 + parseFloat(PrixPc)) / 100) + parseFloat(PrixPc)}
                      Partenaire={"CHAP"}
                      email={email}
                      dest={dest}
                      poste={poste}
                      arriv={arriv}
                      radio2={radio2}
                      imageUri={imageUri}
                      ville={ville}
                      inputGroups={inputGroups}
                      categorie={categorie}
                      rue={rue}
                      moyen={"Aerien"}
                    />
                    {/* <Button
                      bgColor={"cyan.700"}
                      color="white"
                      mt={1}
                      onClick={() => {
                        makeDevis("CHAP", tab3, 5, PrixPc);
                      }}
                    >
                      Choisir
                    </Button> */}
                  </Flex>
                </Box>
              </Flex>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    
    </ChakraProvider>
  );
}

export default MyComponent;
