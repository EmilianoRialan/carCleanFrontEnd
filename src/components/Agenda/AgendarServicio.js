import React, { Component } from 'react';
import * as ReactBoostrap from 'react-bootstrap';
import axios from 'axios'
import { url } from '../API.js';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { Redirect } from "react-router-dom";



export default class AgendarServicio extends Component {

    constructor(props) {
        super(props);
        this.state = {
            descripcion:"",
            servicioParaLasTareas:[],
            diaElegido: '',
            servicios: [],
            servicioElegido: "",
            mensaje: "",
            idCli: 0,
            serviciosFull: [],
            serviciosMedios: [],
            serviciosBasicos: [],
            selectedDay: "",
            serviciosAgendados: [],
            fechasConvertidas: {},
            idSer: (-1),
            mensajeError: "",
            mensajeSuccess: "",
            horas: [],
            horarios: [
                { hora: "9 hrs" },
                { hora: "10 hrs" },
                { hora: "11 hrs" },
                { hora: "12 hrs" },
                { hora: "14 hrs" },
                { hora: "15 hrs" },
                { hora: "16 hrs" },
                { hora: "17 hrs" },
            ],
            horarioElegido: "",
            servicioDia: [],
            errors: {},
        }
    }

    componentWillUnmount() {

        clearInterval(this.timer);
    }
    limpiar() {
        this.timer = setInterval(() => {
            window.location.reload(1);        
        }
            , 2000);
    }

    handleValidation() {

        let errors = {};
        let formIsValid = true;

        //idSer
        if (this.state.idSer === -1) {
            formIsValid = false;
            errors["idSer"] = "Debe ingresar el servicio que desea agendar";
        }

        //fechaElegida
        if (this.state.selectedDay === "") {
            formIsValid = false;
            errors["fechaElegida"] = "Debe ingresar la fecha en la que desea agendarse";
        }

        //horarioElegido
        if (this.state.horarioElegido === "") {
            formIsValid = false;
            errors["horarioElegido"] = "Debe ingresar el horario en el que desea agendarse";
        }

        this.setState({ errors: errors });
        return formIsValid;
    }

    manejadorBoton = (e) => {
        e.preventDefault(); 
        if (this.handleValidation()) {
            axios.post(url + '/servicioAgendado/insertar?idSer=' + this.state.idSer +
             "&idUsu=" + localStorage.getItem('usuario')
                + "&fechaElegida=" + this.state.selectedDay.toLocaleDateString() +
                 "&horarioElegido=" + this.state.horarioElegido)
                .then(response => {
                    console.log("entre al 200");
                    if (response.status >= 200 && response.status <= 205) {
                        this.setState({
                            mensaje: response.data,
                            mensajeSuccess: "ok",                     
                        });
                    }
                }).catch(error => {
                    this.setState({
                        mensaje: error.response.data,
                        mensajeError: "error"
                    });
                })
                this.limpiar();
        }
    }

    componentDidMount = () => {
        axios.get(url + '/servicio/listarActivos').then((resp) => {
            this.setState({
                servicios: resp.data,
            });
        }).catch((error) => {
            console.log(error);
        }
        )
        axios.get(url + '/servicioAgendado/listarActivos').then((resp) => {
            this.setState({
                serviciosAgendados: resp.data,
            });
        }).catch((error) => {
            console.log(error);
        }
        )
        axios.get(url + '/servicioAgendado/listarAgenda?num=3').then((resp) => {
            this.setState({
                serviciosFull: resp.data,
            });
        }).catch((error) => {
            console.log(error);
        })
        this.cargarFecha()
    };




    cargarFecha = () => {
        const today = new Date();
        const fechasAntes = [{ before: today }];
        const fechas = fechasAntes;
        this.state.serviciosFull.forEach(e => {
            fechas.push(new Date(e))
        });
        this.setState({
            fechasConvertidas: fechas,
        })
    }

    handleChange = event => {
        this.setState({
            idSer: event.target.value,
        });
        this.buscarServicio(event.target.value);
        
    }
    concatenarStringDescripcion  (resp){
    let tarea = "";
    console.log("concatenar")
    console.log(resp)
    console.log("concatenar")
    console.log(this.state.servicioParaLasTareas);
    resp.tareas.map(t => (
       
       tarea += (t.nombre +", ") 
       )
       )
       this.setState({
        descripcion: tarea,
    });
    }

    buscarServicio(servicioId){
        console.log(servicioId)
        if(servicioId>=0){
        axios.get(url + '/servicio/buscarPorId?id=' + servicioId).then((resp) => {
            console.log(resp.data);
            this.setState({
                servicioParaLasTareas: resp.data,
            });
            this.concatenarStringDescripcion(resp.data);
        }).catch((error) => {
            console.log(error);
        }
        )
    }else{
        console.log("error");
    }
    }
    changeHorario = event => {
        this.setState({
            horarioElegido: event.target.value,
        });
    }

    handleDayClick = (day, { selected, disabled }) => {
        if (disabled) {
            return;
        }
        if (selected) {
            this.setState({ selectedDay: undefined });
            return;
        } else {
            this.setState({
                selectedDay: day,
            });
            this.llamarDia(day);
        }

    }

