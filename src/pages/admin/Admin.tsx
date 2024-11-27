import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Reports } from "../reports/Reports";
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

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"


type TabValue = 'reports' | 'workers' | 'companies' | 'files'

export const Admin = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeTab, setActiveTab] = useState<TabValue>('reports');
    const [userLogin, setUserLogin] = useState<IToken>({} as IToken);

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

    return (
        <div>
            <div className="container mx-auto p-4">
                <div className="flex items-center justify-between w-full">
                    <h1 className="text-3xl font-bold text-[#062a76] mb-6">Panel Administrativo</h1>


                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="outline" size="icon" onClick={() => navigate('/login')}>
                                    <LogOut />
                                </Button>
                            </TooltipTrigger>
                            {/* <TooltipContent className="bg-white text-gray-500 rounded-lg border-2 border-solid border-black"> */}
                            <TooltipContent>
                                <p>Cerrar sesión</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>



                    {/* <div className="logout">
                        <button onClick={() => navigate('/login')}>Cerrar Sesión</button>
                    </div> */}
                </div>
                <Tabs
                    value={activeTab}
                    onValueChange={handleTabChange as (value: string) => void}
                    defaultValue="reports"
                    className="space-y-4"
                >
                    <TabsList>
                        {tabsOptions && tabsOptions.filter(tab => tab.roles.includes(userLogin.role)).map((tab, index: number) => (
                            <TabsTrigger key={index} value={tab.tab}>
                                {tab.label}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    <TabsContent value="reports">
                        <Reports></Reports>
                    </TabsContent>

                    <TabsContent value="workers">
                        <Workers></Workers>
                    </TabsContent>

                    <TabsContent value="companies">
                        <Companies></Companies>
                    </TabsContent>

                    <TabsContent value="files">
                        <Files></Files>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
