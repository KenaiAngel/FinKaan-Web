'use client'
import { useState, useRef, useEffect } from 'react';
import * as THREE from "three"

const PRODUCTOS_3D = [
  { id: 'cetes',    label: 'CETES 28d',       tasa: '+10.5%', riesgo: 'Nulo',    tipo: 'inversion', color: 0x9B2335, colorHex: '#9B2335', x: -4,    y: 3,    z: 0   },
  { id: 'ahorro',   label: 'Cuenta ahorro',   tasa: '+6.5%',  riesgo: 'Nulo',    tipo: 'inversion', color: 0x9B2335, colorHex: '#9B2335', x: 0,     y: 1.5,  z: -2  },
  { id: 'afore',    label: 'AFORE',            tasa: '+8.5%',  riesgo: 'Bajo',    tipo: 'inversion', color: 0x22C55E, colorHex: '#22C55E', x: 4,     y: 2.5,  z: 0   },
  { id: 'efectivo', label: 'Efectivo',         tasa: '-4.5%',  riesgo: 'Inflac.', tipo: 'neutro',    color: 0xB08090, colorHex: '#B08090', x: 0,     y: -0.5, z: 2.5 },
  { id: 'tc',       label: 'Tarjeta crédito',  tasa: '-96.7%', riesgo: 'Alto',    tipo: 'deuda',     color: 0xEF4444, colorHex: '#EF4444', x: -3.5,  y: -2.5, z: -1  },
  { id: 'informal', label: 'Crédito informal', tasa: '-300%',  riesgo: 'Muy alto',tipo: 'deuda',     color: 0x7F1D1D, colorHex: '#7F1D1D', x: 3,     y: -3.5, z: -2  },
];


function webGLAvailable() {
  try {
    const c = document.createElement("canvas")
    return !!(
      window.WebGLRenderingContext &&
      (c.getContext("webgl") || c.getContext("experimental-webgl"))
    )
  } catch {
    return false
  }
}

