import { Box, Center, Flex, Heading, Image, Text } from "@chakra-ui/react";

export default function AffPlats({data,type}){
    return(
    <>
    {data.categorieMenu == type?
       
            
            <Box  >
            <Flex justifyContent={"space-between"} width={["185px","185px","200px","250px","250px"]} >
            <Text fontSize={["15px","15px","15px","15px","15px"]}   fontWeight={300}>{data.nom}</Text>
            <Text fontSize={["15px","15px","15px","15px","15px"]} fontWeight={600} mr={2}>{data.prix}€</Text>
            </Flex>
            {/* <Text  fontSize={["10px","10px","10px","15px","15px"]}>{data.description !="__"? data.description : ""}</Text> */}
            </Box>
        :<></>}
    </>
    )
}