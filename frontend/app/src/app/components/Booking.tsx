import Link from 'next/link'
import type { Booking } from "../types/booking";

type Props = {
  booking: Booking
};

const Booking = ({booking}: Props) => {

  return <Link className="hover:text-blue-800 hover:underline" href={`/booking/${booking.id}`}>
    A Booking on {booking.date} starting at {booking.start_time}
  </Link>;
}

export default Booking;
