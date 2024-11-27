import { IServices, mainServices, predictive } from './services.data'
import { Card } from '../card/Card'
import Carousel from 'react-multi-carousel'
import { responsive } from '../main/Main'

export const Services = () => {
    return (
        <div className='p-8 bg-gray-200'>
            <h2 className='text-[#062a76] text-3xl font-bold mb-4'>Nuestro Servicios</h2>

            <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {mainServices && mainServices.map((service: IServices, index: number) => (
                    <Card key={index} name={service.title} description={service.description}></Card>
                ))}
            </div>

            <div className="lg:hidden">
                <Carousel responsive={responsive} autoPlay infinite className="!h-full text-white">
                    {mainServices && mainServices.map((service: IServices, index: number) => (
                        <Card key={index} name={service.title} description={service.description}></Card>
                    ))}
                </Carousel>
            </div>

            <h2 className='text-[#062a76] text-3xl font-bold my-4'>Somos Predictivos</h2>

            <div className="hidden lg:grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {predictive && predictive.map((service: IServices, index: number) => (
                    <Card key={index} name={service.title} description={service.description}></Card>
                ))}
            </div>

            <div className="lg:hidden">
                <Carousel responsive={responsive} autoPlay infinite className="!h-full text-white">
                    {predictive && predictive.map((service: IServices, index: number) => (
                        <Card key={index} name={service.title} description={service.description}></Card>
                    ))}
                </Carousel>
            </div>
        </div>
    )
}
