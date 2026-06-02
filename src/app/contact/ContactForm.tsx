"use client";

import { useState } from "react";
import { CheckCircle, Send } from "lucide-react";

const INQUIRY_TYPES = [
  { value: "custom", label: "Custom Itinerary" },
  { value: "group", label: "Group Travel" },
  { value: "corporate", label: "Corporate / MICE" },
  { value: "general", label: "General Enquiry" },
];

const BUDGET_RANGES = [
  { value: "budget", label: "Budget (< $500)" },
  { value: "mid", label: "Mid-range ($500–$2000)" },
  { value: "luxury", label: "Luxury ($2000–$5000)" },
  { value: "ultra", label: "Ultra-luxury ($5000+)" },
];

export default function ContactForm() {
  const [form, setForm] = useState({
    type: "general",
    full_name: "",
    email: "",
    phone: "",
    destination_interest: "",
    travel_date_from: "",
    group_size: "",
    budget_range: "mid",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const set = (key: string, val: string) => setForm((f) => ({ ...f, [key]: val }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setSuccess(true);
    } catch {
      setError("Submission failed. Please email us directly at hillyagency0@gmail.com");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center py-16 rounded-2xl border border-[var(--border)] bg-[var(--bg2)]">
        <CheckCircle size={52} className="text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-black text-[var(--text)] mb-2">Message Received!</h2>
        <p className="text-[var(--subtext)] max-w-sm mx-auto">
          Thank you for reaching out. Our Rwanda travel expert will respond within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Inquiry type */}
      <div>
        <label className="label-text">What can we help with?</label>
        <div className="flex flex-wrap gap-2 mt-2">
          {INQUIRY_TYPES.map(({ value, label }) => (
            <button
              type="button"
              key={value}
              onClick={() => set("type", value)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                form.type === value
                  ? "bg-[var(--accent)] text-white"
                  : "bg-[var(--bg2)] border border-[var(--border)] text-[var(--subtext)] hover:text-[var(--text)]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Name + email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="label-text">Full Name *</label>
          <input required type="text" placeholder="Alice Johnson" value={form.full_name}
            onChange={(e) => set("full_name", e.target.value)} className="form-input" />
        </div>
        <div>
          <label className="label-text">Email Address *</label>
          <input required type="email" placeholder="alice@example.com" value={form.email}
            onChange={(e) => set("email", e.target.value)} className="form-input" />
        </div>
      </div>

      {/* Phone + destination */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="label-text">Phone / WhatsApp</label>
          <input type="tel" placeholder="+1 555 000 0000" value={form.phone}
            onChange={(e) => set("phone", e.target.value)} className="form-input" />
        </div>
        <div>
          <label className="label-text">Destination Interest</label>
          <input type="text" placeholder="Gorilla trekking, Kigali…" value={form.destination_interest}
            onChange={(e) => set("destination_interest", e.target.value)} className="form-input" />
        </div>
      </div>

      {/* Date + group */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="label-text">Travel Date (approx.)</label>
          <input type="date" value={form.travel_date_from}
            onChange={(e) => set("travel_date_from", e.target.value)} className="form-input" />
        </div>
        <div>
          <label className="label-text">Group Size</label>
          <input type="number" min={1} placeholder="2" value={form.group_size}
            onChange={(e) => set("group_size", e.target.value)} className="form-input" />
        </div>
      </div>

      {/* Budget */}
      <div>
        <label className="label-text">Budget Range</label>
        <div className="flex flex-wrap gap-2 mt-2">
          {BUDGET_RANGES.map(({ value, label }) => (
            <button
              type="button"
              key={value}
              onClick={() => set("budget_range", value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                form.budget_range === value
                  ? "bg-[var(--accent)] text-white"
                  : "bg-[var(--bg2)] border border-[var(--border)] text-[var(--subtext)] hover:text-[var(--text)]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="label-text">Tell Us About Your Dream Trip</label>
        <textarea rows={5} required placeholder="Share anything — your interests, travel style, must-sees, and any special occasions…"
          value={form.message} onChange={(e) => set("message", e.target.value)}
          className="form-input resize-none" />
      </div>

      {error && (
        <p className="text-xs text-red-500 bg-red-50 dark:bg-red-950/30 px-4 py-2.5 rounded-xl">{error}</p>
      )}

      <button type="submit" disabled={loading}
        className="btn-primary py-4 rounded-xl justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed">
        <Send size={16} />
        {loading ? "Sending…" : "Send My Enquiry"}
      </button>

      <style jsx>{`
        .label-text {
          display: block;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--subtext);
          margin-bottom: 6px;
        }
        .form-input {
          width: 100%;
          padding: 10px 14px;
          border-radius: 12px;
          border: 1px solid var(--border);
          background: var(--bg2);
          color: var(--text);
          font-size: 14px;
          font-family: inherit;
          outline: none;
          transition: border-color 0.2s;
        }
        .form-input:focus {
          border-color: var(--accent);
        }
      `}</style>
    </form>
  );
}
