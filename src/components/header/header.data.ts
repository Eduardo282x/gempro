export interface IMenu {
    title: string;
    icon: string;
    scrollTo: string;
}

export const mainMenu: IMenu[] = [
    {
        title: 'Inicio',
        icon: 'home',
        scrollTo: 'inicio'
    },
    {
        title: 'Nosotros',
        icon: 'group',
        scrollTo:'nosotros'
    },
    {
        title: 'Adiestramiento',
        icon: 'psychology_alt',
        scrollTo: 'adiestramiento'
    },
    {
        title: 'Eventos',
        icon: 'event',
        scrollTo:'eventos'
    },
    {
        title: 'Servicios',
        icon: 'leak_add',
        scrollTo:'servicios'
    },
    {
        title: 'Contacto',
        icon: 'contacts',
        scrollTo:'contacto'
    }
]