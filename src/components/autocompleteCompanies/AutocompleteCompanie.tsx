import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Command, CommandInput, CommandList, CommandItem } from "@/components/ui/command";
import { IOptions } from "@/interfaces/base.interface";

interface AutocompleteProps {
    companies: IOptions[]; // Lista de empresas
    onSelect: (data: { company: string; companyId?: number }) => void;
}

const AutocompleteCompanies: React.FC<AutocompleteProps> = ({ companies, onSelect }) => {
    const [inputValue, setInputValue] = useState<string>("");
    const [open, setOpen] = useState<boolean>(false);

    const handleSelect = (company: IOptions) => {
        setInputValue(company.label); // Mostrar nombre en el input
        setOpen(false);
        onSelect({ company: company.label, companyId: Number(company.value) }); // Enviar datos seleccionados
    };

    const handleInputChange = (value: string) => {
        setInputValue(value);
        onSelect({ company: value }); // Guardar valor personalizado
    };

    return (
        <div className="space-y-2 my-4">
            <Label htmlFor="company">Empresa</Label>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Input
                        id="company"
                        value={inputValue}
                        onChange={(e) => handleInputChange(e.target.value)}
                        onFocus={() => setOpen(true)}
                        placeholder="Selecciona o escribe una empresa"
                    />
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
        </div>
    );
};

export default AutocompleteCompanies;
