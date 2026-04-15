import Link from "next/link";

const services = [
  {
    number: "01",
    title: "Innovation & Product Strategy",
    description:
      "Develop tailored strategies that turn insights into clear, actionable plans for sustainable growth.",
  },
  {
    number: "02",
    title: "Service & Business Design",
    description:
      "Co-create services and business models that align with your goals and deliver seamless customer experiences.",
  },
  {
    number: "03",
    title: "User Experience & Interaction Design",
    description:
      "Design user-focused, research-driven interfaces that enhance usability and meet business objectives.",
  },
  {
    number: "04",
    title: "Product & Design Leadership",
    description:
      "Guide teams in creating consistent, high-quality products with efficient processes and clear design systems.",
  },
];

const faqs = [
  {
    question: "What phases do you usually work in?",
    answer:
      "I work across the full innovation lifecycle — from early discovery and framing through concept development, prototyping, and into delivery. The engagement can start at any phase, and I adapt to where you are.",
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
      "By building trust, creating shared language, and designing processes that invite everyone into the work. Cross-functional teams produce the best outcomes — I create the conditions for that.",
  },
  {
    question: "Can I engage you for both large-scale and smaller projects?",
    answer:
      "Yes. Whether it's a week-long sprint or a multi-month engagement, I tailor the scope and format to your needs. Smaller projects are often a great way to get started.",
  },
  {
    question: "What role does research play in your design process?",
    answer:
      "A central one. Good research reduces risk and surfaces the real problems worth solving. I use a mix of qualitative and quantitative methods, and I involve stakeholders throughout.",
  },
  {
    question: "Do you work embedded in product teams?",
    answer:
      "Yes — embedded collaboration is often where the most impact happens. I can join as a design lead, strategic partner, or hands-on UX practitioner depending on what the team needs.",
  },
  {
    question: "Can we collaborate?",
    answer:
      "Most likely, yes. I'm always open to new partnerships, whether you're a startup, an established company, or another designer or consultant. Get in touch and let's explore it.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Nav */}
      <nav className="px-8 py-6 flex items-center justify-between border-b border-stone-200">
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
        <section className="px-8 py-24 md:py-36 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-tight text-stone-900 mb-8">
            create innovation
            <br />
            by design
          </h1>
          <p className="text-lg md:text-xl text-stone-500 max-w-2xl leading-relaxed">
            At create by™, I bring over two decades of experience in design,
            strategy, and execution — transforming ideas into actionable,
            high-impact digital products and services.
          </p>
        </section>

        <div className="px-8">
          <div className="border-t border-stone-200" />
        </div>

        {/* Services */}
        <section className="px-8 py-20">
          <p className="text-xs uppercase tracking-widest text-stone-400 mb-12">
            What I do
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-stone-200">
            {services.map((s) => (
              <div key={s.number} className="bg-[#fafaf9] p-8 md:p-10">
                <span className="text-xs text-stone-400 mb-4 block">
                  {s.number}
                </span>
                <h2 className="text-lg font-medium text-stone-900 mb-3 leading-snug">
                  {s.title}
                </h2>
                <p className="text-sm text-stone-500 leading-relaxed">
                  {s.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="px-8">
          <div className="border-t border-stone-200" />
        </div>

        {/* Collaborations */}
        <section className="px-8 py-20">
          <p className="text-xs uppercase tracking-widest text-stone-400 mb-4">
            Professional collaborations over the years…
          </p>
          <Link
            href="/about"
            className="text-sm text-stone-500 hover:text-stone-900 transition-colors underline underline-offset-4"
          >
            Read more about my background
          </Link>
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
            Have a business, idea, product or service you&apos;re eager to
            develop or implement?
          </h2>
          <p className="text-stone-500 mb-10 text-lg">
            Let&apos;s grab a cup of coffee to explore a potential collaboration.
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
          <div className="flex flex-col gap-1">
            <span>
              <strong className="text-stone-600">create by™</strong> — Cueni
              AS, 932292793
            </span>
            <span>Øvre Slottsgate 3, 0157 Oslo, Norway</span>
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
    </div>
  );
}
