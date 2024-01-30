import React, { useState } from "react";
import FooterR from '@/components/footerResponsif'
import {
  Badge,
  Box,
  Button,
  Center,
  Collapse,
  Fade,
  Flex,
  Grid,
  Heading,
  IconButton,
  Link,
  Show,
  SimpleGrid,
  Stack,
  Text,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useMediaQuery } from "@chakra-ui/react";
import InputBar from "@/components/InputBar";
import Navbar from "@/components/Navbar";
// Here we have used react-icons package for the icons
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
// And react-slick as our Carousel Lib
import Slider from "react-slick";
import Data from "@/data/data";
import Image from "next/image";
import { ChevronRightIcon, StarIcon } from "@chakra-ui/icons";
// import FirstNav from "@/components/firstNav";
// import Navbar from "@/components/navbar";
import { useRouter } from "next/router";

// Settings for the slider
const settings = {
  dots: false,
  infinite: false,
  speed: 2000,
  slidesToShow: 3,
  slidesToScroll: 3,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: false,
        dots: false
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};

export default function Carousel() {
  // As we have used custom buttons, we need a reference variable to
  // change the state
  const [slider, setSlider] = useState(null);

  // These are the breakpoints which changes the position of the
  // buttons as the screen size changes
  const top = useBreakpointValue({ base: "90%", md: "50%" });
  const side = useBreakpointValue({ base: "30%", md: "10px" });

  // These are the images used in the slide
  const cards = [
    "https://images.unsplash.com/photo-1612852098516-55d01c75769a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60",
    "https://images.unsplash.com/photo-1627875764093-315831ac12f7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60",
    "https://images.unsplash.com/photo-1571432248690-7fd6980a1ae2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60",
  ];
  const router =useRouter()
  const [isLagerThan768] = useMediaQuery('(min-width: 768px)')
  const { isOpen, onToggle } = useDisclosure()
  return (
    <>
    {/* <FirstNav/>
    <Navbar/> */}
     <InputBar />
      {isLagerThan768 ? <Navbar></Navbar> : <></>}
    <Box>
    <Flex fontSize={25} ml={35} >
      <Text>Home</Text>
      <ChevronRightIcon h={10}/>
      
      <Text color={'blue'}>Categories</Text>
      <br/>
      
      
    </Flex>
      <Flex  justifyContent={'space-between'} py={10}>
      <Text  py={0} ml={20} fontSize={25}>{router.pathname.replace('/','')}</Text>
    
     
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
        <Box>
        <Button onClick={onToggle} as={Link} href={'#fade'} bgColor={'messenger.400'} color={'white'} mt={[10,10,10,0,0]} w={'150px'}  >Tous Nos Articles</Button>
        </Box>
         
        {/* Left Icon */}
        <Flex >
       
        <IconButton
          aria-label="left-arrow"
          colorScheme="messenger"
          borderRadius="full"
          mr={10}
          left={side}
          top={top}
          transform={"translate(0%, -50%)"}
          zIndex={2}
          onClick={() => slider?.slickPrev()}
        >
          <BiLeftArrowAlt />
        </IconButton>
        {/* Right Icon */}
        <IconButton
          aria-label="right-arrow"
          colorScheme="messenger"
          borderRadius="full"
          ml={20}
          right={side}
          top={top}
          transform={"translate(0%, -50%)"}
          zIndex={2}
          onClick={() => slider?.slickNext()}
        >
          <BiRightArrowAlt />
        </IconButton>
        </Flex>
       
        {/* Slider */}
     
      </Flex>
      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        {Data.map((data, index) => (
          <Center>
          <Box
            // maxW="fu"
            width={"full"}
            height={"fit-content"}
            borderWidth="1px"
            borderRadius="lg"
            // overflow="hidden"
            px={10}
            boxShadow={"2xl"}
            mx={10}
            mb={20}
            pb={5}
            
          >
            <Box width={'150px'} height={'170px'} pt={10} pl={10}>
            <img src={data.images[0]} alt={data.title} />
            </Box>
            

            <Box p="6">
              <Box
                mt="1"
                fontWeight="semibold"
                as="h5"
                lineHeight="tight"
                noOfLines={2}
                w={'fit-content'}
                height={'50px'}
              >
                {data.title}
              </Box>

              <Box
                mt="1"
                fontWeight="normal"
                
                lineHeight="tight"
                noOfLines={2}
                w={'fit-content'}
                height={'50px'}
              >
                <Text>{data.description.toString()}</Text>
              </Box>
              <Box>
                {data.prix}
                <Box as="span" color="gray.600" pl={2} fontSize="sm">
                  XOF
                </Box>
              </Box>

              <Box display="flex" mt="2" alignItems="center">
                {Array(5)
                  .fill("")
                  .map((_, i) => (
                    <StarIcon key={i} color={i < 4 ? "teal.500" : "gray.300"} />
                  ))}
              </Box>
              <Box>
                <Button bgColor={'blue'} mt={3} borderRadius={'66px'} color={'white'}> Ajouter au panier</Button>
              </Box>
            </Box>
          </Box>
          </Center>
        ))}
        {/* </SimpleGrid> */}
      </Slider>
      <Collapse in={isOpen}  id={'fade'} animateOpacity >
        <Center>
        <Text color={'black'} fontSize={50}>Listes de tous nos produits</Text>
        </Center>
        
       <SimpleGrid columns={[2,2,2,4,4]}>

       {Data.map((data, index) => (
          <Box
            maxW="sm"
            width={"fit-content"}
            height={"fit-content"}
            borderWidth="1px"
            borderRadius="lg"
            // overflow="hidden"
            
            // boxShadow={"2xl"}
           ml={5}
            mb={20}
            pb={5}
            
          >
            <Box width={'150px'} height={'170px'} pt={10} pl={10}>
            <img src={data.images[0]} alt={data.title} />
            </Box>
            

            <Box p="6">
              <Box
                mt="1"
                fontWeight="semibold"
                as="h5"
                lineHeight="tight"
                noOfLines={2}
                w={'179px'}
                height={'50px'}
              >
                {data.title}
              </Box>

              <Box
                mt="1"
                fontWeight="normal"
                
                lineHeight="tight"
                noOfLines={2}
                w={'fit-content'}
                height={'50px'}
              >
                <Text>{data.description.toString()}</Text>
              </Box>
              <Box>
                {data.prix}
                <Box as="span" color="gray.600" pl={2} fontSize="sm">
                  XOF
                </Box>
              </Box>

              <Box display="flex" mt="2" alignItems="center">
                {Array(5)
                  .fill("")
                  .map((_, i) => (
                    <StarIcon key={i} color={i < data.rating ? "teal.500" : "gray.300"} />
                  ))}
              </Box>
              <Box>
                <Button bgColor={'blue'} mt={3} borderRadius={'66px'} color={'white'}> Ajouter au panier</Button>
              </Box>
            </Box>
          </Box>
        ))}
       </SimpleGrid>
      </Collapse>
      </Box>
      <FooterR/>
   
    
    </>
  );
}
