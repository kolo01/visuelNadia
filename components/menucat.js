import React, { useState, useEffect, useRef } from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuIcon,
  MenuCommand,
  MenuDivider,
  Button,
  Flex,
  Link,
  Text,
  chakra,
  Box,
  Switch,
  IconButton,
  HStack,
} from "@chakra-ui/react";
import { CSSTransition } from "react-transition-group";
import { getAuth, signOut } from "firebase/auth";
import { app, db } from "@/FIREBASE/clientApp";
import { useRouter } from "next/router";
import { db2 } from "@/FIREBASE/clientApp";
import { ref, onValue } from "firebase/database";
import { collection, query, where, getDocs } from "firebase/firestore";
import { MdChevronLeft, MdChevronRight, MdMenu } from "react-icons/md";
import { ChevronDownIcon } from "@chakra-ui/icons";
import secureLocalStorage from "react-secure-storage";

export default function Menucat() {
  return <DropdownMenu />;
}

function DropdownMenu() {
  const [activeMenu, setActiveMenu] = useState("main");
  const [menuHeight, setMenuHeight] = useState(null);

  const [ginks, setGinks] = useState([]);
  const [cat, setCat] = useState(0);
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    async function FetchDataaa() {
      if (cat == 0 || cat == 1) {
        const q = query(collection(db, `Services`));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          datos.push(doc.data());
        });
      }
    }
    FetchDataaa();
    setCat(cat + 1);
  }, [datos, cat]);

  const updateLink = (index) => {
    const starCountRef2 = ref(db2, index + "/");
    onValue(starCountRef2, (snapshot) => {
      const donnees = snapshot.val();
   
      if (donnees != null) {
        const categorie = Object.keys(donnees).map((key) => ({
          id: key,
          ...donnees[key],
        }));
        setDatos(categorie);
      }
    });
  };

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height + 20);
  }
 
  return (
    <>
      {/* { datos.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      return (<Text key={doc.data()}>kolo</Text>)
    })
} */}
      {datos.slice(0, datos.length / 2).map((index, key) => {
        if (
          index.id != "Commandes" &&
          index.id != "Reservation" &&
          index.id != "All Products" &&
          index.id != "Devis"
        ) {
          return (
            <Link key={index.id}
            mr={10}
            _hover={{
              textDecoration : "none"
            }}
            onClick={() => {
              if (index.nom == "Coiffure") {
                secureLocalStorage.setItem("service", "Salon de Coiffure");
              } else if (index.nom == "Mèches") {
                secureLocalStorage.setItem("service", "Commerce de meches");
              } else {
                secureLocalStorage.setItem("service", index.nom);
              }
            }}
            href={"/otherContent/intermed2"}
            // fontSize={{base:"1rem",xl:"1.25rem"}}
            // fontSize={"0.6em"}
            fontSize={["0.4em","0.4m","0.4em","0.5em","0.6em"]}

            >
              <Text
               
                _hover={{ textDecoration: "none", color: "#068DA9" }}
                mr={2}
               
              >
                {index.nom}
              </Text>
            </Link>

            //   <Menu href={index.id}  closeOnSelect={false}
            //   key={index.id}

            //  >

            //   <MenuButton href={index.id} as={Button} _hover={{ textDecoration: "none", color: "#068DA9" }}  as={Button}  border={'none'} bgColor={'white'} mt='-5px' fontWeight={'normal'} fontSize={20}>
            //  <Text>{index.id}</Text>
            //   </MenuButton>

            //  </Menu>
          );
        }
      })}

      {/* <Menu className="dropdown" closeOnSelect={false}>
        <MenuButton   _hover={{ textDecoration: "none", color: "yellow.300" }}  as={Button} rightIcon={<ChevronDownIcon />} border={'none'} bgColor={'white'} mt='-5px' fontWeight={'normal'} fontSize={20}>
        Services
        </MenuButton>
    
        <MenuList style={{ height: menuHeight }} className="dropdown">
           <CSSTransition
            in={activeMenu === 'main'}
            timeout={500}
            classNames="menu-primary"
            unmountOnExit
            onEnter={calcHeight}
          >
            <div className="main-menu">
            {cat.map((index, key) => {if(index.id!="Commandes"){
              return(
                <MenuItem 
                key={index.id}
               onClick={() => {setActiveMenu(`${index.id}`),setGinks(`${index.id}`),updateLink(index.id)}}
               >
                <Text>{index.id}</Text>
                <Box pos="absolute" ml="80%">
                  <MdChevronRight />
                </Box>
               </MenuItem>
              )
            }})}
               
                 
            </div>
          </CSSTransition>
          <CSSTransition 
            in={activeMenu === ginks}
            timeout={500}
            classNames="menu-secondary"
            unmountOnExit
            onEnter={calcHeight}
          >
            <div className="menu-container">
            <MenuItem onClick={() => setActiveMenu('main')}>retourner</MenuItem>
             {datos.map((data,key)=>( 
                <MenuItem key={key} >
                 <Link href={"/"+ginks+"/"+data.id}>{data.id}</Link>
            </MenuItem> 
              ))}
            </div>
          </CSSTransition>

         
        </MenuList>
        
      </Menu> */}
    </>
  );
}

// function SubMenus() {
//   return (

//   )
// }
