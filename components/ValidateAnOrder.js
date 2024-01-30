import React from 'react'
import { Box, Center, Flex, Text, Image, Button, Input, Heading, Icon, SimpleGrid, useToast, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, InputGroup, FormControl, FormLabel, Tabs, TabList, Tab, TabPanels, TabPanel, Radio, RadioGroup, Stack, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Code, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody } from "@chakra-ui/react";
import { BsCashCoin, BsPaypal } from "react-icons/bs";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faPhone, faCity, faRoad, faArrowRightToCity, faArrowUp19, faMailBulk } from '@fortawesome/free-solid-svg-icons'
import { PayPalButtons } from "@paypal/react-paypal-js";


function ValidateAnOrder() {
    return (
        <>
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
        </>
    )
}

export default ValidateAnOrder


