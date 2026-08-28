'use client';

import { useEffect } from 'react';

export default function FreshExperience(){
  useEffect(()=>{
    const root=document.documentElement;root.classList.add('js','has-motion');
    const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}}),{threshold:.12,rootMargin:'0px 0px -7%'});
    document.querySelectorAll('[data-reveal]').forEach(element=>observer.observe(element));
    const update=()=>{const page=Math.max(1,document.documentElement.scrollHeight-innerHeight);root.style.setProperty('--progress',String(Math.min(1,scrollY/page)))};
    const magnets=fine?[...document.querySelectorAll<HTMLElement>('.mag')]:[];
    const move=(event:Event)=>{const e=event as PointerEvent,target=e.currentTarget as HTMLElement,r=target.getBoundingClientRect();target.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.1}px,${(e.clientY-r.top-r.height/2)*.1}px)`};
    const leave=(event:Event)=>{(event.currentTarget as HTMLElement).style.transform=''};
    magnets.forEach(item=>{item.addEventListener('pointermove',move);item.addEventListener('pointerleave',leave)});
    addEventListener('scroll',update,{passive:true});addEventListener('resize',update);update();
    if(!reduced)requestAnimationFrame(()=>root.classList.add('ready'));else root.classList.add('ready');
    return()=>{observer.disconnect();removeEventListener('scroll',update);removeEventListener('resize',update);magnets.forEach(item=>{item.removeEventListener('pointermove',move);item.removeEventListener('pointerleave',leave)});root.classList.remove('js','has-motion','ready')};
  },[]);
  return null;
}
