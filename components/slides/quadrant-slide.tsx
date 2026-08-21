"use client"

import { useState } from "react"
import { SlideFrame } from "@/components/slide-frame"
import type { Quadrant } from "@/lib/matrix-data"

/** Mini 2x2 locator; the active cell breathes in the quadrant color. */
function Locator({ quadrant }: { quadrant: Quadrant }) {
  const cells = [
    { row: 1, col: 1 },
    { row: 1, col: 2 },
    { row: 2, col: 1 },
    { row: 2, col: 2 },
  ]
  return (
    <div className="relative grid grid-cols-2 grid-rows-2 gap-[0.5cqw]" aria-hidden="true">
      {cells.map((c) => {
        const active = c.row === quadrant.gridRow && c.col === quadrant.gridCol
        return (
          <span key={`${c.row}-${c.col}`} className="relative h-[3cqw] w-[3cqw]">
            <span
              className="absolute inset-0 rounded-[0.4cqw] transition-colors"
              style={{ background: active ? quadrant.color : "var(--muted)" }}
            />
            {active && (
              <span
                className="absolute inset-0 rounded-[0.4cqw] [animation:ping_1.8s_cubic-bezier(0,0,0.2,1)_infinite]"
                style={{ background: quadrant.color, opacity: 0.5 }}
              />
            )}
          </span>
        )
      })}
    </div>
  )
}

export function QuadrantSlide({ quadrant, badge }: { quadrant: Quadrant; badge: string }) {
  const [active, setActive] = useState<number | null>(null)
  const c = quadrant.color

  return (
    <SlideFrame kicker={`Quadrant ${quadrant.index}`} badge={badge}>
      <div className="flex h-full flex-col">
        <div className="flex items-start justify-between gap-[3cqw]">
          <div className="max-w-[75%]">
            <div className="flex items-center gap-[1.4cqw]">
              <span
                className="rounded-full border px-[1.6cqw] py-[0.6cqh] font-display text-[1.3cqw] font-medium uppercase tracking-widest transition-colors"
                style={{
                  borderColor: `color-mix(in oklab, ${c} 55%, transparent)`,
                  background: `color-mix(in oklab, ${c} 12%, transparent)`,
                  color: c,
                }}
              >
                {quadrant.power} Power · {quadrant.interest} Interest
              </span>
            </div>
            <h2
              className="mt-[2.2cqh] font-display text-[4.4cqw] font-bold leading-none tracking-tight"
              style={{ color: c, animation: "fadeup 0.5s ease-out 0.05s both" }}
            >
              {quadrant.strategy}
            </h2>
            <p
              className="mt-[2cqh] max-w-[92%] text-pretty text-[1.7cqw] leading-relaxed text-muted-foreground"
              style={{ animation: "fadeup 0.5s ease-out 0.12s both" }}
            >
              {quadrant.tagline}
            </p>
          </div>
          <Locator quadrant={quadrant} />
        </div>

        <div
          className="mt-[4cqh] grid flex-1 grid-cols-2 gap-x-[3cqw] gap-y-[2cqh] content-start"
          onMouseLeave={() => setActive(null)}
        >
          {quadrant.stakeholders.map((s, i) => {
            const on = active === i
            return (
              <button
                key={s.name}
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className="group relative flex gap-[1.4cqw] rounded-lg border border-transparent p-[1.2cqw] text-left outline-none transition-all duration-300"
                style={{
                  borderColor: on ? `color-mix(in oklab, ${c} 45%, transparent)` : "transparent",
                  background: on ? `color-mix(in oklab, ${c} 9%, transparent)` : "transparent",
                  transform: on ? "translateX(0.8cqw)" : "none",
                  animation: `fadeup 0.45s ease-out ${0.15 + i * 0.07}s both`,
                }}
              >
                {/* bullet expands into a connector line on hover */}
                <span className="mt-[0.9cqh] flex shrink-0 items-center">
                  <span
                    className="h-[1.1cqw] w-[1.1cqw] rounded-full transition-all duration-300"
                    style={{ background: c, boxShadow: on ? `0 0 1.6cqh ${c}` : "none" }}
                    aria-hidden="true"
                  />
                  <span
                    className="h-[0.28cqh] rounded-full transition-all duration-300"
                    style={{ width: on ? "1.4cqw" : "0cqw", background: c }}
                    aria-hidden="true"
                  />
                </span>
                <div>
                  <h3
                    className="font-display text-[1.85cqw] font-semibold leading-tight transition-colors duration-300"
                    style={{ color: on ? c : "var(--card-foreground)" }}
                  >
                    {s.name}
                  </h3>
                  <p className="mt-[0.6cqh] text-pretty text-[1.45cqw] leading-relaxed text-muted-foreground">
                    {s.detail}
                  </p>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </SlideFrame>
  )
}