    llamarDia = (day) => {
        axios.get(url + '/servicioAgendado/llamarServicioDia?dia=' + day.toLocaleDateString()).then((resp) => {
            this.setState({
                servicioDia: resp.data,
            });
            this.borrarHoras(resp.data);
        }).catch((error) => {
            console.log(error);
        }
        )
    }

    borrarHoras = (servicioDia) => {
        let array = this.state.horarios;
        let idServicio = this.state.idSer;
        if (idServicio === '3') {
            array = [{ hora: '9 hrs' }]
        } else if (idServicio === '2') {
            array = [
                { hora: "9 hrs" },
                { hora: "10 hrs" },
                { hora: "11 hrs" },
                { hora: "12 hrs" },
                { hora: "14 hrs" }];
        }
        servicioDia.forEach(e => {
            if (e.servicioId === 1) {
                let h = e.horaElegida;
                array = array.filter(element => element.hora !== h);
            } else if (e.servicioId === 2) {
                let hr = e.horaElegida;
                let number = hr.match(/\d+/)[0]
                let n = Number(number);
                let hr1 = n + 1 + ' hrs';
                let hr2 = n + 2 + ' hrs';
                let hr3 = n + 3 + ' hrs';
                array = array.filter(element => element.hora !== hr);
                array = array.filter(element => element.hora !== hr1);
                array = array.filter(element => element.hora !== hr2);
                array = array.filter(element => element.hora !== hr3);
                if (n >= 10 && n <= 12) {
                    let neg1 = n - 1 + ' hrs';
                    let neg2 = n - 2 + ' hrs';
                    let neg3 = n - 3 + ' hrs';
                    array = array.filter(element => element.hora !== neg1);
                    array = array.filter(element => element.hora !== neg2);
                    array = array.filter(element => element.hora !== neg3);
                }
            }
            if (servicioDia.length >= 1) {
                if (idServicio === '2') {
                    let hr = e.horaElegida;// '11 hrs'
                    let number = hr.match(/\d+/)[0] //'11'
                    let n = Number(number); // 11 int
                    let neg1 = n - 1 + ' hrs'; // let neg1 = 11 - 1 
                    let neg2 = n - 2 + ' hrs';
                    let neg3 = n - 3 + ' hrs';
                    array = array.filter(element => element.hora !== neg1);
                    array = array.filter(element => element.hora !== neg2);
                    array = array.filter(element => element.hora !== neg3);
                }
            }
        });
        this.setState({
            horas: array,
        })
    }

    render() {
        if (localStorage.getItem('usuario') === null) {
            return <Redirect to={window.location.href = '/Login'} />
        } else
            //var holydays = [new Date('08/22/2021'), new Date('08/25/2021'), new Date('08/29/2021')];       
            return (
                <div>
                    <h1>Agende su servicio</h1>
                    <div className="container">
                        <label id="labeles" className="lead" >Agende su servicio</label>
                        <span style={{ color: "red" }}>{this.state.errors["idSer"]}</span>
                        <div className="">
                            <select
                                id='idSer'
                                name='idSer'
                                onChange={this.handleChange}
                                className="form-control"
                                placeholderText="Servicios">
                                <option disabled selected >Eliga un servicio</option>
                                {
                                this.state.servicios.map(servicioElegido => (
                                    <option
                                        key={servicioElegido}
                                        name="servicio"
                                        value={servicioElegido.id}
                                        selectedValue={servicioElegido}
                                    >{servicioElegido.nombre}</option>
                                )
                                )
                                
                                }
                                </select>

<label>
{this.state.descripcion

    }

</label>
                            <br />
                            <form onSubmit={this.submit}>
                                <br />
                                <span style={{ color: "red" }}>{this.state.errors["fechaElegida"]}</span>
                                <div>
                                    <DayPicker
                                        id='fechaElegida'
                                        name='fechaElegida'
                                        onDayClick={this.handleDayClick}
                                        selectedDays={this.state.selectedDay}
                                        disabledDays={this.state.fechasConvertidas}
                                    />
                                    {this.state.selectedDay ? (
                                        <p>{this.state.selectedDay.toLocaleDateString()}</p>
                                    ) : (
                                        <p>Elija un día.</p>
                                    )}
                                </div>
                                <br />
                                <label id="labeles" className="lead" >Ingrese su horario</label>
                                <span style={{ color: "red" }}>{this.state.errors["horarioElegido"]}</span>
                                <select onChange={this.changeHorario}
                                    id='horarioElegido'
                                    name='horarioElegido'
                                    className="form-control"
                                    placeholderText="Horarios">
                                    <option disabled selected >Eliga un horario</option>
                                    {this.state.horas.map(horario => (
                                        <option
                                            key={horario}
                                            name="horario"
                                            value={horario.hora}
                                            selectedValue={horario}
                                        >{horario.hora}</option>
                                    ))}
                                </select>
                                <br />
                                <ReactBoostrap.Button type="submit" variant="success" className="fadeIn fourth" value="Crear Servicio"
                                    onClick={this.manejadorBoton}>Agendar Servicio</ReactBoostrap.Button >
                            </form>

                            {this.state.mensajeSuccess === "ok" ?
                                <div class="alert alert-success" role="alert">
                                    {this.state.mensaje}
                                </div> : (this.state.mensajeError === "error") ?
                                    <div class="alert alert-danger" role="alert">
                                        {this.state.mensaje}
                                    </div> : null
                            }
                        </div>
                    </div>
                </div>
            );
    }
}