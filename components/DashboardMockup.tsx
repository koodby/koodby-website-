import {
  PanelLeft,
  ChevronLeft,
  ChevronRight,
  Monitor,
  RotateCw,
  Share,
  Plus,
  Copy,
  Grid,
  Compass,
  Layers,
  ListTodo,
  Sparkles,
} from "lucide-react";
import { LogoMark } from "./Logo";

const stats = [
  { label: "PROJECTS", value: "4", sub: "Built to date" },
  { label: "PROTOTYPES", value: "2", sub: "In testing" },
  { label: "IN DEV", value: "1", sub: "Being built" },
  { label: "SERVICES", value: "4", sub: "What we offer" },
];

const subjectCards = [
  { name: "Near", desc: "AI health companion", tag: "Prototype" },
  { name: "DaawoCheck", desc: "Medicine verification", tag: "Prototype" },
  { name: "Ziko", desc: "Juice & cocktail ordering", tag: "In dev" },
];

type RowStatus = "Completed" | "In development" | "Prototype";
const pipeline: { name: string; type: string; area: string; status: RowStatus }[] = [
  { name: "Near", type: "AI model", area: "Health", status: "Prototype" },
  { name: "DaawoCheck", type: "AI + mobile", area: "Pharma", status: "Prototype" },
  { name: "Ziko", type: "Mobile app", area: "Food & drink", status: "In development" },
  { name: "MovieFlix", type: "Web app", area: "Streaming", status: "Completed" },
  { name: "koodby.com", type: "Marketing site", area: "Studio", status: "Completed" },
];

const statusColor: Record<RowStatus, string> = {
  Completed: "text-[#28c840]/80",
  "In development": "text-[#febc2e]/80",
  Prototype: "text-white/45",
};

const recent = [
  { name: "MovieFlix", ready: true },
  { name: "koodby.com", ready: true },
  { name: "Near", ready: false },
  { name: "DaawoCheck", ready: false },
];

function TitleIcon({ children }: { children: React.ReactNode }) {
  return <span className="text-white/40">{children}</span>;
}

export function DashboardMockup() {
  return (
    <div className="w-full overflow-hidden rounded-t-2xl bg-[#1a1a1c] text-left shadow-[0_-20px_80px_rgba(0,0,0,0.35)] ring-1 ring-white/10">
      {/* title bar */}
      <div className="flex items-center gap-3 border-b border-white/5 bg-[#242427] px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="ml-1 flex items-center gap-2.5">
          <TitleIcon><PanelLeft className="h-3.5 w-3.5" /></TitleIcon>
          <TitleIcon><ChevronLeft className="h-3.5 w-3.5" /></TitleIcon>
          <span className="text-white/25"><ChevronRight className="h-3.5 w-3.5" /></span>
        </div>
        <div className="flex flex-1 justify-center">
          <div className="flex items-center gap-1.5 rounded-md bg-[#1a1a1c] px-6 py-1 text-[10px] text-white/60">
            <Monitor className="h-3 w-3" />
            koodby.com
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <TitleIcon><RotateCw className="h-3.5 w-3.5" /></TitleIcon>
          <TitleIcon><Share className="h-3.5 w-3.5" /></TitleIcon>
          <TitleIcon><Plus className="h-3.5 w-3.5" /></TitleIcon>
          <TitleIcon><Copy className="h-3.5 w-3.5" /></TitleIcon>
        </div>
      </div>

      <div className="flex">
        {/* sidebar */}
        <aside className="w-[22%] border-r border-white/5 bg-[#1e1e21] px-3 py-3.5">
          <div className="flex items-center justify-between">
            <span className="text-white/70"><LogoMark size={16} /></span>
            <span className="text-white/30"><Grid className="h-3.5 w-3.5" /></span>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <span className="flex h-4 w-4 items-center justify-center rounded bg-[#6E56F0] text-[9px] font-semibold text-white">
              K
            </span>
            <span className="text-[10px] text-white/80">Koodby studio</span>
          </div>

          <nav className="mt-4 flex flex-col gap-2.5">
            {[
              { icon: Compass, label: "Overview" },
              { icon: Layers, label: "Projects" },
              { icon: ListTodo, label: "Pipeline" },
            ].map(({ icon: Icon, label }) => (
              <span key={label} className="flex items-center gap-2 text-[10px] text-white/60">
                <Icon className="h-3.5 w-3.5" />
                {label}
              </span>
            ))}
          </nav>

          <p className="mt-5 text-[8px] uppercase tracking-wider text-white/30">Recent</p>
          <ul className="mt-2 flex flex-col gap-2">
            {recent.map((r) => (
              <li key={r.name} className="flex items-center gap-2 text-[10px] text-white/55">
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    r.ready ? "bg-[#28c840]/70" : "bg-white/25"
                  }`}
                />
                <span className="truncate">{r.name}</span>
              </li>
            ))}
          </ul>
        </aside>

        {/* main */}
        <div className="flex-1 p-4">
          {/* header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#6E56F0] text-white">
                <LogoMark size={18} />
              </span>
              <div>
                <p className="text-sm font-medium text-white">Koodby</p>
                <p className="text-[10px] text-white/45">Studio dashboard · 4 projects</p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 text-[11px] font-medium text-white ring-1 ring-white/10">
              <Sparkles className="h-3.5 w-3.5" />
              New project
            </span>
          </div>

          {/* stats */}
          <div className="mt-4 grid grid-cols-4 divide-x divide-white/5 rounded-xl bg-white/[0.03] ring-1 ring-white/5">
            {stats.map((s) => (
              <div key={s.label} className="px-4 py-3">
                <p className="text-[8px] tracking-wider text-white/35">{s.label}</p>
                <p className="mt-1.5 text-xl font-medium text-white">{s.value}</p>
                <p className="mt-0.5 text-[9px] text-white/40">{s.sub}</p>
              </div>
            ))}
          </div>

          {/* subject cards */}
          <div className="mt-3 grid grid-cols-3 gap-3">
            {subjectCards.map((c) => (
              <div key={c.name} className="rounded-lg bg-white/[0.03] p-3 ring-1 ring-white/5">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-medium text-white">{c.name}</p>
                  <span className="rounded-full bg-white/5 px-1.5 py-0.5 text-[8px] text-white/50">
                    {c.tag}
                  </span>
                </div>
                <p className="mt-1 text-[9px] text-white/45">{c.desc}</p>
                <div className="mt-2.5 h-1 w-full overflow-hidden rounded-full bg-white/5">
                  <div className="h-full w-2/3 rounded-full bg-[#6E56F0]/60" />
                </div>
              </div>
            ))}
          </div>

          {/* pipeline table */}
          <div className="mt-3 overflow-hidden rounded-lg ring-1 ring-white/5">
            <div className="grid grid-cols-[2fr_1.4fr_1.2fr_1fr] bg-white/[0.03] px-3 py-2 text-[8px] uppercase tracking-wider text-white/35">
              <span>Project</span>
              <span>Type</span>
              <span>Area</span>
              <span className="text-right">Status</span>
            </div>
            {pipeline.map((row, i) => (
              <div
                key={row.name}
                className={`grid grid-cols-[2fr_1.4fr_1.2fr_1fr] items-center px-3 py-2 text-[10px] ${
                  i < pipeline.length - 1 ? "border-b border-white/5" : ""
                }`}
              >
                <span className="font-medium text-white/85">{row.name}</span>
                <span className="text-white/50">{row.type}</span>
                <span className="text-white/50">{row.area}</span>
                <span className={`text-right font-medium ${statusColor[row.status]}`}>
                  {row.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
