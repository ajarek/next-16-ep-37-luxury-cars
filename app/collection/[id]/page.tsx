import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import carsData from "@/data/cars.json";
import type { CollectionCar } from "@/lib/cars";

const cars = carsData as CollectionCar[];

// Metadane generowane dynamicznie dla każdego auta — poprawia SEO i tytuł karty.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const car = cars.find((c) => c.id === Number(id));
  if (!car) return { title: "Nie znaleziono | LUXE AUTO" };

  return {
    title: `${car.name} ${car.variant} | LUXE AUTO`,
    description: `${car.name} (${car.year}) — ${car.power}, 0-100 w ${car.acceleration}, prędkość maks. ${car.topSpeed}. ${car.price}.`,
  };
}

// Statyczna generacja ścieżek dla wszystkich aut w kolekcji — wstępny render.
export async function generateStaticParams() {
  return cars.map((car) => ({ id: String(car.id) }));
}

// Kreatywny, literacki opis — ewokuje charakter auta zamiast suchych danych.
// Tło generowane w locie z koloru akcentu marki, tak jak w CollectionCard.
function buildBackdrop(accent: string) {
  return {
    backgroundImage: `
      radial-gradient(circle at 75% 20%, ${accent}cc 0%, transparent 50%),
      radial-gradient(circle at 15% 85%, ${accent}66 0%, transparent 55%),
      linear-gradient(135deg, #0e0e0e 0%, #1c1b1b 100%)
    `,
  } as React.CSSProperties;
}

