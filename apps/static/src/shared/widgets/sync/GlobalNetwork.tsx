import { useEffect, useRef, useState, useCallback } from "react";

const PROTOCOLS = [
  { icon: "🦊", label: "MetaMask" },
  { icon: "🌈", label: "Rainbow" },
  { icon: "⚡", label: "Phantom" },
  { icon: "🔷", label: "Coinbase" },
  { icon: "🛡️", label: "Ledger" },
  { icon: "🔮", label: "Magic" },
  { icon: "🌊", label: "WalletConnect" },
  { icon: "🦁", label: "Brave" },
];

const CURRENCIES = ["USDC", "ETH", "BTC", "SOL", "USDT", "ARB", "OP", "MATIC"];

const GREEN_COLORS = [
  "#4ade80", "#22c55e", "#16a34a", "#86efac",
  "#34d399", "#6ee7b7", "#a7f3d0", "#bbf7d0",
];

function randomBetween(a: number, b: number) {
  return a + Math.random() * (b - a);
}

function spherePoint(lat: number, lon: number, r: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return {
    x: -(r * Math.sin(phi) * Math.cos(theta)),
    y: r * Math.cos(phi),
    z: r * Math.sin(phi) * Math.sin(theta),
  };
}

interface Dot {
  lat: number;
  lon: number;
  size: number;
  brightness: number;
}

interface Transaction {
  id: number;
  fromLat: number;
  fromLon: number;
  toLat: number;
  toLon: number;
  protocol: (typeof PROTOCOLS)[number];
  currency: string;
  amount: number;
  progress: number;
  speed: number;
  color: string;
}

const CONTINENT_REGIONS: [number, number, number, number, number][] = [
  [25, 50, -125, -70, 1.0],
  [50, 70, -140, -60, 0.55],
  [15, 25, -105, -75, 0.8],
  [7, 15, -90, -77, 0.45],
  [62, 83, -55, -18, 0.25],
  [-5, 12, -80, -50, 1.0],
  [-35, -5, -75, -35, 1.0],
  [-55, -35, -75, -55, 0.45],
  [36, 55, -10, 30, 1.0],
  [55, 71, 4, 30, 0.65],
  [36, 44, -10, 4, 0.7],
  [36, 42, 26, 42, 0.6],
  [15, 37, -18, 50, 1.0],
  [-5, 15, -18, 50, 1.0],
  [-35, -5, 10, 50, 0.85],
  [-25, -12, 43, 51, 0.45],
  [22, 42, 35, 65, 0.75],
  [8, 28, 68, 90, 1.0],
  [8, 22, 90, 108, 0.75],
  [-8, 8, 95, 140, 0.6],
  [42, 70, 40, 140, 0.85],
  [22, 42, 100, 135, 1.0],
  [32, 46, 128, 146, 0.65],
  [52, 72, 60, 140, 0.5],
  [-38, -15, 114, 154, 1.0],
  [-15, -5, 130, 145, 0.45],
  [-46, -34, 166, 178, 0.4],
  [50, 59, -8, 2, 0.65],
  [63, 66, -24, -13, 0.35],
];

const OCEAN_EXCLUSIONS: [number, number, number, number][] = [
  [-60, 65, -180, -130],
  [-60, 65, 155, 180],
  [-50, 60, -50, -22],
  [-50, 5, 52, 88],
  [65, 90, -180, 180],
  [-90, -60, -180, 180],
];

function isOcean(lat: number, lon: number): boolean {
  for (const [la, lb, loa, lob] of OCEAN_EXCLUSIONS) {
    if (lat >= la && lat <= lb && lon >= loa && lon <= lob) return true;
  }
  return false;
}

