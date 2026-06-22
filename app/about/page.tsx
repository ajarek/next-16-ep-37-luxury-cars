import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "O nas | LUXE AUTO",
  description:
    "LUXE AUTO to atelier rzadkich samochodów. Poznaj naszą historię, wartości i filozofię, która definiuje na nowo doskonałość motoryzacyjną.",
}

const values = [
  {
    icon: "diamond",
    title: "Bezkompromisowa jakość",
    description:
      "Każdy model w naszym salonie przechodzi rygorystyczną kuratelę ekspertów. Przyjmujemy tylko auta o udokumentowanej proweniencji i nienagannym stanie.",
  },
  {
    icon: "bolt",
    title: "Pasza do detalu",
    description:
      "Od ściegu na kierownicy po brzmienie wydechu — wierzymy, że prawdziwy luksus kryje się w milimetrach, których inni nie dostrzegają.",
  },
  {
    icon: "handshake",
    title: "Relacja na lata",
    description:
      "Nie sprzedajemy samochodów — towarzyszymy pasjom. Nasz konsjerż pozostaje do dyspozycji długo po odebraniu kluczyków.",
  },
  {
    icon: "shield",
    title: "Dyskrecja ponad wszystko",
    description:
      "Prywatność naszych klientów jest nienaruszalna. Transakcje prowadzimy z taktem i w zaufaniu, jak przystało na prawdziwe atelier.",
  },
]

const timeline = [
  {
    year: "1998",
    title: "Pierwszy garaż marzeń",
    description:
      "W niewielkim warszawskim atelier otwartym po godzinach powstała pierwsza transakcja — Ferrari 355, sprzedana zanim jeszcze pojawił się klient.",
  },
  {
    year: "2009",
    title: "Narodziny LUXE AUTO",
    description:
      "Marka przybrała obecną formę — galeria rzadkich aut, w której każdy egzemplarz kuratorowany jest jak dzieło sztuki.",
  },
  {
    year: "2017",
    title: "Program konsjerż",
    description:
      "Wprowadziliśmy dedykowanego opiekuna dla każdego klienta — usługę, która na nowo definiuje standard opieki posprzedażowej.",
  },
  {
    year: "2026",
    title: "Era elektrycznego luksusu",
    description:
      "Dołączyliśmy do awangardy: elektryfikacja nie jako kompromis, lecz nowe medium dla artystycznej inżynierii.",
  },
]

const stats = [
  { value: "28", label: "Lat pasji" },
  { value: "1 400+", label: "Dostarczonych arcydzieł" },
  { value: "47", label: "Marzek premium" },
  { value: "100%", label: "Zaufania klientów" },
]

