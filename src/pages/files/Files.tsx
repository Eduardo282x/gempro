import { getDataApi } from '@/backend/basicAPI'
import { CardFiles } from '@/components/cardFiles/CardFiles'
import { FilterReports } from '@/components/filters/filterReports'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { formatDate } from '@/helper/parsers'
import { IFiles } from '@/interfaces/user.interface'
import { Eye, Download } from 'lucide-react'
import { useEffect, useState } from 'react'

export const Files = () => {
    const [reportsFiles, setReportsFiles] = useState<IFiles[]>([])
    const [selectedReport, setSelectedReport] = useState<IFiles | null>(null)

    const openReportDialog = (report: IFiles) => {
        setSelectedReport(report)
    }

    const getReportFilesApi = async () => {
        await getDataApi('/files').then((response: IFiles[]) => {
            setReportsFiles(response)
        })
    }

    useEffect(() => {
        getReportFilesApi()
    }, [])

    return (
        <div>

            <div className="w-full">
                <FilterReports></FilterReports>
            </div>

            <div className="flex flex-col items-center justify-start w-full h-80 overflow-auto">
                {reportsFiles.map((report: IFiles) => (
                    <CardFiles key={report.id} file={report} openReportDialog={openReportDialog}></CardFiles>
                ))}
            </div>

            <Dialog open={selectedReport !== null} onOpenChange={() => setSelectedReport(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{selectedReport?.name}</DialogTitle>
                        <DialogDescription>
                            Empresa: {selectedReport?.directedTo.company.name}
                            <br />
                            Fecha: {formatDate(selectedReport?.uploadedAt.toString() as string)}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-center">
                        <iframe
                            src={`/placeholder.svg?text=${selectedReport?.name}&width=300&height=200`}
                            className="w-full h-64 border rounded"
                            title={selectedReport?.name}
                        />
                    </div>
                    <div className="flex justify-end space-x-2">
                        <Button variant="outline">
                            <Eye className="mr-2 h-4 w-4" />
                            Ver Completo
                        </Button>
                        <Button>
                            <Download className="mr-2 h-4 w-4" />
                            Descargar
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
