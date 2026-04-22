'use client';
import { useEffect } from 'react';

export default function ScrollAnimations() {
  useEffect(() => {
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

    document.querySelectorAll('[data-animate]').forEach((el) => observer.observe(el));

    // Nav solidification on scroll
    const nav = document.querySelector('nav');
    const onScroll = () => {
      if (nav) nav.classList.toggle('nav-solid', window.scrollY > 24);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return null;
}
