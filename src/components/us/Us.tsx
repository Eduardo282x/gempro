// import usImage from '../../assets/img/us.png'
// import us2Image from '../../assets/img/us2.jpg';
import ImageGallery from '../clients/Clients';

import ScrollAnimation from '../scrollAnimation/ScrollAnimation';
import imageCarousel1 from '../../assets/img/carousel8.jpg';
import imageCarousel2 from '../../assets/img/carousel7.jpg';
import video from '../../assets/video/video.mp4';

import image1 from '../../assets/img/clients/image1.jpg'
import image2 from '../../assets/img/clients/image2.jpg';
import image3 from '../../assets/img/clients/image3.jpg';
import image4 from '../../assets/img/clients/image4.jpg';
import image5 from '../../assets/img/clients/image5.jpg';
import image6 from '../../assets/img/clients/image6.jpg';
import image7 from '../../assets/img/clients/image7.jpg';
import image8 from '../../assets/img/clients/image8.jpg';
import image9 from '../../assets/img/clients/image9.jpg';
import image10 from '../../assets/img/clients/image10.jpg';
import image11 from '../../assets/img/clients/image11.jpg';

export const images = [
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
    image9,
    image10,
    image11
];


export const Us = () => {
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
                        </div>
                    </ScrollAnimation>
                </div>
            </div>

            <div className="w-full flex items-center justify-center my-5">
                <video src={video} autoPlay playsInline loop muted className='w-[40rem] rounded-xl'></video>
            </div>

            <h2 className='text-[#062a76] text-3xl font-bold my-4 text-center mt-10'>Clientes</h2>
            <ImageGallery images={images}></ImageGallery>
        </div>
    )
}
