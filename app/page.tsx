import Link from "next/link";
import HeroCanvas from "@/components/HeroCanvas";

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
      "Yes — it is how I work best, and it is what I do every day in my role at Manyone. For consulting engagements through create by™, embedded collaboration is always the preference over advisory-only work.",
  },
  {
    question: "Can we collaborate?",
    answer:
      "Possibly. My consulting capacity through create by™ is limited — I run it alongside a full-time leadership role. That means I take on engagements where I can genuinely contribute, not just fill a slot. If you have a concrete challenge, let's talk.",
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
              I have spent 20 years designing products, building teams, and
              turning strategy into something that ships. Currently Product and
              Innovation Director at Manyone. Through create by™, I take on
              select engagements and build new digital ventures from scratch.
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
            Have a product challenge worth solving? Or a venture worth building?
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
    </div>
  );
}
