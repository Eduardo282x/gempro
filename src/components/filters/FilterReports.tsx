/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { useForm } from 'react-hook-form';
import { useState, useEffect, FC } from "react";
import { getDataApi } from "@/backend/basicAPI";
import { Company, IUser } from "@/interfaces/user.interface";
import { Button } from "../ui/button";

interface IFilterReports {
    resultForm: (form: ISubmitFilter) => void
}

export interface ISubmitFilter {
    company: string;
    worker: string;
    userCompanies: string;
}

export const FilterReports: FC<IFilterReports> = ({ resultForm }) => {

    const [companies, setCompanies] = useState<Company[]>([]);
    const [userCompanies, setUserCompanies] = useState<IUser[]>([]);
    const [workers, setWorkers] = useState<IUser[]>([]);

    const getUserCompaniesApi = async () => {
        await getDataApi('/users/userCompanies').then((response: IUser[]) => {
            setUserCompanies(response);
        })
    }

    const getWorkersApi = async () => {
        await getDataApi('/users/workers').then((response: IUser[]) => {
            setWorkers(response)
        })
    }

    const getCompaniesApi = async () => {
        await getDataApi('/users/company').then((response: Company[]) => {
            setCompanies(response)
        })
    }

    useEffect(() => {
        getCompaniesApi();
        getUserCompaniesApi();
        getWorkersApi();
    }, [])

    const defaultValues: ISubmitFilter = {
        company: '',
        worker: '',
        userCompanies: '',
    }
    const form = useForm<ISubmitFilter>({
        defaultValues,
        mode: 'onChange'
    })

    const onSubmit = (formSubmit: ISubmitFilter) => {
        resultForm(formSubmit)
    }

    const resetFilter = () => {
        form.reset(defaultValues);
        resultForm(defaultValues);
    }

    return (
        <div className="w-full bg-white rounded-lg py-2 px-8 my-5">

            <Form {...form}>
                <form className="flex items-center justify-between w-full text-sm" onSubmit={form.handleSubmit(onSubmit)}>
                    {/* <p className="text-sm">Ordenar por: </p> */}
{/* 
                    <FormField
                        control={form.control}
                        name="worker"
                        render={({ field }) => (
                            <FormItem className="flex items-center justify-center gap-2 text-sm">
                                <FormLabel className="mt-2">Trabajadores:</FormLabel>
                                <Select
                                    onValueChange={(value) => field.onChange(value)}
                                    value={field.value || ''}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccionar trabajador" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {workers.map((worker) => (
                                            <SelectItem key={worker.id} value={worker.id.toString()}>
                                                {`${worker.firstName} ${worker.lastName}`}
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
                        name="userCompanies"
                        render={({ field }) => (
                            <FormItem className="flex items-center justify-center gap-2 ">
                                <FormLabel className="mt-2 w-full">Empresa trabajador:</FormLabel>
                                <Select
                                    onValueChange={(value) => field.onChange(value)}
                                    value={field.value || ''} 
                                    defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccionar empresa" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {userCompanies.map((userCompany) => (
                                            <SelectItem key={userCompany.id} value={userCompany.id.toString()}>
                                                {`${userCompany.firstName} ${userCompany.lastName}`}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    /> */}

                    <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                            <FormItem className="flex items-center justify-center gap-2 ">
                                <FormLabel className="mt-2 ">Buscar por Empresa:</FormLabel>
                                <Select
                                    onValueChange={(value) => field.onChange(value)}
                                    value={field.value || ''} 
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

                    <div className="flex gap-2 ">
                        <Button type="button" className="bg-red-600 hover:bg-red-800" onClick={resetFilter}>Limpiar</Button>
                        <Button type="submit" className="bg-[#01b033] hover:bg-[#0f9438]">Buscar</Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}