function ProductMap3D({ onSelect }) {
  const el = useRef(null)
  const cleanup = useRef(null)
  const [noWebGL, setNoWebGL] = useState(false)

  useEffect(() => {
    if (!webGLAvailable()) {
      setNoWebGL(true)
      return
    }

    cleanup.current && cleanup.current()
    let animId

    ;(async () => {
      if (!el.current) return
         const THREE = await import("three")
      const w = el.current.clientWidth
      const h = 360

      const scene = new THREE.Scene()
      scene.background = new THREE.Color(0xFCEBEE)
      scene.fog = new THREE.Fog(0xFCEBEE, 10, 30)

      const cam = new THREE.PerspectiveCamera(48, w / h, 0.1, 200)
      cam.position.set(0, 2, 13)

      let rend
      try {
        rend = new THREE.WebGLRenderer({ antialias: true })
      } catch {
        setNoWebGL(true)
        return
      }

      rend.setSize(w, h)
      rend.setPixelRatio(window.devicePixelRatio)
      el.current.appendChild(rend.domElement)

      // Luces
      scene.add(new THREE.AmbientLight(0xffffff, 0.4))

      const dLight = new THREE.DirectionalLight(0xffffff, 0.7)
      dLight.position.set(5, 10, 8)
      scene.add(dLight)

      const pLight = new THREE.PointLight(0xffffff, 1.2, 50)
      pLight.position.set(0, 5, 5)
      scene.add(pLight)

      // Grid
      const gridHelper = new THREE.GridHelper(22, 18, 0xF8D7DB, 0xEDD8DB)
      gridHelper.position.y = -5
      scene.add(gridHelper)

      // Nodos
      const nodes = []

      PRODUCTOS_3D.forEach((p) => {
        const radius =
          p.tipo === "inversion" ? 0.65 : p.tipo === "deuda" ? 0.55 : 0.5

        const geo = new THREE.SphereGeometry(radius, 48, 48)

        const mat = new THREE.MeshStandardMaterial({
          color: p.color,
          emissive: new THREE.Color(p.color),
          emissiveIntensity: 0.4,
          metalness: 0.6,
          roughness: 0.2,
          transparent: true,
          opacity: 0.9,
        })

        const mesh = new THREE.Mesh(geo, mat)
        mesh.position.set(p.x, p.y, p.z)
        mesh.scale.setScalar(0.01)
        mesh.userData = { id: p.id }

        scene.add(mesh)

        const ringGeo = new THREE.TorusGeometry(radius * 1.7, 0.025, 8, 60)
        const ringMat = new THREE.MeshBasicMaterial({
          color: p.color,
          transparent: true,
          opacity: 0.35,
        })

        const ring = new THREE.Mesh(ringGeo, ringMat)
        ring.position.set(p.x, p.y, p.z)
        ring.rotation.x = Math.PI / 2

        scene.add(ring)

        nodes.push({ mesh, ring, prod: p, baseY: p.y })
      })

      // Líneas
      const lineMat = new THREE.LineBasicMaterial({
        color: 0x3D3580,
        transparent: true,
        opacity: 0.4,
      })

      const invNodes = nodes.filter((n) => n.prod.tipo === "inversion")

      invNodes.forEach((n, i) => {
        if (i === invNodes.length - 1) return

        const pts = [
          new THREE.Vector3(n.prod.x, n.prod.y, n.prod.z),
          new THREE.Vector3(
            invNodes[i + 1].prod.x,
            invNodes[i + 1].prod.y,
            invNodes[i + 1].prod.z
          ),
        ]

        const geo = new THREE.BufferGeometry().setFromPoints(pts)
        const line = new THREE.Line(geo, lineMat)
        scene.add(line)
      })

      // Partículas
      const partGeo = new THREE.BufferGeometry()
      const partCount = 200
      const partPos = new Float32Array(partCount * 3)

      for (let i = 0; i < partCount; i++) {
        partPos[i * 3] = (Math.random() - 0.5) * 24
        partPos[i * 3 + 1] = (Math.random() - 0.5) * 12
        partPos[i * 3 + 2] = (Math.random() - 0.5) * 14
      }

      partGeo.setAttribute("position", new THREE.BufferAttribute(partPos, 3))

      const partMat = new THREE.PointsMaterial({
        color: 0x9B2335,
        size: 0.05,
        transparent: true,
        opacity: 0.4,
      })

      const particles = new THREE.Points(partGeo, partMat)
      scene.add(particles)

      // Interacción
      const raycaster = new THREE.Raycaster()
      const mouse = new THREE.Vector2()
      const meshes = nodes.map((n) => n.mesh)

      let hoveredId = null

      const onMove = (e) => {
        const rect = rend.domElement.getBoundingClientRect()

        mouse.x = ((e.clientX - rect.left) / w) * 2 - 1
        mouse.y = -((e.clientY - rect.top) / h) * 2 + 1

        raycaster.setFromCamera(mouse, cam)
        const hits = raycaster.intersectObjects(meshes)

        hoveredId = hits.length > 0 ? hits[0].object.userData.id : null
        rend.domElement.style.cursor = hoveredId ? "pointer" : "default"
      }

      const onClick = (e) => {
        const rect = rend.domElement.getBoundingClientRect()

        mouse.x = ((e.clientX - rect.left) / w) * 2 - 1
        mouse.y = -((e.clientY - rect.top) / h) * 2 + 1

        raycaster.setFromCamera(mouse, cam)
        const hits = raycaster.intersectObjects(meshes)

        if (hits.length > 0) {
          onSelect && onSelect(hits[0].object.userData.id)
        }
      }

      rend.domElement.addEventListener("mousemove", onMove)
      rend.domElement.addEventListener("click", onClick)

      // Animación
      let t = 0

      const tick = () => {
        animId = requestAnimationFrame(tick)
        t += 0.012

        nodes.forEach((n, i) => {
          if (n.mesh.scale.x < 1) {
            const p = n.mesh.scale.x + 0.02
            const ease = 1 - Math.pow(1 - p, 3)
            n.mesh.scale.setScalar(ease)
          }

          n.mesh.position.y =
            n.baseY + Math.sin(t * 0.6 + i * 1.1) * 0.18

          n.ring.position.y = n.mesh.position.y
          n.ring.rotation.z += 0.01

          const isHov = n.prod.id === hoveredId

          if (isHov) {
            n.mesh.scale.lerp(new THREE.Vector3(1.25, 1.25, 1.25), 0.1)
            n.mesh.material.emissiveIntensity = 1
          } else {
            n.mesh.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1)
            n.mesh.material.emissiveIntensity = 0.4
          }
        })

        const positions = partGeo.attributes.position.array
        for (let i = 0; i < positions.length; i += 3) {
          positions[i + 1] += Math.sin(t + i) * 0.002
        }
        partGeo.attributes.position.needsUpdate = true

        cam.position.x = Math.sin(t * 0.07) * 1.5
        cam.position.y = 2 + Math.cos(t * 0.05) * 0.5
        cam.lookAt(0, 0, 0)

        rend.render(scene, cam)
      }

      tick()

      cleanup.current = () => {
        cancelAnimationFrame(animId)
        rend.domElement.removeEventListener("mousemove", onMove)
        rend.domElement.removeEventListener("click", onClick)
        rend.dispose()
      }
    })()

    return () => cleanup.current && cleanup.current()
  }, [])

  if (noWebGL) {
    return (
      <div className="h-[360px] flex items-center justify-center text-sm text-gray-500">
        Tu navegador no soporta WebGL 😢
      </div>
    )
  }

  return (
    <div
      ref={el}
      className="w-full h-[360px] rounded-2xl overflow-hidden shadow-lg"
    />
  )
}

