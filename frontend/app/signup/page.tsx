"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function Signup() {
  const router = useRouter(); // ✅ hook inside component
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  async function submit() {
    setError("");

    const res = await fetch(`${API_URL}/api/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    // ❌ if user already exists or error
    if (!res.ok) {
      setError(data.message || "Signup failed");
      return;
    }

    // ✅ new user created
    alert("Signup successful, please login");
    router.push("/login");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-semibold text-center text-gray-900">
            Create account
          </h1>

          <p className="mt-1 text-center text-sm text-gray-500">
            Sign up to continue
          </p>

          <div className="mt-6 space-y-4">
            <input
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200"
              placeholder="Email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <input
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200"
              placeholder="Password"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />

            {error && <p className="text-sm text-red-600">{error}</p>}

            <button
              className="w-full rounded-xl bg-pink-600 py-3 font-semibold text-white hover:bg-pink-700 disabled:opacity-60"
              onClick={submit}
            >
              Sign up
            </button>

            <button
              className="w-full text-sm text-gray-600 hover:text-gray-900"
              onClick={() => router.push("/login")}
            >
              Already have an account? Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
