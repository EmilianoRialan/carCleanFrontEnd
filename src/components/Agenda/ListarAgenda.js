import React, { Component } from 'react';
import * as ReactBoostrap from 'react-bootstrap';
import axios from 'axios'
import { url } from '../API.js';
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'



export default class ListarAgenda extends Component {

  constructor() {
    super();
    this.state = {
      serviciosAgendados: [],
      log: "",
      mensaje: "",
      date: new Date(),
      tareas: [],
      estaCliqueado: false,
      estaIniciado: false,
      notificacion: {},
      idServicio: "",
      description: "",
      idCli: 1,
      searchTerm: "",
      usuario: [],
      fechaVacia: "VACIA",
      btnIniciar: false,//verdadero esta deshabilitado y falso esta habilitado
      btnFinalizar: true,
      mensajeError: "",
      mensajeSuccess: "",
    }
    this.verTareas.bind();

  }

  componentWillUnmount() {
    clearInterval(this.timer);
}
limpiar() {
    this.timer = setInterval(() => {
       // window.location.reload(1);
        this.setState({
          mensajeError:"",
          mensajeSuccess:"",
        });
    }
        , 5000);
}
  onChangeDescription = e => {
    console.log(e.target.value);
    this.setState({
      description: e.target.value,
    })
  }

  verTareas = (serId) => {
    console.log(serId);
    axios.post(url + '/tareaAgendada/listasTareasServicio/?id=' + serId).then((resp) => {
      console.log(resp.data);
      this.setState({
        tareas: resp.data,
        estaCliqueado: true,
        idServicio: serId,
      });
    }).catch((error) => {
      console.log(error);
    }
    )
  }
  iniciarAlServicio = e => {
    console.log(this.state.idServicio)
    axios.post(url + '/servicioAgendado/iniciarServicioAgendado/?id=' + this.state.idServicio).then((resp) => {
      console.log(resp.data);
      if (resp.status >= 200 && resp.status <= 205) {
        this.setState({
          mensaje: resp.data,
          mensajeSuccess: "ok",
        });
        this.componentDidMount();

      }
    }).catch((error) => {
      this.setState({
        mensaje: error.response.data,
        mensajeError: "error"
      });
    }
 
    )
    this.limpiar();
  }
  finalizarAlServicio = e => {
    console.log(this.state.idServicio)
    axios.post(url + '/servicioAgendado/finalizarServicioAgendado/?id=' + this.state.idServicio).then((resp) => {
      console.log(resp.data);
      if (resp.status >= 200 && resp.status <= 205) {
        this.setState({
          mensaje: resp.data,
          mensajeSuccess: "ok",
        });
        this.finalizarNotificacion();
        this.componentDidMount();
        this.verTareas(this.state.idServicio);
        
      }
    }).catch((error) => {
      this.setState({
        mensaje: error.response.data,
        mensajeError: "error"
      });
      console.log(error);
    }
    )
    this.limpiar();
  }
  iniciarTarea = (tarId) => {
    console.log(tarId);
    axios.post(url + '/tareaAgendada/iniciarTarea/?id=' + tarId).then((resp) => {
      console.log(resp);
      if  (resp.status >= 200 && resp.status <= 205)  {
        this.setState({
          estaInciado: true,  //boolean esta iniciado
          btnIniciar: true,
          btnFinalizar: false,
            mensaje: resp.data,
            mensajeSuccess: "ok",
         
        });
        this.verTareas(this.state.idServicio);
        this.iniciarAlServicio();
        this.iniciarNotificacion();
        //al iniciar la tarea cambiar el estado al servicio a que esta en proceso
      }
    }).catch((error) => {
      this.setState({
        mensaje: error.response.data,
        mensajeError: "error"
      });
      console.log(error);

    }
    )
    this.limpiar();
  }
  finalizarTarea = (tarId) => {
    console.log(tarId);
    axios.post(url + '/tareaAgendada/finalizarTarea/?id=' + tarId).then((resp) => {

      if  (resp.status >= 200 && resp.status <= 205)  {
        this.setState({
          estaInciado: false,
          btnFinalizar: true,
            mensaje: resp.data,
            mensajeSuccess: "ok",
         
        });
      }
      this.verTareas(this.state.idServicio);
    }).catch((error) => {
      this.setState({
        mensaje: error.response.data,
        mensajeError: "error"
      });
      console.log(error);
    }
    )
    this.limpiar();
  }
  btnIniciar(id) {
    const val = id;
    //retornar un booleano
    return val
  }
  btnFinalizar(id) {
    const val = id;
    //retornar un booleano
    return val
  }
  iniciarNotificacion = () => {
    axios.post(url + '/notificacion/iniciarNotificacion/?idUsu=' + localStorage.getItem('usuario') + "&idSerAge="
      + this.state.idServicio).then((resp) => {
        if  (resp.status >= 200 && resp.status <= 205)  {
        console.log(resp.data);
        this.setState({
          mensaje: resp.data,
          mensajeSuccess: "ok",
        });
      }
      }).catch((error) => {
        console.log(error);
        this.setState({
          mensaje: error.response.data,
          mensajeError: "error"
        });
      }
      )
      this.limpiar();
  }

