import React, { Component } from 'react';
import * as ReactBoostrap from 'react-bootstrap';
import axios from 'axios'
import { url } from '../API.js';


export default class ListarCategoria extends Component {

  constructor() {
    super();
    this.state = {
        categorias: [],
        mensaje: "",           
        nombre:"",
        descuento:"",
        mensajeError: "",
        mensajeSuccess:"",
    }
  }

  componentDidMount = () => {
    axios.get(url + '/categoria/listarActivos').then((resp) => {
      console.log(resp.data);
      this.setState({
        categorias: resp.data,
      });
    }).catch((error) => {
      console.log(error);
    }
    )
  };
  render() {
    return (
      <div>
        <h1 >Lista de Categorias</h1>
        <div>
          <ReactBoostrap.Table hover variant="light-dark">
            <table className="table ">
              <thead>
                <th scope="col">ID</th >
                <th scope="col">Nombre</th>
                <th scope="col">Descuento</th>               
              </thead>
              <tbody>
                {
                  this.state.categorias.map(elemento => (
                    <tr key={elemento.id} value={elemento} id={elemento.id}>
                      <td>{elemento.id}</td>
                      <td>{elemento.nombre}</td>
                      <td>{elemento.descuento}</td>                      
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </ReactBoostrap.Table>
        </div>
      </div>
    );

  }
}