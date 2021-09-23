import React from 'react';
function ProductoItem(props) {
  return (
    <>
      <li className='cards__item__prod'>
        <div className='cards__item__link__prod'>
        <h3 className='cards__item__title__prod'>{props.title}</h3>
          <figure className='cards__item__pic-wrap__prod'>
            <img
              className='cards__item__img__prod'
              alt='Producto'
              src={props.src}
            />
          </figure>
          <div className='cards__item__info__prod'>            
            <h5 className='cards__item__text__prod'>{props.text}</h5>
            <div className='cards__item__button__prod'>
              <a rel="nofollow"  href={'https://articulo.mercadolibre.com.uy/' + props.path}  className='btn__prod'>Ver producto</a>
              <a href={'/Contactanos'} className='btn__prod'>Contactanos</a>
            </div>
          </div>
        </div>
      </li>
    </>
  );
}

export default ProductoItem;