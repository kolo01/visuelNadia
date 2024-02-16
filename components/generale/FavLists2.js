import {
  Box,
  Image,
  SimpleGrid,
  Text,
  Link,
  Flex,
  Tooltip,
  Badge,
  Button,useToast
} from "@chakra-ui/react";
import { ref, onValue } from "@firebase/database";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { addDoc,collection, query, where,updateDoc, getDocs } from "firebase/firestore";
import { FaTruckPickup } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";
import { onAuthStateChanged } from "firebase/auth";
import { authentic, db, db2 } from "@/FIREBASE/clientApp";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 13,
  },
  MDesktop: {
    breakpoint: { max: 3000, min: 2500 },
    items: 12,
  },
  LargeDesktop: {
    breakpoint: { max: 2500, min: 2050 },
    items: 11,
  },
  desktopM: {
    breakpoint: { max: 2050, min: 1750 },
    items: 9,
  },
  desktopL: {
    breakpoint: { max: 1750, min: 1550 },
    items: 8,
  },
  desktop: {
    breakpoint: { max: 1550, min: 1050 },
    items: 5,
  },
  tabletl: {
    breakpoint: { max: 1050, min: 850 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 850, min: 650 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 650, min: 0 },
    items: 2,
  },
};

export default function Favlist2({ categorie, magasin }) {
  const [data, setData] = useState([]);
  const [dataK, setDataK] = useState([]);
  const [tout, setTout] = useState("");
  const [tou, setTou] = useState("");
  const [check, setCheck] = useState(0);
  const toast = useToast();

  const router = useRouter();
  const [all, setAll] = useState("none");

  async function Exist(productKey, email, uid, product) {
    const cartRef = collection(db, "orders"); // Supposons que la collection se nomme 'carts'.
    const q = query(
      cartRef,
      where("email", "==", email),
      where("productId", "==", productKey)
    ); // Requête pour récupérer le panier par userId.

    const querySnapshot = await getDocs(q);

    if (querySnapshot.size === 1) {
      const cartDoc = querySnapshot.docs[0];
      const cartData = cartDoc.data();
      // console.log(cartData)
      const itemIndex = Object.values(cartData).find(
        (item) => item.productId === productKey
      );
      if (itemIndex !== -1) {
        await updateDoc(cartDoc.ref, {
          productId: productKey,
          currentUID: uid,
          orderDescription: product.description,
          orderEtat: product.etat,
          orderNote: product.note,
          orderImageUrl: product.imageUrl,
          orderName: product.nom,
          orderPrice: product.prix,
          orderOrganisation: product.organisation,
          orderQte: querySnapshot.docs[0].data().quantity + 1,
          email: email,
        });
      }
    } else {
      await addDoc(collection(db, "orders"), {
        productId: productKey,
        currentUID: uid,
        orderDescription: product.description,
        orderEtat: product.etat,
        orderNote: product.note,
        orderImageUrl: product.imageUrl,
        orderName: product.nom,
        orderPrice: product.prix,
        orderOrganisation: product.organisation,
        orderQte: 1,
        email: email,
      });
    }
  }

  function AddToCart(product, productKey) {
    onAuthStateChanged(authentic, async (user) => {
      if (!user) {
        toast({
          title: "Veuillez vous connectez !!!",

          status: "error",
          duration: 10000,
          isClosable: true,
        });
        
      } else {
        try {
          await Exist(productKey, user.email, user.uid, product);
          // router.reload();
          router.replace(router.asPath)
          toast({
            title: "Produit ajouté!!!",

            status: "success",
            duration: 9000,
            isClosable: true,
          });
        } catch (error) { console.log(error)}
      }
    });
  }

  const Fav = async () => {
    try {
      //   const starCountRef = ref(db2, `${categorie}/${magasin}`);
      // onValue(starCountRef, (snapshot) => {
      //   setData(snapshot.val());
      //   // console.log(snapshot.val())
      // });
      const q = query(collection(db, "ServicesFav"));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.data())
        // console.log(card)
        Object.keys(doc.data()).map((dat, index) => {
          // console.log(dat)

          if (dat != categorie) {
            setAll("grid");
            // console.log(doc.data())
            doc.data()[dat].map((datee, index) => {
              if (datee.length >= 3 && datee != magasin) {
              
                const starCountRef = ref(db2, `${dat}/${datee}`);
                onValue(starCountRef, (snapshot) => {
                  setTout(dat);
                  setData(snapshot.val());
                  Object.keys(snapshot.val()).map((data) => {
                    dataK.push(data)
        
                  })
                });
              }
            });
          }
        });
      });
    } catch {
      (error) => {
        console.log("Waiting time 2!!!");
      };
    }

    // const db = getDatabase();
  };

  useEffect(() => {
    if (check == 0 || check == 1) {
      Fav();

      setCheck(check + 1);
    }

    // setTout(data.length())
  }, [check, Fav]);

  const [slider, setSlider] = useState(null);

  const date2 = new Date();
  const dateExp = date2.setDate(date2.getDate() + 1);
  const dateExp2 = new Date(dateExp);
  const dateExp3 = dateExp2.toLocaleDateString();

  return (
    <>
      {data ? (
        <Box ml={[2, 2, 2, 5, 5]}  width={"100%"} my={5} height={"26rem"}>
          <Carousel responsive={responsive} style={"marginLeft='10px'"}>
            {Object.values(data).map((data, index) => (
              <Box bgColor={"white"} key={index} width={"13rem"} height={"25rem"}>
                <Box
                  bgColor={"white"}
                  p={5}
                  key={index}
                  my={ 5}
                  height={"21.25rem"}
                  width={"13rem"}
                >
                  {data.etat == "disponible" ? (
                    <Badge
                      mt={-20}
                      ml={-6}
                      color={"white"}
                      px={2}
                      py={1}
                      borderRadius={25}
                      height={"fit-content"}
                      bgColor="#7ed957"
                    >
                      Disponible
                    </Badge>
                  ) : (
                    <Badge
                      mt={-20}
                      ml={-6}
                      color={"white"}
                      px={2}
                      py={1}
                      borderRadius={25}
                      height={"fit-content"}
                      bgColor="#e33924"
                    >
                      Rupture
                    </Badge>
                  )}
                  <Image
                    height={["150px", "150px", "150px", "150px", "150px"]}
                    width={["200px", "200px", "200px", "200px", "200px"]}
                    src={data.imageUrl}
                    alt={data.nom}
                  />
                  <Box height={"4.5rem"} mb={2}>
                    <Text
                      width={"200px"}
                      noOfLines={2}
                      fontSize={"15px"}
                      fontWeight={700}
                    >
                      {data.nom}
                    </Text>
                    <Text
                      fontWeight={"bold"}
                      width={"fit-content"}
                      color={"orange.900"}
                      fontSize={"10px"}
                    >
                      {data.organisation}
                    </Text>
                  </Box>
                  <Flex>
                    <AiOutlineStar fontSize={"12px"} />
                    <AiOutlineStar fontSize={"12px"} />
                    <AiOutlineStar fontSize={"12px"} />
                    <AiOutlineStar fontSize={"12px"} />
                    <AiOutlineStar fontSize={"12px"} />
                  </Flex>
                  {data.duree == "Expedié en 24h" ? (
                    <Text fontWeight={"thin"} fontSize={10}>
                      Livré le {dateExp3}{" "}
                    </Text>
                  ) : (
                    <Text fontSize={"12px"}>{data.duree} </Text>
                  )}
                  <Flex>
                    <FaTruckPickup />
                    <Tooltip
                      label={`Prix superieur à 30€ Ou être en île-de-france`}
                    >
                      <Flex>
                        <Text ml={2} fontSize={"10px"} fontWeight={700}>
                          Livraison gratuite{" "}
                        </Text>
                        <Text fontSize={"15px"} mt={-1} color={"red"}>
                          *
                        </Text>
                      </Flex>
                    </Tooltip>
                  </Flex>

                  <Flex justifyContent={"space-between"}>
                    <Text></Text>
                    <Text
                      color={"cyan.700"}
                      fontFamily={"sans-serif"}
                      fontWeight={"semi-bold"}
                      fontSize={"20px"}
                    >
                      {data.prix}€
                    </Text>
                  </Flex>
                </Box>
                <Flex justifyContent={"space-between"}>
                  <Button
                    bgColor={"#956e52"}
                    as={Link}
                    href={`/otherContent/intermed1?categorie=${tout}&magasin=${data.organisation}`}
                    _hover={{
                      textDecoration: "none",
                    }}
                    height={"fit-content"}
                    fontSize={10}
                    width={"fit-content"}
                    py={2}
                    borderRadius={25}
                    color={"white"}
                  >
                    Commerce
                  </Button>

                  <Button
                    bgColor={"cyan.700"}
                    _hover={{
                      bgColor:"cyan.700"
                    }}
                    fontWeight={"bold"}
                    fontSize={"15px"}
                    borderRadius={25}
                    mt={-1}
                    height={"fit-content"}
                    py={2}
                    px={2}
                    color={"white"}
                    onClick={()=>{
                      AddToCart(data,dataK[index]),console.log(data,dataK[index])
                    }}
                  >
                    Ajouter
                  </Button>
                </Flex>
              </Box>
            ))}
          </Carousel>
        </Box>
      ) : (
        <></>
      )}
    </>
  );
}
