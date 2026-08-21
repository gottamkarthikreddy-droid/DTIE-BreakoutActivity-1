"use client"

import { useState } from "react"
import { SlideFrame } from "@/components/slide-frame"
import { quadrants } from "@/lib/matrix-data"

export function FocusSlide() {
  const core = quadrants.find((q) => q.id === "manage-closely")!
  const [active, setActive] = useState<number | null>(null)

  return (
    <SlideFrame kicker="Focus Summary" badge="08">
      <div className="flex h-full flex-col justify-center">
        <p
          className="font-display text-[1.6cqw] font-medium uppercase tracking-[0.28em] text-primary"
          style={{ animation: "fadeup 0.5s ease-out both" }}
        >
          Where the project lives or dies
        </p>
        <h2
          className="mt-[2cqh] max-w-[85%] text-balance font-display text-[4.2cqw] font-bold leading-tight tracking-tight text-card-foreground"
          style={{ animation: "fadeup 0.5s ease-out 0.08s both" }}
        >
          High Power &amp; High Interest are the core drivers of success
        </h2>

        {/* Spotlight rig: hovering one card lights it and dims the rest. */}
        <div
          className="mt-[5cqh] grid grid-cols-2 gap-[2cqw]"
          onMouseLeave={() => setActive(null)}
        >
          {core.stakeholders.map((s, i) => {
            const lit = active === i
            const dimmed = active !== null && !lit
            return (
              <button
                key={s.name}
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className="group relative flex flex-col overflow-hidden rounded-xl border p-[1.8cqw] text-left outline-none transition-all duration-300 ease-out"
                style={{
                  borderColor: lit ? "var(--primary)" : "var(--border)",
                  background: lit ? "var(--primary)" : "var(--background)",
                  transform: lit ? "translateY(-1.6cqh) scale(1.03)" : "scale(1)",
                  opacity: dimmed ? 0.4 : 1,
                  filter: dimmed ? "grayscale(0.6)" : "none",
                  boxShadow: lit ? "0 3cqh 6cqh -2cqh var(--primary)" : "none",
                  animation: `fadeup 0.5s ease-out ${0.16 + i * 0.08}s both`,
                }}
              >
                {/* overhead spotlight cone that appears on the lit card */}
                <span
                  className="pointer-events-none absolute -top-1/2 left-1/2 h-full w-[60%] -translate-x-1/2 rounded-full bg-primary-foreground/20 blur-xl transition-opacity duration-300"
                  style={{ opacity: lit ? 1 : 0 }}
                  aria-hidden="true"
                />
                <span
                  className="relative font-display text-[2cqw] font-bold transition-colors duration-300"
                  style={{ color: lit ? "var(--primary-foreground)" : "var(--primary)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3
                  className="relative mt-[1.4cqh] font-display text-[1.7cqw] font-semibold leading-tight transition-colors duration-300"
                  style={{ color: lit ? "var(--primary-foreground)" : "var(--card-foreground)" }}
                >
                  {s.name}
                </h3>
              </button>
            )
          })}
        </div>

        <p
          className="mt-[5cqh] max-w-[80%] text-pretty text-[1.7cqw] leading-relaxed text-muted-foreground"
          style={{ animation: "fadeup 0.5s ease-out 0.5s both" }}
        >
          Manage these four closely — align them early, keep them informed constantly, and let their
          decisions steer scope, budget, and delivery. Everyone else is engaged in proportion to their
          power and interest.
        </p>
      </div>
    </SlideFrame>
  )
}
