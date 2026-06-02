"use client";

import { useState } from "react";
import { CheckCircle, ArrowRight, ArrowLeft } from "lucide-react";
import { destinations } from "@/lib/data";

const DEST_OPTIONS = destinations.map((d) => ({ value: d.slug, label: d.title }));

const TRAVEL_STYLES = [
  "Wildlife & Safari",
  "Cultural & History",
  "Adventure & Hiking",
  "Luxury & Relaxation",
  "Budget Backpacking",
  "Family Travel",
  "Honeymoon",
  "Photography",
];

const DURATION_OPTIONS = [
  "3–4 days",
  "5–7 days",
  "8–10 days",
  "11–14 days",
  "2+ weeks",
  "Flexible",
];

const BUDGET_OPTIONS = [
  { value: "budget", label: "Budget", sub: "< $500 total" },
  { value: "mid", label: "Mid-range", sub: "$500 – $2,000" },
  { value: "luxury", label: "Luxury", sub: "$2,000 – $5,000" },
  { value: "ultra", label: "Ultra-luxury", sub: "$5,000+" },
];

type FormData = {
  destinations: string[];
  travel_style: string[];
  duration: string;
  travel_date: string;
  group_size: string;
  budget: string;
  full_name: string;
  email: string;
  phone: string;
  notes: string;
};

const EMPTY: FormData = {
  destinations: [],
  travel_style: [],
  duration: "",
  travel_date: "",
  group_size: "2",
  budget: "mid",
  full_name: "",
  email: "",
  phone: "",
  notes: "",
};

const STEPS = ["Destinations", "Style & Duration", "Budget & Dates", "Your Details"];

