'use client';

import { useEffect, useMemo, useRef } from 'react';

type Block = { x: number; y: number; z: number; delay: number; size: number; tone: number };

const leaves = [
  [0,1,0],[-.22,.96,-.18],[.23,.94,.16],[-.48,.8,-.1],[.5,.79,.12],[-.73,.6,.08],[.76,.58,-.08],[-.94,.38,.16],[.96,.36,-.14],
] as const;

function noise(n: number) { return Math.abs(Math.sin(n * 93.17) * 43758.21 % 1); }

export default function HeroSpecimen() {
  const ref = useRef<HTMLCanvasElement>(null);
  const blocks = useMemo(() => {
    const output: Block[] = [];
    leaves.forEach(([dx,dy,dz], leaf) => {
      for (let step=0; step<48; step+=1) {
        const u=step/47;
        const width=Math.sin(Math.PI*Math.pow(u,.82))*(.11-u*.025);
        const columns=Math.max(1,Math.floor(width*64));
        for(let col=-columns;col<=columns;col+=1){
          const side=col/64;
          const curve=(leaf%2?-1:1)*u*u*.06;
          output.push({x:dx*u+side*(1-Math.abs(dx))*.8+curve,y:dy*u,z:dz*u+side*dx*.18,delay:u*.58+leaf*.025+noise(leaf*999+step*17+col)*.12,size:3+noise(step*31+col)*4,tone:(leaf+step+col)%4});
        }
      }
    });
    return output.sort((a,b)=>a.delay-b.delay);
  },[]);

  useEffect(()=>{
    const canvas=ref.current;if(!canvas)return;const ctx=canvas.getContext('2d');if(!ctx)return;
    const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
    let w=0,h=0,dpr=1,raf=0;const start=performance.now();
    const pointer={x:0,y:0},target={x:0,y:0};
    const resize=()=>{const r=canvas.getBoundingClientRect();w=r.width;h=r.height;dpr=Math.min(devicePixelRatio||1,innerWidth<720?1.25:1.7);canvas.width=Math.max(1,Math.round(w*dpr));canvas.height=Math.max(1,Math.round(h*dpr));ctx.setTransform(dpr,0,0,dpr,0,0)};
    const move=(e:PointerEvent)=>{if(!fine)return;const r=canvas.getBoundingClientRect();target.x=(e.clientX-r.left)/r.width-.5;target.y=(e.clientY-r.top)/r.height-.5};
    const draw=(time:number)=>{raf=requestAnimationFrame(draw);pointer.x+=(target.x-pointer.x)*.05;pointer.y+=(target.y-pointer.y)*.05;const t=(time-start)*.001;const reveal=reduced?1:Math.min(1,t/3.7);ctx.clearRect(0,0,w,h);ctx.fillStyle='#030604';ctx.fillRect(0,0,w,h);
      ctx.strokeStyle='rgba(224,242,87,.09)';ctx.lineWidth=1;const grid=48;for(let x=0;x<w;x+=grid){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,h);ctx.stroke()}for(let y=0;y<h;y+=grid){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.stroke()}
      const cx=w*.51+pointer.x*22,cy=h*.83+pointer.y*14,scale=Math.min(w*.46,h*.69),rot=pointer.x*.18+Math.sin(time*.00022)*.035;const cos=Math.cos(rot),sin=Math.sin(rot);const palette=['#669f5a','#a6e187','#e0f257','#fff1b6'];
      blocks.forEach((b,index)=>{const p=Math.max(0,Math.min(1,(reveal-b.delay)*9));if(!p)return;const rx=b.x*cos-b.z*sin,rz=b.x*sin+b.z*cos;let x=cx+rx*scale,y=cy-b.y*scale+rz*scale*.16;const scatter=1-p;x+=Math.sin(index*7.7+t)*scatter*w*.45;y+=Math.cos(index*4.9+t*.8)*scatter*h*.42;const depth=.7+rz*.45;const size=b.size*depth*(.55+p*.45);ctx.globalAlpha=p*(.58+b.tone*.12);ctx.fillStyle=palette[b.tone];ctx.fillRect(Math.round(x),Math.round(y),Math.ceil(size),Math.ceil(size));if(Math.abs(reveal-b.delay)<.012){ctx.globalAlpha=.95;ctx.fillStyle='#fff1b6';ctx.fillRect(x-1,y-1,2,2)}});ctx.globalAlpha=1;
      ctx.fillStyle='rgba(255,241,182,.55)';ctx.font='600 9px monospace';ctx.fillText('LIVE SPECIMEN / SIGNAL-BUILT AGAVE',18,26);ctx.textAlign='right';ctx.fillText(`${String(Math.floor(reveal*blocks.length)).padStart(4,'0')} BLOCKS`,w-18,26);ctx.textAlign='left';
      const scan=((time*.06)%(w+100))-50;const g=ctx.createLinearGradient(scan-36,0,scan+36,0);g.addColorStop(0,'transparent');g.addColorStop(.5,'rgba(224,242,87,.07)');g.addColorStop(1,'transparent');ctx.fillStyle=g;ctx.fillRect(scan-36,0,72,h)};
    const ro=new ResizeObserver(resize);ro.observe(canvas);canvas.addEventListener('pointermove',move,{passive:true});resize();raf=requestAnimationFrame(draw);return()=>{cancelAnimationFrame(raf);ro.disconnect();canvas.removeEventListener('pointermove',move)};
  },[blocks]);
  return <canvas ref={ref} className="hero-specimen" aria-label="A digital agave plant building itself from thousands of live blocks"/>;
}
