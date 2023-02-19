import React from "react";
import Background from "../../images/Homepage.png";
import NNL from "../../images/NNL.png";
import MIABL from "../../images/MIABL.png";

import "./style.css"
const HomePage = () => {
  return (
    <div style={{width: "100vw", height: "105vh", backgroundImage: `url(${Background})`, backgroundSize: "cover", marginTop: "-5vh"}}>
      <div style={{position: "absolute", top: "32vh", left: "30vw"}}>
        <img src={NNL} onClick={() => { window.location.href = "/xornet"}} style={{width: "25vw"}}></img><br></br>
        <img src={MIABL} onClick={() => { window.location.href = "/pca"}} style={{width: "25vw"}}></img>
      </div>
    </div>
  );
};

export default HomePage;