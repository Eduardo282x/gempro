import { Instagram } from 'lucide-react'
import gemproLogo from '../../assets/img/gemproLogo.jpg'

export const Contact = () => {
    return (
        <div className=' flex items-center lg:justify-center justify-start'>
            <div className="relative p-8 my-4 lg:shadow-md lg:shadow-black lg:rounded-xl w-auto">
                <h2 className='text-[#062a76] text-3xl font-bold mb-4'>Contáctenos</h2>

                <div className="flex flex-col items-start justify-start gap-4">
                    <a
                        href="https://www.instagram.com/gempro.company"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center font-semibold cursor-pointer"
                    >
                        <Instagram color="#098033" className="mr-2" />
                        <span className="text-gray-700">@gempro.company</span>
                    </a>

                    {/* WhatsApp */}
                    <a
                        href="https://wa.me/584146355951"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center font-semibold cursor-pointer"
                    >
                        <span className="material-icons-outlined text-[#098033] mr-2">call</span>
                        <span className="text-gray-700">+58 414-6355951</span>

                        <a
                            href="https://wa.me/51916710376"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden md:flex items-center font-semibold cursor-pointer"
                        >
                            <span className='mx-2'>-</span>
                            <span className="text-gray-700">+51 916710376</span>
                        </a>
                    </a>

                    <a
                        href="https://wa.me/51916710376"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex md:hidden items-center font-semibold cursor-pointer"
                    >
                        <span className="material-icons-outlined text-[#098033] mr-2">call</span>
                        <span className="text-gray-700">+51 916710376</span>
                    </a>

                    {/* Email */}
                    <a
                        href="mailto:info@gempro.com.ve"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center font-semibold cursor-pointer"
                    >
                        <span className="material-icons-outlined text-[#098033] mr-2">mail</span>
                        <span className="text-gray-700">info@gempro.com.ve</span>
                    </a>

                    <div className="flex items-center font-semibold cursor-pointer">
                        <span className="material-icons-outlined text-[#098033] mr-2">location_on</span>
                        <span className='text-gray-700'>Sabaneta, Urbanización Urdaneta, Av Principal, Calle 9, edificio Gempro 105A</span>
                    </div>
                </div>

                <div className="hidden md:block absolute top-2 right-2">
                    <img src={gemproLogo} alt="" className='w-48' />
                </div>
            </div>
        </div>
    )
}
