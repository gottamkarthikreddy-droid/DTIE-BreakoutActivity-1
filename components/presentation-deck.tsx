"use client"

import { useCallback, useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { quadrants } from "@/lib/matrix-data"
import { TitleSlide } from "@/components/slides/title-slide"
import { OverviewSlide } from "@/components/slides/overview-slide"
import { MatrixSlide } from "@/components/slides/matrix-slide"
import { QuadrantSlide } from "@/components/slides/quadrant-slide"
import { FocusSlide } from "@/components/slides/focus-slide"

// Order the quadrant slides logically: the two high-power groups first.
const orderedQuadrants = [
  quadrants.find((q) => q.id === "manage-closely")!,
  quadrants.find((q) => q.id === "keep-satisfied")!,
  quadrants.find((q) => q.id === "keep-informed")!,
  quadrants.find((q) => q.id === "monitor")!,
]

const slides = [
  { label: "Title", node: <TitleSlide /> },
  { label: "Overview", node: <OverviewSlide /> },
  { label: "Matrix", node: <MatrixSlide /> },
  ...orderedQuadrants.map((q, i) => ({
    label: q.strategy,
    node: <QuadrantSlide quadrant={q} badge={String(i + 4).padStart(2, "0")} />,
  })),
  { label: "Focus", node: <FocusSlide /> },
]

export function PresentationDeck() {
  const [current, setCurrent] = useState(0)
  const total = slides.length

  const go = useCallback(
    (dir: number) => {
      setCurrent((c) => Math.min(Math.max(c + dir, 0), total - 1))
    },
    [total],
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault()
        go(1)
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault()
        go(-1)
      } else if (e.key === "Home") {
        setCurrent(0)
      } else if (e.key === "End") {
        setCurrent(total - 1)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [go, total])

  return (
    <main className="flex min-h-dvh flex-col bg-background">
      {/* Slide stage — a centered, letterboxed 16:9 canvas */}
      <div className="flex flex-1 items-center justify-center px-4 pt-6 md:px-10">
        <div className="w-full max-w-[calc(177.78dvh-8rem)]">
          <div className="aspect-[16/9] w-full">
            <div key={current} className="h-full w-full animate-[slidein_0.4s_ease-out]">
              {slides[current].node}
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 px-4 py-5 md:px-10">
        <button
          type="button"
          onClick={() => go(-1)}
          disabled={current === 0}
          aria-label="Previous slide"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-card-foreground transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2" role="tablist" aria-label="Slides">
          {slides.map((s, i) => (
            <button
              key={s.label + i}
              type="button"
              role="tab"
              aria-selected={i === current}
              aria-label={`Go to ${s.label} slide`}
              onClick={() => setCurrent(i)}
              className={
                "h-2.5 rounded-full transition-all " +
                (i === current ? "w-7 bg-primary" : "w-2.5 bg-muted hover:bg-muted-foreground/50")
              }
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => go(1)}
          disabled={current === total - 1}
          aria-label="Next slide"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-card-foreground transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        <span className="ml-2 hidden font-display text-sm tabular-nums text-muted-foreground sm:inline">
          {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>
    </main>
  )
}
