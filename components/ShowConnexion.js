import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app, db, db2,authentic } from "@/FIREBASE/clientApp";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Center,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Firestore, collection, doc, getDocs, where } from "firebase/firestore";
import { query } from "@firebase/database";
import { AiOutlineUser } from "react-icons/ai";
import secureLocalStorage from "react-secure-storage";
import { AiOutlineHome } from "react-icons/ai";
import { MdSupportAgent } from "react-icons/md";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { FiPackage } from "react-icons/fi";
import { BiUser, BiUserCircle } from "react-icons/bi";
import { RiReservedLine } from "react-icons/ri";

export default function Showconnex() {
  const [users, setUsers] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();
  const insc = "S'inscrire";
  const logout = async () => {
    await signOut(authentic);
    secureLocalStorage.clear()
    router.reload();
  };

  const getData = async (email) => {
    const constraints = [];

    const livings = await collection(db, "Utilisateurs");
    let q = query(livings, ...constraints);

    const qSnapshot = await getDocs(q);

    const dataQ = await qSnapshot.docs.map((doc) => ({
     
      ...doc.data(),
      id: doc.id,
    }));
    for (let index = 0; index < dataQ.length; index++) {
    
      if (dataQ[index].email == email) {
        console.log("ici")
        secureLocalStorage.setItem("addresse", dataQ[index].address);
        secureLocalStorage.setItem("po", dataQ[index].code);
        setName(dataQ[index].name);
        secureLocalStorage.setItem("name", dataQ[index].name);
        secureLocalStorage.setItem("number", dataQ[index].number);
      } else {
       setName(secureLocalStorage.getItem("name"))
      }
    }

   
  };
  const auth = getAuth(app);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsers(user);
        sessionStorage.setItem("email", user.email);
       
        getData(user.email);
      }
    });
  }, [auth]);
  if (users) {
    return (
      <>
        <Flex
            display={["none","none","none","flex","flex"]}
          align={"center"}
          justifyContent={"center"}
          width={"auto"}
          height={"100%"}
        >
          {/* <Link display={'flex'} mr={{ base: "3", md: "3" }} fontSize={20} href={"/Connexion"}>
          <Icon as={AiOutlineUser} fontSize={30} mr={2}/> Se connecter
        </Link> */}
          <Popover>
            <PopoverTrigger>
              <Button
               _hover={{
                color: "cyan.700",
                textDecoration: "none",
              }}
                leftIcon={
                  <Icon
                    as={AiOutlineUser}
                   
                    fontSize={30}
                  />
                }
                rightIcon={<ChevronDownIcon />}
                bgColor={"white"}
              >
                Bon retour,{name}
              </Button>
            </PopoverTrigger>
            <PopoverContent width={"210px"}>
              <PopoverArrow />

              {/* <PopoverBody>
              <Center><Button as={Link} href="/Connexion" bgColor="#08566E" color={"white"}_hover={{
                bgColor:"#0f7493",
                textDecoration: "none"
              }}> SE CONNECTER</Button></Center>
            </PopoverBody> */}
              <PopoverBody>
                <Link
                
                  href="/Commandes/#1"
                  width={"full"}
                  _hover={{
                    textDecoration: "none",
                  }}
                >
                  <Button width={"full"} bgColor={"white"}>
                    {" "}
                    Mon compte
                  </Button>
                </Link>
             
                {/* <Link href="/Mybuy" ><Button>Mes commandes</Button></Link> */}
              </PopoverBody>
              <PopoverFooter>
                <Center>
                  <Button
                    border={"none"}
                    
                    bgColor={"cyan.700"}
                    _hover={{ bgcolor: "cyan.700", color: "red.800" }}
                    onClick={() => logout()}
                  >
                    {" "}
                    Deconnexion
                  </Button>
                </Center>
              </PopoverFooter>
            </PopoverContent>
          </Popover>
        </Flex>
        
        <Box
            display={["block","block","block","none","none"]}
         fontWeight={600}
          width={"full"}
          height={"fit-content"}
        >
{/*              
         
                <Link
               
                  href="/Commandes  "
                  // textAlign={"center"}
                  _hover={{
                    textDecoration: "none",
                  }}
                >
                  
                    
                    Mon compte
                 
                </Link> */}





<Flex
        borderBottom={"1px solid gray"}
          width={{ base: "100%", md: "100%" }}
          height={"fit-content"} py={5}
          // align={"center"}
          // justify={"space-between"}
          direction={{ base: "column", md: "column" }}
        >
           <Flex justifyContent={"space-between"}>
            <Flex>
           <FiPackage  fontWeight={700} fontSize={"20px"} mr={5}/>
              <Link 
             href={"/Commandes?c=1"}
            mr={5}
            width={"fit-content"}
            fontSize={"1rem"}
            _hover={{ textDecoration: "none", color: "#068DA9" }}
          >
           Mes commandes
          </Link>
          </Flex>
          <ChevronRightIcon fontSize={"25px"}/>
           </Flex>
           <Flex justifyContent={"space-between"}>
          <Flex>
          <MdSupportAgent fontWeight={700} fontSize={"20px"} mr={5}/>
          <Link
             href={"/HistDev"}
            mr={5}
            fontSize={"1rem"}
            _hover={{ textDecoration: "none", color: "#068DA9" }}
          >
            Mes devis
          </Link>
          </Flex>
          <ChevronRightIcon fontSize={"25px"}/>
          </Flex>
          <Flex justifyContent={"space-between"}>
          <Flex>
          
          <RiReservedLine  fontWeight={700} fontSize={"20px"} mr={5}/>
          <Link
            href={"/HistRes"}
            mr={3}
            fontSize={"1rem"}
            _hover={{ textDecoration: "none", color: "#068DA9" }}
          >
            Mes Reservations
          </Link>
          </Flex>
          <ChevronRightIcon fontSize={"25px"}/>
          </Flex>
          <Flex justifyContent={"space-between"}>
          <Flex>
          <BiUser fontWeight={700} fontSize={"20px"} mr={5}/>
          <Link
            href="/profiles"
            mr={3}
            fontSize={"1rem"}
            _hover={{ textDecoration: "none", color: "#068DA9" }}
          >
            Mon compte
          </Link>
          </Flex>
          <ChevronRightIcon fontSize={"25px"}/>
          </Flex>
        </Flex>



<Flex
        borderBottom={"1px solid gray"}
          width={{ base: "100%", md: "100%" }}
          height={"fit-content"}
          // align={"center"}
          // justify={"space-between"}
          direction={{ base: "column", md: "column" }}
          py={2}
        >
            {/* <Menucat /> */}
            {/* <Link
            href={"/Whoami"}
            mr={3}
            width={"fit-content"}
            fontSize={"1rem"}
            _hover={{ textDecoration: "none", color: "#068DA9" }}
          >
            Qui sommes-nous?
          </Link> */}
          <Flex justifyContent={"space-between"}>
          <Flex>
          <MdSupportAgent fontWeight={700} fontSize={"20px"} mr={5}/>
          <Link
            href={"/Contactus"}
            mr={3}
            fontSize={"1rem"}
            _hover={{ textDecoration: "none", color: "#068DA9" }}
          >
            Nous contacter
          </Link>
          </Flex>
          <ChevronRightIcon fontSize={"25px"}/>
          </Flex>
        </Flex>
{/* Derniere partie */}
               <Flex justifyContent={"space-between"}>
                 <Link
               
               href="/Terms  "
               // textAlign={"center"}
               _hover={{
                 textDecoration: "none",
               }}
             >
               
                 
                 Termes et conditions
              
             </Link>
             <ChevronRightIcon fontSize={"25px"}/>
               </Flex>
               
            <Flex justifyContent={"space-between"}>
               <Link 
                //  mt={-20}
                   
                    href={"#"}
                    _hover={{ textDecoration : "none" }}
                    onClick={() => logout()}
                  >
                    {" "}
                   Se déconnecter
                  </Link>
                  <ChevronRightIcon fontSize={"25px"}/>
            </Flex>
               
               
             
               
                
               
              
        </Box>
      
      </>
    );
  } else {
    return (
      <>
      <Flex
      display={["none","none","none","flex","flex"]}
        align={"center"}
        justifyContent={"center"}
        width={"auto"}
        height={"100%"}
      >
        {/* <Link display={'flex'} mr={{ base: "3", md: "3" }} fontSize={20} href={"/Connexion"}>
          <Icon as={AiOutlineUser} fontSize={30} mr={2}/> Se connecter
        </Link> */}
        <Popover>
          <PopoverTrigger>
            <Button
              leftIcon={<Icon as={AiOutlineUser} fontSize={30} mr={2} />}
              rightIcon={<ChevronDownIcon />}
              bgColor={"white"}
            >
              Se connecter
            </Button>
          </PopoverTrigger>
          <PopoverContent width={"210px"}>
            <PopoverArrow />

            <PopoverBody>
              <Center display={"grid"}>
                <Button mb={2}
                  as={Link}
                  href="/Choose"
                  bgColor="#08566E"
                  color={"white"}
                  _hover={{
                    bgColor: "#0f7493",
                    textDecoration: "none",
                  }}
                >
                  {" "}
                  Se connecter
                </Button>
                <Button
                  as={Link}
                  href="/Inscription"
                  bgColor="#08566E"
                  color={"white"}
                  _hover={{
                    bgColor: "#0f7493",
                    textDecoration: "none",
                  }}
                >
                  {" "}
                  {insc}
                </Button>
              </Center>
            </PopoverBody>
            <PopoverFooter>
              <Link
                href="/Commandes"
                width={"full"}
                _hover={{
                  textDecoration: "none",
                }}
              >
                <Button width={"full"} bgColor={"white"}>
                  {" "}
                  Mes commandes
                </Button>
              </Link>
              <Link
                href="/profiles"
                width={"full"}
                _hover={{
                  textDecoration: "none",
                }}
              >
                <Button width={"full"} bgColor={"white"}>
                  {" "}
                  Mon profils
                </Button>
              </Link>
              {/* <Link href="/Mybuy" ><Button>Mes commandes</Button></Link> */}
            </PopoverFooter>
          </PopoverContent>
        </Popover>
      </Flex>

<Flex
display={["grid","grid","grid","none","none"]}
  align={"center"}
  justifyContent={"center"}
  width={"auto"}
  height={"100%"}
>
  {/* <Link display={'flex'} mr={{ base: "3", md: "3" }} fontSize={20} href={"/Connexion"}>
    <Icon as={AiOutlineUser} fontSize={30} mr={2}/> Se connecter
  </Link> */}
 
      {/* <Button
        leftIcon={<Icon as={AiOutlineUser} fontSize={30} mr={2} />}
        rightIcon={<ChevronDownIcon />}
        bgColor={"white"}
      >
        Se connecter
      </Button> */}
   

         <Center display={"grid"}>
          <Button mb={2}
            as={Link}
            href="/Choose"
            bgColor="#08566E"
            color={"white"}
            _hover={{
              bgColor: "#0f7493",
              textDecoration: "none",
            }}
          >
            {" "}
            Se connecter
          </Button>
          <Button
            as={Link}
            href="/Choose"
            bgColor="#08566E"
            color={"white"}
            _hover={{
              bgColor: "#0f7493",
              textDecoration: "none",
            }}
          >
            {" "}
            {insc}
          </Button>
        </Center>
    
        {/* <Link
          href="/Commandes"
        
          _hover={{
            textDecoration: "none",
          }}
        >
          <Button  bgColor={"white"}>
            {" "}
            Mon compte
          </Button>
        </Link> */}
        {/* <Link
          href="/profiles"
          width={"full"}
          _hover={{
            textDecoration: "none",
          }}
        >
          <Button width={"full"} bgColor={"white"}>
            {" "}
            Mon profils
          </Button>
        </Link> */}
        {/* <Link href="/Mybuy" ><Button>Mes commandes</Button></Link> */}
      
</Flex>
</>
    );
  }
}
