export default function Footer() {
  return (
    <footer className="bg-surface-container-lowest dark:bg-surface-container-lowest border-t border-white/5 w-full flex flex-col md:flex-row justify-between items-center px-margin-page py-stack-lg">
      <div className="mb-8 md:mb-0">
        <div className="text-headline-lg font-headline-lg text-primary-gold mb-2">
          LUXE AUTO
        </div>
        <p className="text-on-surface-variant text-label-sm font-label-sm max-w-xs">
          © 2026 LUXE AUTO. Wszelkie prawa zastrzeżone. Definiujemy na nowo
          doskonałość motoryzacyjną dla współczesnych koneserów.
        </p>
      </div>
      <div className="flex flex-wrap gap-12 text-center md:text-left">
        <div>
          <h4 className="text-primary-gold font-label-sm text-label-sm mb-4 uppercase tracking-widest">
            Nawigacja
          </h4>
          <ul className="space-y-2">
            <li>
              <a
                className="text-on-surface-variant hover:text-on-surface transition-colors font-body-md text-body-md"
                href="#"
              >
                Salony
              </a>
            </li>
            <li>
              <a
                className="text-on-surface-variant hover:text-on-surface transition-colors font-body-md text-body-md"
                href="#"
              >
                Konsjerż
              </a>
            </li>
            <li>
              <a
                className="text-on-surface-variant hover:text-on-surface transition-colors font-body-md text-body-md"
                href="#"
              >
                Finansowanie
              </a>
            </li>
            <li>
              <a
                className="text-on-surface-variant hover:text-on-surface transition-colors font-body-md text-body-md"
                href="#"
              >
                Regulamin
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-primary-gold font-label-sm text-label-sm mb-4 uppercase tracking-widest">
            Połącz się
          </h4>
          <div className="flex gap-4">
            <a
              className="w-10 h-10 glass rounded-full flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity"
              href="#"
            >
              <span className="material-symbols-outlined text-sm">public</span>
            </a>
            <a
              className="w-10 h-10 glass rounded-full flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity"
              href="#"
            >
              <span className="material-symbols-outlined text-sm">
                alternate_email
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
