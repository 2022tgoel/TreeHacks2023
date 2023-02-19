import React, { useState } from "react";
import "../../utilities.css";
import {MnistData} from "../../data.js"

const Spaceship = () => {

  const options = ["Pattern Matching Lab", "Dense Lab"]

  const [layers, setLayers] = useState([options[0], options[0]]);

  function generateNeuralNet() {

    console.log("Hi");
    const model = tf.sequential();

    const IMAGE_WIDTH = 28;
    const IMAGE_HEIGHT = 28;
    const IMAGE_CHANNELS = 1; 
    
    console.log("Hi");
    
    if (layers[0] == "Pattern Matching Lab") {
      model.add(tf.layers.conv2d({
        inputShape: [IMAGE_WIDTH, IMAGE_HEIGHT, IMAGE_CHANNELS],
        kernelSize: 5,
        filters: 8,
        strides: 1,
        activation: 'relu',
        kernelInitializer: 'varianceScaling'
      }));
     
      model.add(tf.layers.maxPooling2d({poolSize: [2, 2], strides: [2, 2]}));
    } else {
      model.add(tf.layers.flatten());
      model.add(tf.layers.dense(IMAGE_WIDTH * IMAGE_HEIGHT));
    }

    console.log("Hi");

    for (let i = 1; i < layers.length; i++) {
      if (layers[i] == "Dense Lab") {
        model.add(tf.layers.dense({
          units: 10,
          kernelInitializer: 'varianceScaling',
          activation: 'relu'
        }));
      } else {
        model.add(tf.layers.conv2d({
          kernelSize: 5,
          filters: 16,
          strides: 1,
          activation: 'relu',
          kernelInitializer: 'varianceScaling'
        }));
        model.add(tf.layers.maxPooling2d({poolSize: [2, 2], strides: [2, 2]}));
      }
      console.log(i);
    }

    console.log("Hi");

    model.add(tf.layers.flatten());
    const NUM_OUTPUT_CLASSES = 10;
    model.add(tf.layers.dense({
      units: NUM_OUTPUT_CLASSES,
      kernelInitializer: 'varianceScaling',
      activation: 'softmax'
    }));

    const optimizer = tf.train.adam();
    model.compile({
      optimizer: optimizer,
      loss: 'categoricalCrossentropy',
      metrics: ['accuracy'],
    });

    console.log("Neural Network Generated!");
    console.log(model.summary());

    return model;
  }

  function trainModel(model, data) {
    const metrics = ['loss', 'val_loss', 'acc', 'val_acc'];
    const container = {
      name: 'Model Training', tab: 'Model', styles: { height: '1000px' }
    };
    
    const BATCH_SIZE = 512;
    const TRAIN_DATA_SIZE = 5500;
    const TEST_DATA_SIZE = 1000;
  
    const [trainXs, trainYs] = tf.tidy(() => {
      const d = data.nextTrainBatch(TRAIN_DATA_SIZE);
      return [
        d.xs.reshape([TRAIN_DATA_SIZE, 28, 28, 1]),
        d.labels
      ];
    });
  
    const [testXs, testYs] = tf.tidy(() => {
      const d = data.nextTestBatch(TEST_DATA_SIZE);
      return [
        d.xs.reshape([TEST_DATA_SIZE, 28, 28, 1]),
        d.labels
      ];
    });

    console.log("Model Training Beginning!");
  
    model.fit(trainXs, trainYs, {
      batchSize: BATCH_SIZE,
      validationData: [testXs, testYs],
      epochs: 10,
      shuffle: true,
    });

    console.log("Model Training Done!");
  }

  function doPrediction(model, data, testDataSize = 500) {
    const IMAGE_WIDTH = 28;
    const IMAGE_HEIGHT = 28;
    const testData = data.nextTestBatch(testDataSize);
    const testxs = testData.xs.reshape([testDataSize, IMAGE_WIDTH, IMAGE_HEIGHT, 1]);
    const labels = testData.labels.argMax(-1);
    const preds = model.predict(testxs).argMax(-1);
  
    testxs.dispose();

    console.log("Predictions Done!");

    return [preds, labels];
  }

  async function showAccuracy(model, data) {

    const [preds, labels] = doPrediction(model, data);
    console.log(preds.shape);
    const classAccuracy = await tfvis.metrics.perClassAccuracy(labels, preds);

    console.log("Accuracy Calculated!");
  
    return classAccuracy;
  }

  async function makeAndRun() {

    const data = new MnistData();
    await data.load();

    const model = generateNeuralNet();
    trainModel(model, data);
    doPrediction(model, data);

    console.log(await showAccuracy(model, data));

  }

  return (
    <div>
      <p>Current Layer Order: {layers} </p>
      <form style={{border: "10px black"}}>
      {
        layers.map((layer, i) => {
          <select 
          value={layer} 
          onChange={(e) => {
            layers[i] = e.target.value;
            setLayers(layers);
          }}>
          {options.map((value) => (
            <option value={value} key={value}>
              {value}
            </option>
          ))}
          </select>
        })
      }
      </form>
      <button onClick={makeAndRun}>Train Neural Network</button>  
    </div>
  );

};

export default Spaceship;
