"use client";

import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User, CheckCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function RegisterForm() {
  const [form, setForm] = useState({ full_name: "", email: "", password: "", confirm: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirm) { setError("Passwords do not match."); return; }
    if (form.password.length < 8) { setError("Password must be at least 8 characters."); return; }
    setLoading(true);
    setError("");
    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: { data: { full_name: form.full_name, role: "client" } },
      });
      if (authError) throw new Error(authError.message);
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg2)] p-8 text-center">
        <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
        <h2 className="text-xl font-black text-[var(--text)] mb-2">Check your email!</h2>
        <p className="text-sm text-[var(--subtext)]">
          We&apos;ve sent a confirmation link to <strong className="text-[var(--text)]">{form.email}</strong>.
          Please verify your email to activate your account.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-[var(--border)] bg-[var(--bg2)] p-8 flex flex-col gap-5"
    >
      {/* Full Name */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold uppercase tracking-wider text-[var(--subtext)]">Full Name</label>
        <div className="relative">
          <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--subtext)] pointer-events-none" />
          <input
            type="text"
            required
            placeholder="Alice Johnson"
            value={form.full_name}
            onChange={(e) => setForm({ ...form, full_name: e.target.value })}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] text-sm outline-none focus:border-[var(--accent)] transition-colors placeholder:text-[var(--subtext)]"
          />
        </div>
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold uppercase tracking-wider text-[var(--subtext)]">Email Address</label>
        <div className="relative">
          <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--subtext)] pointer-events-none" />
          <input
            type="email"
            required
            placeholder="your@email.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] text-sm outline-none focus:border-[var(--accent)] transition-colors placeholder:text-[var(--subtext)]"
          />
        </div>
      </div>

      {/* Password */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold uppercase tracking-wider text-[var(--subtext)]">Password</label>
        <div className="relative">
          <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--subtext)] pointer-events-none" />
          <input
            type={showPass ? "text" : "password"}
            required
            placeholder="Min. 8 characters"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full pl-10 pr-10 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] text-sm outline-none focus:border-[var(--accent)] transition-colors placeholder:text-[var(--subtext)]"
          />
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--subtext)] hover:text-[var(--text)] transition-colors"
          >
            {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        </div>

        {/* Password strength hint */}
        {form.password.length > 0 && (
          <div className="flex gap-1.5 mt-1">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-1 flex-1 rounded-full transition-all duration-300"
                style={{
                  background:
                    form.password.length === 0
                      ? "var(--border)"
                      : form.password.length < 6
                      ? i === 0 ? "#ef4444" : "var(--border)"
                      : form.password.length < 8
                      ? i <= 1 ? "#f97316" : "var(--border)"
                      : form.password.length < 12
                      ? i <= 2 ? "#22c55e" : "var(--border)"
                      : "#16a34a",
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Confirm Password */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold uppercase tracking-wider text-[var(--subtext)]">Confirm Password</label>
        <div className="relative">
          <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--subtext)] pointer-events-none" />
          <input
            type={showPass ? "text" : "password"}
            required
            placeholder="Repeat password"
            value={form.confirm}
            onChange={(e) => setForm({ ...form, confirm: e.target.value })}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] text-sm outline-none focus:border-[var(--accent)] transition-colors placeholder:text-[var(--subtext)]"
            style={{
              borderColor:
                form.confirm.length > 0
                  ? form.confirm === form.password
                    ? "#22c55e"
                    : "#ef4444"
                  : undefined,
            }}
          />
        </div>
        {form.confirm.length > 0 && form.confirm !== form.password && (
          <p className="text-xs text-red-500">Passwords don&apos;t match</p>
        )}
      </div>

      {error && (
        <p className="text-xs text-red-500 bg-red-50 dark:bg-red-900/20 px-4 py-3 rounded-xl border border-red-200 dark:border-red-800">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="btn-primary py-3.5 justify-center rounded-xl w-full font-bold disabled:opacity-50 disabled:cursor-not-allowed mt-1"
      >
        {loading ? "Creating account…" : "Create Account"}
      </button>

      <p className="text-center text-xs text-[var(--subtext)]">
        By creating an account you agree to our{" "}
        <a href="/terms" className="text-[var(--accent)] hover:underline">Terms of Service</a>{" "}
        and{" "}
        <a href="/privacy-policy" className="text-[var(--accent)] hover:underline">Privacy Policy</a>.
      </p>
    </form>
  );
}
