import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/react";

export default function Keyword() {
  const motCle = [
    "Attieke",
    "Placali",
    "Huile Rouge",
    "Ivoirien",
    "Fret",
    "Mêches",
  ];
  return (
    <>
      <Flex mt={3} ml={-240} >
        {motCle.map((data, index) => (
          <Box
            key={index}
            m={2}
            color={"black"}
            minWidth={"150px"}
            boxSizing={"border-box"}
            border={"1px solid black"}
            height={"100%"}
            backgroundColor={"white"}
            p={"11px 16px"}
            fontSize={"16px"}
            fontWeight={"semibold"}
            textAlign={"left"}
            cursor={"pointer"}
            borderRadius={"12px"}
            width={"150px"}
            onClick={() => alert("Nous y travaillons")}
            _hover={{
                color:"white",
                bgColor:"black"
            }}
          >
            <Text>{motCle[index]}</Text>
          </Box>
        ))}
      </Flex>
    </>
  );
}
