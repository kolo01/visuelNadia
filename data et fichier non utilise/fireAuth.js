import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithCredential,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import React from "react";


import { useState } from "react";
import { Box, Button, Center, Flex, Input } from "@chakra-ui/react";

export default function SignInScreen() {
  const [user, setUser] = useState();
  const [password, setPassword] = useState();
  const [email,setEmail] = useState()
  const auth = getAuth()
  const loginUSer=async ()=>{
        await signInWithEmailAndPassword(auth,user,password).then((userCredential)=>{
   
        setEmail(userCredential.user.email)
    }).catch((error)=>{
        const errorCode =error.code;
        const errorMessage = error.message;
        if (errorMessage == "Firebase: Error (auth/user-not-found)."){
          // console.log("VEUILLEZ VERIFIER VOS INFOS DE CONNEXION")
        }
    })
  }
  return (
    <>
      <Center>
        
        <Box>
          <Flex justify-content={'space-around'}>
            <Input type="email" onChange={ev=>setUser(ev.target.value)}/>
            <Input type="password" onChange={e=>setPassword(e.target.value)}/>
            <Button type="submit" onClick={()=>loginUSer()}>Submit</Button>
          {/* {email} */}
          </Flex>
        </Box>
        
        
      </Center>
    </>
  );
}
