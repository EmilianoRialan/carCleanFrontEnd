import React, { Component } from 'react'
import axios from 'axios'
import * as ReactBoostrap from 'react-bootstrap';
import { url } from '../API.js';

export default class CrearGarantia extends Component {

    constructor() {
        super();
        this.state = {
            mensaje: "",
            mensajeError: "",
            mensajeSuccess: "",
            cantidadMeses: "",
            errors: {}
        }

    }

    manejadorOnChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleValidation() {
        let errors = {};
        let formIsValid = true;

        //Cantidad de meses
        const regex = /^[0-9]*$/;
        const soloNumeros = regex.test(this.state.cantidadMeses);
        if (this.state.cantidadMeses === "") {
            formIsValid = false;
            errors["cantidadMeses"] = "Debe ingresar datos";
            document.getElementById("cantidadMeses").focus();
        } else {
            if (this.state.cantidadMeses < 0) {
                formIsValid = false;
                errors["cantidadMeses"] = "Debe ingresar números positivos";
                document.getElementById("cantidadMeses").focus();
            } else {

                if (!soloNumeros) {
                    formIsValid = false;
                    errors["cantidadMeses"] = "Debe ingresar solo números";
                    document.getElementById("cantidadMeses").focus();
                }
            }
        }



        this.setState({ errors: errors });
        return formIsValid;
    }
    componentWillUnmount() {
        
        clearInterval(this.timer);
    }
    limpiar(){
        this.timer = setInterval(() => {
            window.location.reload(1);
        }
        ,900);
    }
    manejadorBoton = () => {
//this.limpiar();
        if (this.handleValidation()) {
            console.log(this.state.cantidadMeses)
            axios.post(url + '/garantia/insertar?cantidadMeses=' + this.state.cantidadMeses)
                .then(response => {
                    if (response.status >= 200 && response.status <= 205) {
                        this.setState({
                            mensaje: response.data,
                            mensajeSuccess: "ok",                            
                        });
                        this.limpiar(); 
                    }
                }).catch(error => {
                    this.setState({
                        mensaje: error.response.data,
                        mensajeError: "error"
                    });this.limpiar();
                    console.log(error.response)
                    console.log(error.response.data)
                })
        }
    }

    render() {
        //const {nombre} = this.state
        return (
            <div>
                <div>
                    <h1>Alta Garantía</h1>
                    <form onSubmit={this.submit}>
                        <span style={{ color: "red" }}>{this.state.errors["cantidadMeses"]}</span>
                        <br />
                        <input type="text" id="cantidadMeses" class="fadeIn second"
                            name="cantidadMeses" placeholder="Ingrese mes o meses de la garantía"
                            onChange={this.manejadorOnChange} required />
                        <br />
                        <ReactBoostrap.Button variant="success" onClick={this.manejadorBoton} >Crear</ReactBoostrap.Button>
                    </form>
                    {this.state.mensajeSuccess === "ok" ?
                        <div class="alert alert-success" role="alert">
                            {this.state.mensaje}
                        </div> : (this.state.mensajeError === "error") ?
                            <div class="alert alert-danger" role="alert">
                                {this.state.mensaje}
                            </div> : null
                    }
                </div>
            </div>
        )

    }

}