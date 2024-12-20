import { getDataApi, postDataApi, putDataApiNormal } from '@/backend/basicAPI';
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { IUser } from '@/interfaces/user.interface';
import { PlusCircle, Pencil, Check, X } from 'lucide-react'
import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input';
import { validateSchemaWorker, workerFormData, baseValues, IWorkerForm, IWorkerType } from './worker.data';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { IBaseResponse } from '@/interfaces/base.interface';
import { Switch } from '@/components/ui/switch';
import { Snackbar } from '@/components/snackbar/Snackbar';
import { Loader } from '@/components/loaders/Loader';
import { ScreenLoader } from '@/components/loaders/ScreenLoader';
import { Paginator } from '@/components/paginator/Paginator';
export const Workers = () => {

    const [workers, setWorkers] = useState<IUser[]>([]);
    const [dataTable, setDataTable] = useState<IUser[]>([]);
    const [filter, setFilter] = useState<string>('');
    const [showDialog, setShowDialog] = useState<boolean>(false);
    const [loader, setLoader] = useState<boolean>(false);
    const [loaderApi, setLoaderApi] = useState<boolean>(false);
    const [changeStatus, setChangeStatus] = useState<boolean>(false);
    const [titleDialog, setTitleDialog] = useState<string>('Agregar');
    const [idUser, setIdUser] = useState<number>(0);
    const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
    const [responseApi, setResponseApi] = useState<IBaseResponse>({} as IBaseResponse);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (page: number, newPage: number) => {
        setPage(page);
        setRowsPerPage(newPage);
    };


    const handleShowSnackbar = () => {
        setShowSnackbar(true);
        setTimeout(() => setShowSnackbar(false), 3000); // Oculta después de 3 segundos
    };

    const { register, handleSubmit, reset, formState: { errors } } = useForm<IWorkerForm>({
        defaultValues: baseValues,
        resolver: zodResolver(validateSchemaWorker),
        mode: 'onChange'
    })

    const onSubmit = (workerForm: IWorkerForm) => {
        setLoaderApi(true);
        if (idUser !== 0) {
            const bodyUpdateWorker = {
                ...workerForm,
                idUser: idUser,
                status: changeStatus
            }
            putDataApiNormal('/users/workers', bodyUpdateWorker).then((response: IBaseResponse) => {
                setResponseApi(response)
                getWorkersApi()
                setShowDialog(false);
                handleShowSnackbar();
                setLoaderApi(false);
            })
        } else {
            postDataApi('/users/workers', workerForm).then((response) => {
                setResponseApi(response as IBaseResponse)
                getWorkersApi()
                setShowDialog(false);
                handleShowSnackbar();
                setLoaderApi(false);
            })
        }
    }

    const getWorkersApi = async () => {
        setLoader(true)
        await getDataApi('/users/workers').then((response: IUser[]) => {
            setWorkers(response);
            if (filter !== '') {
                search(filter);
            } else {
                setDataTable(response);
            }
            setLoader(false)
        })
    }

    const editWorker = (worker: IUser) => {
        reset(worker as IWorkerForm);
        setIdUser(worker.id);
        setChangeStatus(worker.status);
        setTitleDialog('Editar')
        setShowDialog(true);
    }

    const addNewWorker = () => {
        reset(baseValues as IWorkerForm);
        setIdUser(0);
        setTitleDialog('Agregar')
        setShowDialog(true);
    }

    useEffect(() => {
        getWorkersApi()
    }, [])

    const search = (value: string) => {
        setFilter(value);
        const dataFiltered = workers.filter(worker =>
            worker.firstName.toLowerCase().includes(value.toLowerCase()) ||
            worker.lastName.toLowerCase().includes(value.toLowerCase()) ||
            worker.identify.toLowerCase().includes(value.toLowerCase())
        )
        setDataTable(dataFiltered)
    }


    return (
        <div>

            {loaderApi && <ScreenLoader></ScreenLoader>}
            <Card>
                <CardContent className=''>
                    <div className='flex flex-wrap items-center gap-5 justify-between w-full my-5 '>
                        <Input className='w-80' placeholder='Buscador...' onChange={(e) => search(e.target.value)} />

                        <Button onClick={() => addNewWorker()} className='bg-[#062a76] hover:bg-[#264485]'>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Agregar Trabajador
                        </Button>
                    </div>

                    <div className="h-80 overflow-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nombre</TableHead>
                                    <TableHead>Apellido</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Cargo</TableHead>
                                    <TableHead>Cédula</TableHead>
                                    <TableHead>Estatus</TableHead>
                                    <TableHead>Editar</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {dataTable && dataTable.length > 0 ? dataTable
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((worker) => (
                                        <TableRow key={worker.id}>
                                            <TableCell>{worker.firstName}</TableCell>
                                            <TableCell>{worker.lastName}</TableCell>
                                            <TableCell>{worker.email}</TableCell>
                                            <TableCell>{worker.specialty}</TableCell>
                                            <TableCell>{worker.identify}</TableCell>
                                            <TableCell>{worker.status ? <Check color='#26cc05' /> : <X color="#ff0000" />}</TableCell>
                                            <TableCell>
                                                <Button variant="ghost" size="icon" onClick={() => editWorker(worker)}>
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    )) :
                                    <TableRow>
                                        {!loader && (
                                            <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                                                No se encontraron resultados.
                                            </TableCell>
                                        )}
                                    </TableRow>
                                }
                            </TableBody>
                        </Table>
                        {loader && (
                            <Loader></Loader>
                        )}
                    </div>

                    {(dataTable.length / rowsPerPage) > 1 && (
                        <div className="flex items-center justify-end px-8">
                            <Paginator
                                page={page}
                                rowsPerPage={rowsPerPage}
                                changePage={handleChangePage}
                                maxPage={dataTable.length / rowsPerPage}>
                            </Paginator>
                        </div>
                    )}
                </CardContent>
            </Card>

            <Dialog open={showDialog} onOpenChange={() => setShowDialog(false)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className='text-center'>{titleDialog} trabajador</DialogTitle>
                    </DialogHeader>

                    {/* <form onSubmit={handleSubmit(onSubmit)} className='lg:grid grid-cols-1 md:grid-cols-2 gap-6  '> */}
                    <form onSubmit={handleSubmit(onSubmit)} className=''>
                        {workerFormData && workerFormData.map((formData, index: number) => (
                            <div key={index} className="space-y-2 my-4">
                                <Label htmlFor={formData.formControl}>{formData.label}</Label>
                                <Input {...register(formData.formControl as IWorkerType)} />
                                {errors[formData.formControl as IWorkerType]?.message && <span className='text-red-500 text-sm ml-2'>{errors[formData.formControl as IWorkerType]?.message?.toString()}</span>}
                            </div>
                        ))}

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
