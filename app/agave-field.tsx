'use client';

import { useEffect, useMemo, useRef } from 'react';

type Voxel = { x: number; y: number; delay: number; size: number; tone: number };

const bladePlan = [
  { angle: 0, length: 1, width: .105, curve: 0 },
  { angle: -.24, length: .94, width: .11, curve: -.09 },
  { angle: .25, length: .92, width: .108, curve: .08 },
  { angle: -.5, length: .8, width: .12, curve: -.14 },
  { angle: .52, length: .79, width: .12, curve: .13 },
  { angle: -.77, length: .63, width: .13, curve: -.15 },
  { angle: .79, length: .64, width: .13, curve: .15 },
  { angle: -1.02, length: .45, width: .14, curve: -.11 },
  { angle: 1.03, length: .46, width: .14, curve: .11 },
];

function seededNoise(n: number) {
  return (Math.sin(n * 128.63) * 43758.5453) % 1;
}

export default function AgaveField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const voxels = useMemo(() => {
    const output: Voxel[] = [];
    bladePlan.forEach((blade, bladeIndex) => {
      for (let step = 0; step <= 54; step += 1) {
        const u = step / 54;
        const half = Math.sin(Math.PI * Math.pow(u, .84)) * blade.width * (1 - u * .18);
        const cols = Math.max(1, Math.floor(half * 74));
        for (let col = -cols; col <= cols; col += 1) {
          const lateral = col / 74;
          const along = u * blade.length;
          const bend = blade.curve * u * u;
          const angle = blade.angle + bend;
          const x = Math.sin(angle) * along + lateral * Math.cos(angle);
          const y = Math.cos(angle) * along - lateral * Math.sin(angle);
          const jitter = Math.abs(seededNoise(bladeIndex * 10000 + step * 97 + col * 13));
          output.push({
            x,
            y,
            delay: u * .7 + bladeIndex * .018 + jitter * .1,
            size: 3.5 + jitter * 3,
            tone: (bladeIndex + step + col) % 4,
          });
        }
      }
    });
    return output.sort((a, b) => a.delay - b.delay);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current?.closest<HTMLElement>('.shift');
    if (!canvas || !section) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let raf = 0;
    let visible = true;
    const pointer = { x: -9999, y: -9999 };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(devicePixelRatio || 1, innerWidth < 720 ? 1.25 : 1.6);
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const move = (event: PointerEvent) => {
      if (!fine) return;
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
    };

    const draw = (time: number) => {
      raf = requestAnimationFrame(draw);
      if (!visible) return;
      const rect = section.getBoundingClientRect();
      const travel = rect.height + innerHeight;
      const progress = reduced ? 1 : Math.max(0, Math.min(1, (innerHeight - rect.top) / travel * 1.58));
      ctx.clearRect(0, 0, width, height);

      const scale = Math.min(width * .61, height * .82);
      const originX = width * .51;
      const originY = height * .9;
      const palette = ['#7fcf72', '#a6e187', '#d8ef83', '#fff1b6'];
      let frontier = 0;

      for (let index = 0; index < voxels.length; index += 1) {
        const voxel = voxels[index];
        const reveal = Math.max(0, Math.min(1, (progress - voxel.delay) * 12));
        if (reveal <= 0) continue;
        let x = originX + voxel.x * scale;
        let y = originY - voxel.y * scale;
        if (fine) {
          const dx = x - pointer.x;
          const dy = y - pointer.y;
          const distance = Math.hypot(dx, dy);
          if (distance < 92 && distance > 0) {
            const push = Math.pow(1 - distance / 92, 2) * 32;
            x += dx / distance * push;
            y += dy / distance * push;
          }
        }
        const settle = 1 - reveal;
        x += Math.sin(index * 4.18 + time * .001) * settle * 32;
        y += Math.cos(index * 2.77 + time * .0012) * settle * 28;
        const size = voxel.size * (.45 + reveal * .55);
        ctx.globalAlpha = reveal * (.58 + voxel.tone * .11);
        ctx.fillStyle = palette[voxel.tone];
        ctx.fillRect(Math.round(x), Math.round(y), Math.ceil(size), Math.ceil(size));
        if (Math.abs(progress - voxel.delay) < .014 && frontier < 70) {
          frontier += 1;
          ctx.globalAlpha = .9;
          ctx.fillStyle = '#fff1b6';
          ctx.fillRect(Math.round(x - 1), Math.round(y - 1), 2, 2);
        }
      }
      ctx.globalAlpha = 1;
    };

    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { rootMargin: '30%' });
    observer.observe(section);
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    canvas.addEventListener('pointermove', move, { passive: true });
    resize();
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      resizeObserver.disconnect();
      canvas.removeEventListener('pointermove', move);
    };
  }, [voxels]);

  return <div className="agave-field" ref={sectionRef}><canvas ref={canvasRef} aria-label="An agave plant assembling from thousands of live pixel blocks" /></div>;
}
