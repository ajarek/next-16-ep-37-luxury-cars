"use client";

import { useEffect, useRef } from "react";

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const cards = document.querySelectorAll<HTMLDivElement>(".group.glass");
    
    const handleMouseMove = (e: MouseEvent, card: HTMLDivElement) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    };

    const listeners: { card: HTMLDivElement; fn: (e: MouseEvent) => void }[] = [];

    cards.forEach((card) => {
      const fn = (e: MouseEvent) => handleMouseMove(e, card);
      card.addEventListener("mousemove", fn);
      listeners.push({ card, fn });
    });

    return () => {
      listeners.forEach(({ card, fn }) => card.removeEventListener("mousemove", fn));
    };
  }, []);

  return (
    <>
      <header className="flex justify-between items-center px-margin-page p-4 w-full sticky top-0 z-50 bg-surface/80 dark:bg-surface/80 backdrop-blur-xl border-b border-white/10">
        <div className="text-headline-lg font-headline-lg font-bold text-primary-gold tracking-tighter">LUXE AUTO</div>
        <nav className="hidden md:flex gap-8 items-center">
          <a className="text-primary-gold border-b-2 border-primary-gold pb-1 font-body-md text-body-md" href="#">Salon</a>
          <a className="text-on-surface-variant hover:text-on-surface transition-colors font-body-md text-body-md" href="#">Kolekcja</a>
          <a className="text-on-surface-variant hover:text-on-surface transition-colors font-body-md text-body-md" href="#">Używane</a>
          <a className="text-on-surface-variant hover:text-on-surface transition-colors font-body-md text-body-md" href="#">Personalizacja</a>
        </nav>
        <div className="flex items-center gap-4">
          <div className="glass px-4 py-2 rounded-full hidden lg:flex items-center gap-2">
            <span className="material-symbols-outlined text-on-surface-variant text-sm">search</span>
            <input className="bg-transparent border-none focus:ring-0 text-label-sm font-label-sm w-48 outline-none" placeholder="Szukaj modeli..." type="text" />
          </div>
          <button className="w-10 h-10 flex items-center justify-center rounded-full glass hover:bg-white/5 transition-all duration-300 active:scale-90">
            <span className="material-symbols-outlined text-primary-gold">person</span>
          </button>
        </div>
      </header>

      <main className="w-full p-4">
        {/* Hero Section */}
        <section className="relative h-[921px] w-full overflow-hidden flex items-center">
          <div className="absolute inset-0 z-0">
            <div
              ref={heroRef}
              className="w-full h-full bg-cover bg-center scale-105"
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCaa59gR32rJW0GC4cDSl3nrIfAzQINDz8fG1mD86KUEKNXK-8Lm_9zJmlqwRHSTf7CzJ7PN6sTR3hYRqBYYY0XM7Tphjgua4pDBGa46gfQ8fDCtd8RffyfUeRjKrn9ipPeL-53SRxJpjXUgm4UfPkC_LxPg6KxQ6C7HeLA8KVOGAQIQiAygYdSE8nxS8uS6Iy1cyHhF5s3YH23pswbZ5oN-kM8w6If8Png0m-YUdAOPoioZGS8ta3w3FTCtSudbq7fJkAjr7t3Qek')" }}
            ></div>
            <div className="absolute inset-0 bg-linear-to-r from-background via-transparent to-transparent"></div>
            <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent"></div>
          </div>
          <div className="relative z-10 px-margin-page max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 glass rounded-full text-label-sm font-label-sm text-primary-gold uppercase tracking-widest">Nowość</span>
              <span className="text-on-surface-variant text-label-sm font-label-sm">| Model 2024</span>
            </div>
            <h1 className="font-display-lg text-display-lg mb-4 leading-none">Porsche 911<br /><span className="text-primary-gold">GT3 RS</span></h1>
            <p className="text-on-surface-variant text-body-md font-body-md mb-8 max-w-lg">
              Najwyższy wyraz osiągów torowych, dopracowany do jazdy po drogach publicznych. Precyzja dla tych, którzy nie uznają kompromisów.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-primary-gold text-on-primary-gold px-8 py-4 rounded-xl font-data-lg text-data-lg gold-glow gold-glow-hover transition-all flex items-center gap-3 group">
                Personalizuj
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </button>
              <button className="glass px-8 py-4 rounded-xl font-data-lg text-data-lg hover:bg-white/10 transition-all flex items-center gap-3">
                <span className="material-symbols-outlined">visibility</span>
                Zobacz Szczegóły
              </button>
            </div>
            <div className="mt-16 flex gap-12">
              <div>
                <div className="text-primary-gold font-data-lg text-data-lg">3.0s</div>
                <div className="text-label-sm font-label-sm text-on-surface-variant">0-100 KM/H</div>
              </div>
              <div>
                <div className="text-primary-gold font-data-lg text-data-lg">518 KM</div>
                <div className="text-label-sm font-label-sm text-on-surface-variant">Moc maksymalna</div>
              </div>
              <div>
                <div className="text-primary-gold font-data-lg text-data-lg">317 KM/H</div>
                <div className="text-label-sm font-label-sm text-on-surface-variant">Prędkość maksymalna</div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Collection */}
        <section className="px-margin-page py-stack-lg bg-surface">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-headline-lg text-headline-lg mb-2">Wyróżniona Kolekcja</h2>
              <p className="text-on-surface-variant font-body-md text-body-md">Starannie wyselekcjonowane, najbardziej prestiżowe modele w naszym asortymencie.</p>
            </div>
            <button className="text-primary-gold font-label-sm text-label-sm flex items-center gap-2 hover:underline">
              Zobacz cały salon <span className="material-symbols-outlined text-sm">north_east</span>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {/* BMW M8 Card */}
            <div className="group relative glass rounded-4xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
              <div className="p-glass-padding">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-data-lg text-data-lg leading-none">BMW M8</h3>
                    <p className="text-on-surface-variant text-label-sm font-label-sm mt-1">2023 · Competition Coupe</p>
                  </div>
                  <button className="w-10 h-10 rounded-full border border-primary-gold/30 flex items-center justify-center text-primary-gold group-hover:bg-primary-gold group-hover:text-on-primary-gold transition-all">
                    <span className="material-symbols-outlined text-sm">north_east</span>
                  </button>
                </div>
                <div className="flex gap-2 mb-6">
                  <span className="glass px-3 py-1 rounded-full text-[10px] font-label-sm text-on-surface-variant">135 000 USD</span>
                  <span className="glass px-3 py-1 rounded-full text-[10px] font-label-sm text-on-surface-variant">617 KM</span>
                  <span className="glass px-3 py-1 rounded-full text-[10px] font-label-sm text-on-surface-variant">AWD</span>
                </div>
              </div>
              <div className="relative h-64 overflow-hidden">
                <div className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-700" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDfCnoxMy-12tPqcKdvL_duqoiGo80h92gDxtXjzR8WFoAn6qfTDkyb7SZ6PAVpky8ChrnaIIYdgPtyIAq9PPZgwIGZc4qCE8CejDzmHoq4qNxI9oQc3tCTS_qhU5TbOR6j6K6FV8opYNtMkr-VLdO6pbv0McIHlM4egCX3zgpdoNGhUHKCKR1J4OkVcFvNSZpHeixnC1C5CwtS-VnWfmUWVkZrIGU7WbYhiJCQZ2tShTmdo5bLrFeCrdl3vNpi6WbsRZSj2A9xkmo')" }}></div>
                <div className="absolute bottom-0 left-0 w-full p-4 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-label-sm font-label-sm bg-black/60 backdrop-blur-md px-4 py-2 rounded-full">Dostępny teraz</span>
                </div>
              </div>
            </div>

            {/* Mercedes AMG GT Card */}
            <div className="group relative glass rounded-4xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
              <div className="p-glass-padding">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-data-lg text-data-lg leading-none">Mercedes AMG GT</h3>
                    <p className="text-on-surface-variant text-label-sm font-label-sm mt-1">2024 · Performance Edition</p>
                  </div>
                  <button className="w-10 h-10 rounded-full border border-primary-gold/30 flex items-center justify-center text-primary-gold group-hover:bg-primary-gold group-hover:text-on-primary-gold transition-all">
                    <span className="material-symbols-outlined text-sm">north_east</span>
                  </button>
                </div>
                <div className="flex gap-2 mb-6">
                  <span className="glass px-3 py-1 rounded-full text-[10px] font-label-sm text-on-surface-variant">168 000 USD</span>
                  <span className="glass px-3 py-1 rounded-full text-[10px] font-label-sm text-on-surface-variant">577 KM</span>
                  <span className="glass px-3 py-1 rounded-full text-[10px] font-label-sm text-on-surface-variant">V8 Biturbo</span>
                </div>
              </div>
              <div className="relative h-64 overflow-hidden">
                <div className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-700" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDyNkClcM6k79Iufoxxrg6gVPrV4ziZzj3gjrle_M_kEh8V83sa3SROCVBvOIJ9O29JUU7stAe5LprRZvWOqm_aQ9yTztbpFIhm5xtOGniJ8Be2orBlrVSA2TF8A_6uFGORYYDnKpOeS_OPfzmNJ2uea-_Io_M6DjnnncKYNwJSShsMEKlJLFx4moHMMuA-BgUd5NTWW2qtaUFBcMeV--yQgWNTKZOuBCF5Rq8wZrImEgLtiI9cD0sM7uN71uV6wsBloJUTFQI5ImY')" }}></div>
              </div>
            </div>

            {/* Audi R8 Card */}
            <div className="group relative glass rounded-4xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
              <div className="p-glass-padding">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-data-lg text-data-lg leading-none">Audi R8 V10</h3>
                    <p className="text-on-surface-variant text-label-sm font-label-sm mt-1">2023 · Spyder Quattro</p>
                  </div>
                  <button className="w-10 h-10 rounded-full border border-primary-gold/30 flex items-center justify-center text-primary-gold group-hover:bg-primary-gold group-hover:text-on-primary-gold transition-all">
                    <span className="material-symbols-outlined text-sm">north_east</span>
                  </button>
                </div>
                <div className="flex gap-2 mb-6">
                  <span className="glass px-3 py-1 rounded-full text-[10px] font-label-sm text-on-surface-variant">205 000 USD</span>
                  <span className="glass px-3 py-1 rounded-full text-[10px] font-label-sm text-on-surface-variant">602 KM</span>
                  <span className="glass px-3 py-1 rounded-full text-[10px] font-label-sm text-on-surface-variant">Mid-Engine</span>
                </div>
              </div>
              <div className="relative h-64 overflow-hidden">
                <div className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-700" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBLT3LpIEagPjhiNNZfFCKISQtBh3qMe9FzwdmysPkfChCl5TmFd7-VmJ-rSiA1Egsb4fxRGxdAuS4aDoJZ_ku_BBeiOCWncL9efCC2z_WJAfjuBUc4Mk42TEA5NnY1d_nybmzlu_E0LJ6dkIi_95Bx8HHj9dW3rlIpN_R6pxxnB6oSKT9E8o7vBwy_vFL_0-3O88SoAXdZKw2oqmFBmtecJeqVpgADF_AARu1TOWc02Jwwv_S5DDhO0473ELSzNS4Wg4-v6BpZaZo')" }}></div>
              </div>
            </div>
          </div>
        </section>

        {/* Personalization Promo */}
        <section className="px-margin-page py-stack-lg bg-surface-container-low overflow-hidden">
          <div className="glass p-12 rounded-[3rem] relative overflow-hidden flex flex-col md:flex-row items-center gap-12">
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-30 radial-surface pointer-events-none"></div>
            <div className="w-full md:w-1/2 z-10">
              <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg mb-6 leading-tight">Stwórz swoje<br /><span className="text-primary-gold italic">Arcydzieło</span></h2>
              <p className="text-on-surface-variant text-body-md font-body-md mb-8">
                Nasze atelier konfiguracji pozwala spersonalizować każdy szczegół, od szlachetnej skóry Nappa po unikalne wykończenia lakiernicze. Twój samochód jest przedłużeniem Twojej tożsamości.
              </p>
              <button className="bg-primary-gold text-on-primary-gold px-10 py-5 rounded-2xl font-data-lg text-data-lg gold-glow flex items-center gap-3 transition-transform hover:scale-105">
                Rozpocznij konfigurację
                <span className="material-symbols-outlined">palette</span>
              </button>
            </div>
            <div className="w-full md:w-1/2 relative h-96">
              <div className="w-full h-full bg-cover bg-center rounded-2xl" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDkLExQftombFw5BqcCkwDK8LOv8WRdigZCkFbuEx2PTedv7jtyY2emJEKGl-4De_8kLi6atuMaAhO1ki1d8NS-f55gvuA2Jo00MbLLedimV0hu8mpEhqIz9RlKFTOn8qBjumPL1ton5LXGZPOP9hfn1IcvNoaXBAdTuDvz7Um2QmN3tlgLzKukK7cT5KxfxS4TLXiv0cavOy8n8WOLhGdoHsRjvnDTfOcAbBAYmvm66fmlYz84_c7Bowq2oykN4aYY2Ni2taYSKCk')" }}></div>
              <div className="absolute -bottom-6 -left-6 glass p-6 rounded-2xl flex gap-4">
                <div className="w-12 h-12 rounded-full bg-[#8B0000] border-2 border-white/20"></div>
                <div className="w-12 h-12 rounded-full bg-[#1A1A1A] border-2 border-white/20"></div>
                <div className="w-12 h-12 rounded-full bg-[#00008B] border-2 border-white/20"></div>
                <div className="w-12 h-12 rounded-full bg-primary-gold border-2 border-white/20 ring-4 ring-primary-gold/20"></div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-lowest dark:bg-surface-container-lowest border-t border-white/5 w-full flex flex-col md:flex-row justify-between items-center px-margin-page py-stack-lg">
        <div className="mb-8 md:mb-0">
          <div className="text-headline-lg font-headline-lg text-primary-gold mb-2">LUXE AUTO</div>
          <p className="text-on-surface-variant text-label-sm font-label-sm max-w-xs">© 2024 LUXE AUTO. Wszelkie prawa zastrzeżone. Definiujemy na nowo doskonałość motoryzacyjną dla współczesnych koneserów.</p>
        </div>
        <div className="flex flex-wrap gap-12 text-center md:text-left">
          <div>
            <h4 className="text-primary-gold font-label-sm text-label-sm mb-4 uppercase tracking-widest">Nawigacja</h4>
            <ul className="space-y-2">
              <li><a className="text-on-surface-variant hover:text-on-surface transition-colors font-body-md text-body-md" href="#">Salony</a></li>
              <li><a className="text-on-surface-variant hover:text-on-surface transition-colors font-body-md text-body-md" href="#">Konsjerż</a></li>
              <li><a className="text-on-surface-variant hover:text-on-surface transition-colors font-body-md text-body-md" href="#">Finansowanie</a></li>
              <li><a className="text-on-surface-variant hover:text-on-surface transition-colors font-body-md text-body-md" href="#">Regulamin</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-primary-gold font-label-sm text-label-sm mb-4 uppercase tracking-widest">Połącz się</h4>
            <div className="flex gap-4">
              <a className="w-10 h-10 glass rounded-full flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity" href="#">
                <span className="material-symbols-outlined text-sm">public</span>
              </a>
              <a className="w-10 h-10 glass rounded-full flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity" href="#">
                <span className="material-symbols-outlined text-sm">alternate_email</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
