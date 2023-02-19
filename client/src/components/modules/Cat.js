import React from "react";
import TestImg from "../../../images/rect.png"

const MovingCat = () => {
    
    return (
    <>
    <div style={{position: "fixed", bottom: "0px", right: "0px"}}> 
        <img src={TestImg} height={300} width={300}/>
      </div>
    </>
      
    )
  }

export default MovingCat;