import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import FaqAccordion, { type FaqItem } from "@/components/FaqAccordion";

export const metadata: Metadata = {
  title: "Kontakt | LUXE AUTO",
  description:
    "Połącz się z LUXE AUTO — prywatne oględziny, konsjerż, finansowanie. Salony w Warszawie, Krakowie i Sopocie. Odpowiadamy w ciągu 24 godzin.",
};

/* ------------------------------------------------------------------ */
/*  Dane statyczne strony                                              */
/* ------------------------------------------------------------------ */
const channels = [
  {
    icon: "call",
    title: "Telefon",
    value: "+48 22 100 20 30",
    detail: "Pon.–Sob. 9:00–20:00",
    href: "tel:+48221002030",
  },
  {
    icon: "mail",
    title: "E-mail",
    value: "atelier@luxeauto.pl",
    detail: "Odpowiedź w 24 godziny",
    href: "mailto:atelier@luxeauto.pl",
  },
  {
    icon: "sms",
    title: "WhatsApp",
    value: "+48 600 100 200",
    detail: "Dyskretna rozmowa z konsjerżem",
    href: "https://wa.me/48600100200",
  },
  {
    icon: "support_agent",
    title: "Konsjerż VIP",
    value: "concierge@luxeauto.pl",
    detail: "Dedykowany opiekun 24/7",
    href: "mailto:concierge@luxeauto.pl",
  },
];

const salons = [
  {
    name: "Atelier Warszawa",
    address: "ul. Łazienkowska 12, 00-437 Warszawa",
    hours: "Pon.–Sob. 10:00–20:00",
    accent: "Flaga Manufaktury",
    mapQuery: "Warszawa, Łazienkowska 12",
  },
  {
    name: "Galeria Kraków",
    address: "Rynek Główny 7, 31-042 Kraków",
    hours: "Pon.–Nd. 11:00–21:00",
    accent: "Kolekcja Klasyków",
    mapQuery: "Kraków, Rynek Główny 7",
  },
  {
    name: "Pavilon Sopot",
    address: "ul. Bohaterów Monte Cassino 33, 81-767 Sopot",
    hours: "Tylko na zaproszenie",
    accent: "Era Elektryczna",
    mapQuery: "Sopot, Monte Cassino 33",
  },
];

const faqs: FaqItem[] = [
  {
    question: "Czy mogę umówić prywatne oględziny poza godzinami otwarcia?",
    answer:
      "Oczywiście. To wręcz nasza preferowana forma spotkania. Wystarczy w formularzu wybrać temat „Prywatne oględziny” i wskazać dogodny termin — konsjerż potwierdzi rezerwację i przygotuje salon wyłącznie dla Ciebie, z kawą i dyskusją bez pośpiechu.",
  },
  {
    question: "Czy oferujecie transport i odbiór auta w całej Polsce?",
    answer:
      "Tak. Dostawa w zamkniętym transporcie jest możliwa do dowolnego miejsca w kraju. Dla klientów VIP udostępniamy również usługę Concierge VIP — przekazanie w białych rękawiczkach przez osobistego opiekuna, w wybranym przez Ciebie terminie.",
  },
  {
    question: "Jak wygląda proces finansowania i leasingu?",
    answer:
      "Współpracujemy z czołowymi instytucjami finansowymi i przygotowujemy indywidualne symulacje leasingu, kredytu oraz wynajmu długoterminowego — również w wariancie 0%. Decyzję zazwyczaj otrzymujesz w ciągu 48 godzin od złożenia wniosku.",
  },
  {
    question: "Czy skupujecie samochody na komis lub w ramach rozliczenia?",
    answer:
      "Tak, prowadzimy skup aut luksusowych z udokumentowaną proweniencją. Po wstępnej weryfikacji przygotowujemy wycenę i — jeśli zechcesz — wliczymy Twój obecny samochód w rozliczenie nowej transakcji. Całość odbywa się w pełnej dyskrecji.",
  },
  {
    question: "Jak gwarantujecie prywatność klientów?",
    answer:
      "Prywatność jest jedną z naszych naczelnych zasad. Nie publikujemy wizerunku klientów ani ich pojazdów bez wyraźnej zgody, a dane transakcyjne przechowujemy zgodnie z RODO. W razie potrzeby umożliwiamy również dyskretne przekazanie auta poza salonem.",
  },
];

