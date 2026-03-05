import { useEffect, useRef } from 'react'

const VERTEX_SHADER_SOURCE = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`

const FRAGMENT_SHADER_SOURCE = `
  precision highp float;

  uniform float u_time;
  uniform vec2 u_resolution;

  // Hash function for pseudo-random values
  float hash(vec2 p) {
    p = fract(p * vec2(234.34, 435.345));
    p += dot(p, p + 34.23);
    return fract(p.x * p.y);
  }

  // Smooth noise
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);

    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));

    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  }

  // Fractal Brownian Motion
  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    for (int i = 0; i < 5; i++) {
      value += amplitude * noise(p * frequency);
      amplitude *= 0.5;
      frequency *= 2.1;
    }
    return value;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    uv.y = 1.0 - uv.y;

    // Slow drift over time
    float t = u_time * 0.04;

    // Two layers of fbm for complexity
    vec2 q = vec2(
      fbm(uv + vec2(0.0, t)),
      fbm(uv + vec2(5.2, 1.3 + t))
    );

    vec2 r = vec2(
      fbm(uv + 4.0 * q + vec2(1.7, 9.2) + t * 0.15),
      fbm(uv + 4.0 * q + vec2(8.3, 2.8) + t * 0.12)
    );

    float f = fbm(uv + 4.0 * r);

    // Base dark background color (#0a0a0f)
    vec3 bgColor = vec3(0.039, 0.039, 0.059);

    // Accent color (#00d4ff) tinted highlight
    vec3 accentColor = vec3(0.0, 0.831, 1.0);

    // Subtle card color for mid tones (#12121a)
    vec3 midColor = vec3(0.071, 0.071, 0.102);

    // Blend colors based on noise value
    vec3 color = mix(bgColor, midColor, clamp(f * f * 3.0, 0.0, 1.0));
    color = mix(color, accentColor, clamp(f * f * f * 0.6, 0.0, 1.0));

    // Radial vignette — keep center darker, subtle glow
    float dist = length(uv - vec2(0.5, 0.4));
    float vignette = 1.0 - smoothstep(0.3, 0.9, dist);
    color *= mix(0.92, 1.0, vignette);

    // Keep overall brightness very low to stay background-like
    color *= 0.25;

    gl_FragColor = vec4(color, 1.0);
  }
`

function createShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string,
): WebGLShader {
  const shader = gl.createShader(type)
  if (!shader) throw new Error('Failed to create WebGL shader')
  gl.shaderSource(shader, source)
  gl.compileShader(shader)

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(shader)
    gl.deleteShader(shader)
    throw new Error(`Shader compile error: ${log ?? 'unknown'}`)
  }

  return shader
}

function createProgram(
  gl: WebGLRenderingContext,
  vertexShader: WebGLShader,
  fragmentShader: WebGLShader,
): WebGLProgram {
  const program = gl.createProgram()
  if (!program) throw new Error('Failed to create WebGL program')
  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const log = gl.getProgramInfoLog(program)
    gl.deleteProgram(program)
    throw new Error(`Program link error: ${log ?? 'unknown'}`)
  }

  return program
}

/**
 * Renders a procedural WebGL noise background. Positioned fixed behind all
 * page content. The shader generates layered fBm noise with the Okultis
 * accent colour (#00d4ff) tinting subtly at noise peaks.
 *
 * NOTE: Not yet integrated into HeroSection — awaiting design decision.
 */
const ProceduralGroundBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl')
    if (!gl) {
      // WebGL unavailable — the solid CSS background fallback will show
      return
    }

    let program: WebGLProgram
    let animationFrameId: number
    let startTime = performance.now()

    try {
      const vertexShader = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER_SOURCE)
      const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SOURCE)
      program = createProgram(gl, vertexShader, fragmentShader)
    } catch (error) {
      console.error('[ProceduralGroundBackground]', error)
      return
    }

    // Full-screen quad covering clip space
    const positions = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1])
    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW)

    const positionLocation = gl.getAttribLocation(program, 'a_position')
    const timeLocation = gl.getUniformLocation(program, 'u_time')
    const resolutionLocation = gl.getUniformLocation(program, 'u_resolution')

    function resizeCanvas() {
      if (!canvas) return
      const dpr = Math.min(window.devicePixelRatio, 2)
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      gl!.viewport(0, 0, canvas.width, canvas.height)
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    function render() {
      const elapsed = (performance.now() - startTime) / 1000

      gl!.useProgram(program)
      gl!.bindBuffer(gl!.ARRAY_BUFFER, buffer)
      gl!.enableVertexAttribArray(positionLocation)
      gl!.vertexAttribPointer(positionLocation, 2, gl!.FLOAT, false, 0, 0)
      gl!.uniform1f(timeLocation, elapsed)
      gl!.uniform2f(resolutionLocation, canvas!.width, canvas!.height)
      gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4)

      animationFrameId = requestAnimationFrame(render)
    }

    startTime = performance.now()
    render()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrameId)
      gl.deleteBuffer(buffer)
      gl.deleteProgram(program)
    }
  }, [])

  return (
    <div className="absolute inset-0 w-full h-full bg-bg -z-10">
      <canvas
        ref={canvasRef}
        className="w-full h-full block touch-none"
        style={{ filter: 'contrast(1.1) brightness(0.9)' }}
      />
    </div>
  )
}

export default ProceduralGroundBackground
