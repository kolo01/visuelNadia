import { db } from "@/FIREBASE/clientApp";
import { Box, Flex, Link, SimpleGrid, Text } from "@chakra-ui/react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import DataTable from "datatables.net-dt";
import secureLocalStorage from "react-secure-storage";
import Head from "next/head";
export default function Exemple() {
  const [imageUrl, setImageUrl] = useState([]);
  const [adresse, setAdresse] = useState([]);
  const [numero, setNumero] = useState([]);
  const [nom, setNom] = useState([]);
  const [categorie, setCategorie] = useState([]);
  const [service, setService] = useState([]);
  const [datas, setDatas] = useState(0);
  const router = useRouter();

  const update = async (serv) => {
    // console.log(serv);
    const q = query(collection(db, "Admin"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      adresse.push(doc.data().adresse);
      imageUrl.push(doc.data().imageUrl);
      numero.push(doc.data().number);
      nom.push(doc.data().organisation);
      categorie.push(doc.data().categorie);
      // console.log("okay");
    });
    setDatas(1);
  };

  useEffect(() => {
    if (datas == 0) {
      setService(secureLocalStorage.getItem("service"));
      update(service);
    }
  }, [datas, update, service]);

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
 
      <SimpleGrid
      
        columns={[2, 2, 2, 3, 4]}
        spacing={2}
        width={"100%"}
        mt={10}
        ml={[10, 10, 10, 20, 20]}
      >
        {/* {console.log("launched")} */}
        {categorie.map((data, index) => (
          <Box
            key={index}
            height={["50%", "20vh", "20vh", "20vh", "20vh"]}
            width={{ base: "70%", md: "45%" }}
            marginBottom={40}
            mr={5}
            borderRadius={[10,10,50,50,50]}
          >
            <Link
              height={"15vh"}
              width={{ base: "80%", md: "30%" }}
              mt={5}
              mb={5}
              onClick={() => {
                sessionStorage.setItem("savefrom", numero[index]),
                  sessionStorage.setItem("image", imageUrl[index]),
                  sessionStorage.setItem("nom", nom[index]),
                  sessionStorage.setItem("adresse", adresse[index]),
                  sessionStorage.setItem("categorie", categorie[index]);
              }}
              mr={{ base: "0%", md: "0%" }}
              _hover={{ textDecoration: "none" }}
              href={"/otherContent/intermed1"}
            >
              <Flex
                height={"100%"}
                width={"100%"}
                alignItems={"center"}
                justifyContent={"center"}
                borderRadius={50}
                backgroundImage={imageUrl[index]}
                backgroundPosition={"center"}
                backgroundSize={"cover"}
                backgroundRepeat={"no-repeat"}
              >
                <Flex
                  alignItems={"center"}
                  justifyContent={"center"}
                  borderRadius={50}
                  height={"100%"}
                  width={"100%"}
                  bg={"rgba(0, 0, 0, 0.277)"}
                >
                  <Text fontSize={"xl"} color={"#fff"} textAlign={"center"}>
                    {nom[index]}
                  </Text>
                </Flex>
              </Flex>
            </Link>
            <Box>
              <Text as={"h4"} pb={5} align={"center"}>
                {adresse[index]}
              </Text>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    
     
    </>
  );
}
