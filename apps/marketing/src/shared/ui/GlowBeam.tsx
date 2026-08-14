import React, { useEffect, useRef } from "react";

interface GlowBeamProps {
  colorA?: string;
  colorB?: string;
  colorMid?: string;
  angle?: number;
  thickness?: number;
  softness?: number;
  glowIntensity?: number;
  speed?: number;
  wiggle?: number;
  className?: string;
}

const hexToVec3 = (input: string): [number, number, number] => {
  if (!input) return [0, 0, 0];

  if (input.startsWith("rgb")) {
    const parts = input.match(/\d+/g);
    if (parts && parts.length >= 3) {
      return [
        parseInt(parts[0], 10) / 255,
        parseInt(parts[1], 10) / 255,
        parseInt(parts[2], 10) / 255,
      ];
    }
  }

  // Handle hex
  const safeHex = input.startsWith("#") ? input : "#000000";
  const c = safeHex.replace("#", "");
  const fullHex = c.length === 3 
    ? c.split("").map(h => h + h).join("") 
    : c.padEnd(6, "0");

  return [
    (parseInt(fullHex.slice(0, 2), 16) || 0) / 255,
    (parseInt(fullHex.slice(2, 4), 16) || 0) / 255,
    (parseInt(fullHex.slice(4, 6), 16) || 0) / 255,
  ];
};

const VERT = `
attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

const FRAG = `
precision highp float;

uniform vec2 u_res;
uniform float u_time;

uniform vec3 u_colorA;
uniform vec3 u_colorB;
uniform vec3 u_colorMid;

uniform float u_angle;
uniform float u_thickness;
uniform float u_softness;
uniform float u_glow;
uniform float u_wiggle;

void main() {
  vec2 uv = (gl_FragCoord.xy / u_res) - 0.5;

  float aspect = u_res.x / u_res.y;
  uv.x *= aspect;

  float cosA = cos(-u_angle);
  float sinA = sin(-u_angle);

  vec2 ruv = vec2(
    cosA * uv.x - sinA * uv.y,
    sinA * uv.x + cosA * uv.y
  );

  float wave = sin(ruv.x * 5.0 - u_time * 2.0) * (u_wiggle * 0.05);

  float dist = abs(ruv.y + wave);

  float halfW = u_thickness * 0.5;

  float core = smoothstep(
    halfW + (u_softness * 0.05),
    halfW - (u_softness * 0.05),
    dist
  );

  float glow = exp(
    -pow(dist / (halfW * (1.0 + u_softness * 8.0)), 2.0)
  ) * u_glow;

  float t = clamp(ruv.x / (aspect * 1.4) + 0.5, 0.0, 1.0);

  vec3 baseCol =
    (t < 0.5)
      ? mix(u_colorA, u_colorMid, t * 2.0)
      : mix(u_colorMid, u_colorB, (t - 0.5) * 2.0);

  float noise = sin(ruv.x * 25.0 - u_time * 4.0) * 0.04;

  vec3 final = (baseCol + noise) * (core + glow);

  gl_FragColor = vec4(final, (core + glow * 0.4));
}
`;

const compileShader = (
  gl: WebGLRenderingContext,
  type: number,
  src: string
): WebGLShader => {
  const shader = gl.createShader(type)!;

  gl.shaderSource(shader, src);
  gl.compileShader(shader);

  return shader;
};

const createProgram = (gl: WebGLRenderingContext): WebGLProgram => {
  const program = gl.createProgram()!;

  gl.attachShader(program, compileShader(gl, gl.VERTEX_SHADER, VERT));
  gl.attachShader(program, compileShader(gl, gl.FRAGMENT_SHADER, FRAG));

  gl.linkProgram(program);

  return program;
};

export const GlowBeam: React.FC<GlowBeamProps> = ({
  colorA = "var(--color-a)",
  colorB = "var(--color-b)",
  colorMid = "var(--color-mid)",
  angle = 45,
  thickness = 0.05,
  softness = 0.15,
  glowIntensity = 2.0,
  speed = 1.0,
  wiggle = 0.5,
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const stateRef = useRef({
    colorA,
    colorB,
    colorMid,
    angle,
    thickness,
    softness,
    glowIntensity,
    speed,
    wiggle,
  });

  useEffect(() => {
    stateRef.current = {
      colorA,
      colorB,
      colorMid,
      angle,
      thickness,
      softness,
      glowIntensity,
      speed,
      wiggle,
    };
  }, [
    colorA,
    colorB,
    colorMid,
    angle,
    thickness,
    softness,
    glowIntensity,
    speed,
    wiggle,
  ]);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      antialias: true,
      alpha: true,
    })!;

    const program = createProgram(gl);

    gl.useProgram(program);

    const buffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );

    const posLoc = gl.getAttribLocation(program, "a_pos");

    gl.enableVertexAttribArray(posLoc);

    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const u = (name: string) => gl.getUniformLocation(program, name);

    const locations = {
      res: u("u_res"),
      time: u("u_time"),
      cA: u("u_colorA"),
      cB: u("u_colorB"),
      cM: u("u_colorMid"),
      angle: u("u_angle"),
      thick: u("u_thickness"),
      soft: u("u_softness"),
      glow: u("u_glow"),
      wiggle: u("u_wiggle"),
    };

    let raf: number;

    const render = (t: number) => {
      const s = stateRef.current;

      const resolve = (val: string) => {
        if (val.startsWith("var(")) {
          const varName = val.match(/var\((--[^)]+)\)/)?.[1];
          if (varName) {
            return getComputedStyle(canvas).getPropertyValue(varName).trim() || "#000000";
          }
        }
        return val;
      };

      const dpr = window.devicePixelRatio || 1;

      const w = canvas.clientWidth * dpr;
      const h = canvas.clientHeight * dpr;

      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;

        gl.viewport(0, 0, w, h);
      }

      const cA = hexToVec3(resolve(s.colorA));
      const cB = hexToVec3(resolve(s.colorB));
      const cM = hexToVec3(resolve(s.colorMid));

      gl.uniform2f(locations.res, w, h);

      gl.uniform1f(locations.time, t * 0.001 * s.speed);

      gl.uniform3f(locations.cA, cA[0], cA[1], cA[2]);
      gl.uniform3f(locations.cB, cB[0], cB[1], cB[2]);
      gl.uniform3f(locations.cM, cM[0], cM[1], cM[2]);

      gl.uniform1f(locations.angle, (s.angle * Math.PI) / 180);
      gl.uniform1f(locations.thick, s.thickness);
      gl.uniform1f(locations.soft, s.softness);
      gl.uniform1f(locations.glow, s.glowIntensity);
      gl.uniform1f(locations.wiggle, s.wiggle);

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      raf = requestAnimationFrame(render);
    };

    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);

      gl.deleteProgram(program);
      gl.deleteBuffer(buffer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`block w-full h-full pointer-events-none bg-(--background) ${className}`}
    />
  );
};

export default GlowBeam;
