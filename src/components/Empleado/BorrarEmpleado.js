import React, {  Component } from 'react'
import axios from 'axios'
import * as ReactBoostrap from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { url } from '../API.js';
export default class BorrarEmpleado extends Component {
  constructor() {
    super();
    this.state = {
      empleados: [],
      empleadoBorradoId: 0,
      mensajeError: "",
      mensajeSuccess: "",
      mensaje: "",
    }
  }
  componentDidMount = () => {
    axios.get(url + '/empleado/listarActivos').then((resp) => {
      this.setState({
        empleados: resp.data,
      });
    }).catch((error) => {
      console.log(error);
    }
    )
  };

  borrarBoton = (emp) => {
    this.setState({
      empleadoBorradoId: emp
    })
    
    axios.post(url + '/empleado/borrar?id=' + emp)
      .then(response => {
        if (response.status >= 200 && response.status <= 205) {
          this.setState({
            mensaje: response.data,
            mensajeSuccess:"ok"
          });
          this.limpiar();
        }
      }).catch(error => {
        this.setState({
          mensaje: error.response.data,
          mensajeError: "error"
        });
        this.limpiar();
      })      
  }

  limpiar() {
    this.timer = setInterval(() => {
        window.location.reload(1);
    }
        , 900);
}

  render() {

    return (
      <div>

        <h1>Acciones empleados</h1>
        <ReactBoostrap.Table hover variant="light-dark">
          <table className="table ">
            <thead>
              <th scope="col">ID</th >
              <th scope="col">Nombre</th>
              <th scope="col">Borrar</th>
              <th scope="col">Modificar</th>
            </thead>
            <tbody>
              {
                this.state.empleados.map(elemento => (
                  <tr key={elemento.id} value={elemento} id={elemento.id}>
                    <td>{elemento.id}</td>
                    <td>{elemento.nombre}</td>
                    <td><ReactBoostrap.Button type="button" className="btn btn-secondary" value={elemento.id} id={elemento.id}
                      name={elemento.id} onClick={() => this.borrarBoton(elemento.id)}>Borrar</ReactBoostrap.Button></td>
                    <td>
                      <Link className='btn btn-primary' to={'/ModificarEmpleado/' + elemento.id} >Modificar</Link>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </ReactBoostrap.Table>

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
