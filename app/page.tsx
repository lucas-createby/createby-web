import Link from "next/link";
import HeroCanvas from "@/components/HeroCanvas";
import LogoTicker from "@/components/LogoTicker";

const services = [
  {
    number: "01",
    title: "Innovation & Product Strategy",
    description:
      "From unclear opportunity to clear direction. Design thinking and business strategy combined — to define what to build, why it matters, and how to test that assumption before committing to it.",
  },
  {
    number: "02",
    title: "Service & Business Design",
    description:
      "Research, journey mapping, service blueprinting and business model alignment — done with the people who will use and run the service, not just for them.",
  },
  {
    number: "03",
    title: "User Experience & Interaction Design",
    description:
      "Research-led, prototype-driven interface design. From first principles to high-fidelity — grounded in what people actually do, not just what they say they want.",
  },
  {
    number: "04",
    title: "Product & Design Leadership",
    description:
      "Embedded leadership for product and design teams. OKRs, design systems, cross-functional ways of working — built to outlast the engagement, not just the documentation.",
  },
  {
    number: "05",
    title: "Organisational Design & Transformation",
    description:
      "Helping organisations shift how they work — introducing product thinking, agile methods, and design-led change into functions that have never operated that way. HR, operations, strategy.",
    wide: true,
  },
];

const work = [
  {
    client: "Posten Bring",
    title: "HR Transformation",
    description:
      "Service design and agile methodology applied to how a major Norwegian organisation manages its people processes. A change programme, not just a deliverable.",
    year: "2025",
    context: "Manyone",
  },
  {
    client: "Domino's Norway",
    title: "Digital Commerce",
    description:
      "Redesigning the ordering experience to reduce friction and increase conversion. From discovery to high-fidelity testing to developer handoff.",
    year: "2025",
    context: "Manyone",
  },
  {
    client: "Faerch",
    title: "Digital Transformation",
    description:
      "Unified digital platform for a pan-European packaging leader merging multiple brands. User research, content strategy, Figma to Framer.",
    year: "2024",
    context: "create by™",
  },
  {
    client: "Schibsted NextGen Publishing",
    title: "Team Scaling",
    description:
      "Built and led a product and design department from 4 to 50+ people across 5 product teams in under 2 years. Hypothesis-driven development from day one.",
    year: "2016–2020",
    context: "Schibsted",
  },
];

