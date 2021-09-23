import React,{Component} from 'react';
import * as ReactBoostrap from 'react-bootstrap';
import axios from 'axios'
import { url } from '../API.js';

export default class ListarPerfil extends Component {

  constructor() {
    super();
    this.state = {
        perfiles: [],
        mensaje: "",
    }
}

  componentDidMount = () => {
    axios.get(url + '/perfil/listarActivos').then((resp) => {
        console.log(resp.data);
        this.setState({
            perfiles: resp.data,              
        });
    }).catch((error) => {
        console.log(error);
    }
    )
};

  render() {
    return (

     
      <div>
        <h1 >Listar Perfiles</h1>
        <div>
          <ReactBoostrap.Table  className="table " hover variant="light-dark">
            <thead>
              <th scope="col">ID</th >
              <th scope="col">Nombre</th>
              <th scope="col">Fecha</th>
              </thead>
              
                <tbody>
                  {
                    this.state.perfiles.map(elemento => (
                      <tr key={elemento.id} value={elemento} id={elemento.id}>
                        <td>{elemento.id}</td>
                        <td>{elemento.nombre}</td>
                        <td>{elemento.fecha.substring(0, [10])}</td>
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