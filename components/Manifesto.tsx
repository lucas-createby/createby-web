export default function Manifesto() {
  return (
    <section className="px-8 py-24 md:py-32 border-y border-stone-200 dark:border-stone-800">
      <div className="max-w-4xl mx-auto pl-8 md:pl-10 relative">
        <span
          aria-hidden="true"
          className="absolute left-0 top-3 bottom-3 w-[3px] bg-[var(--accent)]"
        />
        <blockquote
          data-animate
          className="font-display italic font-normal text-3xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight text-stone-900 dark:text-stone-100 max-w-[16ch]"
        >
          The concept does not prototype itself.
        </blockquote>
        <p data-animate className="mt-8 text-sm text-stone-500 dark:text-stone-400 max-w-xl">
          On AI, adaptive storytelling, and the designer&apos;s irreducible role —{" "}
          <a
            href="https://medium.com/@lucas_879/the-concept-does-not-prototype-itself-751e9b0eaecf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--accent-2)] border-b border-[var(--accent-2)] pb-0.5 hover:opacity-80 transition-opacity"
          >
            read on Medium →
          </a>
        </p>
      </div>
    </section>
  );
}
