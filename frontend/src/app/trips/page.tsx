"use client";

import { useEffect, useState } from "react";

type Trip = {
  id: number;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
};

export default function TripsPage() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [title, setTitle] = useState("");
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const fetchTrips = async () => {
    const response = await fetch("http://localhost:8080/api/trips");
    const data = await response.json();
    setTrips(data);
  };

  useEffect(() => {
  const loadTrips = async () => {
    const response = await fetch("http://localhost:8080/api/trips");
    const data = await response.json();
    setTrips(data);
  };

  loadTrips();
}, []);

  const handleCreateTrip = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch("http://localhost:8080/api/trips", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        destination,
        startDate,
        endDate,
      }),
    });

    setTitle("");
    setDestination("");
    setStartDate("");
    setEndDate("");

    fetchTrips();
  };

  return (
    <main className="min-h-screen bg-white px-8 py-10 text-black">
      <h1 className="mb-6 text-4xl font-bold">Jourvia Trips</h1>

      <form
        onSubmit={handleCreateTrip}
        className="mb-10 flex max-w-xl flex-col gap-4 rounded-xl border p-6"
      >
        <h2 className="text-2xl font-semibold">Create a Trip</h2>

        <input
          className="rounded border px-3 py-2"
          placeholder="Trip title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="rounded border px-3 py-2"
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />

        <input
          className="rounded border px-3 py-2"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <input
          className="rounded border px-3 py-2"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />

        <button
          type="submit"
          className="rounded bg-sky-500 px-4 py-2 font-semibold text-white hover:bg-sky-600"
        >
          Add Trip
        </button>
      </form>

      <section>
        <h2 className="mb-4 text-2xl font-semibold">Saved Trips</h2>

        <div className="grid gap-4">
          {trips.map((trip) => (
            <div key={trip.id} className="rounded-xl border p-4 shadow-sm">
              <h3 className="text-xl font-bold">{trip.title}</h3>
              <p>{trip.destination}</p>
              <p className="text-sm text-gray-600">
                {trip.startDate} → {trip.endDate}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}