const steps = [
  {
    icon: "edit_note",
    title: "Napisz do nas",
    detail: "Wypełnij formularz lub zadzwoń. Im więcej szczegółów, tym lepiej.",
  },
  {
    icon: "perm_contact_calendar",
    title: "Umów spotkanie",
    detail: "Konsjerż kontaktuje się w ciągu 24 godzin i proponuje termin.",
  },
  {
    icon: "handshake",
    title: "Poznaj auto na żywo",
    detail: "Prywatne oględziny w salonie lub transport próbny pod Twój adres.",
  },
];

/* ------------------------------------------------------------------ */
/*  Strona                                                             */
/* ------------------------------------------------------------------ */
export default function ContactPage() {
  return (
    <>
      {/* ----------------------- HERO ----------------------- */}
      <section className="relative px-margin-page py-stack-lg overflow-hidden bg-surface">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 radial-surface pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <Link
              href="/"
              className="text-on-surface-variant hover:text-on-surface text-label-sm font-label-sm flex items-center gap-1 transition-colors"
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              Strona główna
            </Link>
            <span className="text-on-surface-variant text-label-sm font-label-sm">|</span>
            <span className="text-primary-gold text-label-sm font-label-sm uppercase tracking-widest">
              Kontakt
            </span>
          </div>

          <h1 className="font-display-lg text-display-lg mb-6 leading-none">
            Porozmawiajmy
            <br />
            <span className="text-primary-gold">o detalach.</span>
          </h1>

          <p className="text-on-surface-variant text-body-md font-body-md max-w-2xl">
            Niezależnie czy szukasz konkretnego modelu, rozważasz finansowanie,
            czy po prostu chcesz wziąć głęboki oddech zapachem skóry Nappa —
            jesteśmy tu, by słuchać. Wybierz najwygodniejszą drogę i pozwól nam
            zadbać o resztę.
          </p>
        </div>
      </section>

      {/* ----------------------- KANAŁY KONTAKTU ----------------------- */}
      <section className="px-margin-page py-stack-lg bg-surface-container-low">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {channels.map((c) => (
            <a
              key={c.title}
              href={c.href}
              className="card-glow group glass rounded-3xl p-glass-padding flex flex-col gap-3 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl relative overflow-hidden"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary-gold/10 border border-primary-gold/30 flex items-center justify-center shrink-0 group-hover:bg-primary-gold transition-all">
                <span className="material-symbols-outlined text-primary-gold group-hover:text-on-primary-gold">
                  {c.icon}
                </span>
              </div>
              <div className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-widest">
                {c.title}
              </div>
              <div className="font-data-lg text-data-lg text-on-surface break-all">
                {c.value}
              </div>
              <div className="text-label-sm font-label-sm text-on-surface-variant">
                {c.detail}
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ----------------------- FORMULARZ + INFO ----------------------- */}
      <section className="px-margin-page py-stack-lg bg-surface">
        <div className="grid lg:grid-cols-[1fr_380px] gap-gutter items-start">
          {/* Lewa: formularz */}
          <div>
            <div className="mb-6 max-w-2xl">
              <h2 className="font-headline-lg text-headline-lg mb-3">
                Napisz wiadomość
              </h2>
              <p className="text-on-surface-variant text-body-md font-body-md">
                Każde zapytanie traktujemy indywidualnie. Twoja wiadomość trafia
                bezpośrednio do osobistego konsjerża — nie do call center.
              </p>
            </div>
            <ContactForm />
          </div>

          {/* Prawa: panel boczny z faktem dnia i wartym zaufania */}
          <aside className="lg:sticky lg:top-24 space-y-gutter">
            {/* Godziny / obietnica odpowiedzi */}
            <div className="glass rounded-4xl p-glass-padding relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-primary-gold/10 blur-3xl pointer-events-none" />
              <div className="relative z-10">
                <span className="material-symbols-outlined text-primary-gold text-4xl! mb-3 block">
                  schedule
                </span>
                <h3 className="font-data-lg text-data-lg mb-4">
                  Obietnica odpowiedzi
                </h3>
                <div className="flex items-end gap-3 mb-4">
                  <span className="font-display-lg text-display-lg text-primary-gold leading-none">
                    24h
                  </span>
                  <span className="text-label-sm font-label-sm text-on-surface-variant pb-1">
                    maksymalny czas reakcji
                  </span>
                </div>
                <div className="space-y-2 pt-4 border-t border-white/10">
                  <Row label="Atelier Warszawa" value="10–20" />
                  <Row label="Galeria Kraków" value="11–21" />
                  <Row label="Konsjerż VIP" value="24/7" />
                </div>
              </div>
            </div>

            {/* Dyskrecja */}
            <div className="glass rounded-4xl p-glass-padding">
              <span className="material-symbols-outlined text-primary-gold text-4xl! mb-3 block">
                shield_person
              </span>
              <h3 className="font-data-lg text-data-lg mb-2">Pełna dyskrecja</h3>
              <p className="text-on-surface-variant text-body-md font-body-md">
                Twoje dane są szyfrowane i nigdy nie udostępniane. Transakcje
                prowadzimy z taktem, jak przystało na prawdziwe atelier.
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* ----------------------- JAK TO DZIAŁA ----------------------- */}
      <section className="px-margin-page py-stack-lg bg-surface-container-low">
        <div className="mb-12 max-w-2xl">
          <h2 className="font-headline-lg text-headline-lg mb-4">
            Trzy kroki do spotkania
          </h2>
          <p className="text-on-surface-variant text-body-md font-body-md">
            Bez formularzy-koszmarów i tygodni oczekiwania. Od pierwszej
            wiadomości do chwili, w której usiądziesz za kierownicą.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {steps.map((s, i) => (
            <div
              key={s.title}
              className="glass rounded-3xl p-glass-padding relative hover:-translate-y-1 transition-transform duration-500"
            >
              <span className="absolute top-4 right-5 font-data-lg text-5xl! text-white/5 select-none">
                0{i + 1}
              </span>
              <span className="material-symbols-outlined text-primary-gold text-4xl! mb-4 block">
                {s.icon}
              </span>
              <h3 className="font-data-lg text-data-lg mb-2">{s.title}</h3>
              <p className="text-on-surface-variant text-body-md font-body-md">
                {s.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ----------------------- SALONY ----------------------- */}
      <section className="px-margin-page py-stack-lg bg-surface">
        <div className="mb-12 max-w-2xl">
          <h2 className="font-headline-lg text-headline-lg mb-4">
            Nasze salony
          </h2>
          <p className="text-on-surface-variant text-body-md font-body-md">
            Trzy przestrzenie w Polsce, każda z własnym charakterem. Najszybciej
            poczujesz klimat na żywo — zapraszamy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {salons.map((s) => (
            <div
              key={s.name}
              className="card-glow group glass rounded-3xl overflow-hidden relative hover:-translate-y-1 transition-transform duration-500"
            >
              {/* Miniatura mapy — statyczny kafelek OpenStreetMap bez klucza API */}
              <a
                href={`https://www.openstreetmap.org/search?query=${encodeURIComponent(
                  s.mapQuery
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Zobacz ${s.name} na mapie`}
                className="block relative h-44 bg-surface-container overflow-hidden group/map"
                style={{
                  backgroundImage: `url('https://staticmap.openstreetmap.de/staticmap.php?center=${encodeURIComponent(
                    s.mapQuery
                  )}&zoom=14&size=600x350&maptype=mapnik')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <span className="absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent" />
                <span className="absolute bottom-3 right-3 glass px-3 py-1.5 rounded-full text-label-sm font-label-sm flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm text-primary-gold">
                    location_on
                  </span>
                  Zobacz na mapie
                </span>
              </a>

              <div className="p-glass-padding">
                <div className="text-label-sm font-label-sm text-primary-gold uppercase tracking-widest mb-1">
                  {s.accent}
                </div>
                <h3 className="font-data-lg text-data-lg mb-2">{s.name}</h3>
                <p className="text-on-surface-variant text-body-md font-body-md flex items-start gap-2">
                  <span className="material-symbols-outlined text-base mt-1">
                    place
                  </span>
                  {s.address}
                </p>
                <p className="text-on-surface-variant text-label-sm font-label-sm flex items-center gap-2 mt-2">
                  <span className="material-symbols-outlined text-base">
                    schedule
                  </span>
                  {s.hours}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ----------------------- FAQ ----------------------- */}
      <section className="px-margin-page py-stack-lg bg-surface-container-low">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 items-start">
          <div className="lg:sticky lg:top-24">
            <span className="material-symbols-outlined text-primary-gold text-5xl! mb-4 block">
              quiz
            </span>
            <h2 className="font-headline-lg text-headline-lg mb-4">
              Pytania, które
              <br />
              <span className="text-primary-gold italic">często słyszymy</span>
            </h2>
            <p className="text-on-surface-variant text-body-md font-body-md mb-6">
              Nie znalazłeś odpowiedzi? Napisz do nas — konsjerż rozwieje każdą
              wątpliwość.
            </p>
            <Link
              href="mailto:atelier@luxeauto.pl"
              className="inline-flex items-center gap-2 text-primary-gold font-data-lg text-data-lg hover:gap-3 transition-all"
            >
              <span className="material-symbols-outlined">forward_to_inbox</span>
              atelier@luxeauto.pl
            </Link>
          </div>
          <FaqAccordion items={faqs} />
        </div>
      </section>

      {/* ----------------------- CTA ----------------------- */}
      <section className="px-margin-page py-stack-lg bg-surface overflow-hidden">
        <div className="glass p-12 rounded-[3rem] relative overflow-hidden flex flex-col md:flex-row items-center gap-12">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-30 radial-surface pointer-events-none" />
          <div className="w-full md:w-2/3 z-10">
            <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg mb-6 leading-tight">
              Kawa jest gorąca.
              <br />
              <span className="text-primary-gold italic">Kluczyki czekają.</span>
            </h2>
            <p className="text-on-surface-variant text-body-md font-body-md mb-8 max-w-xl">
              Wpadnij do naszego atelier bez zapowiedzi albo umów się na
              prywatne oględziny. Zawsze znajdziemy chwilę, by opowiedzieć Ci
              historię ukrytą w każdym aucie.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/collection"
                className="w-fit bg-primary-gold text-on-primary-gold px-10 py-5 rounded-2xl font-data-lg text-data-lg gold-glow gold-glow-hover flex items-center gap-3 transition-transform hover:scale-105"
              >
                Zobacz kolekcję
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
              <Link
                href="/about"
                className="w-fit glass px-10 py-5 rounded-2xl font-data-lg text-data-lg hover:bg-white/10 transition-all flex items-center gap-3"
              >
                <span className="material-symbols-outlined">history_edu</span>
                Poznaj naszą historię
              </Link>
            </div>
          </div>
          <div className="w-full md:w-1/3 z-10 flex justify-center">
            <div className="w-40 h-40 rounded-full glass border border-primary-gold/30 flex items-center justify-center radial-surface">
              <span className="material-symbols-outlined text-primary-gold text-7xl">
                forum
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Pomocniczy wiersz w panelu godzin                                  */
/* ------------------------------------------------------------------ */
function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-label-sm font-label-sm text-on-surface-variant">
        {label}
      </span>
      <span className="font-data-lg text-data-lg text-on-surface">{value}</span>
    </div>
  );
}
