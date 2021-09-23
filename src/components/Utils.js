import  { Component } from 'react'

export default class Utils extends Component{

    constructor() {
        super();
        this.state = {
       

        }
    }
       
     soloNumeros(numero) {
         console.log(numero)
        const regex = /^[0-9]*$/;
        const soloNumeros = regex.test(numero);
        if (!soloNumeros) {
            return "Debe ingresar solo números!";
        } else {
            return
        }
    }
       validarDigitoVerificador  (cedula) {
        var a = 0;
        var i = 0;
        if (cedula.length <= 6) {
            for (i = cedula.length; i < 7; i++) {
                cedula = '0' + cedula
            }
        }
        for (i = 0; i < 7; i++) {
            a += (parseInt("2987634"[i]) * parseInt(cedula[i])) % 10;
        }
        if(a%10===0){
            return 0;
        }else{
            return 10 - a % 10;
        }
    }

       validarCedula(cedula){
        cedula = this.cleanCedula(cedula);
        var dig = cedula[cedula.length - 1];
        cedula = cedula.replace(/[0-9]$/, '');
        return (dig === this.validarCedula(cedula));
    }
     cleanCedula(cedula){
        return cedula.replace(/\D/g, '');
    }
}