import HeaderBar from '@/components/inscription/HeaderBar';
import Navbar from "@/components/Navbar";
import InputBar from "@/components/InputBar";
import { useMediaQuery } from "@chakra-ui/react";
import SignUpForm from '@/components/inscription/SignUpForm';
import { Box } from '@chakra-ui/react';
import React from 'react';
import Head from "next/head";
// import ScriptComponent from '../components/ScriptComponent';
const Inscription = () => {
    
    const [isLagerThan768] = useMediaQuery('(min-width: 768px)')
    return (
        <>
        <Head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-RFSVQTGJ87"
        ></script>
        <script strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments)}
           gtag('js', new Date()); 
           gtag('config', 'G-RFSVQTGJ87');
           `}
          
        </script>
        </Head>
            <Box
                width={'100%'}
                height={'auto'}
                pb={20}
            >
                {/* <HeaderBar /> */}
                <InputBar />
      {isLagerThan768 ? <Navbar></Navbar> : <></>}
                <SignUpForm />
                {/* <ScriptComponent /> */} 
            </Box>
        </>
    );
};

export default Inscription;