export default function AboutPage() {
  return (
    <>
      <section className='relative px-margin-page py-stack-lg overflow-hidden bg-surface'>
        <div className='absolute top-0 right-0 w-1/2 h-full opacity-20 radial-surface pointer-events-none'></div>

        <div className='relative z-10 max-w-3xl'>
          <div className='flex items-center gap-3 mb-6'>
            <Link
              href='/'
              className='text-on-surface-variant hover:text-on-surface text-label-sm font-label-sm flex items-center gap-1 transition-colors'
            >
              <span className='material-symbols-outlined text-sm'>
                arrow_back
              </span>
              Strona główna
            </Link>
            <span className='text-on-surface-variant text-label-sm font-label-sm'>
              |
            </span>
            <span className='text-primary-gold text-label-sm font-label-sm uppercase tracking-widest'>
              Nasza historia
            </span>
          </div>

          <h1 className='font-display-lg text-display-lg mb-6 leading-none'>
            Nie sprzedajemy
            <br />
            <span className='text-primary-gold'>samochodów.</span>
          </h1>

          <p className='text-on-surface-variant text-body-md font-body-md max-w-2xl'>
            Rozdajemy klucze do emocji, które trudno ubrać w słowa — do
            przyspieszenia, które wciska w fotel, do brzmienia silnika, które
            brzmi jak prywatna symfonia. LUXE AUTO to atelier rzadkich maszyn i
            jeszcze rzadszych opowieści.
          </p>
        </div>
      </section>

      <section className='px-margin-page py-stack-lg bg-surface-container-low'>
        <div className='glass p-12 rounded-[3rem] relative overflow-hidden'>
          <div className='absolute top-0 left-0 w-1/3 h-full opacity-30 radial-surface pointer-events-none'></div>
          <div className='relative z-10 max-w-3xl'>
            <span className='material-symbols-outlined text-primary-gold text-5xl mb-4 block'>
              format_quote
            </span>
            <p className='font-headline-lg text-headline-lg leading-tight mb-6'>
              Prawdziwy luksus nie krzyczy. On czeka cierpliwie, aż zostanie
              <span className='text-primary-gold italic'> zauważony.</span>
            </p>
            <p className='text-on-surface-variant text-label-sm font-label-sm uppercase tracking-widest'>
              — Filozofia LUXE AUTO
            </p>
          </div>
        </div>
      </section>

      <section className='px-margin-page py-stack-lg bg-surface'>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-gutter'>
          {stats.map((stat) => (
            <div
              key={stat.label}
              className='glass rounded-2xl p-glass-padding text-center hover:-translate-y-1 transition-transform duration-500'
            >
              <div className='text-primary-gold font-data-lg text-data-lg mb-2'>
                {stat.value}
              </div>
              <div className='text-label-sm font-label-sm text-on-surface-variant'>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className='px-margin-page py-stack-lg bg-surface-container-low'>
        <div className='mb-12 max-w-2xl'>
          <h2 className='font-headline-lg text-headline-lg mb-4'>
            Czym się kierujemy
          </h2>
          <p className='text-on-surface-variant text-body-md font-body-md'>
            Cztery zasady, których nie łamiemy — nawet gdy nikt nie patrzy. One
            definiują każdy wybór, od doboru aut po uścisk dłoni przy
            pożegnaniu.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-gutter'>
          {values.map((value) => (
            <div
              key={value.title}
              className='card-glow group glass rounded-4xl p-glass-padding transition-all duration-500 hover:shadow-2xl hover:-translate-y-1'
            >
              <div className='flex items-start gap-5'>
                <div className='w-14 h-14 rounded-2xl bg-primary-gold/10 border border-primary-gold/30 flex items-center justify-center shrink-0 group-hover:bg-primary-gold group-hover:text-on-primary-gold transition-all'>
                  <span className='material-symbols-outlined text-primary-gold group-hover:text-on-primary-gold'>
                    {value.icon}
                  </span>
                </div>
                <div>
                  <h3 className='font-data-lg text-data-lg mb-2'>
                    {value.title}
                  </h3>
                  <p className='text-on-surface-variant text-body-md font-body-md'>
                    {value.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className='px-margin-page py-stack-lg bg-surface'>
        <div className='mb-12 max-w-2xl'>
          <h2 className='font-headline-lg text-headline-lg mb-4'>
            Droga, którą przebyliśmy
          </h2>
          <p className='text-on-surface-variant text-body-md font-body-md'>
            Od jednoosobowego garażu po galerię, do której zjeżdża się elita
            europejskich kolekcjonerów — każda data to kamień milowy naszej
            obsesji.
          </p>
        </div>

        <div className='relative'>
          <div className='absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-linear-to-b from-primary-gold/50 via-white/10 to-transparent'></div>

          <div className='space-y-12'>
            {timeline.map((item, index) => (
              <div
                key={item.year}
                className={`relative flex flex-col md:flex-row items-start gap-6 ${
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className='absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary-gold ring-4 ring-primary-gold/20 z-10 mt-2'></div>

                <div className='ml-12 md:ml-0 md:w-1/2 md:px-12'>
                  <div className='glass rounded-3xl p-glass-padding hover:-translate-y-1 transition-transform duration-500'>
                    <span className='text-primary-gold font-data-lg text-data-lg block mb-2'>
                      {item.year}
                    </span>
                    <h3 className='font-headline-lg text-headline-lg-mobile mb-2'>
                      {item.title}
                    </h3>
                    <p className='text-on-surface-variant text-body-md font-body-md'>
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className='hidden md:block md:w-1/2'></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='px-margin-page py-stack-lg bg-surface-container-low overflow-hidden'>
        <div className='glass p-12 rounded-[3rem] relative overflow-hidden flex flex-col md:flex-row items-center gap-12'>
          <div className='absolute top-0 right-0 w-1/2 h-full opacity-30 radial-surface pointer-events-none'></div>
          <div className='w-full md:w-2/3 z-10'>
            <h2 className='font-display-lg text-display-lg-mobile md:text-display-lg mb-6 leading-tight'>
              Twoja kolejna opowieść
              <br />
              <span className='text-primary-gold italic'>
                zaczyna się tutaj.
              </span>
            </h2>
            <p className='text-on-surface-variant text-body-md font-body-md mb-8 max-w-xl'>
              Umów prywatne oględziny w naszym atelier. Bez pośpiechu, bez tłumu
              — tylko Ty, samochód i zapach prawdziwej skóry. Czekamy z kawą i
              kluczykami.
            </p>
            <div className='flex flex-wrap gap-4'>
              <Link
                href='/collection'
                className='w-fit bg-primary-gold text-on-primary-gold px-10 py-5 rounded-2xl font-data-lg text-data-lg gold-glow gold-glow-hover flex items-center gap-3 transition-transform hover:scale-105'
              >
                Zobacz kolekcję
                <span className='material-symbols-outlined'>arrow_forward</span>
              </Link>
              <Link
                href='/contact'
                className='w-fit glass px-10 py-5 rounded-2xl font-data-lg text-data-lg hover:bg-white/10 transition-all flex items-center gap-3'
              >
                <span className='material-symbols-outlined'>
                  calendar_month
                </span>
                Umów wizytę
              </Link>
            </div>
          </div>
          <div className='w-full md:w-1/3 z-10 flex justify-center'>
            <div className='w-40 h-40 rounded-full glass border border-primary-gold/30 flex items-center justify-center radial-surface'>
              <span className='material-symbols-outlined text-primary-gold text-7xl'>
                workspace_premium
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
