import { z } from "zod";

export interface ICompaniesForm {
    firstName: string;
    lastName: string;
    email: string;
    identify: string;
    secondEmail: string;
    company: string;
    specialty?: string;
}

export type ICompaniesType = 'firstName' | 'lastName' | 'email' | 'identify'

export const baseValues: ICompaniesForm = {
    firstName: '',
    lastName: '',
    email: '',
    identify: '',
    secondEmail: '',
    company: ''
}

export const validateSchemaCompanies = z.object({
    firstName: z.string().refine(text => text !== '', {message: 'Este campo es requerido'}),
    lastName: z.string().refine(text => text !== '', {message: 'Este campo es requerido'}),
    email: z.string().email({message: 'Este campo es requerido'}),
    identify: z.string().refine(text => text !== '', {message: 'Este campo es requerido'}),
    company: z.string().refine(text => text !== '', {message: 'Este campo es requerido'}),
})

export const companiesFormData = [
    {
        label: 'Nombre',
        formControl: 'firstName'
    },
    {
        label: 'Apellido',
        formControl: 'lastName'
    },
    {
        label: 'Correo electrónico',
        formControl: 'email'
    },
    {
        label: 'Correo secundario (opcional)',
        formControl: 'secondEmail'
    },
    {
        label: 'Cédula',
        formControl: 'identify'
    },
    {
        label: 'Empresa',
        formControl: 'company'
    }
]