'use client';

import { useEffect, useRef } from 'react';

type ProductType = 'radar' | 'app' | 'swarm' | 'control';

const palette: Record<ProductType, string> = {
  radar: '#a6e187', app: '#b2e1d9', swarm: '#ff6a21', control: '#ffce64',
};

function useCanvas(drawScene: (ctx: CanvasRenderingContext2D, w: number, h: number, t: number, pointer: {x:number;y:number}) => void) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf=0, visible=false, pointer={x:.5,y:.5}, target={...pointer};
    const resize=()=>{const rect=canvas.getBoundingClientRect(),dpr=Math.min(devicePixelRatio,innerWidth<720?1.15:1.45);canvas.width=Math.max(1,Math.floor(rect.width*dpr));canvas.height=Math.max(1,Math.floor(rect.height*dpr));ctx.setTransform(dpr,0,0,dpr,0,0);};
    const move=(e:PointerEvent)=>{const r=canvas.getBoundingClientRect();target={x:(e.clientX-r.left)/r.width,y:(e.clientY-r.top)/r.height};};
    const loop=(ms:number)=>{pointer.x+=(target.x-pointer.x)*.045;pointer.y+=(target.y-pointer.y)*.045;const r=canvas.getBoundingClientRect();drawScene(ctx,r.width,r.height,reduce?6.4:ms*.001,pointer);if(visible&&!reduce)raf=requestAnimationFrame(loop);};
    const io=new IntersectionObserver(([e])=>{visible=e.isIntersecting;if(visible){cancelAnimationFrame(raf);raf=requestAnimationFrame(loop);}else cancelAnimationFrame(raf);},{rootMargin:'120px'});
    const ro=new ResizeObserver(resize);ro.observe(canvas);io.observe(canvas);canvas.addEventListener('pointermove',move,{passive:true});resize();
    return()=>{ro.disconnect();io.disconnect();canvas.removeEventListener('pointermove',move);cancelAnimationFrame(raf);};
  },[drawScene]);
  return ref;
}

function base(ctx:CanvasRenderingContext2D,w:number,h:number,color:string,p:{x:number;y:number}){
  ctx.clearRect(0,0,w,h);
  const g=ctx.createRadialGradient(w*(.5+(p.x-.5)*.08),h*(.48+(p.y-.5)*.06),0,w*.5,h*.5,Math.max(w,h)*.7);
  g.addColorStop(0,color+'1f');g.addColorStop(.42,'#0b1510');g.addColorStop(1,'#050906');ctx.fillStyle=g;ctx.fillRect(0,0,w,h);
  ctx.strokeStyle='rgba(255,241,182,.065)';ctx.lineWidth=1;
  const step=Math.max(36,w/11),off=(p.x-.5)*10;
  for(let x=-step+off;x<w+step;x+=step){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,h);ctx.stroke();}
  for(let y=0;y<h;y+=step){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.stroke();}
}

function radar(ctx:CanvasRenderingContext2D,w:number,h:number,t:number,p:{x:number;y:number}){
  const c='#a6e187';base(ctx,w,h,c,p);const x=w*.54+(p.x-.5)*18,y=h*.54+(p.y-.5)*12,r=Math.min(w,h)*.34;
  ctx.save();ctx.translate(x,y);ctx.scale(1,.72);ctx.strokeStyle='rgba(166,225,135,.24)';ctx.lineWidth=1;
  [1,.72,.44,.2].forEach(s=>{ctx.beginPath();ctx.arc(0,0,r*s,0,Math.PI*2);ctx.stroke();});
  const a=t*.58;const sweep=ctx.createRadialGradient(0,0,0,0,0,r);sweep.addColorStop(0,'rgba(224,242,87,.3)');sweep.addColorStop(1,'rgba(224,242,87,0)');ctx.fillStyle=sweep;ctx.beginPath();ctx.moveTo(0,0);ctx.arc(0,0,r,a-.42,a);ctx.closePath();ctx.fill();ctx.strokeStyle='#e0f257';ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(Math.cos(a)*r,Math.sin(a)*r);ctx.stroke();
  for(let i=0;i<28;i++){const seed=Math.sin(i*91.913)*43758.5453,ang=(seed-Math.floor(seed))*Math.PI*2,rr=r*(.13+(((i*37)%23)/28)),px=Math.cos(ang)*rr,py=Math.sin(ang)*rr,score=(i*17)%100,hit=Math.abs(Math.atan2(Math.sin(ang-a),Math.cos(ang-a)))<.18;ctx.fillStyle=score>76?'#e0f257':'rgba(166,225,135,.42)';ctx.beginPath();ctx.arc(px,py,hit?4.5:score>76?3:1.5,0,Math.PI*2);ctx.fill();if(score>84){ctx.strokeStyle=`rgba(224,242,87,${.2+.2*Math.sin(t*2+i)})`;ctx.beginPath();ctx.arc(px,py,9+Math.sin(t*2+i)*2,0,Math.PI*2);ctx.stroke();}}
  ctx.restore();
  ctx.fillStyle='rgba(255,241,182,.7)';ctx.font='500 10px monospace';ctx.fillText('QUALIFIED DEMAND FIELD',22,h-24);
}

