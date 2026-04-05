'use client'
import Link from 'next/link'
import { useState, Fragment } from 'react'

const diferencias = [
  { app: 'Juego narrativo',    web: 'Simulador financiero' },
  { app: 'Escenarios',         web: 'Calculadoras'         },
  { app: 'Decisiones rápidas', web: 'Ajustar variables'    },
  { app: 'Gamificación',       web: 'Análisis'             },
  { app: '5 minutos',          web: '30 minutos'           },
]

const herramientas = [
  { icon: '📊', title: 'Calculadora CETES', desc: 'Proyecta rendimientos reales contra inflación. Compara CETES 28d, banco y efectivo con gráfica 3D interactiva.' },
  { icon: '💳', title: 'Proyector de deuda', desc: 'Ingresa tu deuda y CAT real. Visualiza cuándo se liquida según tu pago mensual y cuánto pagas en intereses.' },
  { icon: '🛡️', title: 'Simulador AFORE',   desc: 'Calcula tu pensión estimada según salario, edad y rendimiento. Gráfica de crecimiento del fondo a 40 años.' },
  { icon: '⚖️', title: 'Comparador de productos', desc: 'CETES vs cuenta de ahorro vs efectivo vs deuda. Tabla de análisis con datos reales de Banxico 2025.' },
]

const stats = [
  { val: '4.3M',  label: 'Universitarios en México',     src: 'ANUIES 2024' },
  { val: '36.6%', label: 'Prefieren ahorro informal',     src: 'ENIF 2024'   },
  { val: '57.3%', label: 'Ahorran < 1 quincena',          src: 'ENSAFI 2023' },
  { val: '10.5%', label: 'Rendimiento CETES 28d',         src: 'Banxico 2025' },
]

