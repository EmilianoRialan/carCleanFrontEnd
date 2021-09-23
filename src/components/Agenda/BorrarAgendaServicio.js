import React, { Component } from 'react'
import axios from 'axios'
import * as ReactBoostrap from 'react-bootstrap';
import Button from 'react-bootstrap/Button'
import { url } from '../API.js';

export default class BorrarAgendaServicio extends Component {
  constructor() {
    super();
    this.state = {
      agenda: [],
      agendaBorrado: {},
      agendaBorradoId: 0,
      serviciosAgendados: [],
      servicioBorrado:"",
    }
  }
  componentDidMount = () => {
    axios.get(url + '/servicioAgendado/listarActivos').then((resp) => {
      console.log(resp.data);
      this.setState({
        serviciosAgendados: resp.data,
      });
    }).catch((error) => {
      console.log(error);
    }
    )
  };


  borrarBoton = (id) => {
    this.setState({
      servicioBorrado: id
    })
    axios.post(url + '/servicioAgendado/borrar?id=' + id)
      .then(response => {
        if (response.status >= 200 && response.status <= 205) {
          this.setState({
            mensaje: response.data,
            mensajeSuccess: "ok",                            
        });
        }
      }).catch(error => {
        this.setState({
          mensaje: error.response.data,
          mensajeError: "error"
      });
      })     
      this.limpiar();
  }
  
  limpiar() {
    this.timer = setInterval(() => {
        window.location.reload(1);
    }
        , 2000);
}

  render() {

    return (
      <div>
        <h1>Lista Agenda</h1>
        <ReactBoostrap.Table className="table " hover variant="light-dark">
          <thead>
            <th scope="col">Id</th >
            <th scope="col">Estado</th>
            <th scope="col">Fecha Elegida</th>
            <th scope="col">Fecha Registro</th>
            <th scope="col">Id Servicio</th>
            <th scope="col">Accion</th>
          </thead>
          <tbody>
            {
              this.state.serviciosAgendados.map(elemento => (
                <tr key={elemento.id} value={elemento} id={elemento.id}>
                  <td>{elemento.id}</td>
                  <td>{elemento.estado.nombre}</td>
                  <td>{elemento.fechaElegida.substring(0, [10])}</td>
                  <td>{elemento.fechaRegistro.substring(0, [10])}</td>
                  <td>{elemento.servicio.id}</td>
                  <td>
                    <Button className="btn btn-secondary" onClick={() => this.borrarBoton(elemento.id)}>Cancelar Servicio</Button>
                  </td>
                </tr>

              ))
            }
          </tbody>
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
