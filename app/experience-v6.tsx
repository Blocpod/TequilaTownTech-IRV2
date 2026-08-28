'use client';

import { useEffect } from 'react';

const questions = [
  'What requires attention today?',
  'Where is qualified demand accelerating?',
  'Which guest signals should become action?',
  'What should the operation do next?',
];

export default function ExperienceV6() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('js', 'has-motion');
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
    const reveals = [...document.querySelectorAll<HTMLElement>('[data-reveal]')];
    const sections = [...document.querySelectorAll<HTMLElement>('[data-scene]')];
    const railItems = [...document.querySelectorAll<HTMLAnchorElement>('.chapter-rail a')];
    let questionIndex = 0;
    let questionTimer = 0;

    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: .14, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(element => revealObserver.observe(element));

    const update = () => {
      const page = Math.max(1, document.documentElement.scrollHeight - innerHeight);
      root.style.setProperty('--page-progress', String(Math.min(1, scrollY / page)));
      let active = sections[0]?.id ?? '';
      sections.forEach(section => {
        if (section.getBoundingClientRect().top < innerHeight * .52) active = section.id;
      });
      railItems.forEach(item => item.classList.toggle('is-active', item.hash === `#${active}`));
      const shift = document.querySelector<HTMLElement>('.shift');
      if (shift) {
        const rect = shift.getBoundingClientRect();
        const shiftProgress = Math.max(0, Math.min(.999, -rect.top / Math.max(1, rect.height - innerHeight)));
        shift.dataset.step = String(Math.floor(shiftProgress * 3));
      }
    };

    const cycleQuestion = () => {
      const target = document.querySelector<HTMLElement>('[data-question]');
      if (!target) return;
      questionIndex = (questionIndex + 1) % questions.length;
      target.animate([{ opacity: .15, transform: 'translateY(8px)' }, { opacity: 1, transform: 'none' }], { duration: 480, easing: 'cubic-bezier(.22,1,.36,1)' });
      target.textContent = questions[questionIndex];
    };
    if (!reduced) questionTimer = window.setInterval(cycleQuestion, 3600);

    const magnets = fine ? [...document.querySelectorAll<HTMLElement>('.mag')] : [];
    const magnetMove = (event: Event) => {
      const pointerEvent = event as PointerEvent;
      const target = pointerEvent.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      target.style.transform = `translate(${(pointerEvent.clientX - rect.left - rect.width / 2) * .12}px, ${(pointerEvent.clientY - rect.top - rect.height / 2) * .12}px)`;
    };
    const magnetLeave = (event: Event) => { (event.currentTarget as HTMLElement).style.transform = ''; };
    magnets.forEach(item => { item.addEventListener('pointermove', magnetMove); item.addEventListener('pointerleave', magnetLeave); });

    addEventListener('scroll', update, { passive: true });
    addEventListener('resize', update);
    update();
    requestAnimationFrame(() => root.classList.add('intro-complete'));

    return () => {
      revealObserver.disconnect();
      clearInterval(questionTimer);
      removeEventListener('scroll', update);
      removeEventListener('resize', update);
      magnets.forEach(item => { item.removeEventListener('pointermove', magnetMove); item.removeEventListener('pointerleave', magnetLeave); });
      root.classList.remove('js', 'has-motion', 'intro-complete');
    };
  }, []);

  return null;
}
