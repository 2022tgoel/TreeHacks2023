import React from "react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import "../../utilities.css";
import "./NeuralNet.css"

let sigmoid = require('sigmoid');

let s = 120; /* hardcoded */
let r = 35 

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

function rgbToHex(r, g, b) {
  return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
}

const Edge = (props) => { // edges are positioned relative to layers 
  let cx = (props.x1 + props.x2) / 2;
  let cy = (props.y1 + props.y2) / 2
  return (
  <>
    <g>
      <line className="edge" x1={props.x1} y1={props.y1} x2={props.x2} y2={props.y2} stroke={rgbToHex(120 + 30*props.weight, 0, 0)} strokeWidth={5}/>
      <circle className="btn" cx={cx-7} cy={cy} r={5} onClick={() => props.increaseWeight()}></circle>
      <circle className="btn" cx={cx+7} cy={cy} r={5} onClick={() => props.decreaseWeight()}></circle>
    </g>
    
  </>);
  
}

const MotionComponent = () => {
  return <motion.div
  className="box"
  animate={{
    scale: [1, 2, 2, 1, 1],
    rotate: [0, 0, 180, 180, 0],
    borderRadius: ["0%", "0%", "50%", "50%", "0%"]
  }}
  transition={{
    duration: 2,
    ease: "easeInOut",
    times: [0, 0.2, 0.5, 0.8, 1],
    repeat: Infinity,
    repeatDelay: 1
  }}
/>;
}

class NeuralNet extends React.Component {
  constructor(props){
    super(props);
    this.n = 3;
    let layer_sizes = Array(this.n).fill(1)
    layer_sizes[0] = 2;
    this.state = {layer_sizes : layer_sizes, weights : this.resetWeights(layer_sizes), row : 0, activations : null}; // two layers, each with size 1
    this.data = [[0, 0, 0], [1, 0, 1], [0, 1, 1], [1, 1, 0]];
    this.handleRowChange = this.handleRowChange.bind(this);
    this.handleRowSubmit = this.handleRowSubmit.bind(this);
  }

  resetWeights(layer_sizes){
    console.log("resetting weights");
    let weights = Array();
    for(let layer = 0; layer < this.n-1; layer++){
      // out_dim by in_dim matrix
      let mat = Array(layer_sizes[layer+1]);
      console.log("hellow", layer_sizes, layer, layer+1);
      for (let i = 0; i < layer_sizes[layer+1]; i++){
        mat[i] = Array(layer_sizes[layer]).fill(1);
      }
      weights.push(mat);
    }
    return weights;
  }

  handleSubmit(layer_num, value){
    let state = this.state.layer_sizes.slice();
    state[layer_num] = parseInt(value);
    this.setState({layer_sizes : state, weights : this.resetWeights(state)})
  }

  increaseWeight(layer, i, j){
    let weights = this.state.weights.slice();
    weights[layer][j][i]+=1;
    console.log(weights[layer][j][i]);
    this.setState({weights :weights});
  }

  decreaseWeight(layer, i, j){
    let weights = this.state.weights.slice();
    weights[layer][j][i]-=1;
    console.log(weights[layer][j][i]);
    this.setState({weights :weights});
  }

  getSVGNoActivations(){
    let height = s*Math.max(...this.state.layer_sizes)
    console.log("here");
    let components = Array();
    let key = 0;
    for (let layer =0; layer < this.n; layer++){
      let x = s*layer + s/2; // center of all the circles
      for (let node =0; node < this.state.layer_sizes[layer]; node++){
        let y = node*s + s/2 + height/2 - s*this.state.layer_sizes[layer]/2;
        // console.log(key, x, y);
        components.push(<circle key={key} cx={x} cy={y} r={r}></circle>);
        key+=1;
      }
    }

    for (let layer =0; layer < this.n-1; layer++){
      for (let i = 0; i < this.state.layer_sizes[layer]; i++){
        for (let j =0; j < this.state.layer_sizes[layer+1]; j++){
          let y1 = i*s + s/2 + height/2 - s*this.state.layer_sizes[layer]/2;
          let y2 = j*s + s/2 + height/2 - s*this.state.layer_sizes[layer+1]/2;
          // console.log(y1, y2);
          components.push(<Edge key={key} x1={s*layer+s/2} x2={s*(layer+1)+s/2} y1={y1} y2={y2} weight={this.state.weights[layer][j][i]} increaseWeight={()=> this.increaseWeight(layer, i, j)} decreaseWeight={()=> this.decreaseWeight(layer, i, j)}></Edge>)
          key++
        }
      }
    }

    return (<><svg position="absolute" width={s*this.n} height={height}>{components}</svg></>);
  }

