import { getDataApi } from '@/backend/basicAPI';
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { IUser } from '@/interfaces/user.interface';
import { PlusCircle, Pencil, Check, X } from 'lucide-react'
import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
export const Workers = () => {

    const [workers, setWorkers] = useState<IUser[]>([]);
    const [showDialog, setShowDialog] = useState<boolean>(false);
    const [titleDialog, setTitleDialog] = useState<string>('Agregar');

    const getWorkersApi = async () => {
        await getDataApi('/users/workers').then((response: IUser[]) => {
            setWorkers(response)
        })
    }

    const editWorker = (worker: IUser) => {
        console.log(worker);
        setTitleDialog('Editar')
        setShowDialog(true);
    }
    
    const addNewWorker = () => {
        setTitleDialog('Agregar')
        setShowDialog(true);
    }

    useEffect(() => {
        getWorkersApi()
    }, [])


    return (
        <div>

            <Card>
                <CardHeader>
                    <CardTitle>Trabajadores</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nombre</TableHead>
                                <TableHead>Apellido</TableHead>
                                <TableHead>Técnico</TableHead>
                                <TableHead>Cédula</TableHead>
                                <TableHead>Estatus</TableHead>
                                <TableHead>Editar</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {workers && workers.map((worker) => (
                                <TableRow key={worker.id}>
                                    <TableCell>{worker.firstName}</TableCell>
                                    <TableCell>{worker.lastName}</TableCell>
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
                </CardContent>
                <CardFooter>
                    <Button onClick={() => addNewWorker()}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Agregar Trabajador
                    </Button>
                </CardFooter>
            </Card>

            <Dialog open={showDialog} onOpenChange={() => setShowDialog(false)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className='text-center'>{titleDialog} trabajador</DialogTitle>
                    </DialogHeader>
                    
                    <Button>
                        Guardar
                    </Button>
                </DialogContent>
            </Dialog>
        </div>
    )
}
