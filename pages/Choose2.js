import InputBar from "@/components/InputBar";
import Navbar from "@/components/Navbar";
import FooterR from "@/components/footerResponsif";
import { Button, Center, Flex, Link, useMediaQuery } from "@chakra-ui/react";
import Head from "next/head";
export default function Intermediary() {
  const [isLagerThan768] = useMediaQuery("(min-width: 768px)");

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
      <InputBar />
      {isLagerThan768 ? <Navbar></Navbar> : <></>}
      <Center mt={"15%"} mb="20%">
        <Flex>
          <Link
            href={"/Connexion"}
            _hover={{
              textDecoration: "none",
            }}
          >
            <Button mr={10} bgColor={"cyan.50"} _hover={{
              bgColor:"cyan.700"
            }}>
              Connexion Client
            </Button>
          </Link>
          <Link
            href={"https://chapbackofficefournisseur.vercel.app/"}
            isExternal
            mr={10}
            _hover={{
                textDecoration: "none",
              }}
          >
            <Button bgColor={"cyan.50"} _hover={{
              bgColor:"cyan.700"
            }}>Connexion Partenaire</Button>
          </Link>
          <Link
            href="https://chapbackofficelivreur-regz6oep6-josiassehi-rschainnet.vercel.app/"
            isExternal
            mr={10}
            _hover={{
                textDecoration: "none",
              }}
          >
            <Button bgColor={"cyan.50"} _hover={{
              bgColor:"cyan.700"
            }}>Connexion Livreur</Button>
          </Link>
        </Flex>
      </Center>
      <FooterR/>
    </>
  );
}
