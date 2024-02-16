import React from 'react'
import Link from "next/link";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoneyBillTransfer, faTruck, faStar } from '@fortawesome/free-solid-svg-icons'

function Store() {

    const cards = [
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


    return (
        <>
            <header className="py-10 bg-slate-100">
                <div className='container mx-auto flex justify-center items-center'>
                    <div className="w-[40%] h-[28rem] bg-slate-200 flex justify-center items-center">
                        <h1 className='text-6xl text-orange-600'>Image ici !</h1>
                    </div>
                </div>
            </header>
            <section className="py-10 bg-gray-200 w-full">
                <div className='container mx-auto bg-orange-200'>
                    <div className="flex flex-col justify-between">
                        <div className="flex justify-between mb-4">
                            <h2 className="text-2xl font-bold">Epicerie</h2>
                            <Link className="text-xs font-bold underline" href={"#"}>Voir plus</Link>
                        </div>
                        <div className="flex -mx-4">
                            <div className="w-1/5 px-4">
                                <div className="bg-white p-4 flex flex-col items-center relative">
                                    <div className="h-20 w-20 rounded-full bg-orange-500 mb-2"></div>
                                    <h3 className="uppercase font-bold mb-2">vitefè</h3>
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
                                    <span className="self-end mb-2 text-2xl text-red-600 font-bold">15€</span>
                                    <div className="w-full mt-4 flex justify-between">
                                        <Link className="text-white font-bold bg-amber-800 py-2 px-4 rounded-3xl" href={"#"}>Commerce</Link>
                                        <button className="text-white font-bold bg-cyan-800 py-2 px-4 rounded-3xl">+Ajouter</button>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="w-1/5 px-4">
                                <div className="bg-white p-4 flex flex-col items-center relative">
                                    <div className="h-20 w-20 rounded-full bg-orange-500 mb-2"></div>
                                    <h3 className="uppercase font-bold mb-2">Attieke</h3>
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
                                    <div className="flex flex-col mb-2"> {/**Les produits congélés, île de france */}
                                        <span className="text-slate-700 text-sm mb-2"><FontAwesomeIcon className="mr-2" icon={faTruck} />Livraison dans l`île de France</span>
                                        <span className="text-slate-700 text-sm mb-2"><FontAwesomeIcon className="mr-2" icon={faMoneyBillTransfer} />Payez en espèce</span>
                                    </div>
                                    <span className="self-end mb-2 text-2xl text-red-600 font-bold">15€</span>
                                    <div className="w-full mt-4 flex justify-between">
                                        <Link className="text-white font-bold bg-amber-800 py-2 px-4 rounded-3xl" href={"#"}>Commerce</Link>
                                        <button className="text-white font-bold bg-cyan-800 py-2 px-4 rounded-3xl">+Ajouter</button>
                                    </div>
                                </div>
                            </div>

                            <div className="w-1/5 px-4">
                                <div className="bg-white p-4 flex flex-col items-center relative">
                                    <div className="h-20 w-20 rounded-full bg-orange-500 mb-2"></div>
                                    <h3 className="uppercase font-bold mb-2">Huile rouge</h3>
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
                                    <span className="self-end mb-2 text-2xl text-red-600 font-bold">15€</span>
                                    <div className="w-full mt-4 flex justify-between">
                                        <Link className="text-white font-bold bg-amber-800 py-2 px-4 rounded-3xl" href={"#"}>Commerce</Link>
                                        <button className="text-white font-bold bg-cyan-800 py-2 px-4 rounded-3xl">+Ajouter</button>
                                    </div>
                                </div>
                            </div>

                            <div className="w-1/5 px-4">
                                <div className="bg-white p-4 flex flex-col items-center relative">
                                    <div className="h-20 w-20 rounded-full bg-orange-500 mb-2"></div>
                                    <h3 className="uppercase font-bold mb-2">Pkolo</h3>
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
                                    <span className="self-end mb-2 text-2xl text-red-600 font-bold">15€</span>
                                    <div className="w-full mt-4 flex justify-between">
                                        <Link className="text-white font-bold bg-amber-800 py-2 px-4 rounded-3xl" href={"#"}>Commerce</Link>
                                        <button className="text-white font-bold bg-cyan-800 py-2 px-4 rounded-3xl">+Ajouter</button>
                                    </div>
                                </div>
                            </div>

                            <div className="w-1/5 px-4">
                                <div className="bg-white p-4 flex flex-col items-center relative">
                                    <div className="h-20 w-20 rounded-full bg-orange-500 mb-2"></div>
                                    <h3 className="uppercase font-bold mb-2">Gombo</h3>
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
                                    <span className="self-end mb-2 text-2xl text-red-600 font-bold">15€</span>
                                    <div className="w-full mt-4 flex justify-between">
                                        <Link className="text-white font-bold bg-amber-800 py-2 px-4 rounded-3xl" href={"#"}>Commerce</Link>
                                        <button className="text-white font-bold bg-cyan-800 py-2 px-4 rounded-3xl">+Ajouter</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col justify-between mt-10">
                        <div className="flex justify-between mb-4">
                            <h2 className="text-2xl font-bold">Textile</h2>
                            <Link className="text-xs font-bold underline" href={"#"}>Voir plus</Link>
                        </div>
                        <div className="flex -mx-4">
                            <div className="w-1/5 px-4">
                                <div className="bg-white p-4 flex flex-col items-center relative">
                                    <div className="h-20 w-20 rounded-full bg-orange-500 mb-2"></div>
                                    <h3 className="uppercase font-bold mb-2">vitefè</h3>
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
                                    <span className="self-end mb-2 text-2xl text-red-600 font-bold">15€</span>
                                    <div className="w-full mt-4 flex justify-between">
                                        <Link className="text-white font-bold bg-amber-800 py-2 px-4 rounded-3xl" href={"#"}>Commerce</Link>
                                        <button className="text-white font-bold bg-cyan-800 py-2 px-4 rounded-3xl">+Ajouter</button>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="w-1/5 px-4">
                                <div className="bg-white p-4 flex flex-col items-center relative">
                                    <div className="h-20 w-20 rounded-full bg-orange-500 mb-2"></div>
                                    <h3 className="uppercase font-bold mb-2">Attieke</h3>
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
                                    <span className="self-end mb-2 text-2xl text-red-600 font-bold">15€</span>
                                    <div className="w-full mt-4 flex justify-between">
                                        <Link className="text-white font-bold bg-amber-800 py-2 px-4 rounded-3xl" href={"#"}>Commerce</Link>
                                        <button className="text-white font-bold bg-cyan-800 py-2 px-4 rounded-3xl">+Ajouter</button>
                                    </div>
                                </div>
                            </div>

                            <div className="w-1/5 px-4">
                                <div className="bg-white p-4 flex flex-col items-center relative">
                                    <div className="h-20 w-20 rounded-full bg-orange-500 mb-2"></div>
                                    <h3 className="uppercase font-bold mb-2">Huile rouge</h3>
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
                                    <span className="self-end mb-2 text-2xl text-red-600 font-bold">15€</span>
                                    <div className="w-full mt-4 flex justify-between">
                                        <Link className="text-white font-bold bg-amber-800 py-2 px-4 rounded-3xl" href={"#"}>Commerce</Link>
                                        <button className="text-white font-bold bg-cyan-800 py-2 px-4 rounded-3xl">+Ajouter</button>
                                    </div>
                                </div>
                            </div>

                            <div className="w-1/5 px-4">
                                <div className="bg-white p-4 flex flex-col items-center relative">
                                    <div className="h-20 w-20 rounded-full bg-orange-500 mb-2"></div>
                                    <h3 className="uppercase font-bold mb-2">Pkolo</h3>
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
                                    <span className="self-end mb-2 text-2xl text-red-600 font-bold">15€</span>
                                    <div className="w-full mt-4 flex justify-between">
                                        <Link className="text-white font-bold bg-amber-800 py-2 px-4 rounded-3xl" href={"#"}>Commerce</Link>
                                        <button className="text-white font-bold bg-cyan-800 py-2 px-4 rounded-3xl">+Ajouter</button>
                                    </div>
                                </div>
                            </div>

                            <div className="w-1/5 px-4">
                                <div className="bg-white p-4 flex flex-col items-center relative">
                                    <div className="h-20 w-20 rounded-full bg-orange-500 mb-2"></div>
                                    <h3 className="uppercase font-bold mb-2">Gombo</h3>
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
                                    <span className="self-end mb-2 text-2xl text-red-600 font-bold">15€</span>
                                    <div className="w-full mt-4 flex justify-between">
                                        <Link className="text-white font-bold bg-amber-800 py-2 px-4 rounded-3xl" href={"#"}>Commerce</Link>
                                        <button className="text-white font-bold bg-cyan-800 py-2 px-4 rounded-3xl">+Ajouter</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col justify-between mt-10">
                        <div className="flex justify-between mb-4">
                            <h2 className="text-2xl font-bold">Cosmetique</h2>
                            <Link className="text-xs font-bold underline" href={"#"}>Voir plus</Link>
                        </div>
                        <div className="flex -mx-4">
                            <div className="w-1/5 px-4">
                                <div className="bg-white p-4 flex flex-col items-center relative">
                                    <div className="h-20 w-20 rounded-full bg-orange-500 mb-2"></div>
                                    <h3 className="uppercase font-bold mb-2">vitefè</h3>
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
                                    <span className="self-end mb-2 text-2xl text-red-600 font-bold">15€</span>
                                    <div className="w-full mt-4 flex justify-between">
                                        <Link className="text-white font-bold bg-amber-800 py-2 px-4 rounded-3xl" href={"#"}>Commerce</Link>
                                        <button className="text-white font-bold bg-cyan-800 py-2 px-4 rounded-3xl">+Ajouter</button>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="w-1/5 px-4">
                                <div className="bg-white p-4 flex flex-col items-center relative">
                                    <div className="h-20 w-20 rounded-full bg-orange-500 mb-2"></div>
                                    <h3 className="uppercase font-bold mb-2">Attieke</h3>
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
                                    <span className="self-end mb-2 text-2xl text-red-600 font-bold">15€</span>
                                    <div className="w-full mt-4 flex justify-between">
                                        <Link className="text-white font-bold bg-amber-800 py-2 px-4 rounded-3xl" href={"#"}>Commerce</Link>
                                        <button className="text-white font-bold bg-cyan-800 py-2 px-4 rounded-3xl">+Ajouter</button>
                                    </div>
                                </div>
                            </div>

                            <div className="w-1/5 px-4">
                                <div className="bg-white p-4 flex flex-col items-center relative">
                                    <div className="h-20 w-20 rounded-full bg-orange-500 mb-2"></div>
                                    <h3 className="uppercase font-bold mb-2">Huile rouge</h3>
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
                                    <span className="self-end mb-2 text-2xl text-red-600 font-bold">15€</span>
                                    <div className="w-full mt-4 flex justify-between">
                                        <Link className="text-white font-bold bg-amber-800 py-2 px-4 rounded-3xl" href={"#"}>Commerce</Link>
                                        <button className="text-white font-bold bg-cyan-800 py-2 px-4 rounded-3xl">+Ajouter</button>
                                    </div>
                                </div>
                            </div>

                            <div className="w-1/5 px-4">
                                <div className="bg-white p-4 flex flex-col items-center relative">
                                    <div className="h-20 w-20 rounded-full bg-orange-500 mb-2"></div>
                                    <h3 className="uppercase font-bold mb-2">Pkolo</h3>
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
                                    <span className="self-end mb-2 text-2xl text-red-600 font-bold">15€</span>
                                    <div className="w-full mt-4 flex justify-between">
                                        <Link className="text-white font-bold bg-amber-800 py-2 px-4 rounded-3xl" href={"#"}>Commerce</Link>
                                        <button className="text-white font-bold bg-cyan-800 py-2 px-4 rounded-3xl">+Ajouter</button>
                                    </div>
                                </div>
                            </div>

                            <div className="w-1/5 px-4">
                                <div className="bg-white p-4 flex flex-col items-center relative">
                                    <div className="h-20 w-20 rounded-full bg-orange-500 mb-2"></div>
                                    <h3 className="uppercase font-bold mb-2">Gombo</h3>
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
                                    <span className="self-end mb-2 text-2xl text-red-600 font-bold">15€</span>
                                    <div className="w-full mt-4 flex justify-between">
                                        <Link className="text-white font-bold bg-amber-800 py-2 px-4 rounded-3xl" href={"#"}>Commerce</Link>
                                        <button className="text-white font-bold bg-cyan-800 py-2 px-4 rounded-3xl">+Ajouter</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Store