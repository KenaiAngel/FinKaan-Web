'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const appLinks = [
  { href: '/app', label: 'Calculadoras' },
  { href: '/app/glosario', label: 'Glosario' },
]

export default function Navbar() {
  const path = usePathname()
  const inApp = path !== '/'

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[var(--divider)]">
      <div className="max-w-7xl mx-auto px-10 h-[58px] flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="no-underline flex items-center">
          <span className="text-xl font-extrabold text-gray-900 tracking-tight">
            <span className="text-[var(--accentL)]">FinKaan</span>
          </span>
          <span className="ml-2 text-[9px] font-bold text-[var(--txtMuted)] tracking-[2px]">
            WEB
          </span>
        </Link>

        {/* Right side */}
        {!inApp ? (
          <Link
            href="/app"
            className="no-underline px-5 py-2 bg-[var(--accent)] text-white text-sm font-semibold hover:bg-blue-600 transition"
          >
            Abrir plataforma →
          </Link>
        ) : (
          <div className="flex items-center gap-0">
            {appLinks.map((l) => {
              const active = path === l.href || path.startsWith(l.href + '/')
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`no-underline px-4 py-2 text-sm transition-colors border-b-2 ${
                    active
                      ? 'font-semibold text-[var(--txt)] border-[var(--accent)]'
                      : 'font-normal text-[var(--txtMuted)] border-transparent hover:text-gray-700'
                  }`}
                >
                  {l.label}
                </Link>
              )
            })}

            <Link
              href="/"
              className="no-underline ml-4 px-3 py-1.5 border border-[var(--divider)] text-[var(--txtMuted)] text-xs hover:bg-gray-100 transition"
            >
              ← Inicio
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}