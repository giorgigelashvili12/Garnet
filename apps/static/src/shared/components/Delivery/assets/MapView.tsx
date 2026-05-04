"use client";

import React, { useMemo, memo } from "react";
import { AnimatePresence, motion, MotionValue, useTransform } from "framer-motion";
import {
  MAP_BLOCKS,
  MAP_BLOCKS_MOBILE,
  MAP_H,
  MAP_W,
  GHOST_POINTS_STR,
  ROUTE_PTS,
  TOTAL_LENGTH,
  pointAtT,
} from "../libs/delivery";
import type { DeviceClass } from "../libs/useDeviceClass";
import type { Block } from "../libs/delivery";

interface MapViewProps {
  routeT: MotionValue<number>;
  dasherT: MotionValue<number>;
  dasherVisible: boolean;
  showPriceTag: boolean;
  deviceClass: DeviceClass;
  isDark?: boolean;
}

const RESTAURANT = ROUTE_PTS[0];
const HOME       = ROUTE_PTS[ROUTE_PTS.length - 1];

const CityBlocks = React.memo(function CityBlocks({
  blocks,
  fill,
}: {
  blocks: Block[];
  fill: string;
}) {
  return (
    <>
      {blocks.map((b, i) => (
        <rect
          key={i}
          x={b.x}
          y={b.y}
          width={b.w}
          height={b.h}
          fill={fill}
          rx={3}
        />
      ))}
    </>
  );
});

export default memo(function MapView({
  routeT,
  dasherT,
  dasherVisible,
  showPriceTag,
  deviceClass,
  isDark = false,
}: MapViewProps) {
  const isMobile = deviceClass === "mobile";

  const mapBg       = isDark ? "#0f1724" : "#dde4ef";
  const blockFill   = isDark ? "#1e2a3d" : "#edf0f7";
  const ghostStroke = isDark ? "#2e3f5c" : "#b8c2d4";
  const routeStroke = isDark ? "#93c5fd" : "#1B2B4B";
  const pinFill     = isDark ? "#1e40af" : "#1B2B4B";
  const pillBg      = isDark ? "#1e293b" : "white";
  const pillBorder  = isDark ? "#2e3f5c" : "#dde4ef";
  const pillText    = isDark ? "#93c5fd" : "#1B2B4B";

  const routeDashOffset = useTransform(routeT, (t) => TOTAL_LENGTH * (1 - t));

  const dasherX = useTransform(dasherT, (t) => pointAtT(t).x - RESTAURANT.x);
  const dasherY = useTransform(dasherT, (t) => pointAtT(t).y - RESTAURANT.y);

  const pulseDisplay = useTransform(dasherT, (t) =>
    !isMobile && t > 0.85 && t < 1 ? "block" : "none"
  );

  const blocks = useMemo(
    () => (isMobile ? MAP_BLOCKS_MOBILE : MAP_BLOCKS),
    [isMobile]
  );

  return (
    <svg
      width={MAP_W}
      height={MAP_H}
      viewBox={`0 0 ${MAP_W} ${MAP_H}`}
      className="block"
    >
      <rect width={MAP_W} height={MAP_H} fill={mapBg} />

      <CityBlocks blocks={blocks} fill={blockFill} />

      <polyline
        points={GHOST_POINTS_STR}
        fill="none"
        stroke={ghostStroke}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="6 5"
      />

      <motion.polyline
        points={GHOST_POINTS_STR}
        fill="none"
        stroke={routeStroke}
        strokeWidth={3.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={TOTAL_LENGTH}
        style={{
          strokeDashoffset: routeDashOffset,
          willChange: "stroke-dashoffset",
        }}
      />

      <g>
        <circle cx={RESTAURANT.x} cy={RESTAURANT.y} r={15} fill={pinFill} />
        <text
          x={RESTAURANT.x}
          y={RESTAURANT.y}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={13}
          fill="white"
          fontFamily="sans-serif"
        >
          ✕
        </text>
      </g>

      <AnimatePresence>
        {showPriceTag && (
          <motion.g
            key="price-tag"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <rect
              x={RESTAURANT.x + 18}
              y={RESTAURANT.y - 13}
              width={50}
              height={26}
              rx={13}
              fill={pillBg}
              stroke={pillBorder}
              strokeWidth={1}
            />
            <text
              x={RESTAURANT.x + 43}
              y={RESTAURANT.y + 1}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={11}
              fontWeight={700}
              fill={pillText}
              fontFamily="sans-serif"
            >
              $11.00
            </text>
          </motion.g>
        )}
      </AnimatePresence>

      <g>
        <circle cx={HOME.x} cy={HOME.y} r={15} fill={pinFill} />
        <text
          x={HOME.x}
          y={HOME.y}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={14}
          fill="white"
          fontFamily="sans-serif"
        >
          ⌂
        </text>
      </g>

      <AnimatePresence>
        {dasherVisible && (
          <motion.g
            key="dasher"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              x: dasherX,
              y: dasherY,
              willChange: "transform",
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
          >
            {!isMobile && (
              <motion.circle
                cx={RESTAURANT.x}
                cy={RESTAURANT.y}
                r={20}
                fill="none"
                stroke="#E8402A"
                strokeWidth={2}
                style={{ display: pulseDisplay }}
                animate={{ scale: [1, 1.5, 1], opacity: [0.7, 0, 0.7] }}
                transition={{ repeat: Infinity, duration: 1 }}
              />
            )}
            <circle cx={RESTAURANT.x} cy={RESTAURANT.y} r={14} fill="#E8402A" />
            <text
              x={RESTAURANT.x}
              y={RESTAURANT.y}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={11}
              fill="white"
              fontFamily="sans-serif"
            >
              🚗
            </text>
          </motion.g>
        )}
      </AnimatePresence>
    </svg>
  );
});
