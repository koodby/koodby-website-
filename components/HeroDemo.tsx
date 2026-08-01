import {
  Search,
  LayoutDashboard,
  FolderKanban,
  Users,
  FileText,
  ChartNoAxesColumn,
  ChevronsLeft,
  ChevronDown,
  ChevronRight,
  Plus,
  Bell,
  CircleHelp,
  Calendar,
  RefreshCw,
  FlaskConical,
  Hammer,
  CircleCheck,
  LayoutGrid,
  Check,
} from "lucide-react";

/*
 * Honest, colourful stats (5 columns to match the reference). Values are real
 * — derived from the project list below — and the chips are truthful short
 * statuses, not invented "+% from last month" figures.
 */
const stats = [
  { icon: FolderKanban, label: "Projects", value: "4", chip: "total", tone: "bg-blue-50 text-blue-600" },
  { icon: CircleCheck, label: "Shipped", value: "1", chip: "live", tone: "bg-emerald-50 text-emerald-600" },
  { icon: FlaskConical, label: "Prototypes", value: "2", chip: "beta", tone: "bg-amber-50 text-amber-600" },
  { icon: Hammer, label: "In development", value: "1", chip: "active", tone: "bg-orange-50 text-orange-600" },
  { icon: LayoutGrid, label: "Services", value: "4", chip: "core", tone: "bg-iris-tint text-iris" },
];

type Status = "Prototype" | "In development" | "Completed";

const projects: {
  initial: string;
  tone: string;
  name: string;
  kind: string;
  status: Status;
}[] = [
  { initial: "N", tone: "bg-iris-tint text-iris", name: "Near", kind: "AI health companion", status: "Prototype" },
  { initial: "D", tone: "bg-teal-tint text-teal", name: "DaawoCheck", kind: "Medicine verification", status: "Prototype" },
  { initial: "Z", tone: "bg-amber-50 text-amber-600", name: "Ziko", kind: "Juice & cocktail ordering", status: "In development" },
  { initial: "M", tone: "bg-blue-50 text-blue-600", name: "MovieFlix", kind: "Movies & streaming", status: "Completed" },
];

const statusStyle: Record<Status, string> = {
  Prototype: "border border-white/70 bg-white/50 text-muted",
  "In development": "bg-amber-50 text-amber-600",
  Completed: "bg-emerald-50 text-emerald-600",
};

const menu = [
  { icon: LayoutDashboard, label: "Dashboard", active: true, badge: null },
  { icon: FolderKanban, label: "Projects", active: false, badge: "4" },
  { icon: Users, label: "Clients", active: false, badge: null },
  { icon: FileText, label: "Documents", active: false, badge: null },
  { icon: ChartNoAxesColumn, label: "Reports", active: false, badge: null },
];

/** Small glass control pill used across the header / sub-header. */
function GlassPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-btn border border-white/70 bg-white/50 px-2.5 py-1.5 text-[12px] text-ink">
      {children}
    </span>
  );
}

/**
 * The hero "demo": a glassmorphic Koodby studio dashboard. Frosted panel over a
 * soft colour wash, with honest project stats styled colourfully. Presentational.
 */
