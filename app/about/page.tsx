import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About | create by™",
  description:
    "Lucas Cueni — designer, product and service developer with 20+ years of experience and a strategic approach to innovation.",
};

const Nav = () => (
  <nav className="px-8 py-6 flex items-center justify-between border-b border-stone-200">
    <Link href="/" className="text-sm font-medium tracking-tight">
      create by™
    </Link>
    <div className="flex items-center gap-6 text-sm text-stone-500">
      <Link href="/about" className="text-stone-900 font-medium">
        About
      </Link>
      <a
        href="mailto:hello@createby.no"
        className="hover:text-stone-900 transition-colors"
      >
        Contact
      </a>
    </div>
  </nav>
);

const Footer = () => (
  <footer className="px-8 py-8 border-t border-stone-200">
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs text-stone-400">
      <div>
        <strong className="text-stone-600">create by™</strong>
        <span> — Cueni AS, 932292793</span>
      </div>
      <div className="flex items-center gap-4">
        <Link href="/about" className="hover:text-stone-700 transition-colors">
          About
        </Link>
        <Link
          href="/terms-privacy"
          className="hover:text-stone-700 transition-colors"
        >
          Privacy &amp; Terms
        </Link>
        <a
          href="https://www.linkedin.com/in/lucascueni"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-stone-700 transition-colors"
        >
          LinkedIn
        </a>
        <a
          href="https://twitter.com/lucascueni"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-stone-700 transition-colors"
        >
          Twitter
        </a>
        <span>© {new Date().getFullYear()}</span>
      </div>
    </div>
  </footer>
);

export default function About() {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />

      <main className="flex-1 px-8 py-20 max-w-3xl">
        <p className="text-xs uppercase tracking-widest text-stone-400 mb-12">
          About
        </p>

        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-stone-900 mb-10 leading-tight">
          My name is Lucas Cueni.
        </h1>

        <div className="space-y-6 text-stone-500 text-base leading-relaxed">
          <p>
            I am a designer, product developer and strategist with over 20 years
            of experience across media, telco, public sector and early-stage
            products.
          </p>

          <p>
            Currently I work as Product and Innovation Director at{" "}
            <strong className="text-stone-700">Manyone</strong>, where I lead
            product and innovation work embedded in cross-functional teams.
            Alongside that, I run{" "}
            <strong className="text-stone-700">create by™</strong> for select
            consulting engagements where I can add real value.
          </p>

          <p>
            I am also a solo builder. I design, prototype and ship digital
            products myself — using modern AI-assisted development to move fast
            without a large team behind me. Building new ventures from scratch,
            one iteration at a time.
          </p>

          <p>
            Ten years building from the inside — in-house product and design
            roles at some of Norway&apos;s largest organisations, including{" "}
            <strong className="text-stone-700">Schibsted</strong> and{" "}
            <strong className="text-stone-700">Telenor</strong>. Ten years
            working across industries as a consultant — media, telco, public
            sector, retail, and early-stage ventures.
          </p>

          <p>Co-founder of the IxDA Oslo chapter.</p>

          <p>
            I firmly believe the best outcomes come from embedded collaboration,
            not from external advice. That is what{" "}
            <strong className="text-stone-700">create by™</strong> is built
            around.
          </p>
        </div>

        <div className="mt-16 pt-10 border-t border-stone-200">
          <p className="text-stone-500 mb-6">
            Have a product challenge worth solving? Or a venture worth building?
            Let&apos;s grab a cup of coffee and explore it.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="mailto:hello@createby.no"
              className="inline-block bg-stone-900 text-white text-sm font-medium px-6 py-3 hover:bg-stone-700 transition-colors"
            >
              hello@createby.no
            </a>
            <a
              href="https://www.linkedin.com/in/lucascueni"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-stone-400 hover:text-stone-700 transition-colors underline underline-offset-4"
            >
              LinkedIn
            </a>
            <a
              href="https://twitter.com/lucascueni"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-stone-400 hover:text-stone-700 transition-colors underline underline-offset-4"
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
