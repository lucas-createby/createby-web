'use client'

import { useEffect, useState, useRef } from 'react'

const CHARS = 'abcdefghijklmnopqrstuvwxyz'
const WORDS = ['clarity', 'impact', 'value', 'design', 'intent', 'craft']

function useScramble(target: string, duration = 550) {
  const [display, setDisplay] = useState(target)
  const rafRef = useRef<number>(0)
  const startRef = useRef<number>(0)
  const prevRef = useRef(target)

  useEffect(() => {
    if (target === prevRef.current) return
    prevRef.current = target
    cancelAnimationFrame(rafRef.current)
    startRef.current = performance.now()

    function tick() {
      const elapsed = performance.now() - startRef.current
      const progress = Math.min(elapsed / duration, 1)
      const resolvedCount = Math.floor(progress * target.length)
      let result = ''
      for (let i = 0; i < target.length; i++) {
        result += i < resolvedCount ? target[i] : CHARS[Math.floor(Math.random() * CHARS.length)]
      }
      setDisplay(result)
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        setDisplay(target)
      }
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [target, duration])

  return display
}

export default function MiniScrambleDemo() {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % WORDS.length), 2400)
    return () => clearInterval(t)
  }, [])
  const word = useScramble(WORDS[idx])
  return (
    <p className="text-sm font-medium text-stone-900 dark:text-stone-100">
      create <span className="text-stone-400 dark:text-stone-500 tabular-nums">{word}</span>
    </p>
  )
}
