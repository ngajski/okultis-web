import { useEffect, useRef } from "react"

export function LiquidEffectAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const script = document.createElement("script")
    script.type = "module"
    script.textContent = `
      import LiquidBackground from 'https://cdn.jsdelivr.net/npm/threejs-components@0.0.22/build/backgrounds/liquid1.min.js';

      const canvas = document.getElementById('liquid-canvas');
      if (canvas) {
        const app = LiquidBackground(canvas);
        app.liquidPlane.material.metalness = 0.75;
        app.liquidPlane.material.roughness = 0.25;
        app.liquidPlane.uniforms.displacementScale.value = 5;
        app.setRain(false);
        window.__liquidApp = app;

        // Remove library branding
        setTimeout(() => {
          document.querySelectorAll('a[href*="21st.dev"], a[href*="threejs-components"]').forEach(el => {
            const parent = el.closest('div');
            if (parent && parent !== document.getElementById('root')) parent.remove();
            else el.remove();
          });
        }, 1000);
      }
    `
    document.body.appendChild(script)

    return () => {
      if (window.__liquidApp && window.__liquidApp.dispose) {
        window.__liquidApp.dispose()
      }
      if (script.parentNode) {
        document.body.removeChild(script)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      id="liquid-canvas"
      className="absolute inset-0 w-full h-full touch-none"
    />
  )
}

declare global {
  interface Window {
    __liquidApp?: {
      dispose?: () => void
      loadImage: (url: string) => void
      liquidPlane: {
        material: { metalness: number; roughness: number }
        uniforms: { displacementScale: { value: number } }
      }
      setRain: (enabled: boolean) => void
    }
  }
}
