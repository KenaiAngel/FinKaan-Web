import { useState } from "react"
import { Row, Stat } from '../Dashboard/ux/Samples';
import { Chart2D } from '../Dashboard/ux/Charts';

export default function Comparador() {
  const [capital, setCapital] = useState(20000)
  const [anios, setAnios] = useState(5)

  const productos = [
    { nombre: 'CETES 28d', tasa: 10.5, tipo: 'inversión', riesgo: 'Nulo', liquidez: 'Alta', minimo: '$100', color: '#9B2335' },
    { nombre: 'Cuenta de ahorro', tasa: 6.5, tipo: 'inversión', riesgo: 'Nulo', liquidez: 'Inmediata', minimo: '$0', color: '#9B2335' },
    { nombre: 'AFORE', tasa: 8.5, tipo: 'inversión', riesgo: 'Bajo', liquidez: 'Retiro', minimo: 'Automático', color: '#22C55E' },
    { nombre: 'Efectivo', tasa: -4.5, tipo: 'ahorro', riesgo: 'Inflación', liquidez: 'Inmediata', minimo: '$0', color: '#B08090' },
    { nombre: 'Tarjeta crédito', tasa: -96.7, tipo: 'deuda', riesgo: 'Alto', liquidez: 'N/A', minimo: 'Pago mínimo', color: '#EF4444' },
    { nombre: 'Crédito informal', tasa: -300, tipo: 'deuda', riesgo: 'Muy alto', liquidez: 'N/A', minimo: 'Variable', color: '#7F1D1D' },
  ]

  const meses = anios * 12;
   const mxn = (n) => '$' + Math.round(n).toLocaleString('es-MX') + ' MXN';


  const resultados = productos.map(p => {
    const tM = Math.abs(p.tasa) / 100 / 12
    if (p.tasa >= 0) {
      const final = capital * Math.pow(1 + tM, meses)
      return { ...p, final, delta: final - capital }
    } else {
      return {
        ...p,
        final: capital * Math.pow(1 + tM, meses),
        delta: -(capital * Math.pow(1 + tM, meses) - capital)
      }
    }
  })

  const maxAbs = Math.max(...resultados.map(r => Math.abs(r.delta)))

  return (
    <div>
      {/* Inputs */}
      <div className="flex flex-wrap gap-8 mb-8">
        <div className="flex-1 min-w-[200px]">
          <Row
            label="Capital de referencia"
            value={capital}
            min={1000}
            max={500000}
            step={1000}
            fmt={mxn}
            onChange={setCapital}
          />
        </div>

        <div className="flex-1 min-w-[200px]">
          <Row
            label="Horizonte temporal"
            value={anios}
            min={1}
            max={30}
            fmt={(v) => v + " años"}
            onChange={setAnios}
            color="var(--xp)"
          />
        </div>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-[13px]">
          <thead>
            <tr className="bg-[var(--card2)]">
              {['Producto', 'Tipo', 'Tasa anual', `Resultado (${anios}a)`, 'Ganancia / Costo', 'Liquidez', 'Riesgo'].map(h => (
                <th
                  key={h}
                  className="px-4 py-3 text-left text-[10px] font-bold tracking-[1.2px] text-[var(--txtMuted)] border-b border-[var(--divider)]"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {resultados.map((r, i) => (
              <tr key={r.nombre} className={i % 2 === 0 ? "bg-[var(--card)]" : "bg-[var(--card2)]"}>
                <td
                  className="px-4 py-3 font-semibold text-[var(--txt)] border-l-2"
                  style={{ borderColor: r.color }}
                >
                  {r.nombre}
                </td>

                <td className="px-4 py-3 text-[var(--txtSec)] text-[12px]">
                  {r.tipo}
                </td>

                <td
                  className={`px-4 py-3 font-bold ${r.tasa >= 0 ? "text-[var(--green)]" : "text-[var(--red)]"}`}
                >
                  {r.tasa >= 0 ? "+" : ""}
                  {r.tasa}%
                </td>

                <td className="px-4 py-3 font-bold text-[var(--txt)]">
                  {r.tasa >= 0 ? mxn(r.final) : "—"}
                </td>

                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div
                      className="h-[6px] min-w-[4px]"
                      style={{
                        background: r.tasa >= 0 ? "var(--green)" : "var(--red)",
                        width: `${(Math.abs(r.delta) / maxAbs) * 120}px`
                      }}
                    />
                    <span
                      className={`text-[12px] font-bold ${r.tasa >= 0 ? "text-[var(--green)]" : "text-[var(--red)]"}`}
                    >
                      {r.tasa >= 0 ? "+" : "-"}
                      {mxn(Math.abs(r.delta))}
                    </span>
                  </div>
                </td>

                <td className="px-4 py-3 text-[var(--txtSec)] text-[12px]">
                  {r.liquidez}
                </td>

                <td
                  className={`px-4 py-3 text-[12px] ${
                    r.riesgo === "Nulo"
                      ? "text-[var(--green)]"
                      : r.riesgo.toLowerCase().includes("alto")
                      ? "text-[var(--red)]"
                      : "text-[var(--amber)]"
                  }`}
                >
                  {r.riesgo}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Nota */}
      <div className="mt-4 px-4 py-3 text-[12px] text-[var(--txtSec)] border-l-2 border-[var(--accent)] bg-[rgba(108,95,240,0.07)]">
        Comparativa basada en tasas reales de Banxico e INEGI 2025. Los productos de deuda muestran el costo del crédito, no un resultado de inversión.
      </div>

      {/* Chart */}
      <div className="mt-7">
        <div className="text-[10px] font-bold tracking-[1.5px] text-[var(--txtMuted)] mb-3">
          PROYECCIÓN 3D — PRODUCTOS DE INVERSIÓN ({anios} AÑOS)
        </div>

        <Chart2D
          data={resultados.filter(r => r.tasa > 0).map(r => Math.round(r.final))}
          colors={resultados.filter(r => r.tasa > 0).map(r => r.color)}
          labels={resultados.filter(r => r.tasa > 0).map(r => r.nombre)}
          h={220}
        />
      </div>
    </div>
  )
}