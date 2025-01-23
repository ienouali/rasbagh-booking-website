import {getBookings} from "@/app/_lib/data-service";
import {auth} from "@/app/_lib/auth";
import {User} from "next-auth";
import ReservationList from "@/app/_components/ReservationList";

export const metadata = {
    // title: 'Oasis Hotel',
    title:  "Reservation - The Oasis Hotel",
}
export default async function Page() {
    const session = await auth();
    const guestId = (session?.user as User & { guestId: number }).guestId;
    const bookings = await getBookings(guestId);

    return (
        <div>
            <h2 className="font-semibold text-2xl text-accent-400 mb-7">
                Your reservations
            </h2>

            {bookings.length === 0 ? (
                <p className="text-lg">
                    You have no reservations yet. Check out our{" "}
                    <a className="underline text-accent-500" href="/cabins">
                        luxury cabins &rarr;
                    </a>
                </p>
            ) : (
                    <ReservationList bookings={bookings as any} />
            )}
        </div>
    );
}
