"use client"

import { useState } from "react"
import { SlideFrame } from "@/components/slide-frame"

const points = [
  {
    title: "The Project",
    body: "A campus-wide classroom seat-reservation system — a BookMyShow-style seat grid for university lecture halls and classrooms. Students browse a live seat map, pick their seat, and reserve it in real time, moving from first-come-first-serve to first-book-first-serve.",
  },
  {
    title: "The Platform",
    body: "Built as a universal, multi-tenant platform. Representative institutions like Jindal or KLU register their own campus, and a designated representative maps out lecture halls and classrooms with an easy-to-use room-allotment tool — each campus runs its own branch.",
  },
  {
    title: "The Goal",
    body: "Replace sit-where-you-can chaos with planned, predictable seating. The system uses class time-tables, mapped rooms, and an internal clock to ensure any college can adopt it and students can reserve seats for every lecture without conflict.",
  },
]

/**
 * Story beat 2: the flow of reasoning. Three stages sit on a connecting track;
 * hovering a stage energizes the track up to that point and lights its node,
 * as if the argument is being traced step by step.
 */
export function OverviewSlide() {
  const [active, setActive] = useState<number | null>(null)

  return (
    <SlideFrame kicker="Project Overview" badge="02">
      <div className="flex h-full flex-col justify-center">
        <h2
          className="max-w-[80%] text-balance font-display text-[4cqw] font-bold leading-tight tracking-tight text-card-foreground"
          style={{ animation: "fadeup 0.5s ease-out both" }}
        >
          Brief Overview Of the Project
        </h2>

        <div className="mt-[7cqh]" onMouseLeave={() => setActive(null)}>
          {/* Node row with the connecting track running through the node centres */}
          <div className="relative grid grid-cols-3">
            {/* track: sits at the vertical centre of the node dots */}
            <div
              className="absolute left-[16.66%] right-[16.66%] top-[2.4cqw] h-[0.4cqh] -translate-y-1/2 rounded-full bg-border"
              aria-hidden="true"
            >
              <div
                className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
                style={{ width: active === null ? "0%" : `${(active / (points.length - 1)) * 100}%` }}
              />
            </div>

            {points.map((p, i) => {
              const lit = active !== null && i <= active
              return (
                <div key={p.title} className="relative flex justify-center">
                  <span
                    className="flex h-[4.8cqw] w-[4.8cqw] items-center justify-center rounded-full border-2 font-display text-[2cqw] font-bold transition-all duration-300"
                    style={{
                      borderColor: lit ? "var(--primary)" : "var(--border)",
                      background: lit ? "var(--primary)" : "var(--card)",
                      color: lit ? "var(--primary-foreground)" : "var(--muted-foreground)",
                      boxShadow: lit ? "0 0 2.4cqh var(--primary)" : "none",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              )
            })}
          </div>

          {/* Cards below, aligned to their nodes */}
          <div className="mt-[3cqh] grid grid-cols-3 gap-[3cqw]">
            {points.map((p, i) => (
              <div
                key={p.title}
                onMouseEnter={() => setActive(i)}
                className="group flex flex-col items-center rounded-xl border border-border bg-background/40 p-[2.2cqw] text-center transition-all duration-300 hover:-translate-y-[1.4cqh] hover:border-primary/60 hover:shadow-[0_2cqh_5cqh_-2cqh_var(--primary)]"
              >
                <h3 className="font-display text-[2cqw] font-semibold text-card-foreground">{p.title}</h3>
                <p className="mt-[1.5cqh] text-pretty text-[1.5cqw] leading-relaxed text-muted-foreground">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlideFrame>
  )
}
