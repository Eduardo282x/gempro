import { z } from "zod";

export interface IChangePasswordForm {
    password: string;
    confirmPassword: string;
}

export const validateSchema = z.object({
    password: z.string().refine(text => text !== '', {message: 'El campo no puede estar vacio.'}),
    confirmPassword: z.string().refine(text => text !== '', {message: 'El campo no puede estar vacio.'}),
}).refine(data => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword']
})
