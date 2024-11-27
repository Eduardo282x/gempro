import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { Check, Pencil, PlusCircle, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { getDataApi } from '@/backend/basicAPI';
import { IUser } from '@/interfaces/user.interface';
import { useState, useEffect } from 'react';

export const Companies = () => {

    const [userCompanies, setUserCompanies] = useState<IUser[]>([]);
    const [showDialog, setShowDialog] = useState<boolean>(false);
    const [titleDialog, setTitleDialog] = useState<string>('Agregar');

    const getUserCompaniesApi = async () => {
        await getDataApi('/users/userCompanies').then((response: IUser[]) => {
            setUserCompanies(response)
        })
    }

    const editUserCompany = (company: IUser) => {
        console.log(company);
        setTitleDialog('Editar')
        setShowDialog(true);
    }
    
    const addNewUserCompany = () => {
        setTitleDialog('Agregar')
        setShowDialog(true);
    }

    useEffect(() => {
        getUserCompaniesApi()
    }, [])


    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Empresas</CardTitle>
                </CardHeader>

                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nombre de la Empresa</TableHead>
                                <TableHead>Nombre y Apellido</TableHead>
                                <TableHead>Correo</TableHead>
                                <TableHead>Cédula</TableHead>
                                <TableHead>Estatus</TableHead>
                                <TableHead>Editar</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {userCompanies && userCompanies.map((company) => (
                                <TableRow key={company.id}>
                                    <TableCell>{company.company.name}</TableCell>
                                    <TableCell>{company.firstName} {company.lastName}</TableCell>
                                    <TableCell>{company.email}</TableCell>
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
                </CardContent>

                <CardFooter>
                    <Button onClick={() => addNewUserCompany()}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Agregar Empresa
                    </Button>
                </CardFooter>
            </Card>

            <Dialog open={showDialog} onOpenChange={() => setShowDialog(false)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className='text-center'>{titleDialog} empresa</DialogTitle>
                    </DialogHeader>
                    
                    <Button>
                        Guardar
                    </Button>
                </DialogContent>
            </Dialog>

        </div>
    )
}
