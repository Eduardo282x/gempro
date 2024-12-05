/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Workers } from "../workers/Workers";
import { Companies } from "../companies/Companies";
import { Files } from "../files/Files";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { validateToken } from "@/helper/authentication";
import { IToken } from "@/interfaces/user.interface";
import { tabsOptions } from "./admin.data";
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react";
import imgGempro from '../../assets/img/gemproLogo3.jpg'

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Reports } from "../reports/Reports";
import { postDataFileApi } from "@/backend/basicAPI";


type TabValue = 'reports' | 'workers' | 'companies' | 'files'

export const Admin = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeTab, setActiveTab] = useState<TabValue>('reports');
    const [userLogin, setUserLogin] = useState<IToken>({} as IToken);
    const [openDialog, setOpenDialog] = useState<boolean>(false);

    // Actualizar `activeTab` al cambiar la URL
    useEffect(() => {
        const pathSegment = location.pathname.split('/')[2]; // Obtiene la parte después de `/admin/`
        if (pathSegment && ['reports', 'workers', 'companies', 'files'].includes(pathSegment)) {
            setActiveTab(pathSegment as TabValue);
        }
    }, [location]);

    useEffect(() => {
        const getTokenDecode = validateToken();
        if (!getTokenDecode || getTokenDecode.expired) {
            navigate('/login')
        }
        setUserLogin(getTokenDecode as IToken);
    }, [])

    const handleTabChange = (value: TabValue) => {
        navigate(`/admin/${value}`);
    };

    const resultDialogReports = (formResult: any) => {
        const formData = new FormData();
        formData.append("senderId", userLogin.id.toString());
        formData.append("nameReport", formResult.nameReport);
        formData.append("email", formResult.email);
        if (formResult.file) {
            formData.append("file", formResult.file);
        }

        postDataFileApi('/files', formData).then((response) => {
            console.log(response);
        })

        console.log(formResult);
    }
    return (
        <div className="container mx-auto bg-gray-200 h-screen overflow-hidden">
            <div className="flex items-center justify-between w-full mb-5 bg-white p-4">
                <div className='items-center gap-2 hidden md:flex'>
                    <img src={imgGempro} alt="" className='h-[2rem]  md:h-[3rem]' />
                    {/* <span>Tu mejor opción en mantenimiento</span> */}

                    <div className=' text-xl text-[#041d57] font-extrabold flex flex-col text-center'>
                        <span>Grupo Empresarial de Mantenimiento Proactivo</span>
                    </div>
                </div>

                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="outline" className="hover:bg-[#098033] hover:text-white" onClick={() => navigate('/login')}>
                                <span className="hidden md:block">Cerrar sesión</span>
                                <LogOut />
                            </Button>
                        </TooltipTrigger>
                        {/* <TooltipContent className="bg-white text-gray-500 rounded-lg border-2 border-solid border-black"> */}
                        <TooltipContent>
                            <p>Cerrar sesión</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>

            <div className="px-8 py-2">
                <h1 className="text-3xl font-bold text-[#062a76] mb-6">Panel Administrativo</h1>

                <Tabs
                    value={activeTab}
                    onValueChange={handleTabChange as (value: string) => void}
                    defaultValue="reports"
                    className="space-y-4"
                >
                    <div className="flex items-center justify-between w-full">
                        <TabsList>
                            {tabsOptions && tabsOptions.filter(tab => tab.roles.includes(userLogin.role)).map((tab, index: number) => (
                                <TabsTrigger key={index} value={tab.tab} className="hover:bg-[#098033] hover:text-white">
                                    {tab.label}     
                                </TabsTrigger>
                            ))}
                        </TabsList>

                        <Button onClick={() => setOpenDialog(true)}>Agregar Reporte</Button>
                    </div>

                    <TabsContent value="reports">
                        {/* <Reports></Reports> */}
                        <Files></Files>
                    </TabsContent>

                    <TabsContent value="workers">
                        <Workers></Workers>
                    </TabsContent>

                    <TabsContent value="companies">
                        <Companies></Companies>
                    </TabsContent>


                    <Reports open={openDialog} onClose={setOpenDialog} onSubmit={resultDialogReports}></Reports>
                </Tabs>
            </div>
        </div>
    )
}
