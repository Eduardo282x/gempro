import { getDataFileApi } from '@/backend/basicAPI'
import { ActionDialog, CardFiles } from '@/components/cardFiles/CardFiles'
import { FilterReports, ISubmitFilter } from '@/components/filters/FilterReports'
import { Loader } from '@/components/loaders/Loader'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { validateToken } from '@/helper/authentication'
import { formatDate } from '@/helper/parsers'
import { IFiles, IToken } from '@/interfaces/user.interface'
import { Eye, Download } from 'lucide-react'
import { FC, useEffect, useState } from 'react';
import imgGempro from '../../assets/img/gemproLogo3.jpg';
import { useNavigate } from 'react-router-dom'

export interface IFilesCards {
    reportsFiles: IFiles[],
    setFilter: (reportsForm: ISubmitFilter) => void,
    loader: boolean;
    deleteReport: (idReport: number) => void;
}

type TypeActionBtn = 'cancel' | 'delete';

export const Files: FC<IFilesCards> = ({ reportsFiles, loader, setFilter, deleteReport }) => {
    const navigate = useNavigate();
    const [selectedReport, setSelectedReport] = useState<IFiles | null>(null);
    const [userLogin, setUserLogin] = useState<IToken>({} as IToken);
    const [filePreview, setFilePreview] = useState<string>(''); // Estado para almacenar el blob del archivo.
    const [loadingPreview, setLoadingPreview] = useState<boolean>(false);
    const [openDialogDelete, setOpenDialogDelete] = useState<boolean>(false);
    const [openDialogReport, setOpenDialogReport] = useState<boolean>(false);

    useEffect(() => {
        const getTokenDecode = validateToken();
        if (getTokenDecode !== null) {
            setUserLogin(getTokenDecode as IToken);
        }
    }, []);

    const openReportDialog = async (report: IFiles, action: ActionDialog) => {
        setSelectedReport(report);

        if (action === 'see') {
            setOpenDialogReport(true);
            setLoadingPreview(true);
            try {
                const response = await getDataFileApi(`/files/download/${report.id}`);
                const blob = new Blob([response], { type: determineFileType(report.url) });
                const fileUrl = window.URL.createObjectURL(blob);
                setFilePreview(fileUrl);
            } catch (error) {
                console.error("Error al obtener el archivo:", error);
            } finally {
                setLoadingPreview(false);
            }
        } 

        if(action === 'delete'){
            setOpenDialogDelete(true);
        }
    }

    const downloadFile = async () => {
        try {
            const response = await getDataFileApi(`/files/download/${selectedReport?.id}`);
            const url = window.URL.createObjectURL(response);
            const link = document.createElement("a");
            link.href = url;
            link.download = selectedReport?.url as string;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error("Error al descargar el archivo:", error);
        }
    }

    const determineFileType = (fileName: string): string => {
        if (fileName.endsWith(".pdf")) return "application/pdf";
        if (fileName.match(/\.(jpg|jpeg|png|gif)$/)) return "image/*";
        return "application/octet-stream";
    };

    const getFiltersReports = (reportsForm: ISubmitFilter) => {
        setFilter(reportsForm)
    }

    const goToPage = () => {
        localStorage.removeItem('token');
        navigate('/')
    }

    const actionBtn = (action: TypeActionBtn) => {
        if(action === 'delete' && selectedReport){
            deleteReport(selectedReport.id);
        }

        setOpenDialogDelete(false);
    }

    return (
        <div>
            {userLogin.role === 'ADMIN' && (
                <div className="w-full">
                    <FilterReports resultForm={getFiltersReports}></FilterReports>
                </div>
            )}

            <div className="flex flex-col items-center justify-start w-full h-80 overflow-auto">
                {reportsFiles && reportsFiles.length > 0 ? reportsFiles.map((report: IFiles) => (
                    <CardFiles key={report.id} file={report} openReportDialog={openReportDialog} ></CardFiles>
                )) : <p>No se encuentran reportes...</p>}

                {loader && (
                    <Loader></Loader>
                )}
            </div>

            <Dialog open={openDialogReport} onOpenChange={setOpenDialogReport}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{selectedReport?.name}</DialogTitle>
                        <DialogDescription>
                            <div className="flex items-center justify-between w-full">
                                <div>
                                    Empresa: {selectedReport?.directedTo.company.name}
                                    <br />
                                    Fecha: {formatDate(selectedReport?.uploadedAt.toString() as string)}
                                </div>

                                <img src={imgGempro} alt="" className='w-20' />
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-center">
                        {loadingPreview ? (
                            <div className='flex flex-col items-center justify-center'>
                                <p>Cargando vista previa...</p>
                                <Loader></Loader>
                            </div>
                        ) : filePreview ? (
                            selectedReport?.url.endsWith(".pdf") ? (
                                <iframe
                                    src={filePreview}
                                    className="w-full h-64 border rounded"
                                    title={selectedReport?.name}
                                />
                            ) : (
                                <img
                                    src={filePreview}
                                    alt={selectedReport?.name}
                                    className="w-full h-64 object-contain border rounded"
                                />
                            )
                        ) : (
                            <p>No se pudo cargar el archivo.</p>
                        )}
                    </div>

                    <div className='w-full flex items-center justify-between my-5 gap-2'>
                        <span className=' text-sm w-1/2 text-wrap'>Sabaneta, Urbanización Urdaneta, Av Principal, Calle 9, edificio Gempro 105A</span>
                        <span className=' text-sm w-1/2 text-wrap text-right'>Visita nuestra <span onClick={goToPage} className='text-blue-500 hover:underline cursor-pointer'>pagina aqui</span></span>
                    </div>
                    <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => window.open(filePreview, "_blank")}>
                            <Eye className="mr-2 h-4 w-4" />
                            Ver Completo
                        </Button>
                        <Button onClick={downloadFile}>
                            <Download className="mr-2 h-4 w-4" />
                            Descargar
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            <Dialog open={openDialogDelete} onOpenChange={setOpenDialogDelete}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>¿Estas seguro de que quieres eliminar este reporte?</DialogTitle>
                        <DialogDescription>
                            <div className="flex items-center justify-center gap-2 w-full my-5">
                                <Button onClick={() => actionBtn('cancel')}>Cancelar</Button>
                                <Button onClick={() => actionBtn('delete')} variant={'destructive'}>Eliminar</Button>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}
