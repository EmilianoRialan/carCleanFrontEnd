export default function AboutUs() {
    return (
        <div>
            <section className="py-10-bg-info">
                <div>
                    <div className="row">
                        <div className="col-md-12 my-auto">
                            <h1>Acerca de Nosotros</h1>
                        </div>
                    </div>
                </div>
            </section>
            <div className="col-md-12 my-auto text-center">
                        <img id='imgAboutUs'
                                alt='AboutUsCarCleanGroup'
                                src='/images/AboutUsCarCleanGroup.jpg'
                                height ='auto'
                                width='100%'
                                ></img>
                        </div>
            <section className="section bg-light border-bottom">
                <div  className="col-md-12 my-auto text-center">
                    <div className="row">
                        <h5>Nuestra Compañia</h5>
                        <div className="underline">'</div>
                        <p>¿Quienes somos?</p>
                        <p >
                            
                            CarClean (Servicio Integral Vehicular) comenzó en mayo del 2018 lavando vehículos
                            a domicilio con la visión e intención de brindar un servicio personalizado y de 
                            calidad, con el correr del tiempo y mucho esfuerzo se logro hacerse del local,
                            herramientas y con ello brindar más servicios.
                            En marzo del 2020 se une a la empresa Federico que ya tenía su taller constituido
                            hace años. Reuniendo juntos más de 30 años de experiencia en el rubro, y así logrando
                            lo que hoy en día es CarClean Group. Un taller multimarca enfocado en brindar siempre 
                            un servicio honesto y dinámico.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );

}