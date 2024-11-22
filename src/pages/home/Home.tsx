import { Header } from '../../components/header/Header'
import { Us } from '../../components/us/Us'
import { Events } from '../../components/events/Events'
import { Services } from '../../components/services/Services'
import { Contact } from '../../components/contact/Contact'
import { Main } from '../../components/main/Main'
import { Footer } from '../../components/footer/Footer'

export const Home = () => {
    return (
        <div>
            <Header></Header>
            <div id="inicio"><Main></Main></div>
            <div id="nosotros"><Us></Us></div>
            <div id="adiestramiento">Adiestramiento aqui</div>
            <div id="eventos"><Events></Events></div>
            <div id="servicios"><Services></Services></div>
            <div id="contacto"><Contact></Contact></div>
            <Footer></Footer>
        </div>
    )
}
