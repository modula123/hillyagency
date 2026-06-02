"use client";

import { useState } from "react";
import { Calendar, Users, MessageSquare, CheckCircle, X, Compass } from "lucide-react";

interface Props {
  activityTitle: string;
  activitySlug: string;
  destTitle: string;
  type: string;
}

export default function ActivityBookingPanel({ activityTitle, activitySlug, destTitle, type }: Props) {
  const [open, setOpen] = useState(false);
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
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "booking",
          tour_slug: activitySlug,
          tour_title: activityTitle,
          destination_interest: destTitle,
          ...form,
        }),
      });
      if (!res.ok) throw new Error();
      setSuccess(true);
    } catch {
      setError("Something went wrong. Please try WhatsApp or email us.");
    } finally {
      setLoading(false);
    }
  };

  const FormContent = (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {success ? (
        <div className="text-center py-6">
          <CheckCircle size={40} className="text-green-500 mx-auto mb-3" />
          <h3 className="font-bold text-[var(--text)] text-lg">Booking Request Sent!</h3>
          <p className="text-sm text-[var(--subtext)] mt-2">
            We&apos;ll confirm your <strong className="text-[var(--text)]">{activityTitle}</strong> experience within 24 hours.
          </p>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-[var(--subtext)]">Full Name</label>
            <input type="text" required placeholder="Alice Johnson" value={form.full_name}
              onChange={(e) => setForm({ ...form, full_name: e.target.value })}
              className="form-field" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-[var(--subtext)]">Email</label>
            <input type="email" required placeholder="your@email.com" value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="form-field" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-[var(--subtext)]">Phone / WhatsApp</label>
            <input type="tel" placeholder="+1 555 000 0000" value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="form-field" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--subtext)] flex items-center gap-1">
                <Calendar size={10} /> Date
              </label>
              <input type="date" required value={form.travel_date}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => setForm({ ...form, travel_date: e.target.value })}
                className="form-field" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--subtext)] flex items-center gap-1">
                <Users size={10} /> People
              </label>
              <input type="number" min={1} max={50} value={form.travelers}
                onChange={(e) => setForm({ ...form, travelers: parseInt(e.target.value) || 1 })}
                className="form-field" />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-[var(--subtext)] flex items-center gap-1">
              <MessageSquare size={10} /> Special Requests
            </label>
            <textarea rows={3} placeholder="Accessibility needs, dietary requirements, etc."
              value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="form-field resize-none" />
          </div>

          {error && (
            <p className="text-xs text-red-500 bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-xl">{error}</p>
          )}

          <button type="submit" disabled={loading}
            className="btn-primary w-full justify-center py-3.5 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed">
            {loading ? "Sending…" : "Request Booking"}
          </button>
          <p className="text-center text-xs text-[var(--subtext)]">No payment yet — we confirm availability first</p>
        </>
      )}

      <style jsx>{`
        .form-field {
          width: 100%;
          padding: 10px 14px;
          border-radius: 12px;
          border: 1px solid var(--border);
          background: var(--bg);
          color: var(--text);
          font-size: 13px;
          font-family: inherit;
          outline: none;
          transition: border-color 0.2s;
        }
        .form-field:focus { border-color: var(--accent); }
        .form-field::placeholder { color: var(--subtext); }
      `}</style>
    </form>
  );

  return (
    <>
      {/* Sidebar card */}
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg2)] p-6">
        {/* Context header */}
        <div className="flex items-start gap-3 mb-5 pb-5 border-b border-[var(--border)]">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: "rgba(193,51,33,0.1)" }}>
            <Compass size={18} className="text-[var(--accent)]" />
          </div>
          <div>
            <p className="text-xs text-[var(--subtext)] uppercase tracking-wider font-bold">{type} · {destTitle}</p>
            <h3 className="font-bold text-[var(--text)] text-sm leading-snug mt-0.5">{activityTitle}</h3>
          </div>
        </div>

        {/* Quick book buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => setOpen(true)}
            className="btn-primary w-full justify-center py-3.5 rounded-xl"
          >
            Book This Experience
          </button>
          <a
            href={`https://wa.me/250785450266?text=Hi! I'm interested in booking: ${activityTitle} in ${destTitle}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm transition-all"
            style={{ background: "rgba(34,197,94,0.1)", color: "#16a34a", border: "1px solid rgba(34,197,94,0.3)" }}
          >
            <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Ask on WhatsApp
          </a>
        </div>

        <div className="mt-5 pt-5 border-t border-[var(--border)]">
          <p className="text-xs text-[var(--subtext)] text-center leading-relaxed">
            Free consultation · 24hr response · Local Rwanda experts
          </p>
        </div>
      </div>

      {/* Modal overlay */}
      {open && (
        <div
          className="booking-modal-overlay"
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
        >
          <div className="booking-modal-box">
            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--border)]">
              <div>
                <h2 className="font-black text-[var(--text)] text-lg">Book Experience</h2>
                <p className="text-xs text-[var(--subtext)] mt-0.5">{activityTitle} · {destTitle}</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-9 h-9 flex items-center justify-center rounded-xl text-[var(--subtext)] hover:bg-[var(--bg2)] transition-all"
              >
                <X size={18} />
              </button>
            </div>
            <div className="p-6">{FormContent}</div>
          </div>
        </div>
      )}
    </>
  );
}
