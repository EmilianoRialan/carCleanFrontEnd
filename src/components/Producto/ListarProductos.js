import React,{Component} from 'react';
import * as ReactBoostrap from 'react-bootstrap';
import axios from 'axios'
import { url } from '../API.js';



export default class ListarProductos extends Component {

  constructor() {
    super();
    this.state = {
        productos: [],
        searchTerm: "",
      }
  }

  componentDidMount = () => {
    axios.get(url + '/producto/listarActivos').then((resp) => {
        console.log(resp.data);
        this.setState({
            productos: resp.data,              
        });
    }).catch((error) => {
        console.log(error);
    }
    )
  };

  manejadorOnChange = e =>{
    this.setState({
      searchTerm:e.target.value,
    })
  }

  render() {
      return(
        <div className="App">
          <h1>Listado Productos</h1>
          <input type="text" placeholder="Buscar por nombre" onChange={this.manejadorOnChange}/>
          <ReactBoostrap.Table  hover variant="light-dark">
                <table className="table">
                  <thead>                   
                    <th scope="col">Nombre</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Cantidad de stock</th>
                    <th scope="col">Proveedor</th>
                    <th scope="col">Link</th>
                  </thead>
                  <tbody>
                  {this.state.productos.filter(elemento => 
                    elemento.nombre.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
                    .map(e=>(
                      <tr key={e.id} value={e} id={e.id}>                      
                      <td>{e.nombre}</td>
                      <td>{e.precio}</td>
                      <td>{e.stock}</td>
                      <td>{e.proveedor.nombre}</td> 
                      <td><a variant="success" className='btn__suc' rel="nofollow" 
                          href={'https://articulo.mercadolibre.com.uy/'+ e.link}>Link</a></td> 
                    </tr>
                        )
                        )
                  }
                  </tbody>
              </table>
              </ReactBoostrap.Table>
        </div>
    )

}



}