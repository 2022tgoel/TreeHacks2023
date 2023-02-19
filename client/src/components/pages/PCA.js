import React, { useState } from "react";
import ReactSlider from "react-slider";
import Chart from 'chart.js/auto';
import {Bar} from 'react-chartjs-2';
import TestImg from "../../../images/rect.png"

import "./style.css"
const PCA = () => {

    const [dim, setDim] = useState(0);
    const [dialogue, updateDialogue] = useState(0);

    const dimensionalityDescriptors = ["Low", "Medium", "High", "Very High"]

    const fscores = [
        [0.27, 0.33, 0.11, 0.13, 0.02, 0.02, 0.00, 0.10, 0.31, 0.27], 
        [0.70, 0.68, 0.48, 0.58, 0.57, 0.53, 0.14, 0.65, 0.81, 0.77],
        [0.36, 0.55, 0.14, 0.23, 0.16, 0.23, 0.00, 0.29, 0.51, 0.45],
        [0.41, 0.62, 0.20, 0.26, 0.13, 0.20, 0.15, 0.38, 0.57, 0.58]
    ];


    function getConfig(dimension) {
        return {
            labels: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
            datasets: [
              {
                label: "Scores",
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: fscores[dimension] 
              }
            ],
        }
    }
    
    return (
        <div className="u-textCenter">
        <h1>Accuracy (F1) Scores For Digit Classification</h1>
        <p className="center" style={{width: "80vw"}} >A really important technique often used in data analysis and machine learning is <strong>Principal Component Analysis (PCA)</strong> — this allows us to reduce the complexity of our data which can often make it easier to process! <br/><br/>In the below example, we've trained a classifier for a dataset consisting of images of digits (0-9) using <strong>InterSystems's IntegratedML</strong> tool. Maybe more isn't always better...<br/><br/>
        
        Play around with data dimensionality — what results in the best training scores?</p>
        <br></br>
        <div>Dimensionality: {dimensionalityDescriptors[dim]}</div>
        <ReactSlider
        className="horizontal-slider"
        thumbClassName="example-thumb"
        trackClassName="example-track"
        min="0"
        max="3"
        renderThumb={(props, state) => <div {...props}></div>}
        onChange={(dim) => setDim(dim)}
        />

        <Bar
          style={{margin: "5rem", marginBottom: "5px"}}
          data={getConfig(dim)}
          options={{
            title:{
              display:true,
              text:`Scores for Dataset After ${dimensionalityDescriptors[dim]} Dimension PCA`,
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 1.0
                }
            }
          }}
        />
        <p>Class Number</p>

        <img src={TestImg} style={{position: "absolute", top: "80vh", left: "80vw"}}/>

        </div>
   );
};

export default PCA;