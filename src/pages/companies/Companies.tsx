import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { Check, Pencil, PlusCircle, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { getDataApi, postDataApi, putDataApiNormal } from '@/backend/basicAPI';
import { Company, IUser } from '@/interfaces/user.interface';
import { useState, useEffect } from 'react';
import { IBaseResponse, IOptions } from '@/interfaces/base.interface';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { baseValues, companiesFormData, ICompaniesForm, ICompaniesType, validateSchemaCompanies } from './companies.data';
import { Snackbar } from '@/components/snackbar/Snackbar';
import AutocompleteCompanies from '@/components/autocompleteCompanies/AutocompleteCompanie';

export const Companies = () => {

    const [userCompanies, setUserCompanies] = useState<IUser[]>([]);
    const [companies, setCompanies] = useState<IOptions[]>([]);
    const [dataTable, setDataTable] = useState<IUser[]>([]);
    const [showDialog, setShowDialog] = useState<boolean>(false);
    const [titleDialog, setTitleDialog] = useState<string>('Agregar');
    const [responseApi, setResponseApi] = useState<IBaseResponse>({} as IBaseResponse);
    const [changeStatus, setChangeStatus] = useState<boolean>(false);
    const [idUser, setIdUser] = useState<number>(0);
    const [showSnackbar, setShowSnackbar] = useState<boolean>(false);

    const handleShowSnackbar = () => {
        setShowSnackbar(true);
        setTimeout(() => setShowSnackbar(false), 3000); // Oculta después de 3 segundos
    };

    const getUserCompaniesApi = async () => {
        await getDataApi('/users/userCompanies').then((response: IUser[]) => {
            setUserCompanies(response);
            setDataTable(response)
        })
    }

    const getCompaniesApi = async () => {
        await getDataApi('/users/company').then((response: Company[]) => {
            const parseOptionsCompanies = response.map((company: Company) => {
                return {
                    label: company.name,
                    value: company.id
                }
            })
            setCompanies(parseOptionsCompanies);
        })
    }


    const editUserCompany = (company: IUser) => {
        const parseBody: ICompaniesForm = {
            ...company,
            company: company.company.name,
        }
        reset(parseBody as ICompaniesForm);
        setIdUser(company.id);
        setChangeStatus(company.status);
        setTitleDialog('Editar')
        setShowDialog(true);
    }

    const addNewUserCompany = () => {
        reset(baseValues as ICompaniesForm);
        setIdUser(0);
        setTitleDialog('Agregar')
        setShowDialog(true);
    }

    const { register, handleSubmit, reset, setValue } = useForm<ICompaniesForm>({
        defaultValues: baseValues,
        resolver: zodResolver(validateSchemaCompanies),
        mode: 'onChange'
    })

    const handleSelect = (data: { company: string; companyId?: number }) => {
        if (data.company) setValue("company", data.company);
        if (data.companyId) setValue("companyId", data.companyId);
    };

    const onSubmit = (userCompaniesForm: ICompaniesForm) => {
        userCompaniesForm.specialty = '';
        if (idUser !== 0) {
            const bodyUpdateWorker = {
                ...userCompaniesForm,
                idUser: idUser,
                status: changeStatus
            }
            putDataApiNormal('/users/userCompanies', bodyUpdateWorker).then((response: IBaseResponse) => {
                setResponseApi(response)
                getUserCompaniesApi()
                setShowDialog(false);
                handleShowSnackbar();
            })
        } else {
            postDataApi('/users/userCompanies', userCompaniesForm).then((response: IBaseResponse) => {
                setResponseApi(response)
                getUserCompaniesApi()
                setShowDialog(false);
                handleShowSnackbar();
            })
        }
    }

    useEffect(() => {
        getUserCompaniesApi()
        getCompaniesApi()
    }, [])

    const search = (value: string) => {
        const dataFiltered = userCompanies.filter(worker =>
            worker.firstName.toLowerCase().includes(value.toLowerCase()) ||
            worker.lastName.toLowerCase().includes(value.toLowerCase()) ||
            worker.identify.toLowerCase().includes(value.toLowerCase())
        )
        setDataTable(dataFiltered)
    }



    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Empresas</CardTitle>
                </CardHeader>

                <CardContent>

                    <div className='flex items-center gap-5 justify-between w-full mb-5 '>
                        <Input className='w-80' placeholder='Buscador...' onChange={(e) => search(e.target.value)} />

                        <Button onClick={() => addNewUserCompany()} className='bg-[#062a76] hover:bg-[#264485]'>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Agregar Empresa
                        </Button>
                    </div>

                    <div className="h-80 overflow-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Empresa</TableHead>
                                    <TableHead>Nombre y Apellido</TableHead>
                                    <TableHead>Correo</TableHead>
                                    <TableHead>Correo Secundario</TableHead>
                                    <TableHead>Cédula</TableHead>
                                    <TableHead>Estatus</TableHead>
                                    <TableHead>Editar</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {dataTable && dataTable.map((company) => (
                                    <TableRow key={company.id}>
                                        <TableCell>{company.company.name}</TableCell>
                                        <TableCell>{company.firstName} {company.lastName}</TableCell>
                                        <TableCell>{company.email}</TableCell>
                                        <TableCell>{company.secondEmail ? company.secondEmail : '-'}</TableCell>
                                        <TableCell>{company.identify}</TableCell>
                                        <TableCell>{company.status ? <Check color='#26cc05' /> : <X color="#ff0000" />}</TableCell>
                                        <TableCell>
                                            <Button variant="ghost" size="icon" onClick={() => editUserCompany(company)}>
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            <Dialog open={showDialog} onOpenChange={() => setShowDialog(false)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className='text-center'>{titleDialog} empresa</DialogTitle>
                    </DialogHeader>

                    <form onSubmit={handleSubmit(onSubmit)} className=''>
                        {companiesFormData && companiesFormData.map((formData, index: number) => (
                            <div key={index} className="space-y-2 my-4">
                                <Label htmlFor={formData.formControl}>{formData.label}</Label>
                                <Input {...register(formData.formControl as ICompaniesType)} />
                            </div>
                        ))}

                        {/* <div className="space-y-2 my-4">
                            <Label htmlFor="company">Empresa</Label>
                            <Input {...register('company')} />
                        </div> */}

                        <AutocompleteCompanies
                            companies={companies}
                            onSelect={handleSelect}
                        />

                        {idUser !== 0 && (
                            <div className="flex items-center justify-between my-4 mx-2 space-y-2">
                                <Label htmlFor="airplane-mode">Estado</Label>
                                <Switch id="airplane-mode" checked={changeStatus} onCheckedChange={setChangeStatus} />
                            </div>
                        )}

                        <div className="w-full text-center">
                            <Button type='submit' className='px-8 bg-[#062a76] hover:bg-[#264485]'>
                                Guardar
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>

            {showSnackbar && responseApi && <Snackbar baseResponse={responseApi} />}
        </div>
    )
}
