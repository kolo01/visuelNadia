import { AspectRatio, Box, Button, Flex, Heading, Link } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BiWorld } from "react-icons/bi";
import { BsTelephoneOutboundFill } from "react-icons/bs";

export default function Mapped({adresse,numero,web}){
  const [dis,setDis] = useState(true)
  const [site,setSite] = useState("")
  const [horaire,setHoraire] = useState([])

  const makeHour = ({data,jour}) =>{
       
    const heureActu = jour.getHours()
    const plage = data.horaire[parseInt(jour.getDay())]
    console.log(plage)
    try{
        let debut = plage.slice(0,5)
        let fin = plage.slice(6,8)
        if(fin == 24){
            fin=0
        }
        console.log("debut",parseInt(debut))
        console.log("actu",heureActu)
        console.log("fin",fin)
        let i = 0;
        let deadline = debut;
        for (let index = 0; index < 24; index++) {
            if(parseInt(debut)<23 && heureActu>9){
                if((heureActu+index+1)<=23){
                    horaire.push(heureActu+index+1)
                }
                debut= parseInt(debut)+1
            }else{
                if (i<parseInt(fin)) {
                    horaire.push(i)
                i=i+1
                }
                
            }
            
        }
    }catch(error){
        setHoraire(["Indisponible"])
    }
   
   
}
  useEffect(()=>{
    setSite(`${web}`)
    if(site.length>5){
      setDis(true)
    }
  },[web,site])
    return(
        <>
      
        <AspectRatio maxW='560px' width={"300px"} ratio={16/9}>
  <iframe
  title="map"
  allowFullScreen
    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAoJQLE8uAbWnyPHCv-_udEUhH7HQooJlM&q=${adresse}`}
  />
</AspectRatio>
<Flex  display={{base:"none",lg:"flex"}} flexDir={{base: "column",lg:"row"}} mt={5} mx={2}>
{/* <Box mr={2}>
                    <Button
                      color={"#fff"}
                      width={"150px"}
                      height={"30px"}
                      as={"a"}
                      // onClick={onOpen}
                      bgColor={"green"}
                      _hover={{
                        backgroundColor: " cyan.900",
                        color: "white ",
                      }}
                      href={`tel:${numero}`}
                      leftIcon={<BsTelephoneOutboundFill />}
                    >
                      Nous contacter
                    </Button>
                  </Box>
                  <Box mr={2}>
                    <Button
                      color={"#fff"}
                      width={"150px"}
                      height={"30px"}
                      isDisabled={dis}
                      // as={Link}
                      // onClick={onOpen}
                      bgColor={"red"}
                      _hover={{
                        backgroundColor: " red.500",
                        color: "white ",
                      }}
                      href={`${web}`}
                      leftIcon={<BiWorld />}
                      isExternal
                    >
                      Site Web
                    </Button>
                  </Box> */}
                  <Box>
                  
                  
                  </Box>
</Flex>
        </>
    )
}