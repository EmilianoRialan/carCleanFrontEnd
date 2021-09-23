import React, {  Component } from 'react'
import axios from 'axios'
import * as ReactBoostrap from 'react-bootstrap';
import './Productos.css';
import { url } from '../components/API.js';

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
        axios.get( url+ '/producto/buscarPorId?id=' + this.props.match.params.id).then((resp) => {        
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
            <div className='fondo_detalle'>
                <div class="row">
                    <div class="divimg col-xs-12 col-sm-4">                        
                        <img alt={producto.nombre} class='img' src={'/images/'+producto.imagen}></img>                        
                    </div>
                    <div class="divtext col-xs-12 col-sm-6">
                        <h1>Detalle Producto</h1>
                        <br></br>
                        <h3>{producto.nombre}</h3>
                        <h3>Precio: ${producto.precio} </h3>
                        <h3>Stock: {producto.stock}</h3>
                       <br/>
                        <ReactBoostrap.Button variant="success" a href = {'https://www.mercadolibre.com.uy/'}
                         id="mercadolibre_btn" class="phone whatsapp btnfunnels" rel="nofollow" target="_blank">
                             ¡Lo quiero!</ReactBoostrap.Button>
                        <br/>               
                        <ReactBoostrap.Button variant="success" 
                        a href = {'https://wa.me/59894233233?text=Hola, quiero recibir información de un producto.'} 
                        id="whatsapp_btn" class="phone whatsapp btnfunnels" rel="nofollow" 
                        target="_blank">¡Escríbenos a través de WhatsApp!</ReactBoostrap.Button>
                       
                    </div>
                </div>
            </div>
        );
    }

}