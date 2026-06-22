"use client"
import { Suspense, useState } from "react"
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs"
import Link from "next/link"
import { usePathname } from "next/navigation"
import SearchBar from "./SearchBar"

const navLinks = [
  { href: "/", label: "Salon" },
  { href: "/collection", label: "Kolekcja" },
  { href: "/about", label: "O nas" },
  { href: "/contact", label: "Kontakt" },
]

export default function Header() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
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
          <Suspense fallback={<div className='w-48 lg:block hidden' />}>
            <SearchBar
              className='hidden lg:flex'
              inputClassName='w-48'
              enableHotkey
            />
          </Suspense>
          <Show when="signed-out">
            <SignInButton>
              <button className='w-10 h-10 flex items-center justify-center rounded-full glass hover:bg-white/5 transition-all duration-300 active:scale-90'>
                <span className='material-symbols-outlined text-primary-gold'>
                  login
                </span>
              </button>
            </SignInButton>
            <SignUpButton>
              <button className='w-10 h-10 flex items-center justify-center rounded-full glass hover:bg-white/5 transition-all duration-300 active:scale-90'>
                <span className='material-symbols-outlined text-primary-gold'>
                  person
                </span>
              </button>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
            <UserButton />
          </Show>
          
          {/* Hamburger button for mobile */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className='md:hidden w-10 h-10 flex items-center justify-center rounded-full glass hover:bg-white/5 transition-all duration-300 active:scale-90'
            aria-label='Otwórz menu'
          >
            <span className='material-symbols-outlined text-primary-gold'>
              menu
            </span>
          </button>
        </div>
      </header>

      {/* Backdrop overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300 md:hidden ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-surface-container/95 backdrop-blur-xl border-l border-white/10 z-50 p-6 flex flex-col gap-6 shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className='flex justify-between items-center pb-4 border-b border-white/10'>
          <span className='text-headline-lg-mobile font-headline-lg-mobile font-bold text-primary-gold tracking-tighter'>
            LUXE AUTO
          </span>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className='w-10 h-10 flex items-center justify-center rounded-full glass hover:bg-white/5 transition-all duration-300 active:scale-90'
            aria-label='Zamknij menu'
          >
            <span className='material-symbols-outlined text-primary-gold'>
              close
            </span>
          </button>
        </div>

        {/* Drawer Search Bar */}
        <Suspense fallback={null}>
          <SearchBar
            autoFocus
            onSubmitted={() => setIsMobileMenuOpen(false)}
          />
        </Suspense>

        {/* Drawer Navigation Links */}
        <nav className='flex flex-col gap-2'>
          {navLinks.map((link) => (
            <Link
              className={`px-4 py-3 rounded-xl transition-all duration-200 font-body-md text-body-md flex items-center justify-between ${
                pathname === link.href
                  ? "bg-primary-gold/10 text-primary-gold font-semibold"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-white/5"
              }`}
              href={link.href}
              key={link.label}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span>{link.label}</span>
              <span className='material-symbols-outlined text-sm opacity-60'>
                chevron_right
              </span>
            </Link>
          ))}
        </nav>

        {/* Drawer Footer / Branding */}
        <div className='mt-auto pt-6 border-t border-white/5 text-center'>
          <p className='text-label-sm text-on-surface-variant opacity-60 font-medium'>
            Definiujemy na nowo doskonałość motoryzacyjną.
          </p>
        </div>
      </div>
    </>
  )
}
