import { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useAnimationFrame,
  useReducedMotion,
} from 'framer-motion'
import { Fingerprint, Users, RefreshCcw } from 'lucide-react'

/* ---------- Canette 3D en CSS (cylindre de faces) ---------- */
const N = 28 // nombre de faces
const R = 80 // rayon (px)
const H = 230 // hauteur (px)
const W = Math.ceil(2 * R * Math.tan(Math.PI / N)) + 1 // largeur d’une face
const LABEL_W = N * W

const labelSvg = `
<svg xmlns='http://www.w3.org/2000/svg' width='${LABEL_W}' height='${H}'>
  <rect width='100%' height='100%' fill='#ff8a1f'/>
  <rect y='46' width='100%' height='138' fill='#d7f75b'/>
  <rect y='184' width='100%' height='8' fill='#0b3b2c'/>
  <rect y='38' width='100%' height='8' fill='#0b3b2c'/>
  ${[0, 1].map((k) => {
    const x = k * (LABEL_W / 2)
    return `
    <g transform='translate(${x + 40},0)'>
      <circle cx='40' cy='115' r='34' fill='#ff8a1f'/>
      <circle cx='40' cy='115' r='26' fill='#ffd08a'/>
      ${[0, 45, 90, 135].map((a) => `<line x1='40' y1='89' x2='40' y2='141' stroke='#ff8a1f' stroke-width='3' transform='rotate(${a} 40 115)'/>`).join('')}
      <text x='92' y='108' font-family='Arial Black, Arial, sans-serif' font-weight='900' font-size='30' fill='#0b3b2c'>JUS</text>
      <text x='92' y='140' font-family='Arial Black, Arial, sans-serif' font-weight='900' font-size='26' fill='#0b3b2c'>NATUREL</text>
      <text x='92' y='164' font-family='Arial, sans-serif' font-weight='700' font-size='12' fill='#0b3b2c' letter-spacing='2'>DE FRUITS</text>
    </g>
    <text x='${x + 20}' y='26' font-family='Arial, sans-serif' font-weight='700' font-size='12' fill='#0b3b2c' letter-spacing='4'>FRAIS · FRUITÉ · NATUREL</text>`
  }).join('')}
</svg>`
const labelUrl = `url("data:image/svg+xml,${encodeURIComponent(labelSvg)}")`

function Can3D({ rotateY, rotateX }) {
  return (
    <div style={{ perspective: 900 }} className="relative grid h-[340px] w-[260px] place-items-center">
      {/* ombre au sol */}
      <motion.div
        animate={{ scaleX: [1, 0.85, 1] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
        className="absolute bottom-2 h-6 w-40 rounded-[50%] bg-black/30"
      />
      <motion.div
        animate={{ y: [0, -14, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <motion.div
          style={{ rotateY, rotateX, transformStyle: 'preserve-3d', width: 2 * R, height: H }}
          className="relative"
        >
          {Array.from({ length: N }).map((_, i) => (
            <div
              key={i}
              className="absolute top-0"
              style={{
                left: R - W / 2,
                width: W,
                height: H,
                backgroundImage: labelUrl,
                backgroundSize: `${LABEL_W}px ${H}px`,
                backgroundPosition: `${-i * W}px 0`,
                transform: `rotateY(${(i * 360) / N}deg) translateZ(${R - 0.5}px)`,
                backfaceVisibility: 'hidden',
                // léger ombrage selon la face pour donner du volume
                filter: `brightness(${0.78 + 0.22 * Math.abs(Math.cos((i / N) * Math.PI))})`,
              }}
            />
          ))}
          {/* couvercle */}
          <div
            className="absolute left-0 top-0 rounded-full border-[6px] border-[#b9c2bd] bg-[#dfe5e1]"
            style={{ width: 2 * R, height: 2 * R, transform: `translateY(${-R}px) rotateX(90deg)` }}
          >
            <div className="absolute left-1/2 top-[30%] h-8 w-12 -translate-x-1/2 rounded-full border-4 border-[#a9b3ad]" />
          </div>
          {/* fond */}
          <div
            className="absolute left-0 rounded-full bg-[#9aa49e]"
            style={{ width: 2 * R, height: 2 * R, top: H - R, transform: 'rotateX(-90deg)' }}
          />
        </motion.div>
      </motion.div>
    </div>
  )
}

/* ---------- Tranche d’orange ---------- */
function Slice({ size = 64, className = '' }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} className={className} aria-hidden>
      <circle cx="32" cy="32" r="31" fill="#ff8a1f" />
      <circle cx="32" cy="32" r="25" fill="#ffd08a" />
      {[0, 30, 60, 90, 120, 150].map((a) => (
        <line key={a} x1="32" y1="8" x2="32" y2="56" stroke="#ff8a1f" strokeWidth="2.5" transform={`rotate(${a} 32 32)`} />
      ))}
      <circle cx="32" cy="32" r="4" fill="#ff8a1f" />
    </svg>
  )
}

/* ---------- Carte avec effet 3D au survol / au toucher ---------- */
function TiltCard({ children, index }) {
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 200, damping: 18 })
  const sry = useSpring(ry, { stiffness: 200, damping: 18 })

  function onMove(e) {
    const r = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    ry.set(px * 18)
    rx.set(-py * 18)
  }
  function reset() {
    rx.set(0)
    ry.set(0)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: 40 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.12, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformPerspective: 800 }}
    >
      <motion.div
        onPointerMove={onMove}
        onPointerLeave={reset}
        style={{ rotateX: srx, rotateY: sry, transformPerspective: 800, transformStyle: 'preserve-3d' }}
        className="h-full rounded-3xl border border-white/10 bg-forest-2 p-6"
      >
        <div style={{ transform: 'translateZ(40px)' }}>{children}</div>
      </motion.div>
    </motion.div>
  )
}

