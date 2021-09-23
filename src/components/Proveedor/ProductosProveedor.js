import React, { Component } from 'react';
import * as ReactBoostrap from 'react-bootstrap';
import axios from 'axios'
import { url } from '../API.js';

export default class ProductosProveedor extends Component {

    constructor() {
        super();
        this.state = {
            proveedores: [],
            productos: [],
            productosDeProveedor: [],
            mensaje: "",
            proveedorElegido: "",
            cargado: false,
        }
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
    elegirProveedor = proveedor => {
        console.log(proveedor.target.value);
        this.setState({
            proveedorElegido: proveedor.target.value
        })

    }
    listarProductos = () => {
        console.log(this.state.proveedorElegido);
        axios.get(url + '/producto/productosProveedor/?idProveedor=' + this.state.proveedorElegido).then((resp) => {
            console.log(resp.data.length);
            if (resp.data.length > 0) {
                this.setState({
                    productosDeProveedor: resp.data,
                });
                this.ponerCargarEnVerdadero(this.state.productosDeProveedor);
            }
            if (resp.data.length === 0) {
                this.setState({
                    cargado: false,
                });
            }
            console.log(this.state.productosDeProveedor);


        }).catch((error) => {
            console.log(error);
        }
        )

    }
    ponerCargarEnVerdadero = (pdp) => {
        if (pdp !== "") {
            this.setState({ cargado: true, })
        }
    }
    render() {
        return (
            <div>
                <h1 >Listar Productos de proveedor</h1>
                <div>
                    <select
                        name="proveedor"
                        id="proveedor"
                        className="form-control"
                        onChange={this.elegirProveedor}
                        onClick={this.listarProductos}
                        selectedValue={this.state.proveedorElegido}
                        placeholderText="Proveedores">
                        <option disabled selected >Eliga un proveedor</option>
                        {/* <option hidden selected id="seleccionarServicio">Servicio</option> */}
                        {this.state.proveedores.map(proveedorElegido => (

                            <option
                                key={proveedorElegido}
                                name="proveedor"
                                value={proveedorElegido.id}
                                selectedValue={proveedorElegido}
                            >{proveedorElegido.nombre}</option>
                        ))}</select>
                    {this.state.cargado === true ? (
                        <ReactBoostrap.Table className="table " hover variant="light-dark">
                            <thead>

                                <th scope="col">ID</th >
                                <th scope="col">Imagen</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Descripción</th>
                                <th scope="col">Precio</th>
                            </thead>

                            <tbody>
                                {
                                    this.state.productosDeProveedor.map(elemento => (
                                        <tr key={elemento.id} value={elemento} id={elemento.id}>
                                            <td>{elemento.id}</td>
                                            <td><img alt={elemento.nombre} src={'/images/' + elemento.imagen}
                                                width="100" height="75"></img></td>
                                            <td>{elemento.nombre}</td>
                                            <td>{elemento.descripcion}</td>
                                            <td>{elemento.precio}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </ReactBoostrap.Table>
                    ) : null}
                </div>
            </div>
        );

    }
}