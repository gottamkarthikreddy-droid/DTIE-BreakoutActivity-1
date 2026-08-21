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
    stakeholders: [
      {
        name: "Project Sponsor / Product Owner",
        detail: "Drives vision, budget allocation, and core decisions.",
      },
      {
        name: "Operations Lead / Venue Manager",
        detail: "Oversees physical layout and seat allocations.",
      },
      {
        name: "Lead Software Architect / Engineering Team",
        detail: "Builds system features and core functionality.",
      },
      {
        name: "Customer Support Manager",
        detail: "Responsible for post-launch user issues and refunds.",
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
    stakeholders: [
      {
        name: "Data Protection & Compliance Officers / Legal Team",
        detail: "Ensures regulatory / GDPR / ADA compliance.",
      },
      {
        name: "Finance / Accounts Department",
        detail: "Controls funding and payment gateway approvals.",
      },
      {
        name: "IT Infrastructure & Cybersecurity Directors",
        detail: "Holds authority over hosting, servers, and security protocols.",
      },
      {
        name: "External Regulatory / Safety Bodies",
        detail: "e.g. Fire Department or Local Licensing Authorities setting seat capacity limits.",
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
    stakeholders: [
      {
        name: "End Users / Customers / Passengers",
        detail: "Book and reserve seats directly.",
      },
      {
        name: "Front-line Service Staff / Ticket Collectors / Gate Agents",
        detail: "Check-in users and manage seats on-site.",
      },
      {
        name: "Third-Party Booking Agents / Partners",
        detail: "Sell seats through external platforms.",
      },
      {
        name: "System Helpdesk / Support Agents",
        detail: "Resolve daily user reservation queries.",
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
    stakeholders: [
      {
        name: "General Public / Non-User Community",
        detail: "Unaffected by the reservation system directly.",
      },
      {
        name: "External Vendors / Hardware Suppliers",
        detail: "Provide basic equipment like scanners or servers.",
      },
      {
        name: "Competing Service Providers",
        detail: "Keep an eye on market trends.",
      },
      {
        name: "Indirect Maintenance Staff",
        detail: "Facility cleaners, general building maintenance.",
      },
    ],
  },
]

export const focusStakeholders = [
  "Project Sponsor / Product Owner",
  "Operations Lead / Venue Manager",
  "Lead Software Architect / Engineering Team",
  "Customer Support Manager",
]