  finalizarNotificacion = () => {
    axios.post(url + '/notificacion/finalizarNotificacion/?idSerAge='
      + this.state.idServicio + "&descripcion=" + this.state.description).then((resp) => {
        console.log(resp.data); 
        if  (resp.status >= 200 && resp.status <= 205)  {
        this.setState({
          mensaje: resp.data,
          mensajeSuccess: "ok",
        });
      }
      }).catch((error) => {
        console.log(error);
        this.setState({
          mensaje: error.response.data,
          mensajeError: "error"
        });
      }
      )
      this.limpiar();
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
    let id = 0
    axios.get(url + '/usuario/buscarPorId/?id='
      + id).then((resp) => {
        this.setState({
          usuario: resp.data,
        });
      }).catch((error) => {
        this.setState({
          mensaje: error.response,
          mensajeError: "error"
        });
        console.log(error);
      }
      )
      this.limpiar();
  };

  manejadorOnChange = e => {

    this.setState({

      searchTerm: e.target.value,

    })

  }

  render() {
    return (
      <div>
        <h1 >Lista Agenda</h1>
        <input type="text" placeholder="Buscar por estado nombre" onChange={this.manejadorOnChange} />
        <ReactBoostrap.Table className="table " hover variant="light-dark">
          <thead>
            <th scope="col">Id</th >
            <th scope="col">Estado</th>
            <th scope="col">Fecha Elegida</th>
            <th scope="col">Fecha Registro</th>
            <th scope="col">Id Servicio</th>
          </thead>
          <tbody>
            {
              this.state.serviciosAgendados.filter(elemento =>
                elemento.estado.nombre.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
                .map(e => (
                  <tr key={e.id} value={e} id={e.id}>
                    <td>{e.id}</td>
                    <td>{e.estado.nombre}</td>
                    <td>{e.fechaElegida.substring(0, [10])}</td>
                    <td>{e.fechaRegistro.substring(0, [10])}</td>
                    <td>{e.servicio.id}</td>
                    <td>

                      <ButtonGroup>
                        <Button className="button" onClick={this.verTareas.bind(this, e.id)}>Ver tareas</Button>
                      </ButtonGroup>
                    </td>
                  </tr>
                )
                )
            }

          </tbody>
        </ReactBoostrap.Table>
        <ReactBoostrap.Table>
          <thead>
            <th scope="col">Id</th >
            <th scope="col">Tarea nombre</th>
            <th scope="col">Tarea descripcion</th>
            <th scope="col">Estado</th>
          </thead>
          <tbody>
            {this.state.estaCliqueado === true ?
              this.state.tareas.map(e => (
                <tr key={e.id} value={e} id={e.id}>
                  <td>{e.id}</td>
                  <td>{e.tarea.nombre}</td>
                  <td>{e.tarea.descripcion}</td>
                  <td>{e.estado.nombre}</td>
                  {/* <td>{e.fechaInicio !== null ? e.fechaInicio.substring(0, [10]) : this.state.fechaVacia}</td>
                  <td>{e.fechaFin !== null ? e.fechaFin.substring(0, [10]) : this.state.fechaVacia}</td> */}
                  <td>
                    {/* {this.state.btnIniciar===false&&this.btnIniciar(e.id)===e.id? */}
                    <ButtonGroup>
                      <Button className="button"
                        disabled={(e.estado.nombre !== ("EN ESPERA DE COMIENZO")
                          && e.estado.nombre === ("FINALIZADO")) || (e.estado.nombre === ("COMENZADA"))}
                        onClick={this.iniciarTarea.bind(this, e.id)}>Iniciar</Button>
                    </ButtonGroup>
                    {/* :null} */}
                  </td>
                  <td>
                    <ButtonGroup>
                      <Button className="button"
                        disabled={((e.estado.nombre !== ("COMENZADA")
                          && e.estado.nombre === ("EN ESPERA DE COMIENZO"))
                          || (e.estado.nombre === ("FINALIZADO")))}
                        onClick={this.finalizarTarea.bind(this, e.id)}>Finalizar</Button>
                    </ButtonGroup>
                  </td>
                </tr>
              )) : null
            }
            <input type="text" name="description"
              placeholder="Ingrese una descripción" onChange={this.onChangeDescription} />
            {/* <ButtonGroup> */}
            <Button className="secondary" onClick={this.finalizarAlServicio}>Finalizar Servicio</Button>
            {/* </ButtonGroup> */}


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
    );

  }
}