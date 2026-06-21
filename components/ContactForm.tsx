"use client";

import { useState } from "react";

/* ------------------------------------------------------------------ */
/*  Dane kontrolne formularza                                          */
/* ------------------------------------------------------------------ */
const TOPICS = [
  { id: "purchase", label: "Zakup samochodu", icon: "directions_car" },
  { id: "concierge", label: "Usługa konsjerż", icon: "support_agent" },
  { id: "financing", label: "Finansowanie / leasing", icon: "payments" },
  { id: "concierge_visit", label: "Prywatne oględziny", icon: "calendar_month" },
  { id: "sell", label: "Sprzedaż / komis", icon: "swap_horiz" },
  { id: "other", label: "Inna sprawa", icon: "forum" },
] as const;

type TopicId = (typeof TOPICS)[number]["id"];

interface FormState {
  name: string;
  email: string;
  phone: string;
  topic: TopicId | "";
  message: string;
  consent: boolean;
}

const EMPTY: FormState = {
  name: "",
  email: "",
  phone: "",
  topic: "",
  message: "",
  consent: false,
};

/* Prosta, lokalna walidacja — bez zależności zewnętrznych. */
function validate(state: FormState): Partial<Record<keyof FormState, string>> {
  const errors: Partial<Record<keyof FormState, string>> = {};

  if (state.name.trim().length < 2) {
    errors.name = "Podaj imię i nazwisko.";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email)) {
    errors.email = "Nieprawidłowy adres e-mail.";
  }
  // Telefon opcjonalny, ale jeśli podany — 7+ cyfr.
  const digits = state.phone.replace(/\D/g, "");
  if (state.phone && digits.length < 7) {
    errors.phone = "Numer wydaje się zbyt krótki.";
  }
  if (!state.topic) {
    errors.topic = "Wybierz temat.";
  }
  if (state.message.trim().length < 10) {
    errors.message = "Treść wiadomości jest zbyt krótka.";
  }
  if (!state.consent) {
    errors.consent = "Zgoda jest wymagana.";
  }
  return errors;
}

