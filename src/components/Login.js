import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import { url } from './API.js';
import { Redirect } from "react-router-dom";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      form: {
        user: "",
        password: "",
      },
      usuario: {},
      logged: null,
      redirect: false,
      perfil: '',
      mensajeError: "",
      mensajeSuccess: "",
      mensaje: "",
      errors: {},
    }
  }
  handleValidation() {

    let errors = {};
    let formIsValid = true;
    if (this.state.form.password === "") {
      formIsValid = false;
      errors["password"] = "Debe ingresar la contraseña";
      document.getElementById("password").focus();
    }
    //user
    if (this.state.form.user === "") {
      formIsValid = false;
      errors["user"] = "Debe ingresar el usuario";
    }

    if (typeof this.state.form.user !== "undefined") {
      let lastAtPos = this.state.form.user.lastIndexOf('@');
      let lastDotPos = this.state.form.user.lastIndexOf('.');
      if (!(lastAtPos < lastDotPos && lastAtPos > 0 && this.state.form.user.indexOf('@@') === -1
        && lastDotPos > 2 && (this.state.form.user.length - lastDotPos) > 2)) {
        formIsValid = false;
        errors["user"] = "El usuario no es válido";
        document.getElementById("user").focus();
      }
    }


    this.setState({ errors: errors });
    return formIsValid;
  }
  manejadorOnChange = async e => {
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    })
  }


  manejadorBoton = (e) => {
    e.preventDefault();
    if (this.handleValidation()) {
      axios.get(url + '/usuario/buscarPorEmail/?email='
        + this.state.form.user + '&password=' + this.state.form.password)
        .then(response => {
          if (response.status >= 200 && response.status <= 205) {
            this.setState({
              usuario: response.data,
              logged: true,
              perfil: response.data.perfil,
              redirect: true,
              mensaje: "ingreso correcto",
              mensajeSuccess: "ok"
            });
          } else {
            this.setState({ mensaje: "Ingreso Incorrecto", mensajeError: "error" });
          }
        }).catch(error => {
          this.setState({
            mensaje: error.response.data.message,
            mensajeError: "error"
          });
          
        })
    }
  }


  render() {
    if (this.state.redirect !== false && this.state.form.user !== "") {
      localStorage.setItem("perfil", this.state.perfil.nombre)
      localStorage.setItem("usuario", this.state.usuario.id)
      return <Redirect to={window.location.href = '/PantallaPrincipal'} />
    } else
      return (
        <div class="wrapper fadeInDown">
          <img className='fondoLogin' src= '/images/taller1.jpg' alt='login'/>
          <div id="formContent">
            <div class="fadeIn first">
              <img src="images/car-clean-logo.jpg" id="icon" width="100px" alt="User Icon" />
            </div>
            <br></br>
            <form onSubmit={this.onSubmit}>
              <input type="text" id="user" name="user" placeholder="Email del usuario"
                onChange={this.manejadorOnChange} required />
              <br />
              <span style={{ color: "red" }}>{this.state.errors["user"]}</span>
              <input type="password" id="password" name="password" placeholder="Password"
                onChange={this.manejadorOnChange} required />
              <br />
              <span style={{ color: "red" }}>{this.state.errors["password"]}</span>
              <br />
              <input type="submit" value="Log In" onClick={this.manejadorBoton} />
            </form>
            <div id="formFooter">
              <a class="btn btn primary" href="/RegistroUsuario">Registrarse</a>
            </div>
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
      );
  }

}

