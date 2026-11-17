import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { Briefcase } from 'lucide-react'
import { experiences } from '../data.js'

const ease = [0.22, 1, 0.36, 1]
const tagColors = {
  Immobilier: 'bg-coral text-white',
  Agence: 'bg-mango text-ink',
  Freelance: 'bg-lilac text-ink',
  RH: 'bg-mint text-ink',
  Événementiel: 'bg-berry text-white',
}

function Card({ exp, index }) {
  const left = index % 2 === 0
  return (
    <div className={`relative flex ${left ? 'md:justify-start' : 'md:justify-end'}`}>
      {/* point */}
      <motion.span
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: '-30%' }}
        transition={{ type: 'spring', bounce: 0.5 }}
        className="absolute left-4 top-8 z-10 grid h-5 w-5 -translate-x-1/2 place-items-center rounded-full bg-coral ring-8 ring-cream md:left-1/2"
      >
        <span className="h-2 w-2 rounded-full bg-white" />
      </motion.span>

      <motion.article
        initial={{ opacity: 0, x: left ? -60 : 60, rotate: left ? -2 : 2 }}
        whileInView={{ opacity: 1, x: 0, rotate: 0 }}
        viewport={{ once: true, margin: '-15%' }}
        transition={{ duration: 0.8, ease }}
        className="group ml-10 w-[calc(100%-2.5rem)] rounded-3xl border border-ink/10 bg-white p-6 shadow-[0_10px_40px_-20px_rgba(20,16,28,0.25)] transition-shadow hover:shadow-[0_20px_60px_-20px_rgba(255,90,54,0.35)] sm:p-7 md:ml-0 md:w-[calc(50%-2.5rem)]"
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className={`rounded-full px-3 py-1 text-xs font-bold ${tagColors[exp.tag]}`}>{exp.tag}</span>
          <span className="font-display text-sm font-bold text-ink/50">{exp.date}</span>
        </div>
        <h3 className="mt-4 font-display text-xl font-semibold leading-tight sm:text-2xl">{exp.title}</h3>
        <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-coral">
          <Briefcase size={14} /> {exp.company} · <span className="text-ink/50">{exp.place}</span>
        </p>
        <ul className="mt-5 space-y-2.5">
          {exp.points.map(([k, v], i) => (
            <motion.li
              key={k}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.07, duration: 0.5 }}
              className="flex gap-3 text-sm leading-relaxed text-ink/75"
            >
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-mango" />
              <span>
                <b className="text-ink">{k} :</b> {v}
              </span>
            </motion.li>
          ))}
        </ul>
      </motion.article>
    </div>
  )
}

export default function Experience() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.7', 'end 0.6'] })
  const line = useSpring(scrollYProgress, { stiffness: 100, damping: 25 })

  return (
    <section id="experience" className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
      <div className="mb-16 max-w-2xl">
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.25em] text-coral"
        >
          <span className="h-px w-10 bg-coral" /> Parcours
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="font-display text-[7.4vw] font-semibold leading-[1.05] tracking-tight sm:text-6xl"
        >
          Expérience <span className="italic text-coral">professionnelle</span>
        </motion.h2>
      </div>

      <div ref={ref} className="relative space-y-10 md:space-y-16">
        <div className="absolute bottom-0 left-4 top-0 w-[3px] -translate-x-1/2 rounded-full bg-ink/10 md:left-1/2" />
        <motion.div
          style={{ scaleY: line }}
          className="absolute bottom-0 left-4 top-0 w-[3px] origin-top -translate-x-1/2 rounded-full bg-coral md:left-1/2"
        />
        {experiences.map((exp, i) => (
          <Card key={exp.title} exp={exp} index={i} />
        ))}
      </div>
    </section>
  )
}
