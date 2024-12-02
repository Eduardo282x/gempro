import { z } from "zod";

export interface IWorkerForm {
    firstName: string;
    lastName: string;
    email: string;
    identify: string;
    specialty: string;
}

export type IWorkerType = 'firstName' | 'lastName' | 'email' | 'identify' | 'specialty'

export const baseValues: IWorkerForm = {
    firstName: '',
    lastName: '',
    email: '',
    identify: '',
    specialty: ''
}

export const validateSchemaWorker = z.object({
    firstName: z.string().refine(text => text !== ''),
    lastName: z.string().refine(text => text !== ''),
    email: z.string().refine(text => text !== ''),
    identify: z.string().refine(text => text !== ''),
    specialty: z.string().refine(text => text !== '')
})

export const workerFormData = [
    {
        label: 'Nombre',
        formControl: 'firstName'
    },
    {
        label:'Apellido',
        formControl: 'lastName'
    },
    {
        label: 'Correo electrónico',
        formControl: 'email'
    },
    {
        label: 'Cédula',
        formControl: 'identify'
    },
    {
        label: 'Técnico',
        formControl:'specialty'
    }
]