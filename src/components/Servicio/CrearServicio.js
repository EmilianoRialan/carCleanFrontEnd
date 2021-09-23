import React, { Component } from 'react'
import axios from 'axios'
import * as ReactBoostrap from 'react-bootstrap';
import { url } from '../API.js';
//import utils from '../Utils.js';

export default class CrearServicio extends Component {

    constructor() {
        super();
        this.state = {
            servicios: [],
            garantias: [],
            tareas: [],
            tareasSeleccionadas: [],
            nombre: "",
            precio: "",
            garantia: 0,
            horastrabajo: "",
            mensaje: "",
            mensajeError: "",
            mensajeSuccess: "",
            errors: {}
        }

        this.checkTarea = event => {

            const tareasSeleccionadas = this.state.tareasSeleccionadas;
            let index
            if (event.target.checked) {
                // this.setState({

                // })
                tareasSeleccionadas.push(event.target.name);
            } else {
                index = tareasSeleccionadas.indexOf(event.target.name);
                tareasSeleccionadas.splice(index, 1);
                // return this.state.tareasSeleccionadas[event.target.name] = null
            }
            this.setState({
                tareasSeleccionadas: tareasSeleccionadas,
            })
            console.log(this.state.tareasSeleccionadas)
        };
    };


    componentDidMount = () => {
        axios.get(url + '/tarea/listarActivos').then((resp) => {
            console.log(resp.data);
            this.setState({
                tareas: resp.data,
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
        const regex = /^[0-9]*$/;
        const soloNumeros = regex.test(this.state.precio);
        // //Precio
        if (this.state.precio === "") {
            formIsValid = false;
            errors["precio"] = "Debe ingresar datos";
            document.getElementById("precio").focus();
        } else {
            if (this.state.precio < 0) {
                formIsValid = false;
                errors["precio"] = "Debe ingresar números positivos";
                document.getElementById("precio").focus();
            } else {
                if (!soloNumeros) {
                    formIsValid = false;
                    errors["precio"] = "Debe ingresar solo números";
                    document.getElementById("precio").focus();
                }
            }
        }
        //Garantia
        if (this.state.garantia === 0) {
            formIsValid = false;
            errors["garantia"] = "Debe ingresar la garantía";
            document.getElementById("garantia").focus();
        }

        //Horas de trabajo  
        const soloNumerosHorasTrabajo = regex.test(this.state.horastrabajo);

        if (this.state.horastrabajo === "") {
            formIsValid = false;
            errors["horastrabajo"] = "Debe ingresar datos";
            document.getElementById("horastrabajo").focus();
        } else {
            if (this.state.horastrabajo < 0) {
                formIsValid = false;
                errors["horastrabajo"] = "Debe ingresar números positivos";
                document.getElementById("horastrabajo").focus();
            } else {
                if (!soloNumerosHorasTrabajo) {
                    formIsValid = false;
                    errors["horastrabajo"] = "Debe ingresar solo números";
                    document.getElementById("horastrabajo").focus();
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
        console.log(this.state.tareasSeleccionadas)
        if (this.handleValidation()) {
            axios.post(url + '/servicio/insertar?nombre=' + this.state.nombre + "&precio="
                + this.state.precio + "&horasTrabajo=" + this.state.horastrabajo, '&garantiaId='
                + this.state.garantia + "&tareasSeleccionadas=" + this.state.tareasSeleccionadas, { mode: 'cors' })
                .then(response => {
                    console.log(response.status);
                    if (response.status >= 200 && response.status <= 205) {
                        this.setState({
                            mensaje: response.data,
                            mensajeSuccess: "ok",
                        });
                        this.limpiar();
                    }
                    this.limpiar();
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
        return (
            <div>
                <div>
                    <h1>Alta servicio</h1>
                    <form onSubmit={this.submit}>
                        <span style={{ color: "red" }}>{this.state.errors["nombre"]}</span>
                        <br />
                        <input type="text" id="nombre" className="fadeIn second" required
                            name="nombre" placeholder="Nombre del servicio" onChange={this.manejadorOnChange} />
                        <br />
                        <span style={{ color: "red" }}>{this.state.errors["precio"]}</span>
                        <br />
                        <input type="text" id="precio" className="mb-3" required
                            name="precio" placeholder="Precio del servicio" onChange={this.manejadorOnChange} />
                        <br />
                        <span style={{ color: "red" }}>{this.state.errors["horastrabajo"]}</span>
                        <br />
                        <input type="text" id="horastrabajo" className="fadeIn second" required
                            name="horastrabajo" placeholder="Horas de trabajo del servicio" onChange={this.manejadorOnChange} />
                        <br />
                        <span style={{ color: "red" }}>{this.state.errors["garantia"]}</span>
                        <br />
                        <label>Seleccione los meses de garantia</label>
                        <select name="garantia" id="garantia" className="form-control" onChange={this.elegirGarantia}>
                            <option disabled selected>Selecciona una opción</option>
                            {this.state.garantias.map(garantiaElegida => (
                                <option
                                    key={garantiaElegida}
                                    name="garantia"
                                    value={garantiaElegida.id}
                                    selectedValue={garantiaElegida}
                                >{garantiaElegida.cantidadMeses}</option>
                            ))}
                        </select>
                        <br />
                        <div>
                            <ReactBoostrap.Table className="table" hover variant="light-dark">
                                <thead>
                                    <th scope="col">ID</th >
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Descripcion</th>
                                    <th scope="col">Seleccion</th>
                                </thead>
                                <tbody>
                                    {
                                        this.state.tareas.map(elemento => (
                                            <tr key={elemento.id} value={elemento} id={elemento.id}>
                                                <td>{elemento.id}</td>
                                                <td>{elemento.nombre}</td>
                                                <td>{elemento.descripcion}</td>
                                                <td>
                                                    <input type="checkbox" className="btn btn-secondary"
                                                        value={elemento.id} id={elemento.id} name={elemento.id}
                                                        onChange={this.checkTarea}>
                                                    </input>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </ReactBoostrap.Table>
                        </div>
                        <ReactBoostrap.Button variant="success" onClick={this.manejadorBoton} >Crear</ReactBoostrap.Button>
                    </form><br />

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