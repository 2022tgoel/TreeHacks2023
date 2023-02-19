import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import jwt_decode from "jwt-decode";

import NotFound from "./pages/NotFound.js";
import HomePage from "./pages/HomePage.js";
import NeuralNet from "./pages/NeuralNet.js";
import PCA from "./pages/PCA.js"
import NavBar from "./modules/NavBar.js"
import "../utilities.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";

/**
 * Define the "App" component
 */
const App = () => {
  return (
    <>
    <NavBar></NavBar>
    <Routes>
      <Route
        path="/"
        element={
          <HomePage
            path="/"
          />
        }
      />
      <Route
        path="/xornet"
        element={
          <NeuralNet
            path="/xornet"
          />
        }
      />
      <Route
        path="/pca"
        element={
          <PCA path="/pca"/>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
    </>
    
  );
};

export default App;
