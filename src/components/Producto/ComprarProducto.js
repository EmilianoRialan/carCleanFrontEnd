import React, {  Component } from 'react'
import axios from 'axios'
import * as ReactBoostrap from 'react-bootstrap';
import { url } from '../API.js';
export default class ComprarProducto extends Component {

    constructor() {
        super();
        this.state = {
           productos:[],
           productoElegido:[],

        }
       
    }
    
    stockOnChange = e => {
        this.setState({
                stock: e.target.value
        })
    }
  
    componentDidMount = () => {
        axios.get(url + '/producto/listarActivos').then((resp) => {
            console.log(resp.data);
            this.setState({
                productos: resp.data,
            });
        }).catch((error) => {
            console.log(error);
        }
        )
    };

    render() {
        return (
            <div>
                <div>
                    <h1>Comprar Producto</h1>
                    <form onSubmit={this.submit}>
                        <input type="text" id="crearProducto" class="fadeIn second"
                         name="stock" placeholder="Stock del producto" onChange={this.stockOnChange} />
                        <ReactBoostrap.Button variant="success" onClick={this.comprar} >Comprar</ReactBoostrap.Button>
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