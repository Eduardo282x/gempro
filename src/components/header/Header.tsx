export const Header = () => {
    return (
        <div className='w-[100vw] flex items-center justify-around bg-sky-600'>
            <p className=' cursor-pointer hover:bg-sky-800 transition-all delay-75 w-full py-2 text-center'>Inicio</p>
            <p className=' cursor-pointer hover:bg-sky-800 transition-all delay-75 w-full py-2 text-center'>Nosotros</p>
            <p className=' cursor-pointer hover:bg-sky-800 transition-all delay-75 w-full py-2 text-center'>Adiestramiento</p>
            <p className=' cursor-pointer hover:bg-sky-800 transition-all delay-75 w-full py-2 text-center'>Eventos</p>
            <p className=' cursor-pointer hover:bg-sky-800 transition-all delay-75 w-full py-2 text-center'>Servicios</p>
            <p className=' cursor-pointer hover:bg-sky-800 transition-all delay-75 w-full py-2 text-center'>Contacto</p>

            <button className=' w-full'>Reporte</button>
        </div>
    )
}
