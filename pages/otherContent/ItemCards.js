import React, {  useEffect, useState } from "react";
import {
  Grid,
  Center,
  Select,
  Text,
  Button,
  Stack,
  Box,
  useToken,
  Flex,
} from "@chakra-ui/react";
import {
  Pagination as Pag,
  usePagination,
  PaginationPage,
  PaginationNext,
  PaginationPrevious,
  PaginationPageGroup,
  PaginationContainer,
  PaginationSeparator,
} from "@ajna/pagination";
import { onValue, ref } from "@firebase/database";
import { db, db2 } from "@/FIREBASE/clientApp";
import { collection, getDocs } from "firebase/firestore";
import Pagination from "@choc-ui/paginator";
import Head from "next/head";
const fetchPokemons = async (pageSize, offset) => {
  return await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${pageSize}&offset=${offset}`
  ).then(async (res) => await res.json());
};

const Full = () => {
  // states
  const [tota,setTota] = useState(0)
  const [cat, setCat] = useState([]);
  const [check, setCheck] = useState(0);
  const [pokemonsTotal, setPokemonsTotal] = useState(undefined);
  const [pokemons, setPokemons] = useState([]);

  // constants
  const outerLimit = 2;
  const innerLimit = 2;



  // recuperation des services
  const update = async () => {
    let total=0
    if (check != 1) {
      const querySnapshot = await getDocs(collection(db, "Services"));
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id)
        cat.push(doc.id);
        cat.push(`${doc.id}1`);
        cat.push(`${doc.id}2`);
        cat.push(`${doc.id}3`);
        total = total+1
        setTota(total)
        setCheck(1);
      });
    }
  };
  // pagination hook
  const {
    pages,
    pagesCount,
    offset,
    currentPage,
    setCurrentPage,
    setIsDisabled,
    isDisabled,
    pageSize,
    setPageSize,
  } = usePagination({
    total: tota,
    limits: {
      outer: outerLimit,
      inner: innerLimit,
    },
    initialState: {
      pageSize: 4,
      isDisabled: false,
      currentPage: 1,
    },
  });
//listing des produits par categorie
const FetcherData = async () =>{
  cat.map
}


  // effects
  useEffect(() => {
    update()
      // fetchPokemons(pageSize, offset)
      //   .then((pokemons) => {
      //     setPokemonsTotal(pokemons.count);
      //     setPokemons(pokemons.results);
      //   })
      //   .catch((error) => console.error("App =>", error));
  }, []);

  // handlers
  const handlePageChange = (nextPage) => {
    // -> request new data using the page number
    setCurrentPage(nextPage);
    // console.log("request new data with ->", nextPage);
  };

  const handlePageSizeChange = () => {
    const pageSize = Number(event.target.value);

    setPageSize(pageSize);
  };

  const handleDisableClick = () => {
    setIsDisabled((oldState) => !oldState);
  };
  const focusRing = useToken("colors", ["brand.400"])[0];
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
    <Stack>
      <Grid
        gap={3}
        mt={20}
        px={20}
        templateColumns="repeat(5, 1fr)"
        templateRows="repeat(1, 1fr)"
      >
        {cat?.map((card) => (
          <Center key={card} bg="green.100" p={4}>
            <Text>{card}</Text>
          </Center>
        ))}
  {/* {console.log(tota)} */}
        {/* {pokemons?.map(({ name }) => (
          <Center key={name} bg="green.100" p={4}>
            <Text>{name}</Text>
          </Center>
        ))} */}
      </Grid>
      <Pag
        pagesCount={pagesCount}
        currentPage={currentPage}
        isDisabled={isDisabled}
        onPageChange={handlePageChange}
      >
        <PaginationContainer
          align="center"
          justify="space-between"
          p={4}
          w="full"
        >
          <PaginationPrevious
            _hover={{
              bg: "yellow.400",
            }}
            bg="yellow.300"
            // isDisabled
            // onClick={() => console.warn("I'm clicking the previous")}
          >
            <Text>Previous</Text>
          </PaginationPrevious>

          <PaginationPageGroup
            isInline
            align="center"
            separator={
              <PaginationSeparator
                isDisabled
                onClick={() => console.warn("I'm clicking the separator")}
                bg="blue.300"
                fontSize="sm"
                w={7}
                jumpSize={11}
              />
            }
          >
            <Box display={"flex"}>
              {" "}
              <Center w="full" mr={5}>
                {/* <Button
          _hover={{
            bg: "purple.400",
          }}
          bg="purple.300"
          onClick={handleDisableClick}
        >
          Disable ON / OFF
        </Button> */}
                <Select ml={3} onChange={handlePageSizeChange} w={40}>
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  {/* <option value="100">100</option> */}
                </Select>
              </Center>
              {pages.map((page) => (
                <PaginationPage
                  w={7}
                  bg="red.300"
                  key={`pagination_page_${page}`}
                  page={page}
                  onClick={() => console.warn("Im clicking the page")}
                  fontSize="sm"
                  _hover={{
                    bg: "green.300",
                  }}
                  _current={{
                    bg: "green.300",
                    fontSize: "sm",
                    w: 7,
                  }}
                />
              ))}
            </Box>
          </PaginationPageGroup>
          <PaginationNext
            _hover={{
              bg: "yellow.400",
            }}
            bg="yellow.300"
            onClick={() => console.warn("I'm clicking the next")}
          >
            <Text>Next</Text>
          </PaginationNext>
        </PaginationContainer>
      </Pag>
    </Stack>
      <Flex
      w="full"
      // bg={"gray.400"}
      _dark={{
        bg: "gray.600",
      }}
      p={50}
      alignItems="center"
      justifyContent="center"
      direction="column"
    >
   
      <Pagination
        defaultCurrent={1}
        total={50}
        paginationProps={{
          display: "flex",
          mb: 4,
        }}
        focusRing
      />

      <Pagination
        defaultCurrent={4}
        total={50}
        paginationProps={{
          display: "flex",
          mb: 4,
        }}
        focusRing={focusRing}
      />
    </Flex>
    </>
  );
};

export default Full;