const PRODUCTOS_2D = [
  { id: 'cetes',    label: 'CETES 28d',       rendimiento: 10.5, riesgo: 1, tipo: 'inversion', color: '#9B2335' },
  { id: 'ahorro',   label: 'Cuenta ahorro',   rendimiento: 6.5,  riesgo: 1.5, tipo: 'inversion', color: '#9B2335' },
  { id: 'afore',    label: 'AFORE',           rendimiento: 8.5,  riesgo: 3, tipo: 'inversion', color: '#22C55E' },
  { id: 'efectivo', label: 'Efectivo',        rendimiento: -4.5, riesgo: 2, tipo: 'neutro',    color: '#B08090' },
  { id: 'tc',       label: 'Tarjeta crédito', rendimiento: -96.7,riesgo: 9, tipo: 'deuda',     color: '#EF4444' },
  { id: 'informal', label: 'Crédito informal',rendimiento: -250, riesgo: 10,tipo: 'deuda',     color: '#7F1D1D' },
]

import {
  ScatterChart, Scatter, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, ReferenceArea, LabelList
} from 'recharts'

function ProductMap2D({ data, onSelect }) {

  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload?.length) return null
    const p = payload[0].payload

    return (
      <div className="bg-[var(--card)] p-4 rounded-xl border border-[var(--divider)] text-xs shadow-lg">
        <p className="font-semibold text-sm">{p.label}</p>

        <div className="mt-2 space-y-1">
          <p>
            Rendimiento:
            <span className={`ml-1 font-semibold ${p.rendimiento > 0 ? 'text-green-500' : 'text-red-500'}`}>
              {p.rendimiento}%
            </span>
          </p>

          <p>
            Riesgo:
            <span className="ml-1 font-semibold">{p.riesgo}/10</span>
          </p>

          <p className="opacity-60 capitalize">{p.tipo}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-[420px] min-h-[320px] bg-[var(--card)] p-4 rounded-2xl">

      {/* Leyenda conceptual */}
      <div className="flex justify-between text-[11px] mb-2 text-[var(--txtMuted)]">
        <span>⬅ Menor riesgo</span>
        <span>Mayor riesgo ➡</span>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 10 }}>

          {/* Zonas (esto es CLAVE) */}
          <ReferenceArea x1={0} x2={5} y1={0} y2={20} fill="rgba(34,197,94,0.08)" />
          <ReferenceArea x1={5} x2={10} y1={0} y2={20} fill="rgba(245,158,11,0.08)" />
          <ReferenceArea x1={0} x2={5} y1={-400} y2={0} fill="rgba(148,163,184,0.08)" />
          <ReferenceArea x1={5} x2={10} y1={-400} y2={0} fill="rgba(239,68,68,0.08)" />

          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />

          <XAxis
            type="number"
            dataKey="riesgo"
            domain={[0, 10]}
            tick={{ fontSize: 11 }}
            label={{ value: "Riesgo →", position: "insideBottom", offset: -5 }}
          />

          <YAxis
            type="number"
            dataKey="rendimiento"
            tick={{ fontSize: 11 }}
            label={{ value: "↑ Rendimiento (%)", angle: -90, position: "insideLeft" }}
          />

          <Tooltip content={<CustomTooltip />} />

          <Scatter
            data={data}
            onClick={(p) => onSelect(p?.payload?.id)}
            shape={(props) => {
              const { cx, cy, payload } = props

              return (
                <g>
                  {/* Glow */}
                  <circle cx={cx} cy={cy} r={12} fill={payload.color} opacity={0.15} />
                  
                  {/* Nodo */}
                  <circle
                    cx={cx}
                    cy={cy}
                    r={6}
                    fill={payload.color}
                    style={{ cursor: "pointer" }}
                  />
                </g>
              )
            }}
          >
            <LabelList dataKey="label" position="top" fontSize={10} />
          </Scatter>

        </ScatterChart>
      </ResponsiveContainer>

      {/* Leyenda UX */}
      <div className="flex justify-between text-[11px] mt-2 text-[var(--txtMuted)]">
        <span className="text-green-500">● Mejor zona</span>
        <span className="text-yellow-500">● Riesgo alto</span>
        <span className="text-red-500">● Evitar</span>
      </div>

    </div>
  )
};


