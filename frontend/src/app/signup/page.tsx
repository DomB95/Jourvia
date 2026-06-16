"use client";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    await createUserWithEmailAndPassword(auth, email, password);

    router.push("/trips");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-white text-black">
      <form onSubmit={handleSignup} className="flex w-full max-w-md flex-col gap-4 rounded-xl border p-6">
        <h1 className="text-3xl font-bold">Create your Jourvia account</h1>

        <input
          className="rounded border px-3 py-2"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="rounded border px-3 py-2"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="rounded bg-sky-500 px-4 py-2 font-semibold text-white hover:bg-sky-600">
          Sign Up
        </button>
      </form>
    </main>
  );
}