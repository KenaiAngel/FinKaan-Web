'use client';
import { useState, useMemo } from "react"
import { Row, Stat } from '../Dashboard/ux/Samples';
import { Chart2D } from '../Dashboard/ux/Charts';

export default function CalcDeuda() {
  const [deuda, setDeuda] = useState(5000)
  const [cat, setCat] = useState(96.7)
  const [pagoM, setPagoM] = useState(600)
  const [pagoMin, setPagoMin] = useState(false)
 const mxn = (n) => '$' + Math.round(n).toLocaleString('es-MX') + ' MXN'
 const pct = (n) => n.toFixed(1) + '%';

  const { meses, pagoEfectivo, intTotal, chartPts } = useMemo(() => {
    const tm = Math.pow(1 + cat / 100, 1 / 12) - 1 // FIX CAT

    const mesesArr = []
    let s = deuda

    for (let i = 0; i < 240; i++) {
      const int = s * tm
      const p = pagoMin
        ? Math.max(int + s * 0.01, s * 0.05, 100)
        : pagoM

      if (p <= int) {
        mesesArr.push(s)
        break
      }

      s = Number((s + int - p).toFixed(2))
      mesesArr.push(s)

      if (s <= 0) break
    }

    const pagoEfectivoCalc = pagoMin
      ? mesesArr.reduce((acc, _, i) => {
          const si = i === 0 ? deuda : mesesArr[i - 1]
          const int = si * tm
          return acc + Math.max(int + si * 0.01, si * 0.05, 100)
        }, 0)
      : pagoM * mesesArr.length

    const intTotalCalc = pagoEfectivoCalc - deuda

    const chartPtsCalc = mesesArr.filter(
      (_, i) =>
        i % Math.ceil(mesesArr.length / 7) === 0 ||
        i === mesesArr.length - 1
    )

    return {
      meses: mesesArr,
      pagoEfectivo: pagoEfectivoCalc,
      intTotal: intTotalCalc,
      chartPts: chartPtsCalc,
    }
  }, [deuda, cat, pagoM, pagoMin])

  const gradColors = [
    "#EF4444",
    "#F97316",
    "#F59E0B",
    "#EAB308",
    "#84CC16",
    "#22C55E",
    "#22C55E",
  ]

  return (
    <div className="grid gap-9" style={{ gridTemplateColumns: "320px 1fr" }}>
      
      {/* LEFT */}
      <div>
        <Row
          label="Deuda inicial"
          value={deuda}
          min={500}
          max={100000}
          step={500}
          fmt={mxn}
          onChange={setDeuda}
          color="var(--red)"
        />

        <Row
          label="CAT anual"
          value={cat}
          min={10}
          max={200}
          step={0.5}
          onChange={setCat}
          fmt={pct}
          color="var(--amber)"
        />

        {/* Toggle */}
        <div className="mb-4">
          <button
            onClick={() => setPagoMin(!pagoMin)}
            className="flex items-center gap-2.5 mb-3"
          >
            <div
              className="w-9 h-5 rounded-full relative transition-colors"
              style={{
                background: pagoMin
                  ? "var(--accent)"
                  : "var(--card2)",
              }}
            >
              <div
                className="w-3.5 h-3.5 bg-white rounded-full absolute top-[3px] transition-all"
                style={{
                  left: pagoMin ? 18 : 3,
                }}
              />
            </div>
            <span
              className="text-[13px]"
              style={{ color: "var(--txtSec)" }}
            >
              Solo pago mínimo
            </span>
          </button>

          {!pagoMin && (
            <Row
              label="Pago mensual"
              value={pagoM}
              min={100}
              max={10000}
              step={100}
              onChange={setPagoM}
              fmt={pct}
            />
          )}
        </div>

        {/* CAT info */}
        <div
          className="p-3 text-xs"
          style={{ background: "var(--card2)" }}
        >
          <div
            className="mb-2 font-semibold"
            style={{ color: "var(--txtMuted)" }}
          >
            CAT promedio México
          </div>

          {[
            ["Tarjeta bancaria", "96.7%"],
            ["Tiendas dept.", "110–180%"],
            ["Crédito informal", "150–400%+"],
            ["FONACOT", "10–25%"],
          ].map(([n, v]) => (
            <div
              key={n}
              className="flex justify-between py-1 border-b text-xs"
              style={{ borderColor: "var(--divider)" }}
            >
              <span style={{ color: "var(--txtSec)" }}>{n}</span>
              <span
                className="font-semibold"
                style={{
                  color:
                    n === "FONACOT"
                      ? "var(--green)"
                      : "var(--red)",
                }}
              >
                {v}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT */}
      <div>
        {/* Header */}
        <div
          className="p-5 mb-1"
          style={{ background: "var(--card)" }}
        >
          <div
            className="text-[9px] font-bold tracking-widest mb-1"
            style={{ color: "var(--txtMuted)" }}
          >
            {meses.length >= 240
              ? "⚠️ NO SE LIQUIDA EN 20 AÑOS"
              : `SE LIQUIDA EN ${meses.length} MESES`}
          </div>

          <div
            className="text-[40px] font-black tracking-tight"
            style={{
              color:
                meses.length >= 240
                  ? "var(--red)"
                  : "var(--green)",
            }}
          >
            {meses.length >= 240
              ? "Trampa financiera"
              : `${meses.length} ${
                  meses.length === 1 ? "mes" : "meses"
                }`}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-1 mb-5">
          <Stat
            label="TOTAL PAGADO"
            value={mxn(pagoEfectivo)}
            color="var(--red)"
          />

          <Stat
            label="INTERESES TOTALES"
            value={mxn(intTotal)}
            color="var(--amber)"
            sub={`${((intTotal / deuda) * 100).toFixed(
              0
            )}% extra`}
          />

          <Stat
            label="COSTO MENSUAL REAL"
            value={mxn(
              meses.length
                ? pagoEfectivo / meses.length
                : 0
            )}
            color="var(--accent)"
          />
        </div>

        {/* Chart */}
        <Chart2D
          data={chartPts.map((v) => Math.max(v, 0))}
          colors={gradColors}
          labels={chartPts.map(
            (_, i) =>
              `M${Math.round(
                (i * meses.length) / chartPts.length
              )}`
          )}
        />
      </div>
    </div>
  )
}