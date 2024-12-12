import { getDataApi } from '@/backend/basicAPI';
import { Autocomplete } from '@/components/autocomplete/Autocomplete';
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Company, IUser } from '@/interfaces/user.interface';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { IOptions } from '@/interfaces/base.interface';

interface IFormReport {
    nameReport: string;
    company: string;
    email: string;
    file: File | null;
}

interface IFormReportProps {
    open: boolean;
    onClose: (close: boolean) => void;
    onSubmit: (data: IFormReport) => void;
}
export const Reports: FC<IFormReportProps> = ({ open, onClose, onSubmit }) => {

    const [companies, setCompanies] = useState<Company[]>([]);
    const [userCompanies, setUserCompanies] = useState<IOptions[]>([]);

    const getUserByCompaniesApi = async (companyId: string) => {
        await getDataApi(`/users/userByCompanies/${companyId}`).then((response: IUser[]) => {
            const parseComplete: IOptions[] = response.map(users => {
                return {
                    label: `${users.firstName} ${users.lastName} - ${users.email}`,
                    value: users.email
                }
            })
            setUserCompanies(parseComplete)
        })
    }

    const getCompaniesApi = async () => {
        await getDataApi('/users/company').then((response: Company[]) => {
            setCompanies(response)
        })
    }

    useEffect(() => {
        getCompaniesApi();
    }, [open])

    const form = useForm<IFormReport>({
        defaultValues: {
            nameReport: '',
            company: '',
            email: '',
            file: null
        }
    })

    const onSubmitForm = (formSubmit: IFormReport) => {
        onSubmit(formSubmit);
        onClose(false);
        form.reset();
    }

    return (
        <div>
            <Dialog open={open} onOpenChange={onClose}>
                <DialogContent>
                    <DialogTitle className='text-center'> Agregar Reporte</DialogTitle>

                    <Form {...form}>
                        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmitForm)}>
                            <div className="space-y-2">
                                <Label htmlFor="file">Nombre del reporte</Label>
                                <Input {...form.register('nameReport')} />
                            </div>

                            <FormField
                                control={form.control}
                                name="company"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Empresa</FormLabel>
                                        <Select
                                            onValueChange={(value) => {
                                                field.onChange(value); // Actualiza el campo en el formulario
                                                getUserByCompaniesApi(value); // Llama a la API o realiza otra acción
                                            }}
                                            defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Seleccionar empresa" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {companies.map((company) => (
                                                    <SelectItem key={company.id} value={company.id.toString()}>
                                                        {company.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Correo</FormLabel>
                                        <FormControl>
                                            <Autocomplete
                                                dataComplete={userCompanies}
                                                value={field.value}
                                                onChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="space-y-2">
                                <Label htmlFor="file">Archivo</Label>
                                <Input id="file" type="file" placeholder='Selecciona un archivo'
                                    onChange={(e) =>
                                        form.setValue("file", e.target.files?.[0] || null) // Captura el archivo seleccionado
                                    } />
                            </div>
                            <div className="text-center">

                                <Button type="submit">Agregar Reporte</Button>
                            </div>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
