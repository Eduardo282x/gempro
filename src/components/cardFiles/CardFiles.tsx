import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { formatDate } from '@/helper/parsers'
import { IFiles } from '@/interfaces/user.interface'
import { Eye, Pencil, Trash2 } from 'lucide-react'
import { FC } from 'react'



export interface ICardFiles {
    file: IFiles,
    openReportDialog: (file: IFiles) => void,
}

export const CardFiles: FC<ICardFiles> = ({ file, openReportDialog }) => {

    return (
        <div className='w-full'>
            <Card key={file.id} className="flex flex-col w-full">
                <CardHeader className='flex flex-row items-center justify-between w-full'>
                    <CardTitle className="text-lg">{file.name}</CardTitle>
                    <p className="text-sm text-gray-500">Fecha: {formatDate(file?.uploadedAt.toString() as string)}</p>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between w-full">
                        <div>
                            <p className="text-sm text-gray-500">De: {`${file.uploadedBy.firstName} ${file.uploadedBy.lastName}`}</p>
                            <p className="text-sm text-gray-500">Correo: {file.uploadedBy.email}</p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">Para: {`${file.directedTo.firstName} ${file.directedTo.lastName}`}</p>
                            <p className="text-sm text-gray-500">Correo: {file.directedTo.email}</p>
                            {/* <p className="text-sm text-gray-500">Empresa: {file.directedTo.company.name}</p> */}
                        </div>

                        <div>
                            <div className=' flex items-center justify-center'>
                                <Button variant="ghost" size="icon" onClick={() => openReportDialog(file)}>
                                    <Eye className="mr-2 h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="mr-2">
                                    <Pencil className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
