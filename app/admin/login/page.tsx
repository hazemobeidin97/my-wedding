"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setError(false);

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      setError(true);
      setSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-deep px-6 text-pearl">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-lg border px-8 py-10"
        style={{
          borderColor: "rgba(201,169,110,0.25)",
          backgroundColor: "#140F0B",
        }}
      >
        <h1 className="font-heading text-xl text-gold">Admin</h1>
        <label className="mt-6 block text-sm text-muted" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-2 w-full rounded border bg-transparent px-3 py-2 text-pearl outline-none"
          style={{ borderColor: "rgba(201,169,110,0.35)" }}
        />
        {error && (
          <p className="mt-3 text-sm text-rose-deep">Incorrect password.</p>
        )}
        <button
          type="submit"
          disabled={submitting || password.length === 0}
          className="mt-6 w-full rounded bg-gold-dk py-2 text-sm font-medium text-deep disabled:opacity-50"
        >
          {submitting ? "Checking..." : "Log in"}
        </button>
      </form>
    </main>
  );
}
