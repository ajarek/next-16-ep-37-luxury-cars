"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { CollectionCar } from "@/lib/cars";

/* ------------------------------------------------------------------ */
/*  Typy pomocnicze                                                    */
/* ------------------------------------------------------------------ */
interface Option {
  id: string;
  label: string;
  detail: string;
  price: number; // delta w USD
  swatch?: string; // dla lakierów
}

interface Pkg {
  id: string;
  label: string;
  detail: string;
  icon: string;
  price: number;
}

/* ------------------------------------------------------------------ */
/*  Opcje konfiguracji — w pełni dane, by UI było autentyczne          */
/* ------------------------------------------------------------------ */
const PAINTS = (accent: string): Option[] => [
  { id: "signature", label: "Sygnatura marki", detail: "Odcień charakterystyczny", price: 0, swatch: accent },
  { id: "onyx", label: "Onyx Noir", detail: "Głęboka czerń perłowa", price: 0, swatch: "#0a0a0a" },
  { id: "arctic", label: "Arctic Bianco", detail: "Perłowa biel", price: 0, swatch: "#ececec" },
  { id: "graphite", label: "Graphite Titan", detail: "Metalizowany grafit", price: 8000, swatch: "#3a3a3a" },
  { id: "sapphire", label: "Sapphire Blu", detail: "Metalizowany granat", price: 12000, swatch: "#10204a" },
  { id: "crimson", label: "Crimson Rosso", detail: "Klasyczna czerwień wyścigowa", price: 12000, swatch: "#7a0a0a" },
  { id: "bespoke", label: "Bespoke Gold", detail: "Lakier na zamówienie — ręczna aplikacja", price: 25000, swatch: "#f2ca50" },
];

const WHEELS: Option[] = [
  { id: "std", label: "Standard 20\"", detail: "Stopy aluminiowe, klasyczny wykończ.", price: 0 },
  { id: "sport", label: "Sport 21\"", detail: "Pięcioramienne, satynowe", price: 6000 },
  { id: "forged", label: "Forged 22\"", detail: "Kute, czarno-matowe", price: 18000 },
  { id: "magnesium", label: "Track Magnesium", detail: "Magnezowe, ekstremalnie lekkie", price: 35000 },
];

const INTERIORS: Option[] = [
  { id: "nappa", label: "Nappa — Onyx", detail: "Czarna skóra Nappa", price: 0, swatch: "#1a1a1a" },
  { id: "alcantara", label: "Alcantara — Carbon", detail: "Mikrozamsz z akcentami włókna", price: 8000, swatch: "#262626" },
  { id: "semi", label: "Semi-Aniline — Saddle", detail: "Skóra półanilinowa, koniak", price: 22000, swatch: "#7a4a1f" },
  { id: "bespoke", label: "Bespoke Quilted — Cream", detail: "Pikowana, kremowa, ręczne szycie", price: 40000, swatch: "#d9c9a8" },
];

const PACKAGES: Pkg[] = [
  { id: "carbon", label: "Pakiet Carbon", detail: "Aerodynamika i detale z włókna węglowego", icon: "air", price: 45000 },
  { id: "exhaust", label: "Sport Exhaust", detail: "Tytonowy dźwięk, regulowany wydech", icon: "graphic_eq", price: 12000 },
  { id: "audio", label: "Bowers & Wilkins", detail: "System audio 1500W, 22 głośniki", icon: "speaker", price: 18000 },
  { id: "telemetry", label: "Track Telemetry", detail: "Telemetria torowa i rejestrator danych", icon: "analytics", price: 9000 },
  { id: "ceramic", label: "Hamulce ceramiczne", detail: "Karbidowo-ceramiczne tarcze, odporniejsze na fading", icon: "disc_full", price: 28000 },
  { id: "ppf", label: "Powłoka ochronna PPF", detail: "Niewidzialna folia chroniąca lakier", icon: "shield", price: 15000 },
];

