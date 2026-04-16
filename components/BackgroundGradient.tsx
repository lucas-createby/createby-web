'use client'

import { useEffect, useRef } from 'react'

// Palette from createby.no, slightly lightened for warmth
const BLOBS = [
  { r: 242, g: 238, b: 223, phase: 0.0,  phaseSpd: 0.00018, ampX: 0.28, ampY: 0.18, baseX: 0.15, baseY: 0.25, rx: 0.55, ry: 0.40 },
  { r: 215, g: 228, b: 236, phase: 1.2,  phaseSpd: 0.00014, ampX: 0.22, ampY: 0.25, baseX: 0.75, baseY: 0.20, rx: 0.50, ry: 0.45 },
  { r: 221, g: 223, b: 210, phase: 2.4,  phaseSpd: 0.00020, ampX: 0.30, ampY: 0.20, baseX: 0.50, baseY: 0.65, rx: 0.60, ry: 0.35 },
  { r: 225, g: 218, b: 224, phase: 3.6,  phaseSpd: 0.00016, ampX: 0.25, ampY: 0.22, baseX: 0.20, baseY: 0.75, rx: 0.48, ry: 0.42 },
  { r: 242, g: 238, b: 223, phase: 4.8,  phaseSpd: 0.00012, ampX: 0.20, ampY: 0.28, baseX: 0.80, baseY: 0.70, rx: 0.52, ry: 0.38 },
  { r: 215, g: 228, b: 236, phase: 0.7,  phaseSpd: 0.00017, ampX: 0.26, ampY: 0.16, baseX: 0.45, baseY: 0.35, rx: 0.45, ry: 0.50 },
]

export default function BackgroundGradient() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let W = 0, H = 0
    let rafId = 0

    function resize() {
      W = window.innerWidth
      H = window.innerHeight
      canvas!.width = W
      canvas!.height = H
    }

    function draw() {
      const t = performance.now()
      ctx!.clearRect(0, 0, W, H)

      for (const b of BLOBS) {
        const cx = (b.baseX + Math.cos(t * b.phaseSpd + b.phase) * b.ampX) * W
        const cy = (b.baseY + Math.sin(t * b.phaseSpd * 0.71 + b.phase + 1.5) * b.ampY) * H
        const rx = b.rx * Math.max(W, H)
        const ry = b.ry * Math.max(W, H)

        ctx!.save()
        ctx!.translate(cx, cy)
        ctx!.scale(1, ry / rx)

        const grad = ctx!.createRadialGradient(0, 0, 0, 0, 0, rx)
        grad.addColorStop(0,   `rgba(${b.r},${b.g},${b.b},0.55)`)
        grad.addColorStop(0.4, `rgba(${b.r},${b.g},${b.b},0.25)`)
        grad.addColorStop(0.75,`rgba(${b.r},${b.g},${b.b},0.07)`)
        grad.addColorStop(1,   `rgba(${b.r},${b.g},${b.b},0)`)

        ctx!.fillStyle = grad
        ctx!.fillRect(-rx, -rx, rx * 2, rx * 2)
        ctx!.restore()
      }

      rafId = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    rafId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
      }}
    />
  )
}
