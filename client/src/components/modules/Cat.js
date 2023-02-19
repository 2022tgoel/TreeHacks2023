import React from "react";
import { useEffect, useState } from "react";
import img0 from "../../../images/Cat_pca_0.png"
import img1 from "../../../images/Cat_pca_1.png"
import img2 from "../../../images/Cat_pca_2.png"
import img3 from "../../../images/Cat_pca_3.png"
import img4 from "../../../images/Cat_pca_4.png"
import img5 from "../../../images/Cat_pca_5.png"
import img6 from "../../../images/Cat_pca_6.png"
import img7 from "../../../images/Cat_pca_7.png"
import img8 from "../../../images/Cat_pca_8.png"
import img9 from "../../../images/Cat_pca_9.png"

const MovingCat = () => {
    const [imageNum, setImageNum] = useState(0);
    console.log(imageNum);
    const onClick = () => {
        if (imageNum >= 9) return;
        setImageNum(imageNum+1);
        console.log(imageNum);
    }

    const getImage = () => {
        switch(imageNum){
            case 0:
                return img0;
            case 1:
                return img1;
            case 2:
                return img2;
            case 3:
                return img3;   
            case 4:
                return img4; 
            case 5:
                return img5;
            case 6:
                return img6;   
            case 7:
                return img7; 
            case 8:
                return img8; 
            case 9:
                return img9;        
        }
    }

    return (
    <>
    <div style={{position: "fixed", bottom: "0px", right: "0px"}}> 
        <img src={getImage()} height={300} width={300} onClick={() => onClick()}/>
      </div>
    </>
      
    )
  }

export default MovingCat;