const DELIVERY: Option[] = [
  { id: "salon", label: "Odbiór w salonie", detail: "Osobiście, z ceremonią przekazania", price: 0 },
  { id: "home", label: "Dostawa do domu", detail: "Zamknięty transport w całej Polsce", price: 2500 },
  { id: "concierge", label: "Concierge VIP", detail: "Biała rękawiczka, indywidualny konsjerż", price: 8000 },
];

const STEPS = [
  { id: "paint", label: "Lakier", icon: "palette" },
  { id: "wheels", label: "Felgi", icon: "albums" },
  { id: "interior", label: "Wnętrze", icon: "seat" },
  { id: "packages", label: "Pakiety", icon: "extension" },
  { id: "delivery", label: "Odbiór", icon: "local_shipping" },
] as const;

type StepId = (typeof STEPS)[number]["id"];

/* ------------------------------------------------------------------ */
/*  Pomocnicze — formatowanie ceny i parsing ceny bazowej              */
/* ------------------------------------------------------------------ */
function formatUSD(value: number): string {
  // 1234567 -> "1 234 567 USD" — spacja jako separator tysięcy.
  return `${value.toLocaleString("fr-FR").replace(/\u202f/g, " ")} USD`;
}

function parseBasePrice(raw: string): number {
  // "2 500 000 USD" -> 2500000. W razie niepowodzenia wartość awaryjna.
  const digits = raw.replace(/[^\d]/g, "");
  const n = Number(digits);
  return Number.isFinite(n) && n > 0 ? n : 0;
}

