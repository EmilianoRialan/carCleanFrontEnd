import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

class CrearServicio extends Component
{

    constructor()
    {
        super();
        this.state = {
            servicios: [],
            log: "",
            mensaje: "",
            servicioBorrado: {},
            servicioBorradoId: 0,
            servicioElegido: "",
            mensajeError: "",
            mensajeSuccess:"",
        }
    }

    manejadorOnChange = e =>
    {
        this.setState({
            servicioElegido: e.target.value,
            mensaje:"",
        })
    }
    submit(e)
    {
        e.preventDefault();
    }
    BotonHome = evt =>
    {
        this.props.dispatch({ type: "LISTAR-SERVICIOS", payload: false });
        this.props.dispatch({ type: "PANTALLA-INICIO", payload: true });
        this.props.dispatch({ type: "CREAR-SERVICIO", payload: false });
        this.props.dispatch({ type: "BORRAR-SERVICIO", payload: false });
    }
    manejadorBoton = () =>
    {
        if (this.state.servicioElegido !== "") {
            axios.post('http://localhost:9090/servicios/insertar?nombre=' + this.state.servicioElegido)
                .then(response =>
                {
                    if (response.status === 200) {
                        this.setState({ mensaje: "ingreso correcto",mensajeSuccess:"ok" });
                    } else {
                        this.setState({ mensaje: "ingreso incorrecto",mensajeError:"error" });
                    }

                }).catch(error =>
                {
                    console.log(error);
                })
        } else {
            this.setState({ mensaje: "ingreso incorrecto",mensajeError:"error" });
        }
    }
    render()
    {

        return (
            <div className="container">
                <div className="col">

                    <h1>Crear Servicio</h1>
                    <input type="button" class="fadeIn fourth" value="volver a home" onClick={this.BotonHome} />
                    <div>
                        <form onSubmit={this.submit}>
                            <input type="text" id="crearServicio" class="fadeIn second" name="nombre" placeholder="nombre" onChange={this.manejadorOnChange} />
                            <input type="submit" class="fadeIn fourth" value="Crear Servicio" onClick={this.manejadorBoton} />
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
            </div>
        )

    }
}

function mapStateToProps(state)
{
    return {
        personas: state.personas,
        log: state.log,
        listarSer: state.listarSer,
        crearSer: state.crearSer,
        borrarSer: state.borrarSer,
    }
}
export default connect(mapStateToProps)(CrearServicio)