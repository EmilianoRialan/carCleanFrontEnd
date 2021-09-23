import React, {  Component } from 'react'
import axios from 'axios'
import * as ReactBoostrap from 'react-bootstrap';
import { url } from '../API.js';


export default class ModificarProveedor extends Component {
    constructor(props) {
        super(props);
        this.state = {                    
            proveedor:"",           
            nombre:"",  
            direccion:"",
            email:"",
            telefono:'',       
            mensaje: "",
            cedula:'',
            mensajeError: "",
            mensajeSuccess: "",
            errors: {}            
        }
    }
    componentDidMount = () => {
        console.log(this.props.match.params.id)
        axios.get(url + '/proveedor/buscarPorId?id=' + this.props.match.params.id).then((resp) => {   
            console.log(resp.data)                 
            this.setState({                
                proveedor:resp.data                              
            });
        }).catch((error) => {
            console.log(error);
        }
        )
    };

    manejadorOnChange = e =>
    {
        this.setState({[e.target.name]: e.target.value })
    }

    handleValidation(){
        
        let errors = {};
        let formIsValid = true;
    
         //Nombre
         if (this.state.nombre === "") {
            formIsValid = false;
            errors["nombre"] = "Debe ingresar el nombre";

        }

        if (this.state.nombre !== "") {
            let nombre = this.state.nombre.split(" ").join("");
            if(!nombre.match(/^[a-zA-Z]+$/)){
                formIsValid = false;
                errors["nombre"] = "El nombre solo acepta letras";

            }
        }

        //Dirección
        if (this.state.direccion === "") {
           formIsValid = false;
           errors["direccion"] = "Debe ingresar la dirección!!!";
           //document.getElementById("direccion").focus();
        }
    
        //Mail
        if(this.state.email === ""){
            formIsValid = false;
            errors["email"] = "Debe ingresar el mail!!!";
            //document.getElementById("email").focus();
        }
 
        if(typeof this.state.email !== "undefined"){
            let lastAtPos = this.state.email.lastIndexOf('@');
            let lastDotPos = this.state.email.lastIndexOf('.');
 
            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && this.state.email.indexOf('@@') === -1 
            && lastDotPos > 2 && (this.state.email.length - lastDotPos) > 2)) {
               formIsValid = false;
               errors["email"] = "El mail no es válido!!!";
               //document.getElementById("email").focus();
            }
        }  
    //C.I.
    const regex = /^[0-9]*$/;
           //Teléfono
        
       const soloNumerosTelefono = regex.test(this.state.telefono);
       if (!soloNumerosTelefono) {
           formIsValid = false;
           errors["telefono"] = "Debe ingresar solo números";

       } else {
           if (this.state.telefono < 0) {
               formIsValid = false;
               errors["telefono"] = "Debe ingresar números positivos";

           } else {
               if (this.state.telefono === "") {
                   formIsValid = false;
                   errors["telefono"] = "Debe ingresar un teléfono válido";

               }
           }
       }

    
       this.setState({errors: errors});
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
    botonModificar = () =>
    {    
        //this.limpiar();
        if(this.handleValidation()){           
            axios.post(url + '/proveedor/modificar/?id=' + this.props.match.params.id + '&nombre=' + this.state.nombre +
            '&direccion='+ this.state.direccion +'&email=' + this.state.email +'&telefono=' + this.state.telefono)
            .then(response =>
                {
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
                    });this.limpiar();
                    console.log(error.response)
                    console.log(error.response.data)
                })
        }
    }


    render() {
        const {proveedor, nombre, direccion, email, telefono} = this.state
        return (
            <div>
                <h1>Modificar Proveedor</h1>
                <form onSubmit={this.submit}>
                    <span style={{color: "red"}}>{this.state.errors["nombre"]}</span>
                    <br/>
                    <input type="text" name='nombre' value={nombre} placeholder={"Nombre: " + proveedor.nombre} onChange={this.manejadorOnChange} />                    
                    <br/>
                    <span style={{color: "red"}}>{this.state.errors["direccion"]}</span>
                    <br/>
                    <input type="text" name='direccion' value={direccion} placeholder={"direccion: " + proveedor.direccion} onChange={this.manejadorOnChange} />
                    <br/>
                    <span style={{color: "red"}}>{this.state.errors["email"]}</span>
                    <br/>
                    <input type="text" name='email'  value={email}placeholder={"email: " + proveedor.email} onChange={this.manejadorOnChange} />
                    <br/>
                    <span style={{color: "red"}}>{this.state.errors["telefono"]}</span>
                    <br/>
                    <input type="text" name='telefono'  value={telefono} placeholder={"telefono: " + proveedor.telefono} onChange={this.manejadorOnChange} />
                    <br/><br/>
                    <ReactBoostrap.Button variant="primary" onClick={this.botonModificar}>Modificar</ReactBoostrap.Button>
                </form>
                {this.state.mensajeSuccess==="ok"?
                        <div class="alert alert-success" role="alert">
                            { this.state.mensaje }
                            </div> : (this.state.mensajeError === "error")?
                            <div class="alert alert-danger" role="alert">
                            { this.state.mensaje }
                            </div>:null
                        }
            </div>
        )
    }
}
