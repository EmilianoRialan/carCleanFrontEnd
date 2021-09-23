import React, { Component } from 'react'
import axios from 'axios'
import { url } from '../API.js';
import * as ReactBoostrap from 'react-bootstrap';
export default class CrearProductos extends Component {

    constructor() {
        super();
        this.state = {
            mensaje: "",
            productoElegido: "",
            proveedores: [],
            nombre: "",
            precio: "",
            stock: "",
            proveedorId: "",
            file: "",
            link:"",
            descripcion: "",
            mensajeError: "",
            mensajeSuccess: "",
            errors: {},
        }
    }


    manejadorOnChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }


    elegirProveedor = event => {
        //event.preventDefault();
        //console.log(event.target.value)
        this.setState({
            proveedorId: event.target.value,
        });
    }

    componentDidMount = () => {
        axios.get(url + '/proveedor/listarActivos').then((resp) => {
            console.log(resp.data);
            this.setState({
                proveedores: resp.data,
            });
        }).catch((error) => {
            console.log(error);
        }
        )
    };

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
          , 900);
      }

    cargarDatos = () => {    
        if (this.handleValidation()) {
            axios.post(url + '/producto/insertar?nombre=' + this.state.nombre + '&descripcion=' + this.state.descripcion +
            '&precio=' + this.state.precio + '&stock=' + this.state.stock + '&idProveedor='+ this.state.proveedorId +'&link=' + this.state.link)                
                .then(response => {                  
                    if (response.status >= 200 && response.status <= 205) {
                        this.setState({
                            mensaje: response.data,
                            mensajeSuccess: "ok",                            
                        });  this.limpiar()                     
                    }
                }).catch(error => {
                    this.setState({
                        mensaje: error.response.data,
                        mensajeError: "error"
                    });
                    this.limpiar()
                })
        }
    }


    render() {
        return (
            <div>
                <div>
                    <h1>Alta Producto</h1>
                    <form onSubmit={this.submit} encType="multipart/form-data">
                        <span style={{ color: "red" }}>{this.state.errors["nombre"]}</span>
                        <br />
                        <input type="text" id="nombre"
                            name="nombre" placeholder="Nombre del producto"
                             onChange={this.manejadorOnChange} required/>
                        <br />
                        <span style={{ color: "red" }}>{this.state.errors["descripcion"]}</span>
                        <br />
                        <input type='text' id="descripcion" name="descripcion" required
                            placeholder="Descripción del producto" onChange={this.manejadorOnChange}></input>
                        <br />
                        <span style={{ color: "red" }}>{this.state.errors["precio"]}</span>
                        <br />
                        <input type="text" id="precio" name="precio" required
                            placeholder="Precio del producto" onChange={this.manejadorOnChange} />
                        <br />
                        <span style={{ color: "red" }}>{this.state.errors["stock"]}</span>
                        <br />
                        <input type="text" id="stock" name="stock" required
                            placeholder="Stock del producto" onChange={this.manejadorOnChange} />
                        <br />
                        <span style={{ color: "red" }}>{this.state.errors["proveedorId"]}</span>
                        <br />                        
                        <select name="proveedorId" id="proveedorId" className="form-control"
                            onChange={this.elegirProveedor} >
                            <option disabled defaultValue selected>Selecciona un proveedor</option>
                            {this.state.proveedores.map(proveedorElegido => (
                                <option
                                    // key={proveedorElegido}
                                    name="proveedorId"
                                    value={proveedorElegido.id}

                                >{proveedorElegido.nombre}</option>
                            ))}
                        </select>
                        <span style={{ color: "red" }}>{this.state.errors["link"]}</span>
                        <br />
                        <input type="text" id="link" name="link" 
                            placeholder="Link del producto en Mercado Libre" onChange={this.manejadorOnChange} />
                        <br />
                        
                        <br /><br />
                        <ReactBoostrap.Button variant="success" onClick={this.cargarDatos}
                            >Crear</ReactBoostrap.Button>
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
            </div>
        )
    }
}


