import React, { useState } from 'react'
import Link from "next/link";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoneyBillTransfer, faTruck, faStar } from '@fortawesome/free-solid-svg-icons'

import Carousel from "./Carousel";
import { authentic, db2 } from "@/FIREBASE/clientApp";
import { onValue, ref, update } from "@firebase/database";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from 'react';

function Store() {

    const slides = [
        "https://firebasestorage.googleapis.com/v0/b/appchapfinal.appspot.com/o/slider%2FabjPars.png?alt=media&token=c037631d-b5d7-47e8-b844-beb8b7fdca71",
        "https://firebasestorage.googleapis.com/v0/b/appchapfinal.appspot.com/o/slide%2FBakery.png?alt=media&token=574eecdf-7fc8-449f-a8d0-e5f9e14f9325",
        "https://firebasestorage.googleapis.com/v0/b/appchapfinal.appspot.com/o/slide%2FMicrosoftTeams-image1.png?alt=media&token=58788349-42b9-4b70-ae4e-6de227c5cb04",
        "https://firebasestorage.googleapis.com/v0/b/appchapfinal.appspot.com/o/slider%2F3.png?alt=media&token=e5393663-2adf-4ea1-96be-a097839ec561",
        "https://firebasestorage.googleapis.com/v0/b/appchapfinal.appspot.com/o/slider%2F4.png?alt=media&token=7eaa7ac6-28cb-4d7b-877f-e2014116b87a",
        "https://firebasestorage.googleapis.com/v0/b/appchapfinal.appspot.com/o/slider%2F5.png?alt=media&token=513878-493e-4457-b4e4-f4217d7fba8c",
        "https://firebasestorage.googleapis.com/v0/b/appchapfinal.appspot.com/o/slider%2F7.png?alt=media&token=9938ab34-a4eb-4fa5-9527-d1e741f048c3",
        "https://firebasestorage.googleapis.com/v0/b/appchapfinal.appspot.com/o/slider%2F1.png?alt=media&token=b6f83978-875d-429f-88ab-1dd2d962b49e",
        "https://firebasestorage.googleapis.com/v0/b/appchapfinal.appspot.com/o/slider%2F2.png?alt=media&token=caa391bd-bffb-491f-9679-a655d3fee05f",
        "https://firebasestorage.googleapis.com/v0/b/appchapfinal.appspot.com/o/slider%2F6.png?alt=media&token=11b0ef49-fc5e-44bd-b104-bb750053d133"
    ];

    const [productImg, setProductImg] = useState([])
    const [epice, setEpice] = useState([])
    const [textille, setTextille] = useState([])
    const [cosmetic, setCosmetic] = useState([])

    const getEpicerieMarkets = async () => {
        // const starCountRef = ref(db2, "/All Products");
        const starCountRef = ref(db2, "/Epicerie/Massy Market");
        onValue(starCountRef, (snapshot) => {
            const epicerie = snapshot.val()
            const sliced = Object.fromEntries(
                Object.entries(epicerie).slice(0, 5)
            );
            setEpice(sliced)

            for(let epice in epicerie) {
                setProductImg(epicerie[epice].imageUrl)
            }
            
        });
    };

    const getCosmeticMarkets = async () => {
        const starCountRef = ref(db2, "/Cosmetique/O'marche Gouro(Cosmetique)");
        onValue(starCountRef, (snapshot) => {
            const cosmetic = snapshot.val()
            const sliced = Object.fromEntries(
                Object.entries(cosmetic).slice(0, 5)
            );
            setCosmetic(sliced)

            // for(let epice in epicerie) {
            //     setProductImg(epicerie[epice].imageUrl)
            // }
            
        });
    }

    const getTextilleMarkets = async () => {
        const starCountRef = ref(db2, "/Textile/Djeni Market");
        onValue(starCountRef, (snapshot) => {
            const textille = snapshot.val()
            const sliced = Object.fromEntries(
                Object.entries(textille).slice(0, 5)
            );
            setTextille(sliced)

            // for(let epice in epicerie) {
            //     setProductImg(epicerie[epice].imageUrl)
            // }
            
        });

    }
    
    useEffect(() => {
        getEpicerieMarkets()
        getCosmeticMarkets()
        getTextilleMarkets()
    }, [])

    console.log("epice ::: ", epice.id);
    return (
        <>{/**Activer le overflow x du parent des card, pour qu'ils puissent être scrollable vers la droite */}
            <header className="py-10 bg-white">
                <div className='container mx-auto flex justify-center items-center'>
                    <div className="lg:w-[80%] lg:m-auto w-ful px-4 lg:px-0">
                        <Carousel slides={slides} />
                    </div>
                    {/* <div className="w-[40%] h-[28rem] bg-slate-200 flex justify-center items-center">
                        <h1 className='text-6xl text-orange-600'>Image ici !</h1>
                    </div> */}
                </div>
            </header>
            <section className="py-10 bg-gray-100 w-full">
                <div className='container mx-auto px-4 lg:px-0'>
                    <div className="flex flex-col justify-between">
                        <div className="flex justify-between mb-4">
                            <h2 className="text-2xl lg:text-4xl tracking-[0.1rem] font-bold">Epicerie</h2>
                            <Link className="text-xs lg:text-sm font-bold underline" href={"/StorePage/EpicerieProducts"}>Voir plus</Link>
                        </div>
                        <div className="flex -mx-4 overflow-x-scroll">{/**flex-wrap */}
                            {epice && epice !== "" ? 
                            Object.values(epice).map((item, index) => (
                                <div key={index} className="w-full lg:w-1/5 px-4">
                                    <div className="bg-white p-4 my-4 lg:my-0 flex flex-col items-center relative">
                                        <div className="h-20 w-20 rounded-full mb-2">
                                            <img className="h-20 w-20" src={item.imageUrl} alt="" />
                                        </div>
                                        <h3 className="uppercase font-bold mb-2 text-xs lg:text-sm">{item.nom}</h3>
                                        <small className="bg-red-600 p-1 rounded-2xl text-white absolute -top-2 left-0 capitalize">{item.etat}</small>
                                        <div className="text-yellow-300 mb-2">
                                            <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                            <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                            <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                            <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                            <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                            <span className="text-black">0 avis</span>
                                        </div>
                                        <span className="italic text-slate-400 text-xs mb-2">Livré le 31/01/2024</span>
                                        <div className="flex flex-col mb-2">
                                            <span className="text-slate-700 text-sm mb-2"><FontAwesomeIcon className="mr-2" icon={faTruck} />Livraison dans toute la France</span>
                                            <span className="text-slate-700 text-sm mb-2"><FontAwesomeIcon className="mr-2" icon={faMoneyBillTransfer} />Payez en espèce</span>
                                        </div>
                                        <span className="self-end mb-2 text-xl lg:text-2xl text-red-600 font-bold">{item.prix}€</span>
                                        <div className="w-full mt-4 flex justify-between">
                                            <Link className="text-white font-bold bg-amber-800 text-xs lg:text-[1rem] py-2 px-4 rounded-3xl" href={"#"}>Commerce</Link>
                                            <button className="text-white font-bold bg-cyan-800 text-xs lg:text-[1rem] py-2 px-4 rounded-3xl">+Ajouter</button>
                                        </div>
                                    </div>
                                </div>
                            )): 
                            (
                              <p>Rien</p>  
                            )}
                            
                            {/* <div className="w-full lg:w-1/5 px-4">
                                <div className="bg-white p-4 my-4 lg:my-0 flex flex-col items-center relative">
                                    <div className="h-20 w-20 rounded-full bg-orange-500 mb-2">
                                        <img src={productImg} alt="" />
                                    </div>
                                    <h3 className="uppercase font-bold mb-2 text-sm lg:text-xl">Attieke</h3>
                                    <small className="bg-red-600 p-1 rounded-2xl text-white absolute -top-2 left-0">Rupture</small>
                                    <div className="text-yellow-300 mb-2">
                                        <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                        <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                        <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                        <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                        <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                        <span className="text-black">0 avis</span>
                                    </div>
                                    <span className="italic text-slate-400 text-xs mb-2">Livré le 31/01/2024</span>
                                    <div className="flex flex-col mb-2"> Les produits congélés, île de france
                                        <span className="text-slate-700 text-sm mb-2"><FontAwesomeIcon className="mr-2" icon={faTruck} />Livraison dans l`île de France</span>
                                        <span className="text-slate-700 text-sm mb-2"><FontAwesomeIcon className="mr-2" icon={faMoneyBillTransfer} />Payez en espèce</span>
                                    </div>
                                    <span className="self-end mb-2 text-xl lg:text-2xl text-red-600 font-bold">15€</span>
                                    <div className="w-full mt-4 flex justify-between">
                                        <Link className="text-white font-bold bg-amber-800 text-xs lg:text-[1rem] py-2 px-4 rounded-3xl" href={"#"}>Commerce</Link>
                                        <button className="text-white font-bold bg-cyan-800 text-xs lg:text-[1rem] py-2 px-4 rounded-3xl">+Ajouter</button>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full lg:w-1/5 px-4">
                                <div className="bg-white p-4 my-4 lg:my-0 flex flex-col items-center relative">
                                    <div className="h-20 w-20 rounded-full bg-orange-500 mb-2">
                                        <img src={productImg} alt="" />
                                    </div>
                                    <h3 className="uppercase font-bold mb-2 text-sm lg:text-xl">Huile rouge</h3>
                                    <small className="bg-green-600 p-1 rounded-2xl text-white absolute -top-2 left-0">Disponible</small>
                                    <div className="text-yellow-300 mb-2">
                                        <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                        <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                        <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                        <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                        <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                        <span className="text-black">0 avis</span>
                                    </div>
                                    <span className="italic text-slate-400 text-xs mb-2">Livré le 31/01/2024</span>
                                    <div className="flex flex-col mb-2">
                                        <span className="text-slate-700 text-sm mb-2"><FontAwesomeIcon className="mr-2" icon={faTruck} />Livraison dans toute la France</span>
                                        <span className="text-slate-700 text-sm mb-2"><FontAwesomeIcon className="mr-2" icon={faMoneyBillTransfer} />Payez en espèce</span>
                                    </div>
                                    <span className="self-end mb-2 text-xl lg:text-2xl text-red-600 font-bold">15€</span>
                                    <div className="w-full mt-4 flex justify-between">
                                        <Link className="text-white font-bold bg-amber-800 text-xs lg:text-[1rem] py-2 px-4 rounded-3xl" href={"#"}>Commerce</Link>
                                        <button className="text-white font-bold bg-cyan-800 text-xs lg:text-[1rem] py-2 px-4 rounded-3xl">+Ajouter</button>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full lg:w-1/5 px-4">
                                <div className="bg-white p-4 my-4 lg:my-0 flex flex-col items-center relative">
                                    <div className="h-20 w-20 rounded-full bg-orange-500 mb-2">
                                        <img src={productImg} alt="" />
                                    </div>
                                    <h3 className="uppercase font-bold mb-2 text-sm lg:text-xl">Pkolo</h3>
                                    <small className="bg-green-600 p-1 rounded-2xl text-white absolute -top-2 left-0">Disponible</small>
                                    <div className="text-yellow-300 mb-2">
                                        <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                        <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                        <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                        <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                        <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                        <span className="text-black">0 avis</span>
                                    </div>
                                    <span className="italic text-slate-400 text-xs mb-2">Livré le 31/01/2024</span>
                                    <div className="flex flex-col mb-2">
                                        <span className="text-slate-700 text-sm mb-2"><FontAwesomeIcon className="mr-2" icon={faTruck} />Livraison dans toute la France</span>
                                        <span className="text-slate-700 text-sm mb-2"><FontAwesomeIcon className="mr-2" icon={faMoneyBillTransfer} />Payez en espèce</span>
                                    </div>
                                    <span className="self-end mb-2 text-xl lg:text-2xl text-red-600 font-bold">15€</span>
                                    <div className="w-full mt-4 flex justify-between">
                                        <Link className="text-white font-bold bg-amber-800 text-xs lg:text-[1rem] py-2 px-4 rounded-3xl" href={"#"}>Commerce</Link>
                                        <button className="text-white font-bold bg-cyan-800 text-xs lg:text-[1rem] py-2 px-4 rounded-3xl">+Ajouter</button>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full lg:w-1/5 px-4">
                                <div className="bg-white p-4 my-4 lg:my-0 flex flex-col items-center relative">
                                    <div className="h-20 w-20 rounded-full bg-orange-500 mb-2">
                                        <img src={productImg} alt="" />
                                    </div>
                                    <h3 className="uppercase font-bold mb-2 text-sm lg:text-xl">Gombo</h3>
                                    <small className="bg-green-600 p-1 rounded-2xl text-white absolute -top-2 left-0">Disponible</small>
                                    <div className="text-yellow-300 mb-2">
                                        <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                        <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                        <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                        <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                        <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                        <span className="text-black">0 avis</span>
                                    </div>
                                    <span className="italic text-slate-400 text-xs mb-2">Livré le 31/01/2024</span>
                                    <div className="flex flex-col mb-2">
                                        <span className="text-slate-700 text-sm mb-2"><FontAwesomeIcon className="mr-2" icon={faTruck} />Livraison dans toute la France</span>
                                        <span className="text-slate-700 text-sm mb-2"><FontAwesomeIcon className="mr-2" icon={faMoneyBillTransfer} />Payez en espèce</span>
                                    </div>
                                    <span className="self-end mb-2 text-xl lg:text-2xl text-red-600 font-bold">15€</span>
                                    <div className="w-full mt-4 flex justify-between">
                                        <Link className="text-white font-bold bg-amber-800 text-xs lg:text-[1rem] py-2 px-4 rounded-3xl" href={"#"}>Commerce</Link>
                                        <button className="text-white font-bold bg-cyan-800 text-xs lg:text-[1rem] py-2 px-4 rounded-3xl">+Ajouter</button>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>

                    <div className="flex flex-col justify-between mt-10">
                        <div className="flex justify-between mb-4">
                            <h2 className="text-2xl lg:text-4xl tracking-[0.1rem] font-bold">Textile</h2>
                            <Link className="text-xs lg:text-sm font-bold underline" href={"/StorePage/TextileProducts"}>Voir plus</Link>
                        </div>
                        <div className="flex -mx-4 overflow-x-scroll">{/**flex-wrap */}
                            {textille && textille !== " " ?
                                Object.values(textille).map((item, index) => (
                                <div key={index} className="w-full lg:w-1/5 px-4">
                                    <div className="bg-white p-4 my-4 lg:my-0 flex flex-col items-center relative">
                                        <div className="h-20 w-20 rounded-full mb-2">
                                            <img className="h-20 w-20" src={item.imageUrl} alt="" />
                                        </div>
                                        <h3 className="uppercase font-bold mb-2 text-xs lg:text-sm">{item.nom}</h3>
                                        <small className="bg-green-600 p-1 rounded-2xl text-white absolute -top-2 left-0">{item.etat}</small>
                                        <div className="text-yellow-300 mb-2">
                                            <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                            <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                            <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                            <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                            <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                            <span className="text-black">0 avis</span>
                                        </div>
                                        <span className="italic text-slate-400 text-xs mb-2">Livré le 31/01/2024</span>
                                        <div className="flex flex-col mb-2">
                                            <span className="text-slate-700 text-sm mb-2"><FontAwesomeIcon className="mr-2" icon={faTruck} />Livraison dans toute la France</span>
                                            <span className="text-slate-700 text-sm mb-2"><FontAwesomeIcon className="mr-2" icon={faMoneyBillTransfer} />Payez en espèce</span>
                                        </div>
                                        <span className="self-end mb-2 text-xl lg:text-2xl text-red-600 font-bold">{item.prix}€</span>
                                        <div className="w-full mt-4 flex justify-between">
                                            <Link className="text-white font-bold bg-amber-800 text-xs lg:text-[1rem] py-2 px-4 rounded-3xl" href={"#"}>Commerce</Link>
                                            <button className="text-white font-bold bg-cyan-800 text-xs lg:text-[1rem] py-2 px-4 rounded-3xl">+Ajouter</button>
                                        </div>
                                    </div>
                                </div>
                            )) : (<p>Rien</p>)}
                            
                            {/* <div className="w-full lg:w-1/5 px-4">
                                <div className="bg-white p-4 my-4 lg:my-0 flex flex-col items-center relative">
                                    <div className="h-20 w-20 rounded-full bg-orange-500 mb-2">
                                        <img src={productImg} alt="" />
                                    </div>
                                    <h3 className="uppercase font-bold mb-2 text-sm lg:text-xl">Attieke</h3>
                                    <small className="bg-green-600 p-1 rounded-2xl text-white absolute -top-2 left-0">Disponible</small>
                                    <div className="text-yellow-300 mb-2">
                                        <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                        <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                        <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                        <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                        <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                        <span className="text-black">0 avis</span>
                                    </div>
                                    <span className="italic text-slate-400 text-xs mb-2">Livré le 31/01/2024</span>
                                    <div className="flex flex-col mb-2">
                                        <span className="text-slate-700 text-sm mb-2"><FontAwesomeIcon className="mr-2" icon={faTruck} />Livraison dans toute la France</span>
                                        <span className="text-slate-700 text-sm mb-2"><FontAwesomeIcon className="mr-2" icon={faMoneyBillTransfer} />Payez en espèce</span>
                                    </div>
                                    <span className="self-end mb-2 text-xl lg:text-2xl text-red-600 font-bold">15€</span>
                                    <div className="w-full mt-4 flex justify-between">
                                        <Link className="text-white font-bold bg-amber-800 text-xs lg:text-[1rem] py-2 px-4 rounded-3xl" href={"#"}>Commerce</Link>
                                        <button className="text-white font-bold bg-cyan-800 text-xs lg:text-[1rem] py-2 px-4 rounded-3xl">+Ajouter</button>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full lg:w-1/5 px-4">
                                <div className="bg-white p-4 my-4 lg:my-0 flex flex-col items-center relative">
                                    <div className="h-20 w-20 rounded-full bg-orange-500 mb-2">
                                        <img src={productImg} alt="" />
                                    </div>
                                    <h3 className="uppercase font-bold mb-2 text-sm lg:text-xl">Huile rouge</h3>
                                    <small className="bg-red-600 p-1 rounded-2xl text-white absolute -top-2 left-0">Rupture</small>
                                    <div className="text-yellow-300 mb-2">
                                        <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                        <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                        <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                        <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                        <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                        <span className="text-black">0 avis</span>
                                    </div>
                                    <span className="italic text-slate-400 text-xs mb-2">Livré le 31/01/2024</span>
                                    <div className="flex flex-col mb-2">
                                        <span className="text-slate-700 text-sm mb-2"><FontAwesomeIcon className="mr-2" icon={faTruck} />Livraison dans toute la France</span>
                                        <span className="text-slate-700 text-sm mb-2"><FontAwesomeIcon className="mr-2" icon={faMoneyBillTransfer} />Payez en espèce</span>
                                    </div>
                                    <span className="self-end mb-2 text-xl lg:text-2xl text-red-600 font-bold">15€</span>
                                    <div className="w-full mt-4 flex justify-between">
                                        <Link className="text-white font-bold bg-amber-800 text-xs lg:text-[1rem] py-2 px-4 rounded-3xl" href={"#"}>Commerce</Link>
                                        <button className="text-white font-bold bg-cyan-800 text-xs lg:text-[1rem] py-2 px-4 rounded-3xl">+Ajouter</button>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full lg:w-1/5 px-4">
                                <div className="bg-white p-4 my-4 lg:my-0 flex flex-col items-center relative">
                                    <div className="h-20 w-20 rounded-full bg-orange-500 mb-2">
                                        <img src={productImg} alt="" />
                                    </div>
                                    <h3 className="uppercase font-bold mb-2 text-sm lg:text-xl">Pkolo</h3>
                                    <small className="bg-green-600 p-1 rounded-2xl text-white absolute -top-2 left-0">Disponible</small>
                                    <div className="text-yellow-300 mb-2">
                                        <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                        <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                        <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                        <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                        <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                        <span className="text-black">0 avis</span>
                                    </div>
                                    <span className="italic text-slate-400 text-xs mb-2">Livré le 31/01/2024</span>
                                    <div className="flex flex-col mb-2">
                                        <span className="text-slate-700 text-sm mb-2"><FontAwesomeIcon className="mr-2" icon={faTruck} />Livraison dans toute la France</span>
                                        <span className="text-slate-700 text-sm mb-2"><FontAwesomeIcon className="mr-2" icon={faMoneyBillTransfer} />Payez en espèce</span>
                                    </div>
                                    <span className="self-end mb-2 text-xl lg:text-2xl text-red-600 font-bold">15€</span>
                                    <div className="w-full mt-4 flex justify-between">
                                        <Link className="text-white font-bold bg-amber-800 text-xs lg:text-[1rem] py-2 px-4 rounded-3xl" href={"#"}>Commerce</Link>
                                        <button className="text-white font-bold bg-cyan-800 text-xs lg:text-[1rem] py-2 px-4 rounded-3xl">+Ajouter</button>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full lg:w-1/5 px-4">
                                <div className="bg-white p-4 my-4 lg:my-0 flex flex-col items-center relative">
                                    <div className="h-20 w-20 rounded-full bg-orange-500 mb-2">
                                        <img src={productImg} alt="" />
                                    </div>
                                    <h3 className="uppercase font-bold mb-2 text-sm lg:text-xl">Gombo</h3>
                                    <small className="bg-green-600 p-1 rounded-2xl text-white absolute -top-2 left-0">Disponible</small>
                                    <div className="text-yellow-300 mb-2">
                                        <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                        <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                        <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                        <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                        <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                        <span className="text-black">0 avis</span>
                                    </div>
                                    <span className="italic text-slate-400 text-xs mb-2">Livré le 31/01/2024</span>
                                    <div className="flex flex-col mb-2">
                                        <span className="text-slate-700 text-sm mb-2"><FontAwesomeIcon className="mr-2" icon={faTruck} />Livraison dans toute la France</span>
                                        <span className="text-slate-700 text-sm mb-2"><FontAwesomeIcon className="mr-2" icon={faMoneyBillTransfer} />Payez en espèce</span>
                                    </div>
                                    <span className="self-end mb-2 text-xl lg:text-2xl text-red-600 font-bold">15€</span>
                                    <div className="w-full mt-4 flex justify-between">
                                        <Link className="text-white font-bold bg-amber-800 text-xs lg:text-[1rem] py-2 px-4 rounded-3xl" href={"#"}>Commerce</Link>
                                        <button className="text-white font-bold bg-cyan-800 text-xs lg:text-[1rem] py-2 px-4 rounded-3xl">+Ajouter</button>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>

                    <div className="flex flex-col justify-between mt-10">
                        <div className="flex justify-between mb-4">
                            <h2 className="text-2xl lg:text-4xl tracking-[0.1rem] font-bold">Cosmetique</h2>
                            <Link className="text-xs lg:text-sm font-bold underline" href={"/StorePage/CosmeticProducts"}>Voir plus</Link>
                        </div>
                        <div className="flex -mx-4 overflow-x-scroll">{/**flex-wrap */}
                            {cosmetic && cosmetic !== " " ?
                            Object.values(cosmetic).map((item, index) => (
                                <div key={index} className="w-full lg:w-1/5 px-4">
                                    <div className="bg-white p-4 my-4 lg:my-0 flex flex-col items-center relative">
                                        <div className="h-20 w-20 rounded-full mb-2">
                                            <img className="h-20 w-20" src={item.imageUrl} alt="" />
                                        </div>
                                        <h3 className="uppercase font-bold mb-2 text-xs lg:text-sm">{item.nom}</h3>
                                        <small className="bg-green-600 p-1 rounded-2xl text-white absolute -top-2 left-0">{item.etat}</small>
                                        <div className="text-yellow-300 mb-2">
                                            <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                            <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                            <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                            <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                            <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                            <span className="text-black">0 avis</span>
                                        </div>
                                        <span className="italic text-slate-400 text-xs mb-2">Livré le 31/01/2024</span>
                                        <div className="flex flex-col mb-2">
                                            <span className="text-slate-700 text-sm mb-2"><FontAwesomeIcon className="mr-2" icon={faTruck} />Livraison dans toute la France</span>
                                            <span className="text-slate-700 text-sm mb-2"><FontAwesomeIcon className="mr-2" icon={faMoneyBillTransfer} />Payez en espèce</span>
                                        </div>
                                        <span className="self-end mb-2 text-xl lg:text-2xl text-red-600 font-bold">{item.prix}€</span>
                                        <div className="w-full mt-4 flex justify-between">
                                            <Link className="text-white font-bold bg-amber-800 text-xs lg:text-[1rem] py-2 px-4 rounded-3xl" href={"#"}>Commerce</Link>
                                            <button className="text-white font-bold bg-cyan-800 text-xs lg:text-[1rem] py-2 px-4 rounded-3xl">+Ajouter</button>
                                        </div>
                                    </div>
                                </div>
                            )) : (<p>rien</p>)}
                            
                            {/* <div className="w-full lg:w-1/5 px-4">
                                <div className="bg-white p-4 my-4 lg:my-0 flex flex-col items-center relative">
                                    <div className="h-20 w-20 rounded-full bg-orange-500 mb-2">
                                        <img src={productImg} alt="" />
                                    </div>
                                    <h3 className="uppercase font-bold mb-2 text-sm lg:text-xl">Attieke</h3>
                                    <small className="bg-green-600 p-1 rounded-2xl text-white absolute -top-2 left-0">Disponible</small>
                                    <div className="text-yellow-300 mb-2">
                                        <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                        <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                        <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                        <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                        <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                        <span className="text-black">0 avis</span>
                                    </div>
                                    <span className="italic text-slate-400 text-xs mb-2">Livré le 31/01/2024</span>
                                    <div className="flex flex-col mb-2">
                                        <span className="text-slate-700 text-sm mb-2"><FontAwesomeIcon className="mr-2" icon={faTruck} />Livraison dans toute la France</span>
                                        <span className="text-slate-700 text-sm mb-2"><FontAwesomeIcon className="mr-2" icon={faMoneyBillTransfer} />Payez en espèce</span>
                                    </div>
                                    <span className="self-end mb-2 text-xl lg:text-2xl text-red-600 font-bold">15€</span>
                                    <div className="w-full mt-4 flex justify-between">
                                        <Link className="text-white font-bold bg-amber-800 text-xs lg:text-[1rem] py-2 px-4 rounded-3xl" href={"#"}>Commerce</Link>
                                        <button className="text-white font-bold bg-cyan-800 text-xs lg:text-[1rem] py-2 px-4 rounded-3xl">+Ajouter</button>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full lg:w-1/5 px-4">
                                <div className="bg-white p-4 my-4 lg:my-0 flex flex-col items-center relative">
                                    <div className="h-20 w-20 rounded-full bg-orange-500 mb-2">
                                        <img src={productImg} alt="" />
                                    </div>
                                    <h3 className="uppercase font-bold mb-2 text-sm lg:text-xl">Huile rouge</h3>
                                    <small className="bg-green-600 p-1 rounded-2xl text-white absolute -top-2 left-0">Disponible</small>
                                    <div className="text-yellow-300 mb-2">
                                        <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                        <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                        <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                        <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                        <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                        <span className="text-black">0 avis</span>
                                    </div>
                                    <span className="italic text-slate-400 text-xs mb-2">Livré le 31/01/2024</span>
                                    <div className="flex flex-col mb-2">
                                        <span className="text-slate-700 text-sm mb-2"><FontAwesomeIcon className="mr-2" icon={faTruck} />Livraison dans toute la France</span>
                                        <span className="text-slate-700 text-sm mb-2"><FontAwesomeIcon className="mr-2" icon={faMoneyBillTransfer} />Payez en espèce</span>
                                    </div>
                                    <span className="self-end mb-2 text-xl lg:text-2xl text-red-600 font-bold">15€</span>
                                    <div className="w-full mt-4 flex justify-between">
                                        <Link className="text-white font-bold bg-amber-800 text-xs lg:text-[1rem] py-2 px-4 rounded-3xl" href={"#"}>Commerce</Link>
                                        <button className="text-white font-bold bg-cyan-800 text-xs lg:text-[1rem] py-2 px-4 rounded-3xl">+Ajouter</button>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full lg:w-1/5 px-4">
                                <div className="bg-white p-4 my-4 lg:my-0 flex flex-col items-center relative">
                                    <div className="h-20 w-20 rounded-full bg-orange-500 mb-2">
                                        <img src={productImg} alt="" />
                                    </div>
                                    <h3 className="uppercase font-bold mb-2 text-sm lg:text-xl">Pkolo</h3>
                                    <small className="bg-green-600 p-1 rounded-2xl text-white absolute -top-2 left-0">Disponible</small>
                                    <div className="text-yellow-300 mb-2">
                                        <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                        <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                        <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                        <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                        <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                        <span className="text-black">0 avis</span>
                                    </div>
                                    <span className="italic text-slate-400 text-xs mb-2">Livré le 31/01/2024</span>
                                    <div className="flex flex-col mb-2">
                                        <span className="text-slate-700 text-sm mb-2"><FontAwesomeIcon className="mr-2" icon={faTruck} />Livraison dans toute la France</span>
                                        <span className="text-slate-700 text-sm mb-2"><FontAwesomeIcon className="mr-2" icon={faMoneyBillTransfer} />Payez en espèce</span>
                                    </div>
                                    <span className="self-end mb-2 text-xl lg:text-2xl text-red-600 font-bold">15€</span>
                                    <div className="w-full mt-4 flex justify-between">
                                        <Link className="text-white font-bold bg-amber-800 text-xs lg:text-[1rem] py-2 px-4 rounded-3xl" href={"#"}>Commerce</Link>
                                        <button className="text-white font-bold bg-cyan-800 text-xs lg:text-[1rem] py-2 px-4 rounded-3xl">+Ajouter</button>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full lg:w-1/5 px-4">
                                <div className="bg-white p-4 my-4 lg:my-0 flex flex-col items-center relative">
                                    <div className="h-20 w-20 rounded-full bg-orange-500 mb-2">
                                        <img src={productImg} alt="" />
                                    </div>
                                    <h3 className="uppercase font-bold mb-2 text-sm lg:text-xl">Gombo</h3>
                                    <small className="bg-green-600 p-1 rounded-2xl text-white absolute -top-2 left-0">Disponible</small>
                                    <div className="text-yellow-300 mb-2">
                                        <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                        <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                        <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                        <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                        <i className="text-xs"><FontAwesomeIcon className="mr-2" icon={faStar} /></i>
                                        <span className="text-black">0 avis</span>
                                    </div>
                                    <span className="italic text-slate-400 text-xs mb-2">Livré le 31/01/2024</span>
                                    <div className="flex flex-col mb-2">
                                        <span className="text-slate-700 text-sm mb-2"><FontAwesomeIcon className="mr-2" icon={faTruck} />Livraison dans toute la France</span>
                                        <span className="text-slate-700 text-sm mb-2"><FontAwesomeIcon className="mr-2" icon={faMoneyBillTransfer} />Payez en espèce</span>
                                    </div>
                                    <span className="self-end mb-2 text-xl lg:text-2xl text-red-600 font-bold">15€</span>
                                    <div className="w-full mt-4 flex justify-between">
                                        <Link className="text-white font-bold bg-amber-800 text-xs lg:text-[1rem] py-2 px-4 rounded-3xl" href={"#"}>Commerce</Link>
                                        <button className="text-white font-bold bg-cyan-800 text-xs lg:text-[1rem] py-2 px-4 rounded-3xl">+Ajouter</button>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Store