import type { Metadata } from "next"
import carsData from "@/data/cars.json"
import type { CollectionCar } from "@/lib/cars"
import { notFound } from "next/navigation"
import Configurator from "@/components/Configurator"

const cars = carsData as CollectionCar[]

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const car = cars.find((c) => c.id === Number(id))
  if (!car) return { title: "Nie znaleziono | LUXE AUTO" }

  return {
    title: `Konfigurator ${car.name} | LUXE AUTO`,
    description: `Skonfiguruj swój ${car.name} ${car.variant} — lakier, felgi, wnętrze i pakiety. Personalizacja na żywo z natychmiastową wyceną.`,
  }
}

export async function generateStaticParams() {
  return cars.map((car) => ({ id: String(car.id) }))
}

export default async function FinalisingPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const car = cars.find((c) => c.id === Number(id))
  if (!car) notFound()

  return <Configurator car={car} />
}
