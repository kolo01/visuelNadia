import {
  Flex,
  Heading,
  Input,
  Image,
  InputGroup,
  InputRightElement,
  Link,
  Text,
  useMediaQuery,
  Box,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  PopoverFooter,
  Button,
  Center,
  useToast,
  InputLeftElement,
} from "@chakra-ui/react";
import { CiWallet } from "react-icons/ci";

import { Search2Icon } from "@chakra-ui/icons";
import { ChevronDownIcon } from "@chakra-ui/icons";
import LoginSignButton from "./generale/LoginSignButton";
import InputLg from "./generale/InputLg";
import HeaderBar from "./inscription/HeaderBar";
import SearcheIcone from "./generale/SearcheIcone";
import ResponsiveMenu from "./generale/ResponsiveMenu";
import { Image as Ok } from "next/image";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { TfiHelpAlt } from "react-icons/tfi";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app, authentic } from "@/FIREBASE/clientApp";
import { useRouter } from "next/router";
import CookieConsent from "react-cookie-consent";
import { MdLocationOn } from "react-icons/md";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import { BiNotification } from "react-icons/bi";
import { IoIosNotifications } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import { getCartsByUserId } from "./getcart";

const InputBar = () => {
  const auth = getAuth(app);
  const router = useRouter();
  const [locate, setLocate] = useState("");
  const [total, setTotal] = useState("");
  const [lastTime, setLastTime] = useState();
  const [data, setData] = useState([]);
  const [code, setCode] = useState([]);
  const [final, setFinal] = useState("");
  const [email, setEmail] = useState("");
  const [last, setLast] = useState("");
  const [check, setCheck] = useState(0);
  const [contenu, setContenu] = useState(0);

  const Search = (id) => {
    if (data.filter((order) => order.num_dep === id).length != 0) {
      const Final = data.filter((order) => order.num_dep === id);
      secureLocalStorage.setItem("location", Object.values(Final[0])[1]);
    } 
  };
  const Contenu = () => {
    router.replace(router.asPath)
    setEmail(sessionStorage.getItem("email"))
   
    getCartsByUserId(email).then((userCarts) => {
      setContenu(userCarts.length)
    
    });
  };

  useEffect(() => {
    setFinal(secureLocalStorage.getItem("location")?? "")
    setLast(secureLocalStorage.getItem("postal")?? "")
    setEmail(sessionStorage.getItem("email"))
   
    getCartsByUserId(email).then((userCarts) => {
      setContenu(userCarts.length)
    
    });
    if (check == 0 || check == 1) {
      const GetAll = async () => {
        await axios.get("/api/GetJson").then((response) => {
         
          setData(JSON.parse(Object.values(response.data)));
        });
      };
      GetAll();
      setLocate(secureLocalStorage.getItem("postal") ?? "0");
      onAuthStateChanged(auth, (user) => {
      
        if (user) {
          setTotal(2);
        }
      });
   
      setCheck(check + 1);
    }
  }, [locate, total, auth, data, check, contenu,final, last,contenu,email]);

  const [isLagerThan768] = useMediaQuery("(min-width: 420px)");
 

  return (
    <Box bgColor={"white"} pb={4}>
      <CookieConsent
        location="bottom"
        buttonText="J'accepte"
        cookieName="CNSTMTCOOKIE"
        declineButtonText="Je Refuse"
        style={{ background: "#2B373B" }}
        buttonStyle={{
          backgroundColor: "#00CCBC",
          fontSize: "13px",
          color: "white",
        }}
        expires={3}
        enableDeclineButton
      >
        Nous utilisons des cookies dans le but de personnaliser, d’améliorer
        notre contenu et nos services et de diffuser des publicités pertinentes.
      </CookieConsent>
      <Flex
      display={["none","none","none","none","none"]}
        width={"100%"}
        height={"4em"}
        align={"center"}
        justifyContent={"space-evenly"}
      >

        {/* zone button notif et panier */}
        <LoginSignButton /> <ResponsiveMenu />


        {/* le logo  */}
        <Flex
          color={"yellow.400"}
          width={"fit-content"}
          height={"100%"}
          align={"center"}
          justifyContent={"center"}
          fontWeight={"bold"}
          ml={[5, 5, 5, "5em", "5em"]}
        >
          <Link href={"/"}>
            <Image
              src={"/logo1.png"}
              alt={"Chap"}
              width={"80px"}
              mt={[2, 2, 2, 2, 2]}
              mr={["0", "0", "080px", "2px", "2px"]}
            />
          </Link>

          {/* <Ok src={"./logo1.png"} /> */}
        </Flex>

        {/* l'input et les button  */}
        {/* <Flex
          align={"center"}
          justifyContent={"center"}
          width={"auto"}
          height={"full"}
          mr={3}
        >
          <InputLg />
        </Flex> */}

        {/* butons se connecter et s'inscrire  */}
        <Flex
          align={"center"}
          justifyContent={"center"}
          width={"auto"}
          height={"full"}
        >
          
          <Flex
            display={["none", "none", "none", "flex", "flex"]}
            align={"center"}
            justifyContent={"center"}
            width={"auto"}
            height={"100%"}
            mr={"1em"} 
          >
            {/* <Link display={'flex'} mr={{ base: "3", md: "3" }} fontSize={20} href={"/Connexion"}>
          <Icon as={AiOutlineUser} fontSize={30} mr={2}/> Se connecter
        </Link> */}
      <Flex width={"fit-content"} >
      <Box mt={1}>
      <MdLocationOn  />
      </Box>
    
      <Text  width={"95%"} >
      {last}, {final}
      </Text>
      </Flex>
            {/* <Popover>
              <InputGroup borderRadius={"100px"} width={"fit-content"}>
                <InputRightElement as={Text} width={"fit-content"}>
                {last}, {final}
                </InputRightElement>
                <Input
                isDisabled={true}
                  borderRadius={"100px"}
                  type={"number"}
                  // placeholder="Entrez votre code postal"
                  w={"9em"}
                  maxLength={5}
                  // value={locate}
                  onChange={(e) => {
                    secureLocalStorage.setItem("postal", e.target.value),
                      setLocate(e.target.value),
                      Search(locate.slice(0, 2));
                      if((e.target.value).length>4){
                        router.reload()
                       }
                  }}
                  // onClick={onOpen}
                />
                <InputLeftElement
                  as={Link}
                  href={"#"}
                  borderRaduis={"50%"}
                  _hover={{
                    textDecoration: "none",
                  }}
                  cursor={"pointer"}
                >
                  <MdLocationOn />
                </InputLeftElement>
              </InputGroup>
              <PopoverContent width={"210px"}>
                {locate.length <= 4 ? (
                  <InputGroup bgColor={"#ddd"} borderRadius={"100px"}>
                    <InputRightElement
                      as={Text}
                      width={"10em"}
                    ></InputRightElement>
                    <Input
                      borderRadius={"100px"}
                      type={"number"}
                      placeholder="Entrez votre code posta"
                      w={"15em"}
                      maxLength={5}
                      value={locate}
                      onChange={(e) => {
                        secureLocalStorage.setItem("postal", e.target.value),
                          setLocate(e.target.value),
                          Search(locate.slice(0, 2));
                      }}
                    />
                    <InputLeftElement
                      as={Link}
                      href={"#"}
                      borderRaduis={"50%"}
                      _hover={{
                        textDecoration: "none",
                      }}
                      cursor={"pointer"}
                    >
                      <MdLocationOn />
                    </InputLeftElement>
                  </InputGroup>
                ) : (
                  <>
                    {" "}
                    <InputGroup bgColor={"#ddd"} borderRadius={"100px"}>
                      <Input
                        borderRadius={"100px"}
                        type={"number"}
                        placeholder="Entrez votre code posta"
                        w={"15em"}
                        maxLength={5}
                        value={locate}
                        onChange={(e) => {
                          secureLocalStorage.setItem("postal", e.target.value),
                            setLocate(e.target.value),
                            Search(locate.slice(0, 2));
                        }}
                      />
                      <InputLeftElement
                        as={Link}
                        href={"#"}
                        borderRaduis={"50%"}
                        _hover={{
                          textDecoration: "none",
                        }}
                        cursor={"pointer"}
                      >
                        <MdLocationOn />
                      </InputLeftElement>
                    </InputGroup>{" "}
                  </>
                )}
              </PopoverContent>
            </Popover> */}
          </Flex>
          <Flex
            display={["none", "none", "none", "flex", "flex"]}
            align={"center"}
            justifyContent={"center"}
            width={"auto"}
            height={"100%"}
            mr={"1em"}
          >
            <Popover>
              <PopoverTrigger>
                <Link
                  href={"/Cart"}
                  _hover={{
                    bgColor: "white",
                    textDecoration: "none",
                  }}
                >
                  {" "}
                  <Button
                    _hover={{
                      bgColor: "white",
                      color: "cyan.700",
                      textDecoration: "none",
                    }}
                    leftIcon={<Icon as={HiOutlineShoppingBag} fontSize={30} />}
                    bgColor={"white"}
                  >
                    Panier({contenu})
                  </Button>
                </Link>
                
              </PopoverTrigger>
            </Popover>
            <Link
                  href={"#"}
                  _hover={{
                    bgColor: "white",
                    textDecoration: "none",
                  }}
                >
                  {" "}
                  <Button
                  onClick={()=>{
                    toast({
                      title:"En cours de construction",
                      status:"info",
                      duration:9000
                    })
                  }}
                    _hover={{
                      bgColor: "white",
                      color: "cyan.700",
                      textDecoration: "none",
                    }}
                    leftIcon={<Icon as={IoIosNotifications} fontSize={30} />}
                    bgColor={"white"}
                  >
                    
                  </Button>
                </Link>
          </Flex>
        </Flex>
      </Flex>
      <Flex
      //  display={["none","none","none","flex","flex"]}
        width={"100%"}
        height={"4em"}
        align={"center"}
        justifyContent={"space-evenly"}
      >
        {/* le logo  */}
        <Flex
          color={"yellow.400"}
          width={"fit-content"}
          height={"100%"}
          align={"center"}
          justifyContent={"center"}
          fontWeight={"bold"}
          ml={[5, 5, 5, "5em", "5em"]}
        >
          <Link href={"/"}>
            <Image
              src={"/logo1.png"}
              alt={"Chap"}
              width={"80px"}
              mt={[2, 2, 2, 2, 2]}
              mr={["80px", "80px", "80px", "2px", "2px"]}
            />
          </Link>

         
        </Flex>

        {/* l'input et les button  */}
        <Flex
          align={"center"}
          justifyContent={"center"}
          width={"auto"}
          height={"full"}
          mr={3}
        >
          <InputLg />
        </Flex>

        {/* butons se connecter et s'inscrire  */}
        <Flex
          align={"center"}
          justifyContent={"center"}
          width={"auto"}
          height={"full"}
        >
          <LoginSignButton /> <ResponsiveMenu />
          <Flex
            display={["none", "none", "none", "flex", "flex"]}
            align={"center"}
            justifyContent={"center"}
            width={"auto"}
            height={"100%"}
            mr={"1em"} 
          >
            
      <Flex width={"fit-content"} >
      <Box mt={1}>
      <MdLocationOn  />
      </Box>
    
      <Text  width={"95%"} >
      {last}, {final}
      </Text>
      </Flex>
            
          </Flex>
          <Flex
            display={["none", "none", "none", "flex", "flex"]}
            align={"center"}
            justifyContent={"center"}
            width={"auto"}
            height={"100%"}
            mr={"1em"}
          >
            <Popover>
              <PopoverTrigger>
                <Link
                  href={"/Cart"}
                  _hover={{
                    bgColor: "white",
                    textDecoration: "none",
                  }}
                >
                  {" "}
                  <Button
                    _hover={{
                      bgColor: "white",
                      color: "cyan.700",
                      textDecoration: "none",
                    }}
                    leftIcon={<Icon as={HiOutlineShoppingBag} fontSize={30} />}
                    bgColor={"white"}
                  >
                    Panier({contenu})
                  </Button>
                </Link>
                
              </PopoverTrigger>
            </Popover>
            <Link
                  href={"#"}
                  _hover={{
                    bgColor: "white",
                    textDecoration: "none",
                  }}
                >
                  {" "}
                  <Button
                  onClick={()=>{
                    toast({
                      title:"En cours de construction",
                      status:"info",
                      duration:9000
                    })
                  }}
                    _hover={{
                      bgColor: "white",
                      color: "cyan.700",
                      textDecoration: "none",
                    }}
                    leftIcon={<Icon as={IoIosNotifications} fontSize={30} />}
                    bgColor={"white"}
                  >
                    
                  </Button>
                </Link>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default InputBar;
