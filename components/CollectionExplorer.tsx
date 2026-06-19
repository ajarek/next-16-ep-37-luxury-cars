"use client";

import { useMemo, useState } from "react";
import type { CollectionCar } from "@/lib/cars";
import CollectionCard from "@/components/CollectionCard";

interface CollectionExplorerProps {
  cars: CollectionCar[];
}

export default function CollectionExplorer({ cars }: CollectionExplorerProps) {
  const [active, setActive] = useState<string>("Wszystkie");

  // Kategorie wyliczane z danych, z domyślną opcją "Wszystkie" na początku.
  const categories = useMemo(
    () => ["Wszystkie", ...Array.from(new Set(cars.map((c) => c.category)))],
    [cars]
  );

  const filtered = useMemo(
    () => (active === "Wszystkie" ? cars : cars.filter((c) => c.category === active)),
    [active, cars]
  );

  return (
    <section className="px-margin-page py-stack-lg bg-surface">
      {/* Pasek filtrów */}
      <div className="flex flex-wrap items-center gap-3 mb-10">
        <span className="material-symbols-outlined text-on-surface-variant text-sm mr-1">
          tune
        </span>
        {categories.map((category) => {
          const isActive = category === active;
          return (
            <button
              key={category}
              onClick={() => setActive(category)}
              className={`px-4 py-2 rounded-full text-label-sm font-label-sm transition-all duration-300 ${
                isActive
                  ? "bg-primary-gold text-on-primary-gold gold-glow"
                  : "glass text-on-surface-variant hover:text-on-surface hover:bg-white/10"
              }`}
            >
              {category}
            </button>
          );
        })}
        <span className="ml-auto text-on-surface-variant text-label-sm font-label-sm">
          {filtered.length}{" "}
          {filtered.length === 1 ? "model" : "modeli"}
        </span>
      </div>

      {/* Siatka kart */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
        {filtered.map((car) => (
          <CollectionCard key={car.id} car={car} />
        ))}
      </div>
    </section>
  );
}
