import React, { Component } from "react";
import './PantallaPrincipal.css';
import Tarjeta from './Tarjeta.js';
import Home from './Home.js';
import Footer from "./Footer.js";
import Productos from "./Productos.js";

export default class PantallaPrincipal extends Component {

    constructor() {
        super();
        this.state = {
        }
    }

    render() {
        return (
              <div>             
              <Home/>
              <Tarjeta/>
              <Productos/>
              <Footer/>  

              </div>     
        );

    }
}