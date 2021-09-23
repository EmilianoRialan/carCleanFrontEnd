import React,{Component} from 'react';
import * as ReactBoostrap from 'react-bootstrap';
import axios from 'axios'
import { url } from '../API.js';

export default class ListarEstado extends Component {

  constructor() {
    super();
    this.state = {
        estados: [],
    }
}

  componentDidMount = () => {
    axios.get(url + '/estado/listarActivos').then((resp) => {
        console.log(resp.data);
        this.setState({
            estados: resp.data,              
        });
    }).catch((error) => {
        console.log(error);
    }
    )
};
  render() {
    return (
      <div>
        <h1 >Listar Estados</h1>
        <div>
          <ReactBoostrap.Table  hover variant="light-dark">
            <table className="table ">
                <thead>
                    <th scope="col">ID</th >
                    <th scope="col">Nombre</th>
                </thead>
                <tbody>
                {
                    this.state.estados.map(elemento => (
                        <tr key={elemento.id} value={elemento} id={elemento.id}>
                            <td>{elemento.id}</td>
                            <td>{elemento.nombre}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
          </ReactBoostrap.Table>
        </div>
      </div>
    );

  }
}