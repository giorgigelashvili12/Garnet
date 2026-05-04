"use client";

import React, { useRef, useEffect, memo } from "react";

interface MapElement {
  x: number;
  y: number;
  w: number;
  h: number;
  type: "building" | "park" | "water";
  height?: number;
}

interface LowLoadMapProps {
  elements: MapElement[];
  carPos: { x: number; y: number; angle: number };
  route: { x: number; y: number }[];
}

export default memo(function Glovo({ elements, carPos, route }: LowLoadMapProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = "#f8fafc";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    elements.filter(e => e.type !== "building").forEach(el => {
      ctx.fillStyle = el.type === "water" ? "#e0f2fe" : "#ecfdf5";
      ctx.fillRect(el.x, el.y, el.w, el.h);
    });

    if (route.length > 1) {
      const grad = ctx.createLinearGradient(route[0].x, route[0].y, route[route.length-1].x, route[route.length-1].y);
      grad.addColorStop(0, "#10b981");
      grad.addColorStop(1, "#059669");
      
      ctx.beginPath();
      ctx.lineWidth = 4;
      ctx.lineCap = "round";
      ctx.strokeStyle = grad;
      ctx.moveTo(route[0].x, route[0].y);
      route.forEach(p => ctx.lineTo(p.x, p.y));
      ctx.stroke();
    }

    elements.filter(e => e.type === "building").forEach(b => {
      const h = b.height || 10;
      ctx.fillStyle = "#cbd5e1";
      ctx.fillRect(b.x + 2, b.y - h + 2, b.w, b.h + h);
      ctx.fillStyle = "#ffffff";
      ctx.strokeStyle = "#e2e8f0";
      ctx.lineWidth = 1;
      ctx.fillRect(b.x, b.y - h, b.w, b.h);
      ctx.strokeRect(b.x, b.y - h, b.w, b.h);
    });

    ctx.save();
    ctx.translate(carPos.x, carPos.y);
    ctx.rotate((carPos.angle * Math.PI) / 180);
    
    ctx.fillStyle = "#10b981";
    ctx.beginPath();
    ctx.roundRect(-6, -10, 12, 20, 4);
    ctx.fill();
    ctx.fillStyle = "rgba(0,0,0,0.3)";
    ctx.fillRect(-4, -6, 8, 4);
    ctx.restore();

    ctx.fillStyle = "#ec4899";
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(carPos.x, carPos.y - 25, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  };

  useEffect(() => {
    draw();
    window.addEventListener('resize', draw);
    return () => window.removeEventListener('resize', draw);
  }, [elements, carPos, route]);

  return (
    <div className="w-full aspect-square bg-slate-100 rounded-[2rem] overflow-hidden border border-slate-200 shadow-inner">
      <canvas
        ref={canvasRef}
        width={500}
        height={500}
        className="w-full h-full cursor-crosshair"
      />
    </div>
  );
});