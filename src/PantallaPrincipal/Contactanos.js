import React from 'react';
import emailjs from 'emailjs-com';
import * as ReactBoostrap from 'react-bootstrap';

export default function Contactanos() {

  function sendEmail(e) {
    e.preventDefault();

    emailjs.sendForm('service_l1mohhg', 'template_1m38xcm', e.target, 'user_FEflHPV5Xj6pMjp0WNdqh')
      .then((result) => {
        console.log(result.text);
        alert("Ingreso Correcto", "Ok");
        document.getElementById("name").alert = "OK"
      }, (error) => {
        console.log(error.text);
        alert("Ingreso Incorrecto", "Error");
      });
  }

  return (
    <div > <ReactBoostrap.Button variant="success" 
    a href = {'https://wa.me/59894233233?text=Hola, quiero contactarme con la empresa'} 
    id="whatsapp_btn" class="phone whatsapp btnfunnels" rel="nofollow" 
    target="_blank">¡Escríbenos a través de WhatsApp!</ReactBoostrap.Button>
      <h1>Contactate con nosotros</h1>
      <form className="contact-form" onSubmit={sendEmail}>
        <input type="text" id="name" name="name" placeholder="Ingrese su nombre" required />
        
        <input type="text" name="email" placeholder="Ingrese su mail" required />
      
        <input type="text" name="subject" placeholder="Ingrese el asunto" required />
      
        <textarea name="message" placeholder=" Ingrese el mensaje" required cols="50" rows="15" />
      <br/>
        <ReactBoostrap.Button variant="success" type="submit">Enviar</ReactBoostrap.Button>
      </form>
      
    </div>
  );

}