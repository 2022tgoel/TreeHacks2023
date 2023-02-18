import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import jwt_decode from "jwt-decode";

import NotFound from "./pages/NotFound.js";
import NeuralNet from "./pages/NeuralNet";

import "../utilities.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";

/**
 * Define the "App" component
 */
const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <NeuralNet
            path="/"
          />
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
