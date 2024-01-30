import { ChevronRightIcon, StarIcon } from "@chakra-ui/icons";
import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Box, IconButton, useBreakpointValue } from "@chakra-ui/react";
// Here we have used react-icons package for the icons
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
// And react-slick as our Carousel Lib
import Slider from "react-slick";
import Data from "@/data/data";
import { useState } from "react";

// Settings for the slider
const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export default function CatH() {
  const [slider, setSlider] = useState(null);
  const data = Data;

  const settings = {
    className: "center",
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 6,
    swipeToSlide: true,
  };
  const top = useBreakpointValue({ base: "90%", md: "50%" });
  const side = useBreakpointValue({ base: "30%", md: "40px" });
  const router = useRouter();
  return (
    <>
      <Flex justifyContent={"space-between"}>
        <Flex ml={35}>
          <Text>Home</Text>
          <ChevronRightIcon fontSize={30} />
          Categories
          <br />
        </Flex>
        <Box>
          <IconButton
            aria-label="left-arrow"
            variant="ghost"
            // position="relative"
            left={side}
            top={top}
            transform={"translate(0%, -50%)"}
            zIndex={2}
            onClick={() => slider?.slickPrev()}
          >
            <BiRightArrowAlt size="40px" />
          </IconButton>
          {/* Right Icon */}
          <IconButton
            aria-label="right-arrow"
            variant="ghost"
            // position="absolute"
            right={side}
            top={top}
            transform={"translate(0%, -50%)"}
            zIndex={2}
            onClick={() => slider?.slickNext()}
          >
            <BiLeftArrowAlt size="40px" />
          </IconButton>
        </Box>
      </Flex>
      <Text ml={20} mb={10}>
        {router.pathname.replace("/", "")}
      </Text>
      <Box>
        <Slider {...settings} ref={(slider) => setSlider(slider)}>
          {Data.map((data, index) => (
            <Box
              key={index}
              maxW="sm"
              width={"sm"}
              height={"sm"}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              px={10}
              boxShadow={"2xl"}
              mx={10}
              mb={10}
              pb={10}
            >
              <Box width={"150px"} height={"170px"} pt={10} pl={10}>
                <Image src={data.images[0]} alt={data.title} />
              </Box>

              <Box p="6">
                <Box
                  mt="1"
                  fontWeight="semibold"
                  as="h5"
                  lineHeight="tight"
                  noOfLines={2}
                  w={"fit-content"}
                  height={"50px"}
                >
                  {data.title}
                </Box>

                <Box
                  mt="1"
                  fontWeight="normal"
                  lineHeight="tight"
                  noOfLines={2}
                  w={"fit-content"}
                  height={"50px"}
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
                      <StarIcon
                        key={i}
                        color={i < 4 ? "teal.500" : "gray.300"}
                      />
                    ))}
                </Box>
                <Box>
                  <Button
                    bgColor={"blue"}
                    mt={3}
                    borderRadius={"66px"}
                  ></Button>
                </Box>
              </Box>
            </Box>
          ))}
          {/* </SimpleGrid> */}
        </Slider>
      </Box>
    </>
  );
}
