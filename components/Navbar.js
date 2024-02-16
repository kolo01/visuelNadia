import {
  Box,
  Flex,
  Text,
  IconButton,
 
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useDisclosure,
  
  Menu,
  MenuButton,
  MenuList,
  Center,

} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import {AiOutlineShoppingCart, AiTwotoneAlert} from 'react-icons/ai'
import React from "react";
import {useState,useEffect} from 'react'
import { getAuth } from "firebase/auth";
import { app} from "@/FIREBASE/clientApp";
import Menucat from "./menucat";
import Keyword from "./Keywords";
import secureLocalStorage from "react-secure-storage";
export default function Navbar() {
 
  const { isOpen, onToggle } = useDisclosure();
  const auth = getAuth(app);
  const [total,setTotal]=useState('')
  const [postal,setPostal]=useState('')
 const numb=()=>{


  const Cart = secureLocalStorage.getItem("Cart");
  const All = JSON.parse(Cart);
  let tot=0
  if (All != null) {
    All.map((data, index) => {
      tot = parseInt(data.quantite) + tot;
    });
    setTotal(tot);
  }

  secureLocalStorage.setItem("total", total);
 
 
};
  
useEffect(()=>{
  // numb()
  const postale = secureLocalStorage.getItem("postal")
  if (postale == undefined || postale== null ) {
    secureLocalStorage.setItem("postal"," ")
  }
  
},[numb])



  return (
    <>
  
    <Box display={["none","none","none","grid","grid"]} bgColor={"#08566e"} color={"white"}>
      <Flex
      width={"100%"}
       bgColor={"#08566e"}
        color={"white"}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        
        <Box  justify={{ base: "center", md: "center" }} ml={["0","0","0","1%","5%"]}  width={"100%"}>
          {/* <Text
              textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
              fontFamily={'heading'}
              color={useColorModeValue('gray.800', 'white')}>
              Logo
            </Text> */}

          <Flex
            display={{ base: "none", md: "flex" }}
            // ml={"25%"}
            fontSize={["10px","10px","20px","21px","30px"]}
            color={"white"}
            justifyContent={"space-between"}
          >
            {/* <DesktopNav /> */}
            <Flex>  <Link
            bgColor={""}
              href={"/"}
              mr={10}
              // fontSize={{base:"1rem",xl:"1.25rem"}}
              // fontSize={["0.5em","0.5m","0.5em","0.5em","1.25em"]}
              // fontSize={"0.6em"}
              fontSize={["0.4em","0.4m","0.4em","0.5em","0.6em"]}

              _hover={{ textDecoration: "none", color: "#068DA9" }}
            >
              Accueil
            </Link>
            <Menucat/>
            <Link

              href={"/Whoami"}
              mr={10}
              // fontSize={{base:"1rem",xl:"1.25rem"}}
              fontSize={["0.4em","0.4em","0.4em","0.5em","0.6em"]}
              // fontSize={"0.6em"}
              _hover={{ textDecoration: "none", color: "#068DA9" }}
            >
              Qui sommes-nous?
            </Link>
            <Link
              href={"/Contactus"}
              mr={10}
              // fontSize={{base:"1rem",xl:"1.25rem"}}
              // fontSize={"0.6em"}
              fontSize={["0.4em","0.4em","0.4em","0.5em","0.6em"]}
                  _hover={{ textDecoration: "none", color: "#068DA9" }}
            >
             Nous contacter
            </Link></Flex>
            {/* {postal.length ==5 ? <><Flex  mr={10}><Text mr={5}>Votre code postal</Text>{postal}</Flex></>:<></>} */}
            {/* <Menu isLazy>
              <MenuButton
                // mr={3}
                _hover={{ textDecoration: "none", color: "yellow.300" }}
              >
                <Button rightIcon={<ChevronDownIcon />} border={'none'} bgColor={'inherit'} mt='-5px' fontWeight={'normal'} fontSize={20}>Services</Button>
              </MenuButton>
              <MenuList>
                {/* MenuItems are not rendered unless Menu is open */}
                {/* <Wrap spacing="30px" align="center" w={"sm"}> */}
                  {/* <Simplegrid > */}
                  
                  {/* {cat.map((index, key) => (
                    <Link
                      key={index.id}
                      href={"/" + index.id}
                      _hover={{ textDecoration: "none", color: "yellow.300" }}
                    >

                      {index.id} <br/>
                      {/* <WrapItem></WrapItem> */}
                    {/* </Link>
                   
                  ))} */}
                 
                  {/* </Simplegrid> */}
                {/* </Wrap> */}
              {/* </MenuList>
            </Menu>  */}
           
            {/* <Link
              href={"#"}
              mr={3}
              _hover={{ textDecoration: "none", color: "yellow.300" }}
            >
              Paiement
            </Link>
            <Link
              href={"#"}
              mr={3}
              _hover={{ textDecoration: "none", color: "yellow.300" }}
            >
              Services
            </Link> */}
          </Flex>
          {/* <Keyword/> */}
        </Box>

        {/* <Stack
            flex={{ base: 1, md: 0 }}
            justify={'flex-end'}
            direction={'row'}
            spacing={6}>
            <Button
              as={'a'}
              color={'black'}
              fontSize={'sm'}
              fontWeight={600}
              variant={'link'}
              href={'#'}>
Se connecter    
            </Button>
            <Button
              as={'a'}
              display={{ base: 'none', md: 'inline-flex' }}
              fontSize={'sm'}
              fontWeight={600}
              color={'black'}
            
              href={'#'}
            >
              S'inscrire

            </Button>
          </Stack> */}
           
      </Flex>
     
      <Collapse in={isOpen} animateOpacity>
        {/* <MobileNav /> */}
      </Collapse>
    </Box>
    
    </>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Link
                p={2}
                href={navItem.href ?? "#"}
                fontSize={"sm"}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }) => {
  return (
    <Link
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("pink.50", "gray.900") }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "pink.400" }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"pink.400"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