export default function Home() {
  const [hov, setHov] = useState(null)
  const H = (id)=>({
    onMouseEnter:()=>setHov(id),
    onMouseLeave:()=>setHov(null),
  })
  return (
    <div>
{/* ── HERO ─────────────────────────────────────── */}
<section className="max-w-7xl mx-auto px-10 py-24 grid grid-cols-2 gap-20 items-center">
  <div className="fade-up">

    <h1 className="text-[60px] font-black leading-[1] tracking-[-3px] text-[var(--txt)] mb-5">
      Calcula.<br />
      Compara.<br />
      <span className="text-[var(--accentL)]">Decide.</span>
    </h1>

    <p className="text-[17px] text-[var(--txtSec)] leading-[1.75] mb-9 max-w-[440px]">
      Herramienta de análisis financiero para jóvenes mexicanos.
      Calculadoras interactivas con tasas reales de Banxico y CETES 2025.
      Sin registro. Sin instalación.
    </p>

    <Link
      href="/app"
      className="inline-block px-9 py-4 bg-[var(--accent)] text-white text-[15px] font-bold transition-opacity"
      style={{ opacity: hov === 'cta' ? 0.85 : 1 }}
      {...H('cta')}
    >
      Abrir plataforma →
    </Link>

    <p className="mt-3.5 text-xs text-[var(--txtMuted)]">
      Sin cuenta · Tasas reales México 2025 · Desde cualquier computadora
    </p>
  </div>

  {/* Stats */}
  <div className="fade-up-1 grid grid-cols-2 gap-[2px]">
    {stats.map((s, i) => (
      <div
        key={s.val}
        className="bg-[var(--card)] px-7 py-8"
        style={{ borderTop: i < 2 ? '2px solid var(--accentDim)' : 'none' }}
      >
        <div className="text-[38px] font-black text-[var(--accentL)] tracking-[-1.5px] leading-none">
          {s.val}
        </div>
        <div className="text-[13px] text-[var(--txt)] mt-2 leading-[1.5]">
          {s.label}
        </div>
        <div className="text-[10px] text-[var(--txtMuted)] mt-1.5 tracking-[0.5px]">
          {s.src}
        </div>
      </div>
    ))}
  </div>
</section>

<div className="h-[1px] bg-[var(--divider)]" />

{/* ── APP vs WEB ───────────────────────────────── */}
<section className="max-w-7xl mx-auto px-10 py-[96px]">
  <div className="grid grid-cols-2 gap-20 items-start">

    <div>
      <div className="text-[10px] font-bold text-[var(--txtMuted)] tracking-[2px] mb-5">
        DOS PLATAFORMAS, UN MISMO ESTUDIANTE
      </div>

      <h2 className="text-[38px] font-black text-[var(--txt)] tracking-[-1.5px] leading-[1.1] mb-5">
        La app es para practicar.<br />
        <span className="text-[var(--accentL)]">La web es para entender.</span>
      </h2>

      <p className="text-[15px] text-[var(--txtSec)] leading-[1.8]">
        El mismo estudiante universitario en dos contextos distintos:
        en el camión con 5 minutos, jugando escenarios en la app móvil;
        frente a la computadora del laboratorio, analizando sus propios
        números con calculadoras serias.
      </p>
    </div>

    {/* Tabla */}
    <div className="grid grid-cols-2 bg-[var(--card)]">
      <div className="px-6 py-3.5 bg-[var(--card2)] text-[11px] font-bold text-[var(--txtMuted)] tracking-[1.5px]">
        APP MÓVIL
      </div>
      <div className="px-6 py-3.5 bg-[var(--accentDim)] text-[11px] font-bold text-[var(--accentL)] tracking-[1.5px]">
        WEB
      </div>

      {diferencias.map((d, i) => (
        <Fragment key={i}>
          <div className="px-6 py-4.5 text-[14px] text-[var(--txtSec)] border-t border-[var(--divider)] bg-[var(--card)]">
            {d.app}
          </div>
          <div className="px-6 py-4.5 text-[14px] text-[var(--txt)] font-semibold border-t border-[var(--divider)] bg-[var(--card)] border-l-2 border-[var(--accent)]">
            {d.web}
          </div>
        </Fragment>
      ))}
    </div>
  </div>
</section>

<div className="h-[1px] bg-[var(--divider)]" />

{/* ── HERRAMIENTAS ─────────────────────────────── */}
<section className="max-w-7xl mx-auto px-8 py-24">
  <div className="mb-13">
    <div className="text-[10px] font-bold text-[var(--txtMuted)] tracking-[2px] mb-4">
      CALCULADORAS
    </div>

    <h2 className="text-[42px] font-black text-[var(--txt)] tracking-[-2px]">
      Tus números reales.<br />
      <span className="text-[var(--accentL)]">Resultados instantáneos.</span>
    </h2>
  </div>

  <div className="grid grid-cols-4 gap-[2px]">
    {herramientas.map(h => (
      <div
        key={h.title}
        className="bg-[var(--card)] px-7 py-9 transition-all"
        style={{
          borderTop:
            hov === h.title
              ? '2px solid var(--accent)'
              : '2px solid var(--divider)',
        }}
        {...H(h.title)}
      >
        <div className="text-[30px] mb-4.5">{h.icon}</div>
        <div className="text-[15px] font-bold text-[var(--txt)] mb-2.5">
          {h.title}
        </div>
        <div className="text-[13px] text-[var(--txtSec)] leading-[1.7]">
          {h.desc}
        </div>
      </div>
    ))}
  </div>

  <div className="mt-9 text-center">
    <Link
      href="/app"
      className="px-10 py-3.5 bg-[var(--accent)] text-white text-sm font-bold transition-opacity"
      style={{ opacity: hov === 'cta2' ? 0.85 : 1 }}
      {...H('cta2')}
    >
      Abrir calculadoras →
    </Link>
  </div>
</section>
<div className="h-[1px] bg-[var(--divider)]" />

{/* ── DATOS REALES ─────────────────────────────── */}
<section className="max-w-7xl mx-auto px-10 py-[96px]">
  <div className="grid grid-cols-2 gap-20">

    <div>
      <div className="text-[10px] font-bold text-[var(--txtMuted)] tracking-[2px] mb-4">
        DATOS REALES · MÉXICO 2025
      </div>

      <h2 className="text-[36px] font-black text-[var(--txt)] tracking-[-1px] leading-[1.1] mb-5">
        No simulaciones genéricas.<br />
        <span className="text-[var(--accentL)]">Tu realidad económica.</span>
      </h2>

      <p className="text-[15px] text-[var(--txtSec)] leading-[1.8]">
        Las calculadoras usan tasas actuales de Banxico, rendimientos reales
        de CETES, salarios promedio IMSS y CAT real de productos financieros
        mexicanos. Los números que ves reflejan lo que encontrarás en la vida real.
      </p>
    </div>

    <div className="flex flex-col gap-[2px]">
      {[
        { fuente: 'Banxico 2025', dato: 'Tasa CETES 28d', valor: '10.5% anual' },
        { fuente: 'INEGI 2025', dato: 'Inflación anual', valor: '~4.5%' },
        { fuente: 'CNBV 2024', dato: 'CAT promedio tarjetas', valor: '96.7%' },
        { fuente: 'IMSS 2025', dato: 'Salario mínimo mensual', valor: '$7,468 MXN' },
        { fuente: 'CONSAR 2024', dato: 'Rendimiento AFORE histórico', valor: '8–11% anual' },
        { fuente: 'CONDUSEF', dato: 'Tasa FONACOT', valor: '10–25% anual' },
      ].map(r => (
        <div
          key={r.dato}
          className="bg-[var(--card)] px-5 py-3.5 grid grid-cols-[100px_1fr_auto] gap-4 items-center"
        >
          <span className="text-[10px] text-[var(--txtMuted)] font-semibold">
            {r.fuente}
          </span>
          <span className="text-[13px] text-[var(--txt)]">
            {r.dato}
          </span>
          <span className="text-[14px] font-bold text-[var(--accentL)]">
            {r.valor}
          </span>
        </div>
      ))}
    </div>

  </div>
</section>

<div className="h-[1px] bg-[var(--divider)]" />

{/* ── MULTILINGÜE ──────────────────────────────── */}
<section className="max-w-7xl mx-auto px-10 py-[96px]">
  <div className="grid grid-cols-[1fr_2fr] gap-20 items-start">

    <div>
      <div className="text-[10px] font-bold text-[var(--txtMuted)] tracking-[2px] mb-4">
        INCLUSIÓN LINGÜÍSTICA
      </div>

      <h2 className="text-[34px] font-black text-[var(--txt)] tracking-[-1px] leading-[1.1] mb-4">
        En tus propias palabras.
      </h2>

      <p className="text-[14px] text-[var(--txtSec)] leading-[1.8]">
        Todas las calculadoras, el glosario y el comparador
        están disponibles en 9 idiomas — incluyendo
        las principales lenguas originarias de México.
      </p>
    </div>

    <div className="grid grid-cols-3 gap-[2px]">
      {[
        { n: 'Español', s: 'Idioma principal', hl: true },
        { n: 'Náhuatl', s: '~1.6M hablantes' },
        { n: 'Mixteco', s: '~530k hablantes' },
        { n: 'Zapoteco', s: '~450k hablantes' },
        { n: 'Tzeltal', s: '~580k hablantes' },
        { n: 'Tzotzil', s: '~420k hablantes' },
        { n: 'Otomí', s: '~290k hablantes' },
        { n: 'Totonaco', s: '~240k hablantes' },
        { n: 'Mazateco', s: '~220k hablantes' },
      ].map(l => (
        <div
          key={l.n}
          className="px-4.5 py-4"
          style={{
            background: l.hl ? 'var(--accentDim)' : 'var(--card)',
            borderLeft: l.hl ? '2px solid var(--accent)' : '2px solid transparent',
          }}
        >
          <div
            className="text-[14px] font-semibold"
            style={{ color: l.hl ? 'var(--accentL)' : 'var(--txt)' }}
          >
            {l.n}
          </div>
          <div className="text-[11px] text-[var(--txtMuted)] mt-1">
            {l.s}
          </div>
        </div>
      ))}
    </div>

  </div>
</section>

<div className="h-[1px] bg-[var(--divider)]" />

{/* ── CTA FINAL ────────────────────────────────── */}
<section className="max-w-7xl mx-auto px-10 py-[96px] text-center">
  <div className="text-[10px] font-bold text-[var(--txtMuted)] tracking-[2px] mb-5">
    SIN INSTALACIÓN · SIN REGISTRO · SESIÓN TEMPORAL
  </div>

  <h2 className="text-[52px] font-black text-[var(--txt)] tracking-[-2px] leading-[1] mb-8">
    Abre las calculadoras.<br />
    <span className="text-[var(--accentL)]">Es gratis.</span>
  </h2>

  <Link
    href="/app"
    className="inline-block px-[52px] py-[18px] bg-[var(--accent)] text-white text-[16px] font-bold transition-opacity"
    style={{ opacity: hov === 'cta3' ? 0.85 : 1 }}
    {...H('cta3')}
  >
    Abrir plataforma →
  </Link>

  <p className="mt-4 text-[13px] text-[var(--txtMuted)]">
    Datos simulados con tasas reales de México 2025. No requerimos datos bancarios.
  </p>
</section>

{/* Footer */}
<div className="h-[1px] bg-[var(--divider)]" />

<footer className="max-w-7xl mx-auto px-10 py-7 flex justify-between items-center flex-wrap gap-2.5">
  <span className="text-sm font-bold text-[var(--txt)]">
    <span className="text-[var(--accentL)]">FinKaan</span>
  </span>
</footer>
    </div>
  );
}
