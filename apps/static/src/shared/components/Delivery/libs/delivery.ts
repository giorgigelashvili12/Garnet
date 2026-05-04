
export interface Point {
    x: number;
    y: number;
  }
  
  export interface Stage {
    id: number;
    status: string;
    sub: string;
    routeT: number;
    showDasher: boolean;
    showReceipt: boolean;
  }
  
  export const MAP_W = 280;
  export const MAP_H = 300;
  
  export const ROUTE_PTS: Point[] = [
    { x: 196, y: 58 },
    { x: 196, y: 100 },
    { x: 196, y: 140 },
    { x: 140, y: 140 },
    { x: 140, y: 195 },
    { x: 82,  y: 195 },
    { x: 82,  y: 230 },
  ];
  
  function dist(a: Point, b: Point) {
    return Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2);
  }
  
  export const SEG_LENGTHS: number[] = ROUTE_PTS.slice(0, -1).map((p, i) =>
    dist(p, ROUTE_PTS[i + 1])
  );
  
  export const TOTAL_LENGTH: number = SEG_LENGTHS.reduce((a, b) => a + b, 0);

  export const CUMULATIVE_LENGTHS: number[] = (() => {
    const cum: number[] = [0];
    for (let i = 0; i < SEG_LENGTHS.length; i++) {
      cum.push(cum[i] + SEG_LENGTHS[i]);
    }
    return cum;
  })();

  function segmentIndexForDist(d: number): number {
    let lo = 0;
    let hi = SEG_LENGTHS.length - 1;
    while (lo < hi) {
      const mid = (lo + hi) >>> 1;
      if (CUMULATIVE_LENGTHS[mid + 1] < d) lo = mid + 1;
      else hi = mid;
    }
    return lo;
  }

  export function pointAtT(t: number): Point {
    const clamped = Math.max(0, Math.min(t, 1));
    if (clamped >= 1) return ROUTE_PTS[ROUTE_PTS.length - 1];
    if (clamped <= 0) return ROUTE_PTS[0];

    const targetDist = clamped * TOTAL_LENGTH;
    const i = segmentIndexForDist(targetDist);
    const remaining = targetDist - CUMULATIVE_LENGTHS[i];
    const frac = remaining / SEG_LENGTHS[i];
    const a = ROUTE_PTS[i];
    const b = ROUTE_PTS[i + 1];
    return {
      x: a.x + (b.x - a.x) * frac,
      y: a.y + (b.y - a.y) * frac,
    };
  }
  
  export function partialRoutePoints(t: number): string {
    const clamped = Math.max(0, Math.min(t, 1));
    if (clamped <= 0) return `${ROUTE_PTS[0].x},${ROUTE_PTS[0].y}`;
    if (clamped >= 1) return GHOST_POINTS_STR;

    const targetDist = clamped * TOTAL_LENGTH;
    const segIdx = segmentIndexForDist(targetDist);
    const remaining = targetDist - CUMULATIVE_LENGTHS[segIdx];
    const frac = Math.min(remaining / SEG_LENGTHS[segIdx], 1);
    const a = ROUTE_PTS[segIdx];
    const b = ROUTE_PTS[segIdx + 1];

    const parts: string[] = [];
    for (let i = 0; i <= segIdx; i++) {
      parts.push(`${ROUTE_PTS[i].x},${ROUTE_PTS[i].y}`);
    }
    parts.push(`${a.x + (b.x - a.x) * frac},${a.y + (b.y - a.y) * frac}`);
    return parts.join(" ");
  }

  export const GHOST_POINTS_STR: string = ROUTE_PTS.map(
    (p) => `${p.x},${p.y}`
  ).join(" ");
  
  export const STAGES: Stage[] = [
    {
      id: 0,
      status: "Food is being prepared",
      sub: "Curry Up Now · 5 min away",
      routeT: 0,
      showDasher: false,
      showReceipt: false,
    },
    {
      id: 1,
      status: "Food is being prepared",
      sub: "Curry Up Now · 5 min away",
      routeT: 0,
      showDasher: true,
      showReceipt: false,
    },
    {
      id: 2,
      status: "On the way!",
      sub: "Curry Up Now · 5 min away",
      routeT: 0.55,
      showDasher: true,
      showReceipt: false,
    },
    {
      id: 3,
      status: "Dasher approaching.",
      sub: "Curry Up Now · Arriving",
      routeT: 0.92,
      showDasher: true,
      showReceipt: false,
    },
    {
      id: 4,
      status: "Enjoy!",
      sub: "Curry Up Now · Delivered",
      routeT: 1,
      showDasher: true,
      showReceipt: true,
    },
  ];
  
  export interface Block {
    x: number;
    y: number;
    w: number;
    h: number;
  }
  
  export const MAP_BLOCKS: Block[] = [
    { x: 1,   y: 1,   w: 79,  h: 54 },
    { x: 96,  y: 1,   w: 64,  h: 54 },
    { x: 176, y: 1,   w: 103, h: 54 },
    { x: 1,   y: 66,  w: 69,  h: 64 },
    { x: 86,  y: 66,  w: 80,  h: 64 },
    { x: 181, y: 66,  w: 98,  h: 64 },
    { x: 1,   y: 151, w: 64,  h: 34 },
    { x: 81,  y: 151, w: 50,  h: 34 },
    { x: 151, y: 151, w: 128, h: 34 },
    { x: 1,   y: 206, w: 74,  h: 54 },
    { x: 96,  y: 206, w: 75,  h: 54 },
    { x: 186, y: 206, w: 93,  h: 54 },
    { x: 1,   y: 271, w: 109, h: 28 },
    { x: 126, y: 271, w: 153, h: 28 },
  ];

  export const MAP_BLOCKS_MOBILE: Block[] = [
    { x: 1,   y: 1,   w: 79,  h: 54 },
    { x: 176, y: 1,   w: 103, h: 54 },
    { x: 1,   y: 66,  w: 69,  h: 64 },
    { x: 181, y: 66,  w: 98,  h: 64 },
    { x: 151, y: 151, w: 128, h: 34 },
    { x: 1,   y: 206, w: 74,  h: 54 },
    { x: 186, y: 206, w: 93,  h: 54 },
    { x: 126, y: 271, w: 153, h: 28 },
  ];
  
  export const RECEIPT_ITEMS = [
    { label: "DoorDash base fee", value: "$1.00" },
    { label: "Restaurant total",  value: "$11.00" },
    { label: "Delivery fee",      value: "$2.00" },
    { label: "Customer tip",      value: "$3.00" },
  ] as const;