// const MobileNav = () => {
//   return (
//     <Stack
//       bg={useColorModeValue("white", "gray.800")}
//       p={4}
//       display={{ md: "none" }}
//     >
//       {NAV_ITEMS.map((navItem) => (
//         <MobileNavItem key={navItem.label} {...navItem} />
//       ))}
//     </Stack>
//   );
// };

// const MobileNavItem = ({ label, children, href }) => {
//   const { isOpen, onToggle } = useDisclosure();

//   return (
//     <Stack spacing={4} onClick={children && onToggle}>
//       <Flex
//         py={2}
//         as={Link}
//         href={href ?? "#"}
//         justify={"space-between"}
//         align={"center"}
//         _hover={{
//           textDecoration: "none",
//         }}
//       >
//         <Text
//           fontWeight={600}
//           color={useColorModeValue("gray.600", "gray.200")}
//         >
//           {label}
//         </Text>
//         {children && (
//           <Icon
//             as={ChevronDownIcon}
//             transition={"all .25s ease-in-out"}
//             transform={isOpen ? "rotate(180deg)" : ""}
//             w={6}
//             h={6}
//           />
//         )}
//       </Flex>

//       <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
//         <Stack
//           mt={2}
//           pl={4}
//           borderLeft={1}
//           borderStyle={"solid"}
//           borderColor={useColorModeValue("gray.200", "gray.700")}
//           align={"start"}
//         >
//           {children &&
//             children.map((child) => (
//               <Link key={child.label} py={2} href={child.href}>
//                 {child.label}
//               </Link>
//             ))}
//         </Stack>
//       </Collapse>
//     </Stack>
//   );
// };

// const NAV_ITEMS =
//  [
//   {
//     label: "Accueil",
//     href: "/",
//   },
//   {
//     label: "Catégories",
//     children: [
//       {
//         label: "Hommes",
//         href: "/Hommes",
//       },
//       {
//         label: "Femmes",
//         href: "/Femmes",
//       },
//       {
//         label: "Enfants",
//         href: "/Enfants",
//       },
//     ],
//   },

//   {
//     label: "Panier",
//     href: "/Cart",
//   },
//   {
//     label: "Services",
//     href: "#",
//   },
//   {
//     label: "Paiements",
//     children: [
//       {
//         label: "Ajouter moyen de paiements",
//         href: "#",
//       },
//       {
//         label: "Voir les moyens de paiements",
//         href: "#",
//       },
//     ],
//   },
// ];
