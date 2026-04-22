'use client';
import { useEffect } from 'react';

export default function ScrollAnimations() {
  useEffect(() => {
    // Safety fallback: if JS runs but observer misbehaves (reduced-motion,
    // hydration race, etc.), reveal all animated content after 1.5s so the
    // page can never be left blank.
    const fallback = window.setTimeout(() => {
      document
        .querySelectorAll('[data-animate]:not(.in-view), [data-animate-left]:not(.in-view), [data-animate-line]:not(.in-view)')
        .forEach((el) => el.classList.add('in-view'));
    }, 1500);

    // A + C: Fade/drift + stagger
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const stagger = el.dataset.stagger;
          if (stagger !== undefined) {
            el.style.transitionDelay = `${parseInt(stagger) * 90}ms`;
          }
          el.classList.add('in-view');
          observer.unobserve(el);
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -32px 0px' }
    );
    document.querySelectorAll('[data-animate], [data-animate-left]').forEach((el) => observer.observe(el));

    // B: Line draw
    const lineObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('in-view');
          lineObserver.unobserve(entry.target);
        });
      },
      { threshold: 0, rootMargin: '0px 0px -10px 0px' }
    );
    document.querySelectorAll('[data-animate-line]').forEach((el) => lineObserver.observe(el));

    // D: Nav solidification
    const nav = document.querySelector('nav');
    const onScroll = () => {
      if (nav) nav.classList.toggle('nav-solid', window.scrollY > 24);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.clearTimeout(fallback);
      observer.disconnect();
      lineObserver.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return null;
}
