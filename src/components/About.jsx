import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useInView, animate } from 'framer-motion'
import { profile, stats } from '../data.js'

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.15, 1])
  const y = useTransform(progress, range, [6, 0])
  return (
    <motion.span style={{ opacity, y }} className="mr-[0.28em] inline-block">
      {children}
    </motion.span>
  )
}

function Counter({ value, suffix }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, value, { duration: 1.6, ease: 'easeOut', onUpdate: (v) => setN(Math.round(v)) })
    return () => c.stop()
  }, [inView, value])
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  )
}

export default function About() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.55'] })
  const words = profile.bio.split(' ')

  return (
    <section id="about" className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
      <motion.p
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="mb-8 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.25em] text-coral"
      >
        <span className="h-px w-10 bg-coral" /> Profil
      </motion.p>

      <p ref={ref} className="font-display text-2xl font-bold leading-snug tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-[1.2]">
        {words.map((w, i) => {
          const start = i / words.length
          const end = start + 1 / words.length
          return (
            <Word key={i} progress={scrollYProgress} range={[start, end]}>
              {w}
            </Word>
          )
        })}
      </p>

      <div className="mt-16 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -6 }}
            className={`rounded-3xl p-5 sm:p-7 ${
              ['bg-ink text-cream', 'bg-coral text-white', 'bg-mango text-ink', 'bg-lilac text-ink'][i]
            }`}
          >
            <p className="font-display text-5xl font-semibold sm:text-6xl">
              <Counter value={s.value} suffix={s.suffix} />
            </p>
            <p className="mt-2 text-sm font-medium opacity-80">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
