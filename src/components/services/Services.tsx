import { correctivos, IServices, mainServices, predictive, preventivos, proactivo, responsiveServices } from './services.data'
import { Card } from '../card/Card'
import Carousel from 'react-multi-carousel'
import ScrollAnimation from '../scrollAnimation/ScrollAnimation'

import video from '../../assets/video/video2.mp4';

import carousel1 from '../../assets/img/carousel10.jpg';
import carousel11 from '../../assets/img/carousel11.jpg';
import carousel2 from '../../assets/img/carousel2.jpg';
import carousel3 from '../../assets/img/carousel3.jpg';
import carousel4 from '../../assets/img/carousel4.jpg';
import carousel6 from '../../assets/img/carousel6.jpg';
import carousel9 from '../../assets/img/carousel9.jpg';
import carousel13 from '../../assets/img/imagenNew3.jpg';
import carousel14 from '../../assets/img/imageNew4.jpg';
import carousel15 from '../../assets/img/imageNew5.jpg';
import carousel16 from '../../assets/img/imagenNew7.jpg';
import carousel17 from '../../assets/img/imageNew8.jpg';
import carousel18 from '../../assets/img/imageNew9.jpeg';
import ImageGallery from '../clients/Clients';

export const Services = () => {

    const images = [
        carousel1,
        carousel2,
        carousel3,
        carousel4,
        carousel6,
        carousel9,
        carousel11,
        carousel13,
        carousel14,
        carousel15,
        carousel16,
        carousel17,
        carousel18
    ];

    return (
        <div className='p-8 bg-gray-200'>
            <ScrollAnimation>
                <h2 className='text-[#062a76] text-3xl font-bold mb-4'>Nuestro Servicios</h2>
                <div className="">
                    <Carousel responsive={responsiveServices} autoPlay infinite className="!h-full text-white gap-5">
                        {mainServices && mainServices.map((service: IServices, index: number) => (
                            <Card key={index} name={service.title} description={service.description} image={service.image}></Card>
                        ))}
                    </Carousel>
                </div>
            </ScrollAnimation>

            <ScrollAnimation>
                <h2 className='text-[#062a76] text-3xl font-bold my-4'>Somos Predictivos</h2>
                <div className="">
                    <Carousel responsive={responsiveServices} autoPlay className="!h-full text-white gap-5">
                        {predictive && predictive.map((service: IServices, index: number) => (
                            <Card key={index} name={service.title} description={service.description} image={service.image}></Card>
                        ))}
                    </Carousel>
                </div>
            </ScrollAnimation>

            <ScrollAnimation>
                <h2 className='text-[#062a76] text-3xl font-bold my-4'>Somos Preventivos</h2>
                <div className="flex flex-col md:flex-row items-center justify-between w-full gap-5">
                    {/* <Carousel responsive={responsiveServices} autoPlay className="!h-full text-white gap-5">
                    </Carousel> */}
                    {preventivos && preventivos.map((service: IServices, index: number) => (
                        <Card key={index} name={service.title} description={service.description} image={service.image}></Card>
                    ))}

                    <div className="flex items-center justify-center p-2 bg-white rounded-md md:w-[300rem]">
                        <video src={video} muted autoPlay playsInline loop></video>
                    </div>
                </div>
            </ScrollAnimation>

            <ScrollAnimation>
                <h2 className='text-[#062a76] text-3xl font-bold my-4'>Somos Correctivos</h2>
                <div className="">
                    <Carousel responsive={responsiveServices} autoPlay className="!h-full text-white gap-5">
                        {correctivos && correctivos.map((service: IServices, index: number) => (
                            <Card key={index} name={service.title} description={service.description} image={service.image}></Card>
                        ))}
                    </Carousel>
                </div>
            </ScrollAnimation>

            <ScrollAnimation>
                <h2 className='text-[#062a76] text-3xl font-bold my-4'>Somos Proactivos</h2>
                <div className="">
                    <Carousel responsive={responsiveServices} autoPlay className="!h-full text-white gap-5">
                        {proactivo && proactivo.map((service: IServices, index: number) => (
                            <Card key={index} name={service.title} description={service.description} image={service.image}></Card>
                        ))}
                    </Carousel>
                </div>
            </ScrollAnimation>

            <ScrollAnimation>
                <div className="w-full flex items-center justify-center gap-5 h-40 overflow-hidden">
                    <ImageGallery images={images} width={'100%'} height={'10rem'}></ImageGallery>
                </div>
            </ScrollAnimation>
        </div>
    )
}
