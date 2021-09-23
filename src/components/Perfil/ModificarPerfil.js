import React, { Component } from 'react'
import axios from 'axios'
import * as ReactBoostrap from 'react-bootstrap';
import { url } from '../API.js';


export default class ModificarPerfil extends Component {
    constructor(props) {
        super(props);
        this.state = {
            perfil: '',
            nombre: '',
            mensaje: "",
            mensajeError: "",
            mensajeSuccess: "",
            errors: {}
        }
    }

    componentDidMount = () => {
        console.log(this.props.match.params.id)
        axios.get(url + '/perfil/buscarPorId?id=' + this.props.match.params.id).then((resp) => {
            this.setState({
                perfil: resp.data
            });
        }).catch((error) => {
            console.log(error);
        }
        )
    };

    manejadorOnChange = e => {
        this.setState({ [e.target.name]: e.target.value })
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
    handleValidation() {

        let errors = {};
        let formIsValid = true;

        //Nombre
        if (this.state.nombre === "") {
            formIsValid = false;
            errors["nombre"] = "Debe ingresar el nombre!!!";
            //document.getElementById("nombre").focus();
        }

        if (this.state.nombre !== "") {
            if (!(this.state.nombre).match(/^[a-zA-Z]+$/)) {
                formIsValid = false;
                errors["nombre"] = "El nombre solo acepta letras!!!";
                //document.getElementById("nombre").focus();
            }
        }

        this.setState({ errors: errors });
        return formIsValid;
    }


    botonModificar = () => {
        //  this.limpiar();
        if (this.handleValidation()) {
            axios.post(url + '/perfil/modificar/?id=' + this.props.match.params.id
                + '&nombre=' + this.state.nombre)
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
                    });
                    this.limpiar();
                    console.log(error);
                })
        } else {
            this.setState({ mensaje: "Ingreso Incorrecto", mensajeError: "error" });
        }
    }


    render() {
        const { perfil, nombre } = this.state
        return (
            <div>
                <h1>Modificar Perfil</h1>
                <form onSubmit={this.submit}>
                    <span style={{ color: "red" }}>{this.state.errors["nombre"]}</span>
                    <br />
                    <input type="text" name='nombre' value={nombre} placeholder={"Nombre: " + perfil.nombre} onChange={this.manejadorOnChange} />
                    <br /><ReactBoostrap.Button variant="primary" onClick={this.botonModificar}>Modificar</ReactBoostrap.Button>
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
