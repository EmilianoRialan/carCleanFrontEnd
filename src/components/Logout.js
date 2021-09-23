import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default class Logout extends Component {
    constructor() {
        super();
        this.state = {
            form: {
                user: "",
                password: "",
            },
            usuario: {},
            logged: null,
            redirect: false,
            perfil: '',            
        }
    }

 
    componentDidMount = () => {        
        localStorage.clear();
    }


    render() {
        return (
            <Redirect to={window.location.href='/PantallaPrincipal'}/>
        );        
    }
}

