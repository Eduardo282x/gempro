// // import Carousel from "react-multi-carousel";
// import carousel1 from '../../assets/img/carousel10.jpg';
// // import carousel2 from '../../assets/img/carousel2.jpg';
// import carousel3 from '../../assets/img/carousel11.jpg';
// // import carousel4 from '../../assets/img/carousel12.jpg';
// // import backrogundCarousel from '../../assets/img/imagesNew.jpg';
// import backrogundCarousel2 from '../../assets/img/imagenNew3.jpg';
// import backrogundCarousel3 from '../../assets/img/imageNew4.jpg';
// import backrogundCarousel5 from '../../assets/img/imageNew5.jpg';
// import { ImageCarousel } from "../imagesCarousel/ImageCarousel";

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

// interface ViewImages {
//     image: string;
//     title: string;
//     text: string;
// }

// const viewsImages: ViewImages[] = [
//     {
//         image: carousel1,
//         title: '!Bienvenidos!',
//         text: 'Prestamos servicio técnico especializado en el área de ingeniería de Mantenimiento Proactivo – Predictivo – Preventivo - Correctivo'
//     },
//     {
//         image: backrogundCarousel2,
//         title: 'Excelencia',
//         text: 'Nuestro personal altamente capacitado, entrenado y certificado internacionalmente por firmas reconocidas, logra reunir más de 60 años de experiencia dominando tecnologías de alto nivel.'
//     },
//     {
//         image: backrogundCarousel3,
//         title: 'Proactivos, Predictivos, Preventivos y Correctivos',
//         text: 'Cuatro ejes que conocemos muy bien y los colocamos a tu entero control, en cualquier momento y desde cualquier lugar del mundo.'
//     },
//     {
//         image: backrogundCarousel5,
//         title: 'Compartir es la clave',
//         text: 'Foros de tecnología dirigidos a diferentes sectores económicos del país, para lograr difundir las nuevas técnicas de mantenimientos empleadas en la actualidad. Somos innovadores, nuestras técnicas exclusivas a la entera disposición de su empresa.'
//     }
// ]

// const images = [
//     carousel1,
//     backrogundCarousel2,
//     carousel3,
//     backrogundCarousel3,
//     backrogundCarousel5
// ]

export const Main = () => {
    return (
        <div className='w-full h-[35rem] bg-white'>
            <div className="w-full">
                {/* <ImageCarousel images={images} width={'100%'} height={'35rem'}>

                </ImageCarousel> */}
            </div>
            {/* <Carousel responsive={responsive} autoPlay transitionDuration={500} infinite arrows={false} className="!h-full text-white">
                {viewsImages && viewsImages.map((sec: ViewImages, index: number) => (
                    <div key={index} className="h-full bg-gray-100">
                        <img src={sec.image} alt="" className="h-full w-full -z-10 object-contain" />
                        <div className="absolute top-0 left-0 flex flex-col px-16 gap-5 items-start justify-between py-20 h-full">
                        </div>
                    </div>
                ))}
            </Carousel> */}
        </div>
    )
}
