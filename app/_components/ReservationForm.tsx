"use client"
import {TCabin} from "@/app/_lib/types";
import {useReservation} from "@/app/_components/ReservationContext";
import {User} from "next-auth";
import {differenceInDays} from "date-fns";
import {createBooking} from "@/app/_lib/actions";
import ButtonSubmit from "@/app/_components/SubmitButton";

function ReservationForm({ cabin, user }: { cabin: TCabin, user: User }) {
  const { range, resetRange } = useReservation();
  const { maxCapacity, regularPrice, discount, id } = cabin;

  const startDate = range?.from;
  const endDate = range?.to;

  const numNights = differenceInDays(endDate as Date, startDate as Date);
  const cabinPrice = numNights * (regularPrice - discount);
  const bookingData = {
      startDate,
      endDate,
      numNights,
      cabinPrice,
      cabinId: id,
  };

  const createBookingWithData  = createBooking.bind(null, bookingData);

  return (
    <div className='scale-[1.01] mt-10'>
      <div className='bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center'>
        <p>Logged in as</p>

         <div className='flex gap-4 items-center'>
          <img
            referrerPolicy='no-referrer'
            className='h-8 rounded-full'
            src={user.image as string}
            alt={user.name as string}
          />
          <p>{user.name}</p>
        </div>
      </div>

      <p>
        {String(range?.from || '')} {String(range?.to || '')}
      </p>

      <form
          action={async (fd) => {
              await createBookingWithData(fd)
              resetRange();
          }}
        //  action={createBookingWithData}
          className='form-bg bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col'>
        <div className='space-y-2'>
          <label htmlFor='numGuests'>How many guests?</label>
          <select
            name='numGuests'
            id='numGuests'
            className='px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm'
            required
          >
            <option value='' key=''>
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? 'guest' : 'guests'}
              </option>
            ))}
          </select>
        </div>

        <div className='space-y-2'>
          <label htmlFor='observations'>
            Anything we should know about your stay?
          </label>
          <textarea
            name='observations'
            id='observations'
            className='px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm'
            placeholder='Any pets, allergies, special requirements, etc.?'
          />
        </div>

        <div className='flex justify-end items-center gap-6'>
          { startDate && endDate && <p className='text-primary-300 text-base'>Start by selecting dates</p>}
          <ButtonSubmit pendingText={'Reserving...'}>
            Reserve now
          </ButtonSubmit>
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
