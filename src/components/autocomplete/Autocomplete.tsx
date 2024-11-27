import { cn } from "@/lib/utils"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Check, ChevronsUpDown } from "lucide-react"
import { FC, useState } from "react"

export interface IComplete {
    value: string
    label: string
}

export interface IAutoComplete {
    dataComplete: IComplete[]
    value: string;
    onChange: (value: string) => void;
}

export const Autocomplete: FC<IAutoComplete> = ({ dataComplete, value, onChange }) => {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <div className="w-full">
            <Popover open={open} onOpenChange={setOpen} >
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between"
                    >
                        {value
                            ? dataComplete.find((framework) => framework.value === value)?.label
                            : "Selecciona un correo..."}
                        <ChevronsUpDown className="opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full lg:w-[91rem] p-0">
                    <Command>
                        <CommandInput placeholder="Buscando correo..." />
                        <CommandList>
                            <CommandEmpty>Correo no encontrado.</CommandEmpty>
                            <CommandGroup>
                                {dataComplete.map((framework) => (
                                    <CommandItem
                                        key={framework.value}
                                        value={framework.value}
                                        onSelect={(currentValue) => {
                                            onChange(currentValue === value ? "" : currentValue);
                                            setOpen(false);
                                        }}
                                    >
                                        {framework.label}
                                        <Check
                                            className={cn(
                                                "ml-auto",
                                                value === framework.value ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    )
}
