import Link from "next/link";

export default function Personalization() {
  return (
    <section className="px-margin-page py-stack-lg bg-surface-container-low overflow-hidden">
      <div className="glass p-12 rounded-[3rem] relative overflow-hidden flex flex-col md:flex-row items-center gap-12">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-30 radial-surface pointer-events-none"></div>
        <div className="w-full md:w-1/2 z-10">
          <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg mb-6 leading-tight">
            Stwórz swoje
            <br />
            <span className="text-primary-gold italic">Arcydzieło</span>
          </h2>
          <p className="text-on-surface-variant text-body-md font-body-md mb-8">
            Nasze atelier konfiguracji pozwala spersonalizować każdy szczegół, od
            szlachetnej skóry Nappa po unikalne wykończenia lakiernicze. Twój
            samochód jest przedłużeniem Twojej tożsamości.
          </p>
          <Link
            href="/collection"
            className="w-fit bg-primary-gold text-on-primary-gold px-10 py-5 rounded-2xl font-data-lg text-data-lg gold-glow flex items-center gap-3 transition-transform hover:scale-105">
            Rozpocznij konfigurację
            <span className="material-symbols-outlined">palette</span>
          </Link>
        </div>
        <div className="w-full md:w-1/2 relative h-96">
          <div
            className="w-full h-full bg-cover bg-center rounded-2xl"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDkLExQftombFw5BqcCkwDK8LOv8WRdigZCkFbuEx2PTedv7jtyY2emJEKGl-4De_8kLi6atuMaAhO1ki1d8NS-f55gvuA2Jo00MbLLedimV0hu8mpEhqIz9RlKFTOn8qBjumPL1ton5LXGZPOP9hfn1IcvNoaXBAdTuDvz7Um2QmN3tlgLzKukK7cT5KxfxS4TLXiv0cavOy8n8WOLhGdoHsRjvnDTfOcAbBAYmvm66fmlYz84_c7Bowq2oykN4AYY2Ni2taYSKCk')",
            }}
          ></div>
          <div className="absolute -bottom-6 -left-6 glass p-6 rounded-2xl flex gap-4">
            <div className="w-12 h-12 rounded-full bg-[#8B0000] border-2 border-white/20"></div>
            <div className="w-12 h-12 rounded-full bg-[#1A1A1A] border-2 border-white/20"></div>
            <div className="w-12 h-12 rounded-full bg-[#00008B] border-2 border-white/20"></div>
            <div className="w-12 h-12 rounded-full bg-primary-gold border-2 border-white/20 ring-4 ring-primary-gold/20"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
