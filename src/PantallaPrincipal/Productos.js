import React, { Component } from "react";
import  ProductoItem  from './ProductoItem.js'
import './Productos.css';


export default class Productos extends Component {

    constructor() {
        super();
        this.state = {
            productos: [],
        }
    }    
    render() {
        return (
            <div className='cards__prod'>
                <h1>Nuestros Productos</h1>
                <div className='cards__container__prod'>
                    <div className='cards__wrapper__prod'>                       
                        <ul className='cards__items__prod'>
                            <ProductoItem
                                src='images/1.jpg'
                                title='Limpia Inyectores Diesel'
                                text='Envase de 300ml PRO-LINE diésel system cleaner limpia la cámara de combustión y el sistema de inyección.'                            
                                path='MLU-600172004-limpia-inyectores-diesel-_JM'
                            />
                            <ProductoItem
                                src='images/2.jpg'
                                title='Aditivo Anti-fricción Para Motores'
                                text='Aditivo de aceite, reduce el desgaste del motor en hasta un 50%. Envase de 150ml.'                                
                                path='MLU-600132325-aditivo-anti-friccion-para-motores-_JM'
                            />
                            <ProductoItem
                                src='images/3.jpg'
                                title='Limpia Inyectores Nafta'
                                text='Envase de 300ml Aditivo de alta eficacia para la limpieza y el mantenimiento del circuito de gasolina.'                                
                                path='MLU-600142051-limpia-inyectores-nafta-_JM'
                            />                          
                        </ul>
                        <br/>
                        <ul className='cards__items__prod'>
                            <ProductoItem
                                src='images/4.jpg'
                                title='Aditivo Anti-fricción'
                                text='Envase de 50g Protección anti desgaste para cajas de cambio, diferenciales y transferencia.'                               
                                path='MLU-600142415-aditivo-anti-friccion-para-cajas-y-transferencias-_JM'
                            />
                            <ProductoItem
                                src='images/5.jpg'
                                title='Engine Flush'
                                text='Envase de 300ml Engine flush es un aditivo desarrollado para limpiar internamente el motor y el cárter del vehículo.'                                
                                path='MLU-600073879-engine-flush-_JM'
                            />
                            <ProductoItem
                                src='images/6.jpg'
                                title='Limpiador De Radiador'
                                text='Envase que contiene 300ml Tratamiento para la limpieza interna del sistema de refrigeración.'                                
                                path='MLU-600086032-limpiador-de-radiador-_JM'
                            />                                                                                                       
                        </ul>                      
                    </div>
                </div>
            </div>          
        );
    }
}