function generateContinentDots(count: number): Dot[] {
  const dots: Dot[] = [];
  const totalDensity = CONTINENT_REGIONS.reduce((s, r) => s + r[4], 0);
  for (const region of CONTINENT_REGIONS) {
    const regionCount = Math.floor((region[4] / totalDensity) * count);
    let tries = 0;
    let placed = 0;
    while (placed < regionCount && tries < regionCount * 10) {
      tries++;
      const lat = randomBetween(region[0], region[1]);
      const lon = randomBetween(region[2], region[3]);
      if (!isOcean(lat, lon)) {
        dots.push({ lat, lon, size: randomBetween(0.9, 2.3), brightness: randomBetween(0.4, 1.0) });
        placed++;
      }
    }
  }
  return dots;
}

const SPAWN_LOCATIONS = [
  [40, -100], [51, 10], [35, 105], [20, 77],
  [-14, -51], [-25, 134], [36, 138], [1, 25],
  [25, 45], [55, 37], [-26, 28], [19, -99],
];

export default function GlobalNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rotationRef = useRef(0);
  const transactionsRef = useRef<Transaction[]>([]);
  const txCounterRef = useRef(0);
  const dotsRef = useRef<Dot[]>(generateContinentDots(2400));
  const animFrameRef = useRef<number>(0);
  const lastTxTimeRef = useRef(0);
  const [isDark, setIsDark] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
      : false
  );
  const isDarkRef = useRef(isDark);

  const [labels, setLabels] = useState<
    {
      id: number;
      x: number;
      y: number;
      protocol: (typeof PROTOCOLS)[number];
      currency: string;
      amount: number;
      color: string;
      opacity: number;
    }[]
  >([]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      setIsDark(e.matches);
      isDarkRef.current = e.matches;
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const project = useCallback(
    (lat: number, lon: number, rotation: number, W: number, H: number) => {
      const r = Math.min(W, H) * 0.38;
      const adjustedLon = lon + rotation * (180 / Math.PI);
      const p = spherePoint(lat, adjustedLon, r);
      const visible = p.z > 0;
      const x = W / 2 + p.x;
      const y = H / 2 - p.y;
      const depth = (p.z + r) / (2 * r);
      return { x, y, visible, depth, z: p.z, r };
    },
    []
  );

  const spawnTransaction = useCallback(() => {
    const id = txCounterRef.current++;
    const color = GREEN_COLORS[Math.floor(Math.random() * GREEN_COLORS.length)];
    const fromSpawn = SPAWN_LOCATIONS[Math.floor(Math.random() * SPAWN_LOCATIONS.length)];
    let toSpawn = SPAWN_LOCATIONS[Math.floor(Math.random() * SPAWN_LOCATIONS.length)];
    while (toSpawn === fromSpawn) {
      toSpawn = SPAWN_LOCATIONS[Math.floor(Math.random() * SPAWN_LOCATIONS.length)];
    }
    transactionsRef.current.push({
      id,
      fromLat: fromSpawn[0] + randomBetween(-6, 6),
      fromLon: fromSpawn[1] + randomBetween(-12, 12),
      toLat: toSpawn[0] + randomBetween(-6, 6),
      toLon: toSpawn[1] + randomBetween(-12, 12),
      protocol: PROTOCOLS[Math.floor(Math.random() * PROTOCOLS.length)],
      currency: CURRENCIES[Math.floor(Math.random() * CURRENCIES.length)],
      amount: Math.floor(randomBetween(50, 5000)),
      progress: 0,
      speed: randomBetween(0.0015, 0.0025),
      color,
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    let W = 0, H = 0;
    const resize = () => {
      W = canvas.width = canvas.offsetWidth * devicePixelRatio;
      H = canvas.height = canvas.offsetHeight * devicePixelRatio;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = (timestamp: number) => {
      rotationRef.current += 0.0012;
      const rot = rotationRef.current;
      const dark = isDarkRef.current;

      if (timestamp - lastTxTimeRef.current > 2200) {
        lastTxTimeRef.current = timestamp;
        if (transactionsRef.current.length < 5) spawnTransaction();
      }

      ctx.clearRect(0, 0, W, H);
      const r = Math.min(W, H) * 0.38;
      const cx = W / 2, cy = H / 2;

      const atmoInner = dark ? "rgba(34,197,94,0.18)" : "rgba(34,197,94,0.18)";
      const atmoOuter = dark ? "rgba(22,163,74,0.10)" : "rgba(22,163,74,0.10)";
      const atmo = ctx.createRadialGradient(cx, cy, r * 0.9, cx, cy, r * 1.25);
      atmo.addColorStop(0, atmoInner);
      atmo.addColorStop(0.45, atmoOuter);
      atmo.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = atmo;
      ctx.beginPath();
      ctx.arc(cx, cy, r * 1.25, 0, Math.PI * 2);
      ctx.fill();

      const globeGrad = ctx.createRadialGradient(cx - r * 0.22, cy - r * 0.22, r * 0.04, cx, cy, r);
      if (dark) {
        globeGrad.addColorStop(0, "rgba(10,60,35,1)");
        globeGrad.addColorStop(0.55, "rgba(6,42,24,1)");
        globeGrad.addColorStop(1, "rgba(3,28,16,1)");
      } else {
        globeGrad.addColorStop(0, "rgba(240,253,244,1)");
        globeGrad.addColorStop(0.55, "rgba(220,252,231,1)");
        globeGrad.addColorStop(1, "rgba(187,247,208,1)");
      }
      ctx.fillStyle = globeGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();

      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, r - 1, 0, Math.PI * 2);
      ctx.clip();

      const graticuleColor = dark
        ? "rgba(34,197,94,0.04)"
        : "rgba(22,163,74,0.12)";
      ctx.lineWidth = 0.5;
      for (let latLine = -60; latLine <= 60; latLine += 30) {
        ctx.beginPath();
        ctx.strokeStyle = graticuleColor;
        let first = true;
        for (let lo = -180; lo <= 180; lo += 2) {
          const p = project(latLine, lo, rot, W, H);
          if (!p.visible) { first = true; continue; }
          if (first) { ctx.moveTo(p.x, p.y); first = false; }
          else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }
      for (let lonLine = -150; lonLine <= 180; lonLine += 30) {
        ctx.beginPath();
        ctx.strokeStyle = dark ? "rgba(34,197,94,0.025)" : "rgba(22,163,74,0.08)";
        let first = true;
        for (let la = -80; la <= 80; la += 2) {
          const p = project(la, lonLine, rot, W, H);
          if (!p.visible) { first = true; continue; }
          if (first) { ctx.moveTo(p.x, p.y); first = false; }
          else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }

      for (const dot of dotsRef.current) {
        const { x, y, visible, depth } = project(dot.lat, dot.lon, rot, W, H);
        if (!visible) continue;
        const alpha = (0.2 + depth * 0.7) * dot.brightness;
        const size = dot.size * (0.35 + depth * 0.95) * (W / 950);

        let fillColor: string;
        if (dark) {
          const g = Math.floor(170 + dot.brightness * 60);
          const b = Math.floor(70 + dot.brightness * 40);
          fillColor = `rgba(30,${g},${b},${alpha.toFixed(2)})`;
        } else {
          const g = Math.floor(155 + dot.brightness * 55);
          const b = Math.floor(80 + dot.brightness * 40);
          fillColor = `rgba(30,${g},${b},${(alpha * 0.9).toFixed(2)})`;
        }

        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = fillColor;
        ctx.fill();
      }

      ctx.restore();

      const newLabels: typeof labels = [];
      transactionsRef.current = transactionsRef.current.filter((tx) => {
        tx.progress += tx.speed;
        if (tx.progress > 1.35) return false;

        const from = project(tx.fromLat, tx.fromLon, rot, W, H);
        const to = project(tx.toLat, tx.toLon, rot, W, H);
        if (!from.visible && !to.visible) return true;

        const midX = (from.x + to.x) / 2;
        const midY = (from.y + to.y) / 2;
        const dx = midX - cx;
        const dy = midY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const lift = r * 0.5;
        const cpx = midX - (dx / dist) * lift;
        const cpy = midY - (dy / dist) * lift;

        const drawT = Math.max(0, Math.min(tx.progress, 1));
        const globalFade = Math.min(1, Math.min(tx.progress * 4, (1.35 - tx.progress) * 4));

        const steps = 80;
        for (let i = 1; i <= steps; i++) {
          const t0 = ((i - 1) / steps) * drawT;
          const t1 = (i / steps) * drawT;
          const x0 = (1-t0)*(1-t0)*from.x + 2*(1-t0)*t0*cpx + t0*t0*to.x;
          const y0 = (1-t0)*(1-t0)*from.y + 2*(1-t0)*t0*cpy + t0*t0*to.y;
          const x1 = (1-t1)*(1-t1)*from.x + 2*(1-t1)*t1*cpx + t1*t1*to.x;
          const y1 = (1-t1)*(1-t1)*from.y + 2*(1-t1)*t1*cpy + t1*t1*to.y;
          const segAlpha = (i / steps) * (dark ? 0.65 : 0.85) * globalFade;
          ctx.beginPath();
          ctx.moveTo(x0, y0);
          ctx.lineTo(x1, y1);
          ctx.strokeStyle = tx.color + Math.floor(segAlpha * 255).toString(16).padStart(2, "0");
          ctx.lineWidth = 1.6 * (W / 950);
          ctx.stroke();
        }

        const dotT = Math.min(tx.progress, 1);
        const dotX = (1-dotT)*(1-dotT)*from.x + 2*(1-dotT)*dotT*cpx + dotT*dotT*to.x;
        const dotY = (1-dotT)*(1-dotT)*from.y + 2*(1-dotT)*dotT*cpy + dotT*dotT*to.y;

        const orbR = 10 * (W / 950);
        const orbGlow = ctx.createRadialGradient(dotX, dotY, 0, dotX, dotY, orbR);
        orbGlow.addColorStop(0, tx.color + "ff");
        orbGlow.addColorStop(0.3, tx.color + "bb");
        orbGlow.addColorStop(1, tx.color + "00");
        ctx.fillStyle = orbGlow;
        ctx.beginPath();
        ctx.arc(dotX, dotY, orbR, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(dotX, dotY, 2.8 * (W / 950), 0, Math.PI * 2);
        ctx.fillStyle = dark ? "#eeffee" : "#ffffff";
        ctx.fill();

        if (from.visible && tx.progress < 0.35) {
          const p1 = tx.progress / 0.35;
          const pulseR = p1 * 22 * (W / 950);
          const pAlpha = (1 - p1) * 0.55 * globalFade;
          ctx.beginPath();
          ctx.arc(from.x, from.y, pulseR, 0, Math.PI * 2);
          ctx.strokeStyle = tx.color + Math.floor(pAlpha * 255).toString(16).padStart(2, "0");
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }

        if (to.visible && tx.progress > 0.78) {
          const p2 = (tx.progress - 0.78) / 0.57;
          const pulseR2 = Math.min(p2, 1) * 24 * (W / 950);
          const pAlpha2 = Math.max(0, 1 - p2) * 0.6;
          ctx.beginPath();
          ctx.arc(to.x, to.y, pulseR2, 0, Math.PI * 2);
          ctx.strokeStyle = tx.color + Math.floor(pAlpha2 * 255).toString(16).padStart(2, "0");
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }

        if (tx.progress > 0.06 && tx.progress < 1.28) {
          const fadeIn = Math.min(1, (tx.progress - 0.06) * 8);
          const fadeOut = Math.min(1, (1.28 - tx.progress) * 8);
          newLabels.push({
            id: tx.id,
            x: dotX / devicePixelRatio,
            y: dotY / devicePixelRatio,
            protocol: tx.protocol,
            currency: tx.currency,
            amount: tx.amount,
            color: tx.color,
            opacity: Math.min(fadeIn, fadeOut),
          });
        }

        return true;
      });

      setLabels(newLabels);

      const rim = ctx.createRadialGradient(cx, cy, r * 0.87, cx, cy, r * 1.01);
      rim.addColorStop(0, "rgba(34,197,94,0)");
      rim.addColorStop(0.65, dark ? "rgba(34,197,94,0.06)" : "rgba(22,163,74,0.12)");
      rim.addColorStop(1, dark ? "rgba(74,222,128,0.22)" : "rgba(22,163,74,0.5)");
      ctx.strokeStyle = rim;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();

      const spec = ctx.createRadialGradient(
        cx - r * 0.28, cy - r * 0.28, 0,
        cx - r * 0.28, cy - r * 0.28, r * 0.52
      );
      spec.addColorStop(0, dark ? "rgba(255,255,255,0.045)" : "rgba(255,255,255,0.22)");
      spec.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = spec;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();

      animFrameRef.current = requestAnimationFrame(draw);
    };

    animFrameRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [project, spawnTransaction]);

  return (
    <div className="relative w-screen h-screen overflow-hidden font-mono">
      <div
        className="absolute inset-0 pointer-events-none hidden dark:block"
        style={{
          backgroundImage: [
            "radial-gradient(1px 1px at 15% 25%, rgba(255,255,255,0.32) 0%, transparent 100%)",
            "radial-gradient(1px 1px at 82% 68%, rgba(255,255,255,0.22) 0%, transparent 100%)",
            "radial-gradient(1.5px 1.5px at 48% 18%, rgba(255,255,255,0.18) 0%, transparent 100%)",
            "radial-gradient(1px 1px at 9% 78%, rgba(255,255,255,0.16) 0%, transparent 100%)",
            "radial-gradient(1px 1px at 65% 88%, rgba(255,255,255,0.13) 0%, transparent 100%)",
            "radial-gradient(1px 1px at 72% 12%, rgba(255,255,255,0.12) 0%, transparent 100%)",
          ].join(", "),
          backgroundSize: "320px 320px, 410px 410px, 260px 260px, 370px 370px, 290px 290px, 340px 340px",
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none block dark:hidden opacity-30"
        style={{
          backgroundImage: "radial-gradient(circle, #bbf7d0 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <canvas ref={canvasRef} className="block w-full h-full" />
      {labels.map((label) => (
        <div
          key={label.id}
          className="absolute flex items-center gap-1.5 pointer-events-none select-none whitespace-nowrap rounded-lg px-3 py-1.5 backdrop-blur-md border"
          style={{
            left: label.x,
            top: label.y,
            transform: "translate(15px, -50%)",
            opacity: label.opacity,
            borderColor: label.color + "55",
            boxShadow: `0 0 18px ${label.color}22, 0 2px 10px rgba(0,0,0,0.18)`,
          }}
        >
          <div className="absolute inset-0 rounded-lg bg-white/80 dark:bg-black/80" />
          <span className="relative text-sm leading-none z-10">{label.protocol.icon}</span>
          <span className="relative z-10 text-[11px] font-bold tracking-wide text-green-900 dark:text-green-100">
            ${label.amount.toLocaleString()}{" "}
            <span className="font-extrabold" style={{ color: label.color }}>
              {label.currency}
            </span>
          </span>
        </div>
      ))}



      <style>{`
        @keyframes gpulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.25; }
        }
        .live-dot {
          animation: gpulse 2.8s ease-in-out infinite;
          box-shadow: 0 0 8px #16a34a, 0 0 18px #22c55e55;
        }
        @media (prefers-color-scheme: dark) {
          .live-dot {
            box-shadow: 0 0 10px #4ade80, 0 0 22px #22c55e44;
          }
        }
      `}</style>
    </div>
  );
}