import React, { Component } from 'react'
import axios from 'axios'
import * as ReactBoostrap from 'react-bootstrap';
import { url } from '../API.js';
export default class CrearProveedor extends Component {

    constructor() {
        super();
        this.state = {
            mensaje: "",
            nombre: "",
            direccion: "",
            email: "",
            telefono: '',
            mensajeError: "",
            cedula: '',
            fields: {},
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
            }
        }
        //C.I.
        const regex = /^[0-9]*$/;
        const soloNumeros = regex.test(this.state.cedula);

        if (!soloNumeros) {
            formIsValid = false;
            errors["cedula"] = "Debe ingresar solo números";
            document.getElementById("cedula").focus();
        } else {
            if (this.state.cedula < 0) {
                formIsValid = false;
                errors["cedula"] = "Debe ingresar números positivos";
                document.getElementById("cedula").focus();
            } else {
                if (this.state.cedula === "") {
                    formIsValid = false;
                    errors["cedula"] = "Debe ingresar la Cédula de Identidad";
                    document.getElementById("cedula").focus();
                } else {
                    if (!this.validarCedula(this.state.cedula)) {
                        console.log("entro");
                        formIsValid = false;
                        errors["cedula"] = "Cédula incorrecta";
                        document.getElementById("cedula").focus();
                    }
                }
            }
        }

        //Dirección
        if (this.state.direccion === "") {
            formIsValid = false;
            errors["direccion"] = "Debe ingresar la dirección";
            document.getElementById("direccion").focus();
        }

        //Mail
        if (this.state.email === "") {
            formIsValid = false;
            errors["email"] = "Debe ingresar el mail";
            document.getElementById("email").focus();
        } else {

            if (typeof this.state.email !== "undefined") {
                let lastAtPos = this.state.email.lastIndexOf('@');
                let lastDotPos = this.state.email.lastIndexOf('.');

                if (!(lastAtPos < lastDotPos && lastAtPos > 0 && this.state.email.indexOf('@@') === -1
                    && lastDotPos > 2 && (this.state.email.length - lastDotPos) > 2)) {
                    formIsValid = false;
                    errors["email"] = "El mail no es válido";
                    document.getElementById("email").focus();
                }
                else {
                    const regexEmail = /^([a-z 0-9.-]+)@([a-z0-9-]+).([a-z]{2,8})(.[a-z]{2,8})?$/;
                    if(!regexEmail.test(this.state.email)){
                        formIsValid = false;
                        errors["email"] = "El mail no es válido";
                    }
                    // if (!this.state.email.includes("@gmail") || !this.state.email.includes("@hotmail") ||
                    //     !this.state.email.includes("@microsoft") || !this.state.email.includes("@hotmail") ||
                    //     !this.state.email.includes("@yahoo") || !this.state.email.includes("@adinet")|| 
                    //     !this.state.email.includes("@outlook")
                    // ) {
                    //     formIsValid = false;
                    //     errors["email"] = "El mail no es válido";
                    // }

                }
            }
        }

        //Teléfono
        const soloNumerosTelefono = regex.test(this.state.telefono);
        if (this.state.telefono === "") {
            formIsValid = false;
            errors["telefono"] = "Debe ingresar datos";
            document.getElementById("telefono").focus();
        } else {
            if (this.state.telefono < 0) {
                formIsValid = false;
                errors["telefono"] = "Debe ingresar números positivos";
                document.getElementById("telefono").focus();
            } else {
                if (!soloNumerosTelefono) {
                    formIsValid = false;
                    errors["telefono"] = "Debe ingresar solo números";
                    document.getElementById("telefono").focus();
                }
            }
        }

        this.setState({ errors: errors });
        return formIsValid;
    }
    validarDigitoVerificador(cedula) {
        let a = 0;
        let i = 0;
        if (cedula.length <= 6) {
            for (i = cedula.length; i < 7; i++) {
                cedula = '0' + cedula;
            }
        }
        for (i = 0; i < 7; i++) {
            a += (parseInt("2987634"[i]) * parseInt(cedula[i])) % 10;
        }
        if (a % 10 === 0) {
            return 0;
        } else {
            return 10 - a % 10;
        }
    }

    validarCedula(cedula) {
        cedula = this.cleanCedula(cedula);
        let dig = cedula[cedula.length - 1];
        cedula = cedula.replace(/[0-9]$/, '');
        return parseInt(dig) === this.validarDigitoVerificador(cedula);
    }
    cleanCedula(cedula) {
        return cedula.replace(/\D/g, '');
    }
    componentWillUnmount() {

        clearInterval(this.timer);
    }
    limpiar() {
        this.timer = setInterval(() => {
            window.location.reload(1);
        }
            , 2000);
    }
    manejadorBoton = () => {
        //  this.limpiar();
        if (this.handleValidation()) {
            axios.post(url + '/proveedor/insertar?nombre=' + this.state.nombre + '&cedula=' + this.state.cedula +
                '&direccion=' + this.state.direccion + '&telefono=' + this.state.telefono + '&email='
                + this.state.email)
                .then(response => {
                    console.log(response);
                    console.log(response.data);
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
                    }); this.limpiar();
                    console.log(error.response)
                    console.log(error.response.data)
                })
        }
    }

    render() {
        // const { nombre, direccion, email, telefono } = this.state
        return (
            <div>
                <div>
                    <h1>Alta Proveedor</h1>
                    <form onSubmit={this.submit}>
                        <span style={{ color: "red" }}>{this.state.errors["nombre"]}</span>
                        <br />
                        <input type="text" id="nombre" class="fadeIn second" name="nombre"
                            placeholder="Nombre del proveedor" onChange={this.manejadorOnChange} required />
                        <br />
                        <span style={{ color: "red" }}>{this.state.errors["cedula"]}</span>
                        <br />
                        <input type="text" id="cedula" class="fadeIn second"
                            maxLength="8" name="cedula" placeholder="Ingrese C.I. sin puntos, ni guiones"
                            onChange={this.manejadorOnChange} />
                        <br />
                        <span style={{ color: "red" }}>{this.state.errors["direccion"]}</span>
                        <br />
                        <input type="text" id="direccion" class="fadeIn second" name="direccion"
                            placeholder="Dirección del proveedor" onChange={this.manejadorOnChange} required />
                        <br />
                        <span style={{ color: "red" }}>{this.state.errors["email"]}</span>
                        <br />
                        <input type="text" id="email" class="fadeIn second" name="email"
                            placeholder="Email del proveedor" onChange={this.manejadorOnChange} required />
                        <br />
                        <span style={{ color: "red" }}>{this.state.errors["telefono"]}</span>
                        <br />
                        <input type="text" id="telefono" class="fadeIn second" name="telefono" maxLength="9" minLength="8"
                            placeholder="Teléfono del proveedor" onChange={this.manejadorOnChange} required />
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