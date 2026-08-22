"use client"

import { SlideFrame } from "@/components/slide-frame"
import { Heart } from "lucide-react"

const members = [
  { roll: "2620030024", gender: "male" as const },
  { roll: "2620030056", gender: "male" as const },
  { roll: "2620030109", gender: "male" as const },
  { roll: "2620080049", gender: "female" as const },
  { roll: "2620080080", gender: "female" as const },
  { roll: "2620080081", gender: "female" as const },
]

function MaleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="10" cy="14" r="6" />
      <path d="m14 10 6-6" />
      <path d="m15 4h5v5" />
    </svg>
  )
}

function FemaleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="9" r="6" />
      <path d="M12 15v7" />
      <path d="m9 19 3 3 3-3" />
    </svg>
  )
}

export function ThankYouSlide() {
  return (
    <SlideFrame kicker="Thank You" badge="10">
      <div className="flex h-full flex-col items-center justify-center">
        {/* Heart icon with pulse */}
        <div
          className="flex items-center justify-center"
          style={{ animation: "fadeup 0.6s ease-out both" }}
        >
          <span
            className="flex h-[10cqh] w-[10cqh] items-center justify-center rounded-full border-2 border-primary/30"
            style={{ background: "color-mix(in oklab, var(--primary) 10%, transparent)" }}
          >
            <Heart
              className="text-primary"
              style={{ width: "5cqh", height: "5cqh", animation: "breathe 3s ease-in-out infinite" }}
            />
          </span>
        </div>

        <h1
          className="mt-[4cqh] text-center font-display text-[7cqw] font-bold leading-none tracking-tight text-card-foreground"
          style={{ animation: "fadeup 0.5s ease-out 0.1s both" }}
        >
          Thank You
        </h1>

        <p
          className="mt-[3cqh] text-center text-pretty text-[1.8cqw] leading-relaxed text-muted-foreground"
          style={{ animation: "fadeup 0.5s ease-out 0.2s both" }}
        >
          Stakeholder Analysis — Campus Classroom Seat Reservation System
        </p>

        {/* Roll numbers with gender icons */}
        <div
          className="mt-[6cqh] flex flex-wrap items-center justify-center gap-x-[2.5cqw] gap-y-[1.5cqh]"
          style={{ animation: "fadeup 0.5s ease-out 0.3s both" }}
        >
          {members.map((m, i) => (
            <div
              key={m.roll}
              className="flex items-center gap-[0.8cqw] rounded-lg border border-border bg-background/40 px-[1.4cqw] py-[0.8cqh]"
              style={{ animation: `fadeup 0.4s ease-out ${0.35 + i * 0.06}s both` }}
            >
              {m.gender === "male" ? (
                <MaleIcon className="h-[1.8cqw] w-[1.8cqw] text-primary" />
              ) : (
                <FemaleIcon className="h-[1.8cqw] w-[1.8cqw]" style={{ color: "oklch(0.72 0.13 220)" }} />
              )}
              <span className="font-display text-[1.4cqw] font-medium tabular-nums text-card-foreground">
                {m.roll}
              </span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          className="mt-[6cqh] flex items-center gap-[1.2cqw]"
          style={{ animation: "fadeup 0.5s ease-out 0.5s both" }}
        >
          <div className="h-[0.3cqh] w-[4cqw] rounded-full bg-primary" aria-hidden="true" />
          <span className="font-display text-[1.2cqw] uppercase tracking-[0.2em] text-muted-foreground">
            Made by Group 1 · KLH University DTIE
          </span>
          <div className="h-[0.3cqh] w-[4cqw] rounded-full bg-primary" aria-hidden="true" />
        </div>
      </div>
    </SlideFrame>
  )
}
