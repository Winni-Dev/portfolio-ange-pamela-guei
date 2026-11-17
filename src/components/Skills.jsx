import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Smartphone, Palette, Handshake, Laptop, Languages, Star, BadgeCheck, Heart } from 'lucide-react'
import { skillGroups, levelLabels, languages, softSkills } from '../data.js'

const ease = [0.22, 1, 0.36, 1]
const icons = { Smartphone, Palette, Handshake, Laptop }

// classes écrites en entier pour que Tailwind les détecte
const tone = {
  coral: { bg: 'bg-coral', text: 'text-coral', on: 'text-white', soft: 'bg-coral/15' },
  mango: { bg: 'bg-mango', text: 'text-mango', on: 'text-ink', soft: 'bg-mango/15' },
  mint: { bg: 'bg-mint', text: 'text-mint', on: 'text-ink', soft: 'bg-mint/15' },
  lilac: { bg: 'bg-lilac', text: 'text-lilac', on: 'text-ink', soft: 'bg-lilac/15' },
}

function Meter({ level, color, delay = 0 }) {
  return (
    <div className="flex gap-1.5" role="img" aria-label={`Niveau ${level} sur 5`}>
      {Array.from({ length: 5 }).map((_, k) => (
        <motion.span
          key={k}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: delay + k * 0.08, duration: 0.4, ease }}
          className={`h-2.5 flex-1 origin-left rounded-full ${k < level ? tone[color].bg : 'bg-white/10'}`}
        />
      ))}
    </div>
  )
}

function SkillCard({ s, color, i }) {
  const strong = s.level >= 4
  return (
    <motion.article
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: i * 0.08, duration: 0.5, ease }}
      className="flex flex-col rounded-3xl border border-white/10 bg-ink-2 p-6"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-lg font-bold leading-snug">{s.name}</h3>
        {strong && (
          <span
            className={`flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold ${tone[color].bg} ${tone[color].on}`}
          >
            <Star size={11} fill="currentColor" /> Point fort
          </span>
        )}
      </div>

      <div className="mt-4 flex items-baseline justify-between">
        <span className={`text-sm font-bold ${tone[color].text}`}>{levelLabels[s.level]}</span>
        <span className="font-display text-sm font-bold text-cream/40">{s.level}/5</span>
      </div>
      <div className="mt-2">
        <Meter level={s.level} color={color} delay={0.15 + i * 0.08} />
      </div>

      <p className="mt-5 text-sm leading-relaxed text-cream/75">{s.desc}</p>
      <p className="mt-auto flex items-start gap-2 pt-5 text-xs text-cream/50">
        <BadgeCheck size={14} className={`mt-px shrink-0 ${tone[color].text}`} />
        <span>
          <b className="text-cream/70">Mis en pratique :</b> {s.proof}
        </span>
      </p>
    </motion.article>
  )
}

export default function Skills() {
  const [activeKey, setActiveKey] = useState(skillGroups[0].key)
  const group = skillGroups.find((g) => g.key === activeKey)

  return (
    <section id="skills" className="grain relative overflow-hidden bg-ink py-24 text-cream sm:py-32">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.25em] text-mango"
            >
              <span className="h-px w-10 bg-mango" /> Compétences
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease }}
              className="max-w-2xl font-display text-[7.4vw] font-semibold leading-[1.05] tracking-tight sm:text-6xl"
            >
              Ce que je sais <span className="italic text-coral">faire</span>, concrètement.
            </motion.h2>
          </div>

          {/* Légende des niveaux */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-white/10 p-4 text-xs text-cream/60"
          >
            <p className="mb-2 font-semibold text-cream/80">Comment lire les niveaux</p>
            <div className="flex flex-wrap gap-x-4 gap-y-1.5">
              {[1, 3, 4, 5].map((l) => (
                <span key={l} className="flex items-center gap-1.5">
                  <span className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, k) => (
                      <span key={k} className={`h-1.5 w-2 rounded-full ${k < l ? 'bg-cream' : 'bg-white/15'}`} />
                    ))}
                  </span>
                  {levelLabels[l]}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Onglets par domaine */}
        <div role="tablist" aria-label="Domaines de compétences" className="mt-12 grid grid-cols-2 gap-2 lg:grid-cols-4">
          {skillGroups.map((g, i) => {
            const Icon = icons[g.icon]
            const isActive = g.key === activeKey
            return (
              <motion.button
                key={g.key}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveKey(g.key)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                whileTap={{ scale: 0.97 }}
                className={`relative overflow-hidden rounded-2xl border p-4 text-left transition-colors sm:p-5 ${
                  isActive ? 'border-transparent' : 'border-white/10 hover:border-white/30'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="skill-tab"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                    className={`absolute inset-0 ${tone[g.color].bg}`}
                  />
                )}
                <span className={`relative flex flex-col gap-3 ${isActive ? tone[g.color].on : ''}`}>
                  <span
                    className={`grid h-10 w-10 place-items-center rounded-xl ${
                      isActive ? 'bg-black/10' : `${tone[g.color].soft} ${tone[g.color].text}`
                    }`}
                  >
                    <Icon size={20} />
                  </span>
                  <span className="font-display text-base font-bold leading-tight sm:text-lg">{g.name}</span>
                  <span className={`text-xs ${isActive ? 'opacity-75' : 'text-cream/50'}`}>
                    {g.skills.length} compétence{g.skills.length > 1 ? 's' : ''}
                  </span>
                </span>
              </motion.button>
            )
          })}
        </div>

        {/* Contenu du domaine actif */}
        <div className="mt-6 min-h-[22rem]" role="tabpanel">
          <AnimatePresence mode="wait">
            <motion.div
              key={group.key}
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <motion.p initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="mb-5 text-cream/70">
                <span className={`font-semibold ${tone[group.color].text}`}>{group.name} — </span>
                {group.summary}
              </motion.p>
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {group.skills.map((s, i) => (
                  <SkillCard key={s.name} s={s} color={group.color} i={i} />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Qualités + langues */}
        <div className="mt-16 grid gap-4 lg:grid-cols-[1.2fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="rounded-3xl bg-cream p-6 text-ink sm:p-8"
          >
            <p className="flex items-center gap-2 font-display text-xl font-bold">
              <Heart size={20} className="text-coral" fill="currentColor" /> Mes qualités
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {softSkills.map((q, i) => (
                <motion.span
                  key={q}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.06, type: 'spring', bounce: 0.5 }}
                  whileHover={{ rotate: -3, scale: 1.05 }}
                  className={`rounded-full px-4 py-2 text-sm font-semibold ${
                    [
                      'bg-ink text-cream',
                      'bg-coral text-white',
                      'bg-mango text-ink',
                      'bg-lilac text-ink',
                      'bg-mint text-ink',
                      'bg-white text-ink ring-1 ring-ink/10',
                    ][i % 6]
                  }`}
                >
                  {q}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <div className="grid gap-3">
            {languages.map((l, i) => (
              <motion.div
                key={l.name}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6, ease }}
                className="flex items-center gap-4 rounded-3xl border border-white/10 bg-ink-2 p-5"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-mango text-ink">
                  <Languages size={22} />
                </span>
                <div className="flex-1">
                  <p className="font-display text-xl font-bold">{l.name}</p>
                  <p className="text-sm text-cream/50">{l.note}</p>
                </div>
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <span key={k} className={`h-2.5 w-2.5 rounded-full ${k < l.level ? 'bg-mango' : 'bg-white/15'}`} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
