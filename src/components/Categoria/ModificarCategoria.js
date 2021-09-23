import React, { Component } from 'react'
import axios from 'axios'
import * as ReactBoostrap from 'react-bootstrap';
import { url } from '../API.js';

export default class ModificarCategoria extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoria: '',
            nombre: "",
            descuento: "",
            mensaje: "",
            mensajeError: "",
            mensajeSuccess: "",
            errors: {}
        }
    }
    componentDidMount = () => {
        console.log(this.props.match.params.id)
        axios.get(url + '/categoria/buscarPorId?id=' + this.props.match.params.id).then((resp) => {
            this.setState({
                categoria: resp.data
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
            , 800);
    }

    botonModificar = () => {
        // this.limpiar();
        if (this.handleValidation()) {
            axios.post(url + '/categoria/modificar/?id=' + this.props.match.params.id
                + '&nombre=' + this.state.nombre +
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
                        mensaje: error.response.data.message,
                        mensajeError: "error"
                    });this.limpiar();
                    console.log(error);
                })
        }
    }


    render() {
        const { categoria } = this.state
        return (
            <div>
                <h1>Modificar Categoria</h1>
                <form onSubmit={this.submit}>
                    <span style={{ color: "red" }}>{this.state.errors["nombre"]}</span>
                    <br />
                    <input type="text" name='nombre' id="nombre"
                        placeholder={"Nombre: " + categoria.nombre} onChange={this.manejadorOnChange} />
                    <br />
                    <span style={{ color: "red" }}>{this.state.errors["descuento"]}</span>
                    <br />
                    <br /><input type="text" name='descuento' id="descuento"
                        placeholder={"Descuento: " + categoria.descuento}
                        onChange={this.manejadorOnChange} />
                    <br /><ReactBoostrap.Button variant="primary"
                        onClick={this.botonModificar}>Modificar</ReactBoostrap.Button>
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
