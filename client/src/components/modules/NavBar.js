import React from "react";

import {
    AppBar,
    Typography,
    CssBaseline,
    Toolbar,
    Button,
    Menu,
    MenuItem, 
  } from "@mui/material";
import { Link } from "react-router-dom";
import "./NavBar.css"

import "../pages/style.css"
const NavBar = () => {
  return (
    <>
    <AppBar position="static" style={{ background: '#009879' }}>
      <CssBaseline />
      <Toolbar>
            <MenuItem>
                <Link to="/" className="NavBar-link">
                Home
                </Link>
            </MenuItem>
            <MenuItem>
                <Link to="/xornet" className="NavBar-link">
                Train a Model for XOR
                </Link>
            </MenuItem>
            <MenuItem>
                <Link to="/" className="NavBar-link">
                Train a Model for Fashion MNIST
                </Link>
            </MenuItem>
      </Toolbar>
    </AppBar>
    </>
  );
};

export default NavBar;