import { Header } from '../../components/header/Header'
import { Us } from '../../components/us/Us'
import { Events } from '../../components/events/Events'
import { Services } from '../../components/services/Services'
import { Contact } from '../../components/contact/Contact'
import { Main } from '../../components/main/Main'
import { Footer } from '../../components/footer/Footer'
import ScrollAnimation from '@/components/scrollAnimation/ScrollAnimation'
import { MainTitlePage } from '@/components/mainTitlePage/MainTitlePage'
import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

export const Home = () => {
    const [showScrollToTop, setShowScrollToTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 100; // Mostrar botón al hacer scroll de más de 100px
            setShowScrollToTop(isScrolled);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth", // Animación suave al desplazarse hacia arriba
        });
    };


    return (
        <div className='w-full overflow-hidden'>
            <Header></Header>
            <ScrollAnimation>
                <div><MainTitlePage></MainTitlePage></div>
            </ScrollAnimation>
            <ScrollAnimation>
                <div id="inicio"><Main></Main></div>
            </ScrollAnimation>
            <ScrollAnimation>
                <div id="nosotros"><Us></Us></div>
            </ScrollAnimation>
            <ScrollAnimation>
                <div id="adiestramiento" className='p-8 bg-gray-200'>Adiestramiento</div>
            </ScrollAnimation>
            <ScrollAnimation>
                <div id="eventos"><Events></Events></div>
            </ScrollAnimation>
            <ScrollAnimation>
                <div id="servicios"><Services></Services></div>
            </ScrollAnimation>
            <ScrollAnimation>
                <div id="contacto"><Contact></Contact></div>
            </ScrollAnimation>
            <ScrollAnimation>
                <Footer></Footer>
            </ScrollAnimation>

            {showScrollToTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-5 right-5 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition"
                    title="Ir arriba"
                >
                    <ArrowUp />
                </button>
            )}
        </div>
    )
}
