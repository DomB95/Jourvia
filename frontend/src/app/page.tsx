import Image from "next/image";

export default async function Home() {
   const res = await fetch("http://localhost:8080/api/health", {
    cache: "no-store",
  });
  const text = await res.text();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen flex-col items-center justify-center bg-white text-black dark:bg-black dark:text-white">
      <h1 className="text-4xl font-bold mb-4">Jourvia</h1>
      <p className="text-lg opacity-80 mb-2">
        Plan smarter. Travel better.
      </p>
      <p className="mt-6 rounded-lg bg-gray-100 px-6 py-3 dark:bg-zinc-800">
        Backend says: <span className="font-mono">{text}</span>
      </p>
    </main>
    </div>
  );
}
