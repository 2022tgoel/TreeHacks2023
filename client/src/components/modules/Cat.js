import React from "react";
import { motion, useScroll } from "framer-motion";
import TestImg from "../../../images/rect.png"

const MovingCat = () => {
    const { scrollYProgress } = useScroll();
    
    return (
        <>
        <img src={TestImg} height={100} width={100} style={{position : absolute, top: window.innerHeight - 10}}/>
        </>
    // <>
    // <motion.div style={{position : absolute, top: window.innerHeight - 10}} /> 
    //     <img src={TestImg} height={100} width={100}/>
    //   <motion.div/>
    // </>
      
    )
  }

export default MovingCat;