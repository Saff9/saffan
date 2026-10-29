'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
}

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  };

  return (
    <div className="mt-6 divide-y divide-[var(--ink-10)]">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i} className="faq-item py-4">
            <button
              type="button"
              onClick={() => toggle(i)}
              className="faq-question flex w-full items-center justify-between gap-4 text-left font-medium text-ink hover:text-accent transition-colors"
              aria-expanded={isOpen}
            >
              <span className="sans text-base">{item.q}</span>
              <ChevronDown
                className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                  isOpen ? 'rotate-180 text-accent' : 'text-ink-soft'
                }`}
                aria-hidden="true"
              />
            </button>
            {isOpen && (
              <p className="prose mt-3 text-sm leading-relaxed text-ink-soft">
                {item.a}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
