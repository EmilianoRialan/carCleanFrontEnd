import React, { Component } from 'react';
import * as ReactBoostrap from 'react-bootstrap';
import axios from 'axios'
import { url } from '../API.js';

export default class ListarProveedores extends Component {

  constructor() {
    super();
    this.state = {
      proveedores: [],
      mensaje: "",
      nombre: "",
      direccion: "",
      email: "",
      telefono: ""
    }
  }

  componentDidMount = () => {
    axios.get(url +'/proveedor/listarActivos/').then((resp) => {
      console.log(resp.data);
      this.setState({
        proveedores: resp.data,
      });
    }).catch((error) => {
      console.log(error);
    }
    )
  };
  render() {
    return (
      <div>
        <h1 >Listar Proveedores</h1>
        <div>
          <ReactBoostrap.Table hover variant="light-dark">
            <table className="table ">
              <thead>
                <th scope="col">ID</th >
                <th scope="col">Nombre</th>
                <th scope="col">Direccion</th>
                <th scope="col">Email</th>
                <th scope="col">Telefono</th>
              </thead>
              <tbody>
                {
                  this.state.proveedores.map(elemento => (
                    <tr key={elemento.id} value={elemento} id={elemento.id}>
                      <td>{elemento.id}</td>
                      <td>{elemento.nombre}</td>
                      <td>{elemento.direccion}</td>
                      <td>{elemento.email}</td>
                      <td>{elemento.telefono}</td>
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