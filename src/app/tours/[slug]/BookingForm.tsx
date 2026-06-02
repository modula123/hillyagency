"use client";

import { useState } from "react";
import { Calendar, Users, MessageSquare, CheckCircle } from "lucide-react";

interface Props {
  tourSlug: string;
  tourTitle: string;
  price: number;
}

export default function BookingForm({ tourSlug, tourTitle, price }: Props) {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    travel_date: "",
    travelers: 1,
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Submit to Supabase via API route
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "booking",
          tour_slug: tourSlug,
          tour_title: tourTitle,
          ...form,
          total_price: price * form.travelers,
        }),
      });

      if (!res.ok) throw new Error("Submission failed");
      setSuccess(true);
    } catch {
      setError("Something went wrong. Please try WhatsApp or email us directly.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center py-6">
        <CheckCircle size={40} className="text-green-500 mx-auto mb-3" />
        <h3 className="font-bold text-[var(--text)] text-lg">Booking Request Sent!</h3>
        <p className="text-sm text-[var(--subtext)] mt-2">
          We&apos;ll confirm your {tourTitle} booking within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div>
        <label className="text-xs font-bold text-[var(--subtext)] uppercase tracking-wider mb-1 block">
          Full Name
        </label>
        <input
          type="text"
          required
          placeholder="Your full name"
          value={form.full_name}
          onChange={(e) => setForm({ ...form, full_name: e.target.value })}
          className="w-full px-3 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] text-sm outline-none focus:border-[var(--accent)] transition-colors"
        />
      </div>

      <div>
        <label className="text-xs font-bold text-[var(--subtext)] uppercase tracking-wider mb-1 block">
          Email
        </label>
        <input
          type="email"
          required
          placeholder="your@email.com"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full px-3 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] text-sm outline-none focus:border-[var(--accent)] transition-colors"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-bold text-[var(--subtext)] uppercase tracking-wider mb-1 flex items-center gap-1">
            <Calendar size={11} /> Travel Date
          </label>
          <input
            type="date"
            required
            value={form.travel_date}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setForm({ ...form, travel_date: e.target.value })}
            className="w-full px-3 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] text-sm outline-none focus:border-[var(--accent)] transition-colors"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-[var(--subtext)] uppercase tracking-wider mb-1 flex items-center gap-1">
            <Users size={11} /> Travelers
          </label>
          <input
            type="number"
            min={1}
            max={30}
            value={form.travelers}
            onChange={(e) => setForm({ ...form, travelers: parseInt(e.target.value) || 1 })}
            className="w-full px-3 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] text-sm outline-none focus:border-[var(--accent)] transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="text-xs font-bold text-[var(--subtext)] uppercase tracking-wider mb-1 flex items-center gap-1">
          <MessageSquare size={11} /> Special Requests
        </label>
        <textarea
          rows={3}
          placeholder="Dietary requirements, accessibility needs, etc."
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full px-3 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] text-sm outline-none focus:border-[var(--accent)] transition-colors resize-none"
        />
      </div>

      {price > 0 && (
        <div className="flex items-center justify-between py-3 border-t border-[var(--border)] text-sm">
          <span className="text-[var(--subtext)]">
            ${price} × {form.travelers} person{form.travelers > 1 ? "s" : ""}
          </span>
          <span className="font-black text-[var(--text)]">
            ${(price * form.travelers).toLocaleString()}
          </span>
        </div>
      )}

      {error && (
        <p className="text-xs text-red-500 bg-red-50 dark:bg-red-950/30 px-3 py-2 rounded-lg">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full justify-center py-3.5 rounded-xl font-bold disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? "Sending…" : "Request Booking"}
      </button>

      <p className="text-center text-xs text-[var(--subtext)]">
        No payment yet — we&apos;ll confirm availability first
      </p>
    </form>
  );
}
