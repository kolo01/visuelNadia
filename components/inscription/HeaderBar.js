import { Box, Center, Flex, HStack, Link, Text, useMediaQuery, useToast } from '@chakra-ui/react';
import React from 'react';
import ResponsiveMenu from '../generale/ResponsiveMenu';
import MenuItem_Link from '../generale/MenuItem_Link';

const HeaderBar = () => {
    const [isLagerThan768] = useMediaQuery('(min-width: 768px)')
    const toast = useToast()
    return (
        <>
         
            <Flex
           
                width={'100%'} height={'4em'} display={'flex'}
                align={'center'} justify={{ base: 'space-between', md: 'space-around' }}
            >
                <Center
                    height={'100%'} width={'auto'}
                    ml={{ base: 4, md: 0 }}
                >
                    <Text
                        color={'#ffc300'} fontSize={'2em'}
                        fontWeight={'bold'}
                    >
                        Chap
                    </Text>
                </Center>
                {isLagerThan768 ? <MenuItem_Link /> : <ResponsiveMenu />}
            </Flex>
        </>
    );
};

export default HeaderBar;