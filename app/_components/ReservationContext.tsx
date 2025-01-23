"use client"
import React, {createContext, Dispatch, ReactNode, SetStateAction, useContext, useState} from 'react';
import {DateRange} from "react-day-picker";

const ReservationContext = createContext<{
    range: DateRange | undefined;
    setRange: Dispatch<SetStateAction<DateRange | undefined>>;
    resetRange: () => void;
}>({ range: undefined, setRange: () => undefined, resetRange: () => undefined });

function ReservationProvider({children}: { children: ReactNode }) {
    const [range, setRange] = useState<DateRange>()
    const resetRange = () => setRange({ from: undefined, to: undefined });
    return <ReservationContext.Provider value={{ range, setRange, resetRange }}>
        {children}
    </ReservationContext.Provider>
}

function useReservation() {
    const context = useContext(ReservationContext);
    if (context === undefined) throw new Error('Context was used outside provider');

    return context;
}


export { ReservationProvider, useReservation };