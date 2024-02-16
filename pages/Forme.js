import InputBar from "@/components/InputBar";
import Navbar from "@/components/Navbar";

const { Box, FormControl, Switch, FormLabel, Input, useMediaQuery } = require("@chakra-ui/react")

const  ForMe =() =>{
    const [isLagerThan768] = useMediaQuery("(min-width: 768px)");
    return(
        <>
          <InputBar />
            {isLagerThan768 ? <Navbar></Navbar> : <></>}
        </>
    )
}

export default ForMe;