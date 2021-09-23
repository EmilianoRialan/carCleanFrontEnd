import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

class ListarServicios extends Component {

    constructor() {
        super();
        this.state = {
            servicios: [],
            log: "",
            servicioElegido: "",
            mensaje: "",
            servicioBorrado: {},
            servicioBorradoId: 0
        }
    }
    elegirServicio = servicio =>
    {
      this.setState({
        servicioElegido: servicio.target.value
      })
    }
  
    componentDidMount = () => {
        axios.get('http://localhost:9090/servicios/listar').then((resp) => {
            console.log(resp.data);
            this.setState({
                servicios: resp.data,              
            });
        }).catch((error) => {
            console.log(error);
        }
        )
    };
  
  
    
    BotonHome = evt =>
    {
      this.props.dispatch({ type: "LISTAR-SERVICIOS", payload: false });
      this.props.dispatch({ type: "PANTALLA-INICIO", payload: true });
      this.props.dispatch({ type: "CREAR-SERVICIO", payload: false });
      this.props.dispatch({ type: "BORRAR-SERVICIO", payload: false });
    }

    render() {
        return (
          <div className="container">
           
            <input type="button" class="fadeIn fourth" value = "volver a home" onClick={this.BotonHome} />
                 <label id="labeles"
                        className="lead" >Selecciona el servicio</label>
                    <div className="">
                        <select
                            name="servicio"
                            id="select"
                            className="form-control"
                           
                            onChange={this.elegirServicio}
                            selectedValue={this.state.servicioElegido}
                            placeholderText="Servicios">
                            {/* <option hidden selected id="seleccionarServicio">Servicio</option> */}
                            {this.state.servicios.map(servicioElegido => (
                                <option
                                     key={servicioElegido}
                                    name="servicio"
                                    value={servicioElegido}
                                    selectedValue={servicioElegido}
                                >{servicioElegido.nombre}</option>
                            ))}</select>

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
    borrarSer:state.borrarSer,
  }
}
export default connect(mapStateToProps)(ListarServicios)