import React, {  Component } from 'react'
import axios from 'axios'
import * as ReactBoostrap from 'react-bootstrap';
//import './Productos.css';
import { url } from '../API.js';


export default class ProductoDetalle extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            producto: '',            
            nombre:'', 
            proveedor:'',
            imagen:'', 
        }
    }

    manejadorOnChange = e =>
    {
        this.setState({[e.target.name]: e.target.value })
    }

    componentDidMount = () => {
        console.log("Este es el id del producto: " + this.props.match.params.id)
        axios.get(url + '/producto/buscarPorId?id=' + this.props.match.params.id).then((resp) => {        
            console.log(resp.data)            
            this.setState({
                producto: resp.data,
                proveedor:resp.data.proveedor 
            });
        }).catch((error) => {
            console.log(error);
        }
        )
    };

    render() {
        const {producto} = this.state
        return (
            <div className='cards__prod'>
                <div className="row">
                    <div className="col-xs-12 col-sm-3">
                            <img src={'/images/'+producto.imagen}></img>
                    </div>
                    <div className="col-xs-12 col-sm-9">
                        <h1>Detalle Producto</h1>
                        
                        <h3>{producto.nombre}</h3>
                        <h3>Precio: {producto.precio} $</h3>
                        <h3>Stock: {producto.stock}</h3>
                        <br></br><br></br>
                        <ReactBoostrap.Button variant="success" a href = {'https://www.mercadolibre.com.uy/'} id="mercadolibre_btn" class="phone whatsapp btnfunnels" rel="nofollow" target="_blank">¡Lo quiero!</ReactBoostrap.Button>
                        <br></br><br></br>
                        <ReactBoostrap.Button variant="success" a href = {'https://articulo.mercadolibre.com.uy/MLU-474638480-liqui-moly-motorbike-limpiador-de-visera-100ml-_JM#position=1&search_layout=stack&type=item&tracking_id=ab584a07-0f11-49c1-91ce-fb642c2bf74f'} id="mercadolibre_btn" class="phone whatsapp btnfunnels" rel="nofollow" target="_blank">¡Lo quiero!</ReactBoostrap.Button>
                        <br></br><br></br>
                        <ReactBoostrap.Button variant="success" a href = {'https://wa.me/59899864871?text=Hola, quiero recibir información de un producto.'} id="whatsapp_btn" class="phone whatsapp btnfunnels" rel="nofollow" target="_blank">¡Escríbenos a través de WhatsApp!</ReactBoostrap.Button>
                        <br></br><br></br>
                    </div>
                </div>
            </div>
        );
    }

}
