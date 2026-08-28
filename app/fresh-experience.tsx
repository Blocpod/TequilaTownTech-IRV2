'use client';

import { useEffect } from 'react';

export default function FreshExperience(){
  useEffect(()=>{
    const root=document.documentElement;root.classList.add('js','has-motion');
    const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
    const cultureCompact=matchMedia('(max-width:1050px)');
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}}),{threshold:.12,rootMargin:'0px 0px -7%'});
    document.querySelectorAll('[data-reveal]').forEach(element=>observer.observe(element));
    const storySections=[...document.querySelectorAll<HTMLElement>('#radar,#app,#swarm,#control,#loop,#build,#end')];
    const navigationLinks=[...document.querySelectorAll<HTMLAnchorElement>('.topbar nav a')];
    const culture=document.querySelector<HTMLElement>('[data-culture]');
    const cultureObserver=culture?new IntersectionObserver(([entry])=>culture.classList.toggle('is-active',entry.isIntersecting),{rootMargin:'25% 0px'}):null;
    if(culture&&cultureObserver)cultureObserver.observe(culture);
    let lastActiveHref='';
    let lastCultureProgress=-1;
    let progressFrame=0;
    const update=()=>{cancelAnimationFrame(progressFrame);progressFrame=requestAnimationFrame(()=>{
      const page=Math.max(1,document.documentElement.scrollHeight-innerHeight);
      root.style.setProperty('--progress',String(Math.min(1,scrollY/page)));
      if(culture){
        const rect=culture.getBoundingClientRect();
        const travel=Math.max(1,rect.height-innerHeight);
        const cultureProgress=reduced ? .72 : cultureCompact.matches
          ? Math.min(1,Math.max(0,(innerHeight*.7-rect.top)/(rect.height+innerHeight*.35)))
          : Math.min(1,Math.max(0,-rect.top/travel));
        if(Math.abs(cultureProgress-lastCultureProgress)>.001){
          lastCultureProgress=cultureProgress;
          culture.style.setProperty('--culture-car-x',`${(cultureProgress-.5)*-8}vw`);
          culture.style.setProperty('--culture-copy-y',`${(cultureProgress-.5)*-7}vh`);
          culture.style.setProperty('--culture-mariachi-y',`${(1-cultureProgress)*18}vh`);
          culture.style.setProperty('--culture-bartender-y',`${(1-cultureProgress)*13}vh`);
          culture.style.setProperty('--culture-dancer-y',`${(1-cultureProgress)*8}vh`);
          culture.style.setProperty('--culture-reveal',String(Math.min(1,Math.max(0,(cultureProgress-.08)*3.25))));
        }
      }
      const guide=innerHeight*.34;
      const active=storySections.find(section=>{const rect=section.getBoundingClientRect();return rect.top<=guide&&rect.bottom>=guide});
      const activeHref=active?(['radar','app','swarm','control'].includes(active.id)?'#radar':['build','end'].includes(active.id)?'#build':'#loop'):'';
      if(activeHref!==lastActiveHref){lastActiveHref=activeHref;navigationLinks.forEach(link=>{const isActive=link.getAttribute('href')===activeHref;link.toggleAttribute('data-active',isActive);if(isActive)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current')})}
    })};
    const magnets=fine?[...document.querySelectorAll<HTMLElement>('.mag')]:[];
    const menu=document.querySelector<HTMLDetailsElement>('.menu');
    const menuLinks=menu?[...menu.querySelectorAll<HTMLAnchorElement>('a')]:[];
    const move=(event:Event)=>{const e=event as PointerEvent,target=e.currentTarget as HTMLElement,r=target.getBoundingClientRect();target.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.1}px,${(e.clientY-r.top-r.height/2)*.1}px)`};
    const leave=(event:Event)=>{(event.currentTarget as HTMLElement).style.transform=''};
    const closeMenu=()=>{if(menu)menu.open=false};
    magnets.forEach(item=>{item.addEventListener('pointermove',move);item.addEventListener('pointerleave',leave)});
    menuLinks.forEach(link=>link.addEventListener('click',closeMenu));
    addEventListener('scroll',update,{passive:true});addEventListener('resize',update);cultureCompact.addEventListener('change',update);update();
    if(!reduced)requestAnimationFrame(()=>root.classList.add('ready'));else root.classList.add('ready');
    return()=>{observer.disconnect();cultureObserver?.disconnect();cancelAnimationFrame(progressFrame);removeEventListener('scroll',update);removeEventListener('resize',update);cultureCompact.removeEventListener('change',update);magnets.forEach(item=>{item.removeEventListener('pointermove',move);item.removeEventListener('pointerleave',leave)});menuLinks.forEach(link=>link.removeEventListener('click',closeMenu));navigationLinks.forEach(link=>{link.removeAttribute('data-active');link.removeAttribute('aria-current')});culture?.classList.remove('is-active');root.classList.remove('js','has-motion','ready')};
  },[]);
  return null;
}
