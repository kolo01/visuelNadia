import { ChakraProvider } from '@chakra-ui/react'
import '../styles/button.css'
import '../styles/globals.css'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import * as React from 'react'
import '@/components/carousel.css';



export default function App({ Component, pageProps }) {
  const initialOptions = {
    clientId:"ARcXRm974YVZmWeSX092RZm8pxtgQ4K0tzeXGsBO8-yRqO1DGwRxQweNKGnQKBsgJ0ub8IW-SQAfOtWC",
    currency: "EUR",
    intent: "capture",
}

  
  return(
   <>
     <ChakraProvider>
         <PayPalScriptProvider options={initialOptions}>
       
      <Component {...pageProps} />
      </PayPalScriptProvider>
    </ChakraProvider>
    </>
   
  ) 
}
