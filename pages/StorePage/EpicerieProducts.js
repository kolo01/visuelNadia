import React, { useEffect, useState } from 'react'
import { db2 } from "@/FIREBASE/clientApp";
import { onValue, ref } from "@firebase/database";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoneyBillTransfer, faTruck, faStar } from '@fortawesome/free-solid-svg-icons'
import Link from "next/link";
import bgImg from '../StorePage/legumes.jpg'

function EpicerieProducts() {

    const [epicerieDetails, setEpicerieDetails] = useState([])
    const [image, setImage] = useState()


    const getEpicerieMarkets = async () => {
        let datas = ref(db2, "/Epicerie/Massy Market");
        onValue(datas, snapshot => {
            const data = snapshot.val()
            setEpicerieDetails(data)
            console.log("les datas ::: ", data);
            for(let epice in data) {
                // console.log("epicerie[epice] ::", data[epice].imageUrl);
                setImage(data[epice].imageUrl)
            }
        })
    }

    useEffect(() => {
        getEpicerieMarkets()
    }, [])


    return (
        <> {/**btn commerce dirige vers le commerce de la categorie */}
            <section className="py-10 bg-gray-100 w-full">
                <div className='container mx-auto px-4 lg:px-0'>
                    <div className="flex flex-col justify-between">
                        <div className="mb-14 ">
                            <h1 className='text-center text-2xl lg:text-4xl font-bold'>Tous nos produits du marché d{"'"}épicerie.</h1>
                            <img src={bgImg} alt="" />
                        </div>
                        <div className="flex -mx-4 flex-wrap">{/** overflow-x-scroll*/}
                            {epicerieDetails && epicerieDetails !== "" ?
                                Object.values(epicerieDetails).map((order, index) => (
                                    <div key={index} className="w-full lg:w-1/5 px-4">
                                        <div className="bg-white p-4 flex flex-col mb-10 items-center relative">{/** my-4 lg:my-0  */}
                                            <div className="h-20 w-20 rounded-full mb-2"> {/** bg-orange-500 */}
                                                <img className="h-20 w-20" src={order.imageUrl} alt="" />
                                            </div>
                                            <h3 className="uppercase font-bold mb-2 text-xs lg:text-sm">{order.nom}</h3>
                                            <small className="bg-green-600 p-1 rounded-2xl capitalize text-white absolute -top-2 left-0">{order.etat}</small>
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
                                            <span className="self-end mb-2 text-xl lg:text-2xl text-red-600 font-bold">{order.prix}€</span>
                                            <div className="w-full mt-4 flex justify-between">
                                                <Link className="text-white font-bold bg-amber-800 text-xs lg:text-[1rem] py-2 px-4 rounded-3xl" href={"#"}>Commerce</Link>
                                                <button className="text-white font-bold bg-cyan-800 text-xs lg:text-[1rem] py-2 px-4 rounded-3xl">+Ajouter</button>
                                            </div>
                                        </div>
                                    </div>
                                )): (
                                <p>Aucune donnee</p>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default EpicerieProducts