import React, { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Command, CommandInput, CommandList, CommandItem } from "@/components/ui/command";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { IOptions } from "@/interfaces/base.interface";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { postDataApi } from "@/backend/basicAPI";

interface AutocompleteProps {
    companies: IOptions[]; // Lista de empresas
    onSelect: (companyId: string | number) => void;
    updateCompanies: () => void
}

interface ICompany {
    name: string;
}

const AutocompleteCompanies: React.FC<AutocompleteProps> = ({ companies, onSelect, updateCompanies }) => {
    const [open, setOpen] = useState<boolean>(false);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const triggerRef = useRef<HTMLButtonElement>(null);

    const handleSelect = (company: IOptions) => {
        setOpen(false);
        onSelect(company.value); // Enviar datos seleccionados
    };

    const { handleSubmit, register } = useForm<ICompany>({
        defaultValues: {
            name: ''
        }
    });

    const onSubmit = async (newCompany: ICompany) => {
        await postDataApi('/users/company', newCompany).then(response => {
            if (response) {
                updateCompanies()
                setOpenDialog(false)
            }
        })
    }

    return (
        <div className="space-y-2 my-4">
            <Label htmlFor="company">Empresa</Label>
            <div className="flex items-center justify-between gap-2">

                <Popover
                    open={open}
                    onOpenChange={(isOpen) => {
                        setOpen(isOpen);

                        if (isOpen && triggerRef.current) {
                            const triggerWidth = triggerRef.current.offsetWidth;
                            document.documentElement.style.setProperty("--trigger-width", `${triggerWidth}px`);
                        }
                    }}
                >
                    <PopoverTrigger asChild>
                        <Button
                            ref={triggerRef}
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-full justify-between"
                        >
                            {open
                                ? companies.find((framework) => framework.value === 1)?.label
                                : "Selecciona una empresa..."}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                        <Command>
                            <CommandInput placeholder="Buscar empresas..." />
                            <CommandList>
                                {companies.length > 0 ? (
                                    companies.map((company) => (
                                        <CommandItem
                                            key={company.value}
                                            value={company.label}
                                            onSelect={() => handleSelect(company)}
                                        >
                                            {company.label}
                                        </CommandItem>
                                    ))
                                ) : (
                                    <span className="p-4 text-sm text-gray-500">Sin resultados</span>
                                )}
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>


                <Button variant='ghost' size='icon' type="button" onClick={() => setOpenDialog(true)}>
                    <Plus></Plus>
                </Button>
            </div>

            <Dialog open={openDialog} onOpenChange={() => setOpenDialog(false)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className='text-center'>Agregar empresa</DialogTitle>
                    </DialogHeader>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-2 my-4">
                            <Label htmlFor='name'>Empresa</Label>
                            <Input {...register('name')} />
                        </div>

                        <div className="w-full text-center">
                            <Button type='submit' className='px-8 bg-[#062a76] hover:bg-[#264485]'>
                                Registrar
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AutocompleteCompanies;
