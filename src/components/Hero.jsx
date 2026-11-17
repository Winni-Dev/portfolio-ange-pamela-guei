import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Heart, MessageCircle, BellRing, TrendingUp, ArrowDown, MapPin, Download } from 'lucide-react'
import { profile } from '../data.js'

const ease = [0.22, 1, 0.36, 1]

/* ---------- Effet machine à écrire ---------- */
const PREFIX = 'Je fais parler les '
const WORDS = ['marques.', 'réseaux.', 'communautés.', 'ventes.']

function Typewriter() {
  const [text, setText] = useState('')
  const [phase, setPhase] = useState('prefix') // prefix → word → hold → delete
  const [wordIndex, setWordIndex] = useState(0)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setText(PREFIX + WORDS[0])
      return
    }
    const word = WORDS[wordIndex]
    let t
    if (phase === 'prefix') {
      if (text.length < PREFIX.length) t = setTimeout(() => setText(PREFIX.slice(0, text.length + 1)), 70)
      else setPhase('word')
    } else if (phase === 'word') {
      const typed = text.slice(PREFIX.length)
      if (typed.length < word.length) t = setTimeout(() => setText(PREFIX + word.slice(0, typed.length + 1)), 85)
      else t = setTimeout(() => setPhase('delete'), 2200)
    } else if (phase === 'delete') {
      const typed = text.slice(PREFIX.length)
      if (typed.length > 0) t = setTimeout(() => setText(PREFIX + typed.slice(0, -1)), 40)
      else {
        setWordIndex((i) => (i + 1) % WORDS.length)
        setPhase('word')
      }
    }
    return () => clearTimeout(t)
  }, [text, phase, wordIndex])

  const typedPrefix = text.slice(0, PREFIX.length)
  const typedWord = text.slice(PREFIX.length)

  return (
    <h1
      aria-label={PREFIX + WORDS[0]}
      className="relative font-display text-[clamp(2.1rem,8.5vw,4.6rem)] font-semibold leading-[1] tracking-tight lg:text-[clamp(3rem,5.2vw,4.8rem)]"
    >
      {/* réserve la place pour éviter que la page saute */}
      <span aria-hidden className="invisible block">
        Je fais parler les communautés.
      </span>
      <span aria-hidden className="absolute inset-0">
        {typedPrefix}
        <span className="italic text-coral">{typedWord}</span>
        <motion.span
          animate={{ opacity: [1, 1, 0, 0] }}
          transition={{ repeat: Infinity, duration: 1, times: [0, 0.5, 0.5, 1] }}
          className="ml-1 inline-block h-[0.85em] w-[0.08em] translate-y-[0.1em] bg-mango align-baseline"
        />
      </span>
    </h1>
  )
}

/* ---------- Notifications flottantes ---------- */
function FloatCard({ className, delay, children, y }) {
  return (
    <motion.div
      style={{ y }}
      initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ delay, duration: 0.8, type: 'spring', bounce: 0.4 }}
      className={`absolute z-20 ${className}`}
    >
      <div className="animate-float rounded-2xl bg-white px-3 py-2 text-ink shadow-2xl shadow-black/40 sm:px-4 sm:py-3">
        {children}
      </div>
    </motion.div>
  )
}

function useIsMobile() {
  const [m, setM] = useState(() => typeof window !== 'undefined' && window.matchMedia('(max-width: 639px)').matches)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)')
    const on = () => setM(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return m
}

