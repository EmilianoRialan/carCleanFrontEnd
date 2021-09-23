import React, { Component } from 'react'
import axios from 'axios'
import * as ReactBoostrap from 'react-bootstrap';
import { url } from '../API.js';
export default class CrearTarea extends Component {

    constructor() {
        super();
        this.state = {
            mensaje: "",
            nombre: "",
            descripcion: "",
            tareaElegido: "",
            mensajeError: "",
            mensajeSuccess: "",
            errors: {},
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
            //document.getElementById("nombre").focus();
        }

        if (this.state.nombre !== "") {
            let nombre = this.state.nombre.split(" ").join("");
            if (!nombre.match(/^[a-zA-Z]+$/)) {
                formIsValid = false;
                errors["nombre"] = "El nombre solo acepta letras";
                //document.getElementById("nombre").focus();
            }
        }

        //Descripcion
        if (this.state.descripcion === "") {
            formIsValid = false;
            errors["descripcion"] = "Debe ingresar la descripcion";
            //document.getElementById("descripcion").focus();
        }

        this.setState({ errors: errors });
        return formIsValid;
    }


    manejadorBoton = () => {
        //  this.limpiar();
        if (this.handleValidation()) {
            axios.post(url + '/tarea/insertar?nombre=' + this.state.nombre + '&descripcion=' + this.state.descripcion)
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
                    console.log(error.response);
                    console.log(error.response.data.message);
                    console.log(error);
                })
        }
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
                descripcion: "",
                tareaElegido: "",
            });
        }
            , 2000);
    }
    render() {
        const { nombre, descripcion } = this.state
        return (
            <div>
                <div>
                    <h1>Alta Tarea</h1>
                    <form onSubmit={this.submit}>
                        <span style={{ color: "red" }}>{this.state.errors["nombre"]}</span>
                        <br />
                        <input type="text" id="nombre" class="fadeIn second" name="nombre" placeholder="Nombre de la Tarea" value={nombre} onChange={this.manejadorOnChange} required />
                        <br />
                        <span style={{ color: "red" }}>{this.state.errors["descripcion"]}</span>
                        <br />
                        <input type="text" id="descripcion" class="fadeIn second" name="descripcion" placeholder="Descripcion de la Tarea" value={descripcion} onChange={this.manejadorOnChange} required />
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