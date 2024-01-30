import { Button, Drawer,Flex,Box,Link, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Input, useDisclosure, Icon, useToast } from '@chakra-ui/react';
import React from 'react';
import MenuItem_Link from './MenuItem_Link';
import { HamburgerIcon } from "@chakra-ui/icons";
import { FaShoppingCart } from "react-icons/fa";
import { useRouter } from 'next/router';
import { IoIosNotifications } from 'react-icons/io';


const ResponsiveMenu = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const router = useRouter()
    const toast = useToast();
    return (
        <>
        <Flex >
        <Flex display={["flex","flex","flex","none","none"]}>
<Link
                  href={"#"}
                  _hover={{
                    bgColor: "white",
                    textDecoration: "none",
                  }}
                >
                  {" "}
                  <Button
                  mt={2}
                  onClick={()=>{
                    toast({
                      title:"En cours de construction",
                      status:"info",
                      duration:9000
                    })
                  }}
                    _hover={{
                      bgColor: "white",
                      color: "cyan.700",
                      textDecoration: "none",
                    }}
                    leftIcon={<Icon as={IoIosNotifications} fontSize={"20px"} />}
                    bgColor={"white"}
                  >
                    
                  </Button>
                </Link>



 <Box mt={4} as={Link}   _hover={{
                      bgColor: "white",
                      color: "cyan.700",
                      textDecoration: "none",
                    }} href={"/Cart"} cursor={"pointer"} display={["flex","flex","flex","none","none"]}>
        <FaShoppingCart fontSize={"15px"}  />
        </Box>
</Flex>
        <Button
        mt={2}
              display={["flex","flex","flex","none","none"]}
              fontSize={"15px"}
                onClick={onOpen} variant='' colorScheme='#08566e'
                rightIcon={<HamburgerIcon />} mr={{ base: 5, md: 5 }}
            >
                Menu
            </Button>
        </Flex>
           
            <Drawer isOpen={isOpen} onClose={onClose} placement={"left"} >
                <DrawerOverlay />
                <DrawerContent  >
                    <DrawerCloseButton />
                    <DrawerHeader height={"80px"}bgColor={"cyan.700"} pb={10}></DrawerHeader>

                    <DrawerBody  bgColor={"white"}>
                        <MenuItem_Link />
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default ResponsiveMenu;