export function HeroDemo() {
  return (
    <div className="relative mx-auto w-full max-w-[1040px]">
      {/* colour wash so the frosted glass has something to refract */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-[20px]"
        aria-hidden="true"
      >
        <div className="absolute -left-16 top-8 h-64 w-64 rounded-full bg-iris/30 blur-3xl" />
        <div className="absolute right-2 -top-6 h-56 w-56 rounded-full bg-teal/20 blur-3xl" />
        <div className="absolute left-1/3 top-40 h-64 w-64 rounded-full bg-blue-400/25 blur-3xl" />
        <div className="absolute right-1/4 top-24 h-52 w-52 rounded-full bg-amber-300/25 blur-3xl" />
        <div className="absolute -left-10 bottom-0 h-56 w-56 rounded-full bg-blue-300/20 blur-3xl" />
        <div className="absolute right-4 bottom-2 h-52 w-52 rounded-full bg-iris/20 blur-3xl" />
      </div>

      {/* frosted panel */}
      <div className="relative overflow-hidden rounded-[20px] border border-white/70 bg-white/55 shadow-demo backdrop-blur-xl">
        <div className="flex min-h-[420px]">
          {/* sidebar */}
          <aside className="hidden w-[214px] shrink-0 flex-col border-r border-white/60 bg-white/25 p-4 md:flex">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-2">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-[9px] border border-white/70 bg-white/70">
                  <img
                    src="/narbar-logo.png"
                    alt=""
                    className="h-5 w-5 object-contain"
                  />
                </span>
                <span className="font-display text-[15px] font-semibold text-ink">Koodby</span>
              </span>
              <ChevronsLeft size={16} strokeWidth={1.75} className="text-muted" aria-hidden="true" />
            </div>

            <div className="mt-4 flex items-center gap-2 rounded-btn border border-white/70 bg-white/50 px-3 py-2 text-[12px] text-muted">
              <Search size={13} strokeWidth={1.75} aria-hidden="true" />
              Search...
            </div>

            <p className="eyebrow mb-2 mt-5">Main menu</p>
            <nav className="flex flex-col gap-0.5">
              {menu.map(({ icon: Icon, label, active, badge }) => (
                <span
                  key={label}
                  className={`flex items-center gap-2.5 rounded-btn px-2.5 py-2 text-[13px] ${
                    active
                      ? "bg-white/70 font-medium text-ink shadow-[0_1px_2px_rgba(15,15,20,0.04)]"
                      : "text-muted"
                  }`}
                >
                  <Icon size={16} strokeWidth={1.75} aria-hidden="true" />
                  {label}
                  {badge && (
                    <span className="ml-auto rounded-full bg-white/70 px-1.5 text-[11px] text-muted">
                      {badge}
                    </span>
                  )}
                </span>
              ))}
            </nav>
          </aside>

          {/* main */}
          <div className="min-w-0 flex-1">
            {/* top bar */}
            <div className="flex items-center justify-between gap-3 border-b border-white/60 px-5 py-3.5">
              <h3 className="font-display text-[17px] font-semibold text-ink">Dashboard</h3>
              <div className="flex items-center gap-2">
                <span className="hidden items-center gap-1.5 rounded-btn border border-white/70 bg-white/50 px-2.5 py-1.5 text-[12px] font-medium text-ink sm:inline-flex">
                  <Plus size={13} strokeWidth={2} aria-hidden="true" />
                  Add member
                </span>
                <span className="hidden h-8 w-8 items-center justify-center rounded-btn border border-white/70 bg-white/50 text-muted sm:inline-flex">
                  <CircleHelp size={15} strokeWidth={1.75} aria-hidden="true" />
                </span>
                <span className="hidden h-8 w-8 items-center justify-center rounded-btn border border-white/70 bg-white/50 text-muted sm:inline-flex">
                  <Bell size={15} strokeWidth={1.75} aria-hidden="true" />
                </span>
                <img
                  src="/tarzan_founder.png"
                  alt="Team member"
                  className="h-8 w-8 rounded-full border border-white/70 object-cover"
                />
              </div>
            </div>

            {/* sub-header */}
            <div className="flex flex-col gap-3 border-b border-white/60 px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="eyebrow">Overview</p>
                <p className="mt-1 inline-flex items-center gap-1.5 text-[12px] text-muted">
                  <RefreshCw size={12} strokeWidth={1.75} aria-hidden="true" />
                  Last sync: just now
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <GlassPill>
                  Monthly
                  <ChevronDown size={13} strokeWidth={1.75} aria-hidden="true" />
                </GlassPill>
                <GlassPill>
                  <Calendar size={13} strokeWidth={1.75} aria-hidden="true" />
                  Mar 01 – Apr 01, 2026
                </GlassPill>
                <span className="inline-flex items-center gap-1.5 rounded-btn bg-ink px-3 py-1.5 text-[12px] font-medium text-off-white">
                  <Plus size={13} strokeWidth={2} aria-hidden="true" />
                  Add task
                </span>
              </div>
            </div>

            {/* body */}
            <div className="p-4 sm:p-5">
              {/* stats sub-card */}
              <div className="rounded-2xl border border-white/60 bg-white/45 p-2">
                <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3 lg:grid-cols-5">
                  {stats.map(({ icon: Icon, label, value, chip, tone }) => (
                    <div key={label} className="rounded-xl p-3 transition-colors hover:bg-white/50">
                      <span className={`inline-flex h-8 w-8 items-center justify-center rounded-btn ${tone}`}>
                        <Icon size={16} strokeWidth={1.75} aria-hidden="true" />
                      </span>
                      <div className="mt-3 flex items-end gap-1.5">
                        <p className="font-display text-[24px] font-semibold leading-none text-ink">
                          {value}
                        </p>
                        <span className={`mb-0.5 rounded-full px-1.5 py-0.5 text-[10px] font-medium ${tone}`}>
                          {chip}
                        </span>
                      </div>
                      <p className="mt-1.5 truncate text-[12px] text-muted">{label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* project list */}
              <div className="mt-4 rounded-2xl border border-white/60 bg-white/45">
                <div className="flex items-center justify-between border-b border-white/60 px-4 py-3">
                  <h4 className="font-display text-[14px] font-medium text-ink">Projects</h4>
                  <span className="inline-flex items-center gap-1 text-[12px] text-muted">
                    View all <ChevronRight size={13} strokeWidth={1.75} aria-hidden="true" />
                  </span>
                </div>
                <ul>
                  {projects.map((p, i) => (
                    <li
                      key={p.name}
                      className={`flex items-center gap-3 px-4 py-3 ${
                        i < projects.length - 1 ? "border-b border-white/50" : ""
                      }`}
                    >
                      <span
                        className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-btn font-display text-[14px] font-semibold ${p.tone}`}
                      >
                        {p.initial}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[13px] font-medium text-ink">{p.name}</span>
                        <span className="block truncate text-[12px] text-muted">{p.kind}</span>
                      </span>
                      <span
                        className={`inline-flex shrink-0 items-center gap-1 rounded-pill px-2.5 py-1 text-[11px] font-medium ${statusStyle[p.status]}`}
                      >
                        {p.status === "Completed" && (
                          <Check size={11} strokeWidth={2.5} aria-hidden="true" />
                        )}
                        {p.status}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
