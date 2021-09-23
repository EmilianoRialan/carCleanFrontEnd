import React, { Component } from 'react'
import axios from 'axios'
import * as ReactBoostrap from 'react-bootstrap';
import { url } from '../API.js';
export default class CrearPerfil extends Component {

    constructor() {
        super();
        this.state = {
            mensaje: "",
            nombre: "",
            mensajeError: "",
            mensajeSuccess: "",
            fecha: new Date(),
            errors: {}
        }
    }

    manejadorOnChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleValidation() {

        let errors = {};
        let formIsValid = true;

        //Nombre
        if (this.state.nombre === "") {
            formIsValid = false;
            errors["nombre"] = "Debe ingresar el nombre";
            document.getElementById("nombre").focus();
        }

        if (this.state.nombre !== "") {
            if (!(this.state.nombre).match(/^[a-zA-Z]+$/)) {
                formIsValid = false;
                errors["nombre"] = "El nombre solo acepta letras";
                document.getElementById("nombre").focus();
            }
        }

        this.setState({ errors: errors });
        return formIsValid;
    }
    componentWillUnmount() {

        clearInterval(this.timer);
    }
    limpiar() {
        this.timer = setInterval(() => {
            this.setState({
                mensajeSuccess: "",
                mensajeError: "",
                errors: "",
                nombre: "",
            });
        }
            , 2000);
    }
    manejadorBoton = () => {
        // this.limpiar();
        if (this.handleValidation()) {
            axios.post(url + '/perfil/insertar?nombre=' + this.state.nombre)
                .then(response => {
                    if (response.status >= 200 && response.status <= 205) {
                        this.setState({
                            mensaje: response.data,
                            mensajeSuccess: "ok",
                        });
                        this.limpiar();
                    } else
                        this.setState({ mensaje: "Ingreso Incorrecto", mensajeError: "error" });

                }).catch(error => {
                    this.setState({
                        mensaje: error.response.data.message,
                        mensajeError: "error"
                    });
                    this.limpiar();
                })
        }
    }

    render() {

        return (
            <div>
                <div>
                    <h1>Alta Perfiles</h1>
                    <form onSubmit={this.submit}>
                        <span style={{ color: "red" }}>{this.state.errors["nombre"]}</span>
                        <br />
                        <input type="text" id="nombre" class="fadeIn second"
                            name="nombre" placeholder="Nombre del perfil" onChange={this.manejadorOnChange} required />
                        <br /> <br />
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