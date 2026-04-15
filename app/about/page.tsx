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
      <div className="flex flex-col gap-1">
        <span>
          <strong className="text-stone-600">create by™</strong> — Cueni AS,
          932292793
        </span>
        <span>Øvre Slottsgate 3, 0157 Oslo, Norway</span>
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
        <span>© 2025</span>
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
            I am a designer, product and service developer, with a strategic
            approach and business mindset.
          </p>

          <p>
            With over 20 years of experience, I drive innovation through design
            thinking and thrive best in cross-functional teams. My skills lie in
            leading and collaborating with teams from diverse backgrounds to
            deliver successful products and services.
          </p>

          <p>
            Experience includes innovation leadership roles at{" "}
            <strong className="text-stone-700">Schibsted</strong>, co-founder
            and designer at{" "}
            <strong className="text-stone-700">itch Oslo</strong>, and UX
            consulting for clients from various sectors and industries.
            Co-founder of the IxDA Oslo Chapter.
          </p>

          <p>
            I am building up <strong className="text-stone-700">create by™</strong>{" "}
            to use my skills as a designer to solve wicked problems and
            contribute to building a more sustainable and equitable society.
          </p>

          <p>
            I firmly believe that this journey is not and will never be a
            one-person endeavour. My effort goes into creating sustainable
            partnerships, fostering great alliances, and building an extensive
            network to collaborate with.
          </p>
        </div>

        <div className="mt-16 pt-10 border-t border-stone-200">
          <p className="text-stone-500 mb-6">
            Have a business, idea, product or service you&apos;re eager to
            develop or implement? Let&apos;s grab a cup of coffee to explore a
            potential collaboration.
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
