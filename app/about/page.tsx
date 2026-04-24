import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About | create by™",
  description:
    "Lucas Cueni — Product and Innovation Director at Manyone. Designer, strategist and solo builder with 20+ years across product, service design and organisational transformation.",
};

const Nav = () => (
  <nav className="fixed top-0 inset-x-0 z-50 px-8 py-6 flex items-center justify-between border-b border-stone-200/60 bg-[#fafaf9]/70 backdrop-blur-md dark:border-stone-800/60 dark:bg-[#0f0f0e]/70">
    <Link href="/" className="flex items-center gap-2.5 text-sm font-medium tracking-tight text-stone-900 dark:text-stone-100">
      <img src="/media/favicon-light.png" alt="" aria-hidden="true" className="h-5 w-auto dark:hidden" />
      <img src="/media/favicon-dark.png" alt="" aria-hidden="true" className="h-5 w-auto hidden dark:block" />
      create by™
    </Link>
    <div className="flex items-center gap-6 text-sm text-stone-500 dark:text-stone-400">
      <Link href="/about" className="text-stone-900 font-medium dark:text-stone-100">
        About
      </Link>
      <a
        href="mailto:hello@createby.no"
        className="hover:text-stone-900 transition-colors dark:hover:text-stone-100"
      >
        Contact
      </a>
    </div>
  </nav>
);

const Footer = () => (
  <footer className="px-8 pt-8 pb-20 border-t border-stone-200 dark:border-stone-800">
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs text-stone-400 dark:text-stone-600">
      <div>
        <strong className="text-stone-600 dark:text-stone-400">create by™</strong>
        <span> — Cueni AS, 932292793</span>
      </div>
      <div className="flex items-center gap-4">
        <Link href="/about" className="hover:text-stone-700 transition-colors dark:hover:text-stone-300">
          About
        </Link>
        <Link
          href="/terms-privacy"
          className="hover:text-stone-700 transition-colors dark:hover:text-stone-300"
        >
          Privacy &amp; Terms
        </Link>
        <a
          href="https://www.linkedin.com/in/lucascueni"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-stone-700 transition-colors dark:hover:text-stone-300"
        >
          LinkedIn
        </a>
        <a
          href="https://twitter.com/lueni"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-stone-700 transition-colors dark:hover:text-stone-300"
        >
          Twitter
        </a>
        <Link href="/design-hub" className="hover:text-stone-700 transition-colors dark:hover:text-stone-300">
          Design Hub
        </Link>
        <span>© {new Date().getFullYear()}</span>
      </div>
    </div>
  </footer>
);

export default function About() {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />

      <main className="flex-1 px-8 pt-32 pb-20 max-w-3xl">
        <p className="text-xs uppercase tracking-widest text-[var(--accent)] font-medium mb-12">
          About
        </p>

        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-stone-900 mb-10 leading-tight dark:text-stone-100">
          My name is{" "}
          <span className="font-display italic font-normal tracking-[-0.02em] text-[var(--accent)]">
            Lucas Cueni
          </span>
          .
        </h1>

        <div className="space-y-6 text-stone-500 text-base leading-relaxed dark:text-stone-400">
          <p>
            I am a designer, product developer and strategist. I work in the
            intersection of design, technology and organisational development.
          </p>

          <p>
            Currently Product and Innovation Director at{" "}
            <strong className="text-stone-700 dark:text-stone-300">Manyone</strong>, where I lead
            product and innovation work embedded in cross-functional client
            teams. Alongside that, I run{" "}
            <strong className="text-stone-700 dark:text-stone-300">create by™</strong> for select
            consulting engagements.
          </p>

          <p>
            My background is in design — a BA from{" "}
            <strong className="text-stone-700 dark:text-stone-300">Central Saint Martins</strong>, a
            Master in Interaction and Service Design from the{" "}
            <strong className="text-stone-700 dark:text-stone-300">
              Oslo School of Architecture and Design
            </strong>
            , and executive education in innovation at{" "}
            <strong className="text-stone-700 dark:text-stone-300">
              BI Norwegian Business School
            </strong>
            . That combination shapes how I work: I think in systems, design in
            iterations, and measure what matters.
          </p>

          <p>
            Ten years building from the inside — in-house product and design
            roles at{" "}
            <strong className="text-stone-700 dark:text-stone-300">Schibsted</strong> and{" "}
            <strong className="text-stone-700 dark:text-stone-300">Telenor</strong>, scaling a team
            from 4 to 50+ people, shipping products, running intrapreneurship
            programmes. Ten years working across industries as a consultant —
            media, telco, public sector, packaging, food service and early-stage
            ventures.
          </p>

          <p>
            I also build things independently. I design, prototype and ship
            digital products — using AI tools to explore and validate ideas
            faster, while working with others where it matters most.
          </p>

          <p>
            Co-founder of the{" "}
            <strong className="text-stone-700 dark:text-stone-300">IxDA Oslo chapter</strong>, which
            grew from 6 people over a beer to over 6 000 members.
          </p>

          <p>
            I believe the best outcomes come from embedded collaboration, not
            external advice. That is what{" "}
            <strong className="text-stone-700 dark:text-stone-300">create by™</strong> is built
            around.
          </p>
        </div>

        <div className="mt-16 pt-10 border-t border-stone-200 dark:border-stone-800">
          <p className="text-stone-500 mb-6 dark:text-stone-400">
            Working on something worth building? Drop me a line and let&apos;s
            have a coffee.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="mailto:hello@createby.no"
              className="inline-flex items-center gap-2 bg-[var(--accent)] text-white dark:text-stone-900 text-sm font-semibold px-6 py-3 hover:brightness-110 transition-[filter,transform] hover:-translate-y-px"
            >
              hello@createby.no
            </a>
            <a
              href="https://www.linkedin.com/in/lucascueni"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-stone-400 hover:text-stone-700 transition-colors underline underline-offset-4 dark:text-stone-600 dark:hover:text-stone-300"
            >
              LinkedIn
            </a>
            <a
              href="https://twitter.com/lueni"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-stone-400 hover:text-stone-700 transition-colors underline underline-offset-4 dark:text-stone-600 dark:hover:text-stone-300"
            >
              Twitter
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