export default function PlanForm() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(EMPTY);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const toggle = (key: "destinations" | "travel_style", val: string) => {
    setForm((f) => ({
      ...f,
      [key]: f[key].includes(val) ? f[key].filter((v) => v !== val) : [...f[key], val],
    }));
  };

  const set = (key: keyof FormData, val: string) => setForm((f) => ({ ...f, [key]: val }));

  const canNext = () => {
    if (step === 0) return form.destinations.length > 0;
    if (step === 1) return form.travel_style.length > 0 && form.duration !== "";
    if (step === 2) return form.budget !== "" && form.travel_date !== "";
    if (step === 3) return form.full_name !== "" && form.email !== "";
    return true;
  };

  const submit = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "custom", ...form }),
      });
      if (!res.ok) throw new Error();
      setDone(true);
    } catch {
      setError("Submission failed. Please email us at hillyagency0@gmail.com");
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="text-center py-20 rounded-2xl border border-[var(--border)] bg-[var(--bg2)]">
        <CheckCircle size={60} className="text-green-500 mx-auto mb-5" />
        <h2 className="text-3xl font-black text-[var(--text)] mb-3">Trip Request Received!</h2>
        <p className="text-[var(--subtext)] max-w-sm mx-auto text-base">
          Our Rwanda travel expert will review your preferences and send a custom itinerary within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg2)] overflow-hidden">
      {/* Progress */}
      <div className="flex">
        {STEPS.map((s, i) => (
          <div
            key={s}
            className={`flex-1 py-3.5 text-center text-xs font-bold transition-all border-b-2 ${
              i === step
                ? "border-[var(--accent)] text-[var(--accent)] bg-[var(--accent)]/5"
                : i < step
                ? "border-green-500 text-green-600 dark:text-green-400"
                : "border-[var(--border)] text-[var(--subtext)]"
            }`}
          >
            <span className="hidden sm:inline">{s}</span>
            <span className="sm:hidden">{i + 1}</span>
          </div>
        ))}
      </div>

      <div className="p-8">
        {/* STEP 0: Destinations */}
        {step === 0 && (
          <div>
            <h2 className="text-xl font-black text-[var(--text)] mb-2">Where do you want to go?</h2>
            <p className="text-sm text-[var(--subtext)] mb-6">Select all destinations that interest you.</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {DEST_OPTIONS.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => toggle("destinations", value)}
                  className={`px-4 py-3 rounded-xl text-sm font-semibold border transition-all text-left ${
                    form.destinations.includes(value)
                      ? "bg-[var(--accent)] text-white border-[var(--accent)]"
                      : "bg-[var(--bg)] border-[var(--border)] text-[var(--text)] hover:border-[var(--accent)]"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 1: Style + Duration */}
        {step === 1 && (
          <div className="flex flex-col gap-7">
            <div>
              <h2 className="text-xl font-black text-[var(--text)] mb-2">What&apos;s your travel style?</h2>
              <p className="text-sm text-[var(--subtext)] mb-5">Choose all that apply.</p>
              <div className="flex flex-wrap gap-2">
                {TRAVEL_STYLES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => toggle("travel_style", s)}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
                      form.travel_style.includes(s)
                        ? "bg-[var(--accent)] text-white border-[var(--accent)]"
                        : "bg-[var(--bg)] border-[var(--border)] text-[var(--text)] hover:border-[var(--accent)]"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-base font-black text-[var(--text)] mb-4">How long is your trip?</h3>
              <div className="flex flex-wrap gap-2">
                {DURATION_OPTIONS.map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => set("duration", d)}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
                      form.duration === d
                        ? "bg-[var(--accent)] text-white border-[var(--accent)]"
                        : "bg-[var(--bg)] border-[var(--border)] text-[var(--text)] hover:border-[var(--accent)]"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Budget + Dates */}
        {step === 2 && (
          <div className="flex flex-col gap-7">
            <div>
              <h2 className="text-xl font-black text-[var(--text)] mb-2">What&apos;s your budget range?</h2>
              <div className="grid grid-cols-2 gap-3 mt-4">
                {BUDGET_OPTIONS.map(({ value, label, sub }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => set("budget", value)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      form.budget === value
                        ? "bg-[var(--accent)] text-white border-[var(--accent)]"
                        : "bg-[var(--bg)] border-[var(--border)] hover:border-[var(--accent)]"
                    }`}
                  >
                    <p className="font-bold text-sm">{label}</p>
                    <p className={`text-xs mt-0.5 ${form.budget === value ? "text-white/70" : "text-[var(--subtext)]"}`}>{sub}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="plan-label">Approximate Travel Date</label>
                <input
                  type="date"
                  value={form.travel_date}
                  onChange={(e) => set("travel_date", e.target.value)}
                  className="plan-input"
                />
              </div>
              <div>
                <label className="plan-label">Group Size</label>
                <input
                  type="number"
                  min={1}
                  max={100}
                  value={form.group_size}
                  onChange={(e) => set("group_size", e.target.value)}
                  className="plan-input"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Contact */}
        {step === 3 && (
          <div className="flex flex-col gap-5">
            <h2 className="text-xl font-black text-[var(--text)]">Almost there! Your details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="plan-label">Full Name *</label>
                <input type="text" required placeholder="Alice Johnson" value={form.full_name}
                  onChange={(e) => set("full_name", e.target.value)} className="plan-input" />
              </div>
              <div>
                <label className="plan-label">Email Address *</label>
                <input type="email" required placeholder="alice@example.com" value={form.email}
                  onChange={(e) => set("email", e.target.value)} className="plan-input" />
              </div>
            </div>
            <div>
              <label className="plan-label">Phone / WhatsApp</label>
              <input type="tel" placeholder="+1 555 000 0000" value={form.phone}
                onChange={(e) => set("phone", e.target.value)} className="plan-input" />
            </div>
            <div>
              <label className="plan-label">Anything else we should know?</label>
              <textarea rows={4} placeholder="Special occasions, dietary needs, accessibility requirements, specific experiences you must have…"
                value={form.notes} onChange={(e) => set("notes", e.target.value)} className="plan-input resize-none" />
            </div>
          </div>
        )}

        {error && (
          <p className="mt-4 text-xs text-red-500 bg-red-50 dark:bg-red-950/30 px-4 py-2.5 rounded-xl">{error}</p>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-[var(--border)]">
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold border border-[var(--border)] text-[var(--text)] hover:bg-[var(--bg)] transition-all ${
              step === 0 ? "invisible" : ""
            }`}
          >
            <ArrowLeft size={14} />
            Back
          </button>

          {step < STEPS.length - 1 ? (
            <button
              type="button"
              onClick={() => setStep((s) => s + 1)}
              disabled={!canNext()}
              className="btn-primary flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next
              <ArrowRight size={14} />
            </button>
          ) : (
            <button
              type="button"
              onClick={submit}
              disabled={loading || !canNext()}
              className="btn-primary flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? "Sending…" : "Submit My Request"}
              {!loading && <ArrowRight size={14} />}
            </button>
          )}
        </div>
      </div>

      <style jsx>{`
        .plan-label {
          display: block;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--subtext);
          margin-bottom: 6px;
        }
        .plan-input {
          width: 100%;
          padding: 10px 14px;
          border-radius: 12px;
          border: 1px solid var(--border);
          background: var(--bg);
          color: var(--text);
          font-size: 14px;
          font-family: inherit;
          outline: none;
          transition: border-color 0.2s;
        }
        .plan-input:focus {
          border-color: var(--accent);
        }
      `}</style>
    </div>
  );
}