const faqs = [
  {
    question: "What phases do you usually work in?",
    answer:
      "I work across the full innovation lifecycle — from early discovery through concept development, prototyping and into delivery. I also step into mature teams as an embedded lead. The engagement can start anywhere. I adapt to where you are, not the other way around.",
  },
  {
    question: "How do you approach product and service development?",
    answer:
      "With a human-centred, iterative approach grounded in real user research. I balance desirability, viability, and feasibility — and I keep the team aligned around clear outcomes throughout.",
  },
  {
    question: "How do you develop innovation strategies?",
    answer:
      "By combining design thinking with business strategy. I facilitate workshops to surface insights, define opportunity spaces, and translate them into actionable roadmaps your team can execute on.",
  },
  {
    question: "How do you foster collaboration?",
    answer:
      "By building trust, creating shared language, and designing processes that invite everyone into the work. Cross-functional teams consistently produce better outcomes — I create the conditions for that to happen.",
  },
  {
    question: "Can I engage you for both large-scale and smaller projects?",
    answer:
      "Yes. Whether it's a week-long sprint or a multi-month engagement, I tailor the scope and format to your needs. Smaller projects are often a good way to get started.",
  },
  {
    question: "What role does research play in your design process?",
    answer:
      "A central one. Good research reduces risk and surfaces the real problems worth solving. I use a mix of qualitative and quantitative methods, and I involve stakeholders throughout.",
  },
  {
    question: "Do you work embedded in product teams?",
    answer:
      "Yes — it is how I work best, and what I do every day in my role at Manyone. For engagements through create by™, embedded collaboration is always the preference over advisory-only work. I am not a drop-in consultant.",
  },
  {
    question: "Can we collaborate?",
    answer:
      "Possibly. My capacity through create by™ is limited — I run it alongside a full-time leadership role. I take on engagements where I can genuinely contribute, not just fill a slot. If you have a concrete challenge, get in touch.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Nav */}
      <nav className="fixed top-0 inset-x-0 z-50 px-8 py-6 flex items-center justify-between border-b border-stone-200/60 bg-[#fafaf9]/70 backdrop-blur-md">
        <Link href="/" className="text-sm font-medium tracking-tight">
          create by™
        </Link>
        <div className="flex items-center gap-6 text-sm text-stone-500">
          <Link href="/about" className="hover:text-stone-900 transition-colors">
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

      <main className="flex-1">
        {/* Hero */}
        <section className="relative min-h-svh flex items-center px-8 py-24 md:py-36">
          <HeroCanvas />
          <div className="relative z-10 max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-tight text-stone-900 mb-8">
              create innovation
              <br />
              by design
            </h1>
            <p className="text-lg md:text-xl text-stone-500 max-w-2xl leading-relaxed">
              Twenty years working at the intersection of design, strategy and
              technology. I help organisations figure out what to build, build
              the right thing, and make sure it actually gets used. Currently
              Product and Innovation Director at Manyone. Through create by™, I
              take on select engagements.
            </p>
          </div>
        </section>

        <div className="px-8">
          <div className="border-t border-stone-200" />
        </div>

        {/* Services */}
        <section className="px-8 py-20">
          <p className="text-xs uppercase tracking-widest text-stone-400 mb-12">
            What I do
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-stone-200/60">
            {services.map((s) => (
              <div
                key={s.number}
                className={`bg-white/40 backdrop-blur-sm p-8 md:p-10${s.wide ? " md:col-span-2" : ""}`}
              >
                <span className="text-xs text-stone-400 mb-4 block">
                  {s.number}
                </span>
                <h2 className="text-lg font-medium text-stone-900 mb-3 leading-snug">
                  {s.title}
                </h2>
                <p className={`text-sm text-stone-500 leading-relaxed${s.wide ? " max-w-2xl" : ""}`}>
                  {s.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="px-8">
          <div className="border-t border-stone-200" />
        </div>

        {/* Selected Work */}
        <section className="px-8 py-20">
          <p className="text-xs uppercase tracking-widest text-stone-400 mb-12">
            Selected work
          </p>
          <div className="divide-y divide-stone-200">
            {work.map((w) => (
              <div key={w.client} className="py-8 md:py-10">
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-3">
                  <h2 className="text-base font-medium text-stone-900">
                    {w.client}{" "}
                    <span className="text-stone-400 font-normal">— {w.title}</span>
                  </h2>
                  <span className="text-xs text-stone-400 shrink-0">
                    {w.year} — {w.context}
                  </span>
                </div>
                <p className="text-sm text-stone-500 leading-relaxed max-w-2xl">
                  {w.description}
                </p>
              </div>
            ))}
          </div>
          <a
            href="https://www.linkedin.com/in/lucascueni"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-10 text-sm text-stone-400 hover:text-stone-700 transition-colors underline underline-offset-4"
          >
            More on LinkedIn
          </a>
        </section>

        <div className="px-8">
          <div className="border-t border-stone-200" />
        </div>

        {/* Logo Ticker */}
        <LogoTicker />

        <div className="px-8">
          <div className="border-t border-stone-200" />
        </div>

        {/* Currently */}
        <section className="px-8 py-20 max-w-3xl">
          <p className="text-xs uppercase tracking-widest text-stone-400 mb-10">
            Currently
          </p>
          <div className="space-y-6 text-stone-500 text-base leading-relaxed">
            <p>
              Product and Innovation Director at{" "}
              <strong className="text-stone-700">Manyone</strong> — leading
              product and innovation work embedded in client teams across Norway
              and Europe.
            </p>
            <p>
              I also build things independently — designing, prototyping and
              shipping digital products from the ground up. AI tools help me
              explore and validate ideas faster, but the thinking, the craft
              and the collaboration with others is where the real work happens.
            </p>
            <p>
              Select consulting engagements available through{" "}
              <strong className="text-stone-700">create by™</strong>.
            </p>
          </div>
        </section>

        <div className="px-8">
          <div className="border-t border-stone-200" />
        </div>

        {/* FAQ */}
        <section className="px-8 py-20 max-w-3xl">
          <p className="text-xs uppercase tracking-widest text-stone-400 mb-12">
            Frequently asked
          </p>
          <div className="divide-y divide-stone-200">
            {faqs.map((faq) => (
              <details key={faq.question} className="group py-6">
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <span className="text-base font-medium text-stone-900 pr-8">
                    {faq.question}
                  </span>
                  <span className="text-stone-400 text-xl leading-none shrink-0 group-open:rotate-45 transition-transform duration-200">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-sm text-stone-500 leading-relaxed">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        <div className="px-8">
          <div className="border-t border-stone-200" />
        </div>

        {/* CTA */}
        <section className="px-8 py-24 md:py-32">
          <p className="text-xs uppercase tracking-widest text-stone-400 mb-6">
            Get in touch
          </p>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-stone-900 mb-8 max-w-2xl leading-tight">
            Working on something worth building?
          </h2>
          <p className="text-stone-500 mb-10 text-lg">
            Drop me a line and let&apos;s have a coffee.
          </p>
          <a
            href="mailto:hello@createby.no"
            className="inline-block bg-stone-900 text-white text-sm font-medium px-6 py-3 hover:bg-stone-700 transition-colors"
          >
            Get in touch
          </a>
        </section>
      </main>

      {/* Footer */}
      <footer className="px-8 py-8 border-t border-stone-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs text-stone-400">
          <div>
            <strong className="text-stone-600">create by™</strong>
            <span> — Cueni AS, 932292793</span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/about"
              className="hover:text-stone-700 transition-colors"
            >
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
              href="https://twitter.com/lueni"
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
    </div>
  );
}
