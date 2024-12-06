import usImage from '../../assets/img/us.png'
import us2Image from '../../assets/img/us2.jpg';
import ImageGallery from '../clients/Clients';
import ScrollAnimation from '../scrollAnimation/ScrollAnimation';

export const Us = () => {
    return (
        <div className='p-8'>
            <div className="flex flex-wrap items-center justify-between ">

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

                <div className='w-full lg:w-[48%]  '>
                    <ScrollAnimation>
                        <div className='flex flex-col items-center justify-center gap-5 h-[25rem]'>
                            <img src={usImage} alt="" className='w-full h-1/2' />
                            <img src={us2Image} alt="" className='w-full h-1/2' />
                        </div>
                    </ScrollAnimation>
                </div>
            </div>

            <h2 className='text-[#062a76] text-3xl font-bold my-4 text-center mt-10'>Clientes</h2>
            <ImageGallery></ImageGallery>
        </div>
    )
}
