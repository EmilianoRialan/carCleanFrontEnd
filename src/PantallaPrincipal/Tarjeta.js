import React, { Component } from "react";
import './Tarjeta.css';
import  TarjetaItem  from './TarjetaItem.js'

export default class Tarjeta extends Component {

    constructor() {
        super();
        this.state = {
        }
    }

    render() {
        return (
            <div className='cards'>
                <h2 className='h2PP'>Nuestros Servicios</h2>
                <div className='cards__container'>
                    <div className='cards__wrapper'>
                        <ul className='cards__items'>
                            <TarjetaItem
                                src='images/aceite.jpg'
                                text='Agenda tu servicio online. Los unicos disponbles son el basico, mdio y full'
                                label='AGENDA ONLINE'
                                path='/AgendarServicio'
                            />
                            <TarjetaItem
                                src='images/rueda.jpg'
                                text='Ambos son fundamentales para alargar la vida útil de la suspensión, 
                                las llantas de tu vehículo y, lo más importante, para la seguridad de todos.'
                                label='ALINEACIÓN Y BALANCEO'
                                path='/Contactanos'
                            />
                        </ul>
                        <ul className='cards__items'>
                            <TarjetaItem
                                src='images/freno.jpg'
                                text='Reparación o cambio de Discos y pastillas, cilindros, mordazas, 
                                bomba de frenos, cintas y campanas, freno de mano y cables de mando, válvulas compensadoras.'
                                label='FRENOS'
                                path='/Contactanos'
                            />
                            <TarjetaItem
                                src='images/aire.jpg'
                                text='
                                Recarga de gas refrigerante, Limpieza y servicio de mantenimiento preventivo,
                                 Reparación del sistema de enfriamiento y de sensores de temperatura'
                                label='AIRE ACONDICIONADO'
                                path='/Contactanos'
                            />
                            <TarjetaItem
                                src='images/limpieza.jpg'
                                text='Los inyectores son los encargados de llevar el combustible para que se mezcle con
                                 el aire por lo que tienen un alto desgaste y acumulan suciedad'
                                label='LIMPIEZA DE INYECTORES'
                                path='/Contactanos'
                            />
                        </ul>
                    </div>
                </div>
            </div>
        );

    }
}