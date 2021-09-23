import React, { Component } from 'react'

import axios from 'axios'
import * as ReactBoostrap from 'react-bootstrap';
import { url } from '../API.js';

export default class ModificarCliente extends Component {
  constructor() {
    super();
    this.state = {
      cliente: '',
      nombre: '',
      cedula: '',
      direccion: '',
      categorias: [],
      errors: {},
      catid: 0,
      email:"",
      mensajeError: "",
      mensajeSuccess: "",
      mensaje: "",
    }
  }
  componentDidMount = () => {
    console.log(this.props.match.params.id)
    axios.get(url + '/cliente/buscarPorId?id=' + this.props.match.params.id).then((resp) => {
      this.setState({
        cliente: resp.data,
      });
    }).catch((error) => {
      console.log(error);
    }
    )
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
  manejadorOnChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }
  validarDigitoVerificador(cedula) {
    let a = 0;
    let i = 0;
    if (cedula.length <= 6) {
        for (i = cedula.length; i < 7; i++) {
            cedula = '0' + cedula;
        }
    }
    for (i = 0; i < 7; i++) {
        a += (parseInt("2987634"[i]) * parseInt(cedula[i])) % 10;
    }
    if (a % 10 === 0) {
        return 0;
    } else {
        return 10 - a % 10;
    }
}

validarCedula(cedula) {
    cedula = this.cleanCedula(cedula);
    let dig = cedula[cedula.length - 1];
    cedula = cedula.replace(/[0-9]$/, '');
    return parseInt(dig) === this.validarDigitoVerificador(cedula);
}
cleanCedula(cedula) {
    return cedula.replace(/\D/g, '');
}
  handleValidation() {
    let errors = {};
    let formIsValid = true;

    //Nombre
    if (this.state.nombre === "") {
      formIsValid = false;
      errors["nombre"] = "Debe ingresar el nombre";
      document.getElementById("nombre").focus();
    }
    if (this.state.nombre !== "") {
      let nombre = this.state.nombre.split(" ").join("");
      if (!nombre.match(/^[a-zA-Z]+$/)) {
        formIsValid = false;
        errors["nombre"] = "El nombre solo acepta letras";
        document.getElementById("nombre").focus();
      }
    }

    //C.I. 
    const regex = /^[0-9]*$/;
    const soloNumeros = regex.test(this.state.cedula);
    if (this.state.cedula === "") {
      formIsValid = false;
      errors["cedula"] = "Debe ingresar la Cédula de Identidad";
      document.getElementById("cedula").focus();
    } else {
      if (this.state.cedula < 0) {
        formIsValid = false;
        errors["cedula"] = "Debe ingresar números positivos";
        document.getElementById("cedula").focus();
      } else {
        if (!soloNumeros) {
          formIsValid = false;
          errors["cedula"] = "Debe ingresar solo números";
          document.getElementById("cedula").focus();

        } else {
          if (!this.validarCedula(this.state.cedula)) {
            console.log("entro");
            formIsValid = false;
            errors["cedula"] = "Cédula incorrecta";
            document.getElementById("cedula").focus();
          }
        }
      }
    }
    //Dirección
    if (this.state.direccion === "") {
      formIsValid = false;
      errors["direccion"] = "Debe ingresar la dirección";
      document.getElementById("direccion").focus();
    }

    //Email
    if (this.state.email === "") {
      formIsValid = false;
      errors["email"] = "Debe ingresar el email";
      document.getElementById("email").focus();
    } else {
      if (this.state.email !== "") {
        let lastAtPos = this.state.email.lastIndexOf('@');
        let lastDotPos = this.state.email.lastIndexOf('.');
        if (!(lastAtPos < lastDotPos && lastAtPos > 0 && this.state.email.indexOf('@@') === -1
          && lastDotPos > 2 && (this.state.email.length - lastDotPos) > 2)) {
          formIsValid = false;
          errors["email"] = "El email no es válido";
          //document.getElementById("email").focus();
        }
      } else if (!this.state.email.includes("gmail")) {
        formIsValid = false;
        errors["mail"] = "El mail no es válido";
      } else {
        if (!this.state.email.includes("hotmail")) {
          formIsValid = false;
          errors["mail"] = "El mail no es válido";
        } else {
          if (!this.state.email.includes("mail")) {
            formIsValid = false;
            errors["mail"] = "El mail no es válido";
          } else {
            if (!this.state.email.includes("hotmail")) {
              formIsValid = false;
              errors["mail"] = "El mail no es válido";
            }
            console.log(this.state.email.includes("gmail"));
          }
        }
      }
    }
    //Categoría
    if (this.state.catid <= 0) {
      formIsValid = false;
      errors["catid"] = "Debe ingresar la categoría";
      document.getElementById("catid").focus();
    }

    this.setState({ errors: errors });
    return formIsValid;
  }
  botonModificar = () => {    
    if (this.handleValidation()) {
      axios.post(url + '/cliente/modificar?id=' + this.props.match.params.id + 
      '&nombre=' + this.state.nombre +
        '&direccion=' + this.state.direccion + 
        '&cedula=' + this.state.cedula + 
        '&idCategoria=' + this.state.catid +
         '&email=' + this.state.email
        )
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
          console.log(error);
        })
    }
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
  elegirCategoria = event => {
    console.log(event.target.value)
    this.setState({
      catid: event.target.value,
    });
  }

  render() {
    const { cliente} = this.state
    return (
      <div>
        <h1>Modificar Clientes</h1>
        <form onSubmit={this.submit}>
          <span style={{ color: "red" }}>{this.state.errors["nombre"]}</span>
          <br />
          <input type="text" name='nombre' id="nombre"
            placeholder={"Nombre: " + cliente.nombre} onChange={this.manejadorOnChange} />
          <br />
          <span style={{ color: "red" }}>{this.state.errors["cedula"]}</span>
          <br />
          <input type="text" name='cedula' id='cedula'
            placeholder={"Cédula: " + cliente.cedula} onChange={this.manejadorOnChange} />
          <br />
          <span style={{ color: "red" }}>{this.state.errors["direccion"]}</span>
          <br />
          <input type="text" name='direccion' id='direccion'
            placeholder={"Dirección: " + cliente.direccion} onChange={this.manejadorOnChange} />
          <br />
          <span style={{ color: "red" }}>{this.state.errors["email"]}</span>
          <br />
          <input type="text" class="fadeIn second" name="email" id="email"
            placeholder={"Email: "+ cliente.email} onChange={this.manejadorOnChange} required />
          <br />
          <span style={{ color: "red" }}>{this.state.errors["categoria"]}</span>
          <br />
          <select className="form-control" onChange={this.elegirCategoria}>
            <option disable defaultValue selected>Elige una opcion</option>
            {this.state.categorias.map(categoriaElegida => (
              <option
                key={categoriaElegida.id}
                name="catid"
                id="catid"
                value={categoriaElegida.id}
              >{categoriaElegida.nombre}</option>
            ))}</select>
          <br /><br />
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
    )
  }
}


//(url + '/cliente/modificar?id=' + this.props.match.params.id + '&nombre=' + this.state.nombre +
//'&direccion=' + this.state.direccion + '&cedula=' + this.state.cedula + '&idCategoria=' + catid)