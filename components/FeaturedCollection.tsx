import CarCard from "@/components/CarCard";
import { cars } from "@/lib/cars";

export default function FeaturedCollection() {
  return (
    <section className="px-margin-page py-stack-lg bg-surface">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="font-headline-lg text-headline-lg mb-2">
            Wyróżniona Kolekcja
          </h2>
          <p className="text-on-surface-variant font-body-md text-body-md">
            Starannie wyselekcjonowane, najbardziej prestiżowe modele w naszym
            asortymencie.
          </p>
        </div>
        <button className="text-primary-gold font-label-sm text-label-sm flex items-center gap-2 hover:underline">
          Zobacz cały salon{" "}
          <span className="material-symbols-outlined text-sm">north_east</span>
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
        {cars.map((car) => (
          <CarCard key={car.name} car={car} />
        ))}
      </div>
    </section>
  );
}
