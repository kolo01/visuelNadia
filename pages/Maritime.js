import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";

import { useDisclosure, MenuList, MenuItem } from "@chakra-ui/react";

import { useMediaQuery } from "@chakra-ui/react";
import { useToast, useBoolean } from "@chakra-ui/react";
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
import Link from "next/link";

function Maritime() {

    const date = new Date();
    const dateDep = date.toLocaleDateString();
    const date2 = new Date();
    const dateExp = date2.setDate(date2.getDate() + 31);
    const dateExp2 = new Date(dateExp);
    const dateExp3 = dateExp2.toLocaleDateString();

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
    };

    const loginUSer = async () => {
        await signInWithEmailAndPassword(authentic, email2, password)
        .then((userCredential) => {
            getTime();
            if (userCredential.user.emailVerified) {
            setEmail(userCredential.user.email);
            sessionStorage.setItem("email", userCredential.user.email);
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
            const errorCode = error.code;
            const errorMessage = error.message;
            if (errorMessage == "Firebase: Error (auth/user-not-found).") {
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
                }
            }
            }
        });
    };

    const isError = email2 === "";
    const [interup, setInterup] = useState(false);

    const [isOpenModal1, setIsOpenModal1] = useState(false);
    const toggleModal1 = () => setIsOpenModal1(!isOpenModal1);

    const router = useRouter();
    const CI = "Côte d'Ivoire";
    const toast = useToast();
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

    const handleAddGroup = (e) => {
        e.preventDefault()
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
        <>
            <div className="container mx-auto flex flex-col lg:flex-row justify-between">
                <div className="left flex-1 w-full lg:w-3/6 shadow-[0_0_12px_rgba(0,0,0,0.2)]">
                    <form className="bg-white p-10">
                        <div className="">
                            <div className="">
                                <div className="flex flex-col self-start lg:flex-row">
                                    <div className="mb-4 lg:mb-0">
                                        <label className="uppercase text-sm" htmlFor="">Email</label>
                                        <input type="text" onChange={(e) => setEmail(e.target.value)} placeholder="Votre adresse email" className="sm:text-sm w-full lg:w-[21rem] border border-slate-800 p-3 rounded-sm"/>
                                    </div>
                                    <div className="lg:ml-4">
                                        <label className="uppercase text-sm" htmlFor="">Code Postal</label>
                                        <input type="text" onChange={(e) => { setPoste(e.target.value); }} placeholder="Code postal ou ville" className="sm:text-sm w-full lg:w-[21rem] border border-slate-800 p-3 rounded-sm"/>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10">
                                <div className="flex flex-col self-start lg:flex-row justify-between">
                                    <div className="mb-4 lg:mb-0">
                                        <label className="uppercase text-sm" htmlFor="">Adresse</label>
                                        <input type="text" onChange={(e) => { setRue(e.target.value); }}placeholder="Votre adresse" className="sm:text-sm w-full lg:w-[21rem] border border-slate-800 p-3 rounded-sm"/>
                                    </div>
                                    <div className="">
                                        <label className="uppercase text-sm" htmlFor="">Ville</label>
                                        <input type="text" onChange={(e) => { setVille(e.target.value); }} placeholder="Ville ou code postal" className="sm:text-sm w-full lg:w-[21rem] border border-slate-800 p-3 rounded-sm"/>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10">
                                <span className="text-sm">DE</span>
                                <div className="flex justify-between">
                                    <select  placeholder="Pays" onChange={(e) => setDest(e.target.value)} className="w-full p-3 focus:outline-none bg-zinc-100">
                                        <option value={"France"}>France</option>
                                        <option value={"Côte d'Ivoire"}>Côte d'Ivoire</option>
                                    </select>
                                </div>
                            </div>
                            <div className="mt-10">
                                <span className="text-sm">À</span>
                                <div className="flex justify-between">
                                    <select placeholder="Pays" onChange={(e) => setArriv(e.target.value)} className="w-full p-3 focus:outline-none bg-zinc-100">
                                        <option value={"Côte D'Ivoire"}>Côte d'Ivoire</option>
                                        <option value={"France"}>France</option>
                                    </select>
                                </div>
                            </div>
                            <div className="mt-10">
                                <h2 className="text-2xl text-center font-bold">Reception du colis par la structure</h2>
                                <div className="mt-6 mb-6" onChange={setRadio2} value={radio2}>
                                    <ul class="flex flex-col lg:flex-row justify-between items-center w-full text-sm font-medium text-gray-900 bg-white border 
                                        rounded-sm sm:flex dark:text-white gap-4 lg:gap-0">
                                        <li class="w-full border border-gray-600">
                                            <div class="flex items-center ps-3">
                                                <input id="horizontal-list-radio-license" type="radio" value="En agence" name="list-radio" class="w-4 h-4 text-cyan-800 bg-gray-100 border-gray-300 focus:ring-cyan-800 dark:focus:ring-cyantext-cyan-800 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                                <label for="horizontal-list-radio-license" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-800">Dépôt en agence</label>
                                            </div>
                                        </li>
                                        <li class="w-full border border-gray-600">
                                            <div class="flex items-center ps-3">
                                                <input id="horizontal-list-radio-id" type="radio" value="Retrait à domicile" name="list-radio" class="w-4 h-4 text-cyan-800 bg-gray-100 border-gray-300 focus:ring-cyan-800 dark:focus:ring-cyantext-cyan-800 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                                <label for="horizontal-list-radio-id" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-800">Retrait à domicile</label>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <span className="text-sm">COLIS</span>
                                {inputGroups.map((group, groupId) => (
                                    <div  className="mb-6">
                                        <div className="flex flex-col lg:flex-row justify-between gap-4 lg:gap-0">
                                            <textarea name="" id="" placeholder="Description ici..." cols="30" rows="3" className="sm:text-sm py-2 pl-4 border border-slate-800"></textarea>
                                            <select name="" id="" className="w-full lg:w-[20rem] p-3 focus:outline-none border border-slate-800 bg-zinc-100">
                                                <option value="">Carton 200 L</option>
                                                <option value="">Carton 200 L</option>
                                                <option value="">Carton 200 L</option>
                                            </select>
                                            <input type="text" placeholder="Valeur en euro" className="w-full lg:w-[20rem] p-2 border placeholder:text-slate-400 block bg-white border-slate-800 rounded-sm py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-cyan-800 focus:ring-cyan-800 focus:ring-1 sm:text-sm"/>
                                            <button className="rounded-md text-cyan-800">
                                                <div className="">
                                                    {groupId === 0 ? (
                                                        <FontAwesomeIcon onClick={handleAddGroup} className="size-8 ml-2" icon={faPlusCircle}/>
                                                    ) : (
                                                        <FontAwesomeIcon onClick={() => handleRemoveGroup(groupId)} className="size-8 ml-2" icon={faMinusCircle}/>
                                                    )}
                                                </div>
                                            </button>
                                        </div>
                                        <div className="flex flex-col lg:flex-row justify-between items-center">
                                            <div className="flex flex-col justify-between lg:flex-row mt-6 w-full gap-4 lg:gap-0">
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <Link href={"/QuoteConfirmationMaritime"}>
                            <button 
                            // isDisabled={email.length < 10 || dest.length < 4 || radio2.length < 3}
                            // onClick={() => {
                            // LaunchAll();
                            // }} 
                            className="w-full bg-cyan-800 text-white font-bold p-2 rounded-md mt-20">Envoyez dès maintenant</button>
                        </Link>
                    </form>
                </div>
                <div className="right bg-orange-100 flex-1 w-full lg:w-3/6">
                    <div className="flex flex-col p-10">
                        <h2 className="text-2xl lg:text-6xl font-bold">Comparer différents transporteur et faites des économies avec CHAP.</h2>
                        <p className="text-sm lg:text-lg mt-10">
                            Envoyez vos colis vers vers l'Afrique de l'ouest par nos partenaires. Remplissez le formulaire et 
                            attendez notre retour mail si vous ne possédez pas un CHAP, sinon vérifiez l'onglet devis de votre compte. 
                            Un fois reçu les différentes propositions de nos partenaires, vous pourrez choisir, payer et préparer le colis 
                            pour le transporteur.
                        </p>
                        <div className="lg:-mt-20">
                            <img className="w-[36rem]" src="./images/livraison.png" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Maritime