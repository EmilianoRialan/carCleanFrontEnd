import React, { Component } from 'react'
import axios from 'axios'
import * as ReactBoostrap from 'react-bootstrap';
import { url } from '../API.js';
import dateFormat from 'dateformat';


export default class ModificarProducto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            empleado: '',
            ProductoModificado: "",
            ProductoIdMod: 0,
            nombre: '',
            mensaje: "",
            telefono: "",
            direccion: "",
            cedula: "",
            email: "",
            fechaIngreso: "",
            mensajeError: "",
            mensajeSuccess: "",
            errors: {}
        }
    }
    componentDidMount = () => {
        console.log(this.props.match.params.id)
        axios.get(url + '/empleado/buscarPorId?id=' + this.props.match.params.id).then((resp) => {
            console.log(resp.data)
            this.setState({
                empleado: resp.data,
            });
        }).catch((error) => {
            console.log(error);
        }
        )
    };

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

        }

        if (this.state.nombre !== "") {
            let nombre = this.state.nombre.split(" ").join("");
            if (!nombre.match(/^[a-zA-Z]+$/)) {
                formIsValid = false;
                errors["nombre"] = "El nombre solo acepta letras";

            }
        }

        //Dirección
        if (this.state.direccion === "") {
            formIsValid = false;
            errors["direccion"] = "Debe ingresar la direccion";

        }
        //ci
        const regex = /^[0-9]*$/;
        //Teléfono

        const soloNumerosTelefono = regex.test(this.state.telefono);
        if (!soloNumerosTelefono) {
            formIsValid = false;
            errors["telefono"] = "Debe ingresar solo números";

        } else {
            if (this.state.telefono < 0) {
                formIsValid = false;
                errors["telefono"] = "Debe ingresar números positivos";

            } else {
                if (this.state.telefono === "") {
                    formIsValid = false;
                    errors["telefono"] = "Debe ingresar un teléfono válido";
                }
            }
        }

        //Fecha ingreso
        if (this.state.fechaIngreso === "") {
            formIsValid = false;
            errors["fechaIngreso"] = "Debe ingresar la fecha de ingreso";
            //document.getElementById("fechaIngreso").focus();
        }

        //Mail
        if (this.state.email === "") {
            formIsValid = false;
            errors["mail"] = "Debe ingresar el mail!!!";
            //document.getElementById("mail").focus();
        }
        var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        if (this.state.email !== "") {
            let lastAtPos = this.state.email.lastIndexOf('@');
            let lastDotPos = this.state.email.lastIndexOf('.');

            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && this.state.email.indexOf('@@') === -1
                && lastDotPos > 2 && (this.state.email.length - lastDotPos) > 2)) {
                formIsValid = false;
                errors["mail"] = "El mail no es válido";
            }
        } 
        if (!reg.test(this.state.email.toLocaleLowerCase())) {
            formIsValid = false;
            errors["mail"] = "El mail no es válido";
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
            , 800);
    }

    botonModificar = () => {        
        if (this.handleValidation()) {
            axios.post(url + '/empleado/modificar?id=' + this.props.match.params.id + '&nombre=' + this.state.nombre +
                '&fechaIngreso=' + dateFormat(this.state.fechaIngreso) + '&direccion=' + this.state.direccion + '&telefono=' + this.state.telefono + '&email=' + this.state.email)
                .then(response => {
                    console.log(response)
                    if (response.status >= 200 && response.status <= 205) {
                        this.setState({
                            mensaje: response.data,
                            mensajeSuccess: "ok"
                        });
                        this.limpiar();
                    }
                }).catch(error => {
                    this.setState({
                        mensaje: error.response.data,
                        mensajeError: "error"
                    });this.limpiar();
                    console.log(error);
                })
        }
    }


    render() {
        const { empleado } = this.state
        return (
            <div>
                <h1>Modificar Empleado</h1>
                <form onSubmit={this.submit}>
                    <span style={{ color: "red" }}>{this.state.errors["nombre"]}</span>
                    <br />
                    <input type="text" name='nombre'
                        placeholder={"Nombre: " + empleado.nombre} onChange={this.manejadorOnChange} />
                    <br />
                    <span style={{ color: "red" }}>{this.state.errors["fechaIngreso"]}</span>
                    <br />
                    <span>Fecha de ingreso del empleado</span><br />
                    <input type="date" name='fechaIngreso'
                        placeholder={"Fecha de Ingreso: " + empleado.fechaIngreso}
                        onChange={this.manejadorOnChange} />
                    <br />
                    <span style={{ color: "red" }}>{this.state.errors["direccion"]}</span>
                    <br />
                    <input type="text" name='direccion'
                        placeholder={"Direccion: " + empleado.direccion} onChange={this.manejadorOnChange} />
                    <br />
                    <span style={{ color: "red" }}>{this.state.errors["telefono"]}</span>
                    <br />
                    <input type="text" name='telefono'
                        placeholder={"Telefono: " + empleado.telefono} onChange={this.manejadorOnChange} />
                    <br />
                    <span style={{ color: "red" }}>{this.state.errors["mail"]}</span>
                    <br />
                    <input type="text" name='email'
                        placeholder={"Email: " + empleado.email} onChange={this.manejadorOnChange} />
                    <br /><br />
                    <ReactBoostrap.Button variant="primary" onClick={this.botonModificar}>Modificar</ReactBoostrap.Button>
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
        )
    }
}
