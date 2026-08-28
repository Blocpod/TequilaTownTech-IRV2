'use client';

import { useEffect, useMemo, useRef } from 'react';

type Block = { x: number; y: number; z: number; delay: number; size: number; tone: number };

const leaves = [
  [0,1.08,0],[-.13,1.03,-.22],[.14,1.02,.2],[-.3,.94,-.1],[.32,.93,.12],
  [-.49,.82,.12],[.51,.81,-.1],[-.67,.68,-.02],[.69,.67,.04],[-.83,.5,.16],[.85,.49,-.15],
  [-.98,.34,.08],[1,.33,-.08],
] as const;

function noise(n: number) { return Math.abs(Math.sin(n * 93.17) * 43758.21 % 1); }

export default function HeroSpecimen() {
  const ref = useRef<HTMLCanvasElement>(null);
  const blocks = useMemo(() => {
    const output: Block[] = [];
    leaves.forEach(([dx,dy,dz], leaf) => {
      for (let step=0; step<62; step+=1) {
        const u=step/61;
        const width=Math.sin(Math.PI*Math.pow(u,.78))*(.14-u*.03);
        const columns=Math.max(1,Math.floor(width*70));
        for(let col=-columns;col<=columns;col+=1){
          const side=col/70;
          const curve=(leaf%2?-1:1)*u*u*.075;
          output.push({x:dx*u+side*(1-Math.abs(dx))*.86+curve,y:dy*u,z:dz*u+side*dx*.2,delay:u*.5+leaf*.018+noise(leaf*999+step*17+col)*.13,size:2.8+noise(step*31+col)*5.2,tone:Math.abs(leaf+step+col)%4});
        }
      }
    });
    return output.sort((a,b)=>a.delay-b.delay);
  },[]);

  useEffect(()=>{
    const canvas=ref.current;if(!canvas)return;const ctx=canvas.getContext('2d');if(!ctx)return;
    const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
    let w=0,h=0,dpr=1,raf=0,visible=true,lastDraw=0;const start=performance.now();
    const pointer={x:0,y:0},target={x:0,y:0};
    const resize=()=>{const r=canvas.getBoundingClientRect();w=r.width;h=r.height;dpr=Math.min(devicePixelRatio||1,innerWidth<720?1.25:1.7);canvas.width=Math.max(1,Math.round(w*dpr));canvas.height=Math.max(1,Math.round(h*dpr));ctx.setTransform(dpr,0,0,dpr,0,0);if(reduced)raf=requestAnimationFrame(draw)};
    const move=(e:PointerEvent)=>{if(!fine)return;const r=canvas.getBoundingClientRect();target.x=(e.clientX-r.left)/r.width-.5;target.y=(e.clientY-r.top)/r.height-.5};
    function draw(time:number){if(!visible){raf=requestAnimationFrame(draw);return}if(w<520&&time-lastDraw<30){raf=requestAnimationFrame(draw);return}lastDraw=time;pointer.x+=(target.x-pointer.x)*.05;pointer.y+=(target.y-pointer.y)*.05;const t=(time-start)*.001;const reveal=reduced?1:Math.min(1,t/2.9);ctx.clearRect(0,0,w,h);ctx.fillStyle='#050806';ctx.fillRect(0,0,w,h);
      const aura=ctx.createRadialGradient(w*.5,h*.74,0,w*.5,h*.74,Math.max(w,h)*.48);aura.addColorStop(0,'rgba(145,215,127,.12)');aura.addColorStop(.42,'rgba(223,255,72,.035)');aura.addColorStop(1,'transparent');ctx.fillStyle=aura;ctx.fillRect(0,0,w,h);
      ctx.strokeStyle='rgba(223,255,72,.075)';ctx.lineWidth=1;const grid=56;for(let x=0;x<w;x+=grid){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,h);ctx.stroke()}for(let y=0;y<h;y+=grid){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.stroke()}
      const widthScale=w<520?.9:.58;const cx=w*.5+pointer.x*26,cy=h*.87+pointer.y*16,scale=Math.min(w*widthScale,h*.8)*(1+Math.sin(t*.7)*.004),rot=pointer.x*.2+Math.sin(time*.0002)*.04;const cos=Math.cos(rot),sin=Math.sin(rot);const palette=['#4b8752','#91d77f','#dfff48','#fff3ca'];
      blocks.forEach((b,index)=>{if(w<520&&index%2)return;const p=Math.max(0,Math.min(1,(reveal-b.delay)*10));if(!p)return;const rx=b.x*cos-b.z*sin,rz=b.x*sin+b.z*cos;let x=cx+rx*scale,y=cy-b.y*scale+rz*scale*.17;const scatter=1-p;x+=Math.sin(index*7.7+t)*scatter*w*.3;y+=Math.cos(index*4.9+t*.8)*scatter*h*.34;const depth=.74+rz*.5;const size=b.size*depth*(.52+p*.48);ctx.globalAlpha=p*(.62+b.tone*.1);ctx.fillStyle='rgba(0,0,0,.32)';ctx.fillRect(Math.round(x+size*.34),Math.round(y+size*.34),Math.ceil(size),Math.ceil(size));ctx.fillStyle=palette[b.tone];ctx.fillRect(Math.round(x),Math.round(y),Math.ceil(size),Math.ceil(size));if(size>5.5){ctx.globalAlpha*=.65;ctx.fillStyle='#fff3ca';ctx.fillRect(Math.round(x),Math.round(y),Math.max(1,Math.ceil(size*.5)),1)}if(Math.abs(reveal-b.delay)<.01){ctx.globalAlpha=.95;ctx.fillStyle='#fff3ca';ctx.fillRect(x-1,y-1,3,3)}});ctx.globalAlpha=1;
      if(!reduced){const scan=((time*.06)%(w+100))-50;const g=ctx.createLinearGradient(scan-36,0,scan+36,0);g.addColorStop(0,'transparent');g.addColorStop(.5,'rgba(224,242,87,.07)');g.addColorStop(1,'transparent');ctx.fillStyle=g;ctx.fillRect(scan-36,0,72,h);raf=requestAnimationFrame(draw)}}
    const io=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting},{rootMargin:'80px'});const ro=new ResizeObserver(resize);io.observe(canvas);ro.observe(canvas);canvas.addEventListener('pointermove',move,{passive:true});resize();raf=requestAnimationFrame(draw);return()=>{cancelAnimationFrame(raf);io.disconnect();ro.disconnect();canvas.removeEventListener('pointermove',move)};
  },[blocks]);
  return <div className="specimen-shell"><div className="specimen-fallback" aria-hidden="true">{Array.from({length:13},(_,index)=><i key={index}/>)}</div><canvas ref={ref} className="hero-specimen" aria-label="A digital agave plant building itself from thousands of live blocks"/></div>;
}
