'use client'

import { useState } from 'react'
import CalcCetes from '../../components/Dashboard/CalcCetes';
import CalcDeuda from '../../components/Dashboard/CalcDeuda';
import CalcAfore from '../../components/Dashboard/CalcAfore';
import Comparador from '../../components/Dashboard/Comparador';
import Modal from '../../components/Modal';
import { useRouter } from "next/navigation";

const calcs = [
  { id: 'cetes',      label: 'CETES vs Inflación'    },
  { id: 'deuda',      label: 'Proyector de deuda'    },
  { id: 'afore',      label: 'Simulador AFORE'       },
  { id: 'comparador', label: 'Comparador de productos' },
]

export default function Dashboard() {
  const [calc, setCalc] = useState('cetes');
  const [modalOpen, setModalOpen] = useState(true);
  const router = useRouter();
  const handleLogin = ()=>{
    router.push(`/app/accounts`)
  };

  return (
    <div className="max-w-7xl mx-0 px-10">
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <div className='bg-white max-w-2xl w-6xl flex justify-center flex-col items-center gap-6 p-6 pt-2'>
          <h2 className='text-lg font-bold text-center'>Bienvenido al Simulador Financiero</h2>
          <p className='text-center w-11/12'>
            Este simulador te permite ajustar variables financieras clave y analizar los resultados para tomar decisiones informadas sobre tus finanzas personales. 
          </p>
          <div className='mt-2 flex gap-5'>
            <button className='w-36 text-sm border border-[var(--accentL)] bg-[var(--accent)] hover:bg-[var(--bg)] hover:text-black transition duration-700 ease-in-out text-white   rounded-xl p-1' onClick={handleLogin}>Iniciar Sesión</button>
            <button className='w-36  text-sm border border-[var(--accentL)] bg-[var(--accent)] hover:bg-[var(--bg)] hover:text-black transition duration-700 ease-in-out text-white rounded-xl p-1' onClick={()=>setModalOpen(false)}>Continuar como invitado</button>
          </div>

        </div>
      </Modal>

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