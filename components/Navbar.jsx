'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { IoArrowBackOutline } from "react-icons/io5"
import { BsPersonCircle } from "react-icons/bs";

const appLinks = [
  { href: '/app/accounts', label: <BsPersonCircle className='text-lg'/>},
  { href: '/app', label: 'Calculadoras' },
  { href: '/app/glosario', label: 'Glosario' },
];

const hiddeRouts = [
  '/app/accounts',
  '/app/accounts/register'
];

export default function Navbar() {
  const pathname = usePathname();
  if (hiddeRouts.includes(pathname)) return null;

  const isHome = pathname === '/';
  const isApp = pathname.startsWith('/app');

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[var(--divider)]">
      <div className="max-w-7xl mx-auto px-10 h-[58px] flex items-center justify-between">

        <Logo />

        {isHome && <CTA />}
        {isApp && <AppNav pathname={pathname} />}

      </div>
    </nav>
  )
}



function Logo() {
  return (
    <Link href="/" className="flex items-center">
      <span className="text-xl font-extrabold tracking-tight">
        <span className="text-[var(--accentL)]">FinKaan</span>
      </span>
      <span className="ml-2 text-[9px] font-bold text-[var(--txtMuted)] tracking-[2px]">
        WEB
      </span>
    </Link>
  )
}



function CTA() {
  return (
    <Link
      href="/app"
      className="px-5 py-2 bg-[var(--accent)] text-white text-sm font-semibold transition hover:opacity-90"
    >
      Abrir plataforma →
    </Link>
  )
}



function AppNav({ pathname }) {
  return (
    <div className="flex items-center">

      {/* Links */}
      {appLinks.map((link) => {
        const isActive =
          link.href === '/app'
            ? pathname === '/app'
            : pathname.startsWith(link.href)

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`px-4 py-2 text-sm border-b-2 transition-colors
              ${isActive
                ? 'font-semibold text-[var(--txt)] border-[var(--accent)]'
                : 'text-[var(--txtMuted)] border-transparent hover:text-[var(--txt)]'
              }`}
          >
            {link.label}
          </Link>
        )
      })}

      {/* Back button */}
      <Link
        href="/"
        className="ml-4 p-2 border border-[var(--divider)] text-[var(--txtMuted)] text-xs hover:bg-gray-100 transition"
      >
        <IoArrowBackOutline />
      </Link>

    </div>
  )
}