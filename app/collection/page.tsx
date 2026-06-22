import type { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"
import carsData from "@/data/cars.json"
import type { CollectionCar } from "@/lib/cars"
import CollectionExplorer from "@/components/CollectionExplorer"

export const metadata: Metadata = {
  title: "Kolekcja | LUXE AUTO",
  description:
    "Poznaj naszą kolekcję hiperaut, superaut i limuzyn — od Bugatti i Pagani po Rolls-Royce i Koenigsegg.",
}

const cars = carsData as CollectionCar[]

export default function CollectionPage() {
  const availableCount = cars.filter((c) => c.available).length
  const categoriesCount = new Set(cars.map((c) => c.category)).size
  const maxPower = Math.max(
    ...cars.map((c) => Number(c.power.replace(/\D/g, ""))),
  )

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
              Pełna Kolekcja
            </span>
          </div>

          <h1 className='font-display-lg text-display-lg mb-6 leading-none'>
            Kolekcja
            <br />
            <span className='text-primary-gold'>Arcydzieł</span>
          </h1>

          <p className='text-on-surface-variant text-body-md font-body-md mb-8 max-w-xl'>
            Dwanaście najbardziej pożądanych samochodów na świecie, zebranych w
            jednym miejscu. Od hiperaut o mocy przekraczającej 1600 KM po
            elektryczne limuzyny najwyższej klasy — każde z nich to świadectwo
            inżynieryjnej perfekcji.
          </p>

          <div className='flex flex-wrap gap-12'>
            <div>
              <div className='text-primary-gold font-data-lg text-data-lg'>
                {cars.length}
              </div>
              <div className='text-label-sm font-label-sm text-on-surface-variant'>
                Modeli w kolekcji
              </div>
            </div>
            <div>
              <div className='text-primary-gold font-data-lg text-data-lg'>
                {availableCount}
              </div>
              <div className='text-label-sm font-label-sm text-on-surface-variant'>
                Dostępnych teraz
              </div>
            </div>
            <div>
              <div className='text-primary-gold font-data-lg text-data-lg'>
                {categoriesCount}
              </div>
              <div className='text-label-sm font-label-sm text-on-surface-variant'>
                Kategorii
              </div>
            </div>
            <div>
              <div className='text-primary-gold font-data-lg text-data-lg'>
                {maxPower} KM
              </div>
              <div className='text-label-sm font-label-sm text-on-surface-variant'>
                Najwyższa moc
              </div>
            </div>
          </div>
        </div>
      </section>

      <Suspense
        fallback={
          <div className='px-margin-page py-stack-lg bg-surface min-h-[50vh]' />
        }
      >
        <CollectionExplorer cars={cars} />
      </Suspense>
    </>
  )
}
