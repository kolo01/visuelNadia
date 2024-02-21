import React, { useState } from "react";
import { AlertDescription, AlertIcon, AlertTitle, CloseButton, Switch, useMediaQuery } from "@chakra-ui/react";
import { InputGroup, InputRightAddon, SimpleGrid, InputRightElement, Label, FormControl, FormLabel, Link, Checkbox, Image, Alert, Toast, FormHelperText, FormErrorMessage } from "@chakra-ui/react";
import { Flex, Input, Button, ChakraProvider, VStack, HStack, Heading, Text, Box, Select, Radio, RadioGroup, Stack, useToast, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Center, Modal, ModalOverlay, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, useDisclosure, Menu, MenuButton, useBoolean, MenuList, MenuItem } from "@chakra-ui/react";
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
import {ChevronDownIcon} from "@chakra-ui/icons"
import Head from "next/head";
import PopUp from "@/components/DevisAddon/popUp";

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
    const [inputGroups, setInputGroups] = useState([
        [
            { id: 1, value: "", title: "Description" },

            { id: 2, value: "", title: "Valeur(euros)" },
        ],
    ]);

    const makeDevis = (param1, param2) => {
        if(poste.length == 5 && (poste.slice(0,2)==91||poste.slice(0,2)==94||poste.slice(0,2)==93||poste.slice(0,2)==92||poste.slice(0,2)==78||poste.slice(0,2)==77||poste.slice(0,2)==75)){
        onAuthStateChanged(authentic, (user) => {
            if (!user) {
            // toggleModal1();
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
                    jour:"30 jours estimés",
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
        }else{
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

    const departAfricolis= ["09/10/2023","13/10/2023","16/10/2023","20/10/2023","23/10/2023","27/10/2023","30/10/2023","03/11/2023"]
    return (
        <ChakraProvider>
            <Head>
                <script async src="https://www.googletagmanager.com/gtag/js?id=G-RFSVQTGJ87" ></script>
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
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-col">
                                <label className="font-bold">Email :</label>
                                <input className="min-w-[22rem] max-[680px]:w-[10rem] max-[1390px]:w-[10rem]  p-1 rounded-sm border border-cyan-800 placeholder-gray-800" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                            <div className="flex flex-col">
                                <label className="font-bold">Adresse : </label>
                                <input className="min-w-[22rem] max-[680px]:w-[10rem] max-[1390px]:w-[10rem]  p-1 rounded-sm border border-cyan-800 placeholder-gray-800" onChange={(e) => { setRue(e.target.value); }} placeholder={"n°Rue/Avenue"} mr={2}/>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-col">
                                <label className="font-bold">Code postal :</label>
                                <input className="min-w-[22rem] max-[680px]:w-[10rem] max-[1390px]:w-[10rem]  p-1 rounded-sm border border-cyan-800 placeholder-gray-800" onChange={(e) => { setPoste(e.target.value); }} placeholder={"Code postal"} mr={2}/>
                            </div>
                            <div className="flex flex-col">
                                <label className="font-bold">Ville : </label>
                                <input className="min-w-[22rem] max-[680px]:w-[10rem] max-[1390px]:w-[10rem]  p-1 rounded-sm border border-cyan-800 placeholder-gray-800" onChange={(e) => { setVille(e.target.value); }} placeholder={"Ville"}/>
                            </div>
                        </div>
                    </div>
                    <div className="selects flex gap-4 max-[1390px]:flex-col max-[1390px]:items-center">
                        <div className="mt-4">
                            <span className="font-bold">De</span>
                            <div>
                                <select className="min-w-[22rem] p-2 bg-white border border-cyan-800 rounded-sm text-gray-800 text-md " placeholder="Pays" onChange={(e) => setDest(e.target.value)}>
                                    <option value={"france"}>France</option>
                                </select>
                            </div>
                        </div>
                        <div className="mt-4">
                            <span className="font-bold">À</span>
                            <div>
                                <select className="min-w-[22rem] p-2 bg-white border border-cyan-800 rounded-sm text-gray-800 text-md "  placeholder="Pays" onChange={(e) => setArriv(e.target.value)}>
                                    <option value={"Côte D'Ivoire"}>{CI}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 flex flex-col justify-center items-center gap-4">
                        <h2 className="font-bold text-2xl">Reception du colis par la structure : </h2>
                        <div className="flex justify-center items-center">
                            <RadioGroup className="flex gap-4" onChange={setRadio2} value={radio2}>
                                <Radio className="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 focus:ring-teal-500 dark:focus:ring-teal-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" value="En agence">Depot en agence</Radio>
                                <Radio className="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 focus:ring-teal-500 dark:focus:ring-teal-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" value="Retrait à domicile">Retrait a domicile</Radio>
                            </RadioGroup>
                        </div>
                    </div>
                </div>

                {inputGroups.map((group, groupId) => (
                    <>
                        <div key={groupId} className="flex justify-center items-center gap-2 mt-4  max-[1390px]:flex-col max-[1390px]:min-w-[22rem] max-[1390px]:items-center max-[680px]:flex-col max-[680px]:items-center">
                            <select  className="p-1.5 bg-white border border-cyan-800 text-gray-800 text-md"
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
                            </select>

                            {group.map((field) => (
                                <div key={field.id}>
                                    {/* <div className="">
                                        <input type="text" className="bg-white border border-cyan-800 p-1 placeholder-gray-800" value={field.value} placeholder={field.title} onChange={(e) => handleInputChange(groupId, field.id, e.target.value) }/>
                                    </div> */}
                                    <div className="">
                                    {field.id == 1 ? (
                                            <textarea className="p-1 border border-cyan-800 placeholder-gray-800" 
                                            
                                                placeholder={field.title}
                                                value={field.value}
                                                onChange={(e) =>
                                                handleInputChange(groupId, field.id, e.target.value)
                                                }
                                            />
                                        ) : (
                                            <input className="p-1 border border-cyan-800 placeholder-gray-800 " 
                                                type="text"
                                                placeholder={field.title}
                                                value={field.value}
                                                onChange={(e) =>
                                                handleInputChange(groupId, field.id, e.target.value)
                                                }
                                            />
                                        )}
                                    </div>
                                </div>
                            ))}
                            <div className="flex justify-center items-center">
                                {groupId === 0 ? (
                                    <GrAddCircle className="border border-cyan-800 bg-white h-8 w-10" onClick={() => handleAddGroup(groupId)} />
                                    ) : (
                                    <TiDelete className="border border-cyan-800 bg-white h-8 w-10" onClick={() => handleRemoveGroup(groupId)} />
                                )}
                            </div>
                        </div>

                        <div className="mt-4 mb-8">
                            <FormControl className="flex justify-center items-center gap-1">
                                <input type="checkbox" className="w-4 h-4 text-cyan-800 bg-gray-100 border-gray-300 rounded focus:ring-cyan-800 dark:focus:ring-cyan-800 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={(e) => { e.target.checked ? (need[groupId].besoin = 10) : (need[groupId].besoin = 0); }} />
                                <h2 className="text-cyan-800">Besoin du materiel ?</h2>
                            </FormControl>
                        </div>
                    </>
                ))}
            </main>

            <button className="bg-cyan-800 px-6 py-2 rounded-sm text-white font-bold hover:bg-teal-800" isDisabled={ email.length < 10 || dest.length < 4 || arriv.length < 3 || radio2.length < 3 } onClick={onOpen}>Envoyer</button>
            

            {/*UNE AUTRE PAGE information sur les differents fournisseurs et leur jour de livraison */}
            <Drawer onClose={onClose} isOpen={isOpen} size={"full"}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <nav className="css-1a4ibax m-10">
                        <section class="step-wizard">
                            <ul class="step-wizard-list">
                                <li class="step-wizard-item">
                                    <span class="progress-count">1</span>
                                    <span class="progress-label">Sélection de service</span>
                                </li>
                                <li class="step-wizard-item current-item">
                                    <span class="progress-count">2</span>
                                    <span class="progress-label">Détails de l’expédition</span>
                                </li>
                                <li class="step-wizard-item">
                                    <span class="progress-count">3</span>
                                    <span class="progress-label">Détails de l’adresse</span>
                                </li>
                                <li class="step-wizard-item">
                                    <span class="progress-count">4</span>
                                    <span class="progress-label">Détails de paiement</span>
                                </li>
                            </ul>
                        </section>
                    </nav>

                    <div className="h-full">
                        <div className="container mx-auto flex flex-col gap-4">
                            <div className="min-w-full flex justify-between rounded-md shadow-[0_15px_60px_-15px_rgba(0,0,0,0.3)]">
                                <div className="w-full flex justify-evenly max-[768px]: max-[768px]:flex-col max-[768px]:p-2 ">
                                    <div className="flex justify-between items-center">
                                        <div className="flex flex-col py-4 px-12 gap-4 bg-orange-600 rounded-tl-lg max-[768px]:p2 max-[768px]:flex-row max-[768px]: max-[768px]:rounded-br-xl">
                                            <div className="flex flex-col justify-center items-start text-white max-[768px]:flex-row">
                                                <strong className="text-[3rem] max-[768px]:text-xl max-[768px]:-mt-1">30</strong>
                                                <small className="font-bold max-[768px]:ml-2">Jours</small>
                                            </div>
                                            <span className="text-white font-bold text-[0.8rem] -mt-4 max-[768px]:-mt-0">Estimés</span>
                                        </div>
                                        <div className="flex flex-col justify-center items-center gap-2 mr-10 ml-10  max-[768px]:ml-0 max-[768px]:mr-4 max-[768px]:mt-4">
                                            <Image className="w-40  max-[768px]:w-20" src="airplane.jpg" alt={"image Avion"}/>
                                            <h2 className="uppercase">Africolis</h2>
                                        </div>
                                    </div>
                                    <div className="w-full flex justify-between items-center">
                                        <div className="flex flex-col gap-2">
                                            <span  className="font-bold">Date de retrait estimée</span>
                                            <span>{dateDep}</span>
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <span  className="font-bold">Date de départ estimée</span>
                                            <div>
                                                <Menu className="bg-red-500">
                                                    <MenuButton>
                                                        <Flex>
                                                            <h2 className="text-slate-800"> Voir Toutes les dates</h2>
                                                            <ChevronDownIcon className="text-slate-800" fontSize={30} />
                                                        </Flex>
                                                    </MenuButton>
                                                    <MenuList className="bg-yellow-400">
                                                        {departAfricolis.map((data,index)=>
                                                        (
                                                        <MenuItem className="bg-yellow-400" key={index}>{data}</MenuItem>
                                                        ))}
                                                    </MenuList>
                                                </Menu>
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <span  className="font-bold">Date de livraison estimée{" "}</span>
                                            <span>{dateExp3}{" "}</span>
                                        </div>

                                        <div>
                                            {prix.map((prix, prixId) => {
                                                tab1 =
                                                tab1 +
                                                (parseFloat(prix.prix) +
                                                    parseFloat(need[prixId].besoin) +
                                                    parseFloat(prix.envoi));
                                            })}
                                            <div className="flex flex-col gap-2 p-4">
                                                <h2 className="flex justify-end text-red-600 text-2xl max-[768px]:text-xl max-[768px]:text-center">{parseFloat(tab1) + (parseFloat(tab1) * 5) / 100}€</h2>
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
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="min-w-full flex justify-between rounded-md shadow-[0_15px_60px_-15px_rgba(0,0,0,0.3)]">
                                <div className="w-full flex justify-evenly max-[768px]: max-[768px]:flex-col max-[768px]:p-2 ">
                                    <div className="flex justify-between items-center">
                                        <div className="flex flex-col py-4 px-12 gap-4 bg-orange-600 rounded-tl-lg max-[768px]:p2 max-[768px]:flex-row max-[768px]: max-[768px]:rounded-br-xl">
                                            <div className="flex flex-col justify-center items-start text-white max-[768px]:flex-row">
                                                <strong className="text-[3rem] max-[768px]:text-xl max-[768px]:-mt-1">30</strong>
                                                <small className="font-bold max-[768px]:ml-2">Jours</small>
                                            </div>
                                            <span className="text-white font-bold text-[0.8rem] -mt-4 max-[768px]:-mt-0">Estimés</span>
                                        </div>
                                        <div className="flex flex-col justify-center items-center gap-2 mr-10 ml-10  max-[768px]:ml-0 max-[768px]:mr-4 max-[768px]:mt-4">
                                            <Image className="w-40  max-[768px]:w-20" src="airplane.jpg" alt={"image Avion"}/>
                                            <h2 className="uppercase">Challenge</h2>
                                        </div>
                                    </div>
                                    <div className="w-full flex justify-between items-center">
                                        <div className="flex flex-col gap-2">
                                            <span>Date de retrait estimée</span>
                                            <span>{dateDep}</span>
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <span>Date de départ estimée</span>
                                            <span>{dateDep}</span>
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <span>Date de livraison estimée{" "}</span>
                                            <span>{dateExp3}{" "}</span>
                                        </div>

                                       
                                        <div>
                                            {" "}
                                            {prix.map((prix, prixId) => {
                                                {
                                                    tab2 =
                                                    tab2 +
                                                    (parseFloat(prix.prix) +
                                                    parseFloat(need[prixId].besoin) +
                                                    parseFloat(prix.envoi));
                                                }
                                            })}
                                            <div className="flex flex-col gap-2 p-4 ">
                                                <h2 className="flex justify-end text-red-600 text-2xl max-[768px]:text-xl max-[768px]:text-center ">{parseFloat(tab2) + (parseFloat(tab2)) + (parseFloat(tab2) * 5) / 100}€</h2>
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
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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
                                            <CloseButton alignSelf="flex-start" position="relative" right={-1} top={-1} onClick={onClose}/>
                                        </Alert>
                                    ) : (
                                        <></>
                                    )}
                                    <Flex textAlign={"center"} bgColor={["white", "white", "white", "white", "white"]} borderRadius={5} w={"90%"} h={500} mx={[5, 5, 5, 5, 12]} my={5}>
                                        <Center width={"fit-content"}>
                                            <Box width={"full"} color={"black"}>
                                                <FormControl isInvalid={isError}>
                                                    <Stack spacing={4}>
                                                        <Heading display={["none", "none", "none", "grid", "grid"]} ml={["10%", "10%", "10%", "0%", "0%"]}>
                                                            Bienvenue
                                                        </Heading>
                                                        <Text display={["none", "none", "none", "grid", "grid"]}>Connectez-vous á votre compte</Text>
                                                        <Center display={"grid"}>
                                                            <Input mb={2} type={"text"} placeholder="Email" border={"2px solid gray"} width={[ "200px", "200px", "350px", "350px", "350px", ]} onChange={(ev) => setEmail2(ev.target.value.trim().toLowerCase() ) } color={"gray.500"}/>
                                                            <InputGroup>
                                                                <Input onChange={(e) => setPassword(e.target.value)} width={["200px", "200px", "350px", "350px", "350px"]} type={show ? "text" : "password"} placeholder="Entrez le mot de passe"/>
                                                            </InputGroup>
                                                        </Center>
                                                        <TransitionExample />
                                                        <Box display={"grid"}>
                                                            <Center>
                                                                <Button width={"fit-content"} bgColor={"#08566e"} color={"white"} _hover={{     bg: "#08566e", }} onClick={() => loginUSer()} > Connexion{" "} </Button>
                                                            </Center>
                                                            <Button as={Link} bgColor={"white"} _hover={{ textDecoration: "none", bgColor: "white", }}>
                                                                Pas de compte? Créer un compte
                                                            </Button>
                                                        </Box>
                                                    </Stack>
                                                    {!isError ? (
                                                        <FormHelperText></FormHelperText>
                                                    ) : (
                                                        <FormErrorMessage>Email is required.</FormErrorMessage>
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

export default MyComponent2;