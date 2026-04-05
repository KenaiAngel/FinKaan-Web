'use client'

import { useState } from 'react'
import CalcCetes from '../../components/Dashboard/CalcCetes';
import CalcDeuda from '../../components/Dashboard/CalcDeuda';
import CalcAfore from '../../components/Dashboard/CalcAfore';
import Comparador from '../../components/Dashboard/Comparador';

const calcs = [
  { id: 'cetes',      label: 'CETES vs Inflación'    },
  { id: 'deuda',      label: 'Proyector de deuda'    },
  { id: 'afore',      label: 'Simulador AFORE'       },
  { id: 'comparador', label: 'Comparador de productos' },
]

export default function Dashboard() {
  const [calc, setCalc] = useState('cetes')

  return (
    <div className="max-w-7xl mx-0 px-10">

      {/* Header */}
      <div className="pt-6 pb-5 flex justify-between items-end border-b border-[var(--divider)]">
        <div>
          <h1 className="text-[22px] font-extrabold text-[var(--txt)] tracking-[-0.5px]">
            Simulador financiero
          </h1>
          <p className="text-[13px] text-[var(--txtMuted)] mt-[3px]">
            Ajusta variables · Analiza resultados · Tasas reales México 2025
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] text-[var(--txtMuted)]">
            Sesión temporal
          </span>
          <span className="text-[10px] font-bold text-[var(--green)] px-2 py-[2px] bg-[rgba(34,197,94,0.1)]">
            ACTIVA
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[var(--divider)] mb-9">
        {calcs.map((c) => {
          const active = calc === c.id

          return (
            <button
              key={c.id}
              onClick={() => setCalc(c.id)}
              className={`px-[22px] py-[14px] text-[13px] whitespace-nowrap transition-colors border-b-2 -mb-[1px]
                ${active
                  ? 'font-bold text-[var(--txt)] border-[var(--accent)]'
                  : 'font-normal text-[var(--txtMuted)] border-transparent hover:text-[var(--txt)]'
                }`}
            >
              {c.label}
            </button>
          )
        })}
      </div>

      {/* Content */}
      <div className="pb-16">
        {calc === 'cetes'      && <CalcCetes />}
        {calc === 'deuda'      && <CalcDeuda />}
        {calc === 'afore'      && <CalcAfore />}
        {calc === 'comparador' && <Comparador />}
      </div>

    </div>
  )
}