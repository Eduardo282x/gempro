import React, { useState } from "react";
import { cn } from "@/lib/utils"; // Si tienes la función `cn` para combinar clases, úsala. Si no, puedes omitirla.
import { IBaseResponse } from "@/interfaces/base.interface";
// import { Toast } from "@/components/ui/toast"; // Asegúrate de instalar el paquete shadcn/toast si no lo tienes.

interface SnackbarProps {
    baseResponse: IBaseResponse;
    duration?: number; // Duración en milisegundos
    onClose?: () => void; // Callback al cerrar el Snackbar
}

export const Snackbar: React.FC<SnackbarProps> = ({ baseResponse, duration = 3000, onClose }) => {
    const [visible, setVisible] = useState<boolean>(true);

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
            if (onClose) onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]); 

    return (
        <div
            className={
                cn(
                    "fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 text-sm",
                    `${baseResponse.success ? 'bg-green-500' : 'bg-red-500'} text-white px-6 py-3 rounded-lg shadow-lg transition-opacity`,
                    visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                )
            }
        >
            {baseResponse.message}
        </div>
    );
};
