"use client"

import { useState } from "react"
import { SlideFrame } from "@/components/slide-frame"

// Six stakeholders seated around the table, each with a signature hue.
const seats = [
  { role: "Admin", color: "oklch(0.83 0.14 82)" },
  { role: "IT Team", color: "oklch(0.72 0.13 220)" },
  { role: "Dept Heads", color: "oklch(0.7 0.15 150)" },
  { role: "Facilities", color: "oklch(0.65 0.19 25)" },
  { role: "Students", color: "oklch(0.78 0.15 55)" },
  { role: "CRs", color: "oklch(0.7 0.16 300)" },
]

/**
 * Pictorial story — a project team convenes around a round table with a shared
 * laptop. Hovering a person lifts them, floods them with their color, and the
 * laptop screen glows in that same color (the "voice at the table").
 */
function RoundTable() {
  const [active, setActive] = useState<number | null>(null)
  const activeColor = active === null ? "oklch(0.72 0.02 255)" : seats[active].color

  return (
    <div
      className="relative aspect-square w-full"
      onMouseLeave={() => setActive(null)}
      role="group"
      aria-label="Project team seated around a table"
    >
      {/* faint orbit ring hinting the seats can be explored */}
      <div
        className="absolute inset-[9%] rounded-full border border-dashed border-muted-foreground/25 [animation:spin-slow_36s_linear_infinite]"
        aria-hidden="true"
      />

      {/* the round desk */}
      <div className="absolute inset-[20%] rounded-full border border-border bg-background/50" aria-hidden="true" />

      {/* laptop at the centre, screen lit with the active person's color */}
      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
        <div
          className="h-[7cqh] w-[11cqh] rounded-[0.6cqh] border transition-all duration-500"
          style={{
            background: `linear-gradient(160deg, ${activeColor}, transparent 120%)`,
            borderColor: activeColor,
            boxShadow: active === null ? "none" : `0 0 3cqh ${activeColor}`,
            opacity: active === null ? 0.4 : 1,
          }}
          aria-hidden="true"
        />
        <div
          className="h-[1.2cqh] w-[13cqh] rounded-b-[0.5cqh] bg-muted transition-colors duration-500"
          style={{ background: active === null ? undefined : activeColor }}
          aria-hidden="true"
        />
      </div>

      {/* seats arranged evenly around the circle */}
      {seats.map((s, i) => {
        const angle = (i / seats.length) * Math.PI * 2 - Math.PI / 2
        const radius = 42 // percent from centre
        const x = 50 + Math.cos(angle) * radius
        const y = 50 + Math.sin(angle) * radius
        const isActive = active === i
        return (
          <button
            key={s.role}
            type="button"
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            aria-label={s.role}
            className="absolute flex flex-col items-center gap-[0.6cqh] rounded-lg p-[0.6cqh] outline-none transition-transform duration-300 ease-out focus-visible:ring-2"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              transform: `translate(-50%, -50%) translateY(${isActive ? "-1.4cqh" : "0"}) scale(${isActive ? 1.1 : 1})`,
            }}
          >
            {/* head + shoulders form one contiguous figure */}
            <span className="flex flex-col items-center" aria-hidden="true">
              <span
                className="h-[3.4cqh] w-[3.4cqh] rounded-full border-2 transition-all duration-300"
                style={{
                  background: isActive ? s.color : "oklch(0.34 0.02 258)",
                  borderColor: isActive ? s.color : "transparent",
                  boxShadow: isActive ? `0 0 2.4cqh ${s.color}` : "none",
                }}
              />
              <span
                className="-mt-[0.4cqh] h-[3cqh] w-[5cqh] rounded-t-full transition-all duration-300"
                style={{ background: isActive ? s.color : "oklch(0.3 0.02 258)" }}
              />
            </span>
            <span
              className="whitespace-nowrap font-display text-[1.2cqh] font-medium tracking-wide transition-colors duration-300"
              style={{ color: isActive ? s.color : "var(--muted-foreground)" }}
            >
              {s.role}
            </span>
          </button>
        )
      })}
    </div>
  )
}

export function TitleSlide() {
  return (
    <SlideFrame badge="KL University · DTIE">
      <div className="flex h-full items-center gap-[4cqw]">
        <div className="flex max-w-[54%] flex-col justify-center">
          <p
            className="font-display text-[1.6cqw] font-medium uppercase tracking-[0.32em] text-primary"
            style={{ animation: "fadeup 0.5s ease-out both" }}
          >
            Breakout Activity-1
          </p>

          <h1
            className="mt-[3cqh] text-balance font-display text-[6cqw] font-bold leading-[1.02] tracking-tight text-card-foreground"
            style={{ animation: "fadeup 0.5s ease-out 0.08s both" }}
          >
            Power–Interest Matrix
          </h1>

          <p
            className="mt-[3.5cqh] text-pretty text-[2.2cqw] leading-relaxed text-muted-foreground"
            style={{ animation: "fadeup 0.5s ease-out 0.16s both" }}
          >
            Stakeholder Analysis for the{" "}
            <span className="text-card-foreground">Campus Classroom Seat Reservation System</span> Project
          </p>

          <div
            className="mt-[5cqh] flex items-center gap-[1.6cqw]"
            style={{ animation: "fadeup 0.5s ease-out 0.24s both" }}
          >
            <div className="h-[0.4cqh] w-[8cqw] rounded-full bg-primary" aria-hidden="true" />
            <span className="font-display text-[1.3cqw] uppercase tracking-[0.2em] text-muted-foreground">
              Group 1 - 2620030024 2620030056 2620030109 2620080049 2620080080 2620080081
            </span>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="w-[80%]">
            <RoundTable />
          </div>
        </div>
      </div>
    </SlideFrame>
  )
}
