import { useNavigate } from 'react-router-dom';
import imgGempro from '../../assets/img/gemproLogo3.jpg';
import { IMenu, mainMenu } from './header.data';
import { Button } from '../ui/button';
import { Menu } from 'lucide-react';
import { useState } from 'react';

// import {
//     Drawer,
//     DrawerClose,
//     DrawerContent,
//     DrawerDescription,
//     DrawerFooter,
//     DrawerHeader,
//     DrawerTitle,
//     DrawerTrigger,
// } from "@/components/ui/drawer"

export const Header = () => {
    const navigate = useNavigate();
    const [openMenu, setOpenMenu] = useState<boolean>(false);

    const handleScroll = (id: string) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
        setOpenMenu(false);
    };

    return (
        <div className={`w-full flex items-center justify-between px-4 md:px-8 py-2 bg-white`}>
            <div className='items-center gap-2 hidden md:flex'>
                <img src={imgGempro} alt="" className='h-[2rem]  md:h-[3rem]' />

                <div className=' text-[.8rem] text-[#041d57] font-extrabold flex flex-col text-center'>
                    <span>Grupo Empresarial de </span>
                    <span>Mantenimiento Proactivo</span>
                </div>
                {/* <span>Tu mejor opción en mantenimiento</span> */}
            </div>

            <div className='block md:hidden'>
                <Button variant='outline' size='icon' onClick={() => setOpenMenu(!openMenu)}>
                    <Menu />
                </Button>

                <div
                    className={`fixed top-0 left-0 z-50 h-screen w-auto max-w-xs bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${openMenu ? "translate-x-0" : "-translate-x-full"
                        }`}
                >
                    <div className="p-4">
                        <h2 className="text-lg font-bold mb-4">Menú</h2>
                        {mainMenu && mainMenu.map((me: IMenu, index: number) => (
                            <div
                                key={index}
                                className="cursor-pointer flex items-center gap-5 text-gray-600 hover:text-[#062a76] px-2 py-1 transition-all hover:bg-gray-200 rounded-lg"
                                onClick={() => handleScroll(me.scrollTo)}>
                                <span className='material-icons'>{me.icon}</span>
                                <span>{me.title}</span>
                            </div>
                        ))}
                    </div>

                </div>
                {openMenu && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-40"
                        onClick={() => setOpenMenu(false)}
                    />
                )}
            </div>

            <div className="flex items-center justify-center gap-1">
                {mainMenu && mainMenu.map((me: IMenu, index: number) => (
                    <div
                        key={index}
                        className="cursor-pointer hidden md:flex items-center text-gray-600 hover:text-[#062a76] px-2 py-1 transition-all hover:bg-gray-200 rounded-lg"
                        onClick={() => handleScroll(me.scrollTo)}>
                        <span className='material-icons'>{me.icon}</span>
                        <span>{me.title}</span>
                    </div>
                ))}

                <button onClick={() => navigate('/login')} className='cursor-pointer text-white bg-green-700 px-2 py-1 transition-all hover:bg-green-800 rounded-lg flex gap-2'>
                    <span className='material-icons'>description</span>
                    <span className='hidden md:block'>Reporte</span>
                </button>
            </div>
        </div>
    )
}
