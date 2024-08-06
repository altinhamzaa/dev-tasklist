"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

function isError(error: any): error is { message: string } {
  return "message" in error;
}

const BookingForm: React.FC = () => {
  const [service, setService] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [date, setDate] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);

    try {
      const res = await fetch("http://host.docker.internal:5000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service,
          doctor_name: doctorName,
          start_time: startTime,
          end_time: endTime,
          date,
        }),
      });

      if (res.ok) router.push("/");
    } catch (error) {
      if (isError(error)) {
        setErrors([error.message]);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 py-10 px-96 text-black"
    >
      <Link
        href={"/"}
        className="self-start mb-2 text-white border-white border-solid border-2 p-2 rounded hover:bg-white hover:text-black"
      >
        Go back
      </Link>
      <h1 className="text-white text-[30px] self-center">
        Create Booking Form
      </h1>
      <input
        type="text"
        placeholder="Service"
        value={service}
        onChange={(e) => setService(e.target.value)}
        className="border p-2"
        required
      />
      <input
        type="text"
        placeholder="Doctor Name"
        value={doctorName}
        onChange={(e) => setDoctorName(e.target.value)}
        className="border p-2"
        required
      />
      <input
        type="time"
        placeholder="Start Time"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
        className="border p-2"
        required
      />
      <input
        type="time"
        placeholder="End Time"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
        className="border p-2"
        required
      />
      <input
        type="date"
        placeholder="Date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border p-2"
        required
      />
      <button type="submit" className="bg-blue-500 text-white p-2">
        Create Booking
      </button>
      {errors.length > 0 && (
        <div className="text-red-500">
          {errors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}
    </form>
  );
};

export default BookingForm;
