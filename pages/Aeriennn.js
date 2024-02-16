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
import { ref as _rf, uploadBytes, getDownloadURL } from "firebase/storage";
import Head from "next/head";
import sha256 from "crypto-js/sha256";
import CryptoJS from "crypto-js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWareHouse,
  faHome,
  faPlaneDeparture,
} from "@fortawesome/free-solid-svg-icons";
import PopUp from "@/components/DevisAddon/popUp";
import secureLocalStorage from "react-secure-storage";

function MyComponent() {
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

  const [check, setCheck] = useState("none");

  const [selection, setSelection] = useState([{ id: "Textile" }]);
  const [fileInputsVisible, setFileInputsVisible] = useState([false]);
  var tab1 = 0;
  var tab2 = 0;
  var tab3 = 0;
  var checker = 0;
  var PrixPc = 0;

  const [categorie, setCategorie] = useState([
    { contenu: "Textile", prix: 10 },
  ]);
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
      contenu: "Textile",
      prix: 10,
    });
    image.push({ file: "" });
    imageUri.push({ link: [], collection: "" });
    setFileInputsVisible([...fileInputsVisible, false]);
    setInputGroups([...inputGroups, newGroup]);
  };

  const handleRemoveGroup = (groupId) => {
    console.log("inputgroupes", inputGroups[groupId]);
    console.log("categorie", categorie[groupId]);
    const updatedInputGroups = inputGroups.filter(
      (_, index) => index !== groupId
    );
    const updatedCat = categorie.filter((_, index) => index !== groupId);
    const updatedimage = image.filter((_, index) => index !== groupId);
    const updatedimageUri = imageUri.filter((_, index) => index !== groupId);
    setCategorie(updatedCat);
    setInputGroups(updatedInputGroups);
    setImage(updatedimage);
    setImageUri(updatedimageUri);

    fileInputsVisible[groupId] = false;
  };
  function generateCustomKey() {
    // Obtenez le timestamp actuel en millisecondes
    const timestamp = Date.now();

    // Utilisez un format de date pour formater le timestamp
    const dateFormat = new Intl.DateTimeFormat("fr-FR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "UTC",
    });

    const [
      { value: month },
      ,
      { value: day },
      ,
      { value: year },
      ,
      { value: hour },
      ,
      { value: minute },
      ,
      { value: second },
    ] = dateFormat.formatToParts(timestamp);

    // Créez la clé personnalisée en utilisant le timestamp formaté
    const formattedTimestamp = `${year}${day}${month}${hour}${minute}${second}`;

    return `DE${formattedTimestamp}`;
  }
  const makeDevis = async (param1, param2, param3, param4) => {
    console.log("dans le else");
    if (poste.length == 5) {
      onAuthStateChanged(authentic, (user) => {
        if (!user) {
          toggleModal1();
        } else {
          const idDev = generateCustomKey();

          const hashDigest = sha256(idDev).toString(CryptoJS.enc.Hex);

          const hash = hashDigest.slice(0, 3).toString();

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
            await axios
              .post("/api/sendDevis", {
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
        description: "Nos services se limite qu'a une certaine zone",
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
    setEmail(sessionStorage.getItem("email") ?? "");
    setRue(secureLocalStorage.getItem("addresse") ?? "");
    setPoste(secureLocalStorage.getItem("po") ?? "");
  }, [selection]);

  const handleFileUpload = async (ed, files, emai) => {
    const storageRef = _rf(storage, `Devis/${emai}/${files.name}`);

    const snapshot = await uploadBytes(storageRef, files);
    const downloadURL = await getDownloadURL(snapshot.ref);
    if (
      categorie[ed].contenu != "Textile" &&
      categorie[ed].contenu != "Aliment"
    ) {
      if (ed > imageUri.length) {
        const getInd = ed - 1;
        imageUri[getInd].collection = `colis${ed}`;
        imageUri[getInd].link.push(downloadURL);
        console.log("imageUri", imageUri);
      } else {
        imageUri[ed].collection = `colis${ed}`;
        imageUri[ed].link.push(downloadURL);
        console.log("imageUri", imageUri);
      }
    }
  };

  const Tester = (data, index) => {
    console.log(data);
    const donnee = data.file;

    for (let i = 0; i < donnee.length; i++) {
      console.log("for de tester", donnee[i]);
      // makeDevis(0,0,0,index,donnee[i])
      handleFileUpload(index, donnee[i], email);
    }
  };

  ////Functions du bouton envoyer des maintenant
  const LaunchAll = () => {
    {
      inputGroups.map((group, groupId) => {
        {
          checker = checker + parseFloat(group[2].value);
        }
      });
    }
    if (checker > 0) {
      onOpen();
      image.map((data, index) => {
        Tester(data, index);
      });
    } else {
      alert("merci de bien vouloir renseigner le poids de chaque article");
    }
  };

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

      <main>
        <div>
          <div className="flex gap-4 mt-4 max-[1390px]:flex-col max-[1390px]:min-w-[22rem] max-[1390px]:items-center max-[680px]:flex-col max-[680px]:items-center">
            <div className="flex flex-col gap-2 max-[680px]:gap-4">
              <div className="flex flex-col">
                <label className="font-bold">Email :</label>
                <input
                  className="min-w-[22rem] max-[680px]:w-[10rem] max-[1390px]:w-[10rem]  p-1 rounded-sm border border-cyan-800 placeholder-gray-800"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  width={"100%"}
                />
              </div>
              <div className="flex flex-col">
                <label className="font-bold">Adresse : </label>
                <input
                  className="min-w-[22rem] max-[680px]:w-[10rem] max-[1390px]:w-[10rem]  p-1 rounded-sm border border-cyan-800 placeholder-gray-800"
                  onChange={(e) => {
                    setRue(e.target.value);
                  }}
                  value={rue}
                  placeholder={"n°Rue/Avenue"}
                  mr={2}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 max-[680px]:gap-4">
              <div className="flex flex-col">
                <label className="font-bold">Code postal :</label>
                <input
                  className="min-w-[22rem] max-[680px]:w-[10rem] max-[1390px]:w-[10rem]  p-1 rounded-sm border border-cyan-800 placeholder-gray-800"
                  onChange={(e) => {
                    setPoste(e.target.value);
                  }}
                  value={poste}
                  placeholder={"Code postal"}
                  mr={2}
                />
              </div>
              <div className="flex flex-col">
                <label className="font-bold">Ville : </label>
                <input
                  className="min-w-[22rem] max-[680px]:w-[10rem] max-[1390px]:w-[10rem]  p-1 rounded-sm border border-cyan-800 placeholder-gray-800"
                  onChange={(e) => {
                    setVille(e.target.value);
                  }}
                  placeholder={"Ville"}
                />
              </div>
            </div>
          </div>
          <div className="selects flex gap-4 max-[1390px]:flex-col max-[1390px]:items-center">
            <div className="mt-4">
              <span className="font-bold">De</span>
              <div>
                <select
                  className="min-w-[22rem] p-2 bg-white border border-cyan-800 placeholder-gray-800 text-gray-800 text-md "
                  placeholder="Pays"
                  onChange={(e) => setDest(e.target.value)}
                >
                  <option value={"France"}>France</option>
                </select>
              </div>
            </div>
            <div className="mt-4  max-[680px]:mt-0">
              <span className="font-bold">À</span>
              <div>
                <select
                  className="min-w-[22rem] p-2 bg-white border border-cyan-800 placeholder-gray-800 text-gray-800 text-md "
                  placeholder="Pays"
                  onChange={(e) => setArriv(e.target.value)}
                >
                  <option value={"Côte D'Ivoire"}>{CI}</option>
                </select>
              </div>
            </div>
          </div>
          <div className="mt-8 flex flex-col justify-center items-center gap-4">
            <h2 className="font-bold text-2xl max-[680px]:text-xl">
              Reception du colis par la structure :{" "}
            </h2>
            <div className="flex justify-center items-center">
              <RadioGroup
                className="flex gap-4"
                onChange={setRadio2}
                value={radio2}
              >
                <Radio
                  className="w-4 h-4 text-teal-600 bg-gray-100 border border-cyan-800 placeholder-gray-800 focus:ring-teal-500 dark:focus:ring-teal-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  value="En agence"
                >
                  Depot en agence
                </Radio>
                <Radio
                  className="w-4 h-4 text-teal-600 bg-gray-100 border border-cyan-800 placeholder-gray-800 focus:ring-teal-500 dark:focus:ring-teal-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  value="Retrait à domicile"
                >
                  Retrait a domicile
                </Radio>
              </RadioGroup>
            </div>
          </div>
        </div>

        <h2 className="text-cyan-800 font-bold text-center mt-4 text-xl">
          Informations Colis
        </h2>

        {inputGroups.map((group, groupId) => (
          <>
            {" "}
            <div className="flex flex-col justify-center items-center gap-2 mt-4 max-[1390px]:flex-col max-[1390px]:min-w-[22rem] max-[1390px]:items-center max-[680px]:flex-col max-[680px]:items-center">
              <div className="flex justify-center items-center ">
                <select
                  className="p-2 -mb-4 rounded-sm border border-cyan-800 placeholder-gray-800 bg-white text-black text-md "
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
                </select>
                {fileInputsVisible[groupId] && ( // Afficher le champ input type file si la visibilité est true
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => {
                      image[groupId].file = e.target.files;
                      image[groupId].nom = `colis${groupId}`;
                    }}
                  />
                )}
              </div>
              <div className="flex justify-center items-center gap-2 mt-4 max-[680px]:flex-col">
                {/* */}
                {group.map((field) => (
                  <div key={field.id}>
                    {field.id == 1 ? (
                      <textarea
                        className="p-1 border border-cyan-800 placeholder-gray-800"
                        placeholder={field.title}
                        value={field.value}
                        onChange={(e) =>
                          handleInputChange(groupId, field.id, e.target.value)
                        }
                      />
                    ) : (
                      <input
                        className="p-1 border border-cyan-800 placeholder-gray-800 "
                        type="text"
                        placeholder={field.title}
                        value={field.value}
                        onChange={(e) =>
                          handleInputChange(groupId, field.id, e.target.value)
                        }
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="-mb-4">
                {groupId === 0 ? (
                  <GrAddCircle
                    className="border border-cyan-800 placeholder-gray-800 bg-white h-8 w-10"
                    onClick={handleAddGroup}
                  />
                ) : (
                  <TiDelete
                    className="border border-cyan-800 placeholder-gray-800 bg-white h-8 w-10"
                    onClick={() => handleRemoveGroup(groupId)}
                  />
                )}
              </div>
            </div>
          </>
        ))}
      </main>

      <button
        className="bg-cyan-800 px-4 py-2 mt-8 rounded-sm text-white font-bold hover:bg-teal-800"
        isDisabled={email.length < 10 || dest.length < 4 || radio2.length < 3}
        onClick={() => {
          LaunchAll();
        }}
      >
        Envoyer
      </button>

      {/* information sur les differents fournisseurs et leur jour de livraison */}
      <Drawer onClose={onClose} isOpen={isOpen} size={"full"}>
        <DrawerOverlay />
        <DrawerContent className="">
          <DrawerCloseButton />
          <section className="w-full py-4">
            <div className="container mx-auto">
              <header className="p-4">
                <ul className="flex justify-center items-center z-10 relative p-2">
                  <li
                    className="flex flex-col flex-grow after:content-[''] after:absolute after:bg-cyan-800 after: after:min-w-[98%]
                                        after:h-[2px] after:left-10 after:top-7 -z-10 max-[780px]:after:min-w-[80%]"
                  >
                    <span className="bg-cyan-800 text-white rounded-full w-10 h-10 p-2 flex justify-center items-center relative">
                      1
                    </span>
                    <span className="text-cyan-800">Sélection de service</span>
                  </li>
                  <li className="flex flex-col flex-grow max-[780px]:-mt-4">
                    <span className="bg-cyan-800 text-white rounded-full w-10 h-10 p-2 flex justify-center items-center relative">
                      2
                    </span>
                    <span className="text-cyan-800 max-[768px]:hidden">
                      Détails de l’expédition
                    </span>
                  </li>
                  <li className="flex flex-col flex-grow max-[780px]:-mt-4">
                    <span className="bg-cyan-800 text-white rounded-full w-10 h-10 p-2 flex justify-center items-center relative">
                      3
                    </span>
                    <span className="text-cyan-800 max-[768px]:hidden">
                      Détails de l’adresse
                    </span>
                  </li>
                  <li className="flex flex-col flex-grow max-[780px]:-mt-4">
                    <span className="bg-cyan-800 text-white rounded-full w-10 h-10 p-2 flex justify-center items-center relative">
                      4
                    </span>
                    <span className="text-cyan-800 max-[768px]:hidden">
                      Détails de paiement
                    </span>
                  </li>
                </ul>
              </header>
              {categorie.map((data, indexe) => {
                if (data.contenu == "Ordinateur") {
                  PrixPc = PrixPc + 50;
                } else {
                  tab1 = tab1 + parseFloat(inputGroups[indexe][2].value);
                }
                // console.log(tab1,"tab1")
              })}
              <main className="py-10 w-full max-[768px]:hidden max-[1024px]:">
                <div className="bg-white flex flex-col gap-4 max-[768px]:bg-red-500">
                  <div className="flex justify-between shadow-md max-[768px]:">
                    <div className="flex flex-col items-center bg-orange-600 py-4 px-10 text-white rounded-tl-lg gap-2">
                      <h2 className="text-4xl font-bold">2</h2>
                      <small>Jours</small>
                      <span>Estimés</span>
                    </div>
                    <div className="flex flex-col items-start p-4 gap-2 m">
                      <span>
                        <FontAwesomeIcon
                          icon={faPlaneDeparture}
                          className="size-10 text-cyan-800"
                        />
                      </span>
                      <h2>CICV</h2>
                    </div>
                    <div className="flex flex-col items-start p-4 gap-2">
                      <span className="font-bold">
                        <FontAwesomeIcon
                          icon={faHome}
                          className="size-4 mr-2 text-cyan-800 text-2xl"
                        />
                        Dépôt
                      </span>
                      <span>{dateDep}</span>
                      <small>Déposez votre colis dès aujourd’hui</small>
                    </div>
                    <div className="flex flex-col items-start p-4 gap-2">
                      <span className="font-bold">
                        <FontAwesomeIcon
                          icon={faHome}
                          className="size-4 mr-2 text-cyan-800 text-2xl"
                        />
                        Retrait
                      </span>
                      <span>{dateExp3}</span>
                      <small>Le destinataire peut récupérer le colis</small>
                    </div>
                    <div className="flex flex-col items-start p-4 gap-2">
                      <h2 className="self-end text-3xl font-bold text-cyan-800 max-[1024px]:text-2xl">
                        {parseFloat(tab1) * 13 +
                          (parseFloat(tab1) * 13 * 5 + parseFloat(PrixPc)) /
                            100 +
                          parseFloat(PrixPc)}
                        €
                      </h2>
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
                    </div>
                  </div>

                  <div className="flex justify-between shadow-md">
                    <div className="flex flex-col items-center bg-orange-600 py-4 px-10 text-white rounded-tl-lg gap-2">
                      <h2 className="text-4xl font-bold">2</h2>
                      <small>Jours</small>
                      <span>Estimés</span>
                    </div>
                    <div className="flex flex-col items-start p-4 gap-2 m">
                      <span>
                        <FontAwesomeIcon
                          icon={faPlaneDeparture}
                          className="size-10 text-cyan-800"
                        />
                      </span>
                      <h2>BAMBA BAGAGE</h2>
                    </div>
                    <div className="flex flex-col items-start p-4 gap-2">
                      <span className="font-bold">
                        <FontAwesomeIcon
                          icon={faHome}
                          className="size-4 mr-2 text-cyan-800 text-2xl"
                        />
                        Dépôt
                      </span>
                      <span>{dateDep}</span>
                      <small>Déposez votre colis dès aujourd’hui</small>
                    </div>
                    <div className="flex flex-col items-start p-4 gap-2">
                      <span className="font-bold">
                        <FontAwesomeIcon
                          icon={faHome}
                          className="size-4 mr-2 text-cyan-800 text-2xl"
                        />
                        Retrait
                      </span>
                      <span>{dateExp3}</span>
                      <small>Le destinataire peut récupérer le colis</small>
                    </div>
                    <div className="flex flex-col items-start p-4 gap-2">
                      <h2 className="self-end text-3xl font-bold text-cyan-800 max-[1024px]:text-2xl">
                        {parseFloat(tab1) * 10 +
                          (parseFloat(tab1) * 10 * 5 + parseFloat(PrixPc)) /
                            100 +
                          parseFloat(PrixPc)}
                        €
                      </h2>
                      <PopUp PrixChoisi={parseFloat(tab1) * 10 +
                      ((parseFloat(tab1) * 10* 5 + parseFloat(PrixPc)) / 100) + parseFloat(PrixPc)}
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
                    </div>
                  </div>

                  <div className="flex justify-between shadow-md">
                    <div className="flex flex-col items-center bg-orange-600 py-4 px-10 text-white rounded-tl-lg gap-2">
                      <h2 className="text-4xl font-bold">3/4</h2>
                      <small>Semaines</small>
                      <span>Estimés</span>
                    </div>
                    <div className="flex flex-col items-start p-4 gap-2 m">
                      <span>
                        <FontAwesomeIcon
                          icon={faPlaneDeparture}
                          className="size-10 text-cyan-800"
                        />
                      </span>
                      <h2>CHAP</h2>
                    </div>
                    <div className="flex flex-col items-start p-4 gap-2">
                      <span className="font-bold">
                        <FontAwesomeIcon
                          icon={faHome}
                          className="size-4 mr-2 text-cyan-800 text-2xl"
                        />
                        Dépôt
                      </span>
                      <span>{dateDep}</span>
                      <small>Déposez votre colis dès aujourd’hui</small>
                    </div>
                    <div className="flex flex-col items-start p-4 gap-2">
                      <span className="font-bold">
                        <FontAwesomeIcon
                          icon={faHome}
                          className="size-4 mr-2 text-cyan-800 text-2xl"
                        />
                        Retrait
                      </span>
                      <span>{dateExp3C}</span>
                      <small>Le destinataire peut récupérer le colis</small>
                    </div>
                    <div className="flex flex-col items-start p-4 gap-2">
                      <h2 className="self-end text-3xl font-bold text-cyan-800 max-[1024px]:text-2xl">
                        {parseFloat(tab1) * 5 +
                          (parseFloat(tab1) * 5 * 5 + parseFloat(PrixPc)) /
                            100 +
                          parseFloat(PrixPc)}
                        €
                      </h2>
                      <PopUp
                        PrixChoisi={
                          parseFloat(tab1) * 5 +
                          (parseFloat(tab1) * 5 * 5 + parseFloat(PrixPc)) /
                            100 +
                          parseFloat(PrixPc)
                        }
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
                    </div>
                  </div>
                </div>
              </main>

              <main className="py-10 w-full max-[768px]:w-full min-[769px]:hidden min-[1669px]:hidden min-[1024px]:hidden">
                <div className="bg-white flex flex-col gap-4 max-[768px]:">
                  <div className="flex justify-between shadow-md">
                    <div className="flex flex-col">
                      <div className="flex items-center bg-orange-600 p2 text-white rounded-r-3xl gap-2">
                        <h2 className="text-4xl font-bold">2</h2>
                        <small>Jours</small>
                        <span>Estimés</span>
                      </div>
                      <div className="flex flex-col items-start p-4 gap-2">
                        <span className="font-bold">
                          <FontAwesomeIcon
                            icon={faHome}
                            className="size-4 mr-2 text-cyan-800"
                          />
                          Dépôt
                        </span>
                        <span>{dateDep}</span>
                        <small>Déposez votre colis dès aujourd’hui</small>
                      </div>
                      <div className="flex flex-col items-start p-4 gap-2">
                        <span className="font-bold">
                          <FontAwesomeIcon
                            icon={faHome}
                            className="size-4 mr-2 text-cyan-800"
                          />
                          Retrait
                        </span>
                        <span>{dateExp3}</span>
                        <small>Le destinataire peut récupérer le colis</small>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex flex-col items-end p-4 gap-2">
                        <span>
                          <FontAwesomeIcon
                            icon={faPlaneDeparture}
                            className="size-10 text-cyan-800"
                          />
                        </span>
                        <h2>CICV</h2>
                      </div>

                      <div className="flex flex-col items-end p-4 gap-2 mt-10">
                        <h2 className="self-end text-3xl font-bold text-cyan-800 max-[1024px]:text-2xl">
                        {parseFloat(tab1) * 13 +
                          (parseFloat(tab1) * 13 * 5 + parseFloat(PrixPc)) /
                            100 +
                          parseFloat(PrixPc)}
                        €
                      </h2>
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
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between shadow-md">
                    <div className="flex flex-col">
                      <div className="flex items-center bg-orange-600 p2 text-white rounded-r-3xl gap-2">
                        <h2 className="text-4xl font-bold">2</h2>
                        <small>Jours</small>
                        <span>Estimés</span>
                      </div>
                      <div className="flex flex-col items-start p-4 gap-2">
                        <span className="font-bold">
                          <FontAwesomeIcon
                            icon={faHome}
                            className="size-4 mr-2 text-cyan-800"
                          />
                          Dépôt
                        </span>
                        <span>{dateDep}</span>
                        <small>Déposez votre colis dès aujourd’hui</small>
                      </div>
                      <div className="flex flex-col items-start p-4 gap-2">
                        <span className="font-bold">
                          <FontAwesomeIcon
                            icon={faHome}
                            className="size-4 mr-2 text-cyan-800"
                          />
                          Retrait
                        </span>
                        <span>{dateExp3}</span>
                        <small>Le destinataire peut récupérer le colis</small>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex flex-col items-end p-4 gap-2">
                        <span>
                          <FontAwesomeIcon
                            icon={faPlaneDeparture}
                            className="size-10 text-cyan-800"
                          />
                        </span>
                        <h2>BAMBA BAGAGE</h2>
                      </div>

                      <div className="flex flex-col items-end p-4 gap-2 mt-10">
                        <h2 className="self-end text-3xl font-bold text-cyan-800 max-[1024px]:text-2xl">
                        {parseFloat(tab1) * 10 +
                          (parseFloat(tab1) * 10 * 5 + parseFloat(PrixPc)) /
                            100 +
                          parseFloat(PrixPc)}
                        €
                      </h2>
                        <PopUp PrixChoisi={parseFloat(tab1) * 10 +
                      ((parseFloat(tab1) * 10* 5 + parseFloat(PrixPc)) / 100) + parseFloat(PrixPc)}
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
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between shadow-md">
                    <div className="flex flex-col">
                      <div className="flex items-center bg-orange-600 p2 text-white rounded-r-3xl gap-2">
                        <h2 className="text-4xl font-bold">3/4</h2>
                        <small>Semaines</small>
                        <span>Estimés</span>
                      </div>
                      <div className="flex flex-col items-start p-4 gap-2">
                        <span className="font-bold">
                          <FontAwesomeIcon
                            icon={faHome}
                            className="size-4 mr-2 text-cyan-800"
                          />
                          Dépôt
                        </span>
                        <span>{dateDep}</span>
                        <small>Déposez votre colis dès aujourd’hui</small>
                      </div>
                      <div className="flex flex-col items-start p-4 gap-2">
                        <span className="font-bold">
                          <FontAwesomeIcon
                            icon={faHome}
                            className="size-4 mr-2 text-cyan-800"
                          />
                          Retrait
                        </span>
                        <span>{dateExp3C}</span>
                        <small>Le destinataire peut récupérer le colis</small>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex flex-col items-end p-4 gap-2">
                        <span>
                          <FontAwesomeIcon
                            icon={faPlaneDeparture}
                            className="size-10 text-cyan-800"
                          />
                        </span>
                        <h2>CHAP</h2>
                      </div>

                      <div className="flex flex-col items-end p-4 gap-2 mt-10">
                         <h2 className="self-end text-3xl font-bold text-cyan-800 max-[1024px]:text-2xl">
                        {parseFloat(tab1) * 5 +
                          (parseFloat(tab1) * 5 * 5 + parseFloat(PrixPc)) /
                            100 +
                          parseFloat(PrixPc)}
                        €
                      </h2>
                         <PopUp
                        PrixChoisi={
                          parseFloat(tab1) * 5 +
                          (parseFloat(tab1) * 5 * 5 + parseFloat(PrixPc)) /
                            100 +
                          parseFloat(PrixPc)
                        }
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
                      </div>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </section>
        </DrawerContent>
      </Drawer>
      {/* <Modal isCentered isOpen={isOpenModal1} onClose={toggleModal1} size={"xl"}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Connexion/Inscription</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <>
                            <Center>
                                <Text mr={4}>Connexion</Text>
                                <Switch size="lg" onChange={(e) => setInterup(e.target.checked)} value={interup} />
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
                                )}
                                <Flex textAlign={"center"} bgColor={["white", "white", "white", "white", "white"]} borderRadius={5} w={"90%"} h={500} mx={[5, 5, 5, 5, 12]} my={5}>
                                    <Center width={"fit-content"}>
                                        <Box width={"full"} color={"black"}>
                                            <FormControl isInvalid={isError}>
                                                <Stack spacing={4}>
                                                    <Heading display={["none", "none", "none", "grid", "grid"]}
                                                        ml={["10%", "10%", "10%", "0%", "0%"]}>
                                                        Bienvenue
                                                    </Heading>
                                                    <Text display={["none", "none", "none", "grid", "grid"]}>Connectez-vous á votre compte</Text>
                                                    <Center display={"grid"}>
                                                        <Input
                                                            mb={2}
                                                            type={"text"}
                                                            placeholder="Email"
                                                            border={"2px solid gray"}
                                                            width={["200px","200px","350px","350px","350px"]}
                                                            onChange={(ev) =>
                                                            setEmail2(
                                                                ev.target.value.trim().toLowerCase()
                                                            )}
                                                            color={"gray.500"}
                                                        />
                                                        <InputGroup>
                                                            <Input
                                                            onChange={(e) => setPassword(e.target.value)}
                                                            width={["200px","200px","350px","350px","350px"]}
                                                            type={show ? "text" : "password"}
                                                            placeholder="Entrez le mot de passe"
                                                            />
                                                            
                                                        </InputGroup>
                                                    </Center>

                                                    <TransitionExample />
                                                    <Box display={"grid"}>
                                                        <Center>
                                                            <Button width={"fit-content"} bgColor={"#08566e"} color={"white"} _hover={{     bg: "#08566e", }} onClick={() => loginUSer()} > Connexion{" "} </Button>
                                                        </Center>
                                                        <Button as={LinkC} bgColor={"white"} _hover={{ textDecoration: "none", bgColor: "white", }}>
                                                            Pas de compte? Créer un compte
                                                        </Button>
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
            </Modal> */}
    </ChakraProvider>
  );
}

export default MyComponent;
