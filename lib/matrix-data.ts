import type { LucideIcon } from "lucide-react"
import { HardHat, Landmark, GraduationCap, ShieldCheck } from "lucide-react"

export type Stakeholder = {
  name: string
  detail: string
}

export type Quadrant = {
  id: string
  index: number
  power: "High" | "Low"
  interest: "High" | "Low"
  strategy: string
  tagline: string
  stakeholders: Stakeholder[]
  /** grid position for the 2x2 matrix: [row, col] */
  gridRow: number
  gridCol: number
  /** signature color used for this quadrant's interactive accents */
  color: string
  /** lucide icon representing the quadrant's domain */
  icon: LucideIcon
  /** short label for the icon */
  iconLabel: string
  /** one-line importance blurb shown on the revolving-icons slide */
  importance: string
}

export const quadrants: Quadrant[] = [
  {
    id: "manage-closely",
    index: 2,
    power: "High",
    interest: "High",
    strategy: "Manage Closely",
    tagline: "The core drivers — engage continuously and involve in every key decision.",
    gridRow: 1,
    gridCol: 2,
    color: "oklch(0.83 0.14 82)",
    icon: Landmark,
    iconLabel: "Administration",
    importance: "Approves rollout, defines seat-allocation policy, and keeps the platform running.",
    stakeholders: [
      {
        name: "College Administration / Dean of Academics",
        detail: "Owns the academic policy, approves campus-wide rollout, and defines seat-allocation rules per department.",
      },
      {
        name: "IT Infrastructure & Campus Systems Team",
        detail: "Hosts and maintains the platform, manages tenant onboarding for each institution, and ensures uptime during peak booking windows.",
      },
    ],
  },
  {
    id: "keep-satisfied",
    index: 1,
    power: "High",
    interest: "Low",
    strategy: "Keep Satisfied",
    tagline: "High authority, low day-to-day engagement — meet their requirements, avoid overload.",
    gridRow: 1,
    gridCol: 1,
    color: "oklch(0.72 0.13 220)",
    icon: HardHat,
    iconLabel: "Campus Facilities",
    importance: "Keeps rooms physically ready and ensures safety limits match the digital seat map.",
    stakeholders: [
      {
        name: "Department Heads / Professors",
        detail: "Control which lecture halls and classrooms are open for reservation and set capacity per course.",
      },
      {
        name: "Campus Facilities & Maintenance Staff",
        detail: "Ensure rooms are physically ready, seats are intact, and safety limits match the digital seat map.",
      },
    ],
  },
  {
    id: "keep-informed",
    index: 3,
    power: "Low",
    interest: "High",
    strategy: "Keep Informed",
    tagline: "Highly engaged but limited authority — keep them updated and gather feedback.",
    gridRow: 2,
    gridCol: 2,
    color: "oklch(0.7 0.15 150)",
    icon: GraduationCap,
    iconLabel: "Students",
    importance: "The primary users who browse the seat grid and reserve seats for every lecture.",
    stakeholders: [
      {
        name: "Students (Primary Users)",
        detail: "Browse the seat grid, reserve seats in real time, and rely on the system for every lecture.",
      },
      {
        name: "Class Representatives (CRs)",
        detail: "Aggregate peer feedback, flag booking conflicts, and act as the voice of the student body.",
      },
    ],
  },
  {
    id: "monitor",
    index: 4,
    power: "Low",
    interest: "Low",
    strategy: "Monitor",
    tagline: "Minimal effort — keep an eye out, act only if their position shifts.",
    gridRow: 2,
    gridCol: 1,
    color: "oklch(0.72 0.07 255)",
    icon: ShieldCheck,
    iconLabel: "Security",
    importance: "Handles access control and steps in only if a reservation dispute escalates.",
    stakeholders: [
      {
        name: "External Vendors",
        detail: "Supply scanners, printers, or hardware spares — engaged only when infrastructure needs replenishing.",
      },
      {
        name: "Campus Security",
        detail: "Perimeter and access control; only involved if a reservation dispute escalates to a physical incident.",
      },
    ],
  },
]

export const focusStakeholders = [
  "College Administration / Dean of Academics",
  "IT Infrastructure & Campus Systems Team",
]
