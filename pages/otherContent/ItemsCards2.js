import { db } from "@/FIREBASE/clientApp";
import { SimpleGrid, Text } from "@chakra-ui/react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import Exemple from "./test";
import { useRouter } from "next/router";
import secureLocalStorage from "react-secure-storage";
import Head from "next/head";
const Listing = ({categorie}) => {
   
    const [tab,setTab] = useState([])
    useEffect(()=>{
        // console.log("categorie")
        // console.log(JSON.parse(secureLocalStorage.getItem(categorie)))

    })
   

    
    return(
    <>
         <Exemple key={index} dat={JSON.parse(secureLocalStorage.getItem(categorie))} />
    </>
    )
   
   
       

};

export default function Pagination() {
  const [cat, setCat] = useState([]);
  const [total, setTotal] = useState(0);
  const [nombre, setNombre] = useState(0);
  const [check, setCheck] = useState(0);
    const router = useRouter()
  const GetCat = async () => {
    const q = query(collection(db, "Services/"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      cat.push(doc.id);
    secureLocalStorage.setItem("all",cat) 
  
    });
    
  };

  const GetAll = () => {
  
    cat.map(async (data, index) => {
    

      const q = query(
        collection(db, "Admin/"),
        where("categorie", "==", String(data))
      );
      const query1 = await getDocs(q);
      const docs = query1.docs.map((doc) => {
        const data = doc.data();
        data.id = doc.id;
        return data;
      });
      secureLocalStorage.setItem(`${data}`, JSON.stringify(docs));
    });
    router.push("/otherContent/test")
  };
  useEffect(() => {
   
      
      GetCat(), GetAll();
      setCheck(1);
    
  }, [check, GetAll, GetCat]);

  return (
    <>
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
      <SimpleGrid>
        {cat.map((data, index) => (
          <>
            <Listing key={index} categorie={data} />
          </>
        ))}
      </SimpleGrid>
    </>
  );
}