const terminos = [
  { titulo: 'CAT', cat: 'Crédito', icono: '💳', nombre: 'Costo Anual Total',
    def: 'Indicador que refleja el costo real de un crédito: tasa de interés + comisiones + seguros + otros cargos, expresados anualmente. Es el número correcto para comparar productos de crédito.',
    ej: 'Tarjeta con "tasa de 2% mensual" + anualidad + seguro → CAT real puede ser 60–96%+ anual. Siempre pide el CAT, no la tasa nominal.',
    fuente: 'CNBV / CONDUSEF',
    datos: [['Tarjeta bancaria promedio', '96.7%'], ['Nu Card / Rappi', '~45%'], ['Tiendas departamentales', '110–180%'], ['Crédito informal', '150–400%+']] },

  { titulo: 'CETES', cat: 'Inversión', icono: '📊', nombre: 'Certificados de la Tesorería',
    def: 'Instrumentos de deuda emitidos por el Gobierno Federal mexicano (SHCP). Representan la tasa libre de riesgo en México. Disponibles desde $100 en cetesdirecto.com sin comisiones.',
    ej: '$10,000 en CETES 28d al 10.5% anual: en 12 meses → $11,050. En 5 años reinvirtiendo → $16,474.',
    fuente: 'SHCP / Banxico 2025',
    datos: [['Tasa 28d actual', '~10.5% anual'], ['Inversión mínima', '$100 MXN'], ['Garantía', 'Gobierno Federal'], ['Comisión', '$0']] },

  { titulo: 'Interés compuesto', cat: 'Inversión', icono: '📈', nombre: 'Interés sobre el interés',
    def: 'El rendimiento de cada período se calcula sobre el capital original más los intereses acumulados en períodos anteriores. A diferencia del interés simple, el efecto crece exponencialmente.',
    ej: '$10,000 al 10% anual compuesto: año 1→$11,000 | año 5→$16,105 | año 10→$25,937 | año 20→$67,275. Interés simple en 20 años: solo $30,000.',
    fuente: 'Matemáticas financieras',
    datos: [['Fórmula', 'A = P(1 + r/n)^(nt)'], ['$10k 10% 10 años', '$25,937'], ['$10k 10% 20 años', '$67,275'], ['$10k 10% 30 años', '$174,494']] },

  { titulo: 'Buró de Crédito', cat: 'Crédito', icono: '🏦', nombre: 'Historial crediticio',
    def: 'Base de datos operada por Trans Union México y Círculo de Crédito que registra el comportamiento de pago de personas físicas. Los prestamistas lo consultan para evaluar riesgo.',
    ej: 'Usar una tarjeta de crédito y pagar el total cada mes durante 12 meses construye historial positivo sin pagar intereses.',
    fuente: 'Trans Union / Círculo de Crédito',
    datos: [['Consulta gratuita', '1 vez/año en burodecredito.com'], ['Tiempo para limpiar', '6–7 años'], ['Score mínimo aceptable', '650–700 puntos']] },

  { titulo: 'Regla 50/30/20', cat: 'Presupuesto', icono: '💰', nombre: 'Distribución del ingreso',
    def: 'Método de presupuesto: 50% del ingreso neto a necesidades básicas, 30% a gustos y deseos, 20% a ahorro e inversión. Popularizado por Elizabeth Warren.',
    ej: 'Ingreso neto quincena $6,500: $3,250 renta/comida/transporte · $1,950 entretenimiento/ropa · $1,300 CETES/fondo emergencias.',
    fuente: 'Warren, E. "All Your Worth" (2005)',
    datos: [['50% necesidades', 'Renta, comida, transporte, servicios, salud'], ['30% gustos', 'Entretenimiento, ropa, restaurantes, viajes'], ['20% ahorro', 'Fondo emergencias, CETES, AFORE voluntaria']] },

  { titulo: 'AFORE', cat: 'Inversión', icono: '🛡️', nombre: 'Fondos para el Retiro',
    def: 'Administradoras privadas de los fondos de retiro de trabajadores del IMSS e ISSSTE. Las aportaciones son obligatorias en el empleo formal. Consulta tu saldo en e-sar.com.mx.',
    ej: 'Salario $8,000/mes → aportación mensual ~$520 (patrón + empleado + gobierno). En 40 años al 8.5% anual → ~$1.8 millones.',
    fuente: 'CONSAR / IMSS 2025',
    datos: [['Aportación patrón', '3.15% del salario'], ['Aportación empleado', '1.125%'], ['Aportación gobierno', '0.225% + cuota social'], ['Rendimiento histórico', '8–11% anual nominal']] },

  { titulo: 'FONACOT', cat: 'Crédito', icono: '👷', nombre: 'Fondo para Trabajadores',
    def: 'Institución pública que otorga créditos a trabajadores del sector formal a tasas reguladas. El pago se descuenta directamente de nómina, lo que reduce el riesgo y la tasa.',
    ej: 'Crédito $10,000 FONACOT al 20% anual: pagas ~$11,100 total. Mismo crédito en tarjeta bancaria al 96.7%: pagas ~$16,400+.',
    fuente: 'FONACOT.gob.mx',
    datos: [['Tasa anual', '10–25% (regulado)'], ['Requisito', 'Empresa con convenio FONACOT'], ['Plazo máximo', 'Hasta 36 meses'], ['Pago', 'Descuento directo en nómina']] },

  { titulo: 'Inflación', cat: 'Sistema', icono: '📉', nombre: 'Erosión del poder adquisitivo',
    def: 'Porcentaje en que sube el nivel general de precios. Si el rendimiento de tus ahorros no supera la inflación, en términos reales estás perdiendo capacidad de compra.',
    ej: '$100,000 bajo el colchón con inflación 4.5%: en 5 años equivalen a $80,245 de hoy. En 10 años: $64,393. Perdiste $35,607 sin gastar nada.',
    fuente: 'INEGI / Banxico 2025',
    datos: [['Inflación México 2025', '~4.5% anual'], ['Meta Banxico', '3% ± 1%'], ['Inflación acum. 2020–25', '~28%'], ['CETES tasa real', '~6% (nominal - inflación)']] },

  { titulo: 'Pago mínimo TC', cat: 'Crédito', icono: '⚠️', nombre: 'La trampa del pago mínimo',
    def: 'El pago mínimo en tarjeta de crédito cubre solo los intereses del período y 1–5% del capital. Si solo pagas el mínimo, la deuda puede durar décadas y costar el triple del original.',
    ej: '$5,000 en tarjeta al 96.7% CAT, pago mínimo mensual de $250: en 24 meses habrás pagado $6,000 y aún deberás ~$4,200. La deuda no baja.',
    fuente: 'CONDUSEF / Banxico',
    datos: [['CAT promedio tarjetas MX', '96.7%'], ['Pago mínimo típico', '1.5–5% del saldo'], ['$5k liquidando en 12m', '~$2,700 de intereses'], ['$5k solo mínimo', 'Décadas y $15,000+']] },

  { titulo: 'Tasa real vs nominal', cat: 'Inversión', icono: '🧮', nombre: 'Rendimiento ajustado a inflación',
    def: 'Tasa nominal: el rendimiento anunciado. Tasa real: rendimiento ajustado descontando la inflación. Solo cuando la tasa real es positiva aumentas tu poder adquisitivo.',
    ej: 'CETES 10.5% nominal − inflación 4.5% = tasa real ~6%. Cuenta ahorro 4.5% − inflación 4.5% = 0% real. Efectivo 0% − 4.5% = −4.5% real.',
    fuente: 'Ecuación de Fisher / Banxico',
    datos: [['Fórmula aprox.', 'r_real ≈ r_nominal − inflación'], ['CETES tasa real ~2025', '~6%'], ['Cuenta ahorro tasa real', '~0–3%'], ['Efectivo tasa real', '−4.5%']] },
]

