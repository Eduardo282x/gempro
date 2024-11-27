import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Eye, Pencil, Trash2, Download } from 'lucide-react'
import { useState } from 'react'

interface IReport {
    id: number
    fileName: string
    company: string
    date: string
}

const reports = [
    { id: 1, fileName: 'Reporte_Enero.pdf', company: 'Empresa A', date: '2024-01-15' },
    { id: 2, fileName: 'Informe_Febrero.docx', company: 'Empresa B', date: '2024-02-20' },
]

export const Files = () => {
    const [selectedReport, setSelectedReport] = useState<IReport | null>(null)

    const openReportDialog = (report: IReport) => {
        setSelectedReport(report)
    }

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {reports.map((report) => (
                    <Card key={report.id} className="flex flex-col">
                        <CardHeader>
                            <CardTitle className="text-lg">{report.fileName}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-500">Empresa: {report.company}</p>
                            <p className="text-sm text-gray-500">Fecha: {report.date}</p>
                        </CardContent>
                        <CardFooter className="flex justify-between mt-auto">
                            <Button variant="outline" size="sm" onClick={() => openReportDialog(report)}>
                                <Eye className="mr-2 h-4 w-4" />
                                Ver
                            </Button>
                            <div>
                                <Button variant="ghost" size="icon" className="mr-2">
                                    <Pencil className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            <Dialog open={selectedReport !== null} onOpenChange={() => setSelectedReport(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{selectedReport?.fileName}</DialogTitle>
                        <DialogDescription>
                            Empresa: {selectedReport?.company}
                            <br />
                            Fecha: {selectedReport?.date}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-center">
                        <iframe
                            src={`/placeholder.svg?text=${selectedReport?.fileName}&width=300&height=200`}
                            className="w-full h-64 border rounded"
                            title={selectedReport?.fileName}
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
