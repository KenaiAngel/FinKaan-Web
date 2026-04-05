export function Stat({ label, value, color, sub }) {
  return (
    <div className="bg-[var(--card2)] px-[18px] py-4">

      <div className="text-[10px] text-[var(--txtMuted)] mb-1 tracking-[0.5px]">
        {label}
      </div>

      <div
        className="text-[22px] font-extrabold"
        style={{ color }}
      >
        {value}
      </div>

      {sub && (
        <div className="text-[11px] text-[var(--txtMuted)] mt-[3px]">
          {sub}
        </div>
      )}
    </div>
  )
}

export function Row({
  label,
  value,
  min,
  max,
  step = 1,
  fmt,
  onChange,
  color = 'var(--accent)',
}) {
  return (
    <div className="mb-5">

      {/* Label + value */}
      <div className="flex justify-between mb-2">
        <span className="text-sm text-[var(--txtSec)]">
          {label} 
        </span>
        <span
          className="text-sm font-bold"
          style={{ color }} 
        >
          {fmt(value)}
        </span>
      </div>

      {/* Slider */}
<input
  type="range"
  min={min}
  max={max}
  step={step}
  value={value}
  onChange={(e) => onChange(+e.target.value)}
  className="w-full h-1 bg-[var(--card2)] appearance-none cursor-pointer"
/>
    </div>
  )
}