const cats = ['Todos', 'Crédito', 'Inversión', 'Presupuesto', 'Sistema']
const catColor = {
  Crédito: '#EF4444', Inversión: '#9B2335',
  Presupuesto: '#22C55E', Sistema: '#F59E0B',
}
const langs = ['Español','Náhuatl','Zapoteco','Mixteco','Otomí','Totonaco','Mazateco','Tzeltal','Tzotzil'];

export default function Glosario() {
  const [q, setQ] = useState("")
  const [cat, setCat] = useState("Todos")
  const [open, setOpen] = useState(null)
  const [lang, setLang] = useState("Español")

  const nodeToTermino = {
    cetes: "CETES",
    ahorro: "Tasa real vs nominal",
    afore: "AFORE",
    efectivo: "Inflación",
    tc: "Pago mínimo TC",
    informal: "FONACOT",
  }

  const handleNodeSelect = (id) => {
    const titulo = nodeToTermino[id]
    if (titulo) {
      setOpen(titulo)
      setCat("Todos")
      setQ("")
      setTimeout(() => {
        document
          .getElementById(`termino-${titulo}`)
          ?.scrollIntoView({ behavior: "smooth", block: "center" })
      }, 100)
    }
  }

  const list = terminos.filter(
    (t) =>
      (cat === "Todos" || t.cat === cat) &&
      (!q ||
        t.titulo.toLowerCase().includes(q.toLowerCase()) ||
        t.def.toLowerCase().includes(q.toLowerCase()))
  )

  return (
    <div className="max-w-7xl mx-0  px-10 py-10 pb-16">

      {/* Header */}
      <div className="grid grid-cols-[1fr_220px] gap-10 mb-10 items-start">
        <div>
          <div className="text-[10px] font-bold tracking-[2px] mb-3" style={{ color: "var(--txtMuted)" }}>
            GLOSARIO FINANCIERO
          </div>
          <h1 className="text-4xl font-black mb-2 tracking-tight" style={{ color: "var(--txt)" }}>
            Aprende los términos.
          </h1>
          <p className="text-sm leading-7 max-w-[520px]" style={{ color: "var(--txtSec)" }}>
            Definiciones con ejemplos numéricos reales de México 2025.
            Fuentes: CNBV, Banxico, CONDUSEF, CONSAR.
          </p>
        </div>

        {/* Idioma */}
        <div className="p-4" style={{ background: "var(--card)" }}>
          <div className="text-[10px] font-bold tracking-[1.3px] mb-2" style={{ color: "var(--txtMuted)" }}>
            🌐 IDIOMA
          </div>

          {langs.map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className="block w-full text-left text-xs px-3 py-2"
              style={{
                background: lang === l ? "var(--accentDim)" : "none",
                color: lang === l ? "var(--accentL)" : "var(--txtSec)",
                fontWeight: lang === l ? 700 : 400,
                borderLeft:
                  lang === l
                    ? "2px solid var(--accent)"
                    : "2px solid transparent",
              }}
            >
              {l}
            </button>
          ))}

          {lang !== "Español" && (
            <div
              className="mt-2 p-2 text-[11px] leading-5"
              style={{ background: "var(--accentDim)", color: "var(--xp)" }}
            >
              Localizado con hablantes nativos y catálogo INALI.
            </div>
          )}
        </div>
      </div>

      {/* Búsqueda + filtros */}
      <div className="flex gap-3 mb-5 flex-wrap">
        <div
          className="flex items-center gap-2 px-4 flex-1 min-w-[220px]"
          style={{ background: "var(--card)" }}
        >
          <span style={{ color: "var(--txtMuted)" }}>🔍</span>
          <input
            type="text"
            placeholder="Buscar término o definición..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="flex-1 bg-transparent outline-none py-3 text-sm"
            style={{ color: "var(--txt)" }}
          />
        </div>

        <div className="flex gap-[2px]">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className="px-4 py-2 text-xs"
              style={{
                background: cat === c ? "var(--accent)" : "var(--card)",
                color: cat === c ? "#fff" : "var(--txtMuted)",
                fontWeight: cat === c ? 700 : 400,
              }}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="text-[11px] mb-3" style={{ color: "var(--txtMuted)" }}>
        {list.length} términos
      </div>

      {/* Mapa */}
      <div className="mb-9">
        <div className="flex justify-between items-center mb-3">
          <div>
            <div className="text-[10px] font-bold tracking-[2px] mb-1" style={{ color: "var(--txtMuted)" }}>
              MAPA 3D DE PRODUCTOS FINANCIEROS
            </div>
            <div className="text-sm" style={{ color: "var(--txtSec)" }}>
              Navega el universo financiero. Haz clic en un nodo.
            </div>
          </div>

          <div className="flex gap-4">
            {[
              { label: "Inversión", color: "var(--accentL)" },
              { label: "Deuda", color: "var(--red)" },
              { label: "Ahorro", color: "var(--txtSec)" },
            ].map((l) => (
              <span
                key={l.label}
                className="flex items-center gap-1 text-[11px] font-semibold"
                style={{ color: l.color }}
              >
                <span
                  className="w-[7px] h-[7px] rounded-full"
                  style={{ background: l.color }}
                />
                {l.label}
              </span>
            ))}
          </div>
        </div>



        <ProductMap3D onSelect={handleNodeSelect} />
       
      </div>

      {/* Lista */}
      <div className="flex flex-col gap-[2px]">
        {list.map((t) => {
          const isOpen = open === t.titulo
          const cc = catColor[t.cat] || "var(--accent)"

          return (
            <div
              key={t.titulo}
              id={`termino-${t.titulo}`}
              style={{ background: "var(--card)" }}
            >
              <div
                onClick={() => setOpen(isOpen ? null : t.titulo)}
                className="grid items-center cursor-pointer px-5 py-4 gap-3"
                style={{
                  gridTemplateColumns: "36px 1fr auto auto",
                  borderLeft: isOpen
                    ? `2px solid ${cc}`
                    : "2px solid transparent",
                }}
              >
                <span className="text-xl">{t.icono}</span>

                <div>
                  <div className="text-sm font-bold" style={{ color: "var(--txt)" }}>
                    {t.titulo}
                  </div>
                  <div className="text-[11px] mt-[2px]" style={{ color: "var(--txtMuted)" }}>
                    {t.nombre}
                  </div>
                </div>

                <span
                  className="text-[11px] font-bold px-2 py-[2px]"
                  style={{ color: cc, background: cc + "18" }}
                >
                  {t.cat}
                </span>

                <span
                  className="text-base transition-transform"
                  style={{
                    color: "var(--txtMuted)",
                    transform: isOpen ? "rotate(180deg)" : "none",
                  }}
                >
                  ⌄
                </span>
              </div>

              {isOpen && (
                <div className="grid px-5 pb-5 gap-7" style={{ gridTemplateColumns: "1fr 260px" }}>
                  <div>
                    <div className="h-[1px] mb-4" style={{ background: "var(--divider)" }} />
                    <p className="text-sm leading-7 mb-3" style={{ color: "var(--txtSec)" }}>
                      {t.def}
                    </p>

                    <div
                      className="p-3"
                      style={{
                        background: "var(--card2)",
                        borderLeft: `2px solid ${cc}`,
                      }}
                    >
                      <div className="text-[10px] font-bold mb-1" style={{ color: "var(--xp)" }}>
                        EJEMPLO PRÁCTICO
                      </div>
                      <p className="text-sm leading-6" style={{ color: "var(--txt)" }}>
                        {t.ej}
                      </p>
                    </div>

                    <div className="mt-2 text-[11px]" style={{ color: "var(--txtMuted)" }}>
                      Fuente: {t.fuente}
                    </div>
                  </div>

                  <div>
                    <div className="h-[1px] mb-4" style={{ background: "var(--divider)" }} />
                    <div className="text-[10px] font-bold mb-3" style={{ color: "var(--txtMuted)" }}>
                      DATOS CLAVE
                    </div>

                    {t.datos.map(([k, v]) => (
                      <div
                        key={k}
                        className="py-2 border-b"
                        style={{ borderColor: "var(--divider)" }}
                      >
                        <span className="text-[11px]" style={{ color: "var(--txtMuted)" }}>
                          {k}
                        </span>
                        <span className="block text-sm font-semibold" style={{ color: "var(--txt)" }}>
                          {v}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
       <ProductMap2D data={PRODUCTOS_2D} onSelect={handleNodeSelect} />
    </div>
  )
}

