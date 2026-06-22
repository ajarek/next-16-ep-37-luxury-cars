"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { CollectionCar } from "@/lib/cars";
import CollectionCard from "@/components/CollectionCard";

interface CollectionExplorerProps {
  cars: CollectionCar[];
}

export default function CollectionExplorer({ cars }: CollectionExplorerProps) {
  const [active, setActive] = useState<string>("Wszystkie");
  const searchParams = useSearchParams();
  // `q` pochodzi z nagłówka / URL-a — sensowny fallback na pusty string.
  const query = (searchParams.get("q") ?? "").trim().toLowerCase();

  // Kategorie wyliczane z danych, z domyślną opcją "Wszystkie" na początku.
  const categories = useMemo(
    () => ["Wszystkie", ...Array.from(new Set(cars.map((c) => c.category)))],
    [cars]
  );

  const filtered = useMemo(() => {
    // Krok 1: filtr po aktywnej kategorii.
    const byCategory =
      active === "Wszystkie" ? cars : cars.filter((c) => c.category === active);

    // Bez frazy — zwracamy wynik tylko kategorii.
    if (!query) return byCategory;

    // Krok 2: filtr po frazie. Obsługa wielu słów — każde musi pasować
    // do co najmniej jednego z przeszukiwanych pól (AND między słowami,
    // co daje precyzyjniejsze wyniki np. „bugatti 1600").
    const terms = query.split(/\s+/).filter(Boolean);

    return byCategory.filter((c) => {
      const haystack = [
        c.name,
        c.variant,
        c.category,
        c.badge,
        c.monogram,
        c.power,
        c.year,
      ]
        .join(" ")
        .toLowerCase();

      return terms.every((term) => haystack.includes(term));
    });
  }, [active, cars, query]);

  return (
    <section className="px-margin-page py-stack-lg bg-surface">
      {/* Komunikat o aktywnej frazie wyszukiwania */}
      {query && (
        <div className="mb-6 flex items-center gap-3 text-label-sm font-label-sm">
          <span className="material-symbols-outlined text-primary-gold text-base">
            search
          </span>
          <span className="text-on-surface-variant">
            Wyniki dla frazy:&nbsp;
            <span className="text-on-surface font-semibold">
              &bdquo;{query}&rdquo;
            </span>
          </span>
        </div>
      )}

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

      {/* Siatka kart lub stan pusty */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {filtered.map((car) => (
            <CollectionCard key={car.id} car={car} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-stack-lg text-center gap-4">
          <span className="material-symbols-outlined text-on-surface-variant opacity-50 text-6xl">
            search_off
          </span>
          <p className="text-on-surface font-body-lg text-body-lg">
            Brak modeli spełniających kryteria
          </p>
          <p className="text-on-surface-variant text-body-md font-body-md max-w-md">
            Spróbuj zmienić frazę lub wybierz inną kategorię.{" "}
            {query && (
              <>
                Szukano:&nbsp;
                <span className="text-on-surface font-semibold">
                  &bdquo;{query}&rdquo;
                </span>
              </>
            )}
          </p>
        </div>
      )}
    </section>
  );
}
