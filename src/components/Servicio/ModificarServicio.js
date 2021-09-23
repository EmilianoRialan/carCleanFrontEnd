import React, { Component } from 'react'
import axios from 'axios'
import * as ReactBoostrap from 'react-bootstrap';
import { url } from '../API.js';

export default class ModificarServicio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            servicio: '',
            nombre: '',
            mensaje: "",
            mensajeError: "",
            precio: "",
            garantia: '',
            garantias: [],
            horasTrabajo: '',
            mensajeSuccess: "",
            errors: {}
        }
    }
    componentWillUnmount() {
        clearInterval(this.timer);
    }
    limpiar() {
        this.timer = setInterval(() => {
          window.location.reload(1);
        }
          , 900);
      }
    componentDidMount = () => {
        console.log(this.props.match.params.id)
        axios.get(url + '/servicio/buscarPorId?id=' + this.props.match.params.id).then((resp) => {
            console.log(resp.data)
            this.setState({
                servicio: resp.data
            });
        }).catch((error) => {
            console.log(error);
        }
        )
        axios.get(url + '/garantia/listarActivos').then((resp) => {
            console.log(resp.data);
            this.setState({
                garantias: resp.data,
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

        const regex = /^[0-9]*$/;
        const soloNumeros = regex.test(this.state.precio);
        // //Precio
        if (this.state.precio === "") {
            formIsValid = false;
            errors["precio"] = "Debe ingresar datos";
            //document.getElementById("precio").focus();
        } else {
            if (this.state.precio < 0) {
                formIsValid = false;
                errors["precio"] = "Debe ingresar números positivos";
                //document.getElementById("precio").focus();
            } else {
                if (!soloNumeros) {
                    formIsValid = false;
                    errors["precio"] = "Debe ingresar solo números";
                    //document.getElementById("precio").focus();
                }
            }
        }

        //Garantia
        if (this.state.garantia === "") {
            formIsValid = false;
            errors["garantia"] = "Debe ingresar la garantía!!!";
            //document.getElementById("garantia").focus();
        }

        //Horas de trabajo  
        const soloNumerosHorasTrabajo = regex.test(this.state.horasTrabajo);
        if (this.state.horasTrabajo === "") {
            formIsValid = false;
            errors["horastrabajo"] = "Debe ingresar datos";
            //document.getElementById("horastrabajo").focus();
        } else {
            if (this.state.horasTrabajo <= 0) {
                formIsValid = false;
                errors["horastrabajo"] = "Debe ingresar números positivos";
                //document.getElementById("horastrabajo").focus();
            } else {
                if (!soloNumerosHorasTrabajo) {
                    formIsValid = false;
                    errors["horastrabajo"] = "Debe ingresar solo números";
                    //document.getElementById("horastrabajo").focus();
                }
            }
        }

        this.setState({ errors: errors });
        return formIsValid;
    }

    elegirGarantia = event => {
        console.log(event.target.value)
        this.setState({
            garantia: event.target.value,
        });
    }

    botonModificar = () => {                  
        if (this.handleValidation()) {                     
            axios.post(url + '/servicio/modificar/?id=' + this.props.match.params.id +'&precio=' + this.state.precio + 
               '&horasTrabajo=' +  this.state.horasTrabajo +'&nombre=' + this.state.nombre +
                 '&GarantiaId=' + this.state.garantia)
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
                    }); 
                    this.limpiar();                    
                })
        }
    }


    render() {
        const { servicio} = this.state
        return (
            <div>
                <h1>Modificar Servicios</h1>
                <form onSubmit={this.submit}>
                    <span style={{ color: "red" }}>{this.state.errors["nombre"]}</span>
                    <br />
                    <input type="text" name='nombre' placeholder={"Nombre: " + servicio.nombre} onChange={this.manejadorOnChange} />
                    <br />
                    <span style={{ color: "red" }}>{this.state.errors["precio"]}</span>
                    <br />
                    <input type="text" name='precio'  placeholder={"Precio: " + servicio.precio} onChange={this.manejadorOnChange} />
                    <br />
                    <span style={{ color: "red" }}>{this.state.errors["horastrabajo"]}</span>
                    <br />
                    <input type="text" name='horasTrabajo'  placeholder={"Horas de Trabajo: " + servicio.horasTrabajo} onChange={this.manejadorOnChange} />
                    <br />
                    <span style={{ color: "red" }}>{this.state.errors["garantia"]}</span><br />
                    <label>Seleccione los meses de garantia</label><br />
                    <select className="form-control" onChange={this.elegirGarantia}>
                        <option disabled selected>Selecciona una opción</option>
                        {
                            this.state.garantias.map(garantiaElegida => (
                                <option
                                    key={garantiaElegida.id}
                                    name="garantia"
                                    value={garantiaElegida.id}
                                    selectedValue={garantiaElegida}
                                >{garantiaElegida.cantidadMeses}</option>
                            ))
                        }
                    </select>
                    <br />
                    <br /><ReactBoostrap.Button variant="primary" onClick={this.botonModificar}>Modificar</ReactBoostrap.Button>
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
        )
    }
}

