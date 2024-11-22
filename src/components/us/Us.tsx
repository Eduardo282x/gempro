import usImage from '../../assets/img/us.png'
import us2Image from '../../assets/img/us2.jpg';

export const Us = () => {
    return (
        <div className='p-8'>
            <h2 className='text-[#062a76] text-3xl font-bold mb-4'>Nosotros</h2>

            <div className="flex flex-wrap items-center justify-between ">
                <div className='w-full lg:w-[48%] text-gray-700 text-justify'>
                    <p>Medir, nuestra ciencia predilecta Somos una organización que presta sus servicios en el área de ingeniería de mantenimiento Proactivo, Predictivo, Preventivo y Correctivo. </p>

                    <p>Reunimos mas de 60 años de experiencia dominando tecnologías de alto nivel basadas en las mas novedosas técnicas de medición y análisis de vibraciones que aplica a equipos rotativos. No solo eso, tenemos la capacidad técnica requerida para elaborar análisis concernientes a aceites lubricantes, termografía infrarroja, alineación de equipos rotativos, balanceo dinámico de rotores, medición de espesores, geometría de ingeniería con tecnología láser, entre otros.</p>
                    <br />

                    <p>Nuestra capacidad, nos permite implementar programas de mantenimiento, en empresas de pequeña y gran envergadura en áreas tan vitales como la petrolera, la petroquímica, la cementera, la alimenticia y de bebidas, de generación, la minera, sin dejar de mencionar la industria de plásticos, de vidrios, automotriz, naval, azucarera, y más. No existe limites para ser Proactivo, Predictivo, Preventivo y Correctivo. Estamos certificados a nivel internacional para brindar a nuestros clientes servicios de alto nivel que le permitan mejorar su gestión. SPECTRAL DYNAMICS - DYMAC - INFRATEC - EASY LASER - SEMAPI, así como el entrenamiento de alto nivel de firmas a la altura de BENTLY NEVADA - SKF - CSI - IRD - DMSI, nos permiten dominar tecnológicamente hablando, los sistemas de medición y análisis existentes y así dar tranquilidad y resultados de excelencia a nuestros clientes.</p>
                </div>

                <div className='w-full lg:w-[48%] flex flex-col items-center justify-center gap-5 h-[25rem]'>
                    <img src={usImage} alt="" className='w-full h-1/2' />
                    <img src={us2Image} alt="" className='w-full h-1/2' />
                </div>
            </div>
        </div>
    )
}
