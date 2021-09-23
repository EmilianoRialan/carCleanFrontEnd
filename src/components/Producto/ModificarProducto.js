import React, { Component } from 'react'
import axios from 'axios'
import * as ReactBoostrap from 'react-bootstrap';
import { url } from '../API.js';


export default class ModificarProducto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            producto: '',
            proveedor: '',
            ProductoModificado: "",
            ProductoIdMod: 0,
            nombre: '',
            precio: "",
            stock: "",
            file: "",
            descripcion: "",
            mensaje: "",
            mensajeError: "",
            mensajeSuccess: "",
            errors: {},
            proveedores: [],

        }
    }

    componentDidMount = () => {
        console.log(this.props.match.params.id)
        axios.get(url + '/producto/buscarPorId?id=' + this.props.match.params.id).then((resp) => {
            this.setState({
                producto: resp.data,
                proveedor: resp.data.proveedor
            });
        }).catch((error) => {
            this.setState({
                mensaje: error.response.data.message,
                mensajeError: "error"
            });
            console.log(error);
        }
        )
        axios.get(url + '/proveedor/listarActivos').then((resp) => {
            console.log(resp.data);
            this.setState({
                proveedores: resp.data,
            });
        }).catch((error) => {
            this.setState({
                mensaje: error.response.data.message,
                mensajeError: "error"
            });
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

        //Proveedor.
        if (this.state.proveedorId === 0) {
            formIsValid = false;
            errors["proveedorId"] = "Debe ingresar el proveedor";
            // document.getElementById("proveedorId").focus();
        }
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
        const regex = /^[0-9]*$/;
        const soloNumeros = regex.test(this.state.precio);
        // //Precio
        if (this.state.precio === "") {
            formIsValid = false;
            errors["precio"] = "Debe ingresar datos";
            //   document.getElementById("precio").focus();
        } else {
            if (this.state.precio < 0) {
                formIsValid = false;
                errors["precio"] = "Debe ingresar números positivos";
                //  document.getElementById("precio").focus();
            } else {
                if (!soloNumeros) {
                    formIsValid = false;
                    errors["precio"] = "Debe ingresar solo números";
                    // document.getElementById("precio").focus();
                }
            }
        }
        //Stock
        const soloNumerosStock = regex.test(this.state.stock);
        if (this.state.stock === "") {
            formIsValid = false;
            errors["stock"] = "Debe ingresar datos";
            //   document.getElementById("stock").focus();
        } else {
            if (this.state.stock < 0) {
                formIsValid = false;
                errors["stock"] = "Debe ingresar números positivos";
                //   document.getElementById("stock").focus();
            } else {
                if (!soloNumerosStock) {
                    formIsValid = false;
                    errors["stock"] = "Debe ingresar solo números";
                    //  document.getElementById("stock").focus();
                }
            }
        }

        //Descripción
        if (this.state.descripcion === "") {
            formIsValid = false;
            errors["descripcion"] = "Debe ingresar la descripción";
            //document.getElementById("descripcion").focus();
        }

        //Imagen
        if (this.state.file === "") {
            formIsValid = false;
            errors["file"] = "Debe ingresar una imagen";
            //document.getElementById("file").focus();
        }

        

        this.setState({ errors: errors });
        return formIsValid;
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    botonModificar = () => {        
        if (this.handleValidation()) {
            alert()
            axios.post(url + '/producto/modificar/?id=' + this.props.match.params.id +
                '&nombre=' + this.state.nombre + '&descripcion=' + this.state.descripcion +
                '&precio=' + this.state.precio + '&stock=' + this.state.stock)
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
                    console.log(error.response)
                    console.log(error.response.data)
                })
        }
    }
    limpiar() {
        this.timer = setInterval(() => {
            window.location.reload(1);
        }
            , 800);
    }


    render() {
        const { producto } = this.state
        return (
            <div>
                <h1>Modificar Producto</h1>
                <form onSubmit={this.submit}>
                    <span style={{ color: "red" }}>{this.state.errors["nombre"]}</span>
                    <br />
                    <input type="text" id="nombre"
                        name="nombre"
                        onChange={this.manejadorOnChange} required
                        placeholder={"Nombre: " + producto.nombre}
                    />
                    <br />
                    <span style={{ color: "red" }}>{this.state.errors["descripcion"]}</span>
                    <br />
                    <input type='text' id="descripcion" name="descripcion" required
                        placeholder={"Descripcion: " + producto.descripcion}
                        onChange={this.manejadorOnChange}></input>
                    <br />
                    <span style={{ color: "red" }}>{this.state.errors["precio"]}</span>
                    <br />
                    <input type="text" id="precio" name="precio" required
                        placeholder={"Precio: " + producto.precio}
                        onChange={this.manejadorOnChange} />
                    <br />
                    <span style={{ color: "red" }}>{this.state.errors["stock"]}</span>
                    <br />
                    <input type="text" id="stock" name="stock" required
                        onChange={this.manejadorOnChange}
                        placeholder={"Stock: " + producto.stock} />
                    <br />
                    <span style={{ color: "red" }}>{this.state.errors["proveedorId"]}</span>
                    <br />                   
                    <select name="proveedor" id="proveedor" className="form-control"
                        onChange={this.elegirProveedor}  >
                        <option disabled selected>Selecciona un proveedor</option>
                        {this.state.proveedores.map(proveedorElegido => (
                            <option
                                key={proveedorElegido}
                                name="proveedor"
                                value={proveedorElegido.id}

                            >{proveedorElegido.nombre}</option>
                        ))}
                    </select>
                    <br />
                    <span style={{ color: "red" }}>{this.state.errors["file"]}</span>
                    <br />
                    <label>Imagen del producto: {producto.imagen}</label>
                    <br />
                    <label > Acepta png, jpg y jpeg </label>
                    <br />

                    <input type="file" id="file" className="fadeIn second" name="file"
                        placeholder={"Imagen: " + producto.imagen}
                        accept="image/png, image/jpg, image/jpeg"
                        onChange={this.manejadorImagen} />
                    <br /><br />
                    <ReactBoostrap.Button variant="primary" onClick={this.botonModificar}
                        type="submit">Modificar</ReactBoostrap.Button>
                    <br /><br />

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
