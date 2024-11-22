import Carousel from "react-multi-carousel";
import carousel1 from '../../assets/img/carousel1.jpg';
import carousel2 from '../../assets/img/carousel2.jpg';
import carousel3 from '../../assets/img/carousel3.jpg';
import carousel4 from '../../assets/img/carousel4.jpg';

export const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 1
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};

export const Main = () => {
    return (
        <div className='w-full h-[35rem] bg-gray-200'>
            <Carousel responsive={responsive} autoPlay infinite className="!h-full text-white">
                <div className="h-full">
                    <img src={carousel1} alt="" className="h-full w-full" />
                    <div className="absolute bottom-20 w-1/2 text-wrap left-0 right-0 mx-auto">
                        <h3 className="text-4xl">Bienvenido</h3>
                        <p className="text-2xl">Prestamos servicio técnico especializado en el área de ingeniería de Mantenimiento Proactivo – Predictivo – Preventivo - Correctivo</p>
                    </div>
                </div>
                <div className="h-full">
                    <img src={carousel2} alt="" className="h-full w-full" />
                    <div className="absolute bottom-20 w-1/2 text-wrap left-0 right-0 mx-auto">
                        <h3 className="text-4xl">Excelencia</h3>
                        <p className="text-2xl">Nuestro personal altamente capacitado, entrenado y certificado
                            internacionalmente por firmas reconocidas, logra reunir más
                            de 60 años de experiencia dominando tecnologías de alto nivel.</p>
                    </div>
                </div>
                <div className="h-full">
                    <img src={carousel3} alt="" className="h-full w-full" />
                    <div className="absolute bottom-20 w-1/2 text-wrap left-0 right-0 mx-auto">
                        <h3 className="text-4xl">Proactivos, Predictivos, Preventivos y Correctivos</h3>
                        <p className="text-2xl">Cuatro ejes que conocemos muy bien y los colocamos a tu entero control, en cualquier momento y desde cualquier lugar del mundo.</p>
                    </div>
                </div>
                <div className="h-full">
                    <img src={carousel4} alt="" className="h-full w-full" />
                    <div className="absolute bottom-20 w-1/2 text-wrap left-0 right-0 mx-auto">
                        <h3 className="text-4xl">Compartir es la clave</h3>
                        <p className="text-2xl">Foros de tecnología dirigidos a diferentes sectores económicos del país, para lograr difundir las nuevas técnicas de mantenimientos empleadas en la actualidad.
                            Somos innovadores, nuestras técnicas exclusivas a la entera disposición de su empresa.</p>
                    </div>
                </div>
            </Carousel>;
        </div>
    )
}
