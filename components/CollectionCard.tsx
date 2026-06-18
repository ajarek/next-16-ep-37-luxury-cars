"use client";

import { useRef } from "react";
import type { CollectionCar } from "@/lib/cars";

interface CollectionCardProps {
  car: CollectionCar;
}

export default function CollectionCard({ car }: CollectionCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Każda karta śledzi mysz indywidualnie i ustawia zmienne CSS --mouse-x/--mouse-y
  // na własnym elemencie — napędza to poświatę zdefiniowaną w globals.css (.card-glow).
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  // Autorskie, eleganckie tło generowane w locie z akcentu kolorystycznego auta
  // — ciemna baza aplikacji z subtelnym, radialnym blaskiem w barwie marki.
  const coverStyle = {
    backgroundImage: `
      radial-gradient(circle at 70% 30%, ${car.accent}99 0%, transparent 55%),
      radial-gradient(circle at 20% 80%, ${car.accent}55 0%, transparent 60%),
      linear-gradient(135deg, #0e0e0e 0%, #1c1b1b 100%)
    `,
  } as React.CSSProperties;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="card-glow group relative glass rounded-4xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
    >
      {/* Dekoracyjna wizualizacja auta — monogram marki + refleksy, zamiast zewnętrznego zdjęcia */}
      <div className="relative h-56 overflow-hidden" style={coverStyle}>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display-lg text-display-lg text-white/90 drop-shadow-2xl tracking-tighter select-none">
            {car.monogram}
          </span>
        </div>
        {/* Refleks podłogi */}
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-linear-to-t from-black/70 to-transparent"></div>
        {/* Plama świetlna */}
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white/5 blur-3xl"></div>

        {/* Kategoria w rogu */}
        <div className="absolute top-4 left-4 z-10">
          <span className="glass px-3 py-1 rounded-full text-[10px] font-label-sm text-primary-gold uppercase tracking-widest">
            {car.category}
          </span>
        </div>

        {/* Status dostępności */}
        {car.available ? (
          <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-label-sm font-label-sm bg-black/60 backdrop-blur-md px-3 py-1 rounded-full">
              Dostępny teraz
            </span>
          </div>
        ) : (
          <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="w-2 h-2 rounded-full bg-on-surface-variant"></span>
            <span className="text-label-sm font-label-sm bg-black/60 backdrop-blur-md px-3 py-1 rounded-full">
              Na zamówienie
            </span>
          </div>
        )}
      </div>

      <div className="p-glass-padding">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-data-lg text-data-lg leading-none">{car.name}</h3>
            <p className="text-on-surface-variant text-label-sm font-label-sm mt-1">
              {car.year} · {car.variant}
            </p>
          </div>
          <button className="w-10 h-10 rounded-full border border-primary-gold/30 flex items-center justify-center text-primary-gold group-hover:bg-primary-gold group-hover:text-on-primary-gold transition-all">
            <span className="material-symbols-outlined text-sm">north_east</span>
          </button>
        </div>

        {/* Specyfikacja osiągów */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="glass rounded-xl px-2 py-3 text-center">
            <div className="text-primary-gold font-data-lg text-data-lg leading-none">
              {car.power}
            </div>
            <div className="text-on-surface-variant text-[10px] font-label-sm mt-1">
              Moc
            </div>
          </div>
          <div className="glass rounded-xl px-2 py-3 text-center">
            <div className="text-primary-gold font-data-lg text-data-lg leading-none">
              {car.acceleration}
            </div>
            <div className="text-on-surface-variant text-[10px] font-label-sm mt-1">
              0-100
            </div>
          </div>
          <div className="glass rounded-xl px-2 py-3 text-center">
            <div className="text-primary-gold font-data-lg text-data-lg leading-none">
              {car.topSpeed}
            </div>
            <div className="text-on-surface-variant text-[10px] font-label-sm mt-1">
              V-max
            </div>
          </div>
        </div>

        {/* Stopka: cena + typ napędu */}
        <div className="flex justify-between items-center pt-4 border-t border-white/5">
          <span className="font-data-lg text-data-lg text-on-surface">
            {car.price}
          </span>
          <span className="glass px-3 py-1 rounded-full text-[10px] font-label-sm text-on-surface-variant">
            {car.badge}
          </span>
        </div>
      </div>
    </div>
  );
}
