import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Design Hub | create by™",
  description: "Design system, prototypes and visual references for create by™.",
};

const colors = [
  { name: "Background", value: "#fafaf9", dark: "#0f0f0e", token: "bg" },
  { name: "Foreground", value: "#1c1917", dark: "#f5f5f4", token: "text" },
  { name: "Stone 400", value: "#a8a29e", dark: "#57534e", token: "muted" },
  { name: "Stone 200", value: "#e7e5e4", dark: "#292524", token: "border" },
  // Framer palette
  { name: "Cream", value: "#EDE6D2", token: "framer-bg" },
  { name: "Forest", value: "#253025", token: "framer-text" },
  { name: "Sage", value: "#7E897E", token: "framer-muted" },
  { name: "Teal", value: "#009CBC", token: "framer-teal" },
  { name: "Plum", value: "#7E197A", token: "framer-plum" },
  { name: "Amber", value: "#FFB401", token: "framer-amber" },
];

const typeScale = [
  { label: "Display", size: "text-5xl", weight: "font-bold", font: "font-[family-name:var(--font-display)]", sample: "Design that moves organisations forward." },
  { label: "H1", size: "text-3xl", weight: "font-semibold", font: "font-[family-name:var(--font-display)]", sample: "Working on something worth building?" },
  { label: "H2", size: "text-xl", weight: "font-medium", font: "font-[family-name:var(--font-display)]", sample: "Innovation & Product Strategy" },
  { label: "Body L", size: "text-lg", weight: "font-normal", font: "font-[family-name:var(--font-body)]", sample: "Twenty years working at the intersection of design, strategy and technology." },
  { label: "Body", size: "text-sm", weight: "font-normal", font: "font-[family-name:var(--font-body)]", sample: "Research-led, prototype-driven interface design. From first principles to high-fidelity." },
  { label: "Label", size: "text-xs", weight: "font-medium", font: "font-[family-name:var(--font-body)]", sample: "WHAT I DO — SELECTED WORK — GET IN TOUCH" },
];

const prototypes = [
  {
    title: "v2 — Font + Colour Direction",
    description: "Plus Jakarta Sans + Manrope, full Framer palette, before/after toggle.",
    href: "http://localhost:3006/createby-prototype.html",
    date: "Apr 2026",
    status: "In review",
  },
];

type Demo = { class: string; name: string; desc: string; demo: React.ReactNode };

const FadeDemo = () => (
  <div className="dh-fade text-sm font-medium text-stone-900 dark:text-stone-100">
    Hello there →
  </div>
);

const LineDemo = () => (
  <div className="w-full max-w-[140px]">
    <div className="dh-line h-px bg-stone-900 dark:bg-stone-100" />
  </div>
);

const StaggerDemo = () => (
  <div className="flex items-center gap-2">
    {[0, 1, 2, 3].map((i) => (
      <span
        key={i}
        className="dh-stagger-item h-2 w-2 rounded-full bg-stone-900 dark:bg-stone-100"
        style={{ animationDelay: `${i * 90}ms` }}
      />
    ))}
  </div>
);

const SolidDemo = () => (
  <div className="w-full max-w-[160px] rounded-sm overflow-hidden border border-stone-200/60 dark:border-stone-800/60">
    <div className="dh-solid-bar h-7 px-2 flex items-center justify-between">
      <span className="text-[9px] font-medium text-stone-700 dark:text-stone-200">create by™</span>
      <span className="text-[9px] text-stone-500 dark:text-stone-400">about</span>
    </div>
    <div className="h-7 bg-stone-100/50 dark:bg-stone-900/40" />
  </div>
);

const HeroDemo = () => (
  <p className="dh-hero text-base font-medium text-stone-900 dark:text-stone-100 cursor-default select-none">
    design that{" "}
    <span className="dh-hero-accent transition-all duration-[240ms] ease-out">
      moves
    </span>{" "}
    forward
  </p>
);

