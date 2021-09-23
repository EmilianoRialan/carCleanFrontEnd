import React, { Component } from 'react';
import axios from 'axios';
import * as ReactBoostrap from 'react-bootstrap';
import { url } from '../API.js';

export default class ModificarEstado extends Component {
  constructor(props) {
    super(props);
    this.state = {
      estado: '',
      nombre: "",
      mensaje: "",
      mensajeError: "",
      errors: {},
      valor: 0,
      mensajeSuccess: "",
    }
  }

  componentDidMount = () => {   
    axios.get(url + '/estado/buscarPorId?id=' + this.props.match.params.id).then((resp) => {      
      this.setState({
        estado: resp.data,
        valor:resp.data.valor
      });
    }).catch((error) => {
      console.log(error);
    }
    )
  };

  manejadorOnChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  elegirEstadoModificado = EstadoModificado => {
    this.setState({
      EstadoIdModificado: EstadoModificado.target.value
    })
    if (this.state.EstadoIdModificado !== 0) {
      this.borrarBoton();

    }
    console.log(this.state.EstadoIdModificado);
  }
  handleValidation() {
    let errors = {};
    let formIsValid = true;

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
      }
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
        , 800);
}

  botonModificar = () => {     
    if (this.handleValidation()) {      
      axios.post(url + '/estado/modificar?id=' + this.props.match.params.id + '&nombre=' + this.state.nombre + '&valor=' + this.state.valor)
        .then(response => {
          if (response.status >= 200 && response.status <= 205) {        
            this.setState({
              mensaje: response.data,
              mensajeSuccess: "ok",
            });
            this.limpiar();
          }
        }).catch(error => {
          this.setState({
            mensaje: error.response.data,
            mensajeError: "error"
          });
          this.limpiar();
          console.log(error.response)
          console.log(error.response.data)
        });
    }
  }

  render() {
    const { estado, nombre } = this.state
    return (
      <div>
        <h1>Modificar Estado</h1>
        <form onSubmit={this.submit}>
          <span style={{ color: "red" }}>{this.state.errors["nombre"]}</span>
          <br />
          <input type="text" name='nombre' value={nombre} placeholder={"Nombre: " + estado.nombre} 
          onChange={this.manejadorOnChange} />
          <br /><ReactBoostrap.Button variant="primary" onClick={this.botonModificar}>Modificar</ReactBoostrap.Button>
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
    );
  }
}
