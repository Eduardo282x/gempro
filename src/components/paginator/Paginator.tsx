import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { FC } from 'react'
import { Button } from '../ui/button';

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface IPaginator {
    page: number;
    rowsPerPage: number;
    changePage: (page: number, rowsPerPage: number) => void;
    maxPage: number;
}

type TypeDirection = 'back' | 'next';

export const Paginator: FC<IPaginator> = ({ page, rowsPerPage, changePage, maxPage }) => {

    const changeValueSelect = (value: string) => {
        changePage(page, Number(value));
    }

    const arrowBtns = (direction: TypeDirection) => {
        if (direction == 'back' && page <= 0) return;
        if (direction == 'next' && page >= maxPage - 1) return;
        changePage(direction == 'next' ? page + 1 : page - 1, rowsPerPage)
    }

    return (
        <div className=' rounded-lg p-2 flex items-center justify-center gap-2'>
            <span className=' text-gray-600 text-sm'>Elementos por pagina: </span>
            <Select onValueChange={changeValueSelect} value={rowsPerPage.toString()}>
                <SelectTrigger className="w-auto px-4 rounded-full">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="5">5</SelectItem>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="15">15</SelectItem>
                        <SelectItem value="20">20</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>

            <span className=' text-gray-600 text-sm'>Pagina:  {page} - {maxPage.toFixed(0)}</span>

            <Button variant="outline" size="icon" disabled={page == 0} className=' rounded-full' onClick={() => arrowBtns('back')}>
                <ChevronLeft />
            </Button>
            <Button variant="outline" size="icon" disabled={page >= (maxPage - 1)} className=' rounded-full' onClick={() => arrowBtns('next')}>
                <ChevronRight />
            </Button>
        </div>
    )
}
