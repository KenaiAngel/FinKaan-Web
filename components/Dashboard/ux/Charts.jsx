'use client';
import {  useMemo } from "react"

export function Chart2D({ data, colors, labels, h = 200 }) {
  const max = Math.max(...data, 1)
    const mxn = (n) => '$' + Math.round(n).toLocaleString('es-MX') + ' MXN'

  return (
    <div className="w-full">
      
      {/* Bars */}
      <div className="flex flex-col gap-3" style={{ height: h }}>
        {data.map((v, i) => {
          const width = (v / max) * 100

          return (
            <div key={i} className="flex flex-col gap-1">
              
              {/* Label + value */}
              <div className="flex justify-between text-xs text-[var(--txtMuted)]">
                <span>{labels[i]}</span>
                <span className="font-semibold text-[var(--txt)]">
                  {mxn(v)}
                </span>
              </div>

              {/* Bar */}
              <div className="w-full h-2 bg-[var(--card2)] rounded">
                <div
                  className="h-2 rounded transition-all duration-500"
                  style={{
                    width: `${width}%`,
                    background: colors[i % colors.length],
                  }}
                />
              </div>
            </div>
          )
        })}
      </div>

    </div>
  )
}

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Area,
} from "recharts"


export function ChartInteres({ capital, tasa, anios }) {

  const data = useMemo(() => {
    const arr = []

    for (let i = 0; i <= anios; i++) {
      const compuesto = capital * Math.pow(1 + tasa / 100, i)
      const simple = capital * (1 + (tasa / 100) * i)

      arr.push({
        year: i,
        compuesto: Number(compuesto.toFixed(2)),
        simple: Number(simple.toFixed(2)),
        diferencia: Number((compuesto - simple).toFixed(2)),
      })
    }

    return arr
  }, [capital, tasa, anios])

  const final = data[data.length - 1]

  return (
    <div className="w-full space-y-4">

      {/* 🔢 KPIs */}
      <div className="grid grid-cols-3 gap-4 text-sm">
        <div className="p-3 rounded-xl bg-[var(--card2)]">
          <p className="opacity-60">Total compuesto</p>
          <p className="text-lg font-semibold">
            ${final.compuesto.toLocaleString()}
          </p>
        </div>

        <div className="p-3 rounded-xl bg-[var(--card2)]">
          <p className="opacity-60">Total simple</p>
          <p className="text-lg font-semibold">
            ${final.simple.toLocaleString()}
          </p>
        </div>

        <div className="p-3 rounded-xl bg-[var(--card2)]">
          <p className="opacity-60">Ganancia extra</p>
          <p className="text-lg font-semibold text-green-500">
            +${final.diferencia.toLocaleString()}
          </p>
        </div>
      </div>

      {/* 📈 Gráfica */}
      <div className="w-full h-[300px]">
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="year" />
            <YAxis />

            <Tooltip
              formatter={(value) => `$${value.toLocaleString()}`}
              labelFormatter={(label) => `Año ${label}`}
            />

            {/* Área para impacto visual */}
            <Area
              type="monotone"
              dataKey="compuesto"
              stroke="transparent"
              fillOpacity={0.15}
            />

            {/* Línea compuesto */}
            <Line
              type="monotone"
              dataKey="compuesto"
              strokeWidth={3}
              dot={false}
            />

            {/* Línea simple */}
            <Line
              type="monotone"
              dataKey="simple"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}