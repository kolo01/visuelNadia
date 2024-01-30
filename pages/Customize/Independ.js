import { db } from "@/FIREBASE/clientApp";
import FooterR from "@/components/footerResponsif";
import { Box, Button, Center, Flex, Heading, Link, Select, SimpleGrid, Text } from "@chakra-ui/react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useRouter } from "next/router";
import React, {useState,useEffect} from "react"
import secureLocalStorage from "react-secure-storage";
import Head from "next/head";
const PagButton = (props) => {
    const activeStyle = {
      bg: "brand.600",
      _dark: {
        bg: "brand.500",
      },
      color: "white",
    };
    return (
      <Button
        mx={1}
        px={4}
        py={2}
        rounded="md"
        bg="white"
        color="gray.700"
        _dark={{
          color: "white",
          bg: "gray.800",
        }}
        opacity={props.disabled && 0.6}
        _hover={!props.disabled && activeStyle}
        cursor={props.disabled && "not-allowed"}
        {...(props.active && activeStyle)}
      >
        {props.children}
      </Button>
    );
  };
export default function Tested(){
   const router = useRouter()
    
    const [imageUrl, setImageUrl] = useState([]);
    const [adresse, setAdresse] = useState([]);
    const [numero, setNumero] = useState([]);
    const [nom, setNom] = useState([]);
    const [categorie, setCategorie] = useState([]);
    const [datas, setDatas] = useState(0);
    const [count, setCount] = useState(0);




    // pagination element
    const [tout,setTout] = useState([])
    const [etat,setEtat] = useState(true)
    const [etat1,setEtat1] = useState(false)
    const [parPage,setParpage] = useState(8)
    const [actu, setActu] = useState(1)
    const TotalPage = Math.ceil(tout.length/parPage)
    // numero.push(Math.ceil(tout.length/parPage))
    const pages = [...Array(TotalPage + 1).keys()].slice(1)
   
    const dernier = (actu * parPage );
    const premier = dernier - (parPage);
    const visible = tout.slice(premier, dernier)
    
function Next() {
  if (actu == 0) {
    setEtat(true)
  }
    if (actu == 1   ) {
      setEtat(true)
    }else{setEtat(false)}
    
    if (actu == TotalPage ) {
        setEtat1(true)
    }else{setEtat1(false)}
}

const Get = async ()=>{
  
    if (datas==0 || num == undefined || num == null) {
        const q = query(collection(db, "Admin"), where("categorie","==", `${secureLocalStorage.getItem("service")}`), where("codePostal","==", `${secureLocalStorage.getItem("postal")}`),orderBy("organisation"));
      
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // adresse.push(doc.data().adresse);
    //   imageUrl.push(doc.data().imageUrl);
    //   numero.push(doc.data().number);
    //   nom.push(doc.data().organisation);
    //   categorie.push(doc.data().categorie);
    //  console.log(doc.data().description)
  
      tout.push(doc.data())
      
    })
  }
    setDatas(1);
  
    
}
useEffect( ()=>{
  setCategorie(secureLocalStorage.getItem("service"))
    if (datas == 0) {
      
   Get();
 
   Next();
  
    }
    
},[Get,datas,Next])



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
  
    {/* <Flex
      bg="#edf3f8"
      _dark={{
        bg: "#3e3e3e",
      }}
      p={50}
      w="full"
      alignItems="center"
      justifyContent="center"
    >
      <Flex>
        <PagButton disabled>previous</PagButton>
       {pages.map(page=> <Box _active={{bgColor:"red"}}><PagButton key={page} >{page}</PagButton></Box>)}
        <PagButton>Next</PagButton>
      </Flex>
    </Flex> */}
        <SimpleGrid
        
          columns={[2, 2, 2, 3, 4]}
          spacing={2}
          width={"100%"}
          mt={10}
          ml={[10, 10, 10, 20, 20]}
        >
         
          {visible.map((data, index) => (
           
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
               
                mr={{ base: "0%", md: "0%" }}
                _hover={{ textDecoration: "none" }}
                href={`/otherContent/intermed1?categorie=${data.categorie}&magasin=${data.organisation}`}
              >
                <Flex
                  height={"100%"}
                  width={"100%"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  borderRadius={50}
                  backgroundImage={data.imageUrl}
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
                      { data.organisation}
                    </Text>
                  </Flex>
                </Flex>
              </Link>
              <Box>
                <Text as={"h4"} pb={5} align={"center"}>
                    { data.adresse}
                </Text>
              </Box>
              
            </Box>
            
          ))}
        </SimpleGrid>
        {/* {numero[4] == 1 ? <>
          
        </>:<> */}
        <Center><Flex alignItems={"center"} justifyContent={"space-around"} >
        <Box><Text>Vous êtes sur la page {actu}</Text></Box>
         <Box ml={10}> <Select onChange={(e)=>setParpage(e.target.value)} width={"100px"}>
          <option value="4" >4</option>
          <option value="8" selected>8</option>
            <option value="12">12</option>
            <option value="16">16</option>
            <option value="20">20</option>
          </Select>
          </Box>
          </Flex>
        </Center>
        <Center mb={20}>
         
        <SimpleGrid columns={[2,2,2,3,3]} spacingX={20}>
       
       <Button width={"fit-content"} 
       bgColor={"white"}
        // onClick={()=>{setActu(actu-1),Next(),setEtat1(false)}}
        isDisabled={etat}></Button>
       <Heading>
       <Flex  >{pages.map(page=>{return (<SimpleGrid key={`${page}`} columns={[7,7,7,9,9]} height={`${pages.length*5}px`}><Button bgColor={"white"} onClick={() =>{setActu(page),Next(),Next()} } _hover={{fontSize:"20px" ,bgColor:"cyan.500"}} key={page} >{page}</Button></SimpleGrid>)}
       )}</Flex>
       </Heading>
       <Button width={"fit-content"} 
        bgColor={"white"}
        // onClick={()=>{setActu(actu+1),Next(),setEtat(false)}}
        isDisabled={etat1}></Button>
       </SimpleGrid> 
       </Center>
        {/* </>} */}
       
      
       <FooterR/>
      </>
    )
}