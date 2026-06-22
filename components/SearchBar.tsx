"use client"

import {
  useEffect,
  useRef,
  useState,
  useTransition,
  type FormEvent,
} from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"

const MAX_QUERY = 80

interface SearchBarProps {
  placeholder?: string

  className?: string

  inputClassName?: string

  autoFocus?: boolean

  enableHotkey?: boolean

  onSubmitted?: () => void
}

export default function SearchBar({
  placeholder = "Szukaj modeli...",
  className = "",
  inputClassName = "",
  autoFocus = false,
  enableHotkey = false,
  onSubmitted,
}: SearchBarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState("")
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    setQuery(searchParams.get("q") ?? "")
  }, [searchParams])

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus()
  }, [autoFocus])

  useEffect(() => {
    if (!enableHotkey) return
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        inputRef.current?.focus()
        inputRef.current?.select()
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [enableHotkey])

  const buildTarget = (value: string) => {
    const cleaned = value.trim().slice(0, MAX_QUERY)
    return cleaned
      ? `/collection?q=${encodeURIComponent(cleaned)}`
      : "/collection"
  }

  const navigate = (value: string) => {
    const target = buildTarget(value)
    startTransition(() => {
      if (pathname === "/collection") router.replace(target)
      else router.push(target)
    })
    onSubmitted?.()
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    navigate(query)
  }

  const handleClear = () => {
    setQuery("")
    inputRef.current?.focus()
    if (pathname === "/collection") {
      startTransition(() => router.replace("/collection"))
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      role='search'
      className={`glass px-4 py-2 rounded-full flex items-center gap-2 transition-all duration-300 focus-within:ring-2 focus-within:ring-primary-gold/40 focus-within:border-primary-gold/30 ${className}`}
    >
      <span
        className={`material-symbols-outlined text-on-surface-variant text-sm ${
          isPending ? "animate-spin" : ""
        }`}
        aria-hidden='true'
      >
        {isPending ? "progress_activity" : "search"}
      </span>
      <input
        ref={inputRef}
        type='text'
        value={query}
        onChange={(e) => setQuery(e.target.value.slice(0, MAX_QUERY))}
        placeholder={placeholder}
        aria-label='Szukaj samochodów w kolekcji'
        maxLength={MAX_QUERY}
        className={`bg-transparent border-none focus:ring-0 focus:outline-none text-label-sm font-label-sm min-w-0 flex-1 placeholder:text-on-surface-variant/60 ${inputClassName}`}
      />
      {query && (
        <button
          type='button'
          onClick={handleClear}
          aria-label='Wyczyść wyszukiwanie'
          className='text-on-surface-variant hover:text-on-surface transition-colors shrink-0'
        >
          <span
            className='material-symbols-outlined text-sm'
            aria-hidden='true'
          >
            close
          </span>
        </button>
      )}
      {enableHotkey && !query && (
        <kbd
          className='hidden lg:inline-flex items-center text-label-sm font-label-sm text-on-surface-variant/70 border border-white/10 rounded px-1.5 py-0.5 shrink-0'
          aria-hidden='true'
        >
          ⌘K
        </kbd>
      )}
    </form>
  )
}
