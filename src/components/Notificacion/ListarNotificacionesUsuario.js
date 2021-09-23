import React,{Component} from 'react';
import * as ReactBoostrap from 'react-bootstrap';
import axios from 'axios'
import { url } from '../API.js';
export default class ListarNotificacionesUsuario extends Component {

    constructor() {
      super();
      this.state = {
          notificaciones: [],
          mensaje: "",
          idCli:1,
      }
  }
  componentDidMount = () => {
    axios.get(url + '/notificacion/verNotificacionesDeUsuario/?idUsu='+ 
    localStorage.getItem('usuario')).then((resp) => {
        console.log(resp.data);
        this.setState({
          notificaciones: resp.data,              
        });
    }).catch((error) => {
      this.setState({
        mensaje: error.response.data.message,
        mensajeError: "error"
    });
        console.log(error);
    }
    )
};

render() {
    return (
      <div>
        <h1 >Listar Notificaciones</h1>
        <div>
          <ReactBoostrap.Table  className="table " hover variant="light-dark">
            <thead>
              <th scope="col">Id</th >
              <th scope="col">Servicio</th>
              <th scope="col">Estado del servicio</th>
              <th scope="col">Descripcion</th>
              </thead>              
                <tbody>
                  {       
                   this.state.notificaciones.map(elemento => (
                    <tr key={elemento.id} value={elemento} id={elemento.id}>
                      <td>{elemento.id}</td>
                      <td>{elemento.servicioAgendado.servicio.nombre}</td>
                      <td>{elemento.servicioAgendado.estado.nombre}</td>
                      <td>{elemento.descripcion}</td>
                      <td>
                      <ReactBoostrap.Button variant="success" 
                      //59894233223 telefono taller
                      //59891783712 telefono emi
                      //Linking.openURL('whatsapp://send?text=hello&phone=59891783712')
                      //https://wa.me/59891783712
                        a href = {'https://whatsapp/web/59891783712?text=Hola, quiero obtener información de mi vehículo.'} 
                        id="whatsapp_btn" class="phone whatsapp btnfunnels" rel="nofollow" 
                        target="_blank">¡Escríbenos a través de WhatsApp!</ReactBoostrap.Button>
                        {/* <ButtonGroup>
                          <Button className="button" onClick={this.responderNotificacion.bind(this, elemento.id)}>Responder</Button>
                        </ButtonGroup> */}
                      </td>
                    </tr>
    
                  ))
                  
                  }
                </tbody>
          </ReactBoostrap.Table>
        </div>
      </div>
    );

  }
}