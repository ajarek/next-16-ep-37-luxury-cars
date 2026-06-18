"use client";

import { useRef } from "react";
import type { Car } from "@/lib/cars";

interface CarCardProps {
  car: Car;
}

export default function CarCard({ car }: CarCardProps) {
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

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="card-glow group relative glass rounded-4xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
    >
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
        <div className="flex gap-2 mb-6">
          <span className="glass px-3 py-1 rounded-full text-[10px] font-label-sm text-on-surface-variant">
            {car.price}
          </span>
          <span className="glass px-3 py-1 rounded-full text-[10px] font-label-sm text-on-surface-variant">
            {car.power}
          </span>
          <span className="glass px-3 py-1 rounded-full text-[10px] font-label-sm text-on-surface-variant">
            {car.badge}
          </span>
        </div>
      </div>
      <div className="relative h-64 overflow-hidden">
        <div
          className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
          style={{ backgroundImage: `url('${car.image}')` }}
        ></div>
        {car.available && (
          <div className="absolute bottom-0 left-0 w-full p-4 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-label-sm font-label-sm bg-black/60 backdrop-blur-md px-4 py-2 rounded-full">
              Dostępny teraz
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
