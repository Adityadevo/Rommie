"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { saveToken } from "@/lib/auth";

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await apiFetch<{ token: string }>(`/auth/${mode}`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      saveToken(data.token);
      router.replace("/home");
    } catch (err: any) {
      setError(err.message || "Failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-semibold text-center text-gray-900">
            {mode === "login" ? "Login" : "Create account"}
          </h1>

          <p className="mt-1 text-center text-sm text-gray-500">
            {mode === "login"
              ? "Welcome back"
              : "Create your account to continue"}
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <input
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200"
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button
              className="w-full rounded-xl bg-pink-600 py-3 font-semibold text-white hover:bg-pink-700 disabled:opacity-60"
              disabled={loading}
            >
              {loading
                ? "Please wait..."
                : mode === "login"
                  ? "Login"
                  : "Sign up"}
            </button>
          </form>
          <div className="mt-5">
            <button
              className="w-full text-sm text-gray-600 hover:text-gray-900"
              onClick={() =>
                setMode((m) => (m === "login" ? "signup" : "login"))
              }
            >
              {mode === "login"
                ? "New here? Create account"
                : "Already have account? Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
