'use client';

import { useEffect } from 'react';

export default function ExperienceController() {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduceMotion) document.body.classList.add('has-motion');
    const reveals = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('is-visible');
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach((node) => observer.observe(node));

    const hero = document.querySelector<HTMLElement>('.hero');
    const menu = document.querySelector<HTMLDetailsElement>('.mobile-menu');
    const menuLinks = Array.from(menu?.querySelectorAll<HTMLAnchorElement>('a') ?? []);
    const closeMenu = () => menu?.removeAttribute('open');
    const onPointer = (event: PointerEvent) => {
      if (!hero || event.pointerType === 'touch') return;
      hero.style.setProperty('--mx', `${((event.clientX / window.innerWidth) - 0.5) * 12}px`);
      hero.style.setProperty('--my', `${((event.clientY / window.innerHeight) - 0.5) * 12}px`);
    };

    const flywheel = document.querySelector<HTMLElement>('.flywheel');
    let ticking = false;
    const updateScroll = () => {
      document.body.toggleAttribute('data-scrolled', window.scrollY > 32);
      if (flywheel) {
        const rect = flywheel.getBoundingClientRect();
        const distance = Math.max(1, flywheel.offsetHeight - window.innerHeight);
        const progress = Math.max(0, Math.min(1, -rect.top / distance));
        const step = Math.min(3, Math.floor(progress * 4));
        flywheel.style.setProperty('--fly-progress', progress.toFixed(3));
        flywheel.dataset.step = String(step);
      }
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) { ticking = true; requestAnimationFrame(updateScroll); }
    };

    window.addEventListener('pointermove', onPointer, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    menuLinks.forEach((link) => link.addEventListener('click', closeMenu));
    updateScroll();
    return () => {
      observer.disconnect();
      document.body.classList.remove('has-motion');
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('scroll', onScroll);
      menuLinks.forEach((link) => link.removeEventListener('click', closeMenu));
    };
  }, []);
  return null;
}
