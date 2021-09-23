import React, { Component } from 'react';
import * as ReactBoostrap from 'react-bootstrap';
import axios from 'axios'
import { url } from '../API';

export default class ListarClientes extends Component {

    constructor() {
        super();
        this.state = {
            clientes: [],
            searchTerm: ""
        }
    }

    manejadorOnChange = e =>{
      this.setState({
        searchTerm:e.target.value,
      })
    }

    componentDidMount = () => {
        axios.get(url + '/cliente/listarActivos').then((resp) => {
            console.log(resp.data);
            this.setState({
                clientes: resp.data,
            });
        }).catch((error) => {
            console.log(error);
        }
        )
    };

    render() {
      return (
        <div>
          <h1 >Listar Clientes</h1>
          <input type="text" 
          placeholder="Buscar por nombre" 
          onChange={this.manejadorOnChange}
        />
        <br></br><br></br>
        <div>
            <ReactBoostrap.Table hover variant="light-dark">
              <table className="table ">
                <thead>
                  <th scope="col">ID</th >
                  <th scope="col">Nombre</th>
                  <th scope="col">Direccion</th>
                  <th scope="col">Categoria</th>     
                  <th scope="col">Descuento</th>           
                </thead>
                <tbody>
                  { 
                  this.state.clientes.filter(elemento => 
                    elemento.nombre.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
                    .map(e=>(
                        <tr key={e.id} value={e} id={e.id}>
                        <td>{e.id}</td>
                        <td>{e.nombre}</td>
                        <td>{e.direccion}</td>
                        <td>{e.categoria.nombre}</td>     
                        <td>{e.categoria.descuento}</td>  
                        </tr>
                        )
                        )
                        
                    // this.state.clientes.filter((elemento) => {
                    //   if (this.searchTerm === "") {
                    //     return elemento;
                    //   } else if (elemento.nombre.toLowerCase().includes(this.state.searchTerm.toLowerCase())) {
                    //     return elemento;
                    //   }
                    // }).map(elemento => (
                    //     <tr key={elemento.id} value={elemento} id={elemento.id}>
                    //     <td>{elemento.id}</td>
                    //     <td>{elemento.nombre}</td>
                    //     <td>{elemento.direccion}</td>
                    //     <td>{elemento.categoria.nombre}</td>     
                    //     <td>{elemento.categoria.descuento}</td>  
                    //     </tr>
                    // ))
                      }
                </tbody>
              </table>
            </ReactBoostrap.Table>
          </div>
        </div>
      );
  
    }



}