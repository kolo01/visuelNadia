import React, { useState } from 'react'

import secureLocalStorage from 'react-secure-storage'
import { Box, Center, Flex, Image, Input, InputGroup, InputRightAddon, SimpleGrid, Link,Text } from "@chakra-ui/react";
import Navbar from '@/components/Navbar';
import InputBar from '../components/InputBar'
import {
    useMediaQuery
  } from "@chakra-ui/react";

function IntermediatePage() {
    const [isLagerThan768] = useMediaQuery("(min-width: 768px)");

    const marketType = [
        "Epicerie",
        "Textile",
        "Restaurant",
        "Cosmetique",
        "Commerce de meches",
        "Fret",
        "Salon de Coiffure",
    ];
    
    const selectMarketType = () => {

    }

    return (
        <div className="intermediate-page">
            {/* <Navbar/> */}
            <InputBar />
            {isLagerThan768 ? <Navbar></Navbar> : null}
            <div className="container" id='container'>
                <div className="title" id='title'>
                    {/* <h1>Nos commerces</h1> */}
                </div>

                <div className="commerce-types" id='commerce-types'>
                    {/* {marketType.map(() => ())} */}
                    <Link href="/otherContent/intermed2" className='text' onClick={() => { secureLocalStorage.setItem("service", marketType[0])}}>
                        <h2>Epicerie</h2>
                        <Image src="./intermediate-img/epicerie.png" alt="Logo" />
                    </Link>
                    <Link href="/otherContent/intermed2" className='text' onClick={() => secureLocalStorage.setItem("service", marketType[1])}>
                        <h2>Cosmétique</h2>
                        <Image src="./intermediate-img/cosmetics-icon.png" alt="Logo" /></Link>
                    <Link href="/otherContent/intermed2" className='text' onClick={() => secureLocalStorage.setItem("service", marketType[2])}>
                        <h2>Fret</h2>
                        <Image src="./intermediate-img/avionn.png" alt="Logo" />
                    </Link>
                    <Link href="/otherContent/intermed2" className='text' onClick={() => secureLocalStorage.setItem("service", marketType[3])}>
                        <h2>Restaurant</h2>
                        <Image src="./intermediate-img/nourriture.png" alt="Logo" />
                    </Link>
                    <Link href="/otherContent/intermed2" className='text' onClick={() => secureLocalStorage.setItem("service", marketType[4])}>
                        <h2>Textille</h2>
                        <Image src="./intermediate-img/textile.jpg" alt="Logo" />
                    </Link>
                    <Link href="/otherContent/intermed2" className='text' onClick={() => secureLocalStorage.setItem("service", marketType[5])}>
                        <h2>Mèche/Tissage</h2>
                        <Image src="./intermediate-img/perruques.png" alt="Logo" />
                    </Link>
                    <Link href="/otherContent/intermed2" className='text' onClick={() => secureLocalStorage.setItem("service", marketType[6])}>
                        <h2>Coiffure</h2>
                        <Image src="./intermediate-img/coiffuree.jpg" alt="Logo" />
                    </Link> 
                </div>
            </div>
        </div>
    )
}

export default IntermediatePage