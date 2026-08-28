"use client";
import { useEffect, useRef } from "react";
export default function Wavefield() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf = 0;
    const resize = () => {
      const parent = canvas.parentElement;
      const w = parent?.clientWidth ?? window.innerWidth;
      const h = parent?.clientHeight ?? 520;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = `${w}px`; canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize(); window.addEventListener("resize", resize);
    const draw = (t: number) => {
      const w = canvas.clientWidth; const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);
      [6, 10, 40].forEach((hz, i) => {
        ctx.beginPath();
        for (let x = 0; x <= w; x += 2) {
          const y = h * 0.52 + Math.sin(x * 0.012 + t * 0.0012 * hz + i) * (18 + i * 10) + Math.sin(x * 0.003 + t * 0.0004) * 24;
          if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = i === 1 ? "rgba(125,224,198,0.55)" : i === 2 ? "rgba(227,177,90,0.28)" : "rgba(154,160,255,0.35)";
        ctx.lineWidth = i === 1 ? 1.6 : 1; ctx.stroke();
      });
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} aria-hidden />;
}