const lessons = [
  { icon: Fingerprint, title: 'Créer une identité', text: 'Nom, univers visuel, ton : donner une personnalité à un produit.' },
  { icon: Users, title: 'Trouver ses clients', text: 'Aller chercher les premiers acheteurs, en ligne comme sur le terrain.' },
  { icon: RefreshCcw, title: 'Les faire revenir', text: 'Construire une relation qui transforme un achat en habitude.' },
]

export default function Brand() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  // rotation de la canette = temps qui passe + scroll
  const rotateY = useMotionValue(0)
  useAnimationFrame((t) => {
    const auto = reduce ? 0 : (t / 1000) * 22
    rotateY.set(auto + scrollYProgress.get() * 540)
  })
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [-24, -10, 8])
  const canY = useTransform(scrollYProgress, [0, 0.45], [140, 0])
  const canScale = useTransform(scrollYProgress, [0, 0.45], [0.7, 1])

  const s1 = useTransform(scrollYProgress, [0, 1], [160, -200])
  const s2 = useTransform(scrollYProgress, [0, 1], [-60, 220])
  const s3 = useTransform(scrollYProgress, [0, 1], [240, -120])
  const spin = useTransform(scrollYProgress, [0, 1], [0, 360])
  const spinBack = useTransform(scrollYProgress, [0, 1], [0, -280])

  return (
    <section id="brand" ref={ref} className="relative overflow-hidden bg-forest py-24 text-cream sm:py-32">
      {/* grille fine */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full text-white/[0.05]" aria-hidden>
        <defs>
          <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M48 0H0V48" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* tranches flottantes en parallaxe */}
      <motion.div style={{ y: s1, rotate: spin }} className="pointer-events-none absolute left-[4%] top-24">
        <Slice size={70} />
      </motion.div>
      <motion.div style={{ y: s2, rotate: spinBack }} className="pointer-events-none absolute right-[6%] top-10 opacity-90">
        <Slice size={44} />
      </motion.div>
      <motion.div style={{ y: s3, rotate: spin }} className="pointer-events-none absolute bottom-10 left-[45%] hidden md:block">
        <Slice size={52} />
      </motion.div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_auto]">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-5 inline-flex items-center gap-2 rounded-full bg-lime px-4 py-1.5 text-sm font-bold text-forest"
          >
            Esprit entrepreneur
          </motion.p>
          <h2 className="font-display text-[8.4vw] font-semibold leading-[1.02] tracking-tight sm:text-6xl">
            {['Fondatrice', 'd’une', 'marque', 'de'].map((w, i) => (
              <span key={i} className="mr-[0.22em] inline-block overflow-hidden align-bottom">
                <motion.span
                  initial={{ y: '100%' }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block"
                >
                  {w}
                </motion.span>
              </span>
            ))}
            <motion.span
              initial={{ opacity: 0, scale: 0.6, rotate: -6 }}
              whileInView={{ opacity: 1, scale: 1, rotate: -2 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, type: 'spring', bounce: 0.5 }}
              className="mt-2 inline-block rounded-2xl bg-lime px-3 py-1 italic text-forest"
            >
              jus naturels.
            </motion.span>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-cream/75"
          >
            Lancer ma propre marque m’a appris ce que vivent mes clients au quotidien. J’applique cette énergie
            d’entrepreneure à chaque projet que je porte.
          </motion.p>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {lessons.map((l, i) => {
              const Icon = l.icon
              return (
                <TiltCard key={l.title} index={i}>
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-lime text-forest">
                    <Icon size={20} />
                  </span>
                  <p className="mt-4 font-display text-lg font-bold">{l.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-cream/65">{l.text}</p>
                </TiltCard>
              )
            })}
          </div>
        </div>

        {/* Canette 3D */}
        <motion.div style={{ y: canY, scale: canScale }} className="relative mx-auto">
          <motion.div
            style={{ rotate: spin }}
            className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-lime/30"
          />
          <div className="absolute left-1/2 top-1/2 h-[230px] w-[230px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime" />
          <Can3D rotateY={rotateY} rotateX={rotateX} />
          <motion.span
            animate={{ rotate: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="absolute -right-2 top-6 rounded-full bg-tangerine px-3 py-1.5 text-xs font-semibold text-forest shadow-lg"
          >
            100% naturel
          </motion.span>
        </motion.div>
      </div>
    </section>
  )
}
