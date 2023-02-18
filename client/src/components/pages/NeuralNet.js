import React from "react";
import { useEffect, useState } from "react";
import "../../utilities.css";
import "./NeuralNet.css"

let s = 54.8; /* hardcoded */

const Layer = (props) => {
  const [value, setValue] = useState(0);
  let x = "layer " + props.number ;

  const handleChange = (event) => {
    setValue(event.target.value);
  }

  const handleSubmit = (event) => {
    console.log("setting", value);
    props.handleSubmit(value);
  }
  return (
  <>

    <label htmlFor= {x}>Layer {props.number}:</label><br></br>
    <input type="text" id={x} name={x} onChange={handleChange}></input><br></br>
    <button type="submit" onClick={handleSubmit}>Submit</button>
    <br></br>
  </>
  );
}

// const Edge = (props) => { // edges are positioned relative to layers 
//   let c = props.coordinates;
//   console.log(c);
//   return (<svg position="absolute" width="500" height="500"><line x1={s/2} y1={s/2} x2={s/2+c[0]} y2={s/2+c[1]} stroke="black"/></svg>);
// }

class NeuralNet extends React.Component {
  constructor(props){
    super(props);
    this.n = 3;
    this.state = {layer_sizes : Array(this.n).fill(1)}; // two layers, each with size 1
    
  }

  handleSubmit(layer_num, value){
    let state = this.state.layer_sizes.slice();
    state[layer_num] = value;
    this.setState({layer_sizes : state});
  }

  // getEdgeCoordinates(layer, n1, n2){ // relative to the first node, get what the diff should be for the second coord
  //   let height = Math.max(...this.state.layer_sizes) * s; 
  //   let h1 = n1*s + s/2 + height/2 - s*this.state.layer_sizes[layer]/2;
  //   let h2 = n2*s + s/2 + height/2 - s*this.state.layer_sizes[layer+1]/2;
  //   return [s, h2-h1];
  // }

  // getEdge(layer, n1, n2){
  //   let coord = this.getEdgeCoordinates(layer, n1, n2);
  //   return <><Edge coordinates={coord} key={n1*n2}></Edge></>
  // }

  // getNode(layer_num, n1){ // put all the edges
  //   console.log("building node", layer_num, n1);
  //   let edges = Array();
  //   console.log("here");
  //   if (layer_num == this.n-1) return <node>{edges}</node>;
  //   console.log(layer_num, n1);
  //   for (let j = 0; j < this.state.layer_sizes[layer_num+1]; j++){
  //     console.log("building edge", layer_num, n1, j);
  //     edges.push(this.getEdge(layer_num, n1, j));
  //   }
  //   return <node key={n1}>{edges}</node>;
  // }

  // getLayer(layer_num){
  //   let n = this.state.layer_sizes[layer_num];
  //   let nodes = Array(n);
  //   for (let i = 0;i < n; i++){
  //     nodes[i] = this.getNode(layer_num, i);
  //   }
  //   return <><layer key={layer_num}>{nodes}</layer></>;
  // }

  // getLayers(){
  //   console.log("building layers");
  //   let n = this.n;
  //   let l = Array(n);
  //   for (let i = 0; i < n; i++){
  //     l[i] = this.getLayer(i);
  //   }
  //   return <>{l}</>
  // }

  getSVGForNetwork(){
    let height = s*Math.max(...this.state.layer_sizes)
    console.log("here");
    let components = Array();
    let key = 0;
    for (let layer =0; layer < this.n; layer++){
      let x = s*layer + s/2; // center of all the circles
      for (let node =0; node < this.state.layer_sizes[layer]; node++){
        let y = node*s + s/2 + height/2 - s*this.state.layer_sizes[layer]/2;
        console.log(key, x, y);
        components.push(<circle key={key} cx={x} cy={y} r={20}></circle>);
        key+=1;
      }
    }

    for (let layer =0; layer < this.n-1; layer++){
      for (let i = 0; i < this.state.layer_sizes[layer]; i++){
        for (let j =0; j < this.state.layer_sizes[layer+1]; j++){
          let y1 = i*s + s/2 + height/2 - s*this.state.layer_sizes[layer]/2;
          let y2 = j*s + s/2 + height/2 - s*this.state.layer_sizes[layer+1]/2;
          console.log(y1, y2);
          components.push(<line key={key} x1={s*layer+s/2} x2={s*(layer+1)+s/2} y1={y1} y2={y2} stroke="black"></line>)
          key++
        }
      }
    }

    print(components);
    return (<><svg position="absolute" width={s*this.n} height={height}>{components}</svg></>);
  }

  getLayersInp(){
    let layerInps = Array(this.n);
    for(let i = 0; i < this.n;i++){
      layerInps[i] = (<Layer key={i+1} number={i+1} handleSubmit={(value)=>this.handleSubmit(i, value)}></Layer>);
          
    }
    return <>{layerInps}</>
  }

  render(){
    return (
      <>
      <h1>Hello</h1>
      <page>
        <layersinp>
          Hello, this is where you specify the network <br></br>
          {this.getLayersInp()}
        </layersinp>
        <network>
          Hi this is the network
          {this.getSVGForNetwork()}
        </network>
      </page>
        
      
      </>
      
    );
  }
}

export default NeuralNet;
