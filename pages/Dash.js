import React, { useEffect } from "react";
import {
  Box,
  IconButton,
  useBreakpointValue,
  Stack,
  Heading,
  Text,
  Container,
  keyframes,
  Center,
  Image,
  Flex,
  Link,
  Menu,
  MenuButton,
  Icon,
  MenuItem,
} from "@chakra-ui/react";
// Here we have used react-icons package for the icons
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
// And react-slick as our Carousel Lib
import Slider from "react-slick";
import { useState } from "react";
import Head from "next/head";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  EditIcon,
  SearchIcon,
} from "@chakra-ui/icons";

import { AiOutlineUser, AiOutlineShoppingCart } from "react-icons/ai";
import secureLocalStorage from "react-secure-storage";
import Slide from "@/components/slider";
import Footer2 from "@/components/footer";
// Settings for the slider
const settings = {
  dots: false,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 100,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
};
const animation = keyframes `
from {background:"inherit"} to {background:'yellow'} 10%,90%{transform:translate3d(-10px,0,0))}
`;
export default function CaptionCarousel() {
  // As we have used custom buttons, we need a reference variable to
  // change the state
  const [slider, setSlider] = useState(null);

  // These are the breakpoints which changes the position of the
  // buttons as the screen size changes
  const top = useBreakpointValue({ base: "90%", md: "50%" });
  const side = useBreakpointValue({ base: "30%", md: "40px" });

  // This list contains all the data for carousels
  // This can be static or loaded from a server
  const [cards, setCards] = useState([]);
  useEffect(() => {
    JSON.parse(secureLocalStorage.getItem("AlimentationDatos")).map((card, index) => {
      setCards(card);
    });
  }, []);

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
    <Box
      position={"relative"}
      height={"fit-content"}
      mb={10}
      width={"full"}
      backgroundColor={"#00CECB"}
      overflow={"hidden"}
    >
      {/* CSS files for react-slick */}
      <link
        rel="stylesheet"
        type="text/css"
        charSet="UTF-8"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
      {/* Left Icon */}
      <IconButton
        aria-label="left-arrow"
        variant="ghost"
        position="absolute"
        backgroundColor={"white"}
        left={side}
        top={top}
        transform={"translate(0%, -50%)"}
        zIndex={2}
        onClick={() => slider?.slickPrev()}
      >
        <BiLeftArrowAlt size="40px" />
      </IconButton>
      {/* Right Icon */}
      <IconButton
       
        aria-label="right-arrow"
        variant="ghost"
        position="absolute"
        backgroundColor={"white"}
        right={side}
        top={top}
        transform={"translate(0%, -50%)"}
        zIndex={2}
        onClick={() => slider?.slickNext()}
      >
        <BiRightArrowAlt size="40px" />
      </IconButton>
      {/* Slider */}
      <Slider  {...settings} ref={(slider) => setSlider(slider)}>
        {Object.values(cards).map((card, index) => (
          // {console.log(card.imageUrl)}
          <Box key={index}>
            <Box
            display={{base:"none"}}
              key={index}
              height={"xl"}
              position="relative"
              backgroundPosition="center"
              backgroundRepeat="no-repeat"
              backgroundSize="cover"
              backgroundImage={`url(${card.imageUrl})`}
            >
              {/* This is the block you need to change, to customize the caption */}
              <Center>
                <Flex
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignContent={"center"}
                  w={"full"}
                >
                  <Image alt={'logo'} src="/logo1.png" w={"10%"} mt={"-0.5"} />
                  <Flex mt={"12"} w={"50%"} ml={"20%"}>
                    <Link mr={5}> ACCUEIL</Link>
                    <Link mr={5}> ALIMENTATION</Link>
                    <Link mr={5}> RESTAURATION</Link>
                    <Link mr={5}> ESTHETIQUE</Link>
                    <Link>Contact-Us</Link>
                  </Flex>
                  <Flex mt={"12"} mr={"10%"} color={"white"}>
                    <SearchIcon _hover={{ rotate: "180deg" }} mr={5} />
                    <Icon as={AiOutlineUser} mr={5} />
                    <Icon as={AiOutlineShoppingCart} mr={5} />
                  </Flex>
                </Flex>
              </Center>
            </Box>
          </Box>
        ))}
      </Slider>
      <Center backgroundColor={"#FFFFEA"} my={5}>
        <Flex>
          <Box mr={20}>
            <Box>
              <EditIcon />
            </Box>
            <Heading>Return</Heading>
            <Text> 24*7 free returns</Text>
          </Box>
          <Box mr={20}>
            <Box>
              <EditIcon />
            </Box>
            <Heading>Return</Heading>
            <Text> 24*7 free returns</Text>
          </Box>
          <Box mr={20}>
            <Box>
              <EditIcon />
            </Box>
            <Heading>Return</Heading>
            <Text> 24*7 free returns</Text>
          </Box>
          <Box mr={20}>
            <Box>
              <EditIcon />
            </Box>
            <Heading>Return</Heading>
            <Text> 24*7 free returns</Text>
          </Box>
          <Box mr={20}>
            <Box>
              <EditIcon />
            </Box>
            <Heading>Return</Heading>
            <Text> 24*7 free returns</Text>
          </Box>
        </Flex>
      </Center>
          <Footer2/>
    </Box>
    </>
  );
}
