import React from 'react';
import emailjs from 'emailjs-com';
import './ContactanosServicio.css';
import * as ReactBoostrap from 'react-bootstrap';


export default function ContactanosServicio() {

  function sendEmail(e) {
    e.preventDefault();

    emailjs.sendForm('service_l1mohhg', 'template_1m38xcm', e.target, 'user_FEflHPV5Xj6pMjp0WNdqh')
      .then((result) => {
          console.log(result.text);
          alert("Ingreso Correcto","Ok");
      }, (error) => {
          console.log(error.text);
          alert("Ingreso Incorrecto","Error");
      });
  }

  return (
    <div>
      <br></br>
    <form className="contact-form" onSubmit={sendEmail}>
    <br></br>
        <input type="text" name="name" placeholder="Ingrese su nombre" required/>
        <br></br>
        <input type="email" name="email" placeholder="Ingrese su email" required/>
        <br></br>
        <input type="text" name="subject" placeholder="Ingrese el asunto" required/>
        <br></br>
        <textarea name="message" placeholder="Ingrese el mensaje" required/>
        <br></br>
        <ReactBoostrap.Button variant="success" type="submit">Enviar</ReactBoostrap.Button>
    </form>
    </div>
  );
  
}

