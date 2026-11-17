import { motion } from 'framer-motion'
import { GraduationCap } from 'lucide-react'
import { education } from '../data.js'

const ease = [0.22, 1, 0.36, 1]

export default function Education() {
  return (
    <section id="education" className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
      <motion.p
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.25em] text-coral"
      >
        <span className="h-px w-10 bg-coral" /> Formation
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease }}
        className="font-display text-[7.4vw] font-semibold leading-[1.05] tracking-tight sm:text-6xl"
      >
        Diplômes & <span className="italic text-coral">apprentissages</span>
      </motion.h2>

      <div className="mt-14 grid gap-4 md:grid-cols-3">
        {education.map((e, i) => (
          <motion.article
            key={e.title}
            initial={{ opacity: 0, y: 60, rotateX: 25 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: i * 0.12, duration: 0.8, ease }}
            whileHover={{ y: -8 }}
            style={{ transformPerspective: 900 }}
            className={`relative overflow-hidden rounded-3xl p-7 ${
              i === 0 ? 'bg-ink text-cream' : 'border border-ink/10 bg-white'
            }`}
          >
            <span
              className={`grid h-12 w-12 place-items-center rounded-2xl ${
                i === 0 ? 'bg-coral text-white' : 'bg-cream text-coral'
              }`}
            >
              <GraduationCap size={22} />
            </span>
            <p className={`mt-6 font-display text-sm font-bold ${i === 0 ? 'text-mango' : 'text-coral'}`}>{e.date}</p>
            <h3 className="mt-1 font-display text-xl font-semibold leading-tight">{e.title}</h3>
            <p className={`mt-1 text-sm font-semibold ${i === 0 ? 'text-cream/60' : 'text-ink/50'}`}>{e.school}</p>
            <p className={`mt-4 text-sm leading-relaxed ${i === 0 ? 'text-cream/75' : 'text-ink/70'}`}>{e.desc}</p>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
