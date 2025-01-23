"use client"
import React from 'react';
import {usePathname, useRouter, useSearchParams} from "next/navigation";


type TButton = {
    callback: (t: string) => void;
    filter: string;
    children: string;
    active: string;
}
function Button({callback, filter, children, active}: TButton) {
    return <button
        onClick={() => callback(filter)}
        className={`px-5 py-2 hover:bg-primary-700 ${active === filter ? 'bg-primary-700 text-primary-50' : ''}`}
    >
        {children}
    </button>
}

function Filter() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const activeFilter = searchParams.get('capacity') ?? 'all';
    function handleFilter(type: string) {
        const params = new URLSearchParams(searchParams);
        params.set("capacity", type);
        router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    }

    return (
        <div className="flex border border-primary-800">
            <Button
                active={activeFilter}
                callback={handleFilter}
                filter={'all'}
            >
                All cabins
            </Button>

            <Button
                active={activeFilter}
                callback={handleFilter}
                filter={'small'}
            >
                1&mdash; 3 guests
            </Button>

            <Button
                active={activeFilter}
                callback={handleFilter}
                filter={'medium'}
            >
                4&mdash; 7 guests
            </Button>

            <Button
                active={activeFilter}
                callback={handleFilter}
                filter={'large'}
            >
                8&mdash; 12 guests
            </Button>
        </div>
    );
}

export default Filter;