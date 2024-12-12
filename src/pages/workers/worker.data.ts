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
    firstName: z.string().refine(text => text !== '', {message: 'Este campo es requerido'}),
    lastName: z.string().refine(text => text !== '', {message: 'Este campo es requerido'}),
    email: z.string().email({message: 'Debe ingresar un correo valido.'}),
    identify: z.string().refine(text => text !== '', {message: 'Este campo es requerido'}),
    specialty: z.string().refine(text => text !== '', {message: 'Este campo es requerido'})
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
        label: 'Cargo',
        formControl:'specialty'
    }
]