/* ------------------------------------------------------------------ */
/*  Komponent                                                          */
/* ------------------------------------------------------------------ */
export default function Configurator({ car }: { car: CollectionCar }) {
  const basePrice = useMemo(() => parseBasePrice(car.price), [car.price]);

  // Wybory użytkownika
  const [paintId, setPaintId] = useState("signature");
  const [wheelId, setWheelId] = useState("std");
  const [interiorId, setInteriorId] = useState("nappa");
  const [pkgIds, setPkgIds] = useState<string[]>(["carbon"]); // karbon domyślnie
  const [deliveryId, setDeliveryId] = useState("salon");
  const [step, setStep] = useState<StepId>("paint");
  const [placed, setPlaced] = useState(false);
  const [reservation, setReservation] = useState("");

  const paints = useMemo(() => PAINTS(car.accent), [car.accent]);
  const paint = paints.find((p) => p.id === paintId)!;
  const wheel = WHEELS.find((w) => w.id === wheelId)!;
  const interior = INTERIORS.find((i) => i.id === interiorId)!;
  const delivery = DELIVERY.find((d) => d.id === deliveryId)!;
  const selectedPkgs = PACKAGES.filter((p) => pkgIds.includes(p.id));

  const optionsTotal =
    paint.price + wheel.price + interior.price + delivery.price;
  const pkgsTotal = selectedPkgs.reduce((sum, p) => sum + p.price, 0);
  const total = basePrice + optionsTotal + pkgsTotal;

  const togglePkg = (id: string) =>
    setPkgIds((cur) =>
      cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]
    );

  // Aktywny lakier dyktuje tło pod autem — subtelna, spójna poświata.
  const stageStyle = {
    backgroundImage: `
      radial-gradient(circle at 50% 30%, ${paint.swatch}40 0%, transparent 45%),
      radial-gradient(circle at 80% 90%, ${car.accent}33 0%, transparent 50%),
      linear-gradient(160deg, #0e0e0e 0%, #1c1b1b 100%)
    `,
  } as React.CSSProperties;

  /* ----------------------- POTWIERDZENIE ZAMÓWIENIA ----------------------- */
  if (placed) {
    return (
      <div className="relative min-h-[80vh] max-w-3xl mx-auto mt-8 flex items-center justify-center px-margin-page">
        <div className="glass rounded-4xl p-10 text-center relative overflow-hidden gold-glow">
          <div className="absolute inset-0 radial-surface pointer-events-none" />
          <div className="relative z-10">
            <span className="material-symbols-outlined text-primary-gold text-7xl! mb-6 inline-block">
              verified
            </span>
            <h1 className="font-display-lg text-display-lg mb-4">
              Zamówienie złożone
            </h1>
            <p className="text-on-surface-variant text-body-md font-body-md mb-2">
              Twój <span className="text-primary-gold">{car.name} {car.variant}</span> trafił do manufaktury.
            </p>
            <p className="text-on-surface-variant text-body-md font-body-md mb-8">
              Konsjerż skontaktuje się w ciągu 24 godzin, by potwierdzić każdy detal.
            </p>
            <div className="glass rounded-2xl p-glass-padding inline-flex items-center gap-4 mb-8">
              <span className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-widest">
                Numer rezerwacji
              </span>
              <span className="font-data-lg text-data-lg text-primary-gold">
                {reservation}
              </span>
            </div>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link
                href="/collection"
                className="glass px-6 py-3 rounded-xl font-label-sm text-label-sm text-on-surface hover:bg-white/10 transition-all flex items-center gap-2"
              >
                <span className="material-symbols-outlined">grid_view</span>
                Wróć do kolekcji
              </Link>
              <Link
                href="/"
                className="bg-primary-gold text-on-primary-gold px-6 py-3 rounded-xl font-label-sm text-label-sm gold-glow-hover transition-all flex items-center gap-2"
              >
                <span className="material-symbols-outlined">home</span>
                Strona główna
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ----------------------- KONFIGURATOR ----------------------- */
  return (
    <div className="relative min-h-screen max-w-7xl mx-auto mt-8">
      {/* Breadcrumb + nagłówek etapu */}
      <div className="flex items-center gap-3 mb-6">
        <Link
          href={`/collection/${car.id}`}
          className="text-on-surface-variant hover:text-on-surface text-label-sm font-label-sm flex items-center gap-1 transition-colors"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          {car.name}
        </Link>
        <span className="text-on-surface-variant text-label-sm font-label-sm">/</span>
        <span className="text-primary-gold text-label-sm font-label-sm uppercase tracking-widest">
          Konfigurator
        </span>
      </div>

      <div className="grid lg:grid-cols-[1fr_380px] gap-gutter">
        {/* ===================== LEWA KOLUMNA: SCENA + OPCJE ===================== */}
        <div className="space-y-gutter">
          {/* Scena z autem — lakier zmienia poświatę */}
          <section
            className="relative overflow-hidden rounded-4xl transition-[background-image] duration-700"
            style={stageStyle}
          >
            {/* Blask wokół auta */}
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-28rem h-28rem rounded-full bg-white/5 blur-3xl pointer-events-none" />

            {/* Monogram w tle */}
            <span className="absolute inset-0 flex items-center justify-center font-data-lg text-[18rem] leading-none text-white/3 select-none pointer-events-none">
              {car.monogram}
            </span>

            <div className="relative z-10 aspect-16/10 flex items-center justify-center">
              <div className="relative w-full h-full">
                <Image
                  src={car.image}
                  alt={`${car.name} ${car.variant}`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 65vw"
                  className="object-contain drop-shadow-2xl"
                />
                {/* Refleks podłogi */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-2/3 h-1/4 bg-black/40 blur-2xl rounded-full" />
              </div>
            </div>

            {/* Etykieta aktywnego lakieru */}
            <div className="relative z-10 flex items-center justify-between px-margin-page pb-6">
              <div className="flex items-center gap-3">
                <span
                  className="w-7 h-7 rounded-full border border-white/20 shrink-0"
                  style={{ backgroundColor: paint.swatch }}
                />
                <div>
                  <div className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-widest">
                    Aktywny lakier
                  </div>
                  <div className="font-data-lg text-data-lg text-on-surface">
                    {paint.label}
                  </div>
                </div>
              </div>
              <span className="glass px-3 py-1 rounded-full text-label-sm font-label-sm text-primary-gold uppercase tracking-widest hidden sm:block">
                {car.year}
              </span>
            </div>
          </section>

          {/* Krok-nawigacja (zakładki) */}
          <div className="glass rounded-2xl p-2 flex items-center gap-1 overflow-x-auto">
            {STEPS.map((s, i) => {
              const active = step === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setStep(s.id)}
                  className={`flex-1 min-w-max flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-label-sm text-label-sm transition-all ${
                    active
                      ? "bg-primary-gold text-on-primary-gold gold-glow"
                      : "text-on-surface-variant hover:bg-white/5"
                  }`}
                >
                  <span className="material-symbols-outlined text-base">{s.icon}</span>
                  <span className="hidden sm:inline">{s.label}</span>
                  <span className="sm:hidden">{i + 1}</span>
                </button>
              );
            })}
          </div>

          {/* Panel aktywnej sekcji */}
          <section className="glass rounded-4xl p-glass-padding min-h-[320px]">
            {/* LAKIER */}
            {step === "paint" && (
              <OptionGrid
                title="Lakier nadwozia"
                subtitle="Sygnatura marki bez dopłaty. Pozostałe odcienie — lakierowane ręcznie."
                options={paints}
                selectedId={paintId}
                onSelect={setPaintId}
                renderSwatch={(o) => (
                  <span
                    className="w-12 h-12 rounded-full border border-white/20 shrink-0"
                    style={{ backgroundColor: o.swatch }}
                  />
                )}
              />
            )}

            {/* FELGI */}
            {step === "wheels" && (
              <OptionGrid
                title="Felgi i wykończenie"
                subtitle="Lżejsze felgi poprawiają zwrotność i skracają czas 0–100."
                options={WHEELS}
                selectedId={wheelId}
                onSelect={setWheelId}
                icon="albums"
              />
            )}

            {/* WNĘTRZE */}
            {step === "interior" && (
              <OptionGrid
                title="Wnętrze i materiały"
                subtitle="Każde wnętrze szyte ręcznie w naszej manufakturze."
                options={INTERIORS}
                selectedId={interiorId}
                onSelect={setInteriorId}
                renderSwatch={(o) => (
                  <span
                    className="w-12 h-12 rounded-full border border-white/20 shrink-0"
                    style={{ backgroundColor: o.swatch }}
                  />
                )}
              />
            )}

            {/* PAKIETY */}
            {step === "packages" && (
              <div>
                <SectionHead
                  icon="extension"
                  title="Pakiety i dodatki"
                  subtitle="Wybierz tyle, ile zechcesz — każdy wzbogaca charakter auta."
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter mt-6">
                  {PACKAGES.map((p) => {
                    const on = pkgIds.includes(p.id);
                    return (
                      <button
                        key={p.id}
                        onClick={() => togglePkg(p.id)}
                        className={`text-left rounded-2xl p-glass-padding border transition-all flex gap-4 items-start ${
                          on
                            ? "bg-primary-gold/10 border-primary-gold/40"
                            : "bg-white/2 border-white/10 hover:bg-white/6"
                        }`}
                      >
                        <span
                          className={`material-symbols-outlined ${
                            on ? "text-primary-gold" : "text-on-surface-variant"
                          }`}
                        >
                          {p.icon}
                        </span>
                        <div className="flex-1">
                          <div className="flex items-center justify-between gap-3">
                            <h4 className="font-data-lg text-data-lg text-on-surface">
                              {p.label}
                            </h4>
                            <span
                              className={`material-symbols-outlined transition-transform ${
                                on ? "text-primary-gold rotate-0" : "text-on-surface-variant rotate-45"
                              }`}
                            >
                              {on ? "check_circle" : "add_circle"}
                            </span>
                          </div>
                          <p className="text-label-sm font-label-sm text-on-surface-variant mt-1">
                            {p.detail}
                          </p>
                          <div className="font-data-lg text-data-lg text-primary-gold mt-2">
                            +{formatUSD(p.price)}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ODBIÓR */}
            {step === "delivery" && (
              <OptionGrid
                title="Sposób przekazania"
                subtitle="Ceremonia przekazania jest częścią doświadczenia LUXE AUTO."
                options={DELIVERY}
                selectedId={deliveryId}
                onSelect={setDeliveryId}
                icon="local_shipping"
              />
            )}
          </section>

          {/* Nawigacja między krokami */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                const idx = STEPS.findIndex((s) => s.id === step);
                if (idx > 0) setStep(STEPS[idx - 1].id);
              }}
              disabled={step === STEPS[0].id}
              className="glass px-5 py-3 rounded-xl font-label-sm text-label-sm text-on-surface hover:bg-white/10 transition-all flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <span className="material-symbols-outlined">arrow_back</span>
              Wstecz
            </button>
            <button
              onClick={() => {
                const idx = STEPS.findIndex((s) => s.id === step);
                if (idx < STEPS.length - 1) setStep(STEPS[idx + 1].id);
              }}
              disabled={step === STEPS[STEPS.length - 1].id}
              className="glass px-5 py-3 rounded-xl font-label-sm text-label-sm text-primary-gold hover:bg-white/10 transition-all flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Dalej
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* ===================== PRAWA KOLUMNA: PODSUMOWANIE ===================== */}
        <aside className="lg:sticky lg:top-24 h-fit">
          <div className="glass rounded-4xl p-glass-padding relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-primary-gold/10 blur-3xl pointer-events-none" />

            {/* Nagłówek modelu */}
            <div className="relative z-10 mb-6">
              <div className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-widest mb-1">
                Konfigurujesz
              </div>
              <h2 className="font-headline-lg text-headline-lg leading-tight">
                {car.name}
              </h2>
              <p className="text-primary-gold font-data-lg text-data-lg">
                {car.variant}
              </p>
            </div>

            {/* Pozycje konfiguracji */}
            <div className="relative z-10 space-y-3 mb-6">
              <LineItem label="Cena bazowa" value={formatUSD(basePrice)} />
              <LineItem label={`Lakier · ${paint.label}`} value={paint.price ? `+${formatUSD(paint.price)}` : "W cenie"} />
              <LineItem label={`Felgi · ${wheel.label}`} value={wheel.price ? `+${formatUSD(wheel.price)}` : "W cenie"} />
              <LineItem label={`Wnętrze · ${interior.label}`} value={interior.price ? `+${formatUSD(interior.price)}` : "W cenie"} />
              {selectedPkgs.map((p) => (
                <LineItem key={p.id} label={`Pakiet · ${p.label}`} value={`+${formatUSD(p.price)}`} />
              ))}
              <LineItem label={`Odbiór · ${delivery.label}`} value={delivery.price ? `+${formatUSD(delivery.price)}` : "W cenie"} />
            </div>

            {/* Suma */}
            <div className="relative z-10 border-t border-white/10 pt-5 mb-6">
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-widest mb-1">
                    Razem do zapłaty
                  </div>
                  <div className="font-data-lg text-data-lg text-primary-gold text-3xl!">
                    {formatUSD(total)}
                  </div>
                </div>
                <span className="material-symbols-outlined text-primary-gold text-4xl!">
                  payments
                </span>
              </div>
              <p className="text-label-sm font-label-sm text-on-surface-variant mt-2">
                W tym VAT. Dostępne leasing i finansowanie 0%.
              </p>
            </div>

            {/* CTA */}
            <button
              onClick={() => {
                setReservation(`LUXE-${car.monogram}-${Math.floor(Math.random() * 9000 + 1000)}`);
                setPlaced(true);
              }}
              className="relative z-10 w-full bg-primary-gold text-on-primary-gold px-6 py-4 rounded-xl font-data-lg text-data-lg gold-glow gold-glow-hover transition-all flex items-center justify-center gap-3 group"
            >
              Złóż zamówienie
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </button>

            <button
              onClick={() => {
                setPaintId("signature");
                setWheelId("std");
                setInteriorId("nappa");
                setPkgIds([]);
                setDeliveryId("salon");
              }}
              className="relative z-10 w-full mt-3 text-label-sm font-label-sm text-on-surface-variant hover:text-primary-gold transition-colors flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-base">restart_alt</span>
              Przywróć konfigurację bazową
            </button>

            {/* Zaufanie / mikrozaufanie */}
            <div className="relative z-10 grid grid-cols-3 gap-2 mt-6 pt-6 border-t border-white/10">
              {[
                { icon: "verified_user", t: "5 lat gwarancji" },
                { icon: "handshake", t: "Leasing 0%" },
                { icon: "support_agent", t: "Konsjerż 24/7" },
              ].map((b) => (
                <div key={b.t} className="text-center">
                  <span className="material-symbols-outlined text-primary-gold text-xl!">
                    {b.icon}
                  </span>
                  <div className="text-label-sm font-label-sm text-on-surface-variant mt-1 leading-tight">
                    {b.t}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Podkomponenty                                                      */
/* ------------------------------------------------------------------ */
function SectionHead({
  icon,
  title,
  subtitle,
}: {
  icon: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <span className="material-symbols-outlined text-primary-gold text-3xl!">
        {icon}
      </span>
      <div>
        <h3 className="font-headline-lg text-headline-lg leading-tight">{title}</h3>
        <p className="text-on-surface-variant text-body-md font-body-md mt-1">
          {subtitle}
        </p>
      </div>
    </div>
  );
}

function OptionGrid({
  title,
  subtitle,
  options,
  selectedId,
  onSelect,
  renderSwatch,
  icon,
}: {
  title: string;
  subtitle: string;
  options: Option[];
  selectedId: string;
  onSelect: (id: string) => void;
  renderSwatch?: (o: Option) => React.ReactNode;
  icon?: string;
}) {
  return (
    <div>
      <SectionHead icon={icon ?? "tune"} title={title} subtitle={subtitle} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-gutter mt-6">
        {options.map((o) => {
          const on = o.id === selectedId;
          return (
            <button
              key={o.id}
              onClick={() => onSelect(o.id)}
              className={`text-left rounded-2xl p-glass-padding border transition-all flex items-center gap-4 ${
                on
                  ? "bg-primary-gold/10 border-primary-gold/40"
                  : "bg-white/2 border-white/10 hover:bg-white/6"
              }`}
            >
              {renderSwatch ? (
                renderSwatch(o)
              ) : (
                <span
                  className={`material-symbols-outlined ${
                    on ? "text-primary-gold" : "text-on-surface-variant"
                  }`}
                >
                  {on ? "check_circle" : "radio_button_unchecked"}
                </span>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-data-lg text-data-lg text-on-surface truncate">
                    {o.label}
                  </h4>
                  {on && (
                    <span className="material-symbols-outlined text-primary-gold shrink-0">
                      check_circle
                    </span>
                  )}
                </div>
                <p className="text-label-sm font-label-sm text-on-surface-variant mt-1 truncate">
                  {o.detail}
                </p>
                <div className="font-data-lg text-data-lg text-primary-gold mt-2">
                  {o.price ? `+${formatUSD(o.price)}` : "W cenie"}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function LineItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 text-body-md font-body-md">
      <span className="text-on-surface-variant">{label}</span>
      <span className="text-on-surface text-right whitespace-nowrap">{value}</span>
    </div>
  );
}