export default async function CollectionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const car = cars.find((c) => c.id === Number(id));
  if (!car) notFound();

  // Trzy filary osiągów — wyabstrahowane, by użyć ich w hero i w siatce.
  const specs = [
    { icon: "bolt", value: car.power, label: "Moc maksymalna" },
    { icon: "rocket_launch", value: car.acceleration, label: "Przyspieszenie 0-100" },
    { icon: "speed", value: car.topSpeed, label: "Prędkość maks." },
  ];

  return (
    <article className="relative min-h-screen max-w-7xl mx-auto mt-8">
      {/* ============================ HERO ============================ */}
      <section className="relative overflow-hidden rounded-4xl">
        {/* Tło z akcentem marki */}
        <div className="absolute inset-0" style={buildBackdrop(car.accent)} />

        {/* Światło wokół auta */}
        <div className="absolute -top-20 right-10 w-96 h-96 rounded-full bg-white/5 blur-3xl pointer-events-none" />

        {/* Breadcrumb */}
        <div className="relative z-10 flex items-center gap-3 px-margin-page pt-8">
          <Link
            href="/collection"
            className="text-on-surface-variant hover:text-on-surface text-label-sm font-label-sm flex items-center gap-1 transition-colors"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Kolekcja
          </Link>
          <span className="text-on-surface-variant text-label-sm font-label-sm">/</span>
          <span className="text-primary-gold text-label-sm font-label-sm uppercase tracking-widest">
            {car.category}
          </span>
        </div>

        {/* Główna zawartość hero */}
        <div className="relative z-10 grid lg:grid-cols-2 gap-8 px-margin-page py-stack-lg items-center">
          {/* Tekst */}
          <div className="order-2 lg:order-1">
            <div className="flex items-center gap-3 mb-6">
              <span className="glass px-3 py-1 rounded-full text-label-sm font-label-sm text-primary-gold uppercase tracking-widest">
                {car.year}
              </span>
              {car.available ? (
                <span className="flex items-center gap-2 text-label-sm font-label-sm text-on-surface-variant">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Dostępny teraz
                </span>
              ) : (
                <span className="flex items-center gap-2 text-label-sm font-label-sm text-on-surface-variant">
                  <span className="w-2 h-2 rounded-full bg-on-surface-variant" />
                  Na zamówienie
                </span>
              )}
            </div>

            <h1 className="font-display-lg text-display-lg leading-none mb-3">
              {car.name}
            </h1>
            <p className="text-primary-gold font-data-lg text-data-lg mb-8">
              {car.variant}
            </p>

            <p className="text-on-surface-variant text-body-md font-body-md mb-10 max-w-lg">
              Sformułowane z bezkompromisową precyzją, {car.name.toLowerCase()}{" "}
              łączy duszę wyścigowego toru z elegancją godną salonu. Każda linia
              karoserii została przemyślana, by rozkrajać powietrze — i władać
              nim.
            </p>

            {/* Cena + CTA */}
            <div className="flex flex-wrap items-center gap-6">
              <div>
                <div className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-widest mb-1">
                  Cena od
                </div>
                <div className="font-data-lg text-data-lg text-on-surface text-primary-gold">
                  {car.price}
                </div>
              </div>
              <button className="bg-primary-gold text-on-primary-gold px-8 py-4 rounded-xl font-data-lg text-data-lg gold-glow gold-glow-hover transition-all flex items-center gap-3 group">
                Zarezerwuj jazdę
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>

          {/* Wizualizacja auta */}
          <div className="order-1 lg:order-2 relative">
            <div className="relative aspect-[4/3] flex items-center justify-center">
              {/* Monogram w tle — ogromny, ledwo widoczny */}
              <span className="absolute inset-0 flex items-center justify-center font-data-lg text-[16rem] leading-none text-white/[0.03] select-none pointer-events-none">
                {car.monogram}
              </span>
              <Image
                src={car.image}
                alt={`${car.name} ${car.variant}`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain drop-shadow-2xl"
              />
              {/* Refleks podłogi */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-1/4 bg-black/40 blur-2xl rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* ====================== SPEC SHEET / OSIĄGI ====================== */}
      <section className="px-margin-page py-stack-lg">
        <div className="flex items-center gap-3 mb-8">
          <span className="material-symbols-outlined text-primary-gold">
            analytics
          </span>
          <h2 className="font-headline-lg text-headline-lg">Osiągi</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {specs.map((spec) => (
            <div
              key={spec.label}
              className="glass rounded-4xl p-glass-padding relative overflow-hidden group hover:bg-white/10 transition-colors"
            >
              <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-primary-gold/5 blur-2xl group-hover:bg-primary-gold/10 transition-colors" />
              <span className="material-symbols-outlined text-primary-gold mb-4 text-3xl">
                {spec.icon}
              </span>
              <div className="font-data-lg text-data-lg text-on-surface mb-1">
                {spec.value}
              </div>
              <div className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-widest">
                {spec.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ====================== OPIS / HISTORIA ====================== */}
      <section className="px-margin-page py-stack-lg">
        <div className="grid lg:grid-cols-3 gap-gutter">
          {/* Kolumna tytułowa */}
          <div className="lg:col-span-1">
            <span className="text-primary-gold text-label-sm font-label-sm uppercase tracking-widest">
              Filozofia
            </span>
            <h2 className="font-headline-lg text-headline-lg mt-3">
              Więcej niż<br />maszyna
            </h2>
          </div>

          {/* Kolumna narracyjna */}
          <div className="lg:col-span-2 space-y-6 text-on-surface-variant text-body-md font-body-md">
            <p>
              <span className="text-primary-gold font-data-lg text-data-lg">
                {car.name}
              </span>{" "}
              nie powstaje — on się rodzi. W hali montażu, gdzie inżynierowie
              noszą białe rękawiczki, każdy egzemplarz składany ręcznie staje
              się unikatem. To nie jest samochód z taśmy; to sygnatura czasu,
              w której materia, dźwięk i geometria spotykają się w jednym celu:
              czystej, bezkompromisowej emocji.
            </p>
            <p>
              Serce {car.badge} bije z częstotliwością, którą słychać, zanim
              zobaczysz. Moment, w którym wciśniesz pedał gazu, jest momentem,
              w którym czas się zgina — {car.acceleration} do setki to nie
              liczba, to obietnica spełniona w jednym oddechu. A gdy silnik
              osiągnie {car.topSpeed}, wiesz, że dotknąłeś krawędzi tego, co
              inżynieria pozwala cywilizacji.
            </p>
            <p>
              {car.power} mocy, ale prawdziwa siła leży w kontroli. Każdy
              układ — od aerodynamiki po dystrybucję momentu — działa w
              harmonii, jak orkiestra grająca jedną partyturę. Wynik jest tak
              precyzyjny, że granica między kierowcą a maszyną znika.
            </p>
          </div>
        </div>
      </section>

      {/* ====================== HIGHLIGHTS / WYRÓŻNIKI ====================== */}
      <section className="px-margin-page py-stack-lg">
        <div className="flex items-center gap-3 mb-8">
          <span className="material-symbols-outlined text-primary-gold">
            diamond
          </span>
          <h2 className="font-headline-lg text-headline-lg">Detale rzemiosła</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {[
            {
              icon: "precision_manufacturing",
              title: "Ręczny montaż",
              desc: "Każdy egzemplarz powstaje indywidualnie, z numerowaną plakietką.",
            },
            {
              icon: "air",
              title: "Aerodynamika",
              desc: "Aktywne elementy docisku generują setki kilogramów siły.",
            },
            {
              icon: "graphic_eq",
              title: "Akustyka V",
              desc: `${car.badge} strojony jak instrument — oddech mechanicznej duszy.`,
            },
            {
              icon: "verified",
              title: "Gwarancja dziedzictwa",
              desc: "Dożywotni dostęp do ekskluzywnej społeczności marki.",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="glass rounded-2xl p-glass-padding hover:-translate-y-1 transition-transform"
            >
              <span className="material-symbols-outlined text-primary-gold mb-3 block">
                {feature.icon}
              </span>
              <h3 className="font-data-lg text-data-lg text-on-surface mb-2">
                {feature.title}
              </h3>
              <p className="text-label-sm font-label-sm text-on-surface-variant">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ====================== AKCENT / PALETA ====================== */}
      <section className="px-margin-page py-stack-lg">
        <div className="glass rounded-4xl p-glass-padding flex flex-col md:flex-row items-center gap-8">
          {/* Próbka koloru akcentu */}
          <div
            className="w-24 h-24 rounded-full shrink-0 gold-glow"
            style={{ backgroundColor: car.accent }}
          />
          <div className="flex-1 text-center md:text-left">
            <span className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-widest">
              Sygnatura kolorystyczna
            </span>
            <h3 className="font-headline-lg text-headline-lg mt-1">
              Odcień duszy {car.name}
            </h3>
            <p className="text-on-surface-variant text-body-md font-body-md mt-2">
              Każdy model w naszej kolekcji nosi własny akcent — barwę, która
              definiuje jego charakter. Ten należy do{" "}
              <span className="text-primary-gold">{car.monogram}</span>.
            </p>
          </div>
          <div className="font-data-lg text-data-lg text-on-surface-variant uppercase">
            {car.accent}
          </div>
        </div>
      </section>

      {/* ====================== NAWIGACJA / SĄSIEDZI ====================== */}
      <section className="px-margin-page py-stack-lg pb-16">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/collection"
            className="glass px-6 py-3 rounded-xl font-label-sm text-label-sm text-on-surface hover:bg-white/10 transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined">grid_view</span>
            Cała kolekcja
          </Link>

          <div className="flex items-center gap-2">
            {cars
              .filter((c) => c.id !== car.id)
              .slice(0, 4)
              .map((sibling) => (
                <Link
                  key={sibling.id}
                  href={`/collection/${sibling.id}`}
                  className="glass px-4 py-3 rounded-xl font-label-sm text-label-sm text-on-surface-variant hover:text-primary-gold hover:bg-white/10 transition-all hidden sm:block"
                >
                  {sibling.monogram}
                </Link>
              ))}
          </div>
        </div>
      </section>
    </article>
  );
}
