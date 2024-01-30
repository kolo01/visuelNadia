import { Box, Center, Flex, Image, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import secureLocalStorage from "react-secure-storage";

export default function Slide(){
    const [carde,setCarde] = useState([])
    useEffect(()=>
     
      {JSON.parse(secureLocalStorage.getItem("AlimentationDatos")).map((card, index) => 
          {
              setCarde(card)
          })
    },[])
    return(
        <Center backgroundColor={'#FFFFEA'} mt={5}>
        <Flex >
        <Carousel showThumbs={true} autoPlay>
          {Object.values(carde).map((card, index) =>
          (
            <Box key={index}>
                <Image alt={'image du slider'} src={card.imageUrl}/>
                <Text>{card.nom}</Text>
            </Box>  
          )
           
          )}
          </Carousel>
        </Flex>
    
      </Center>
    )
}