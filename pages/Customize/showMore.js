import InputBar from "@/components/InputBar";
import Tested2 from "./Independ";
import Navbar from "@/components/Navbar";
import Head from "next/head";
export default function ShowMore(){
    return(
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
        <InputBar />
        <Navbar />
        <Tested2/>
        </>
    )
}