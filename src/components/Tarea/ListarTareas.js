import React,{ Component } from 'react';
import * as ReactBoostrap from 'react-bootstrap';
import axios from 'axios'
import{ url} from '../API.js'

export default class ListarTareas extends Component {

  constructor() {
    super();
    this.state = {
      tareas: [],
      mensaje: "",
    }
  }

  componentDidMount = () => {
    axios.get(url + '/tarea/listarActivos').then((resp) => {
      console.log(resp.data);
      this.setState({
        tareas: resp.data,
      });
    }).catch((error) => {
      console.log(error);
    }
    )
  };
  render() {
    return (
      <div>
        <h1 >Listar Tareas</h1>
        <div>
          <ReactBoostrap.Table className="table " hover variant="light-dark">
            <thead>
              <th scope="col">ID</th >
              <th scope="col">Nombre</th>
              <th scope="col">Descripcion</th>
            </thead>

            <tbody>
              {
                this.state.tareas.map(elemento => (
                  <tr key={elemento.id} value={elemento} id={elemento.id}>
                    <td>{elemento.id}</td>
                    <td>{elemento.nombre}</td>
                    <td>{elemento.descripcion}</td>
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