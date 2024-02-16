'use client'

import React from 'react'
import { Box, Heading, Text } from '@chakra-ui/react'
import { CheckCircleIcon } from '@chakra-ui/icons'
import InputBar from '@/components/InputBar'
import Navbar from '@/components/Navbar'

function SuccesDevis() {
  return (
    <>
    <InputBar/>
      <Navbar></Navbar>
    <Box textAlign="center" py={10} px={6}>
    <CheckCircleIcon boxSize={'50px'} color={'green.500'} />
    <Heading as="h2" size="xl" mt={6} mb={2}>
     Merci pour votre confiance.
    </Heading>
    <Text color={'gray.500'}>
        Nous vous contacterons sous peu. Vous pouvez voir votre devis dans la section Mes devis.

    </Text>
  </Box>
  </>
  )
}

export default SuccesDevis