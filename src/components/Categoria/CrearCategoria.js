import React, { Component } from 'react'
import axios from 'axios'
import * as ReactBoostrap from 'react-bootstrap';
import { url } from '../API.js';
import '../titulo.css';

export default class CrearCategoria extends Component {

    constructor() {
        super();
        this.state = {
            mensaje: "",
            nombre: "",
            descuento: "",
            mensajeError: "",
            mensajeSuccess: "",
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
            let nombre = this.state.nombre.split(" ").join("");
            if (!nombre.match(/^[a-zA-Z]+$/)) {
                formIsValid = false;
                errors["nombre"] = "El nombre solo acepta letras";
                document.getElementById("nombre").focus();
            }
        }

        //Descuento
        const regex = /^[0-9]*$/;
        const soloNumeros = regex.test(this.state.descuento);
        if (this.state.descuento === "") {
            formIsValid = false;
            errors["descuento"] = "Debe ingresar datos";
            document.getElementById("descuento").focus();
        } else {
            if (this.state.descuento < 0) {
                formIsValid = false;
                errors["descuento"] = "Debe ingresar números positivos";
                document.getElementById("descuento").focus();
            } else {
                if (!soloNumeros) {
                    formIsValid = false;
                    errors["descuento"] = "Debe ingresar solo números";
                    document.getElementById("descuento").focus();
                }
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
            window.location.reload(1);
        }
            , 1000);
    }
    manejadorBoton = () => {
        this.limpiar();
        if (this.handleValidation()) {
            axios.post(url + '/categoria/insertar?nombre=' + this.state.nombre +
                '&descuento=' + this.state.descuento)
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
        const { descuento, nombre } = this.state
        return (
            <div>
                <div>
                    <h1>Alta Categoria</h1>
                    <form onSubmit={this.submit}>
                        <span style={{ color: "red" }}>{this.state.errors["nombre"]}</span>
                        <br />
                        <input type="text" id="nombre" class="fadeIn second" value={nombre}
                            name="nombre" placeholder="Nombre de la categoría" onChange={this.manejadorOnChange} required />
                        <br />
                        <span style={{ color: "red" }}>{this.state.errors["descuento"]}</span>
                        <br />
                        <input type="text" id="descuento" class="fadeIn second" value={descuento}
                            name="descuento" placeholder="Descuento de la categoría" onChange={this.manejadorOnChange} required />
                        <br /><br />
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