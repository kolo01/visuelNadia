import React, { useEffect, useState } from "react";
import { AlertDescription, AlertIcon, AlertTitle, CloseButton, Switch, useMediaQuery } from "@chakra-ui/react";
import { InputGroup, InputRightAddon, SimpleGrid, InputRightElement, Label, FormControl, FormLabel, Link as LinkC, Checkbox, Image, Alert, Toast, FormHelperText, FormErrorMessage } from "@chakra-ui/react";
import { Flex, Input, Button, ChakraProvider, VStack, HStack, Heading, Text, Box, useToast, Radio, RadioGroup, Stack, Select, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, useDisclosure, Center, ModalFooter, ModalBody, ModalCloseButton, ModalHeader, ModalContent, ModalOverlay, Modal } from "@chakra-ui/react";
import Link from "next/link";
import { GrAddCircle } from "react-icons/gr";
import { TiDelete } from "react-icons/ti";
import { addDoc, collection } from "firebase/firestore";
import { authentic, db, db2 ,storage} from "@/FIREBASE/clientApp";
import { push, ref, set } from "@firebase/database";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import SignUpForm2 from "@/components/inscription/SignUpForm2";
import axios from "axios";
import TransitionExample from "@/components/forgetPassword";
import { ref as _rf , uploadBytes, getDownloadURL } from 'firebase/storage';
import Head from "next/head";
import sha256 from 'crypto-js/sha256';
import CryptoJS from "crypto-js";


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

    //fin toggle select
    const [isOpenModal1, setIsOpenModal1] = useState(false);
    const toggleModal1 = () => setIsOpenModal1(!isOpenModal1);

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
  
    const [check,setCheck] = useState("none")

    const [selection, setSelection] = useState([{ id: "Textile" }]);
    const [fileInputsVisible, setFileInputsVisible] = useState([false]);
    var tab1 = 0;
    var tab2 = 0;
    var tab3 = 0;
    var checker=0;

    const [categorie, setCategorie] = useState([{ id: "Textile", prix: " " }]);
    const [image, setImage] = useState([{ file: " ", nom: "" }]);
    const [imageUri, setImageUri] = useState([{ link: [ ] ,collection: ""}]);
    const toast = useToast();

    const [inputGroups, setInputGroups] = useState([
        [
        { id: 1, value: "", title: "Description" },

        { id: 2, value: "", title: "Valeur(euros)" },

        { id: 3, value: "", title: "Poids(kg)" },
        ],
    ]);

    const Option = [
        { id: "Textile" },
        { id: "Aliment" },
        { id: "Ordinateur" },
        { id: "Appareil electronique" },
        { id: "Bijou" },
        { id: "Cosmetique" },
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
        });
        image.push({ file: "" });
        imageUri.push({ link: [ ] ,collection: ""})
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
        imageUri[groupId].link="";
        imageUri[groupId].collection="";
        fileInputsVisible[groupId]=false;
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
  
        const [{ value: month },,{ value: day },,{ value: year },,{ value: hour },,{ value: minute },,{ value: second }] = dateFormat.formatToParts(timestamp);
    
        // Créez la clé personnalisée en utilisant le timestamp formaté
        const formattedTimestamp = `${year}${day}${month}${hour}${minute}${second}`;
    
        return `DE${formattedTimestamp}`;
    }
    const makeDevis =async (param1, param2, param3,index, files) => {
        if(files != "undefined" && Object.keys(files).length>2){
            // console.log("dans le if")
            const storageRef = _rf(storage, `Devis/${email}/${files.name}`);
            
            const snapshot = await uploadBytes(storageRef, files);
            const downloadURL = await getDownloadURL(snapshot.ref);
            if (index> imageUri.length){
                console.log(index)
                const getInd=index-1
                imageUri[getInd].collection = `colis${index}`
                imageUri[getInd].link.push(downloadURL)
                console.log("imageUri", imageUri)
            }else{
                imageUri[index].collection = `colis${index}`
                imageUri[index].link.push(downloadURL)
                console.log("imageUri", imageUri)
            }
        }else{
            console.log("dans le else")
            if (
                poste.length == 5  &&
                (poste.slice(0, 2) == 91 ||
                poste.slice(0, 2) == 94 ||
                poste.slice(0, 2) == 93 ||
                poste.slice(0, 2) == 92 ||
                poste.slice(0, 2) == 78 ||
                poste.slice(0, 2) == 77 ||
                poste.slice(0, 2) == 75)
            ) {
            onAuthStateChanged(authentic, (user) => {
                if (!user) {
                    toggleModal1();
                } else {
                    const dat = new Date;
                
                    const year =dat.getUTCFullYear();
                    const day =dat.getUTCDate();
                    const month =dat.getUTCMonth()+1;
                    const hours =dat.getUTCHours();
                    const minutes =dat.getUTCMinutes();
                    const seconds =dat.getUTCSeconds();

                    const idDev = generateCustomKey();

                    
                    const hashDigest = sha256(idDev).toString(CryptoJS.enc.Hex);
                    
                    const hash = hashDigest.slice(0,3).toString()

                    set(ref(db2, `DevisPerso/${idDev}${hash}`), {
                        email: email,
                    
                        depart: dest,
                        CodePostalDepart: poste,
                        arrive: arriv,
                        moyen: "Aerien",
                        retrait_depot: radio2,
                        imageColis:imageUri,
                        ville: ville,
                        status: "En cours",
                    
                        
                        rue: rue,
                        partenaire: param1,
                        total: param2 * param3 + (param2 * param3 * 5) / 100,
                        produit: inputGroups,
                        categories: categorie,
                    }).then(async (response) => {
                    //  console.log(response.key)
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
                        "Nous nous excusons car nous ne pouvons donner suite a votre requête!!",
                    status: "error",
                    duration: 10000,
                    isClosable: true,
                });
            }
        }
    };
    const handleSelect = (groupId, e) => {
        setSelection(selection);
        selection[groupId] = { id: e };
    };

    useEffect(() => {
        setSelection(selection);
    }, [selection]);

    const handleFileUpload = async (index, files,emai) => {
        const storageRef = _rf(storage, `Devis/${emai}/${files.name}`);
        
        const snapshot = await uploadBytes(storageRef, files);
        const downloadURL = await getDownloadURL(snapshot.ref);
        if (index> imageUri.length){
            console.log(index)
            const getInd=index-1
            imageUri[getInd].collection = `colis${index}`
            imageUri[getInd].link.push(downloadURL)
            console.log("imageUri", imageUri)
        }else{
            imageUri[index].collection = `colis${index}`
            imageUri[index].link.push(downloadURL)
            console.log("imageUri", imageUri)
        }
        // console.log(downloadURL)
        
        // // Sauvegarder le lien dans Firestore
        // const collectionRef = collection(db, 'Devis/');
        // const newImageRef = doc(collectionRef);

        // await addDoc(newImageRef, { imageUrl: downloadURL });
        
        // Mettre à jour la valeur de l'input
        // const newSelectFields = [...selectFields];
        // newSelectFields[index] = downloadURL;
        // setSelectFields(newSelectFields);
        
    };


    const Tester = (data,index)=>{
        console.log(data)
        const donnee = data.file;
        const name = data.nom;
    
        for (let i =0; i<donnee.length;i++){
        console.log(donnee[i])
        makeDevis(0,0,0,index,donnee[i])
        }
        console.log(typeof(donnee))
        // donnee.forEach((dat)=>{
        //   console.log(dat)
        // })
    }

    ////Functions du bouton envoyer des maintenant
    const LaunchAll=()=>{
        {inputGroups.map((group, groupId) => {
            {
            checker = checker + parseFloat(group[2].value);
            }
        })}
        if( checker >0){
            onOpen();
            image.map((data,index)=>{Tester(data,index)});
        
        }
        else{
            alert("merci de bien vouloir renseigner le poids de chaque article")
            
        }
    }

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
            
            <main >
                <div>
                    <div className="flex gap-4 mt-4 max-[1390px]:flex-col max-[1390px]:min-w-[22rem] max-[1390px]:items-center max-[680px]:flex-col max-[680px]:items-center">
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-col">
                                <label className="font-bold">Email :</label>
                                <input className="min-w-[22rem] max-[680px]:w-[10rem] max-[1390px]:w-[10rem]  p-1 rounded-sm border border-cyan-800 placeholder-gray-800" placeholder="Email" onChange={(e) => setEmail(e.target.value)} width={"100%"}/>
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
                                <select className="min-w-[22rem] p-2 bg-white border border-cyan-800 placeholder-gray-800 text-gray-800 text-md " placeholder="Pays" onChange={(e) => setDest(e.target.value)}>
                                    <option value={"France"}>France</option>
                                </select>
                            </div>
                        </div>
                        <div className="mt-4">
                            <span className="font-bold">À</span>
                            <div>
                                <select className="min-w-[22rem] p-2 bg-white border border-cyan-800 placeholder-gray-800 text-gray-800 text-md "  placeholder="Pays" onChange={(e) => setArriv(e.target.value)}>
                                    <option value={"Côte D'Ivoire"}>{CI}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 flex flex-col justify-center items-center gap-4">
                        <h2 className="font-bold text-2xl">Reception du colis par la structure : </h2>
                        <div className="flex justify-center items-center">
                            <RadioGroup className="flex gap-4" onChange={setRadio2} value={radio2}>
                                <Radio className="w-4 h-4 text-teal-600 bg-gray-100 border border-cyan-800 placeholder-gray-800 focus:ring-teal-500 dark:focus:ring-teal-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" value="En agence">Depot en agence</Radio>
                                <Radio className="w-4 h-4 text-teal-600 bg-gray-100 border border-cyan-800 placeholder-gray-800 focus:ring-teal-500 dark:focus:ring-teal-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" value="Retrait à domicile">Retrait a domicile</Radio>
                            </RadioGroup>
                        </div>
                    </div>
                </div>
                
                <h2 className="text-cyan-800 font-bold text-center mt-4 text-xl">Informations Colis</h2>

                {inputGroups.map((group, groupId) => (
                    <>
                        {" "}
                        <div className="flex flex-col justify-center items-center gap-2 mt-4 max-[1390px]:flex-col max-[1390px]:min-w-[22rem] max-[1390px]:items-center max-[680px]:flex-col max-[680px]:items-center">
                            <div className="flex justify-center items-center ">
                                <select className="p-2 -mb-4 rounded-sm border border-cyan-800 placeholder-gray-800 bg-white text-black text-md "
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
                                    <input type="file" multiple accept="image/*" onChange={(e) => { image[groupId].file = e.target.files; image[groupId].nom = `colis${groupId}`}}/>
                                )}
                            </div>
                            <div className="flex justify-center items-center gap-2 mt-4 max-[680px]:flex-col">{/* */}
                                {group.map((field) => (
                                    <div key={field.id}>
                                        {field.id == 1 ? (
                                            <input className="p-1 border border-cyan-800 placeholder-gray-800" 
                                                as={"textarea"}
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
                                ))}
                            </div>

                            <div className="-mb-4">
                                {groupId === 0 ? (
                                    <GrAddCircle className="border border-cyan-800 placeholder-gray-800 bg-white h-8 w-10"  onClick={handleAddGroup} />
                                    ) : (
                                    <TiDelete className="border border-cyan-800 placeholder-gray-800 bg-white h-8 w-10"  onClick={() => handleRemoveGroup(groupId)} />
                                )}
                            </div>
                        </div>
                    </>
                ))}
            </main>
            
            <button className="bg-cyan-800 px-4 py-2 mt-8 rounded-sm text-white font-bold hover:bg-teal-800" isDisabled={ email.length < 10 || dest.length < 4 || radio2.length < 3  } onClick={()=>{ LaunchAll() }}>Envoyer</button>



            {/* information sur les differents fournisseurs et leur jour de livraison */}
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
                    {/* 1277, 768 */}
                    <DrawerBody>
                        <div className="container mx-auto flex flex-col gap-4">
                            <div className="min-w-full flex justify-between rounded-md shadow-[0_15px_60px_-15px_rgba(0,0,0,0.3)]">
                                <div className="w-full flex justify-evenly max-[768px]: max-[768px]:flex-col max-[768px]:p-2">
                                    <div className="flex justify-between items-center">
                                        <div className="flex flex-col py-4 px-12 gap-4 bg-orange-600 rounded-tl-lg max-[768px]:p2 max-[768px]:flex-row max-[768px]: max-[768px]:rounded-br-xl">
                                            <div className="flex flex-col justify-center items-start text-white max-[768px]:flex-row">
                                                <strong className="text-[3rem] max-[768px]:text-xl max-[768px]:-mt-1">2</strong>
                                                <small className="font-bold max-[768px]:ml-2">Jours</small>
                                            </div>
                                            <span className="text-white font-bold text-[0.8rem] -mt-4 max-[768px]:-mt-0">Estimés</span>
                                        </div>
                                        <div className="flex flex-col justify-center items-center gap-2 mr-10 ml-10 max-[768px]:ml-0 max-[768px]:mr-4 max-[768px]:mt-4">
                                            <Image className="w-40 max-[768px]:w-20" src="airplane.jpg" alt={"image Avion"}/>
                                            <h2 className="">CICV</h2>
                                        </div>
                                    </div>
                                    <div className="w-full flex justify-between items-center">
                                        <div className="flex flex-col gap-2">
                                            <span className="font-bold">Date de retrait estimée</span>
                                            <span>{dateDep}</span>
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <span className="font-bold">Date de départ estimée</span>
                                            <span>{dateDep}</span>
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <span className="font-bold">Date de livraison estimée{" "}</span>
                                            <span>{dateExp3}{" "}</span>
                                        </div>

                                        <div className="">
                                            {" "}
                                            {inputGroups.map((group, groupId) => {
                                                {
                                                tab1 = tab1 + parseFloat(group[2].value);
                                                }
                                            })}
                                            <div className="flex flex-col gap-2 p-4 ">{/*bg-cyan-800 text-white rounded-md py-2 px-8 flex flex-col gap-2 p-4 flex justify-end text-red-600 text-2xl */}
                                                <h2 className="flex justify-end text-red-600 text-2xl max-[768px]:text-xl max-[768px]:text-center">{parseFloat(tab1) * 13 + (parseFloat(tab1) * 13 * 5) / 100}€</h2>
                                                <button className="bg-cyan-800 text-white rounded-md py-2 px-8 max-[768px]:p-2" onClick={() => { makeDevis("CICV", tab1, 13,0,"undefined")}}>Choisir</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="min-w-full flex justify-between rounded-md shadow-[0_15px_60px_-15px_rgba(0,0,0,0.3)]">
                                <div className="w-full flex justify-evenly max-[768px]: max-[768px]:flex-col max-[768px]:p-2">
                                    <div className="flex justify-between items-center">
                                        <div className="flex flex-col py-4 px-12 gap-4 bg-orange-600 rounded-tl-lg max-[768px]:p2 max-[768px]:flex-row max-[768px]: max-[768px]:rounded-br-xl">
                                            <div className="flex flex-col justify-center items-start text-white max-[768px]:flex-row">
                                                <strong className="text-[3rem] max-[768px]:text-xl max-[768px]:-mt-1">2</strong>
                                                <small className="font-bold max-[768px]:ml-2">Jours</small>
                                            </div>
                                            <span className="text-white font-bold text-[0.8rem] -mt-4 max-[768px]:-mt-0">Estimés</span>
                                        </div>
                                        <div className="flex flex-col justify-center items-center gap-2 mr-10 ml-10 max-[768px]:ml-0  max-[768px]:mr-4 max-[768px]:mt-4">
                                            <Image className="w-40 max-[768px]:w-20" src="airplane.jpg" alt={"image Avion"}/>
                                            <h2 className="">BAMBA BAGAGE</h2>
                                        </div>
                                    </div>
                                    <div className="w-full flex justify-between items-center">
                                        <div className="flex flex-col gap-2">
                                            <span className="font-bold">Date de retrait estimée</span>
                                            <span>{dateDep}</span>
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <span className="font-bold">Date de départ estimée</span>
                                            <span>{dateDep}</span>
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <span className="font-bold">Date de livraison estimée{" "}</span>
                                            <span>{dateExp3}{" "}</span>
                                        </div>

                                        <div className="">
                                            {" "}
                                            {inputGroups.map((group, groupId) => {
                                                {
                                                tab1 = tab1 + parseFloat(group[2].value);
                                                }
                                            })}
                                            <div className="flex flex-col gap-2 p-4 ">
                                                <h2 className="flex justify-end text-red-600 text-2xl max-[768px]:text-xl max-[768px]:text-center">{parseFloat(tab1) * 13 + (parseFloat(tab1) * 13 * 5) / 100}€</h2>
                                                <button className="bg-cyan-800 text-white rounded-md py-2 px-8 max-[768px]:p-2" onClick={() => { makeDevis("CICV", tab1, 13,0,"undefined")}}>Choisir</button>
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
                                                <strong className="text-[3rem] max-[768px]:text-xl max-[768px]:-mt-1">3</strong>
                                                <small className="font-bold max-[768px]:ml-2">Semaines</small>
                                            </div>
                                            <span className="text-white font-bold text-[0.8rem] -mt-4 max-[768px]:-mt-0">Estimés</span>
                                        </div>
                                        <div className="flex flex-col justify-center items-center gap-2 mr-10 ml-10 max-[768px]:ml-0 max-[768px]:mr-4 max-[768px]:mt-4">
                                            <Image className="w-40 max-[768px]:w-20" src="airplane.jpg" alt={"image Avion"}/>
                                            <h2 className="">CHAP</h2>
                                        </div>
                                    </div>
                                    <div className="w-full flex justify-between items-center">
                                        <div className="flex flex-col gap-2">
                                            <span className="font-bold">Date de retrait estimée</span>
                                            <span>{dateDep}</span>
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <span className="font-bold">Date de départ estimée</span>
                                            <span>{dateDep}</span>
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <span className="font-bold">Date de livraison estimée{" "}</span>
                                            <span>{dateExp3}{" "}</span>
                                        </div>

                                        <div className="">
                                            {" "}
                                            {inputGroups.map((group, groupId) => {
                                                {
                                                tab1 = tab1 + parseFloat(group[2].value);
                                                }
                                            })}
                                            <div className="flex flex-col gap-2 p-4 ">
                                                <h2 className="flex justify-end text-red-600 text-2xl max-[768px]:text-xl max-[768px]:text-center">{parseFloat(tab1) * 13 + (parseFloat(tab1) * 13 * 5) / 100}€</h2>
                                                <button className="bg-cyan-800 text-white rounded-md py-2 px-8 max-[768px]:p-2" onClick={() => { makeDevis("CICV", tab1, 13,0,"undefined")}}>Choisir</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
            <Modal isCentered isOpen={isOpenModal1} onClose={toggleModal1} size={"xl"}>
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
            </Modal>
        </ChakraProvider>
    );
}

export default MyComponent;