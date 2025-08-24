"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Check, Cross } from "lucide-react";
import { useRef, useState } from "react";

type State = "idle" | "loading" | "success" | "error";

export default function Contacts() {
  const [state, setState] = useState<State>("idle");
  const [err, setErr] = useState<string | null>(null);

  // form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [hp, setHp] = useState(""); // honeypot

  const formRef = useRef<HTMLFormElement | null>(null);

  const disabled =
    state === "loading" ||
    // !name.trim() ||
    !email.trim() ||
    !message.trim() ||
    !!hp;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (disabled) return;
    setState("loading");
    setErr(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Something went wrong");
      }
      setState("success");
      formRef.current?.reset();
      setName("");
      setEmail("");
      setMessage("");
    } catch (e: unknown) {
      setState("error");
      const msg = e instanceof Error ? e.message : "Failed to send. Try again.";
      setErr(msg);
    } finally {
      setTimeout(() => setState("idle"), 4000);
    }
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white py-20 md:py-28"
    >
      {/* background blobs / particles */}
      <div className="pointer-events-none absolute -z-10 inset-0">
        <div className="absolute -top-10 left-10 w-72 h-72 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-purple-600/10 blur-3xl" />
        {/* tiny deterministic dots */}
        <div className="absolute inset-0">
          <span className="absolute left-[8%] top-[30%] w-1.5 h-1.5 rounded-full bg-blue-400/40 blur-[1px]" />
          <span className="absolute left-[40%] top-[20%] w-2 h-2 rounded-full bg-purple-400/40 blur-[1px]" />
          <span className="absolute left-[78%] top-[60%] w-1.5 h-1.5 rounded-full bg-blue-400/40 blur-[1px]" />
          <span className="absolute left-[25%] top-[70%] w-2 h-2 rounded-full bg-purple-400/40 blur-[1px]" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* header */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-extrabold text-center mb-4"
        >
          Let’s build something great
        </motion.h2>
        <p className="text-center text-gray-300 max-w-2xl mx-auto mb-14">
          Have an opportunity, idea, or problem to solve? Send a note—I will
          reply within 24 hours.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* left: contact cards */}
          <div className="space-y-6">
            <ContactCard
              title="Email"
              value="hemang2719@gmail.com"
              href="mailto:hemang2719@gmail.com"
            />
            <ContactCard
              title="Location"
              value="India (IST)"
              href="https://maps.apple.com/?q=India"
              external
            />
            <ContactCard
              title="LinkedIn"
              value="@hemang-patel"
              href="https://www.linkedin.com/in/hemang-patel-8a57311a5/"
              external
            />
            <ContactCard
              title="GitHub"
              value="@hemang-develops"
              href="https://github.com/Hemang-develops/"
              external
            />
          </div>

          {/* right: form */}
          <div className="lg:col-span-2">
            <div className="relative">
              {/* glow */}
              <div className="pointer-events-none absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-blue-500/20 to-purple-600/20 blur-2xl" />
              <div className="relative rounded-3xl border border-white/15 bg-white/10 backdrop-blur-xl shadow-2xl p-6 sm:p-8">
                <form ref={formRef} onSubmit={onSubmit} className="space-y-6">
                  <FloatingInput
                    id="name"
                    label="Your name"
                    type="text"
                    value={name}
                    onChange={setName}
                    autoComplete="name"
                  />
                  <FloatingInput
                    id="email"
                    label="Email address"
                    type="email"
                    value={email}
                    onChange={setEmail}
                    autoComplete="email"
                  />
                  <FloatingTextarea
                    id="message"
                    label="Your message"
                    value={message}
                    onChange={setMessage}
                    rows={6}
                  />

                  {/* honeypot (hidden from users/screenreaders) */}
                  <input
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="hidden"
                    value={hp}
                    onChange={(e) => setHp(e.target.value)}
                  />

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-gray-400">
                      By sending, you agree to be contacted back. No spam.
                    </p>
                    <motion.button
                      type="submit"
                      disabled={disabled}
                      whileHover={{ scale: disabled ? 1 : 1.03 }}
                      whileTap={{ scale: disabled ? 1 : 0.98 }}
                      className={[
                        "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl",
                        "bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium",
                        "shadow-lg hover:shadow-xl transition disabled:opacity-50 disabled:cursor-not-allowed",
                      ].join(" ")}
                    >
                      {state === "loading" ? (
                        <>
                          <Spinner />
                          Sending…
                        </>
                      ) : state === "success" ? (
                        <>
                          <Check />
                          Sent
                        </>
                      ) : state === "error" ? (
                        <>
                          <Cross />
                          Try again
                        </>
                      ) : (
                        "Send message"
                      )}
                    </motion.button>
                  </div>

                  <AnimatePresence>
                    {state === "error" && err && (
                      <motion.p
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="text-sm text-rose-300"
                      >
                        {err}
                      </motion.p>
                    )}
                    {state === "success" && (
                      <motion.p
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="text-sm text-emerald-300"
                      >
                        Thanks! I’ll get back to you shortly.
                      </motion.p>
                    )}
                  </AnimatePresence>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* footer badges */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-gray-400 text-xs">
          <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md py-3">
            Response <span className="text-white/90">~24h</span>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md py-3">
            Timezone <span className="text-white/90">IST (+05:30)</span>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md py-3">
            Status <span className="text-emerald-300">Open to work</span>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md py-3">
            Freelance <span className="text-white/90">Available</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- subcomponents ---------- */

function ContactCard({
  title,
  value,
  href,
  external,
}: {
  title: string;
  value: string;
  href: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="group relative block rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-lg shadow-2xl overflow-hidden"
    >
      <div className="pointer-events-none absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 blur-2xl transition" />
      <div className="relative">
        <div className="text-xs uppercase tracking-widest text-gray-400">
          {title}
        </div>
        <div className="mt-1 text-lg font-medium">{value}</div>
      </div>
    </a>
  );
}

function FloatingInput({
  id,
  label,
  type,
  value,
  onChange,
  autoComplete,
}: {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  autoComplete?: string;
}) {
  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        className="peer w-full rounded-xl border border-white/20 
            bg-white/5 px-4 pt-6 pb-2 text-white 
            placeholder-transparent outline-none backdrop-blur-md 
            focus:border-blue-400 focus:ring-1 focus:ring-blue-400/60"
        placeholder={label}
        required
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-4 top-2 text-sm text-gray-400 transition-all 
          peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500
          peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-300"
      >
        {label}
      </label>
    </div>
  );
}

function FloatingTextarea({
  id,
  label,
  value,
  onChange,
  rows = 5,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <div className="relative">
      <textarea
        id={id}
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="peer w-full rounded-xl border border-white/20 
            bg-white/5 px-4 pt-6 pb-2 text-white 
            placeholder-transparent outline-none backdrop-blur-md 
            focus:border-blue-400 focus:ring-1 focus:ring-blue-400/60 resize-y"
        placeholder={label}
        required
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-4 top-2 text-sm text-gray-400 transition-all
          peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500
          peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-300"
      >
        {label}
      </label>
    </div>
  );
}

function Spinner() {
  return (
    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
      <circle
        className="opacity-30"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
      />
      <path
        className="opacity-80"
        d="M4 12a8 8 0 0 1 8-8"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
      />
    </svg>
  );
}
