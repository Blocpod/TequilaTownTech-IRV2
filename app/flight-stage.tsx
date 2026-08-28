'use client';

import { useEffect, useRef } from 'react';

type Point = { x: number; y: number };

const TAU = Math.PI * 2;
const nodes = [
  { label: 'RADAR', phase: 'ACQUIRE', angle: -2.45, color: '#a6e187' },
  { label: 'APP', phase: 'EXPERIENCE', angle: -0.74, color: '#b2e1d9' },
  { label: 'SWARM', phase: 'OPERATE', angle: 0.72, color: '#e66823' },
  { label: 'CONTROL', phase: 'DECIDE', angle: 2.38, color: '#ffce64' },
];

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r = 4) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
}

export default function FlightStage() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
    let width = innerWidth;
    let height = innerHeight;
    let dpr = 1;
    let raf = 0;
    let scrollTarget = scrollY;
    let scrollCurrent = scrollY;
    const pointer: Point = { x: 0, y: 0 };
    const pointerTarget: Point = { x: 0, y: 0 };

    const resize = () => {
      width = innerWidth;
      height = innerHeight;
      dpr = Math.min(devicePixelRatio || 1, width < 760 ? 1.35 : 1.75);
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onScroll = () => { scrollTarget = scrollY; };
    const onPointer = (event: PointerEvent) => {
      if (!fine) return;
      pointerTarget.x = event.clientX / width - .5;
      pointerTarget.y = event.clientY / height - .5;
    };

    const project = (x: number, z: number, horizon: number, depth: number) => {
      const scale = depth / Math.max(80, z + depth);
      return { x: width * .5 + x * scale, y: horizon + (height - horizon) * scale, scale };
    };

    const draw = (time: number) => {
      raf = requestAnimationFrame(draw);
      scrollCurrent += (scrollTarget - scrollCurrent) * (reduced ? 1 : .075);
      pointer.x += (pointerTarget.x - pointer.x) * .05;
      pointer.y += (pointerTarget.y - pointer.y) * .05;

      const page = Math.max(1, document.documentElement.scrollHeight - height);
      const progress = Math.min(1, scrollCurrent / page);
      const local = Math.min(1, scrollCurrent / Math.max(1, height * 1.25));
      const t = reduced ? 4 : time * .001;
      const horizon = height * (.42 + pointer.y * .018 - local * .05);
      const zoom = 1 + local * .42;
      const cx = width * (.63 - local * .1) + pointer.x * 16;
      const cy = height * (.49 + local * .04) + pointer.y * 10;

      ctx.clearRect(0, 0, width, height);
      const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(width, height) * .85);
      bg.addColorStop(0, '#12311d');
      bg.addColorStop(.34, '#09130d');
      bg.addColorStop(1, '#020503');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      ctx.save();
      ctx.globalAlpha = .55;
      ctx.strokeStyle = 'rgba(224,242,87,.12)';
      ctx.lineWidth = 1;
      for (let z = 80; z < 1500; z += 70) {
        const a = project(-width * 1.4, z, horizon, 420);
        const b = project(width * 1.4, z, horizon, 420);
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      }
      for (let x = -width * 1.5; x <= width * 1.5; x += 90) {
        const a = project(x, 70, horizon, 420);
        const b = project(x, 1500, horizon, 420);
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      }
      ctx.restore();

      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(zoom, zoom * .72);
      ctx.rotate(-.08 + local * .19 + progress * .08);
      const radius = Math.min(width, height) * (width < 760 ? .28 : .34);

      for (let ring = 1; ring <= 4; ring += 1) {
        ctx.beginPath();
        ctx.arc(0, 0, radius * (.28 + ring * .2), 0, TAU);
        ctx.strokeStyle = `rgba(255,241,182,${.045 + ring * .012})`;
        ctx.lineWidth = 1 / zoom;
        ctx.setLineDash(ring % 2 ? [3, 11] : []);
        ctx.stroke();
      }
      ctx.setLineDash([]);

      nodes.forEach((node, index) => {
        const angle = node.angle + t * .035 + progress * .34;
        const nx = Math.cos(angle) * radius;
        const ny = Math.sin(angle) * radius;
        ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(nx, ny);
        ctx.strokeStyle = `${node.color}42`; ctx.lineWidth = 1 / zoom; ctx.stroke();

        for (let pulse = 0; pulse < 3; pulse += 1) {
          const u = (t * .16 + index * .19 + pulse / 3) % 1;
          const px = nx * u;
          const py = ny * u;
          ctx.fillStyle = node.color;
          ctx.globalAlpha = Math.sin(u * Math.PI) * .9;
          ctx.fillRect(px - 2 / zoom, py - 2 / zoom, 4 / zoom, 4 / zoom);
        }
        ctx.globalAlpha = 1;

        ctx.save();
        ctx.translate(nx, ny);
        ctx.scale(1, 1 / .72);
        ctx.rotate(.08 - local * .19 - progress * .08);
        const cardW = width < 760 ? 98 : 132;
        const cardH = width < 760 ? 42 : 50;
        roundRect(ctx, -cardW / 2, -cardH / 2, cardW, cardH, 3);
        ctx.fillStyle = 'rgba(4,9,6,.88)'; ctx.fill();
        ctx.strokeStyle = `${node.color}88`; ctx.lineWidth = 1; ctx.stroke();
        ctx.fillStyle = node.color; ctx.fillRect(-cardW / 2 + 9, -3, 5, 5);
        ctx.fillStyle = '#fff1b6'; ctx.font = `700 ${width < 760 ? 8 : 10}px monospace`;
        ctx.fillText(node.label, -cardW / 2 + 22, 1);
        ctx.fillStyle = 'rgba(255,241,182,.48)'; ctx.font = `500 ${width < 760 ? 5 : 6}px monospace`;
        ctx.fillText(node.phase, -cardW / 2 + 22, 12);
        ctx.restore();
      });

      ctx.save();
      ctx.scale(1, 1 / .72);
      ctx.rotate(.08 - local * .19 - progress * .08);
      const core = width < 760 ? 92 : 128;
      ctx.rotate(Math.PI / 4 + t * .035);
      ctx.fillStyle = '#050a07';
      ctx.strokeStyle = '#e0f257';
      ctx.lineWidth = 1.2;
      ctx.fillRect(-core / 2, -core / 2, core, core);
      ctx.strokeRect(-core / 2, -core / 2, core, core);
      ctx.rotate(-Math.PI / 4 - t * .035);
      ctx.textAlign = 'center';
      ctx.fillStyle = '#fff1b6'; ctx.font = `900 ${width < 760 ? 19 : 26}px Arial`;
      ctx.fillText('TOWN', 0, -2);
      ctx.fillStyle = '#e0f257'; ctx.font = `600 ${width < 760 ? 6 : 8}px monospace`;
      ctx.fillText('TECH / LIVE SYSTEM', 0, 17);
      ctx.textAlign = 'left';
      ctx.restore();
      ctx.restore();

      const scanX = ((t * 80) % (width + 240)) - 120;
      const scan = ctx.createLinearGradient(scanX - 70, 0, scanX + 70, 0);
      scan.addColorStop(0, 'rgba(224,242,87,0)');
      scan.addColorStop(.5, 'rgba(224,242,87,.045)');
      scan.addColorStop(1, 'rgba(224,242,87,0)');
      ctx.fillStyle = scan; ctx.fillRect(scanX - 70, 0, 140, height);
    };

    resize();
    addEventListener('resize', resize);
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('pointermove', onPointer, { passive: true });
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener('resize', resize);
      removeEventListener('scroll', onScroll);
      removeEventListener('pointermove', onPointer);
    };
  }, []);

  return <canvas ref={ref} className="flight-stage" aria-hidden="true" />;
}
