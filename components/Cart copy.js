import { Box, Center, Flex, Text, Image, Button, Input, Heading, Icon, SimpleGrid, useToast, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, InputGroup, FormControl, FormLabel, Tabs, TabList, Tab, TabPanels, TabPanel, Radio, RadioGroup, Stack, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Code, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import FooterR from "./footerResponsif";
import { useRouter } from "next/router";
import { FaTrashAlt } from "react-icons/fa";
import { ref as rf, set, push,serverTimestamp } from "@firebase/database";
import { db, db2 } from "@/FIREBASE/clientApp";
import { PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import { BsCashCoin, BsPaypal } from "react-icons/bs";
import secureLocalStorage from "react-secure-storage";
import { collection, deleteDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { getCartsByUserId } from "./getcart";
import {usePathname} from 'next/navigation'
import sha256 from 'crypto-js/sha256';
import CryptoJS from "crypto-js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faPhone, faCity, faRoad, faArrowRightToCity, faArrowUp19, faMailBulk } from '@fortawesome/free-solid-svg-icons'

/**COPIE */

export default function Carte() {
    const toast = useToast();
    const router = useRouter();

    ///Variable d'affichage
    const [sect1, setSect1] = useState("none");
    const [sect2, setSect2] = useState("none");
    const [sect4, setSect4] = useState("none");
    const [sect3, setSect3] = useState("none");

    //fin

    ///// variable du drawner
    const [moyen, setMoyen] = useState("");
    
    const [day, setDay] = useState("");
    const [hours, setHours] = useState("");
    const [way, setWay] = useState("");
    // const [lieu,setLieu]= useState("")
    const [rue, setRue] = useState("NON DEFINI");
    const [postal, setPostal] = useState("NON DEFINI");
    const [ville, setVille] = useState("non renseigner");
    const [batiment, setBatiment] = useState("NON DEFINI");

    ////fin
    const [email,setEmail] = useState("")
    const [cart, setCart] = useState([]);
    const [lieu, setLieu] = useState(" NON DEFINI");
    const [numero, setNumero] = useState("NON DEFINI ");
    const [nom, setNom] = useState(" NON DEFINI");
    const [prix, setPrix] = useState();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const path =usePathname()
    

    const [frais, setFrais] = useState();
    const [dis, setDis] = useState();
    const [month2, setMonth2] = useState("");
    const [day2, setDay2] = useState("");

    ////ACCESS AU PANIER
    const getCart2 = async (email)=>{
        try {
            const cartRef = collection(db, 'orders'); // Assurez-vous que la collection est correcte.
            const q = query(cartRef, where('email', '==', email));
        
            const querySnapshot = await getDocs(q);
            if (querySnapshot.size >= 1) {
                const cartDoc = querySnapshot.docs;
                const po = secureLocalStorage.getItem("po")
                // console.log("po",po)
                let PrixT = 0;
                
                const All = cartDoc;
            
                
                if (All != null) {
                    All.map((data, index) => {
                        PrixT = parseFloat(data.data().orderPrice) + PrixT;
                    });
                    setPrix(PrixT);
                    }
                    if (PrixT <= 30) {
                        setDis("grid");
                        (po.slice(0, 2) == 91 ||
                        po.slice(0, 2) == 94 ||
                        po.slice(0, 2) == 93 ||
                        po.slice(0, 2) == 92 ||
                        po.slice(0, 2) == 78 ||
                        po.slice(0, 2) == 77 ||
                        po.slice(0, 2) == 75) ?setFrais("2.99") : setFrais("5.99");
                
                    } else {
                        setDis("grid");
                        if (PrixT < 40 && PrixT > 29) {
                            setFrais((PrixT * 10) / 100);
                        }   
                        else {
                            if (PrixT < 51) {
                                setFrais((PrixT * 9) / 100);
                            } else {
                                if (PrixT < 71) {
                                    setFrais((PrixT * 8) / 100);
                                } else {
                                    if (PrixT < 81) {
                                        setFrais((PrixT * 7) / 100);
                                    } else {
                                        if (PrixT < 91) {
                                            setFrais((PrixT * 6) / 100);
                                        } else {
                                            if (90 < PrixT) {
                                                setFrais((PrixT * 5) / 100);
                                            }
                                        }
                                    }
                                }    
                            }
                        }
                                
                                
                            
                    }
            
                secureLocalStorage.setItem("prix", PrixT);
            
                return cartDoc;
            } else {
                return null; // Aucun panier trouvé pour cet utilisateur.
            }
        } catch (error) {
            console.error("Erreur lors de la récupération du panier :", error);
            return null;
        }
    }

    const DeleteProduct = async (product)=>{
        try{
            const cartRef = collection(db, 'orders'); // Supposons que la collection se nomme 'carts'.
            const q = query(cartRef, where('email', '==', email),where("productId", '==' , product));
            const querySnapshot = await getDocs(q);
            const cartDoc = querySnapshot.docs[0]; 
            await deleteDoc(cartDoc.ref)
            router.replace(path)
        }catch(error){
            toast({
                title: "Veuillez reesayer!!!",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
        }
    
    }

    const DeleteAll = async ()=>{
        try{
            console.log(email)
            const cartRef = collection(db, 'orders'); // Supposons que la collection se nomme 'carts'.
            const q = query(cartRef, where('email', '==', email));
            const querySnapshot = await getDocs(q);
            const size = querySnapshot.size
            querySnapshot.docs.map(async (data,index)=>{
                await deleteDoc(data.ref)
            })
            // const cartDoc = querySnapshot.docs[0]; 
            toast({
                title: "Merci pour votre confiance!!!",

                status: "success",
                duration: 9000,
                isClosable: true,
            });
            router.replace(path)
        }catch(error){
            toast({
                title: "Veuillez reesayer!!!",

                status: "error",
                duration: 9000,
                isClosable: true,
            });
        }
    }

    const Increment = async (product)=>{
        try{
            const cartRef = collection(db, 'orders'); // Supposons que la collection se nomme 'carts'.
            const q = query(cartRef, where('email', '==', email),where("productId", '==' , product));
            const querySnapshot = await getDocs(q);
            const cartDoc = querySnapshot.docs[0]; 
            await updateDoc(cartDoc.ref,{orderQte:querySnapshot.docs[0].data().orderQte+1})
            router.replace(path)
        }catch(error){
            toast({
                title: "Veuillez reesayer!!!",

                status: "error",
                duration: 9000,
                isClosable: true,
            });
        }
    }

    const Decrement = async (product)=>{
        try{
            const cartRef = collection(db, 'orders'); // Supposons que la collection se nomme 'carts'.
            const q = query(cartRef, where('email', '==', email),where("productId", '==' , product));
            const querySnapshot = await getDocs(q);
            const cartDoc = querySnapshot.docs[0]; 
            if(querySnapshot.docs[0].data().orderQte<2){
                await DeleteProduct(product)
            }else{
                await updateDoc(cartDoc.ref,{orderQte:querySnapshot.docs[0].data().orderQte-1})
            }

            router.replace(path)
        }catch(error){
            toast({
                title: "Veuillez reesayer!!!",

                status: "error",
                duration: 9000,
                isClosable: true,
            });
        }
    }
    const [ref,setRef] = useState([])

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

        return `CO${formattedTimestamp}`;
    }

    useEffect(() => {
    
        setEmail(sessionStorage.getItem("email"))
    
        getCartsByUserId(email).then((userCarts) => {
        
            if (userCarts.length > 0) {
                setCart(userCarts);
                const po = secureLocalStorage.getItem("po")
                // console.log("po",po)
                let PrixT = 0;
                
                const All = userCarts;

            
                if (All != null) {
                    All.map((data, index) => {
                        PrixT = (parseFloat(data.orderPrice)* data.orderQte )+ PrixT;
                    });
                    setPrix(PrixT);
                }
                if (PrixT <= 30) {
                    setDis("grid");
                    (po.slice(0, 2) == 91 ||
                    po.slice(0, 2) == 94 ||
                    po.slice(0, 2) == 93 ||
                    po.slice(0, 2) == 92 ||
                    po.slice(0, 2) == 78 ||
                    po.slice(0, 2) == 77 ||
                    po.slice(0, 2) == 75) ?setFrais("2.99") : setFrais("5.99");
                    
                } else {
                    setDis("grid");
                    if (PrixT < 40 && PrixT > 29) {
                        setFrais((PrixT * 10) / 100);
                    } else {
                        if (PrixT < 51) {
                            setFrais((PrixT * 9) / 100);
                        } else {
                            if (PrixT < 71) {
                                setFrais((PrixT * 8) / 100);
                            } else {
                                if (PrixT < 81) {
                                    setFrais((PrixT * 7) / 100);
                                } else {
                                    if (PrixT < 91) {
                                        setFrais((PrixT * 6) / 100);
                                    } else {
                                        if (90 < PrixT) {
                                            setFrais((PrixT * 5) / 100);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                secureLocalStorage.setItem("prix", PrixT);
            } else {
                // console.log("Aucun panier trouvé pour cet utilisateur.");
                setCart([])
            }
        });
        
    }, [email,cart]);
    if (cart != undefined && cart.length != 0){
        async function saveCommande3() {
        
        let email = sessionStorage.getItem("email");
        let Cart = cart;
        const dat = new Date;
        
        const year =dat.getUTCFullYear();
        const day =dat.getUTCDate();
        const month =dat.getUTCMonth()+1;
        const hours =dat.getUTCHours();
        const minutes =dat.getUTCMinutes();
        const seconds =dat.getUTCSeconds();

        const idCom = generateCustomKey();

        
        const hashDigest = sha256(idCom).toString(CryptoJS.enc.Hex);
        
        const hash = hashDigest.slice(0,3).toString()

        const dateCommande = `${day}/${month}/${year}`
        
            // Cart.map(async (data, index) => {
            //   push(rf(db2, "Commandes"), {
            //     productID: data.productId,
            //     payment: moyen,
            //     nom: data.orderName,
            //     livraison:way,
            
            //     quantite: data.quantity,
            //     imageUrl: data.orderImageUrl,
            //     organisation: data.orderOrganisation,
            //     Prix: data.orderPrice,
            //     initiateur: email,
            //     Status: "En Cours",
            //     ville: ville,
            //     rue: rue,
            //     code_postal: postal,
            //     batiment: batiment,
            //     lieu: lieu,
            //     receveur: nom,
            //     numero: numero,
            //     jour: day,
            //     moment: hours,
            //     date: new Date(),
            //   });
            
            // });
            
            set(rf(db2, `Commandes/${idCom}${hash}`), {
                cartlist:Cart,
                payment: moyen,
                commandeId:`${idCom}${hash}`,
                livraison:way,
                email,
                status: "En cours",
                ville: ville,
                rue: rue,
                code_postal: postal,
                batiment: batiment,
                lieu: lieu,
                receveur: nom,
                numero: numero,
                jour: day,
                moment: hours,
                dateCommande,
                subtotalPrice:`€${prix}`,
                totalPrice:`€${parseFloat(prix +parseFloat(frais)).toFixed(2)}`,
                createdAt: serverTimestamp()}
            );
            
        
            await axios
            .post("/api/sendmail", {
                adresse:lieu,
                email: email.toString(),
                paiement:moyen,
                
                product:Cart,
            })
            .then((response) => {
                toast({
                    title: "SUCCES",
                    description: `merci pour la confiance`,
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                });
            })
            .catch((error)=>{});
            await  DeleteAll()
                setLieu("");
                setNom("");
                setNumero("");
                // router.reload();
            }
        
        return (
            <>
                <div>
                    <div>
                        <div>
                            {cart.map((data, index) => (
                                <div key={data.productId}>
                                
                                    <div>
                                        <div>
                                            <div>
                                                <Box bgImage={data.orderImageUrl}/>{/* w="100px" h="100px" */}
                                                <div>
                                                    <span>{data.orderName}</span>
                                                    <span>{data.orderorganisation || data.orderOrganisation}</span>
                                                    <span> {data.orderPrice} €</span>
                                                    <div>
                                                        <div>
                                                            <button onClick={() => Decrement(data.productId)}>-</button>
                                                            <input type={"number"} value={data.orderQte}/>
                                                            <button onClick={() => Increment(data.productId)}>+</button>
                                                        </div>
                                                        <div>
                                                            <div>
                                                                <button onClick={() => DeleteProduct(data.productId )}> Supprimer</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Flex>
                            <Box>
                                <Box>
                                    <Text>Recapitulatif de la commande :</Text>
                                    <Text>Prix commande : {parseFloat(prix).toFixed(2)} €</Text>
                                    <Text>Frais de livraison : {parseFloat(frais).toFixed(2)} €</Text>
                                    
                                    <Flex >
                                    <Text> Total  : </Text>
                                    <Text> {parseFloat(prix +parseFloat(frais)).toFixed(2)} €</Text>
                                    </Flex>
                                </Box>
                                <Button onClick={onOpen}> Valider commande </Button>
                            </Box>

                                {/* TERMINEYYY */}
                            <Drawer onClose={onClose} isOpen={isOpen}>
                                <DrawerOverlay />
                                <DrawerContent>
                                    <DrawerCloseButton />
                                    <DrawerBody className="container mx-auto w-7/12 h-[32rem]" > {/**ICIII */}
                                        <div className="overflow-hidden min-h-[32rem] rounded-md p-8 flex flex-col justify-center items-center gap-4 shadow-lg md:p-8">
                                            <h1 className="text-3xl text-teal-900 font-bold mb-8">Validation de la commande</h1>
                                            <Box className="bg-slate-300 rounded-md shadow-lg flex flex-col justify-center items-center p-8 gap-4">
                                                <Text className="text-2xl font-bold mb-10"> {/**fontWeight={700} fontSize={20} */}
                                                    {" "}
                                                    Mode de paiement
                                                </Text>
                            
                                                <RadioGroup display={"flex"} onChange={setMoyen} value={moyen} onClick={() => { setSect1("flex"); }}>
                                                    <Radio mr={20} value="Especes">
                                                    <Flex>
                                                        <BsCashCoin fontSize={20} />
                                                        <Text ml={2}> Espèces</Text>
                                                    </Flex>
                                                    </Radio>
                                                    <Radio value="Paypal">
                                                    <Flex>
                                                        <BsPaypal fontSize={20} />
                                                        <Text ml={2}> Paypal</Text>
                                                    </Flex>
                                                    </Radio>
                                                </RadioGroup>
                                            </Box>
                                            <Box className="bg-white shadow-lg shadow-gray-300 rounded-md flex flex-col justify-center items-center p-4 gap-4 md:flex-col" >
                                                <Text className="text-2xl text-teal-800 mb-4 font-bold max-[780px]:text-center max-[780px]:mb-1">
                                                    Date de livraison
                                                </Text> 
                                                <Box>
                                                    <RadioGroup className="bg-orange-400 text-white rounded-md flex justify-between items-center p-4 text-xl max-[780px]:flex-col max-[780px]:items-start" onChange={setDay} value={day} onClick={() => setSect2("grid")} >
                                                        <Radio mr={20} value="Mercredi">
                                                            Mercredi{" "}
                                                        </Radio>
                                                        <Radio mr={20} value="Vendredi">
                                                            {" "}
                                                            Vendredi
                                                        </Radio>
                                                        <Radio mr={20} value="Samedi">
                                                            {" "}
                                                            Samedi
                                                        </Radio>
                                                    </RadioGroup>
                                                </Box>
                                                <Box className="bg-teal-100 rounded-md flex flex-col justify-center items-center gap-4 p-4">{/** ml={{base:0,md:10}} display={sect2} */}
                                                    <Text className="text-2xl text-teal-800 mb-4 font-bold">Heure de livraison</Text>
                                                    {day == "Samedi" ? (
                                                        <RadioGroup className="bg-green-700 text-white flex justify-center items-center gap-4 p-4"  onChange={setHours} value={hours} onClick={() => { setSect3("flex") }}>{/** display={["grid","grid","grid","flex","flex"]}  */}
                                                            <Radio value="Soir(13h-16h)">{/** mr={2} */}
                                                                Apres-Midi (de 13h ----- 16h)
                                                                </Radio>
                                                                <br />
                                                                <Radio value="Soir(16h-20h)">{/** mr={2} */}
                                                                Soir (de 16h ----- 20h)
                                                                </Radio>
                                                                <br />
                                                                <Radio value="Soir(20h-00h)">{/** mr={2} */}
                                                                Nuit (de 20h ----- 00h)
                                                            </Radio>            
                                                        </RadioGroup>
                                                    ) : (
                                                        <RadioGroup className="bg-pink-700 text-white flex justify-center items-center gap-4 p-4 max-[780px]:flex-col max-[780px]:justify-center max-[780px]:items-start max-[780px]:gap-1 max-[780px]:rounded-md max-[780px]:bg-white max-[780px]:shadow-lg max-[780px]:shadow-black max-[780px]:text-black" onChange={setHours} value={hours} onClick={() => { setSect3("flex") }}>{/**display={["grid","grid","grid","flex","flex"]}  */}
                                                            <Radio value="Matin">{/** mr={2} */}
                                                                Matin(de 09h30 ----- 12h)
                                                            </Radio>
                                                                <br />
                                                            <Radio value="Soir(13h-16h)">{/** mr={2} */}
                                                                Apres-Midi (de 13h ----- 16h)
                                                            </Radio>
                                                                <br />
                                                            <Radio value="Soir(16h-20h)">{/** mr={2} */}
                                                                Soir (de 16h ----- 20h)
                                                            </Radio>
                                                                <br />
                                                            <Radio value="Soir(20h-00h)">{/** mr={2} */}
                                                                Nuit (de 20h ----- 00h)
                                                            </Radio>
                                                        </RadioGroup>
                                                    )}
                                                </Box>
                                                </Box>
                                                <Box mb={10} className="flex flex-col justify-center items-center p-4 gap-4">{/**bg-orange-500  */}
                                                    <div className="bg-teal-800 rounded-md p-8 flex flex-col justify-center items-center gap-4 text-white">
                                                        <Text className="text-2xl font-bold mb-4 max-[780px]:text-center max-[780px]:mb-1">
                                                            {" "}
                                                            Adresse de livraison
                                                        </Text>
                                                        <Box display={sect3}>
                                                            <RadioGroup className="flex justify-between items-center max-[780px]:flex-col max-[780px]:gap-2 max-[780px]:items-start" onChange={setWay} value={way} onClick={() => { setSect4("grid") }}>{/** display={["grid","grid","grid","flex","flex"]}  */}
                                                                <Radio mr={5} value="me"  onClick={() => {setLieu(secureLocalStorage.getItem("addresse")), setNumero(secureLocalStorage.getItem("number")), setNom(secureLocalStorage.getItem("name"))}}>
                                                                    Utiliser mon Adresse
                                                                </Radio>
                                                                <Radio  ml={5} value="other" onClick={() => { setLieu(""), setNumero(""), setNom("");}}>
                                                                    Utiliser une autre adresse
                                                                </Radio>
                                                            </RadioGroup>
                                                        </Box> 
                                                    </div>
                                                    
                                                    {
                                                        way == "other" ?
                                                        <>
                                                            <Box className="w-full flex flex-col gap-2 mt-10 bg-teal-800 rounded-md shadow-lg shadow-black p-12">{/*width={"300px"}*/}
                                                                <FormControl className="flex flex-col justify-start items-center w-full">
                                                                    <FormLabel className="w-full text-white"><FontAwesomeIcon icon={faUser}/> Nom :  </FormLabel>
                                                                    <Input placeholder="Elloh" className="-ml-1 mb-2 w-96" onChange={(e) => setNom(e.target.value) }/>
                                                                </FormControl>
                                                                <FormControl className="flex flex-col justify-start items-center w-full">
                                                                    <FormLabel className="w-full text-white"><FontAwesomeIcon icon={faPhone}/>Numero :  </FormLabel>
                                                                    <Input placeholder="+33 00 00 00 00" className="-ml-1 mb-2 w-96" type="number" onChange={(e) =>setNumero(e.target.value)}/>
                                                                </FormControl>
                                                                <FormControl  className="flex flex-col justify-start items-center w-full">
                                                                    <FormLabel className="w-full text-white"><FontAwesomeIcon icon={faCity}/>Ville : </FormLabel>
                                                                    <Input placeholder="Massy" className="-ml-1 mb-2 w-96 border border-teal-800 " onChange={(e) => setVille(e.target.value) } />
                                                                </FormControl>
                                                                
                                                                <FormControl className="flex flex-col justify-start items-center w-full">
                                                                    <FormLabel className="w-full text-white"><FontAwesomeIcon icon={faRoad}/>Nom de la Rue : </FormLabel>
                                                                    <Input placeholder="Orly" className="-ml-1 mb-2 w-96" onChange={(e) => setRue(e.target.value) } />
                                                                </FormControl>
                                                                <FormControl className="flex flex-col justify-start items-center w-full">
                                                                    <FormLabel className="w-full text-white"><FontAwesomeIcon icon={faArrowUp19}/>Numero du batiment : </FormLabel>
                                                                    <Input placeholder="712" className="-ml-1 mb-2 w-96" type="number" onChange={(e) => setBatiment(e.target.value) } />
                                                                </FormControl>
                                                                <FormControl className="flex flex-col justify-start items-center w-full">
                                                                    <FormLabel className="w-full text-white"><FontAwesomeIcon icon={faMailBulk} />Code Postal : </FormLabel>
                                                                    <Input placeholder="AB 31 BP" className="-ml-1 mb-2 w-96" onChange={(e) => setPostal(e.target.value) } />
                                                                </FormControl>
                                                            </Box>
                                                        </>
                                                        :
                                                        <></>
                                                    }
                                                </Box>
                                                <Box className="bg-yellow-300">{  /*display={sect4} mb={20}*/}
                                                    {
                                                        moyen == "Paypal" ? <Box width={"300px"}> <PayPalButtons
                                                        createOrder={(data, actions) => {
                                                            return actions.order.create({
                                                                purchase_units: [
                                                                    {
                                                                        amount: {
                                                                            value: `${prix + frais}`,
                                                                        },
                                                                    },
                                                                ],
                                                            });
                                                        }}
                                                        onApprove={(data, actions) => {
                                                            return actions.order
                                                            .capture()
                                                            .then(async (details) => {
                                                                const name =
                                                                details.payer.name.given_name;
                                                                toast({
                                                                    title: "Achat effectué avec succès",
                                                                    description: `Merci ${name} pour votre achat!!! `,
                                                                    status: "success",
                                                                    duration: 9000,
                                                                    isClosable: true,
                                                                });
                                                                // secureLocalStorage.removeItem("Cart");
                                                                await DeleteAll()
                                                                // router.reload();
                                                            });
                                                        }}
                                                        />
                                                    </Box>
                                                    :
                                                    <Box className="">
                                                        <Button className="bg-white border border-teal-800 text-teal-800" onClick={()=>{ saveCommande3()}}>Confirmer achat</Button>{/** bgColor={"cyan.700"} py={2} px={5} color={"white"}  */}
                                                    </Box>
                                                }
                                            </Box>
                                        </div>
                                    </DrawerBody>
                                </DrawerContent>
                            </Drawer>
                        </Flex>
                    </div>
                </div>
                
                {/* <FooterR /> */}
            
            </>
        )
    }
    else {
        return (
            <>
                <div>
                    <div>
                        <h3>Votre panier est vide</h3>
                    </div>
                </div>
            </>
        );
    }
    
}


/**
 * ORIGINAL
 * 
 *  */
import { Box, Center, Flex, Text, Image, Button, Input, Heading, Icon, SimpleGrid, useToast, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, InputGroup, FormControl, FormLabel, Tabs, TabList, Tab, TabPanels, TabPanel, Radio, RadioGroup, Stack, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Code, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import FooterR from "./footerResponsif";
import { useRouter } from "next/router";
import { FaTrashAlt } from "react-icons/fa";
import { ref as rf, set, push,serverTimestamp } from "@firebase/database";
import { db, db2 } from "@/FIREBASE/clientApp";
import { PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import { BsCashCoin, BsPaypal } from "react-icons/bs";
import secureLocalStorage from "react-secure-storage";
import { collection, deleteDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { getCartsByUserId } from "./getcart";
import {usePathname} from 'next/navigation'
import sha256 from 'crypto-js/sha256';
import CryptoJS from "crypto-js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faPhone, faCity, faRoad, faArrowRightToCity, faArrowUp19, faMailBulk } from '@fortawesome/free-solid-svg-icons'



export default function Carte() {
    const toast = useToast();
    const router = useRouter();

    ///Variable d'affichage
    const [sect1, setSect1] = useState("none");
    const [sect2, setSect2] = useState("none");
    const [sect4, setSect4] = useState("none");
    const [sect3, setSect3] = useState("none");

    //fin

    ///// variable du drawner
    const [moyen, setMoyen] = useState("");
    
    const [day, setDay] = useState("");
    const [hours, setHours] = useState("");
    const [way, setWay] = useState("");
    // const [lieu,setLieu]= useState("")
    const [rue, setRue] = useState("NON DEFINI");
    const [postal, setPostal] = useState("NON DEFINI");
    const [ville, setVille] = useState("non renseigner");
    const [batiment, setBatiment] = useState("NON DEFINI");

    ////fin
    const [email,setEmail] = useState("")
    const [cart, setCart] = useState([]);
    const [lieu, setLieu] = useState(" NON DEFINI");
    const [numero, setNumero] = useState("NON DEFINI ");
    const [nom, setNom] = useState(" NON DEFINI");
    const [prix, setPrix] = useState();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const path =usePathname()
    

    const [frais, setFrais] = useState();
    const [dis, setDis] = useState();
    const [month2, setMonth2] = useState("");
    const [day2, setDay2] = useState("");

    ////ACCESS AU PANIER
    const getCart2 = async (email)=>{
        try {
            const cartRef = collection(db, 'orders'); // Assurez-vous que la collection est correcte.
            const q = query(cartRef, where('email', '==', email));
        
            const querySnapshot = await getDocs(q);
            if (querySnapshot.size >= 1) {
                const cartDoc = querySnapshot.docs;
                const po = secureLocalStorage.getItem("po")
                // console.log("po",po)
                let PrixT = 0;
                
                const All = cartDoc;
            
                
                if (All != null) {
                    All.map((data, index) => {
                        PrixT = parseFloat(data.data().orderPrice) + PrixT;
                    });
                    setPrix(PrixT);
                    }
                    if (PrixT <= 30) {
                        setDis("grid");
                        (po.slice(0, 2) == 91 ||
                        po.slice(0, 2) == 94 ||
                        po.slice(0, 2) == 93 ||
                        po.slice(0, 2) == 92 ||
                        po.slice(0, 2) == 78 ||
                        po.slice(0, 2) == 77 ||
                        po.slice(0, 2) == 75) ?setFrais("2.99") : setFrais("5.99");
                
                    } else {
                        setDis("grid");
                        if (PrixT < 40 && PrixT > 29) {
                            setFrais((PrixT * 10) / 100);
                        }   
                        else {
                            if (PrixT < 51) {
                                setFrais((PrixT * 9) / 100);
                            } else {
                                if (PrixT < 71) {
                                    setFrais((PrixT * 8) / 100);
                                } else {
                                    if (PrixT < 81) {
                                        setFrais((PrixT * 7) / 100);
                                    } else {
                                        if (PrixT < 91) {
                                            setFrais((PrixT * 6) / 100);
                                        } else {
                                            if (90 < PrixT) {
                                                setFrais((PrixT * 5) / 100);
                                            }
                                        }
                                    }
                                }    
                            }
                        }
                                
                                
                            
                    }
            
                secureLocalStorage.setItem("prix", PrixT);
            
                return cartDoc;
            } else {
                return null; // Aucun panier trouvé pour cet utilisateur.
            }
        } catch (error) {
            console.error("Erreur lors de la récupération du panier :", error);
            return null;
        }
    }

    const DeleteProduct = async (product)=>{
        try{
            const cartRef = collection(db, 'orders'); // Supposons que la collection se nomme 'carts'.
            const q = query(cartRef, where('email', '==', email),where("productId", '==' , product));
            const querySnapshot = await getDocs(q);
            const cartDoc = querySnapshot.docs[0]; 
            await deleteDoc(cartDoc.ref)
            router.replace(path)
        }catch(error){
            toast({
                title: "Veuillez reesayer!!!",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
        }
    
    }

    const DeleteAll = async ()=>{
        try{
            console.log(email)
            const cartRef = collection(db, 'orders'); // Supposons que la collection se nomme 'carts'.
            const q = query(cartRef, where('email', '==', email));
            const querySnapshot = await getDocs(q);
            const size = querySnapshot.size
            querySnapshot.docs.map(async (data,index)=>{
                await deleteDoc(data.ref)
            })
            // const cartDoc = querySnapshot.docs[0]; 
            toast({
                title: "Merci pour votre confiance!!!",

                status: "success",
                duration: 9000,
                isClosable: true,
            });
            router.replace(path)
        }catch(error){
            toast({
                title: "Veuillez reesayer!!!",

                status: "error",
                duration: 9000,
                isClosable: true,
            });
        }
    }


    const Increment = async (product)=>{
        try{
            const cartRef = collection(db, 'orders'); // Supposons que la collection se nomme 'carts'.
            const q = query(cartRef, where('email', '==', email),where("productId", '==' , product));
            const querySnapshot = await getDocs(q);
            const cartDoc = querySnapshot.docs[0]; 
            await updateDoc(cartDoc.ref,{orderQte:querySnapshot.docs[0].data().orderQte+1})
            router.replace(path)
        }catch(error){
            toast({
                title: "Veuillez reesayer!!!",

                status: "error",
                duration: 9000,
                isClosable: true,
            });
        }
    }

    const Decrement = async (product)=>{
        try{
            const cartRef = collection(db, 'orders'); // Supposons que la collection se nomme 'carts'.
            const q = query(cartRef, where('email', '==', email),where("productId", '==' , product));
            const querySnapshot = await getDocs(q);
            const cartDoc = querySnapshot.docs[0]; 
            if(querySnapshot.docs[0].data().orderQte<2){
                await DeleteProduct(product)
            }else{
                await updateDoc(cartDoc.ref,{orderQte:querySnapshot.docs[0].data().orderQte-1})
            }

            router.replace(path)
        }catch(error){
            toast({
                title: "Veuillez reesayer!!!",

                status: "error",
                duration: 9000,
                isClosable: true,
            });
        }
    }
    const [ref,setRef] = useState([])

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

        return `CO${formattedTimestamp}`;
    }

    useEffect(() => {
    
        setEmail(sessionStorage.getItem("email"))
    
        getCartsByUserId(email).then((userCarts) => {
        
        if (userCarts.length > 0) {
            setCart(userCarts);
            const po = secureLocalStorage.getItem("po")
            // console.log("po",po)
            let PrixT = 0;
            
            const All = userCarts;

        
            if (All != null) {
                All.map((data, index) => {
                    PrixT = (parseFloat(data.orderPrice)* data.orderQte )+ PrixT;
                });
                setPrix(PrixT);
            }
            if (PrixT <= 30) {
                setDis("grid");
                (po.slice(0, 2) == 91 ||
                po.slice(0, 2) == 94 ||
                po.slice(0, 2) == 93 ||
                po.slice(0, 2) == 92 ||
                po.slice(0, 2) == 78 ||
                po.slice(0, 2) == 77 ||
                po.slice(0, 2) == 75) ?setFrais("2.99") : setFrais("5.99");
                
            } else {
                setDis("grid");
                if (PrixT < 40 && PrixT > 29) {
                    setFrais((PrixT * 10) / 100);
                } else {
                    if (PrixT < 51) {
                        setFrais((PrixT * 9) / 100);
                    } else {
                        if (PrixT < 71) {
                            setFrais((PrixT * 8) / 100);
                        } else {
                            if (PrixT < 81) {
                                setFrais((PrixT * 7) / 100);
                            } else {
                                if (PrixT < 91) {
                                    setFrais((PrixT * 6) / 100);
                                } else {
                                    if (90 < PrixT) {
                                        setFrais((PrixT * 5) / 100);
                                    }
                                }
                            }
                        }
                    }
                }
            }

            secureLocalStorage.setItem("prix", PrixT);

            } else {
                // console.log("Aucun panier trouvé pour cet utilisateur.");
                setCart([])
            }
        });
        
    }, [email,cart]);
    if (cart != undefined && cart.length != 0){
        async function saveCommande3() {
        
        let email = sessionStorage.getItem("email");
        let Cart = cart;
        const dat = new Date;
        
        const year =dat.getUTCFullYear();
        const day =dat.getUTCDate();
        const month =dat.getUTCMonth()+1;
        const hours =dat.getUTCHours();
        const minutes =dat.getUTCMinutes();
        const seconds =dat.getUTCSeconds();

        const idCom = generateCustomKey();

        
        const hashDigest = sha256(idCom).toString(CryptoJS.enc.Hex);
        
        const hash = hashDigest.slice(0,3).toString()

        const dateCommande = `${day}/${month}/${year}`
        
            // Cart.map(async (data, index) => {
            //   push(rf(db2, "Commandes"), {
            //     productID: data.productId,
            //     payment: moyen,
            //     nom: data.orderName,
            //     livraison:way,
            
            //     quantite: data.quantity,
            //     imageUrl: data.orderImageUrl,
            //     organisation: data.orderOrganisation,
            //     Prix: data.orderPrice,
            //     initiateur: email,
            //     Status: "En Cours",
            //     ville: ville,
            //     rue: rue,
            //     code_postal: postal,
            //     batiment: batiment,
            //     lieu: lieu,
            //     receveur: nom,
            //     numero: numero,
            //     jour: day,
            //     moment: hours,
            //     date: new Date(),
            //   });
            
            // });
            
            set(rf(db2, `Commandes/${idCom}${hash}`), {
                cartlist:Cart,
                payment: moyen,
                commandeId:`${idCom}${hash}`,
                livraison:way,
                email,
                status: "En cours",
                ville: ville,
                rue: rue,
                code_postal: postal,
                batiment: batiment,
                lieu: lieu,
                receveur: nom,
                numero: numero,
                jour: day,
                moment: hours,
                dateCommande,
                subtotalPrice:`€${prix}`,
                totalPrice:`€${parseFloat(prix +parseFloat(frais)).toFixed(2)}`,
                createdAt: serverTimestamp()}
            );
            
        
            await axios
            .post("/api/sendmail", {
                adresse:lieu,
                email: email.toString(),
                paiement:moyen,
                
                product:Cart,
            })
            .then((response) => {
                toast({
                    title: "SUCCES",
                    description: `merci pour la confiance`,
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                });
            })
            .catch((error)=>{});
            await  DeleteAll()
                setLieu("");
                setNom("");
                setNumero("");
                // router.reload();
            
            }
        
        return (
            <>
                <Center display={"grid"} width={"full"} position={"relative"}  >
                <SimpleGrid width={"full"} columns={[1, 1, 2, 2, 2]} spacing={10} justifyContent={"space-around"}>
                    <Box bgColor={"whiteAlpha.700"} width={{ base: "90%", md: "100%" }} mb={40} ml={["5%", "5%", "5%", "10%", "10%"]} borderRadius={"15px"}>
                    {cart.map((data, index) => (
                        <Center key={data.productId} width={"100%"}>
                        {/* borderTop={"1px solid gray"} */}
                        <SimpleGrid columns={1} display={"grid"} backgroundColor={"#fbfbfbfc"} width={"fit-content"} py={5} ml={10} marginBottom={5} >
                            {/* // spacing={2}
                            // border={"1px solid #e6e6e6"}
                            // boxShadow={"0px 2px 10px"}
                            // boxSizing={"border-box"}
                            // borderRadius={"9px"} */}
                            <Box>
                                <Flex>
                                    <Box w="100px" h="100px" bgImage={data.orderImageUrl} bgSize={"contain"} bgRepeat={"no-repeat"} mr={2}/>
                                    <Box mr={5}>
                                    <Text fontSize={"15px"} fontWeight={600} noOfLines={2}> {data.orderName}</Text>
                                    <Text fontSize={"10px"} fontWeight={400} noOfLines={2}> {data.orderorganisation || data.orderOrganisation}</Text>
                                    <Text fontSize={"15px"} fontWeight={700} noOfLines={1} color={"cyan.700"}> {data.orderPrice} €</Text>
                                    {/* <Text fontSize={"20px"} fontWeight={700} noOfLines={1}> {data.orderPrice} €</Text> */}
                                    <Flex  mt={5}>
                                        <Box display={"flex"}>
                                            <Button w={"fit-content"} onClick={() => Decrement(data.productId)}>-</Button>
                                            <Input type={"number"} width={"50px"} value={data.orderQte}/>
                                            <Button w={"fit-content"}   mr={2} onClick={() => Increment(data.productId)}>+</Button>
                                        </Box>
                                    <Flex  >
                                    <SimpleGrid columns={1}>
                                        {/* // mr={2}
                                        // my={2} */}
                                        <Button color={"red.500"} w={"fit-content"} fontSize={"15px"} onClick={() => DeleteProduct(data.productId )}> Supprimer</Button>
                                    </SimpleGrid>
                                    </Flex>
                                    </Flex>
                                    </Box>
                                </Flex>
                            </Box>
                        </SimpleGrid>
                        </Center>
                    ))}
                    </Box>
                    {/* // boxShadow={"0px 2px 10px"} */}
                    <Flex mx={["0", "0", "0", "10%", "10%"]} border={"1px solid #e6e6e6"} bottom="0" left="0" right="0" top={["80%","80%","80%","0","0"]} boxSizing={"border-box"} borderRadius={"15px"} position={["fixed","fixed","fixed","relative","relative",]} as={"footer"} width={["100%","100%","100%","fit-content","fit-content"]} backgroundColor={"#fff"} height={"fit-content"} paddingBottom={5} marginBottom={[5, 5, 5, 0, 0]} marginTop={0} px={10} justifyContent={"space-between"} >
                    <Box w={"full"}>
                        <Box fontSize={20}  >
                            <Text  fontSize={["15px","15px","15px","15px"]} fontWeight={600}>Recapitulatif de la commande :</Text>
                            <Text  mr={2} fontSize={["15px","15px","15px","15px","15px"]}>Prix commande : {parseFloat(prix).toFixed(2)} €</Text>
                            <Text  mr={2} fontSize={["15px","15px","15px","15px","15px"]}>Frais de livraison : {parseFloat(frais).toFixed(2)} €</Text>
                            
                            <Flex borderTop={"1px solid gray"} my={2}  fontSize={["15px","15px","15px","15px","15px"]}   >
                            <Text> Total  : </Text>
                            <Text fontWeight={600} color={"red.700"} ml={2}> {parseFloat(prix +parseFloat(frais)).toFixed(2)} €</Text>
                            </Flex>
                        </Box>
                        <Button onClick={onOpen} color={"white "} bgColor={"cyan.700"} width={"fit-content"} height={"fit-content"} py={2} px={5} _hover={{     bgColor:"cyan.500",color:"black" }} > Valider commande </Button>
                    </Box>

                    <Drawer onClose={onClose} isOpen={isOpen} size={"full"}>{/** */}
                        <DrawerOverlay />
                        <DrawerContent>
                        <DrawerCloseButton />
                        {/* <DrawerHeader className="bg-red-400" fontSize={{ base: 20, md: 30 }}>
                            <h1 className="text-3xl text-teal-950 font-bold">Validation de la commande</h1>
                        </DrawerHeader> */}
                        <DrawerBody className="container mx-auto w-7/12 h-[32rem]" > {/**ICIII */}
                            <div className="overflow-hidden min-h-[32rem] rounded-md p-8 flex flex-col justify-center items-center gap-4 shadow-lg md:p-8">
                                <h1 className="text-3xl text-teal-900 font-bold mb-8">Validation de la commande</h1>
                                <Box className="bg-slate-300 rounded-md shadow-lg flex flex-col justify-center items-center p-8 gap-4">
                                    <Text className="text-2xl font-bold mb-10"> {/**fontWeight={700} fontSize={20} */}
                                        {" "}
                                        Mode de paiement
                                    </Text>
                
                                    <RadioGroup display={"flex"} onChange={setMoyen} value={moyen} onClick={() => { setSect1("flex"); }}>
                                        <Radio mr={20} value="Especes">
                                        <Flex>
                                            <BsCashCoin fontSize={20} />
                                            <Text ml={2}> Espèces</Text>
                                        </Flex>
                                        </Radio>
                                        <Radio value="Paypal">
                                        <Flex>
                                            <BsPaypal fontSize={20} />
                                            <Text ml={2}> Paypal</Text>
                                        </Flex>
                                        </Radio>
                                    </RadioGroup>
                                </Box>
                                <Box className="bg-white shadow-lg shadow-gray-300 rounded-md flex flex-col justify-center items-center p-4 gap-4 md:flex-col" >
                                    <Text className="text-2xl text-teal-800 mb-4 font-bold max-[780px]:text-center max-[780px]:mb-1">
                                        Date de livraison
                                    </Text> 
                                    <Box>
                                        <RadioGroup className="bg-orange-400 text-white rounded-md flex justify-between items-center p-4 text-xl max-[780px]:flex-col max-[780px]:items-start" onChange={setDay} value={day} onClick={() => setSect2("grid")} >
                                            <Radio mr={20} value="Mercredi">
                                                Mercredi{" "}
                                            </Radio>
                                            <Radio mr={20} value="Vendredi">
                                                {" "}
                                                Vendredi
                                            </Radio>
                                            <Radio mr={20} value="Samedi">
                                                {" "}
                                                Samedi
                                            </Radio>
                                        </RadioGroup>
                                    </Box>
                                    <Box className="bg-teal-100 rounded-md flex flex-col justify-center items-center gap-4 p-4">{/** ml={{base:0,md:10}} display={sect2} */}
                                        <Text className="text-2xl text-teal-800 mb-4 font-bold">Heure de livraison</Text>
                                        {day == "Samedi" ? (
                                            <RadioGroup className="bg-green-700 text-white flex justify-center items-center gap-4 p-4"  onChange={setHours} value={hours} onClick={() => { setSect3("flex") }}>{/** display={["grid","grid","grid","flex","flex"]}  */}
                                                <Radio value="Soir(13h-16h)">{/** mr={2} */}
                                                    Apres-Midi (de 13h ----- 16h)
                                                    </Radio>
                                                    <br />
                                                    <Radio value="Soir(16h-20h)">{/** mr={2} */}
                                                    Soir (de 16h ----- 20h)
                                                    </Radio>
                                                    <br />
                                                    <Radio value="Soir(20h-00h)">{/** mr={2} */}
                                                    Nuit (de 20h ----- 00h)
                                                </Radio>            
                                            </RadioGroup>
                                        ) : (
                                            <RadioGroup className="bg-pink-700 text-white flex justify-center items-center gap-4 p-4 max-[780px]:flex-col max-[780px]:justify-center max-[780px]:items-start max-[780px]:gap-1 max-[780px]:rounded-md max-[780px]:bg-white max-[780px]:shadow-lg max-[780px]:shadow-black max-[780px]:text-black" onChange={setHours} value={hours} onClick={() => { setSect3("flex") }}>{/**display={["grid","grid","grid","flex","flex"]}  */}
                                                <Radio value="Matin">{/** mr={2} */}
                                                    Matin(de 09h30 ----- 12h)
                                                </Radio>
                                                    <br />
                                                <Radio value="Soir(13h-16h)">{/** mr={2} */}
                                                    Apres-Midi (de 13h ----- 16h)
                                                </Radio>
                                                    <br />
                                                <Radio value="Soir(16h-20h)">{/** mr={2} */}
                                                    Soir (de 16h ----- 20h)
                                                </Radio>
                                                    <br />
                                                <Radio value="Soir(20h-00h)">{/** mr={2} */}
                                                    Nuit (de 20h ----- 00h)
                                                </Radio>
                                            </RadioGroup>
                                        )}
                                    </Box>
                                    </Box>
                                    <Box mb={10} className="flex flex-col justify-center items-center p-4 gap-4">{/**bg-orange-500  */}
                                        <div className="bg-teal-800 rounded-md p-8 flex flex-col justify-center items-center gap-4 text-white">
                                            <Text className="text-2xl font-bold mb-4 max-[780px]:text-center max-[780px]:mb-1">
                                                {" "}
                                                Adresse de livraison
                                            </Text>
                                            <Box display={sect3}>
                                                <RadioGroup className="flex justify-between items-center max-[780px]:flex-col max-[780px]:gap-2 max-[780px]:items-start" onChange={setWay} value={way} onClick={() => { setSect4("grid") }}>{/** display={["grid","grid","grid","flex","flex"]}  */}
                                                    <Radio mr={5} value="me"  onClick={() => {setLieu(secureLocalStorage.getItem("addresse")), setNumero(secureLocalStorage.getItem("number")), setNom(secureLocalStorage.getItem("name"))}}>
                                                        Utiliser mon Adresse
                                                    </Radio>
                                                    <Radio  ml={5} value="other" onClick={() => { setLieu(""), setNumero(""), setNom("");}}>
                                                        Utiliser une autre adresse
                                                    </Radio>
                                                </RadioGroup>
                                            </Box> 
                                        </div>
                                        
                                        {
                                            way == "other" ?
                                            <>
                                                <Box className="w-full flex flex-col gap-2 mt-10 bg-teal-800 rounded-md shadow-lg shadow-black p-12">{/*width={"300px"}*/}
                                                    <FormControl className="flex flex-col justify-start items-center w-full">
                                                        <FormLabel className="w-full text-white"><FontAwesomeIcon icon={faUser}/> Nom :  </FormLabel>
                                                        <Input placeholder="Elloh" className="-ml-1 mb-2 w-96" onChange={(e) => setNom(e.target.value) }/>
                                                    </FormControl>
                                                    <FormControl className="flex flex-col justify-start items-center w-full">
                                                        <FormLabel className="w-full text-white"><FontAwesomeIcon icon={faPhone}/>Numero :  </FormLabel>
                                                        <Input placeholder="+33 00 00 00 00" className="-ml-1 mb-2 w-96" type="number" onChange={(e) =>setNumero(e.target.value)}/>
                                                    </FormControl>
                                                    <FormControl  className="flex flex-col justify-start items-center w-full">
                                                        <FormLabel className="w-full text-white"><FontAwesomeIcon icon={faCity}/>Ville : </FormLabel>
                                                        <Input placeholder="Massy" className="-ml-1 mb-2 w-96 border border-teal-800 " onChange={(e) => setVille(e.target.value) } />
                                                    </FormControl>
                                                {/* </Box > 
                                                <Box>width={"300px"} */}
                                                    <FormControl className="flex flex-col justify-start items-center w-full">
                                                        <FormLabel className="w-full text-white"><FontAwesomeIcon icon={faRoad}/>Nom de la Rue : </FormLabel>
                                                        <Input placeholder="Orly" className="-ml-1 mb-2 w-96" onChange={(e) => setRue(e.target.value) } />
                                                    </FormControl>
                                                    <FormControl className="flex flex-col justify-start items-center w-full">
                                                        <FormLabel className="w-full text-white"><FontAwesomeIcon icon={faArrowUp19}/>Numero du batiment : </FormLabel>
                                                        <Input placeholder="712" className="-ml-1 mb-2 w-96" type="number" onChange={(e) => setBatiment(e.target.value) } />
                                                    </FormControl>
                                                    <FormControl className="flex flex-col justify-start items-center w-full">
                                                        <FormLabel className="w-full text-white"><FontAwesomeIcon icon={faMailBulk} />Code Postal : </FormLabel>
                                                        <Input placeholder="AB 31 BP" className="-ml-1 mb-2 w-96" onChange={(e) => setPostal(e.target.value) } />
                                                    </FormControl>
                                                </Box>
                                            </>
                                            :
                                            <></>
                                        }
                                    </Box>
                                    <Box  display={sect4} mb={20}>
                                        {
                                            moyen == "Paypal" ? <Box width={"300px"}> <PayPalButtons
                                            createOrder={(data, actions) => {
                                                return actions.order.create({
                                                    purchase_units: [
                                                        {
                                                            amount: {
                                                                value: `${prix + frais}`,
                                                            },
                                                        },
                                                    ],
                                                });
                                            }}
                                            onApprove={(data, actions) => {
                                                return actions.order
                                                .capture()
                                                .then(async (details) => {
                                                    const name =
                                                    details.payer.name.given_name;
                                                    toast({
                                                        title: "Achat effectué avec succès",
                                                        description: `Merci ${name} pour votre achat!!! `,
                                                        status: "success",
                                                        duration: 9000,
                                                        isClosable: true,
                                                    });
                                                    // secureLocalStorage.removeItem("Cart");
                                                    await DeleteAll()
                                                    // router.reload();
                                                });
                                            }}
                                            />
                                        </Box>
                                        :
                                        <Box className="">
                                            <Button className="bg-white border border-teal-800 text-teal-800" onClick={()=>{ saveCommande3()}}>Confirmer achat</Button>{/** bgColor={"cyan.700"} py={2} px={5} color={"white"}  */}
                                        </Box>
                                    }
                                </Box>
                            </div>
                        </DrawerBody>
                        </DrawerContent>
                    </Drawer>
                    </Flex>
                </SimpleGrid>
                </Center>
                
                {/* <FooterR /> */}
            
            </>)
        }
        else {
            return (
                <>
                    <Center>
                        <Flex
                            bgColor={"#fff"}
                            width={"621px"}
                            height={"205px"}
                            border={"1px solid #e6e6e6"}
                            // boxShadow={"0px 2px 10px"}
                            boxSizing={"border-box"}
                            borderRadius={"9px"}
                            fontSize={30}
                            justifyContent={"center"}
                            // pb={10}
                            marginBottom={20}>
                            <Text marginTop={20}>Votre panier est vide</Text>
                            {/* <Button marginTop={20} onClick={()=>Hashed()}>Votre panier est vide</Button> */}
                        </Flex>
                    </Center>
                </>
            );
        }
    
}

