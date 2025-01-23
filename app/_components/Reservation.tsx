import React from 'react';
import DateSelector from "@/app/_components/DateSelector";
import ReservationForm from "@/app/_components/ReservationForm";
import {TCabin} from "@/app/_lib/types";
import {getBookedDatesByCabinId, getSettings} from "@/app/_lib/data-service";
import {auth} from "@/app/_lib/auth";
import LoginMessage from "@/app/_components/LoginMessage";

async function Reservation({ cabin }: { cabin: TCabin }) {
    const [settings, bookedDates] = await Promise.all([
        await getSettings(),
        await getBookedDatesByCabinId(cabin.id),
    ]);

    const session = await auth();

    return (
        <div className=" border border-primary-800 min-h-[400px] mt-10">
            <DateSelector
                bookedDates={bookedDates}
                cabin={cabin}
                settings={settings}
            />
            {session?.user ? <ReservationForm user={session.user} cabin={cabin}/> : <LoginMessage />}
        </div>
    );
}

export default Reservation;