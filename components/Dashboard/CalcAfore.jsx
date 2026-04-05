'use client';
import { useState, useMemo } from "react"
import { Row, Stat } from '../Dashboard/ux/Samples';
import { Chart2D, ChartInteres } from '../Dashboard/ux/Charts';

export default function CalcAfore() {
  const [salario, setSalario] = useState(8000)
  const [edad, setEdad] = useState(22)
  const [rendA, setRendA] = useState(8.5)
  const [aportV, setAportV] = useState(500)
   const mxn = (n) => '$' + Math.round(n).toLocaleString('es-MX') + ' MXN'
 const pct = (n) => n.toFixed(1) + '%';

  const aportObl = salario * 0.065
  const aportTot = aportObl + aportV
  const anios = 65 - edad
  const mA = anios * 12
  const tM = rendA / 100 / 12

  const ahorro = aportTot * ((Math.pow(1 + tM, mA) - 1) / tM)
  const ahorroSin = aportObl * ((Math.pow(1 + tM, mA) - 1) / tM)
  const pension = ahorro / 240
  const pensionS = ahorroSin / 240
  const beneficio = ahorro - ahorroSin

  const pts = Array.from({ length: Math.min(anios, 8) }, (_, i) => {
    const m = Math.round(((i + 1) * mA) / Math.min(anios, 8))
    return Math.round(aportTot * ((Math.pow(1 + tM, m) - 1) / tM))
  })

  const ptsSin = Array.from({ length: Math.min(anios, 8) }, (_, i) => {
    const m = Math.round(((i + 1) * mA) / Math.min(anios, 8))
    return Math.round(aportObl * ((Math.pow(1 + tM, m) - 1) / tM))
  })

  return (
    <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-9">
      
      {/* LEFT */}
      <div className="space-y-4">
        <Row label="Salario mensual" value={salario} min={3000} max={80000} step={500}
          fmt={mxn} onChange={setSalario} />

        <Row label="Edad actual" value={edad} min={18} max={60}
          fmt={v => v + ' años'} onChange={setEdad} color="var(--xp)" />

        <Row label="Rendimiento anual estimado" value={rendA} min={4} max={15} step={0.5}
          fmt={pct} onChange={setRendA} color="var(--green)" />

        <Row label="Aportación voluntaria" value={aportV} min={0} max={5000} step={100}
          fmt={mxn} onChange={setAportV} color="var(--amber)" />

        <div className="bg-[var(--card2)] p-3">
          <div className="text-[11px] text-[var(--txtMuted)] mb-2">
            Aportación obligatoria mensual
          </div>
          <div className="text-lg font-extrabold text-[var(--accent)]">
            {mxn(aportObl)}
          </div>
          <div className="text-[11px] text-[var(--txtMuted)] mt-1">
            ~6.5% del salario (patrón + empleado + gobierno)
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div>
        <div className="bg-[var(--card)] p-5 mb-1">
          <div className="text-[9px] font-bold text-[var(--txtMuted)] tracking-widest mb-1">
            AHORRO PROYECTADO AL RETIRO (65 AÑOS)
          </div>
          <div className="text-4xl font-black text-[var(--green)] tracking-tight">
            {mxn(ahorro)}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-1 mb-5">
          <Stat
            label="PENSIÓN MENSUAL EST."
            value={mxn(pension)}
            color="var(--green)"
            sub={`vs ${mxn(pensionS)} sin aportación vol.`}
          />
          <Stat
            label="BENEFICIO APORTACIÓN VOL."
            value={mxn(beneficio)}
            color="var(--amber)"
          />
          <Stat
            label="AÑOS COTIZANDO"
            value={`${anios} años`}
            color="var(--xp)"
          />
        </div>

        
        <div className="mt-3 p-3 m mb-6 border-l-2 text-xs"
             style={{
               borderColor: "var(--xp)",
               background: "rgba(167,139,250,0.07)",
               color: "var(--txtSec)"
             }}>
          💡 Agregar {mxn(aportV)}/mes de aportación voluntaria equivale a {mxn(beneficio)} extra al retiro.
        </div>

        <Chart2D
          data={[...pts, ...ptsSin.map(v => -1)].filter(v => v >= 0).slice(0, pts.length)}
          colors={['#F8D7DB','#EDD8DB','#D9A0A8','#9B2335','#BF3A4E','#9B2335','#E57A8A','#F8D7DB']}
          labels={pts.map((_, i) => `${edad + Math.round(((i + 1) * anios) / pts.length)}a`)}
        />


        <div className="mt-36">
          <ChartInteres capital={salario} tasa={rendA} anios={anios} />
        </div>
      </div>
    </div>
  )
}

