"use client"

import { useState } from "react"
import { SlideFrame } from "@/components/slide-frame"
import { quadrants } from "@/lib/matrix-data"

const orbitOrder = [
  quadrants.find((q) => q.id === "keep-satisfied")!,
  quadrants.find((q) => q.id === "manage-closely")!,
  quadrants.find((q) => q.id === "keep-informed")!,
  quadrants.find((q) => q.id === "monitor")!,
]

export function OrbitSlide() {
  const [active, setActive] = useState<number | null>(null)
  const radius = 30 // percent from centre

  return (
    <SlideFrame kicker="Stakeholder Orbit" badge="09">
      <div className="flex h-full items-center gap-[4cqw]">
        {/* Left: revolving icons */}
        <div className="flex flex-1 items-center justify-center">
          <div className="relative aspect-square w-[75%]">
            {/* orbit ring */}
            <div
              className="absolute inset-[18%] rounded-full border border-dashed border-muted-foreground/20"
              aria-hidden="true"
            />

            {/* rotating container */}
            <div
              className="absolute inset-0"
              style={{ animation: "orbit 30s linear infinite" }}
            >
              {orbitOrder.map((q, i) => {
                const angle = (i / orbitOrder.length) * Math.PI * 2 - Math.PI / 2
                const x = 50 + Math.cos(angle) * radius
                const y = 50 + Math.sin(angle) * radius
                const Icon = q.icon
                const isActive = active === i
                return (
                  <button
                    key={q.id}
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    aria-label={q.iconLabel}
                    className="absolute flex flex-col items-center gap-[0.5cqh] outline-none"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    {/* counter-rotate to keep icon upright */}
                    <span
                      className="flex items-center justify-center rounded-full border-2 transition-all duration-300"
                      style={{
                        width: "6cqh",
                        height: "6cqh",
                        borderColor: isActive ? q.color : "var(--border)",
                        background: isActive
                          ? `color-mix(in oklab, ${q.color} 20%, var(--card))`
                          : "var(--card)",
                        boxShadow: isActive ? `0 0 3cqh ${q.color}` : "none",
                        animation: "counter-orbit 30s linear infinite",
                      }}
                    >
                      <Icon
                        style={{
                          width: "3cqh",
                          height: "3cqh",
                          color: isActive ? q.color : "var(--muted-foreground)",
                        }}
                      />
                    </span>
                    <span
                      className="whitespace-nowrap font-display text-[1.1cqh] font-medium tracking-wide transition-colors duration-300"
                      style={{
                        color: isActive ? q.color : "var(--muted-foreground)",
                        animation: "counter-orbit 30s linear infinite",
                      }}
                    >
                      {q.iconLabel}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* centre hub */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="flex h-[8cqh] w-[8cqh] items-center justify-center rounded-full border border-border bg-card">
                <span className="font-display text-[1.4cqh] font-bold text-primary">SRS</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: importance list */}
        <div className="flex max-w-[42%] flex-col justify-center" onMouseLeave={() => setActive(null)}>
          <h2
            className="text-balance font-display text-[3.4cqw] font-bold leading-tight tracking-tight text-card-foreground"
            style={{ animation: "fadeup 0.5s ease-out both" }}
          >
            Why Each Stakeholder Matters
          </h2>
          <div className="mt-[4cqh] flex flex-col gap-[2.5cqh]">
            {orbitOrder.map((q, i) => {
              const Icon = q.icon
              const isActive = active === i
              return (
                <div
                  key={q.id}
                  onMouseEnter={() => setActive(i)}
                  className="flex items-start gap-[1.4cqw] transition-all duration-300"
                  style={{
                    opacity: active === null || isActive ? 1 : 0.35,
                    animation: `fadeup 0.45s ease-out ${0.15 + i * 0.1}s both`,
                  }}
                >
                  <span
                    className="flex h-[3.5cqw] w-[3.5cqw] shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300"
                    style={{
                      borderColor: isActive ? q.color : "var(--border)",
                      background: isActive
                        ? `color-mix(in oklab, ${q.color} 15%, transparent)`
                        : "transparent",
                    }}
                  >
                    <Icon
                      className="transition-colors duration-300"
                      style={{
                        width: "1.8cqw",
                        height: "1.8cqw",
                        color: isActive ? q.color : "var(--muted-foreground)",
                      }}
                    />
                  </span>
                  <div>
                    <h3
                      className="font-display text-[1.7cqw] font-semibold leading-tight transition-colors duration-300"
                      style={{ color: isActive ? q.color : "var(--card-foreground)" }}
                    >
                      {q.iconLabel}
                    </h3>
                    <p className="mt-[0.5cqh] text-pretty text-[1.35cqw] leading-relaxed text-muted-foreground">
                      {q.importance}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </SlideFrame>
  )
}
