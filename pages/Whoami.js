import InputBar from "@/components/InputBar";
import Navbar from "@/components/Navbar";
import {
  Box,
  Center,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import Head from "next/head";
export default function Who() {
  const [isLagerThan768] = useMediaQuery("(min-width: 768px)");
  const a1 = "L’App";

  const a2 = "d’offrir";
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
      <Navbar></Navbar>
      
        <Box width={"90%"} display={"grid"}>
          <SimpleGrid columns={[1,1,1,2,2]}>
          <Box width={"100%"}>
          <Image src="./logo1.png" alt="logo de chap" />
          </Box>
          
          <Box mt={20}>
            <Heading>Qui Sommes Nous?</Heading>
            <Text textAlign={"justify"} fontSize={"1em"} mt={5}>
              {a1} Chap est un produit français qui a été conçu en France et
              développé en Côte d’Ivoire par notre partenaire RSCHAIN. Née(crée)
              dans l’objectif d’améliorer le quotidien des africains de la
              diaspora, {a1} Chap propose le rapprochement de cette dernière
              (Diaspora) par la mise en vente de produits alimentaires,
              esthétiques, de vêtements et d’objet d’arts africains, tout en
              faisant la promotion de la diversité culinaire africaine. Chap
              agit ainsi comme intermédiaire entre les commerçants et les
              clients dans le but de booster le commerce des moyens artisans,
              afin {a2} aux clients plus de choix de sorte à maximiser ses
              économies.{" "}
            </Text>
          </Box>
          </SimpleGrid>
        </Box>
    
    </>
  );
}