export default function Hero() {
  const mobile = useIsMobile()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const photoY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, 0.88])
  const textY = useTransform(scrollYProgress, [0, 1], [0, -80])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const cardUp = useTransform(scrollYProgress, [0, 1], [0, -160])
  const cardDown = useTransform(scrollYProgress, [0, 1], [0, 90])
  const bigX = useTransform(scrollYProgress, [0, 1], ['0%', '-20%'])
  const shapeRotate = useTransform(scrollYProgress, [0, 1], [0, 180])

  return (
    <section id="top" ref={ref} className="grain relative min-h-[100svh] overflow-hidden bg-ink pb-16 pt-28 text-cream sm:pt-32">
      {/* Fond : grille de points + grand nom en contour + formes pleines */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full text-white/[0.07]" aria-hidden>
        <defs>
          <pattern id="dots" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.4" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>

      <motion.p
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1.2 }}
        className="pointer-events-none absolute bottom-6 left-0 whitespace-nowrap font-display text-[26vw] font-semibold leading-none tracking-tighter text-transparent lg:text-[18vw]"
        style={{ x: bigX, WebkitTextStroke: '1.5px rgba(251,246,239,0.08)' }}
      >
        PAMELA GUEI
      </motion.p>

      <motion.span
        aria-hidden
        style={{ rotate: shapeRotate }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.8, type: 'spring' }}
        className="pointer-events-none absolute left-[8%] top-28 hidden h-10 w-10 rounded-lg bg-mango sm:block"
      />
      <motion.span
        aria-hidden
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring' }}
        className="pointer-events-none absolute bottom-24 right-[6%] hidden h-6 w-6 rounded-full bg-lilac sm:block"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Texte */}
        <motion.div style={{ y: textY, opacity: fade }} className="order-2 min-w-0 lg:order-1">

          <Typewriter />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.8, ease }}
            className="mt-6 max-w-xl text-base leading-relaxed text-cream/70 sm:text-lg"
          >
            Moi c’est <strong className="text-cream">{profile.firstName} {profile.lastName}</strong>, chargée de
            marketing & communication digitale. Community management, création de contenu et génération de
            leads — de la stratégie jusqu’à la signature.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.8, ease }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href="#contact"
              className="group relative overflow-hidden rounded-full bg-coral px-7 py-3.5 font-semibold text-white transition active:scale-95"
            >
              <span className="relative z-10 transition-colors group-hover:text-ink">Travaillons ensemble</span>
              <span className="absolute inset-0 -translate-x-full bg-mango transition-transform duration-500 group-hover:translate-x-0" />
            </a>
            <a
              href={profile.cv}
              download
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 font-semibold text-cream transition hover:border-cream hover:bg-cream hover:text-ink active:scale-95"
            >
              <Download size={18} /> Télécharger mon CV
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="mt-8 flex items-center gap-2 text-sm text-cream/50"
          >
            <MapPin size={16} /> {profile.location}
          </motion.p>
        </motion.div>

        {/* Photo */}
        <div className="relative order-1 mx-auto w-full max-w-[16rem] sm:max-w-sm lg:order-2">
          {/* disque plein derrière la photo */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1, ease }}
            className="absolute -right-6 -top-6 h-3/4 w-3/4 rounded-full bg-coral"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.4, rotate: -30 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, ease }}
            className="absolute -inset-5 animate-spin-slow rounded-full border border-dashed border-mango/50"
            style={{ animationDuration: '40s' }}
          />
          <motion.div
            style={{ y: photoY, scale: photoScale }}
            initial={{ clipPath: 'inset(100% 0% 0% 0% round 999px 999px 48px 48px)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0% round 999px 999px 48px 48px)' }}
            transition={{ duration: 1.3, ease, delay: 0.1 }}
            className="relative aspect-[3/4] overflow-hidden rounded-t-full rounded-b-[3rem] border-4 border-ink bg-ink-2"
          >
            <motion.img
              initial={{ scale: 1.3 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.8, ease }}
              src={profile.photo}
              alt={`Portrait de ${profile.firstName} ${profile.lastName}`}
              className="h-full w-full object-cover"
            />
          </motion.div>

          <FloatCard y={mobile ? undefined : cardUp} delay={1.2} className="-bottom-5 -left-5 sm:bottom-auto sm:-left-14 sm:top-10">
            <div className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-coral text-white">
                <Heart size={16} fill="currentColor" />
              </span>
              <div className="leading-tight">
                <p className="text-sm font-bold">Post publié</p>
                <p className="text-[11px] text-ink/60">Facebook · TikTok</p>
              </div>
            </div>
          </FloatCard>

          <FloatCard y={mobile ? undefined : cardDown} delay={1.4} className="-right-5 bottom-14 sm:-right-12 sm:bottom-auto sm:top-1/2">
            <div className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-mint text-ink">
                <BellRing size={16} />
              </span>
              <div className="leading-tight">
                <p className="text-sm font-bold">Nouveau lead</p>
                <p className="text-[11px] text-ink/60">Visite programmée ✓</p>
              </div>
            </div>
          </FloatCard>

          <FloatCard y={cardUp} delay={1.6} className="-left-10 bottom-8 hidden sm:block">
            <div className="flex items-center gap-2">
              <MessageCircle size={16} className="text-berry" />
              <p className="text-xs font-semibold">“Superbe visuel !” 🔥</p>
            </div>
          </FloatCard>

          <FloatCard y={cardDown} delay={1.8} className="-right-6 -top-2 hidden sm:block">
            <div className="flex items-center gap-1.5 text-xs font-bold">
              <TrendingUp size={16} className="text-mint" /> Campagne en ligne
            </div>
          </FloatCard>
        </div>
      </div>

      <motion.a
        href="#about"
        style={{ opacity: fade }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs uppercase tracking-[0.3em] text-cream/40 sm:flex"
      >
        Scroll
        <motion.span animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
          <ArrowDown size={16} />
        </motion.span>
      </motion.a>
    </section>
  )
}
