"use server"

import {auth, signIn, signOut} from "@/app/_lib/auth";
import {createNewBooking, deleteBooking, getBookings, updateBooking, updateGuest} from "@/app/_lib/data-service";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";

export async function signInAction() {
    await signIn('google', {
        redirectTo: '/account',
    });
}

export async function signOutAction() {
    await signOut({
        redirectTo: '/',
    });
}

export async function updateProfileAction(formData: any) {
   const session = await auth();
   if (!session) throw new Error('Session not found');

   const nationalID = formData?.get("nationalID");
   const [nationality, countryFlag] = formData?.get("nationality").split('%');
    if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID)) {
        throw new Error('Please provide a valid national ID');
    }

    const updateData = { nationality, nationalID, countryFlag };

     await updateGuest((session.user as any).guestId, updateData);
     revalidatePath('/account');
}

export async function deleteReservationAction(bookingId: number) {
    const session = await auth();
    if (!session) throw new Error('Session not found');

    const guestBookings = await getBookings((session.user as any).guestId);
    const guestBookingsIds: number[] = guestBookings?.map(booking => booking.id);
    if (!guestBookingsIds.includes(bookingId)) throw new Error('Not allow to delete this booking.');
    await deleteBooking(bookingId);
    revalidatePath('/account/reservations');
}

export async function updateBookingAction(formData: any) {
    const  bookingId  = Number(formData.get("bookingId"));
    const session = await auth();
    if (!session) throw new Error('Session not found');

    const guestBookings = await getBookings((session.user as any).guestId);
    const guestBookingsIds: number[] = guestBookings?.map(booking => booking.id);
    if (!guestBookingsIds.includes(bookingId)) throw new Error('Not allow to delete this booking.');

    const updateData = {
        numGuests: Number(formData.get('numGuests')),
        observations: formData.get('observations').slice(0, 1000),
    }
    await updateBooking(bookingId, updateData);
    revalidatePath('/account/reservations/edit/' + bookingId);
    redirect('/account/reservations');
}

export async function createBooking(bookingData: any, formData: any) {
    const session = await auth();
    if (!session) throw new Error('Session not found');

    const newBooking = {
        ...bookingData,
        guestId: session?.user?.guestId,
        numGuests: Number(formData.get("numGuests")),
        observations: formData.get("observations").slice(0, 1000),
        extrasPrice: 0,
        totalPrice: bookingData.cabinPrice,
        isPaid: false,
        hasBreakfast: false,
        status: 'unconfirmed',
    }

    await createNewBooking(newBooking)
    revalidatePath(`/cabins/${bookingData.cabinId}`);
    redirect('/cabins/thankyou');
}