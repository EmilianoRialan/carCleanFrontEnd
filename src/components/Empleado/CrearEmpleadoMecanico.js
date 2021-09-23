import React, { componentDidMount, Component } from 'react'
import axios from 'axios'
import * as ReactBoostrap from 'react-bootstrap';

export default class CrearEmpleadoMecanico extends Component {

    constructor() {
        super();
        this.state = {
            mensaje: "",
            empleadoElegido: "",
            mensajeError: "",
            mensajeSuccess:"",
        }
    }
    manejadorOnChange = e =>
    {
        this.setState({
            empleadoElegido: e.target.value,
            mensaje:"",
        })
    }
    manejadorBoton = () =>
    {
        if (this.state.usuarioElegido !== "") {
            axios.post('http://localhost:9090/empleado/insertar?nombre=' + this.state.empleadoElegido)
                .then(response =>
                {
                    if (response.status === 200) {
                        this.setState({ mensaje: "Ingreso Correcto",mensajeSuccess:"ok" });
                    } else {
                        this.setState({ mensaje: "Ingreso Incorrecto",mensajeError:"error" });
                    }

                }).catch(error =>
                {
                    console.log(error);
                })
        } else {
            this.setState({ mensaje: "Ingreso Incorrecto",mensajeError:"error" });
        }
    }

    render() {
        return (
            <div>
                <div>
                    <h1>Alta Empleado Mecanico</h1>
                    <form onSubmit={this.submit}>
                        <input type="text" id="crearEmpleado" class="fadeIn second" name="nombre" placeholder="Nombre del empleado" onChange={this.manejadorOnChange} required/>
                        <input type="text" id="crearEmpleado" class="fadeIn second" name="direccion" placeholder="Direccion del empleado" onChange={this.manejadorOnChange} required />
                        <input type="text" id="crearEmpleado" class="fadeIn second" name="email" placeholder="Email del empleado" onChange={this.manejadorOnChange} required/>
                        <input type="text" id="crearEmpleado" class="fadeIn second" name="telefono" placeholder="Telefono del empleado" onChange={this.manejadorOnChange} required/>                        
                        <br/> <br/>
                        <ReactBoostrap.Button variant="success" onClick={this.manejadorBoton} >Crear</ReactBoostrap.Button>                        
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
            </div>
        )

    }
}