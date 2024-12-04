import { correctivos, IServices, mainServices, predictive, preventivos, proactivo, responsiveServices } from './services.data'
import { Card } from '../card/Card'
import Carousel from 'react-multi-carousel'

export const Services = () => {
    return (
        <div className='p-8 bg-gray-200'>
            <h2 className='text-[#062a76] text-3xl font-bold mb-4'>Nuestro Servicios</h2>
            <div className="">
                <Carousel responsive={responsiveServices} autoPlay className="!h-full text-white gap-5">
                    {mainServices && mainServices.map((service: IServices, index: number) => (
                        <Card key={index} name={service.title} description={service.description}></Card>
                    ))}
                </Carousel>
            </div>

            <h2 className='text-[#062a76] text-3xl font-bold my-4'>Somos Predictivos</h2>
            <div className="">
                <Carousel responsive={responsiveServices} autoPlay className="!h-full text-white gap-5">
                    {predictive && predictive.map((service: IServices, index: number) => (
                        <Card key={index} name={service.title} description={service.description}></Card>
                    ))}
                </Carousel>
            </div>

            <h2 className='text-[#062a76] text-3xl font-bold my-4'>Somos Preventivos</h2>
            <div className="">
                <Carousel responsive={responsiveServices} autoPlay className="!h-full text-white gap-5">
                    {preventivos && preventivos.map((service: IServices, index: number) => (
                        <Card key={index} name={service.title} description={service.description}></Card>
                    ))}
                </Carousel>
            </div>
            <h2 className='text-[#062a76] text-3xl font-bold my-4'>Somos Correctivos</h2>
            <div className="">
                <Carousel responsive={responsiveServices} autoPlay className="!h-full text-white gap-5">
                    {correctivos && correctivos.map((service: IServices, index: number) => (
                        <Card key={index} name={service.title} description={service.description}></Card>
                    ))}
                </Carousel>
            </div>
            <h2 className='text-[#062a76] text-3xl font-bold my-4'>Somos Proactivos</h2>
            <div className="">
                <Carousel responsive={responsiveServices} autoPlay className="!h-full text-white gap-5">
                    {proactivo && proactivo.map((service: IServices, index: number) => (
                        <Card key={index} name={service.title} description={service.description}></Card>
                    ))}
                </Carousel>
            </div>
        </div>
    )
}
