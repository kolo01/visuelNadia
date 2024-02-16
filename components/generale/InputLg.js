import { Search2Icon } from "@chakra-ui/icons";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Box,
  Button,
  Center,
  Collapse,
  Flex,
  Heading,
  Icon,
  Text,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Popover,
  PopoverTrigger,
  Select,
  SimpleGrid,
  PopoverContent,
  useDisclosure,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useToast,
  Link,
} from "@chakra-ui/react";
import {
  child,
  equalTo,
  get,
  onValue,
  orderByChild,
  query,
  ref,
  startAt,
  update,
} from "@firebase/database";
import { db2 } from "@/FIREBASE/clientApp";
import React, { useEffect } from "react";
import { useState } from "react";
import { IoIosNotifications, IoMdAddCircleOutline } from "react-icons/io";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import { FaShoppingCart } from "react-icons/fa";

function saveCart(product) {
  secureLocalStorage.setItem("Cart", JSON.stringify(product));
}
function getCart() {
  let Cart = secureLocalStorage.getItem("Cart");
  if (Cart == null) {
    return [];
  } else {
    return JSON.parse(Cart);
  }
}
function AddToCart(Product) {
  let Cart = getCart();
  let foundit = Cart.find((p) => p.id == Product.id);
  if (foundit != undefined) {
    foundit.quantite++;
    foundit.prix = foundit.quantite * parseInt(Product.pricprixe);
  } else {
    Product.quantite = 1;
    Cart.push(Product);
  }

  saveCart(Cart);
}
const InputLg = () => {
  const toast = useToast();
  const [inputContent, setInputContent] = useState([]);
  const [result, setResult] = useState([]);

  const [cat, setCat] = useState([]);
  const [datos, setDatos] = useState([]);

  const [data, setData] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [check, setCheck] = useState(0);


  const Research = (exemple, dat) => {
    setDatos([])
    if (exemple.length >= 1) {
      setDatos([])
      setDatos(
        Object.values(dat).filter((product) => {
          return (
            product.nom.toLowerCase().includes(exemple.toLowerCase()) ||
            product.description.toLowerCase().includes(exemple.toLowerCase())
          );
        })
      );
    }

    // console.log("data",exemple)

    //  console.log(data.filter(inpute => inpute.nom.includes(inputed)))
  };

  useEffect(() => {
    const handleSearch = () => {
      // console.log("exemple", exemple)

      setData([]);
      if (check == 0 || check == 1) {
        const rec = query(ref(db2, "/All Products"));
        get(rec)
          .then((snapshot) => {
            // console.log("snapshot",snapshot.val())
            snapshot.forEach((childsnapsho) => {
              data.push(childsnapsho.val());
            });
          })
          .catch((error) => { }
          );
      };
    }

    handleSearch();
    setCheck(check + 1);


  }, [check, data]);

  return (
    <>

     

      <Box display={"none"}>
        <InputGroup>
          <Input
            type="search"
            placeholder={"Que recherchez-vous ?"}
            _placeholder={{ color: "black" }}
            variant={"filled"}
            borderRadius={"full"}
            onClick={onOpen}

            // w={{ md: "10em", lg: "20em" }}
            w={["0", "0", "0", "0", "0"]}
          />
          <InputRightElement>
            <Search2Icon color={"#08566E"} onClick={onOpen} />
          </InputRightElement>
        </InputGroup>
      </Box>

      <Drawer onClose={onClose} isOpen={isOpen} size={"full"}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton fontSize={30} />
          <DrawerHeader>

            <InputGroup ml={["10%", "10%", "10%", "30%", "30%"]} mt={5}>
              <Input
                type="search"
                placeholder="Que recherchez-vous ?"
                _placeholder={{ color: "black" }}
                variant={"filled"}
                borderRadius={"full"}
                // onClick={onOpen}
                // w={{ md: "10em", lg: "20em" }}
                w={["15em", "15em", "15em", "30em", "30em"]}
                onChange={(e) => Research(e.target.value, data)}
              />

            </InputGroup>


          </DrawerHeader>
          <DrawerBody>
            {datos.length > 0 ? <>
              <SimpleGrid columns={[2, 2, 2, 5, 5]} spacingX={2}>
                {Object.values(datos).map((data, index) => {
                  return (
                    <>

                      <Link key={index} onClick={() => { secureLocalStorage.setItem("Fav", data.organisation) }}
                        href={"/FavInt"}
                        _hover={{
                          textDecoration: "none"
                        }}
                      >
                        <Box

                          key={index} my={10} bgColor={"#eee2"} borderRadius={"25px"} pb={5} boxShadow={"grey 1px 1px  5px"} width={["170px", "170px", "170px", "170px", "170px"]}>

                          <Image height={["100px", "100px", "100px", "100px", "100px"]} width={"full"} src={data.imageUrl} alt={data.nom} borderRadius={"25px 25px 0px 0px"} />

                          <Text fontWeight={"bold"} width={["170px", "170px", "170px", "170px", "170px"]} noOfLines={1} pl={2}>{data.nom}</Text>
                          <Text color={"green"} ml={["55%", "55%", "60%", "70%", "70%"]} fontWeight={"semibold"} >{data.prix}€</Text>
                        </Box>
                      </Link>

                    </>
                  )
                })}
              </SimpleGrid>
            </> : <></>}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default InputLg;
