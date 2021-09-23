import React, { Component } from "react";
import * as ReactBootstrap from 'react-bootstrap';
import './PantallaPrincipal.css';
import '../App.css';
import './Buttons.css';

export default class Home extends Component {

    constructor() {
        super();
        this.state = {
        }
    }

    render() {
        return (
            <div className="PantallaPrincipal">
                 <img className='imgPrincipal' 
                src='images/taller2.jpg' 
                //src='images/taller2.gif' 
                alt='persona que trabaja en un taller'></img> 
            
                 {/* <video src='/videos/video-6.mp4'
                    autoPlay loop muted> </video>  */}
                <h1>CAR CLEAN</h1>
                <p>"Servicio Integral Vehicular"</p>
                <div className='btnsPantallaPrincipal'>
                    <ReactBootstrap.Button className='btn--outline' buttonStyle='btn--outline' 
                    buttonSize='btn--large'  href ='/AboutUs'
                    >
                        ACERCA DE NOSTROS
                    </ReactBootstrap.Button>
                    <ReactBootstrap.Button className='btn--primary'
                        buttonStyle='btn--primary'
                        buttonSize='btn--large'
                        href ='/AgendarServicio'
                    // en este boton hay que validar si esta logeado que vaya a la
                    // pantalla de agendar servicios y sino que se logee
                    >
                        AGENDA TUS SERVICIOS
                    </ReactBootstrap.Button>
                </div>
            </div>
        );

    }
}