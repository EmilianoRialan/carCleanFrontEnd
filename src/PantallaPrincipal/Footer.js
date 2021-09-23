import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer-container'>
      <section className='footer-subscription'>
        <p className='footer-subscription-heading'>          
          Unete a nuestros clientes y disfruta de un mantenimiento completo y seguro.
        </p>
      </section>
      <div class='footer-links'>
        <div className='footer-link-wrapper'>
          <div class='footer-link-items'>
            <h2>Acerca de Nosotros</h2>
            <Link to='/AboutUs'>¿Quienes somos?</Link>            
          </div>
          <div class='footer-link-items'>
            <h2>Contacto</h2>
            <Link to='/Contactanos'>Contactanos</Link> 
            
          </div>
        </div>
        <div className='footer-link-wrapper'>          
          <div class='footer-link-items'>
            <h2>Social Media</h2>
            <a href={'https://www.instagram.com/carclean_montevideo'}>Instagram</a>
            <a href={'https://www.facebook.com/pages/category/Cars/Carclean_montevideo-1497142830410416/'}>Facebook</a>                 
          </div>
        </div>
      </div>
      <section class='social-media'>
        <div class='social-media-wrap'>
          <div class='footer-logo'>
            <Link to='/' className='social-logo'>
              CarClean
              <i class='fab fa-typo3' />
            </Link>
          </div>
          <small class='website-rights'>CarClean © 2021</small>         
        </div>
      </section>
    </div>
  );
}

export default Footer;