const animations: Demo[] = [
  {
    class: "A",
    name: "Fade + drift",
    desc: "Content fades up 18px on scroll enter. 0.55s cubic-bezier.",
    demo: <FadeDemo />,
  },
  {
    class: "B",
    name: "Line draw",
    desc: "Dividers scale from 0 → 1 left-to-right as they enter. 0.7s cubic-bezier.",
    demo: <LineDemo />,
  },
  {
    class: "C",
    name: "Stagger",
    desc: "Grid/list children enter with 90ms delay between each item.",
    demo: <StaggerDemo />,
  },
  {
    class: "D",
    name: "Nav solidify",
    desc: "Nav backdrop opacifies as user scrolls past 24px.",
    demo: <SolidDemo />,
  },
  {
    class: "E",
    name: "Hero interaction",
    desc: "Accent word shifts to italic serif on hover. Weight + colour transition, 240ms ease-out.",
    demo: <HeroDemo />,
  },
];

export default function DesignHub() {
  return (
    <div className="flex flex-col min-h-screen">
      <nav className="fixed top-0 inset-x-0 z-50 px-8 py-6 flex items-center justify-between border-b border-stone-200/60 bg-[#fafaf9]/70 backdrop-blur-md dark:border-stone-800/60 dark:bg-[#0f0f0e]/70">
        <Link href="/" className="flex items-center gap-2.5 text-sm font-medium tracking-tight text-stone-900 dark:text-stone-100">
          <img src="/media/favicon-light.png" alt="" aria-hidden="true" className="h-5 w-auto dark:hidden" />
          <img src="/media/favicon-dark.png" alt="" aria-hidden="true" className="h-5 w-auto hidden dark:block" />
          create by™
        </Link>
        <div className="flex items-center gap-6 text-sm text-stone-500 dark:text-stone-400">
          <Link href="/about" className="hover:text-stone-900 transition-colors dark:hover:text-stone-100">About</Link>
          <a href="mailto:hello@createby.no" className="hover:text-stone-900 transition-colors dark:hover:text-stone-100">Contact</a>
        </div>
      </nav>

      <main className="flex-1 pt-24 px-8 pb-24 max-w-5xl">

        {/* Header */}
        <div className="mb-16 border-b border-stone-200 dark:border-stone-800 pb-10">
          <p className="text-xs uppercase tracking-widest text-stone-400 mb-3 dark:text-stone-600">Internal</p>
          <h1 className="text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-100 mb-3">Design Hub</h1>
          <p className="text-stone-500 dark:text-stone-400 text-base max-w-xl">
            Design system, prototypes and visual references for create by™.
          </p>
        </div>

        {/* Brand Assets */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-stone-400 dark:text-stone-600 mb-6">Brand Assets</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <div className="h-20 bg-white border border-stone-200 dark:border-stone-800 flex items-center justify-center mb-2 rounded-sm">
                <img src="/media/favicon-light.png" alt="Favicon light" className="h-8 w-auto" />
              </div>
              <p className="text-xs font-medium text-stone-600 dark:text-stone-400">Favicon — Light</p>
              <p className="text-xs text-stone-400 font-mono">64 × 64</p>
            </div>
            <div>
              <div className="h-20 bg-stone-900 border border-stone-800 flex items-center justify-center mb-2 rounded-sm">
                <img src="/media/favicon-dark.png" alt="Favicon dark" className="h-8 w-auto" />
              </div>
              <p className="text-xs font-medium text-stone-600 dark:text-stone-400">Favicon — Dark</p>
              <p className="text-xs text-stone-400 font-mono">64 × 64</p>
            </div>
            <div>
              <div className="h-20 bg-white border border-stone-200 dark:border-stone-800 flex items-center justify-center mb-2 rounded-sm px-4">
                <img src="/media/logo-wordmark.png" alt="Logo wordmark" className="h-6 w-auto" />
              </div>
              <p className="text-xs font-medium text-stone-600 dark:text-stone-400">Wordmark</p>
              <p className="text-xs text-stone-400 font-mono">109 × 20</p>
            </div>
          </div>
        </section>

        {/* Colors */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-stone-400 dark:text-stone-600 mb-6">Colours</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {colors.map((c) => (
              <div key={c.token}>
                <div
                  className="h-14 w-full rounded-sm mb-2 border border-stone-200/60 dark:border-stone-800/60"
                  style={{ background: c.value }}
                />
                <p className="text-xs font-medium text-stone-700 dark:text-stone-300">{c.name}</p>
                <p className="text-xs text-stone-400 font-mono dark:text-stone-600">{c.value}</p>
                {c.dark && <p className="text-xs text-stone-400 font-mono dark:text-stone-600">{c.dark} dark</p>}
              </div>
            ))}
          </div>
        </section>

        {/* Typography */}
        <section className="mb-16 border-t border-stone-200 dark:border-stone-800 pt-12">
          <h2 className="text-xs uppercase tracking-widest text-stone-400 dark:text-stone-600 mb-8">Typography</h2>
          <div className="space-y-8">
            {typeScale.map((t) => (
              <div key={t.label} className="flex items-baseline gap-6 border-b border-stone-100 dark:border-stone-900 pb-6">
                <span className="text-xs text-stone-400 dark:text-stone-600 w-14 shrink-0 font-mono">{t.label}</span>
                <p className={`${t.size} ${t.weight} ${t.font} text-stone-900 dark:text-stone-100 leading-tight`}>
                  {t.sample}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex gap-8 text-sm text-stone-500 dark:text-stone-400">
            <span><strong className="text-stone-700 dark:text-stone-300">Display / Headings:</strong> Plus Jakarta Sans</span>
            <span><strong className="text-stone-700 dark:text-stone-300">Body / UI:</strong> Manrope</span>
          </div>
        </section>

        {/* Animations */}
        <section className="mb-16 border-t border-stone-200 dark:border-stone-800 pt-12">
          <h2 className="text-xs uppercase tracking-widest text-stone-400 dark:text-stone-600 mb-6">Animations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-stone-200/60 dark:bg-stone-800/60">
            {animations.map((a) => (
              <div key={a.name} className="bg-white/40 dark:bg-transparent p-6 flex flex-col">
                <div className="h-20 flex items-center justify-start mb-5 px-4 border border-dashed border-stone-200 dark:border-stone-800 rounded-sm bg-stone-50/60 dark:bg-stone-900/30">
                  {a.demo}
                </div>
                <span className="text-xs font-mono font-semibold text-stone-400 dark:text-stone-600 mb-2 block">{a.class}</span>
                <p className="text-sm font-medium text-stone-900 dark:text-stone-100 mb-1">{a.name}</p>
                <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Prototypes */}
        <section className="border-t border-stone-200 dark:border-stone-800 pt-12">
          <h2 className="text-xs uppercase tracking-widest text-stone-400 dark:text-stone-600 mb-6">Prototypes</h2>
          <div className="divide-y divide-stone-200 dark:divide-stone-800">
            {prototypes.map((p) => (
              <div key={p.title} className="py-6 flex items-start justify-between gap-4">
                <div>
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-medium text-stone-900 dark:text-stone-100 hover:underline underline-offset-4"
                  >
                    {p.title}
                  </a>
                  <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">{p.description}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs text-stone-400 dark:text-stone-600 block">{p.date}</span>
                  <span className="text-xs font-medium text-stone-500 dark:text-stone-400 mt-1 block">{p.status}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      <footer className="px-8 pt-8 pb-20 border-t border-stone-200 dark:border-stone-800">
        <div className="flex items-center justify-between text-xs text-stone-400 dark:text-stone-600">
          <span><strong className="text-stone-600 dark:text-stone-400">create by™</strong> — Design Hub</span>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-stone-700 transition-colors dark:hover:text-stone-300">← Back to site</Link>
            <span>© {new Date().getFullYear()}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
