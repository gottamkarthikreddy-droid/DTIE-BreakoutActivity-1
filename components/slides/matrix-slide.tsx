"use client"

import { useState } from "react"
import { SlideFrame } from "@/components/slide-frame"
import { quadrants } from "@/lib/matrix-data"

const shortNames: Record<string, string[]> = {
  "keep-satisfied": ["Legal / Compliance", "Finance", "IT & Security Directors", "Regulatory Bodies"],
  "manage-closely": ["Project Sponsor", "Operations Lead", "Lead Architect", "Support Manager"],
  monitor: ["General Public", "Hardware Vendors", "Competitors", "Maintenance Staff"],
  "keep-informed": ["End Users", "Front-line Staff", "Booking Partners", "Helpdesk Agents"],
}

function cellFor(row: number, col: number) {
  return quadrants.find((q) => q.gridRow === row && q.gridCol === col)!
}

function Cell({
  row,
  col,
  active,
  onEnter,
}: {
  row: number
  col: number
  active: boolean
  onEnter: () => void
}) {
  const q = cellFor(row, col)
  return (
    <button
      type="button"
      onMouseEnter={onEnter}
      onFocus={onEnter}
      aria-label={`${q.strategy} — ${q.power} power, ${q.interest} interest`}
      className="group relative flex flex-col overflow-hidden rounded-xl border p-[1.8cqw] text-left outline-none transition-all duration-300"
      style={{
        borderColor: active ? q.color : "var(--border)",
        background: active ? `color-mix(in oklab, ${q.color} 14%, var(--card))` : "var(--background)",
        transform: active ? "translateY(-0.8cqh)" : "none",
        boxShadow: active ? `0 1.6cqh 4cqh -1.5cqh ${q.color}` : "none",
      }}
    >
      {/* color-flash wash that sweeps in on hover */}
      <span
        className="pointer-events-none absolute inset-0 origin-left transition-transform duration-500 ease-out"
        style={{
          background: `linear-gradient(120deg, color-mix(in oklab, ${q.color} 22%, transparent), transparent 70%)`,
          transform: active ? "scaleX(1)" : "scaleX(0)",
        }}
        aria-hidden="true"
      />
      {/* plotting ripple emitted from the corner when activated */}
      {active && (
        <span
          key={`${row}-${col}-ripple`}
          className="pointer-events-none absolute bottom-[1.8cqw] left-1/2 h-[6cqw] w-[6cqw] rounded-full [animation:ripple_0.9s_ease-out]"
          style={{ border: `0.3cqh solid ${q.color}` }}
          aria-hidden="true"
        />
      )}

      <div className="relative flex items-baseline justify-between">
        <h3
          className="font-display text-[2cqw] font-bold transition-colors duration-300"
          style={{ color: active ? q.color : "var(--card-foreground)" }}
        >
          {q.strategy}
        </h3>
        <span className="font-display text-[1.3cqw] uppercase tracking-widest text-muted-foreground">
          {q.power[0]}P · {q.interest[0]}I
        </span>
      </div>
      <ul className="relative mt-[1.4cqh] flex flex-col gap-[0.9cqh]">
        {shortNames[q.id].map((n) => (
          <li key={n} className="flex items-center gap-[0.8cqw] text-[1.35cqw] text-muted-foreground">
            <span
              className="h-[0.7cqh] w-[0.7cqh] shrink-0 rounded-full transition-colors duration-300"
              style={{ background: active ? q.color : "var(--muted-foreground)" }}
              aria-hidden="true"
            />
            {n}
          </li>
        ))}
      </ul>
    </button>
  )
}

export function MatrixSlide() {
  // active cell as "row-col"
  const [active, setActive] = useState<string | null>(null)
  const activeQ = active ? cellFor(Number(active[0]), Number(active[2])) : null
  const activeColor = activeQ?.color

  const highPower = activeQ?.power === "High"
  const highInterest = activeQ?.interest === "High"

  return (
    <SlideFrame kicker="The Matrix" badge="03">
      <div className="flex h-full gap-[2.5cqw]" onMouseLeave={() => setActive(null)}>
        {/* Y axis */}
        <div className="flex flex-col items-center justify-center gap-[1.4cqh]">
          <span
            className="font-display text-[1.2cqw] font-medium uppercase tracking-widest transition-colors duration-300"
            style={{ color: highPower ? activeColor : "var(--muted-foreground)" }}
          >
            High
          </span>
          <span className="font-display text-[1.5cqw] font-semibold uppercase tracking-[0.3em] text-card-foreground [writing-mode:vertical-rl] [transform:rotate(180deg)]">
            Power
          </span>
          <span
            className="font-display text-[1.2cqw] font-medium uppercase tracking-widest transition-colors duration-300"
            style={{ color: activeQ && !highPower ? activeColor : "var(--muted-foreground)" }}
          >
            Low
          </span>
        </div>

        <div className="flex flex-1 flex-col">
          <div className="grid flex-1 grid-cols-2 grid-rows-2 gap-[2cqw]">
            <Cell row={1} col={1} active={active === "1-1"} onEnter={() => setActive("1-1")} />
            <Cell row={1} col={2} active={active === "1-2"} onEnter={() => setActive("1-2")} />
            <Cell row={2} col={1} active={active === "2-1"} onEnter={() => setActive("2-1")} />
            <Cell row={2} col={2} active={active === "2-2"} onEnter={() => setActive("2-2")} />
          </div>

          {/* X axis */}
          <div className="mt-[2.5cqh] flex items-center justify-between">
            <span
              className="text-[1.3cqw] uppercase tracking-widest transition-colors duration-300"
              style={{ color: activeQ && !highInterest ? activeColor : "var(--muted-foreground)" }}
            >
              Low Interest
            </span>
            <span className="font-display text-[1.5cqw] font-semibold uppercase tracking-[0.3em] text-card-foreground">
              Interest
            </span>
            <span
              className="text-[1.3cqw] uppercase tracking-widest transition-colors duration-300"
              style={{ color: highInterest ? activeColor : "var(--muted-foreground)" }}
            >
              High Interest
            </span>
          </div>
        </div>
      </div>
    </SlideFrame>
  )
}