function app(ctx:CanvasRenderingContext2D,w:number,h:number,t:number,p:{x:number;y:number}){
  const c='#b2e1d9';base(ctx,w,h,c,p);ctx.save();ctx.translate((p.x-.5)*16,(p.y-.5)*10);
  const roads=[.18,.38,.62,.79];ctx.lineCap='round';roads.forEach((n,i)=>{ctx.strokeStyle=`rgba(178,225,217,${.1+i*.025})`;ctx.lineWidth=7;ctx.beginPath();ctx.moveTo(-20,h*n);ctx.bezierCurveTo(w*.2,h*(n-.22),w*.64,h*(n+.2),w+20,h*(n-.08));ctx.stroke();ctx.strokeStyle='#07100a';ctx.lineWidth=4;ctx.stroke();});
  const route=(u:number)=>{const x=32+(w-64)*u,y=h*.72-h*.46*u+Math.sin(u*Math.PI*2.3)*h*.12;return{x,y};};
  ctx.strokeStyle='#b2e1d9';ctx.lineWidth=3;ctx.setLineDash([7,10]);ctx.beginPath();for(let i=0;i<=80;i++){const q=route(i/80);i?ctx.lineTo(q.x,q.y):ctx.moveTo(q.x,q.y);}ctx.stroke();ctx.setLineDash([]);
  for(let i=0;i<5;i++){const q=route(i/4);ctx.fillStyle=i<3?'#b2e1d9':'#0b1510';ctx.strokeStyle='#b2e1d9';ctx.lineWidth=2;ctx.beginPath();ctx.arc(q.x,q.y,9,0,Math.PI*2);ctx.fill();ctx.stroke();ctx.fillStyle=i<3?'#07100a':'#b2e1d9';ctx.font='700 9px monospace';ctx.textAlign='center';ctx.fillText(String(i+1),q.x,q.y+3);}
  const pulse=route((t*.13)%1);ctx.shadowBlur=22;ctx.shadowColor='#e0f257';ctx.fillStyle='#e0f257';ctx.beginPath();ctx.arc(pulse.x,pulse.y,5,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;ctx.restore();ctx.textAlign='left';ctx.fillStyle='rgba(255,241,182,.7)';ctx.font='500 10px monospace';ctx.fillText('LIVE GUEST JOURNEY / CHAPTER 03',22,h-24);
}

function swarm(ctx:CanvasRenderingContext2D,w:number,h:number,t:number,p:{x:number;y:number}){
  const c='#ff6a21';base(ctx,w,h,c,p);const cx=w*.5+(p.x-.5)*20,cy=h*.5+(p.y-.5)*16,rad=Math.min(w,h)*.32;
  const nodes=Array.from({length:8},(_,i)=>({x:cx+Math.cos(i/8*Math.PI*2-.3)*rad*(i%2?.82:1),y:cy+Math.sin(i/8*Math.PI*2-.3)*rad*.72,label:['GUEST','SALES','OPS','MEDIA','VIP','SPONSOR','DATA','CREATIVE'][i]}));
  nodes.forEach((n,i)=>{ctx.strokeStyle='rgba(255,106,33,.24)';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(cx,cy);ctx.quadraticCurveTo(cx+Math.sin(i)*45,cy+Math.cos(i)*30,n.x,n.y);ctx.stroke();const q=(t*.25+i*.123)%1,x=cx+(n.x-cx)*q,y=cy+(n.y-cy)*q;ctx.fillStyle=i%3===0?'#e0f257':'#ff6a21';ctx.beginPath();ctx.arc(x,y,2.5,0,Math.PI*2);ctx.fill();ctx.fillStyle='#0b1510';ctx.strokeStyle='rgba(255,106,33,.58)';ctx.lineWidth=1;ctx.fillRect(n.x-35,n.y-15,70,30);ctx.strokeRect(n.x-35,n.y-15,70,30);ctx.fillStyle='#fff1b6';ctx.font='600 8px monospace';ctx.textAlign='center';ctx.fillText(n.label,n.x,n.y+3);});
  const pulse=1+Math.sin(t*2)*.07;ctx.save();ctx.translate(cx,cy);ctx.scale(pulse,pulse);ctx.rotate(t*.06);ctx.fillStyle='#ff6a21';ctx.beginPath();for(let i=0;i<6;i++){const a=i/6*Math.PI*2;i?ctx.lineTo(Math.cos(a)*48,Math.sin(a)*48):ctx.moveTo(Math.cos(a)*48,Math.sin(a)*48);}ctx.closePath();ctx.fill();ctx.restore();ctx.fillStyle='#07100a';ctx.font='800 11px monospace';ctx.textAlign='center';ctx.fillText('MISSION',cx,cy-2);ctx.font='600 8px monospace';ctx.fillText('ORCHESTRATOR',cx,cy+11);ctx.textAlign='left';ctx.fillStyle='rgba(255,241,182,.7)';ctx.font='500 10px monospace';ctx.fillText('8 SPECIALISTS / 3 MISSIONS IN FLIGHT',22,h-24);
}

function control(ctx:CanvasRenderingContext2D,w:number,h:number,t:number,p:{x:number;y:number}){
  const c='#ffce64';base(ctx,w,h,c,p);const pad=22,gap=10,top=60,pw=(w-pad*2-gap)/2,ph=(h-top-pad-gap)/2;
  const panels=[[pad,top],[pad+pw+gap,top],[pad,top+ph+gap],[pad+pw+gap,top+ph+gap]];
  panels.forEach(([x,y],i)=>{ctx.fillStyle='rgba(5,9,6,.7)';ctx.fillRect(x,y,pw,ph);ctx.strokeStyle='rgba(255,206,100,.2)';ctx.strokeRect(x,y,pw,ph);ctx.fillStyle='rgba(255,241,182,.45)';ctx.font='500 8px monospace';ctx.fillText(['DEMAND VELOCITY','GUEST PARTICIPATION','MISSION CAPACITY','DECISION CONFIDENCE'][i],x+12,y+18);ctx.strokeStyle=i===2?'#ff6a21':'#ffce64';ctx.lineWidth=2;ctx.beginPath();for(let k=0;k<42;k++){const xx=x+12+(pw-24)*k/41,yy=y+ph*.64+Math.sin(k*.42+t*(.8+i*.18)+i)*ph*.12+Math.sin(k*.13+i)*ph*.08;k?ctx.lineTo(xx,yy):ctx.moveTo(xx,yy);}ctx.stroke();ctx.fillStyle='#fff1b6';ctx.font='700 18px Arial';ctx.fillText(['+24%','68%','07/09','92'][i],x+12,y+ph-15);});
  ctx.fillStyle='#ffce64';ctx.font='600 9px monospace';ctx.fillText('EXECUTIVE PULSE / LIVE OPERATING PICTURE',pad,34);
}

const scenes={radar,app,swarm,control};

export function ProductEngine({type}:{type:ProductType}){
  const ref=useCanvas(scenes[type]);
  return <div className={`product-engine product-engine-${type}`}>
    <canvas ref={ref} aria-label={`${type} live product simulation`} />
    <div className="engine-hud"><span><i/> LIVE SYSTEM</span><b>{type==='app'?'GUEST OS':type.toUpperCase()}</b></div>
    <div className="engine-corners" aria-hidden="true"><i/><i/><i/><i/></div>
  </div>;
}

export function FlywheelEngine(){
  const draw=(ctx:CanvasRenderingContext2D,w:number,h:number,t:number,p:{x:number;y:number})=>{
    base(ctx,w,h,'#e0f257',p);const cx=w*.5,cy=h*.5,r=Math.min(w,h)*.32,labels=['RADAR','APP','SWARM','CONTROL'],colors=['#a6e187','#b2e1d9','#ff6a21','#ffce64'];
    ctx.strokeStyle='rgba(255,241,182,.15)';ctx.setLineDash([4,10]);ctx.beginPath();ctx.arc(cx,cy,r,0,Math.PI*2);ctx.stroke();ctx.setLineDash([]);
    labels.forEach((label,i)=>{const a=-Math.PI/2+i*Math.PI/2,x=cx+Math.cos(a)*r,y=cy+Math.sin(a)*r;ctx.strokeStyle=colors[i]+'88';ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(x,y);ctx.stroke();ctx.fillStyle='#07100a';ctx.strokeStyle=colors[i];ctx.lineWidth=1;ctx.fillRect(x-54,y-24,108,48);ctx.strokeRect(x-54,y-24,108,48);ctx.fillStyle=colors[i];ctx.textAlign='center';ctx.font='700 10px monospace';ctx.fillText(label,x,y+4);});
    for(let i=0;i<12;i++){const q=(t*.09+i/12)%1,a=-Math.PI/2+q*Math.PI*2,x=cx+Math.cos(a)*r,y=cy+Math.sin(a)*r;ctx.fillStyle=i%4===0?'#fff1b6':'#e0f257';ctx.shadowBlur=15;ctx.shadowColor=ctx.fillStyle;ctx.beginPath();ctx.arc(x,y,2.5+(i%4===0?2:0),0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;}
    ctx.save();ctx.translate(cx,cy);ctx.rotate(t*.05);ctx.strokeStyle='#e0f257';ctx.lineWidth=1.5;ctx.strokeRect(-60,-60,120,120);ctx.rotate(-t*.1);ctx.strokeStyle='rgba(255,241,182,.35)';ctx.strokeRect(-43,-43,86,86);ctx.restore();ctx.fillStyle='#fff1b6';ctx.textAlign='center';ctx.font='800 22px Arial';ctx.fillText('TOWN',cx,cy+4);ctx.fillStyle='#e0f257';ctx.font='500 8px monospace';ctx.fillText('TECHNOLOGY CORE',cx,cy+22);ctx.textAlign='left';
  };
  const ref=useCanvas(draw);
  return <div className="fly-engine"><canvas ref={ref} aria-label="Live Tequila Town Technology flywheel simulation"/><div className="engine-hud"><span><i/> COMPOUNDING</span><b>SIGNAL LOOP</b></div></div>;
}
