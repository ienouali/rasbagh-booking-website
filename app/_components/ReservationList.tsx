'use client'
import React, { useOptimistic } from 'react';
import ReservationCard from "@/app/_components/ReservationCard";
import {IBooking} from "@/app/_lib/types";
import {deleteReservationAction} from "@/app/_lib/actions";

function ReservationList({ bookings }: { bookings: IBooking[] }) {
    const [optimisticSBookings, optimisticDelete] =  useOptimistic(bookings, (currentBookings, bookingId) => {
        return currentBookings.filter(booking => booking.id === bookingId);
    });

    async function handleDeleteBooking(bookingId: number) {
        optimisticDelete(bookingId);
        await deleteReservationAction(bookingId);
    }

    return (
        <ul className="space-y-6">
            {optimisticSBookings.map((booking) => (
                <ReservationCard
                    booking={booking as any}
                    key={booking.id}
                    onDelete={handleDeleteBooking}
                />
            ))}
        </ul>
    );
}

export default ReservationList;