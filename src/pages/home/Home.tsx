import { Header } from '../../components/header/Header'
import { Us } from '../../components/us/Us'
import { Events } from '../../components/events/Events'
import { Services } from '../../components/services/Services'
import { Contact } from '../../components/contact/Contact'
import { Main } from '../../components/main/Main'
import { Footer } from '../../components/footer/Footer'
import ScrollAnimation from '@/components/scrollAnimation/ScrollAnimation'

export const Home = () => {
    return (
        <div>
            <Header></Header>
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
        </div>
    )
}
