import React,{Component} from 'react';
import * as ReactBoostrap from 'react-bootstrap';
import axios from 'axios'
import { url } from '../API.js';

export default class ListarUsuarios extends Component {

  constructor() {
    super();
    this.state = {
        usuarios: [],
        mensaje: "",
    }
}

  componentDidMount = () => {
    axios.get(url + '/usuario/listarActivos').then((resp) => {
        console.log(resp.data);
        this.setState({
            usuarios: resp.data,              
        });
    }).catch((error) => {
        console.log(error);
    }
    )
};
  render() {
    return (
      <div>
        <h1 >Listar Usuarios</h1>
        <div>
          <ReactBoostrap.Table  className="table " hover variant="light-dark">
            <thead>
              <th scope="col">ID</th >
              <th scope="col">Nombre</th>              
              </thead>
              
                <tbody>
                  {
                    this.state.usuarios.map(elemento => (
                      <tr key={elemento.id} value={elemento} id={elemento.id}>
                        <td>{elemento.id}</td>
                        <td>{elemento.nombre}</td>
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