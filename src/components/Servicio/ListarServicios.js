import React, { Component } from 'react';
import * as ReactBoostrap from 'react-bootstrap';
import axios from 'axios'

import { url } from '../API.js';

export default class ListarServicios extends Component {

  constructor() {
    super();
    this.state = {
      servicios: [],
      searchTerm: ""
    }
  }

  manejadorOnChange = e => {
    this.setState({
      searchTerm: e.target.value,
    })
  }

  componentDidMount = () => {
    axios.get(url + '/servicio/listarActivos').then((resp) => {
      console.log(resp.data);
      this.setState({
        servicios: resp.data,
      });
    }).catch((error) => {
      console.log(error);
    }
    )
  };

  render() {
    return (
      <div className="App">
        <h1 >Listar Servicios</h1>
        <input type="text"
          placeholder="Buscar por nombre"
          onChange={this.manejadorOnChange}
        />
        <br></br><br></br>
        <ReactBoostrap.Table className="table " hover variant="light-dark">
          <thead>
            <th scope="col">Nombre</th>
            <th scope="col">Precio</th>
            <th scope="col">Horas de Trabajo</th>
            <th scope="col">Garantía</th>
          </thead>
          <tbody>
            {
              this.state.servicios.filter(elemento =>
                elemento.nombre.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
                .map(e => (
                  <tr key={e.id} value={e} id={e.id}>
                    <td>{e.nombre}</td>
                    <td>$ {e.precio}</td>
                    <td>{e.horasTrabajo}</td>
                    <td>{e.garantia.cantidadMeses} mes/es</td>
                  </tr>
                )
                )
            }
          </tbody>
        </ReactBoostrap.Table>
      </div>
    );

  }
}