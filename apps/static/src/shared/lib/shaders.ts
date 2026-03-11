export const vertexShader = `
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

export const fluidShader = `
    precision highp float;
    varying vec2 vUv;

    uniform sampler2D previousFrame;
    uniform vec4 mouse; // x, y, prevX, prevY
    uniform float time;
    uniform float brushSize;
    uniform float brushStrength;
    uniform float decay;
    uniform float cursorAlpha;

    void main() {
        vec2 uv = vUv;
        vec4 prev = texture2D(previousFrame, uv);
        
        vec2 mouseDir = mouse.xy - mouse.zw;
        float d = distance(uv, mouse.xy);
        
        float strength = exp(-d * d / brushSize) * cursorAlpha;
        vec2 velocity = mouseDir * strength * brushStrength;
        
        vec2 advectedUv = uv - prev.xy * 0.01;
        vec4 advected = texture2D(previousFrame, advectedUv);
        
        vec2 finalVel = advected.xy + velocity;
        
        finalVel *= decay;
        
        gl_FragColor = vec4(finalVel, 0.0, 1.0);
    }
`;

export const displayShader = `
    precision highp float;
    varying vec2 vUv;

    uniform sampler2D fluidInput;
    uniform vec3 color1;
    uniform vec3 color2;
    uniform vec3 color3;
    uniform vec3 color4;
    uniform float intensity;
    uniform float softness;
    uniform float time;

    float noise(vec2 p) {
        return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
    }

    void main() {
        vec2 fluid = texture2D(fluidInput, vUv).xy;
       
        vec2 distortedUv = vUv - fluid * intensity * softness;
        
        vec3 top = mix(color1, color2, distortedUv.x);
        vec3 bottom = mix(color3, color4, distortedUv.x);
        vec3 finalColor = mix(top, bottom, distortedUv.y);
        
        float velocityStrength = length(fluid);
        finalColor += velocityStrength * 0.15;
        
        float n = (noise(vUv + time) - 0.5) * 0.03;
        finalColor += n;

        gl_FragColor = vec4(finalColor, 1.0);
    }
`;