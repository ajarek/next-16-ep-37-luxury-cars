export interface Car {
  id: number;
  name: string;
  year: string;
  variant: string;
  price: string;
  power: string;
  badge: string;
  image: string;
  available?: boolean;
}

// Model z kolekcji — rozszerza podstawowy `Car` o dane specyficzne dla strony
// kolekcji: kategorię (do filtrowania), monogram i akcent kolorystyczny
// (do generowania autorskiego tła karty), oraz osiągi (0-100, prędkość maks.).
export interface CollectionCar {
  id: number;
  name: string;
  year: string;
  variant: string;
  category: string;
  monogram: string;
  price: string;
  power: string;
  acceleration: string;
  topSpeed: string;
  badge: string;
  accent: string;
  available: boolean;
  image: string;
}

export const cars: Car[] = [
  {
    id: 13,
    name: "BMW M8",
    year: "2023",
    variant: "Competition Coupe",
    price: "135 000 USD",
    power: "617 KM",
    badge: "AWD",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDfCnoxMy-12tPqcKdvL_duqoiGo80h92gDxtXjzR8WFoAn6qfTDkyb7SZ6PAVpky8ChrnaIIYdgPtyIAq9PPZgwIGZc4qCE8CejDzmHoq4qNxI9oQc3tCTS_qhU5TbOR6j6K6FV8opYNtMkr-VLdO6pbv0McIHlM4egCX3zgpdoNGhUHKCKR1J4OkVcFvNSZpHeixnC1C5CwtS-VnWfmUWVkZrIGU7WbYhiJCQZ2tShTmdo5bLrFeCrdl3vNpi6WbsRZSj2A9xkmo",
    available: true,
  },
  {
    id: 12,
    name: "Mercedes AMG GT",
    year: "2024",
    variant: "Performance Edition",
    price: "168 000 USD",
    power: "577 KM",
    badge: "V8 Biturbo",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDyNkClcM6k79Iufoxxrg6gVPrV4ziZzj3gjrle_M_kEh8V83sa3SROCVBvOIJ9O29JUU7stAe5LprRZvWOqm_aQ9yTztbpFIhm5xtOGniJ8Be2orBlrVSA2TF8A_6uFGORYYDnKpOeS_OPfzmNJ2uea-_Io_M6DjnnncKYNwJSShsMEKlJLFx4moHMMuA-BgUd5NTWW2qtaUFBcMeV--yQgWNTKZOuBCF5Rq8wZrImEgLtiI9cD0sM7uN71uV6wsBloJUTFQI5ImY",
  },
  {
    id: 14,
    name: "Audi R8 V10",
    year: "2023",
    variant: "Spyder Quattro",
    price: "205 000 USD",
    power: "602 KM",
    badge: "Mid-Engine",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBLT3LpIEagPjhiNNZfFCKISQtBh3qMe9FzwdmysPkfChCl5TmFd7-VmJ-rSiA1Egsb4fxRGxdAuS4aDoJZ_ku_BBeiOCWncL9efCC2z_WJAfjuBUc4Mk42TEA5NnY1d_nybmzlu_E0LJ6dkIi_95Bx8HHj9dW3rlIpN_R6pxxnB6oSKT9E8o7vBwy_vFL_0-3O88SoAXdZKw2oqmFBmtecJeqVpgADF_AARu1TOWc02Jwwv_S5DDhO0473ELSzNS4Wg4-v6BpZaZo",
  },
];
