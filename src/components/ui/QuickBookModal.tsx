"use client";

import { useState } from "react";
import { X, CheckCircle, Calendar, Users, MessageSquare } from "lucide-react";

interface Props {
  title: string;
  subtitle?: string;
  type: string;
  onClose: () => void;
}

export default function QuickBookModal({ title, subtitle, type, onClose }: Props) {
  const [form, setForm] = useState({ full_name: "", email: "", phone: "", date: "", count: "1", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const label =
    type === "hotels" ? "Check-in Date" :
    type === "transport" ? "Pick-up Date" :
    type === "restaurants" ? "Reservation Date" :
    "Date";

  const countLabel =
    type === "hotels" ? "Guests" :
    type === "transport" ? "Days" :
    type === "restaurants" ? "Covers" :
    "Quantity";

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "general",
          tour_title: title,
          destination_interest: subtitle,
          full_name: form.full_name,
          email: form.email,
          phone: form.phone,
          travel_date: form.date,
          group_size: form.count,
          message: form.message,
        }),
      });
      if (!res.ok) throw new Error();
      setSuccess(true);
    } catch {
      setError("Something went wrong. Please email us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="booking-modal-overlay"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="booking-modal-box">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--border)]">
          <div>
            <h2 className="font-black text-[var(--text)] text-lg">Enquire</h2>
            <p className="text-xs text-[var(--subtext)] mt-0.5 max-w-xs truncate">
              {title}{subtitle ? ` · ${subtitle}` : ""}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-xl text-[var(--subtext)] hover:bg-[var(--bg2)] transition-all"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6">
          {success ? (
            <div className="text-center py-8">
              <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
              <h3 className="font-bold text-[var(--text)] text-xl mb-2">Enquiry Sent!</h3>
              <p className="text-sm text-[var(--subtext)]">
                We&apos;ll get back to you about <strong className="text-[var(--text)]">{title}</strong> within 24 hours.
              </p>
              <button onClick={onClose} className="btn-primary mt-6 mx-auto">Close</button>
            </div>
          ) : (
            <form onSubmit={submit} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2 sm:col-span-1">
                  <label className="qb-label">Full Name *</label>
                  <input required type="text" placeholder="Alice Johnson" value={form.full_name}
                    onChange={(e) => setForm({ ...form, full_name: e.target.value })} className="qb-input" />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="qb-label">Email *</label>
                  <input required type="email" placeholder="your@email.com" value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })} className="qb-input" />
                </div>
              </div>

              <div>
                <label className="qb-label">Phone / WhatsApp</label>
                <input type="tel" placeholder="+1 555 000 0000" value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })} className="qb-input" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="qb-label flex items-center gap-1"><Calendar size={10} />{label}</label>
                  <input type="date" value={form.date}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => setForm({ ...form, date: e.target.value })} className="qb-input" />
                </div>
                <div>
                  <label className="qb-label flex items-center gap-1"><Users size={10} />{countLabel}</label>
                  <input type="number" min={1} value={form.count}
                    onChange={(e) => setForm({ ...form, count: e.target.value })} className="qb-input" />
                </div>
              </div>

              <div>
                <label className="qb-label flex items-center gap-1"><MessageSquare size={10} />Special Requests</label>
                <textarea rows={3} placeholder="Any special requirements, preferences, or questions…"
                  value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="qb-input resize-none" />
              </div>

              {error && <p className="text-xs text-red-500 bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-xl">{error}</p>}

              <button type="submit" disabled={loading}
                className="btn-primary w-full justify-center py-3.5 rounded-xl disabled:opacity-50">
                {loading ? "Sending…" : "Send Enquiry"}
              </button>

              <style jsx>{`
                .qb-label { display:flex; align-items:center; gap:4px; font-size:10px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; color:var(--subtext); margin-bottom:6px; }
                .qb-input { width:100%; padding:10px 14px; border-radius:12px; border:1px solid var(--border); background:var(--bg); color:var(--text); font-size:13px; font-family:inherit; outline:none; transition:border-color .2s; }
                .qb-input:focus { border-color:var(--accent); }
                .qb-input::placeholder { color:var(--subtext); }
              `}</style>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
