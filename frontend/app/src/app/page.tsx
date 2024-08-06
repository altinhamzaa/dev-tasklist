import Booking from "./components/Booking";
import type { Booking as BookingType } from "./types/booking";
import Link from "next/link";

const getBookings = async (): Promise<BookingType[]> => {
  const res = await fetch("http://host.docker.internal:5000/api/bookings", {
    cache: "no-store",
    mode: "no-cors",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

const Home: React.FC = async () => {
  const bookings = await getBookings();

  return (
    <div className="flex items-center justify-center h-screen flex-col">
      <h1 className="mb-10">Current booking count: {bookings.length}</h1>
      <div className="flex flex-col items-center gap-2">
        <Link
          href="/create"
          className="self-end mb-6 border-white border-solid border-2 p-2 rounded hover:bg-white hover:text-black"
        >
          Create Booking
        </Link>
        {bookings.map((booking) => (
          <Booking key={booking.id} booking={booking} />
        ))}
      </div>
    </div>
  );
};

export default Home;
