import React, { Component } from 'react'
import axios from 'axios'
import * as ReactBoostrap from 'react-bootstrap';
import { url } from '../API.js';


export default class ModificarUsuario extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usuario: '',
            nombre: '',
            password: "",
            mensaje: "",
            mensajeError: "",
            mensajeSuccess: "",
            errors: {}
        }
    }
    componentDidMount = () => {
        console.log(this.props.match.params.id)
        axios.get(url + '/usuario/buscarPorId?id=' + this.props.match.params.id).then((resp) => {
            this.setState({
                usuario: resp.data
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

        //Contraseña
        if (this.state.password === "") {
            formIsValid = false;
            errors["password"] = "Debe ingresar la contraseña";
            document.getElementById("password").focus();
        }

        this.setState({ errors: errors });
        return formIsValid;
    }
    limpiar() {
        this.timer = setInterval(() => {
            window.location.reload(1);
        }
            , 800);
    }

    botonModificar = () => {
        if (this.handleValidation()) {
            axios.post(url + '/usuario/modificar/?id=' + this.props.match.params.id + 
            '&nombre=' + this.state.nombre + '&password=' + this.state.password)
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
                })
        }
    }


    render() {
        const { usuario } = this.state
        return (
            <div>
                <h1>Modificar Usuarios</h1>
                <form onSubmit={this.submit}>
                    <span style={{ color: "red" }}>{this.state.errors["nombre"]}</span>
                    <br />
                    <input type="text" id="nombre" class="fadeIn second"
                        name="nombre" placeholder={"Nombre: " + usuario.nombre} onChange={this.manejadorOnChange} required />
                    <br />
                    <span style={{ color: "red" }}>{this.state.errors["password"]}</span>
                    <br />
                    <input type="text" id="password" class="fadeIn second"
                        name="password" placeholder={"Password: " + usuario.password} onChange={this.manejadorOnChange} required />
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
