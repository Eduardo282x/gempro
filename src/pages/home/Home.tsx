import React from 'react'
import { Header } from '../../components/header/Header'
import { Us } from '../../components/us/Us'
import { Events } from '../../components/evenets/Events'
import { Services } from '../../components/services/Services'
import { Contact } from '../../components/contact/Contact'

export const Home = () => {
    return (
        <div>
            <p>Home</p>
            <Header></Header>
            <Us></Us>
            <Events></Events>
            <Services></Services>
            <Contact></Contact>
        </div>
    )
}
