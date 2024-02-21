import { Box, Center, Flex, Text, Image, Button, Input, Heading, Icon, SimpleGrid, useToast, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, InputGroup, FormControl, FormLabel, Tabs, TabList, Tab, TabPanels, TabPanel, Radio, RadioGroup, Stack, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Code, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FaTrashAlt } from "react-icons/fa";
import { ref as rf, set, push,serverTimestamp } from "@firebase/database";
import { authentic, db, db2 } from "@/FIREBASE/clientApp";
import { PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import { BsCashCoin, BsPaypal } from "react-icons/bs";
import secureLocalStorage from "react-secure-storage";
import { collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faPhone, faCity, faRoad, faArrowRightToCity, faArrowUp19, faMailBulk } from '@fortawesome/free-solid-svg-icons'
import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";


function OrderConfirmationPage() {
    const [day, setDay] = useState("");
    const [moyen, setMoyen] = useState("");
    const [hours, setHours] = useState("");
    const [way, setWay] = useState("");
    const [toggle, setToggle] = useState(false);

    const toggleFunc = () => {
        setToggle(!toggle)
    }

    return (
            <>
                <div className="bg-slate-300">
                    <div className="container mx-auto px-10 lg:px-0 flex flex-col justify-center items-center">
                        <h1 className="text-xl lg:text-3xl py-10 font-bold">Validation de la commande</h1>
                        <div className="flex flex-col gap-6">
                            <div className="bg-white p-10 rounded-lg shadow-[0_0_12px_rgba(0,0,0,0.2)]">
                                <div className="flex flex-col lg:flex-row justify-between items-center gap-2">
                                    <div className="flex flex-col lg:flex-row justify-between items-center gap-2">
                                        <h2 className="text-xl lg:text-2xl font-bold">Votre adresse : </h2>
                                        <ul className="list-none ml-10">
                                            <li>{secureLocalStorage.getItem("name")} {secureLocalStorage.getItem("surname")}</li>
                                            <li>{secureLocalStorage.getItem("addresse")}</li>
                                            <li>{secureLocalStorage.getItem("number")}</li>
                                        </ul>
                                    </div>
                                    <button onClick={toggleFunc} className="bg-cyan-800 text-white p-2 rounded-md">Changer d'adresse</button>
                                </div>
                            </div>
                            {toggle ?
                                <div className="w-full lg:w-3/6 mx-auto bg-white p-10 rounded-lg shadow-[0_0_12px_rgba(0,0,0,0.9)]">
                                    <form className="flex flex-col justify-center items-center gap-3">
                                        <div className="flex justify-start w-full">
                                            <span className="size-10 flex justify-center items-center bg-cyan-800 text-white"><FontAwesomeIcon icon={faUser}/></span>
                                            <input type="text" className="border w-full focus:outline-none focus:border-cyan-800 placeholder:text-slate-400 block bg-white rounded-sm py-2 pl-9 pr-3 shadow-sm focus:ring-cyan-800 focus:ring-1 sm:text-sm" placeholder="Nom"/>
                                        </div>
                                        <div className="flex justify-start w-full">
                                            <span className="size-10 flex justify-center items-center bg-cyan-800 text-white"><FontAwesomeIcon icon={faPhone}/></span>
                                            <input type="text" className="border w-full focus:outline-none focus:border-cyan-800 placeholder:text-slate-400 block bg-white rounded-sm py-2 pl-9 pr-3 shadow-sm focus:ring-cyan-800 focus:ring-1 sm:text-sm" placeholder="Numéro de téléphone"/>
                                        </div>
                                        <div className="flex justify-start w-full">
                                            <span className="size-10 flex justify-center items-center bg-cyan-800 text-white"><FontAwesomeIcon icon={faCity}/></span>
                                            <input type="text" className="border w-full focus:outline-none focus:border-cyan-800 placeholder:text-slate-400 block bg-white rounded-sm py-2 pl-9 pr-3 shadow-sm focus:ring-cyan-800 focus:ring-1 sm:text-sm" placeholder="Ville"/>
                                        </div>
                                        <div className="flex justify-start w-full">
                                            <span className="size-10 flex justify-center items-center bg-cyan-800 text-white"><FontAwesomeIcon icon={faRoad}/></span>
                                            <input type="text" className="border w-full focus:outline-none focus:border-cyan-800 placeholder:text-slate-400 block bg-white rounded-sm py-2 pl-9 pr-3 shadow-sm focus:ring-cyan-800 focus:ring-1 sm:text-sm" placeholder="Nom de la rue"/>
                                        </div>
                                        <div className="flex justify-start w-full">
                                            <span className="size-10 flex justify-center items-center bg-cyan-800 text-white"><FontAwesomeIcon icon={faArrowUp19}/></span>
                                            <input type="text" className="border w-full focus:outline-none focus:border-cyan-800 placeholder:text-slate-400 block bg-white rounded-sm py-2 pl-9 pr-3 shadow-sm focus:ring-cyan-800 focus:ring-1 sm:text-sm" placeholder="Numéro du batiment"/>
                                        </div>
                                        <div className="flex justify-start w-full">
                                            <span className="size-10 flex justify-center items-center bg-cyan-800 text-white"><FontAwesomeIcon icon={faMailBulk} /></span>
                                            <input type="text" className="border w-full focus:outline-none focus:border-cyan-800 placeholder:text-slate-400 block bg-white rounded-sm py-2 pl-9 pr-3 shadow-sm focus:ring-cyan-800 focus:ring-1 sm:text-sm" placeholder="Code postal"/>
                                        </div>
                                    </form>
                                </div>
                            :
                                null
                            }
                            <div className="bg-white p-10 rounded-lg shadow-[0_0_12px_rgba(0,0,0,0.2)]">
                                <div className="flex flex-col justify-center items-center">
                                    <h2 className="text-xl lg:text-2xl mb-6 font-bold">Mode de paiement</h2>
                                    <ul className="flex justify-between items-center w-full lg:text-[1rem] text-sm font-medium text-gray-900 bg-white sm:flex">
                                        <li className="w-full border-gray-200 dark:border-gray-600">
                                            <div className="flex items-center ps-3">
                                                <input id="horizontal-list-radio-license" type="radio" value="Especes" name="list-radio" className="w-4 h-4 text-cyan-800 bg-slate-800 border-l-slate-800 focus:ring-cyan-800 dark:focus:ring-cyan-800"/>
                                                <label for="horizontal-list-radio-license" className="w-full py-3 ms-2 lg:text-[1rem] text-sm font-medium text-gray-900 dark:text-lateborder-l-slate-800"><BsCashCoin/>Espèces</label>
                                            </div>
                                        </li>
                                        <li className="w-full border-gray-200 dark:border-gray-600">
                                            <div className="flex items-center ps-3">
                                                <input id="horizontal-list-radio-id" type="radio" value="Paypal" name="list-radio" className="w-4 h-4 text-cyan-800 bg-slate-800 border-l-slate-800 focus:ring-cyan-800 dark:focus:ring-cyan-800"/>
                                                <label for="horizontal-list-radio-id" className="w-full py-3 ms-2 lg:text-[1rem] text-sm font-medium text-gray-900 dark:text-lateborder-l-slate-800"><BsPaypal/>Paypal</label>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="bg-white p-10 rounded-lg shadow-[0_0_12px_rgba(0,0,0,0.2)]">
                                <div className="flex flex-col justify-center items-center">
                                    <h2 className="text-xl lg:text-2xl mb-6 font-bold">Date de livraison</h2>
                                    <ul className="flex justify-between items-center w-full lg:text-[1rem] text-sm font-medium text-gray-900 bg-white sm:flex">
                                        <li className="w-full border-gray-200 dark:border-gray-600">
                                            <div className="flex items-center ps-3">
                                                <input id="horizontal-list-radio-license" type="radio" value="" name="list-radio" className="w-4 h-4 text-cyan-800 bg-slate-800 border-l-slate-800 focus:ring-cyan-800 dark:focus:ring-cyan-800"/>
                                                <label for="horizontal-list-radio-license" className="w-full py-3 ms-2 lg:text-[1rem] text-sm font-medium text-gray-900 dark:text-lateborder-l-slate-800">Mercredi</label>
                                            </div>
                                        </li>
                                        <li className="w-full border-gray-200 dark:border-gray-600">
                                            <div className="flex items-center ps-3">
                                                <input id="horizontal-list-radio-id" type="radio" value="" name="list-radio" className="w-4 h-4 text-cyan-800 bg-slate-800 border-l-slate-800 focus:ring-cyan-800 dark:focus:ring-cyan-800"/>
                                                <label for="horizontal-list-radio-id" className="w-full py-3 ms-2 lg:text-[1rem] text-sm font-medium text-gray-900 dark:text-lateborder-l-slate-800">Vendredi</label>
                                            </div>
                                        </li>
                                        <li className="w-full border-gray-200 dark:border-gray-600">
                                            <div className="flex items-center ps-3">
                                                <input id="horizontal-list-radio-id" type="radio" value="" name="list-radio" className="w-4 h-4 text-cyan-800 bg-slate-800 border-l-slate-800 focus:ring-cyan-800 dark:focus:ring-cyan-800"/>
                                                <label for="horizontal-list-radio-id" className="w-full py-3 ms-2 lg:text-[1rem] text-sm font-medium text-gray-900 dark:text-lateborder-l-slate-800">Samedi</label>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="bg-white p-10 rounded-lg shadow-[0_0_12px_rgba(0,0,0,0.2)]">
                                <div className="flex flex-col justify-center items-center">
                                    <h2 className="text-xl lg:text-2xl mb-6 font-bold">Heure de livraison</h2>
                                    {day == "Samedi" ? (
                                        <ul className="items-center w-full lg:text-[1rem] text-sm font-medium text-gray-900 bg-whitesm:flex">
                                            <li className="w-full border-gray-200 dark:border-gray-600">
                                                <div className="flex items-center ps-3">
                                                    <input id="horizontal-list-radio-license" type="radio" value="Soir(13h-16h)" name="list-radio" className="w-4 h-4 text-cyan-800 bg-slate-800 border-l-slate-800 focus:ring-cyan-800 dark:focus:ring-cyan-800"/>
                                                    <label for="horizontal-list-radio-license" className="w-full py-3 ms-2 lg:text-[1rem] text-sm font-medium text-gray-900 dark:text-lateborder-l-slate-800">Apres-Midi (de 13h -- 16h)</label>
                                                </div>
                                            </li>
                                            <li className="w-full border-gray-200 dark:border-gray-600">
                                                <div className="flex items-center ps-3">
                                                    <input id="horizontal-list-radio-id" type="radio" value="Soir(16h-20h)" name="list-radio" className="w-4 h-4 text-cyan-800 bg-slate-800 border-l-slate-800 focus:ring-cyan-800 dark:focus:ring-cyan-800"/>
                                                    <label for="horizontal-list-radio-id" className="w-full py-3 ms-2 lg:text-[1rem] text-sm font-medium text-gray-900 dark:text-lateborder-l-slate-800">Soir (de 16h -- 20h)</label>
                                                </div>
                                            </li>
                                            <li className="w-full border-gray-200 dark:border-gray-600">
                                                <div className="flex items-center ps-3">
                                                    <input id="horizontal-list-radio-id" type="radio" value="Soir(20h-00h)" name="list-radio" className="w-4 h-4 text-cyan-800 bg-slate-800 border-l-slate-800 focus:ring-cyan-800 dark:focus:ring-cyan-800"/>
                                                    <label for="horizontal-list-radio-id" className="w-full py-3 ms-2 lg:text-[1rem] text-sm font-medium text-gray-900 dark:text-lateborder-l-slate-800">Nuit (de 20h -- 00h)</label>
                                                </div>
                                            </li>
                                        </ul>
                                    ) : (
                                        <ul className="flex lg:flex-row flex-col justify-center items-center w-full lg:text-[1rem] text-sm font-medium text-gray-900 bg-whitesm:flex">
                                            <li className="w-full border-gray-200 dark:border-gray-600">
                                                <div className="flex items-center ps-3">
                                                    <input id="horizontal-list-radio-license" type="radio" value="Matin" name="list-radio" className="w-4 h-4 text-cyan-800 bg-slate-800 border-l-slate-800 focus:ring-cyan-800 dark:focus:ring-cyan-800"/>
                                                    <label for="horizontal-list-radio-license" className="w-full py-3 ms-2 lg:text-[1rem] text-sm font-medium text-gray-900 dark:text-lateborder-l-slate-800">Matin(de 09h30 -- 12h)</label>
                                                </div>
                                            </li>
                                            <li className="w-full border-gray-200 dark:border-gray-600">
                                                <div className="flex items-center ps-3">
                                                    <input id="horizontal-list-radio-id" type="radio" value="Soir(13h-16h)" name="list-radio" className="w-4 h-4 text-cyan-800 bg-slate-800 border-l-slate-800 focus:ring-cyan-800 dark:focus:ring-cyan-800"/>
                                                    <label for="horizontal-list-radio-id" className="w-full py-3 ms-2 lg:text-[1rem] text-sm font-medium text-gray-900 dark:text-lateborder-l-slate-800">Apres-Midi (de 13h -- 16h)</label>
                                                </div>
                                            </li>
                                            <li className="w-full border-gray-200 dark:border-gray-600">
                                                <div className="flex items-center ps-3">
                                                    <input id="horizontal-list-radio-id" type="radio" value="Soir(16h-20h)" name="list-radio" className="w-4 h-4 text-cyan-800 bg-slate-800 border-l-slate-800 focus:ring-cyan-800 dark:focus:ring-cyan-800"/>
                                                    <label for="horizontal-list-radio-id" className="w-full py-3 ms-2 lg:text-[1rem] text-sm font-medium text-gray-900 dark:text-lateborder-l-slate-800">Soir (de 16h -- 20h)</label>
                                                </div>
                                            </li>
                                            <li className="w-full border-gray-200 dark:border-gray-600">
                                                <div className="flex items-center ps-3">
                                                    <input id="horizontal-list-radio-id" type="radio" value="Soir(20h-00h)" name="list-radio" className="w-4 h-4 text-cyan-800 bg-slate-800 border-l-slate-800 focus:ring-cyan-800 dark:focus:ring-cyan-800"/>
                                                    <label for="horizontal-list-radio-id" className="w-full py-3 ms-2 lg:text-[1rem] text-sm font-medium text-gray-900 dark:text-lateborder-l-slate-800">Nuit (de 20h -- 00h)</label>
                                                </div>
                                            </li>
                                        </ul>
                                    )}
                                </div>
                            </div>
                        </div>
                        <button className="bg-cyan-800 text-white rounded-md py-2 px-6 my-6">Confirmer l'achat</button>
                    </div>
                </div>
            </>
        )
    }

export default OrderConfirmationPage
    // <div className="">
    //     <div>

    //         <div>
    //         <div className="bg-slate-200 h-full" >
    //             <div className="container mx-auto w-7/12 h-full" >
    //                 <div className="overflow-hidden min-h-[32rem] rounded-md p-8 flex flex-col justify-center items-center gap-4 md:p-8">
    //                     <h1 className="text-3xl text-teal-900 font-bold mb-8">Validation de la commande</h1>
    //                     <div className="user-datas bg-white w-full flex justify-between items-center border w-full focus:outline-none focus:border-cyan-800  placeholder=""p-4 max-[680px]:flex-col max-[680px]:items-center max-[1133px]:justify-center max-[1133px]:flex-col max-[680px]:justify-center max-[1133px]:items-center">
    //                         <span className="font-bold self-start text-2xl max-[680px]:self-auto max-[1133px]:self-auto">Votre adresse :</span>
    //                         <ul className="list-none">
    //                             <li>{secureLocalStorage.getItem("name")} {secureLocalStorage.getItem("surname")}</li>
    //                             <li>{secureLocalStorage.getItem("addresse")}</li>
    //                             <li>{secureLocalStorage.getItem("number")}</li>
    //                         </ul>
    //                         <button className="bg-cyan-800 rounded-md text-white p-2" onClick={() =>setWay("other")}>Changer d{`'`}adresse</button>
    //                     </div>
    //                         <div className=" w-full bg-white rounded-md shadow-lg flex flex-col justify-center items-center p-8 gap-4 max-[680px]:">
    //                             <h2 className="text-2xl font-bold mb-10 max-[680px]:text-xl max-[687px]:text-center">
    //                                 {" "}
    //                                 Mode de paiement
    //                             </h2>
            
    //                             <RadioGroup className="w-full flex justify-around items-center" onChange={setMoyen} value={moyen} onClick={() => { setSect1("flex"); }}>
    //                                 <div>
    //                                     <Radio value="Especes">
    //                                         <div>
    //                                             <BsCashCoin/>
    //                                             <span> Espèces</span>
    //                                         </div>
    //                                     </Radio>
    //                                 </div>
    //                                 <div>
    //                                     <Radio value="Paypal">
    //                                         <div>
    //                                             <BsPaypal/>
    //                                             <span> Paypal</span>
    //                                         </div>
    //                                     </Radio>
    //                                 </div>
    //                             </RadioGroup>
    //                         </div>

    //                     <div className="w-full bg-white shadow-lg shadow-lateborder-l-slate-800 rounded-md flex flex-col justify-center items-center p-4 gap-4 md:flex-col" >
    //                         <span className="text-2xl text-black mb-4 font-bold max-[780px]:text-center max-[780px]:mb-1">
    //                             Date de livraison
    //                         </span> 
    //                         <div>
    //                             <RadioGroup className="max-[680px]:flex-col max-[680px]:items-center max-[1133px]:items-center max-[1133px]:flex-col max-[1390px]: bg-green-200 text-black rounded-md flex justify-between items-center p-4 text-xl max-[780px]:flex-col max-[780px]:items-start" onChange={setDay} value={day} onClick={() => setSect2("grid")} >
    //                                 <Radio mr={20} className="w-4 h-4 text-slate-600 bg-slcytext-cyan-800border w-full focus:ocyring-cyan-800one focus:border-cyring-cyan-800- placeholder=""lateborder-l-slate-800 focus:ring-slate-500 dark:focus:ring-slate-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-cyan-800 dark:border w-full focus:outline-none focus:border-cyan-800- placeholder=""cyan-800" value="Mercredi">
    //                                     Mercredi{" "}
    //                                 </Radio>
    //                                 <Radio mr={20} className="w-4 h-4 text-slate-600 bg-slcytext-cyan-800border w-full focus:ocyring-cyan-800one focus:border-cyring-cyan-800- placeholder=""lateborder-l-slate-800 focus:ring-slate-500 dark:focus:ring-slate-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-cyan-800 dark:border w-full focus:outline-none focus:border-cyan-800- placeholder=""cyan-800" value="Vendredi">
    //                                     {" "}
    //                                     Vendredi
    //                                 </Radio>
    //                                 <Radio mr={20} className="w-4 h-4 text-slate-600 bg-slcytext-cyan-800border w-full focus:ocyring-cyan-800one focus:border-cyring-cyan-800- placeholder=""lateborder-l-slate-800 focus:ring-slate-500 dark:focus:ring-slate-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-cyan-800 dark:border w-full focus:outline-none focus:border-cyan-800- placeholder=""cyan-800" value="Samedi">
    //                                     {" "}
    //                                     Samedi
    //                                 </Radio>
    //                             </RadioGroup>
    //                         </div>
    //                         <div className="rounded-md flex flex-col justify-center items-center gap-4 p-4">
    //                             <span className="text-2xl text-black mb-4 font-bold">Heure de livraison</span>
    //                             {day == "Samedi" ? (
    //                                 <RadioGroup className="bg-green-700 text-white flex justify-center items-center gap-4 p-4"  onChange={setHours} value={hours} onClick={() => { setSect3("flex") }}>
    //                                     <Radio value="Soir(13h-16h)">
    //                                         Apres-Midi (de 13h -- 16h)
    //                                         </Radio>
    //                                         <br />
    //                                         <Radio value="Soir(16h-20h)">
    //                                         Soir (de 16h -- 20h)
    //                                         </Radio>
    //                                         <br />
    //                                         <Radio value="Soir(20h-00h)">
    //                                         Nuit (de 20h -- 00h)
    //                                     </Radio>            
    //                                 </RadioGroup>
    //                             ) : (
    //                                 <RadioGroup className="bg-slate-200 text-black flex justify-center items-center gap-4 p-4 max-[780px]:flex-col max-[780px]:justify-center max-[780px]:items-start max-[780px]:gap-1 max-[780px]:rounded-md max-[780px]:bg-white max-[780px]:shadow-lg max-[780px]:shadow-black max-[780px]:text-black" onChange={setHours} value={hours} onClick={() => { setSect3("flex") }}>
    //                                     <Radio className="w-4 h-4 text-slate-600 bg-slcytext-cyan-800border w-full focus:ocyring-cyan-800one focus:border-cyring-cyan-800- placeholder=""lateborder-l-slate-800 focus:ring-slate-500 dark:focus:ring-slate-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-cyan-800 dark:border w-full focus:outline-none focus:border-cyan-800- placeholder=""cyan-800" value="Matin">
    //                                         Matin(de 09h30 -- 12h)
    //                                     </Radio>
    //                                         <br />
    //                                     <Radio className="w-4 h-4 text-slate-600 bg-slcytext-cyan-800border w-full focus:ocyring-cyan-800one focus:border-cyring-cyan-800- placeholder=""lateborder-l-slate-800 focus:ring-slate-500 dark:focus:ring-slate-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-cyan-800 dark:border w-full focus:outline-none focus:border-cyan-800- placeholder=""cyan-800" value="Soir(13h-16h)">
    //                                         Apres-Midi (de 13h -- 16h)
    //                                     </Radio>
    //                                         <br />
    //                                     <Radio className="w-4 h-4 text-slate-600 bg-slcytext-cyan-800border w-full focus:ocyring-cyan-800one focus:border-cyring-cyan-800- placeholder=""lateborder-l-slate-800 focus:ring-slate-500 dark:focus:ring-slate-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-cyan-800 dark:border w-full focus:outline-none focus:border-cyan-800- placeholder=""cyan-800" value="Soir(16h-20h)">
    //                                         Soir (de 16h -- 20h)
    //                                     </Radio>
    //                                         <br />
    //                                     <Radio className="w-4 h-4 text-slate-600 bg-slcytext-cyan-800border w-full focus:ocyring-cyan-800one focus:border-cyring-cyan-800- placeholder=""lateborder-l-slate-800 focus:ring-slate-500 dark:focus:ring-slate-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-cyan-800 dark:border w-full focus:outline-none focus:border-cyan-800- placeholder=""cyan-800" value="Soir(20h-00h)">
    //                                         Nuit (de 20h -- 00h)
    //                                     </Radio>
    //                                 </RadioGroup>
    //                             )}
    //                         </div>
    //                         </div>
    //                         <div mb={10} className="min-w-[100%] flex flex-col justify-center items-center p-4 gap-4">
    //                             ici
                                
    //                             {
    //                                 way == "other" ?
    //                                 <>
    //                                     <div className="min-w-[80%] flex flex-col gap-2 mt-6 bg-white rounded-md shadow-md shadow-black p-12">
    //                                         <FormControl className="flex flex-col justify-start items-center w-full">
    //                                             <FormLabel className="w-full text-black"><FontAwesomeIcon icon={faUser}/> Nom :  </FormLabel>
    //                                             <Input placeholder="Elloh" className="min-w-[34rem] -ml-1 mb-2 w-96" onChange={(e) => setNom(e.target.value) }/>
    //                                         </FormControl>
    //                                         <FormControl className="flex flex-col justify-start items-center w-full">
    //                                             <FormLabel className="w-full text-black"><FontAwesomeIcon icon={faPhone}/>Numero :  </FormLabel>
    //                                             <Input placeholder="+33 00 00 00 00" className="min-w-[34rem] -ml-1 mb-2 w-96" type="number" onChange={(e) =>setNumero(e.target.value)}/>
    //                                         </FormControl>
    //                                         <FormControl  className="flex flex-col justify-start items-center w-full">
    //                                             <FormLabel className="w-full text-black"><FontAwesomeIcon icon={faCity}/>Ville : </FormLabel>
    //                                             <Input placeholder="Massy" className="-ml-1 mb-2 w-96 border w-full focus:outline-none focus:border-cyan-800  placeholder=""border w-full focus:outline-none focus:border-cyan-800- placeholder=""teal-800 " onChange={(e) => setVille(e.target.value) } />
    //                                         </FormControl>
                                            
    //                                         <FormControl className="flex flex-col justify-start items-center w-full">
    //                                             <FormLabel className="w-full text-black"><FontAwesomeIcon icon={faRoad}/>Nom de la Rue : </FormLabel>
    //                                             <Input placeholder="Orly" className="min-w-[34rem] -ml-1 mb-2 w-96" onChange={(e) => setRue(e.target.value) } />
    //                                         </FormControl>
    //                                         <FormControl className="flex flex-col justify-start items-center w-full">
    //                                             <FormLabel className="w-full text-black"><FontAwesomeIcon icon={faArrowUp19}/>Numero du batiment : </FormLabel>
    //                                             <Input placeholder="712" className="min-w-[34rem] -ml-1 mb-2 w-96" type="number" onChange={(e) => setBatiment(e.target.value) } />
    //                                         </FormControl>
    //                                         <FormControl className="flex flex-col justify-start items-center w-full">
    //                                             <FormLabel className="w-full text-black"><FontAwesomeIcon icon={faMailBulk} />Code Postal : </FormLabel>
    //                                             <Input placeholder="AB 31 BP" className="min-w-[34rem] -ml-1 mb-2 w-96" onChange={(e) => setPostal(e.target.value) } />
    //                                         </FormControl>
    //                                     </div>
    //                                 </>
    //                                 :
    //                                 <></>
    //                             }
    //                         </div>
    //                         <div className="p-8">
    //                             {
    //                                 moyen == "Paypal" ? <div width={"300px"}> <PayPalButtons
    //                                 createOrder={(data, actions) => {
    //                                     return actions.order.create({
    //                                         purchase_units: [
    //                                             {
    //                                                 amount: {
    //                                                     value: `${prix + frais}`,
    //                                                 },
    //                                             },
    //                                         ],
    //                                     });
    //                                 }}
    //                                 onApprove={(data, actions) => {
    //                                     return actions.order
    //                                     .capture()
    //                                     .then(async (details) => {
    //                                         const name =
    //                                         details.payer.name.given_name;
    //                                         toast({
    //                                             title: "Achat effectué avec succès",
    //                                             description: `Merci ${name} pour votre achat!!! `,
    //                                             status: "success",
    //                                             duration: 9000,
    //                                             isClosable: true,
    //                                         });
    //                                         // secureLocalStorage.removeItem("Cart");
    //                                         await DeleteAll()
    //                                         // router.reload();
    //                                     });
    //                                 }}
    //                                 />
    //                             </div>
    //                             :
    //                             <button className="-mt-80 py-2 px-10 rounded-md text-white border w-full focus:outline-none focus:border-cyan-800  placeholder=""border w-full focus:outline-none focus:border-cyan-800- placeholder=""teal-800 bg-teal-800" onClick={()=>{ saveCommande3()}}>Confirmer achat</button>
    //                             // <Box className="">
    //                             // </Box>
    //                         }
    //                     </div>
    //                 </div>
    //             </div>
    //             </div>
    //         </div>
    //     </div>
    // </div>