"use client";

import { useState } from "react";

export interface FaqItem {
  question: string;
  answer: string;
}

/* Akordeon w stylu aplikacji — jeden element otwarty naraz.
   Brak zewnętrznych zależności animacyjnych, rozwijanie sterowane stanem. */
export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={item.question}
            className={`glass rounded-2xl overflow-hidden transition-all duration-300 ${
              isOpen ? "border-primary-gold/30" : ""
            }`}
          >
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-4 p-glass-padding text-left"
              aria-expanded={isOpen}
            >
              <span className="flex items-center gap-4 min-w-0">
                <span
                  className={`material-symbols-outlined transition-colors ${
                    isOpen ? "text-primary-gold" : "text-on-surface-variant"
                  }`}
                >
                  {isOpen ? "help" : "question_mark"}
                </span>
                <span className="font-data-lg text-data-lg text-on-surface">
                  {item.question}
                </span>
              </span>
              <span
                className={`material-symbols-outlined shrink-0 transition-transform duration-300 ${
                  isOpen ? "rotate-45 text-primary-gold" : "text-on-surface-variant"
                }`}
              >
                add
              </span>
            </button>
            <div
              className={`grid transition-all duration-300 ease-in-out ${
                isOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="text-on-surface-variant text-body-md font-body-md px-glass-padding pb-glass-padding pl-[60px]">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
