"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navLinks = [
  { href: "/", label: "Salon" },
  { href: "/collection", label: "Kolekcja" },
  { href: "/about", label: "O nas" },
  { href: "/contact", label: "Kontakt" },
]

export default function Header() {
  const pathname = usePathname()
  return (
    <header className='flex justify-between items-center px-margin-page p-4 w-full sticky top-0 z-50 bg-surface/80 dark:bg-surface/80 backdrop-blur-xl border-b border-white/10'>
      <Link
        href='/'
        className='text-headline-lg font-headline-lg font-bold text-primary-gold tracking-tighter'
      >
        LUXE AUTO
      </Link>
      <nav className='hidden md:flex gap-8 items-center'>
        {navLinks.map((link) => (
          <Link
            className={`text-on-surface-variant hover:text-on-surface transition-colors font-body-md text-body-md ${pathname === link.href ? "text-primary-gold border-b-2 border-primary-gold" : ""}`}
            href={link.href}
            key={link.label}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <div className='flex items-center gap-4'>
        <div className='glass px-4 py-2 rounded-full hidden lg:flex items-center gap-2'>
          <span className='material-symbols-outlined text-on-surface-variant text-sm'>
            search
          </span>
          <input
            className='bg-transparent border-none focus:ring-0 text-label-sm font-label-sm w-48 outline-none'
            placeholder='Szukaj modeli...'
            type='text'
          />
        </div>
        <button className='w-10 h-10 flex items-center justify-center rounded-full glass hover:bg-white/5 transition-all duration-300 active:scale-90'>
          <span className='material-symbols-outlined text-primary-gold'>
            person
          </span>
        </button>
      </div>
    </header>
  )
}
