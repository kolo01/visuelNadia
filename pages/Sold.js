import React, { Component } from 'react'
import DropIn from "braintree-web-drop-in-react";

import { Button, Link, useToast } from '@chakra-ui/react';
import secureLocalStorage from "react-secure-storage";
import Head from "next/head";

export default class Subscriptions extends Component {
instance;

state = {
        clientToken: null,
        purchaseComplete: false  
};
   
    async buy() {
        const Cart = secureLocalStorage.prix
       
        // Send the nonce to your server
        const { nonce } = await this.instance.requestPaymentMethod();
        const res = await fetch('/api/payment/checkout',
            {
              body: JSON.stringify({
                paymentMethodNonce: nonce,
                user_id: "1234",
                price: Cart
              }),
              headers: {
                'Content-Type': 'application/json'
              },
              method: 'POST'
            }
          )
        const result = await res.json()
        if (result.result == "success") {
            this.setState({
                purchaseComplete: true
            });
            alert("votre achat de "+ Cart+ " a ete completer")
            secureLocalStorage.removeItem('Cart')

            

        }
    }
        
    render() {
      const message = "revenir a l'accueil";
        if (this.state.purchaseComplete) {
          
            return (
              <div>
                <Head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-RFSVQTGJ87"
        ></script>
        <script strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments)}
           gtag('js', new Date()); 
           gtag('config', 'G-RFSVQTGJ87');
           `}
          
        </script>
        </Head>
                <h1>Completed.</h1>
            <Button as={Link} href={"/"}>{message}</Button>
              </div>
            );
          } else {
          return (
            <div>
              <DropIn
                options={{ authorization: "sndqjb5dk"}}
                onInstance={(instance) => (this.instance = instance)}
                
              />
              <button onClick={this.buy.bind(this)}>Submit</button>
            </div>
          );
          }
        }
    }