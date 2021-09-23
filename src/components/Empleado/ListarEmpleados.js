import React,{Component} from 'react';
import * as ReactBoostrap from 'react-bootstrap';
import axios from 'axios'
import { url } from '../API.js';
import dateFormat from 'dateformat'

export default class ListarEmpleados extends Component {

  constructor() {
    super();
    this.state = {
        empleados: [],
        mensaje: "",
        fechaVacia: "VACIA",
    }
}

  componentDidMount = () => {
    axios.get(url + '/empleado/listarActivos').then((resp) => {
        console.log(resp.data);
        this.setState({
            empleados: resp.data,              
        });
    }).catch((error) => {
        console.log(error);
    }
    )
};

  render() {
    return (

     
      <div>
        <h1 >Listar Empleados</h1>
        <div>
          <ReactBoostrap.Table  className="table " hover variant="light-dark">
            <thead>
              <th scope="col">ID</th >
              <th scope="col">Nombre</th>
              <th scope="col">Direccion</th>
              <th scope="col">Email</th>
              <th scope="col">Fecha Ingreso</th>
              <th scope="col">Telefono</th>
              </thead>
              
                <tbody>
                  {
                    this.state.empleados.map(elemento => (
                      <tr key={elemento.id} value={elemento} id={elemento.id}>
                        <td>{elemento.id}</td>
                        <td>{elemento.nombre}</td>
                        <td>{elemento.direccion}</td>
                        <td>{elemento.email}</td>

                        <td>{elemento.fechaIngreso !== null ? 
                        dateFormat(elemento.fechaIngreso.substring(0, [10]), 'dddd, mmmmm, yyyy') : this.state.fechaVacia}</td>
                        <td>{elemento.telefono}</td>
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