/* ------------------------------------------------------------------ */
/*  Komponent                                                          */
/* ------------------------------------------------------------------ */
export default function ContactForm() {
  const [state, setState] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<ReturnType<typeof validate>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [sending, setSending] = useState(false);
  const [ticket, setTicket] = useState("");

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setState((cur) => ({ ...cur, [key]: value }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next = validate(state);
    setErrors(next);
    setTouched({
      name: true,
      email: true,
      phone: true,
      topic: true,
      message: true,
      consent: true,
    });
    if (Object.keys(next).length > 0) return;

    // Symulacja wysyłki — w prawdziwym świecie tu byłby fetch do API.
    setSending(true);
    window.setTimeout(() => {
      setSending(false);
      setTicket(`LUXE-INQ-${Math.floor(Math.random() * 90000 + 10000)}`);
    }, 900);
  };

  /* ----------------------- EKRAN POTWIERDZENIA ----------------------- */
  if (ticket) {
    return (
      <div className="glass rounded-4xl p-glass-padding text-center relative overflow-hidden gold-glow">
        <div className="absolute inset-0 radial-surface pointer-events-none" />
        <div className="relative z-10">
          <span className="material-symbols-outlined text-primary-gold text-7xl! mb-4 inline-block">
            mark_email_read
          </span>
          <h3 className="font-display-lg text-display-lg mb-3">
            Dziękujemy
          </h3>
          <p className="text-on-surface-variant text-body-md font-body-md mb-6 max-w-md mx-auto">
            Wiadomość wpłynęła do naszego atelier. Osobisty konsjerż odezwie się
            w ciągu <span className="text-primary-gold">24 godzin</span> — zwykle
            znacznie szybciej.
          </p>
          <div className="glass rounded-2xl p-glass-padding inline-flex items-center gap-4 mb-6">
            <span className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-widest">
              Numer zgłoszenia
            </span>
            <span className="font-data-lg text-data-lg text-primary-gold">
              {ticket}
            </span>
          </div>
          <div>
            <button
              onClick={() => {
                setState(EMPTY);
                setErrors({});
                setTouched({});
                setTicket("");
              }}
              className="glass px-6 py-3 rounded-xl font-label-sm text-label-sm text-on-surface hover:bg-white/10 transition-all inline-flex items-center gap-2"
            >
              <span className="material-symbols-outlined">edit</span>
              Wyślij kolejną wiadomość
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ----------------------- FORMULARZ ----------------------- */
  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="glass rounded-4xl p-glass-padding relative overflow-hidden"
    >
      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-primary-gold/10 blur-3xl pointer-events-none" />
      <div className="relative z-10 space-y-6">
        {/* Wiersz: imię + e-mail */}
        <div className="grid md:grid-cols-2 gap-4">
          <Field
            label="Imię i nazwisko"
            icon="badge"
            error={touched.name ? errors.name : undefined}
          >
            <input
              type="text"
              value={state.name}
              onChange={(e) => set("name", e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, name: true }))}
              placeholder="Jan Kowalski"
              className="field-input"
            />
          </Field>
          <Field
            label="Adres e-mail"
            icon="mail"
            error={touched.email ? errors.email : undefined}
          >
            <input
              type="email"
              value={state.email}
              onChange={(e) => set("email", e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, email: true }))}
              placeholder="jan@domena.pl"
              className="field-input"
            />
          </Field>
        </div>

        {/* Telefon — opcjonalny */}
        <Field
          label="Telefon (opcjonalnie)"
          icon="call"
          error={touched.phone ? errors.phone : undefined}
        >
          <input
            type="tel"
            value={state.phone}
            onChange={(e) => set("phone", e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
            placeholder="+48 600 000 000"
            className="field-input"
          />
        </Field>

        {/* Wybór tematu — siatka kafelków */}
        <div>
          <label className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-widest mb-3 block">
            Czym możemy pomóc?
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {TOPICS.map((t) => {
              const on = state.topic === t.id;
              return (
                <button
                  type="button"
                  key={t.id}
                  onClick={() => {
                    set("topic", t.id);
                    setTouched((tt) => ({ ...tt, topic: true }));
                  }}
                  className={`flex items-center gap-3 rounded-2xl px-4 py-3 border transition-all text-left ${
                    on
                      ? "bg-primary-gold/10 border-primary-gold/40 text-primary-gold"
                      : "bg-white/2 border-white/10 hover:bg-white/6 text-on-surface"
                  }`}
                >
                  <span className="material-symbols-outlined text-xl!">{t.icon}</span>
                  <span className="text-label-sm font-label-sm leading-tight">
                    {t.label}
                  </span>
                </button>
              );
            })}
          </div>
          {touched.topic && errors.topic && (
            <p className="text-error text-label-sm font-label-sm mt-2">
              {errors.topic}
            </p>
          )}
        </div>

        {/* Wiadomość */}
        <Field
          label="Wiadomość"
          icon="chat"
          error={touched.message ? errors.message : undefined}
        >
          <textarea
            value={state.message}
            onChange={(e) => set("message", e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, message: true }))}
            rows={5}
            placeholder="Opisz, czego szukasz lub czym możemy się zająć. Im więcej szczegółów, tym precyzyjniejsza odpowiedź."
            className="field-input resize-none"
          />
        </Field>

        {/* Zgoda */}
        <button
          type="button"
          onClick={() => {
            set("consent", !state.consent);
            setTouched((t) => ({ ...t, consent: true }));
          }}
          className="flex items-start gap-3 text-left w-full"
        >
          <span
            className={`material-symbols-outlined mt-0.5 transition-colors ${
              state.consent ? "text-primary-gold" : "text-on-surface-variant"
            }`}
          >
            {state.consent ? "check_box" : "check_box_outline_blank"}
          </span>
          <span className="text-label-sm font-label-sm text-on-surface-variant">
            Wyrażam zgodę na przetwarzanie moich danych osobowych przez LUXE AUTO
            w celu odpowiedzi na to zapytanie, zgodnie z polityką prywatności.
          </span>
        </button>
        {touched.consent && errors.consent && (
          <p className="text-error text-label-sm font-label-sm -mt-2">
            {errors.consent}
          </p>
        )}

        {/* Przycisk wysyłki */}
        <button
          type="submit"
          disabled={sending}
          className="w-full bg-primary-gold text-on-primary-gold px-6 py-4 rounded-xl font-data-lg text-data-lg gold-glow gold-glow-hover transition-all flex items-center justify-center gap-3 group disabled:opacity-60 disabled:cursor-wait"
        >
          {sending ? (
            <>
              <span className="material-symbols-outlined animate-spin">progress_activity</span>
              Wysyłanie…
            </>
          ) : (
            <>
              Wyślij zapytanie
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                send
              </span>
            </>
          )}
        </button>

        <p className="text-label-sm font-label-sm text-on-surface-variant text-center flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-base">lock</span>
          Twoje dane są szyfrowane i nigdy nie udostępniane stronom trzecim.
        </p>
      </div>

      {/* Lokalne style pól wejściowych — utrzymują paletę aplikacji */}
      <style jsx>{`
        :global(.field-input) {
          width: 100%;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 0.75rem;
          padding: 0.75rem 1rem;
          color: #e5e2e1;
          font-family: var(--font-hanken);
          font-size: 16px;
          line-height: 24px;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        :global(.field-input::placeholder) {
          color: rgba(208, 197, 175, 0.5);
        }
        :global(.field-input:focus) {
          border-color: rgba(242, 202, 80, 0.5);
          box-shadow: 0 0 0 3px rgba(242, 202, 80, 0.12);
        }
      `}</style>
    </form>
  );
}

/* ------------------------------------------------------------------ */
/*  Podkomponent pola z etykietą, ikoną i ewentualnym błędem           */
/* ------------------------------------------------------------------ */
function Field({
  label,
  icon,
  error,
  children,
}: {
  label: string;
  icon: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-widest mb-3 flex items-center gap-2">
        <span className="material-symbols-outlined text-base text-primary-gold">
          {icon}
        </span>
        {label}
      </label>
      {children}
      {error && (
        <p className="text-error text-label-sm font-label-sm mt-2 flex items-center gap-1">
          <span className="material-symbols-outlined text-sm">error</span>
          {error}
        </p>
      )}
    </div>
  );
}
