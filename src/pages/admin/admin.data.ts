export interface ITabsOptions {
    label: string;
    tab: string;
    roles: Role[];
}

type Role = 'ADMIN' | 'WORKER' | 'COMPANY';


export const tabsOptions = [
    {
        label: 'Reportes',
        tab: 'reports',
        roles: ['ADMIN', 'WORKER', 'COMPANY']
    },
    {
        label: 'Trabajadores',
        tab: 'workers',
        roles: ['ADMIN']
    },
    {
        label: 'Empresas',
        tab: 'companies',
        roles: ['ADMIN','WORKER']
    },
    {
        label: 'Perfil',
        tab: 'profile',
        roles: ['ADMIN', 'WORKER', 'COMPANY']
    },
    // {
    //     label: 'Archivos',
    //     tab: 'files',
    //     roles: ['ADMIN', 'WORKER', 'COMPANY']
    // }
]