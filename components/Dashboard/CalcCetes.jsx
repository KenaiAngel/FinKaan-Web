'use client'
import { useState } from 'react';
import { Row, Stat } from '../Dashboard/ux/Samples';
import { Chart2D } from '../Dashboard/ux/Charts';

export default function CalcCetes() {
  const [capital, setCapital] = useState(10000)
  const [meses, setMeses] = useState(12)
  const [inst, setInst] = useState(0)

  const tasas = [10.5, 6.5, 0]
  const inflac = 4.5
  const tasa = tasas[inst]

  const mxn = (n) => '$' + Math.round(n).toLocaleString('es-MX') + ' MXN'
    const pct = (n) => n.toFixed(1) + '%'
  const rend = capital * (Math.pow(1 + tasa / 100 / 12, meses) - 1)
  const pInfl = capital * (Math.pow(1 + inflac / 100 / 12, meses) - 1)
  const real = tasa > 0 ? rend - pInfl : -pInfl
  const final = capital + rend

  const instNames = [
    '📊 CETES 28d — 10.5%',
    '🏦 Cuenta ahorro — 6.5%',
    '💵 Efectivo — 0%',
  ]

  const chartData = tasas.map((t) =>
    Math.round(capital * (Math.pow(1 + t / 100 / 12, meses) - 1) + capital)
  )

  const chartColors = ['#9B2335', '#9B2335', '#B08090']

  return (
    <div className="grid grid-cols-[320px_1fr] gap-9">

      {/* Left */}
      <div>
        <Row
          label="Capital inicial"
          value={capital}
          min={1000}
          max={200000}
          step={500}
          fmt={mxn}
          onChange={setCapital}
        />

        <Row
          label="Plazo"
          value={meses}
          min={1}
          max={48}
          fmt={(v) => v + ' meses'}
          onChange={setMeses}
          color="var(--xp)"
        />

        <div>
          <div className="text-[12px] text-[var(--txtSec)] mb-2">
            Instrumento
          </div>

          {instNames.map((n, i) => {
            const active = inst === i

            return (
              <button
                key={i}
                onClick={() => setInst(i)}
                className={`block w-full px-3.5 py-2.5 mb-[2px] text-left text-[13px] transition-all border-l-2
                  ${active
                    ? 'bg-[var(--accentDim)] text-[var(--txt)] font-semibold border-[var(--accent)]'
                    : 'bg-[var(--card)] text-[var(--txtSec)] font-normal border-transparent hover:text-[var(--txt)]'
                  }`}
              >
                {n}
              </button>
            )
          })}
        </div>
      </div>

      {/* Right */}
      <div>

        {/* Result */}
        <div className="bg-[var(--card)] p-[22px] mb-[2px]">
          <div className="text-[9px] font-bold text-[var(--txtMuted)] tracking-[1.5px] mb-1.5">
            SALDO FINAL ESTIMADO
          </div>
          <div className="text-[40px] font-black text-[var(--txt)] tracking-[-2px]">
            {mxn(final)}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-[2px] mb-5">
          <Stat label="RENDIMIENTO NETO" value={mxn(rend)} color="var(--green)" />
          <Stat
            label="GANANCIA REAL"
            value={mxn(real)}
            color={real >= 0 ? 'var(--green)' : 'var(--red)'}
            sub={real < 0 ? 'Pierdes vs inflación' : 'Sobre inflación'}
          />
          <Stat label="TASA EFECTIVA" value={pct(tasa)} color="var(--accentL)" />
        </div>

        {/* Chart */}
        <Chart2D
          data={chartData}
          colors={chartColors}
          labels={['CETES', 'Cuenta ahorro', 'Efectivo']}
        />

        {/* Warning */}
        {real < 0 && (
          <div className="mt-3 px-3.5 py-2.5 border-l-2 text-[12px] text-[var(--red)] bg-[rgba(239,68,68,0.07)]"
               style={{ borderLeftColor: 'var(--red)' }}>
            ⚠️ Guardar en efectivo equivale a perder {mxn(Math.abs(pInfl))} de poder adquisitivo en {meses} meses por inflación.
          </div>
        )}

      </div>
    </div>
  )
}