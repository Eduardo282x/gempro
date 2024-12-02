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
                <CardHeader>
                    <CardTitle className="text-lg">{file.name}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between w-full">
                        <div>
                            <p className="text-sm text-gray-500">Empresa: {file.directedTo.company.name}</p>
                            <p className="text-sm text-gray-500">Fecha: {formatDate(file?.uploadedAt.toString() as string)}</p>
                        </div>

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
                </CardContent>
            </Card>
        </div>
    )
}
