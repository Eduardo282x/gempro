import { z } from "zod";

export interface ICompaniesForm {
    firstName: string;
    lastName: string;
    email: string;
    identify: string;
    secondEmail: string;
    company: string;
    companyId?: number | null;
    specialty?: string;
}

export type ICompaniesType = 'firstName' | 'lastName' | 'email' | 'identify'

export const baseValues: ICompaniesForm = {
    firstName: '',
    lastName: '',
    email: '',
    identify: '',
    secondEmail: '',
    company: '',
    companyId: 0
}

export const validateSchemaCompanies = z.object({
    firstName: z.string().refine(text => text !== ''),
    lastName: z.string().refine(text => text !== ''),
    email: z.string().refine(text => text !== ''),
    identify: z.string().refine(text => text !== ''),
    secondEmail: z.string().refine(text => text !== ''),
    company: z.string().refine(text => text !== '')
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
    // {
    //     label: 'Empresa',
    //     formControl: 'company'
    // }
]