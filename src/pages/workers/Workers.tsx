import { getDataApi, postDataApi, putDataApiNormal } from '@/backend/basicAPI';
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
export const Workers = () => {

    const [workers, setWorkers] = useState<IUser[]>([]);
    const [dataTable, setDataTable] = useState<IUser[]>([]);
    const [showDialog, setShowDialog] = useState<boolean>(false);
    const [changeStatus, setChangeStatus] = useState<boolean>(false);
    const [titleDialog, setTitleDialog] = useState<string>('Agregar');
    const [idUser, setIdUser] = useState<number>(0);
    const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
    const [responseApi, setResponseApi] = useState<IBaseResponse>({} as IBaseResponse);

    const handleShowSnackbar = () => {
        setShowSnackbar(true);
        setTimeout(() => setShowSnackbar(false), 3000); // Oculta después de 3 segundos
    };

    const { register, handleSubmit, reset } = useForm<IWorkerForm>({
        defaultValues: baseValues,
        resolver: zodResolver(validateSchemaWorker),
        mode: 'onChange'
    })

    const onSubmit = (workerForm: IWorkerForm) => {
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
            })
        } else {
            postDataApi('/users/workers', workerForm).then((response: IBaseResponse) => {
                setResponseApi(response)
                getWorkersApi()
                setShowDialog(false);
                handleShowSnackbar();
            })
        }
    }

    const getWorkersApi = async () => {
        await getDataApi('/users/workers').then((response: IUser[]) => {
            setWorkers(response)
            setDataTable(response)
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
        const dataFiltered = workers.filter(worker =>
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
                    <CardTitle>Trabajadores</CardTitle>
                </CardHeader>
                <CardContent>

                    <div className='flex items-center gap-5 justify-between w-full mb-5 '>
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
                                    <TableHead>Técnico</TableHead>
                                    <TableHead>Cédula</TableHead>
                                    <TableHead>Estatus</TableHead>
                                    <TableHead>Editar</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {dataTable && dataTable.map((worker) => (
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
                                ))}
                            </TableBody>
                        </Table>
                    </div>
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
