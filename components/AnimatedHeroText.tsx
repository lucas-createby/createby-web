'use client'

import { useEffect, useState, useRef } from 'react'

const CHARS = 'abcdefghijklmnopqrstuvwxyz'

const X_WORDS = [
  'innovation',
  'clarity',
  'impact',
  'value',
  'change',
  'opportunities',
  'the future',
  'products',
  'ventures',
  'direction',
]

const Y_WORDS = [
  'design',
  'strategy',
  'insights',
  'collaboration',
  'validation',
  'prototyping',
  'storytelling',
  'craft',
  'intent',
  'AI',
]

function useScramble(target: string, duration = 650) {
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
        if (target[i] === ' ') {
          result += ' '
        } else if (i < resolvedCount) {
          result += target[i]
        } else {
          result += CHARS[Math.floor(Math.random() * CHARS.length)]
        }
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

export default function AnimatedHeroText() {
  const [xIdx, setXIdx] = useState(0)
  const [yIdx, setYIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setXIdx(i => (i + 1) % X_WORDS.length), 3200)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const t = setInterval(() => setYIdx(i => (i + 1) % Y_WORDS.length), 4700)
    return () => clearInterval(t)
  }, [])

  const xWord = useScramble(X_WORDS[xIdx])
  const yWord = useScramble(Y_WORDS[yIdx])

  return (
    <h1 className="font-sans text-4xl md:text-6xl font-semibold tracking-[-0.035em] leading-[1.02] text-stone-900 dark:text-stone-100 mb-8">
      create{' '}
      <em className="font-display italic font-normal tracking-[-0.02em] text-[var(--accent)] tabular-nums not-italic-fallback">{xWord}</em>
      <br />
      by{' '}
      <em className="font-display italic font-normal tracking-[-0.02em] text-[var(--accent)] tabular-nums">{yWord}</em>
    </h1>
  )
}
