import { useNavigate } from 'react-router-dom';
import imgGempro from '../../assets/img/gemproLogo2.jpg';
import { IMenu, mainMenu } from './header.data';


export const Header = () => {
    const navigate = useNavigate();

    const handleScroll = (id: string) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className={`w-full flex items-center justify-center lg:justify-between px-8 py-2 bg-white`}>
            <div className='hidden items-center gap-2 lg:flex'>
                <img src={imgGempro} alt="" className=' h-[3rem]' />
                <span>Tu mejor opción en mantenimiento</span>
            </div>

            <div className="flex items-center justify-center gap-1">
                {mainMenu && mainMenu.map((me: IMenu, index: number) => (
                    <div
                        key={index}
                        className="cursor-pointer flex items-center text-gray-600 hover:text-[#062a76] px-2 py-1 transition-all hover:bg-gray-200 rounded-lg"
                        onClick={() => handleScroll(me.scrollTo)}>
                        <span className='material-icons'>{me.icon}</span>
                        <span className='hidden lg:block'>{me.title}</span>
                    </div>
                ))}

                <button onClick={() => navigate('/login')} className='cursor-pointer text-white bg-green-700 px-2 py-1 transition-all hover:bg-green-800 rounded-lg'>
                    <div className="lg:hidden">
                        <span className='material-icons'>description</span>
                    </div>
                    <span className='hidden lg:block'>Reporte</span>
                </button>
            </div>
        </div>
    )
}
