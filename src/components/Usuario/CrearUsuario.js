import React, { Component } from 'react'
import axios from 'axios'
import * as ReactBoostrap from 'react-bootstrap';
import { url } from '../API.js';
export default class CrearUsuario extends Component {

    constructor() {
        super();
        this.state = {
            mensaje: "",
            empleados: [],
            empleadoElegido: "",
            nombre: "",
            password: "",
            mensajeError: "",
            mensajeSuccess: "",
            empleadoId: 0,
            email: "",
            idPerfil: '',
            errors: {},
        }
    }




    componentDidMount = () => {
        axios.get(url + '/empleado/listarActivos').then((resp) => {
            console.log(resp.data);
            this.setState({
                empleados: resp.data,
            });
        }).catch((error) => {
            console.log(error);
        }
        )
    };

    manejadorOnChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }



    manejadorBoton = () => {
        //this.limpiar();
        if (this.handleValidation()) {
            console.log(this.state.nombre);
            console.log(this.state.password);
            console.log(this.state.empleadoElegido.email);
            console.log(this.state.empleadoElegido.perfil.id);
            console.log(this.state.empleadoElegido.cedula);
            axios.post(url + '/usuario/insertarUsuarioEmpleado/?nombre=' + this.state.nombre +
                '&password=' + this.state.password +
                '&email=' + this.state.empleadoElegido.email +
                '&idPerfil=' + this.state.empleadoElegido.perfil.id
                + '&cedula=' + this.state.empleadoElegido.cedula)
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
    componentWillUnmount() {

        clearInterval(this.timer);
    }
    limpiar() {
        this.timer = setInterval(() => {
            window.location.reload(1);
        }
            , 2000);
    }
    elergirEmpleado = event => {
        console.log(event.target.value)
        let id = event.target.value
        this.setState({
            empleadoId: id
        });
        axios.get(url + '/empleado/buscarPorId?id=' + id).then((resp) => {
            console.log(resp.data)
            this.setState({
                empleadoElegido: resp.data,
            });
        }).catch((error) => {
            this.setState({
                mensaje: error.response.data.message,
                mensajeError: "error"
            });
            console.log(error);
        }
        )
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

        //Password
        if (this.state.password === "") {
            formIsValid = false;
            errors["password"] = "Debe ingresar la contraseña";
            //document.getElementById("password").focus();
        }

        //Empleado
        if (this.state.empleadoId === 0) {
            formIsValid = false;
            errors["empleado"] = "Debe elegir el empleado";
            //document.getElementById("email").focus();
        }
        this.setState({ errors: errors });
        return formIsValid;
    }


    render() {
        const { nombre, password } = this.state
        return (
            <div>
                <div>
                    <h1>Alta Usuario Empleado</h1>
                    <span>Elige el empleado al cual quieras realizarle un usuario.</span><br />
                    <span style={{ color: "red" }}>{this.state.errors["empleado"]}</span>
                    <br />
                    <select
                        name="empleado"
                        id="select"
                        className="form-control"
                        onChange={this.elergirEmpleado}
                    >
                        <option disabled selected >Elija un empleado</option>
                        {this.state.empleados.map(empleadoElegido => (
                            <option
                                key={empleadoElegido}
                                id={empleadoElegido.id}
                                name="empleado"
                                value={empleadoElegido.id}
                            >{empleadoElegido.nombre}</option>
                        ))}</select>
                    <br />
                    <form onSubmit={this.submit} >
                        <span style={{ color: "red" }}>{this.state.errors["nombre"]}</span>
                        <br />
                        {/* <label />Email del usuario
                        <br/> */}
                        <input id='nombre' type="text" className="fadeIn second" name="nombre"
                            placeholder="Nombre del usuario" value={nombre} onChange={this.manejadorOnChange} />
                        <br />
                        <span style={{ color: "red" }}>{this.state.errors["password"]}</span>
                        <br />
                        <input id='password' type="password" className="fadeIn second" name="password"
                            placeholder="Password del usuario" value={password} onChange={this.manejadorOnChange} />
                        <br /> <br />
                        <ReactBoostrap.Button variant="success" onClick={this.manejadorBoton} >Crear</ReactBoostrap.Button>
                    </form>
                    {this.state.mensajeSuccess === "ok" ?
                        <div className="alert alert-success" role="alert">
                            {this.state.mensaje}
                        </div> : (this.state.mensajeError === "error") ?
                            <div className="alert alert-danger" role="alert">
                                {this.state.mensaje}
                            </div> : null
                    }
                </div>
            </div>
        )

    }
}