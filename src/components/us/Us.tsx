// import usImage from '../../assets/img/us.png'
// import us2Image from '../../assets/img/us2.jpg';
import ImageGallery from '../clients/Clients';
// import { ImageCarousel } from '../imagesCarousel/ImageCarousel';
import ScrollAnimation from '../scrollAnimation/ScrollAnimation';
import imageCarousel1 from '../../assets/img/carousel8.jpg';
import imageCarousel2 from '../../assets/img/carousel7.jpg';

export const Us = () => {
    // const images = [imageCarousel1, imageCarousel2];
    return (
        <div className='p-8'>
            <div className="flex flex-wrap items-center justify-between h-full ">

                <div className='w-full lg:w-[48%] text-gray-700 text-justify'>
                    <ScrollAnimation>
                        <h2 className='text-[#062a76] text-3xl font-bold mb-4'>Nosotros</h2>
                        <p>Somos una organización que presta sus servicios en el area de Ingeniería de Mantenimiento Proactivo, Predictivo, Preventivo y Correctivo. Contamos con la capacidad técnica para acompañarle en este camino como proveedor estratégico en las areas de Servicios, Suministro de Tecnología y Capacitación de su personal, en uno de los pilares de la gestión de Activos como lo es la aplicación de técnicas predictivas para conocer el estado de sus activos y mediante técnicas proactivas brindar soluciones a problemas de alto impacto en tu organización.</p>
                    </ScrollAnimation>

                    <br />

                    <ScrollAnimation>
                        <h2 className='text-[#062a76] text-3xl font-bold mb-4'>Misión</h2>
                        <p>- Proveer el servicio técnico especializado, que permita a nuestros clientes optimizar su gestión a nivel de calidad mundial.</p>
                        <br />
                        <p>- Proveer las tecnologías para la implantación de programas de mantenimiento industrial.</p>
                        <br />
                        <p>- Proveer la estrategia y el adiestramiento profesional a nuestros clientes para lograr las transferencias de tecnologías de gestión de activos en mantenimiento.
                        </p>
                    </ScrollAnimation>

                    <br />

                    <ScrollAnimation>
                        <h2 className='text-[#062a76] text-3xl font-bold mb-4'>Visión</h2>
                        <p>El Mantenimiento Predictivo es una gran herramienta de diagnostico, pero es solamente una parte de la solución. Si pretendemos un Mantenimiento EFICIENTE, debemos hacer una integración de varias actividades, que en definitiva, se resumen en una metodología; Ingeniera de Mantenimiento.</p>

                    </ScrollAnimation>
                </div>

                <div className='w-full lg:w-[48%] h-full '>
                    <ScrollAnimation>
                        <div className='flex items-center justify-center gap-5 h-[40%] mt-5 md:mt-0'>
                            <div className=' rounded-xl overflow-hidden w-1/2 md:h-[35rem]'>
                                <img src={imageCarousel1} alt="" className='' />
                            </div>

                            <div className=' rounded-xl overflow-hidden w-1/2 md:h-[35rem]'>
                                <img src={imageCarousel2} alt="" className='' />
                            </div>
                            {/* <ImageCarousel images={images} width="25rem" height="38rem" /> */}
                        </div>
                    </ScrollAnimation>
                </div>
            </div>

            <h2 className='text-[#062a76] text-3xl font-bold my-4 text-center mt-10'>Clientes</h2>
            <ImageGallery></ImageGallery>
        </div>
    )
}
