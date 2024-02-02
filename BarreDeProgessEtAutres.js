
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faSearch, faPlaneDeparture } from '@fortawesome/free-solid-svg-icons'

<nav className="css-1a4ibax m-10">
                        <section className="step-wizard">
                            <ul className="step-wizard-list">
                                <li className="step-wizard-item  max-[780px]:-ml-10">
                                    <span className="progress-count">1</span>
                                    <span className="progress-label max-[780px]:w-full max-[780px]:whitespace-nowrap max-[780px]:">Sélection de service</span>
                                </li>
                                <li className="step-wizard-item current-item  max-[780px]:-ml-10">
                                    <span className="progress-count">2</span>
                                    <span className="progress-label max-[780px]:hidden">Détails de l’expédition</span>
                                </li>
                                <li className="step-wizard-item">
                                    <span className="progress-count">3</span>
                                    <span className="progress-label max-[780px]:hidden">Détails de l’adresse</span>
                                </li>
                                <li className="step-wizard-item">
                                    <span className="progress-count">4</span>
                                    <span className="progress-label max-[780px]:hidden">Détails de paiement</span>
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
                                            {/* <Image className="w-40 max-[768px]:w-20" src="airplane.jpg" alt={"image Avion"}/> */}
                                            <FontAwesomeIcon icon={faPlaneDeparture} className='size-10 text-cyan-800'/>
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
                                            <FontAwesomeIcon icon={faPlaneDeparture} className='size-10 text-cyan-800'/>
                                            {/* <Image className="w-40 max-[768px]:w-20" src="airplane.jpg" alt={"image Avion"}/> */}
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
                                <div className="w-full flex justify-evenly max-[768px]: max-[768px]:flex-col max-[768px]:p-2 max-[780px]:">
                                    <div className="flex justify-between items-center max-[780px]:flex-col">
                                        <div className="flex flex-col py-4 px-12 gap-4 bg-orange-600 rounded-tl-lg max-[768px]:p2 max-[768px]:flex-row max-[768px]: max-[768px]:rounded-br-xl">
                                            <div className="flex flex-col justify-center items-start text-white max-[768px]:flex-row">
                                                <strong className="text-[3rem] max-[768px]:text-xl max-[768px]:-mt-1">3</strong>
                                                <small className="font-bold max-[768px]:ml-2">Semaines</small>
                                            </div>
                                            <span className="text-white font-bold text-[0.8rem] -mt-4 max-[768px]:-mt-0">Estimés</span>
                                        </div>
                                        <div className="flex flex-col justify-center items-center gap-2 mr-10 ml-10 max-[768px]:ml-0 max-[768px]:mr-4 max-[768px]:mt-4">
                                            {/* <Image className="w-40 max-[768px]:w-20" src="airplane.jpg" alt={"image Avion"}/> */}
                                            <FontAwesomeIcon icon={faPlaneDeparture} className='size-10 text-cyan-800'/>
                                            <h2 className="">CHAP</h2>
                                        </div>
                                    </div>
                                    <div className="w-full flex justify-between items-center max-[780px]:max-[780px]:items-start max-[780px]:gap-4">
                                        <div className="flex flex-col gap-2">
                                            <span className="font-bold">Retrait</span>{/** Date de retrait estimée*/}
                                            <span>{dateDep}</span>
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <span className="font-bold">Départ</span>
                                            <span>{dateDep}</span>
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <span className="font-bold">Livraison{" "}</span>
                                            <span>{dateExp3}{" "}</span>
                                        </div>
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
                    </DrawerBody>