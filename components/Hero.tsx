"use client";

import { useEffect, useRef } from "react";
import Stat from "@/components/Stat";
import { useRouter } from "next/navigation";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      if (heroRef.current) {
        heroRef.current.style.transform = `translateY(${scrolled * 0.3}px) scale(1.05)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative h-[921px] w-full overflow-hidden flex items-center">
      <div className="absolute inset-0 z-0">
        <div
          ref={heroRef}
          className="w-full h-full bg-cover bg-center scale-105"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCaa59gR32rJW0GC4cDSl3nrIfAzQINDz8fG1mD86KUEKNXK-8Lm_9zJmlqwRHSTf7CzJ7PN6sTR3hYRqBYYY0XM7Tphjgua4pDBGa46gfQ8fDCtd8RffyfUeRjKrn9ipPeL-53SRxJpjXUgm4UfPkC_LxPg6KxQ6C7HeLA8KVOGAQIQiAygYdSE8nxS8uS6Iy1cyHhF5s3YH23pswbZ5oN-kM8w6If8Png0m-YUdAOPoioZGS8ta3w3FTCtSudbq7fJkAjr7t3Qek')",
          }}
        ></div>
        <div className="absolute inset-0 bg-linear-to-r from-background via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent"></div>
      </div>
      <div className="relative z-10 px-margin-page max-w-4xl">
        <div className="flex items-center gap-3 mb-6">
          <span className="px-3 py-1 glass rounded-full text-label-sm font-label-sm text-primary-gold uppercase tracking-widest">
            Nowość
          </span>
          <span className="text-on-surface-variant text-label-sm font-label-sm">
            | Model 2024
          </span>
        </div>
        <h1 className="font-display-lg text-display-lg mb-4 leading-none">
          Porsche 911
          <br />
          <span className="text-primary-gold">GT3 RS</span>
        </h1>
        <p className="text-on-surface-variant text-body-md font-body-md mb-8 max-w-lg">
          Najwyższy wyraz osiągów torowych, dopracowany do jazdy po drogach
          publicznych. Precyzja dla tych, którzy nie uznają kompromisów.
        </p>
        <div className="flex flex-wrap gap-4">
          <button onClick={() => router.push("/collection")} className="bg-primary-gold text-on-primary-gold px-8 py-4 rounded-xl font-data-lg text-data-lg gold-glow gold-glow-hover transition-all flex items-center gap-3 group">
            Kolekcja
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </button>
          <button onClick={() => router.push("/collection/9")} className="glass px-8 py-4 rounded-xl font-data-lg text-data-lg hover:bg-white/10 transition-all flex items-center gap-3">
            <span className="material-symbols-outlined">visibility</span>
            Zobacz Szczegóły
          </button>
        </div>
        <div className="mt-16 flex gap-12">
          <Stat value="3.0s" label="0-100 KM/H" />
          <Stat value="518 KM" label="Moc maksymalna" />
          <Stat value="317 KM/H" label="Prędkość maksymalna" />
        </div>
      </div>
    </section>
  );
}
