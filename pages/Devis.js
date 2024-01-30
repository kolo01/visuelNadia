import { Box, Flex, Center, Heading, Text, Image, Input, Button, InputGroup, InputRightElement, Select, SimpleGrid, useToast, Checkbox, Stack, RadioGroup, Radio } from "@chakra-ui/react";
import InputBar from "@/components/InputBar";
import Navbar from "@/components/Navbar";
import { useState } from "react";
import { addDoc, collection, doc, getFirestore, setDoc } from "firebase/firestore";
import { app, db } from "@/FIREBASE/clientApp";
import MyComponent from "./Aerien";
import MyComponent2 from "./Maritime";
import { BsFillArrowDownCircleFill } from "react-icons/bs";
import Head from "next/head";

export default function Devis() {
    const [email, setEmail] = useState("");
    const [numero, setNumero] = useState("");
    const [dest, setDest] = useState("");
    const [codeDest, setCodeDest] = useState("");
    const [arriv, setArriv] = useState("");
    const [codeArriv, setCodeArriv] = useState("");
    
    const [valeur, setValeur] = useState("");

    const toast = useToast();

    const [checkedItems, setCheckedItems] = useState([false, false, false]);

    const allChecked = checkedItems.every(Boolean);
    const isIndeterminate = checkedItems.some(Boolean) && !allChecked;
    const [radio1, setRadio1] = useState("Aerien");
    const [radio2, setRadio2] = useState("");

    const [hidden1, setHidden1] = useState("none");
    const [hidden2, setHidden2] = useState("none");

    const makeDevis = async () => {
        await addDoc(collection(db, "DevisPerso"), { email, numero, dest, codeDest, arriv, codeArriv, poids, longueur, largeur, hauteur, details, valeur, }).then(() => {
        toast({
            title: "Devis envoyé",
            description: "Nous vous contacterons!!",
            status: "success",
            duration: 10000,
            isClosable: true,
        });
        });
    };

    const envoi = "Type d'envoi :";
    const CI = "Côte d'Ivoire";
    const slog = "Comparer différents transporteur et faites des économies avec CHAP  ";
    const slog1 = "Envoyez vos colis vers l'Afrique de l'ouest par nos partenaires. Remplissez le formulaire et attendez notre retour mail si vous ne possédez pas un CHAP, sinon vérifiez l'onglet devis de votre compte. Un fois reçu les différentes propositions de nos partenaires, vous pourrez choisir, payer et préparer le colis pour le transporteur.";
    return (
        <>
            {/* <Head className = "bg-yellow-400">
                <script async src="https://www.googletagmanager.com/gtag/js?id=G-RFSVQTGJ87" ></script>
                <script strategy="lazyOnload">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments)}
                        gtag('js', new Date()); 
                        gtag('config', 'G-RFSVQTGJ87');
                    `}
                </script>
            </Head> */}
            <InputBar />
            <Navbar/>

            <div className="min-w-full flex flex-col shadow-2xl shadow-black">
                <h1 className="text-3xl text-center mt-8 font-bold">Envoyer votre colis maintenant</h1>

                <div className="container mx-auto flex gap-4 max-[1390px]:flex-col max-[1390px]:items-center max-[1390px]:justify-center">
                    <div className="left min-w-[60%] max-[1390px]:w-full "> {/**/}
                        <div className="flex flex-col justify-center items-center p-8">{/* bg-orange-500*/}
                            <div>
                                {/* <div>
                                    <BsFillArrowDownCircleFill/>
                                </div> */}
                            </div>
                            <div className="flex flex-col justify-center items-center mt-4 p-4">
                                <div className="flex justify-center items-center gap-4">
                                    <h2 className="text-xl font-semibold">Moyen de transport : </h2>
                                    <RadioGroup onChange={setRadio1} value={radio1}>
                                        <Radio className="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 focus:ring-teal-500 dark:focus:ring-teal-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" value="Aerien" mr={10}>Aérien</Radio>
                                        <Radio className="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 focus:ring-teal-500 dark:focus:ring-teal-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" value="Maritime">Maritime</Radio>
                                    </RadioGroup>
                                </div>
                                {radio1 == "Maritime" ? <MyComponent2/> : <></>}
                                {radio1 == "Aerien" ? <MyComponent/> : <></>}
                            </div>
                        </div>
                    </div>

                    <div className="right min-w-[40%] max-[1390px]:w-full flex justify-start items-start max-[1390px]:flex-col max-[1390px]:min-w-[22rem] max-[1390px]:items-center max-[680px]:flex-col max-[680px]:items-center">
                        <div className="min-w-[34rem] flex flex-col justify-center items-center p-8 gap-8 max-[680px]:mt-0 max-[1390px]:gap-0 max-[680px]:gap-0 max-[1390px]:flex-col max-[1390px]:min-w-[22rem] max-[1390px]:items-center max-[680px]:flex-col max-[680px]:items-center">
                            <Image src="./Devis2.png" alt="image livraison" className="h-44 mt-4 max-[680px]:mt-0"/>{/* */}
                            <p className="text-cyan-800 font-bold text-xl text-center max-[680px]:text-[1rem]">{slog}</p>
                        </div>
                    </div>
                </div>
                <footer className="bg-cyan-800 flex justify-center items-center p-8">{/* fixed bottom-0*/}
                    <h2 className="text-white text-center text-xl max-[680px]:text-[1rem]">{slog1}</h2>
                </footer>
            </div>
        </>
    );
}
