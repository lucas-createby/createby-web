const articles = [
  {
    tag: "Essay",
    year: "2026",
    title: "The concept does not prototype itself.",
    description:
      "On AI, adaptive storytelling, and the designer's irreducible role. Why the thinking, the craft and the collaboration are still where the real work happens — and how I use AI as a tool around that, not in place of it.",
    href: "https://medium.com/@lucas_879/the-concept-does-not-prototype-itself-751e9b0eaecf",
    read: "Read on Medium →",
  },
  {
    tag: "Perspective · NO",
    year: "2026",
    title: "HR i 2026: Det dyreste stedet å spare.",
    description:
      "Hvorfor HR er det området der norske organisasjoner taper mest når de kutter — og hva en design-ledet tilnærming til folk og prosesser ser ut som i praksis.",
    href: "https://medium.com/@lucas_879/hr-i-2026-det-dyreste-stedet-%C3%A5-spare-7e80ca139fa6",
    read: "Les på Medium →",
  },
];

export default function Writing() {
  return (
    <section className="px-8 py-20">
      <p className="text-xs uppercase tracking-widest text-[var(--accent)] font-medium mb-12">
        Writing
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-stone-200 dark:border-stone-800">
        {articles.map((a, i) => (
          <a
            key={a.href}
            href={a.href}
            target="_blank"
            rel="noopener noreferrer"
            data-animate
            data-stagger={i}
            className="flex flex-col gap-4 p-8 md:p-10 border-r border-b border-stone-200 dark:border-stone-800 hover:bg-stone-100/60 dark:hover:bg-stone-900/40 transition-colors"
          >
            <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-stone-500 dark:text-stone-400 font-medium">
              <span>{a.tag}</span>
              <span className="w-1 h-1 rounded-full bg-[var(--accent)]" />
              <span>{a.year}</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-normal tracking-tight text-stone-900 dark:text-stone-100 leading-[1.2]">
              {a.title}
            </h3>
            <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed">
              {a.description}
            </p>
            <span className="mt-auto pt-2 text-sm font-medium text-[var(--accent-2)] border-b border-[var(--accent-2)] self-start pb-0.5">
              {a.read}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
