'use client';
import { useEffect } from 'react';

export default function ScrollAnimations() {
  useEffect(() => {
    // On client navigation Next.js can preserve scroll position. Anything
    // already at-or-above the viewport on mount must be revealed immediately
    // (no fade), otherwise content scrolled past stays invisible.
    const revealIfAboveOrInView = (el: Element) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.95) {
        el.classList.add('in-view');
        return true;
      }
      return false;
    };

    // Safety fallback: never let content stay blank.
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
    document.querySelectorAll('[data-animate], [data-animate-left]').forEach((el) => {
      if (revealIfAboveOrInView(el)) return;
      observer.observe(el);
    });

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
    document.querySelectorAll('[data-animate-line]').forEach((el) => {
      if (revealIfAboveOrInView(el)) return;
      lineObserver.observe(el);
    });

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
