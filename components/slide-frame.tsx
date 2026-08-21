import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

type SlideFrameProps = {
  children: ReactNode
  /** Small label shown top-left, e.g. "Overview" */
  kicker?: string
  /** Slide number badge shown top-right */
  badge?: string
  className?: string
}

/**
 * A single fully-visible 16:9 slide. Uses container-query units so all
 * typography scales proportionally with the slide size — this keeps every
 * slide looking identical whether on a laptop or captured in a photo.
 */
export function SlideFrame({ children, kicker, badge, className }: SlideFrameProps) {
  return (
    <div className="[container-type:size] relative h-full w-full overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
      {/* subtle corner accent bar */}
      <div className="absolute inset-x-0 top-0 h-[0.5cqh] bg-primary" aria-hidden="true" />

      {(kicker || badge) && (
        <div className="absolute inset-x-0 top-0 flex items-center justify-between px-[4cqw] pt-[3cqh]">
          {kicker ? (
            <span className="font-display text-[1.4cqw] font-medium uppercase tracking-[0.28em] text-primary">
              {kicker}
            </span>
          ) : (
            <span />
          )}
          {badge && (
            <span className="font-display text-[1.3cqw] font-medium tracking-widest text-muted-foreground">
              {badge}
            </span>
          )}
        </div>
      )}

      <div className={cn("flex h-full w-full flex-col px-[6cqw] py-[7cqh]", className)}>{children}</div>
    </div>
  )
}