  getSVGActivations(){
    let height = s*Math.max(...this.state.layer_sizes)
    console.log("here");
    let components = Array();
    let key = 0;
    for (let layer =0; layer < this.n; layer++){
      let x = s*layer + s/2; // center of all the circles
      for (let node =0; node < this.state.layer_sizes[layer]; node++){
        let y = node*s + s/2 + height/2 - s*this.state.layer_sizes[layer]/2;
        let activ = this.state.activations[layer][node];
        // console.log(key, x, y);
        components.push(<motion.circle key={key} cx={x} cy={y} r={r} initial={{ opacity: 0 }}
          animate={{ opacity:  activ}} transition={{delay : layer, duration : 1}}></motion.circle>);
        key+=1;
      }
    }

    for (let layer =0; layer < this.n-1; layer++){
      for (let i = 0; i < this.state.layer_sizes[layer]; i++){
        for (let j =0; j < this.state.layer_sizes[layer+1]; j++){
          let y1 = i*s + s/2 + height/2 - s*this.state.layer_sizes[layer]/2;
          let y2 = j*s + s/2 + height/2 - s*this.state.layer_sizes[layer+1]/2;
          // console.log(y1, y2);
          components.push(<Edge key={key} x1={s*layer+s/2} x2={s*(layer+1)+s/2} y1={y1} y2={y2} weight={this.state.weights[layer][j][i]} increaseWeight={()=> this.increaseWeight(layer, i, j)} decreaseWeight={()=> this.decreaseWeight(layer, i, j)}></Edge>)
          key++
        }
      }
    }

    return (<><svg position="absolute" width={s*this.n} height={height}>{components}</svg></>);
  }

  getSVGForNetwork(){
    if (this.state.activations == null) return this.getSVGNoActivations();
    else return this.getSVGActivations();
  }

  getLayersInp(){
    let layerInps = Array(this.n);
    for(let i = 0; i < this.n;i++){
      layerInps[i] = (<Layer key={i+1} number={i+1} handleSubmit={(value)=>this.handleSubmit(i, value)}></Layer>);
          
    }
    return <>{layerInps}</>
  }

  getTable(){
    let table = Array();
    table.push(<><tr>
      <th>Input 1</th>
      <th>Input 2</th>
      <th>Output</th>
    </tr></>);
    for (let i = 0; i < 4; i++){
      table.push(<><tr>
        <th>{this.data[i][0]}</th>
        <th>{this.data[i][1]}</th>
        <th>{this.data[i][2]}</th>
      </tr></>)
    }
    return <data><table>{table}</table></data>;
  }

  handleRowChange(event){
    if (event.target.value == '') return;
    console.log("changing row", event.target.value)
    this.setState({row : parseInt(event.target.value)})
    console.log("state", this.state);
  }

  neuron(arr1, arr2){
    console.log("dot product", arr1, arr2);
    let x = 0;
    for (let i = 0; i < arr1.length;i++) x+=arr1[i]*arr2[i];
    return sigmoid(x);
  }

  handleRowSubmit(event){
    // run the neural network on this row
    console.log(this.data);
    let dataRow= this.data[this.state.row];
    console.log(dataRow);
    let input = [dataRow[0], dataRow[1]];
    let neuralValues = Array();
    let weights = this.state.weights;
    neuralValues.push(input);
    for (let layer = 0; layer < this.n-1; layer++){
      let output = Array();
      for (let j = 0; j < weights[layer].length; j++){
        // comuputing the jth output value
        output.push(this.neuron(weights[layer][j], neuralValues[neuralValues.length - 1]))
      }
      neuralValues.push(output);
    }
    console.log(neuralValues);

    // animate the color change of the neurons 
    
    this.setState({activations : neuralValues});
    //
    event.preventDefault();
  }

  render(){
    console.log(this.state.weights);
    return (
      <>
      <h1>Hand Train a Model for XOR</h1>
      <page>
        {this.getTable()}
        <layersinp>
          Specify the architecture of the network<br></br>
          The input layer should have two dimensions <br></br>
          and the output layer should have one dimension <br></br>
          {this.getLayersInp()}
        </layersinp>
        <network>
          {this.getSVGForNetwork()}

        </network>
        <run>
          <label>Run data on a row (1-4):</label><br></br>
          <input type="text"onChange={this.handleRowChange}></input><br></br>
          <button type="submit" onClick={this.handleRowSubmit}>Submit</button>
        </run>
      </page>
      {/* <MotionComponent></MotionComponent> */}
      
      </>
      
    );
  }
}

export default NeuralNet;
