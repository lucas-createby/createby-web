'use client'

import { useEffect, useRef } from 'react'

function createNoise2D(seed: number) {
  const perm = new Uint8Array(512)
  const p = new Uint8Array(256)
  for (let i = 0; i < 256; i++) p[i] = i
  let s = seed
  for (let i = 255; i > 0; i--) {
    s = (s * 1664525 + 1013904223) & 0xffffffff
    const j = ((s >>> 0) % (i + 1))
    ;[p[i], p[j]] = [p[j], p[i]]
  }
  for (let i = 0; i < 512; i++) perm[i] = p[i & 255]

  const F2 = 0.5 * (Math.sqrt(3) - 1)
  const G2 = (3 - Math.sqrt(3)) / 6
  const grad2 = [
    [1, 1], [-1, 1], [1, -1], [-1, -1],
    [1, 0], [-1, 0], [0, 1], [0, -1],
  ]

  return function noise(xin: number, yin: number): number {
    const s2 = (xin + yin) * F2
    const i = Math.floor(xin + s2)
    const j = Math.floor(yin + s2)
    const t = (i + j) * G2
    const x0 = xin - (i - t)
    const y0 = yin - (j - t)
    const i1 = x0 > y0 ? 1 : 0
    const j1 = x0 > y0 ? 0 : 1
    const x1 = x0 - i1 + G2
    const y1 = y0 - j1 + G2
    const x2 = x0 - 1 + 2 * G2
    const y2 = y0 - 1 + 2 * G2
    const ii = i & 255
    const jj = j & 255
    const gi0 = perm[ii + perm[jj]] % 8
    const gi1 = perm[ii + i1 + perm[jj + j1]] % 8
    const gi2 = perm[ii + 1 + perm[jj + 1]] % 8
    let n0 = 0, n1 = 0, n2 = 0
    let t0 = 0.5 - x0 * x0 - y0 * y0
    if (t0 >= 0) { t0 *= t0; n0 = t0 * t0 * (grad2[gi0][0] * x0 + grad2[gi0][1] * y0) }
    let t1 = 0.5 - x1 * x1 - y1 * y1
    if (t1 >= 0) { t1 *= t1; n1 = t1 * t1 * (grad2[gi1][0] * x1 + grad2[gi1][1] * y1) }
    let t2 = 0.5 - x2 * x2 - y2 * y2
    if (t2 >= 0) { t2 *= t2; n2 = t2 * t2 * (grad2[gi2][0] * x2 + grad2[gi2][1] * y2) }
    return 70 * (n0 + n1 + n2)
  }
}

interface Point {
  x: number; y: number
  wx: number; wy: number
  cx: number; cy: number; cvx: number; cvy: number
}

export default function HeroCanvas() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const wrapper = wrapperRef.current
    const svg = svgRef.current
    if (!wrapper || !svg) return

    const noise = createNoise2D(42)
    const xGap = 27
    const yGap = 10

    const mouse = { x: 0, y: 0, sx: 0, sy: 0, vs: 0 }
    let points: Point[][] = []
    let paths: SVGPathElement[] = []
    let rafId = 0
    let W = 0, H = 0

    function build(w: number, h: number) {
      W = w; H = h
      const svg = svgRef.current
      if (!svg) return
      svg.setAttribute('width', String(w))
      svg.setAttribute('height', String(h))

      // clear old paths
      while (svg.firstChild) svg.removeChild(svg.firstChild)
      paths = []
      points = []

      const totalLines = Math.ceil((w + 200) / xGap)
      const totalPoints = Math.ceil((h + 30) / yGap)
      const xStart = (w - xGap * (totalLines - 1)) / 2
      const yStart = (h - yGap * (totalPoints - 1)) / 2

      for (let li = 0; li < totalLines; li++) {
        const line: Point[] = []
        for (let pi = 0; pi < totalPoints; pi++) {
          line.push({
            x: xStart + li * xGap,
            y: yStart + pi * yGap,
            wx: 0, wy: 0,
            cx: 0, cy: 0, cvx: 0, cvy: 0,
          })
        }
        points.push(line)

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
        path.setAttribute('fill', 'none')
        path.setAttribute('stroke', '#1c1917')
        path.setAttribute('stroke-width', '1')
        path.setAttribute('stroke-opacity', '0.12')
        svg.appendChild(path)
        paths.push(path)
      }
    }

    function frame() {
      const time = performance.now()
      const speedMult = 0.001
      const ampMult = 1.0
      const l = 175

      for (let li = 0; li < points.length; li++) {
        const line = points[li]
        let d = ''
        for (let pi = 0; pi < line.length; pi++) {
          const p = line[pi]

          // Wave
          const base = noise(p.x * 0.003, p.y * 0.002) * 8
          const move = base + time * speedMult
          p.wx = Math.cos(move) * 12 * ampMult
          p.wy = Math.sin(move) * 6 * ampMult

          // Mouse spring
          const dx = p.x - mouse.sx
          const dy = p.y - mouse.sy
          const dist = Math.hypot(dx, dy)
          if (dist < l) {
            const s = 1 - dist / l
            const f = Math.cos(dist * 0.001) * s * l * mouse.vs * 0.00035
            const a = Math.atan2(dy, dx)
            p.cvx += Math.cos(a) * f
            p.cvy += Math.sin(a) * f
          }
          p.cvx += -p.cx * 0.01
          p.cvy += -p.cy * 0.01
          p.cvx *= 0.95
          p.cvy *= 0.95
          p.cx += p.cvx
          p.cy += p.cvy
          p.cx = Math.min(50, Math.max(-50, p.cx))
          p.cy = Math.min(50, Math.max(-50, p.cy))

          const fx = p.x + p.wx + (pi === 0 ? 0 : p.cx)
          const fy = p.y + p.wy + (pi === 0 ? 0 : p.cy)
          d += (pi === 0 ? `M ${fx} ${fy}` : ` L ${fx} ${fy}`)
        }
        paths[li].setAttribute('d', d)
      }

      rafId = requestAnimationFrame(frame)
    }

    function onMouseMove(e: MouseEvent) {
      const rect = wrapperRef.current!.getBoundingClientRect()
      const nx = e.clientX - rect.left
      const ny = e.clientY - rect.top
      const dx = nx - mouse.x
      const dy = ny - mouse.y
      mouse.x = nx
      mouse.y = ny
      mouse.sx += (mouse.x - mouse.sx) * 0.1
      mouse.sy += (mouse.y - mouse.sy) * 0.1
      const speed = Math.hypot(dx, dy)
      mouse.vs += (speed - mouse.vs) * 0.1
      mouse.vs = Math.min(100, mouse.vs)
    }

    const ro = new ResizeObserver(entries => {
      if (!svgRef.current) return
      const { width, height } = entries[0].contentRect
      build(width, height)
    })
    ro.observe(wrapper)

    wrapper.addEventListener('mousemove', onMouseMove)
    rafId = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(rafId)
      ro.disconnect()
      wrapper.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <div ref={wrapperRef} className="absolute inset-0">
      <svg ref={svgRef} aria-hidden="true" className="absolute inset-0 w-full h-full pointer-events-none" />
    </div>
  )
}
