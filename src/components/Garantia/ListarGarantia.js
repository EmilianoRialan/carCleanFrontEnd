import React,{Component} from 'react';
import * as ReactBoostrap from 'react-bootstrap';
import axios from 'axios'
import { url } from '../API.js';

export default class ListarGarantia extends Component {

  constructor() {
    super();
    this.state = {
        garantias: [],
    }
}

  componentDidMount = () => {
    axios.get(url + '/garantia/listarActivos').then((resp) => {
        console.log(resp.data);
        this.setState({
            garantias: resp.data,              
        });
    }).catch((error) => {
        console.log(error);
    }
    )
};
  render() {
    return (
      <div>
        <h1 >Listar Garantías</h1>
        <div>
          <ReactBoostrap.Table  hover variant="light-dark">
            <table className="table">
                <thead>
                    <th scope="col">ID</th >
                    <th scope="col">Garantía</th>
                </thead>
                <tbody>
                {
                    
                    this.state.garantias.map(elemento => (
                        <tr key={elemento.id} value={elemento} id={elemento.id}>
                            <td>{elemento.id}</td>
                            <td>{elemento.cantidadMeses} mes/es</td>
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