export default function Header() {
  return (
    <header className="flex justify-between items-center px-margin-page p-4 w-full sticky top-0 z-50 bg-surface/80 dark:bg-surface/80 backdrop-blur-xl border-b border-white/10">
      <div className="text-headline-lg font-headline-lg font-bold text-primary-gold tracking-tighter">
        LUXE AUTO
      </div>
      <nav className="hidden md:flex gap-8 items-center">
        <a
          className="text-primary-gold border-b-2 border-primary-gold pb-1 font-body-md text-body-md"
          href="#"
        >
          Salon
        </a>
        <a
          className="text-on-surface-variant hover:text-on-surface transition-colors font-body-md text-body-md"
          href="#"
        >
          Kolekcja
        </a>
        <a
          className="text-on-surface-variant hover:text-on-surface transition-colors font-body-md text-body-md"
          href="#"
        >
          Używane
        </a>
        <a
          className="text-on-surface-variant hover:text-on-surface transition-colors font-body-md text-body-md"
          href="#"
        >
          Personalizacja
        </a>
      </nav>
      <div className="flex items-center gap-4">
        <div className="glass px-4 py-2 rounded-full hidden lg:flex items-center gap-2">
          <span className="material-symbols-outlined text-on-surface-variant text-sm">
            search
          </span>
          <input
            className="bg-transparent border-none focus:ring-0 text-label-sm font-label-sm w-48 outline-none"
            placeholder="Szukaj modeli..."
            type="text"
          />
        </div>
        <button className="w-10 h-10 flex items-center justify-center rounded-full glass hover:bg-white/5 transition-all duration-300 active:scale-90">
          <span className="material-symbols-outlined text-primary-gold">
            person
          </span>
        </button>
      </div>
    </header>
  );
}
