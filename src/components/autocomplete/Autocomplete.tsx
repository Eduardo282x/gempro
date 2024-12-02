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
import { FC, useRef, useState } from "react"
import { IOptions } from "@/interfaces/base.interface"

export interface IAutoComplete {
    dataComplete: IOptions[]
    value: string;
    onChange: (value: string) => void;
}

export const Autocomplete: FC<IAutoComplete> = ({ dataComplete, value, onChange }) => {
    const [open, setOpen] = useState<boolean>(false);
    const triggerRef = useRef<HTMLButtonElement>(null);

    return (
        <div className="w-full">
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
                        {value
                            ? dataComplete.find((framework) => framework.value === value)?.label
                            : "Selecciona un correo..."}
                        <ChevronsUpDown className="opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    align="start"
                    className="p-0"
                    style={{ width: "var(--trigger-width)" }}
                >
                    <Command>
                        <CommandInput placeholder="Buscando correo..." />
                        <CommandList>
                            <CommandEmpty>Correo no encontrado.</CommandEmpty>
                            <CommandGroup>
                                {dataComplete.map((framework) => (
                                    <CommandItem
                                        key={framework.value}
                                        value={framework.value.toString()}
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
