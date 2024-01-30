import { ChakraProvider } from '@chakra-ui/react'
import '../styles/button.css'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import * as React from 'react'
import "../globals.css"
import '@/components/carousel.css';
import LoadingBar from 'react-top-loading-bar';
import { useRouter } from 'next/router';


export default function App({ Component, pageProps }) {
  const initialOptions = {
    clientId:"ARcXRm974YVZmWeSX092RZm8pxtgQ4K0tzeXGsBO8-yRqO1DGwRxQweNKGnQKBsgJ0ub8IW-SQAfOtWC",
    currency: "EUR",
    intent: "capture",
};
  const [progress,setProgress] = React.useState(0)
  const router = useRouter()

React.useEffect(()=>{
  //debut
  router.events.on("routeChangeStart",()=>{
    setProgress(40)
  })
  //::fin
  router.events.on("routeChangeComplete",()=>{
    setProgress(100)
  })
})
  
  return(
    <>
     <LoadingBar color='rgb(180,130,251)' progress={progress} waitingTime={400} onLoaderFinished={()=>{setProgress(0)}}/>
     <ChakraProvider>
         <PayPalScriptProvider options={initialOptions}>
       
      <Component {...pageProps} />
      </PayPalScriptProvider>
    </ChakraProvider>
    </>
   
  ) 
}
