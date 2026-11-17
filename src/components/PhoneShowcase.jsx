import { useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent, useSpring } from 'framer-motion'
import {
  Heart,
  MessageCircle,
  Share2,
  Home,
  Play,
  Image as ImageIcon,
  Megaphone,
  BellRing,
  CalendarCheck,
  PenLine,
  Wifi,
  BatteryFull,
  Signal,
} from 'lucide-react'
import { phoneScreens, profile } from '../data.js'

/* ---------- Écrans du téléphone ---------- */

function SocialScreen({ p }) {
  const likes = useTransform(p, [0.02, 0.28], [0, 1])
  const c1 = useTransform(p, [0.1, 0.16], [0, 1])
  const c2 = useTransform(p, [0.17, 0.23], [0, 1])
  const heart = useTransform(p, [0.05, 0.12, 0.18], [0, 1.4, 1])
  return (
    <div className="flex h-full flex-col bg-white px-3 pt-2 text-ink">
      <div className="flex items-center justify-between py-2">
        <p className="font-display truncate text-[13px] font-semibold">Fil d’actualité</p>
        <BellRing size={16} />
      </div>
      <div className="no-scrollbar mb-2 flex gap-2 overflow-hidden">
        {['bg-coral', 'bg-mango', 'bg-berry', 'bg-lilac', 'bg-mint'].map((c, i) => (
          <div key={i} className={`h-11 w-11 shrink-0 rounded-full p-[2px] ${c}`}>
            <div className="h-full w-full rounded-full border-2 border-white bg-ink/10" />
          </div>
        ))}
      </div>
      <div className="overflow-hidden rounded-2xl border border-ink/10">
        <div className="flex items-center gap-2 p-2">
          <img src={profile.photo} alt="" className="h-7 w-7 rounded-full object-cover" />
          <div className="leading-tight">
            <p className="text-[11px] font-bold">Pamela · Marketing</p>
            <p className="text-[9px] text-ink/50">Sponsorisé · Abidjan</p>
          </div>
        </div>
        <div className="relative grid aspect-square place-items-center bg-coral">
          <Home size={44} className="text-white" />
          <p className="absolute bottom-2 left-2 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-bold">
            Nouvelle villa disponible 🏡
          </p>
          <motion.div style={{ scale: heart }} className="absolute">
            <Heart size={64} className="text-white drop-shadow-lg" fill="currentColor" />
          </motion.div>
        </div>
        <div className="flex items-center gap-3 p-2">
          <Heart size={16} className="text-coral" fill="currentColor" />
          <MessageCircle size={16} />
          <Share2 size={16} />
        </div>
        <div className="px-2">
          <div className="h-1.5 overflow-hidden rounded-full bg-ink/10">
            <motion.div style={{ scaleX: likes }} className="h-full origin-left rounded-full bg-coral" />
          </div>
          <p className="mt-1 text-[10px] font-semibold text-ink/60">Engagement en hausse</p>
        </div>
        <div className="space-y-1 p-2">
          <motion.p style={{ opacity: c1 }} className="rounded-xl bg-ink/5 px-2 py-1 text-[10px]">
            <b>Awa</b> Je suis intéressée, c’est où ? 😍
          </motion.p>
          <motion.p style={{ opacity: c2 }} className="rounded-xl bg-ink/5 px-2 py-1 text-[10px]">
            <b>Kouamé</b> Envoyez-moi les détails en DM 📩
          </motion.p>
        </div>
      </div>
    </div>
  )
}

function ContentScreen({ p }) {
  const tiles = [
    { c: 'bg-coral', icon: Megaphone, label: 'Affiche', span: 'col-span-2' },
    { c: 'bg-mango', icon: ImageIcon, label: 'Flyer', span: '' },
    { c: 'bg-lilac', icon: Play, label: 'Vidéo', span: '' },
    { c: 'bg-mint', icon: Home, label: 'Visite 360°', span: '' },
    { c: 'bg-berry', icon: ImageIcon, label: 'Bannière', span: '' },
  ]
  return (
    <div className="flex h-full flex-col bg-ink px-3 pt-2 text-cream">
      <div className="flex items-center justify-between py-2">
        <p className="font-display truncate text-[13px] font-semibold">Studio créa</p>
        <PenLine size={16} className="text-mango" />
      </div>
      <div className="grid flex-1 grid-cols-2 content-start gap-2">
        {tiles.map((t, i) => (
          <Tile key={i} t={t} i={i} p={p} />
        ))}
      </div>
      <div className="mb-3 mt-2 rounded-2xl bg-white/10 p-2 text-[10px]">
        <p className="font-bold text-mango">Montage vidéo</p>
        <div className="mt-1 flex gap-0.5">
          {Array.from({ length: 14 }).map((_, i) => (
            <div key={i} className={`h-5 flex-1 rounded-sm ${i % 3 ? 'bg-white/20' : 'bg-coral/70'}`} />
          ))}
        </div>
      </div>
    </div>
  )
}

function Tile({ t, i, p }) {
  const start = 0.33 + i * 0.04
  const scale = useTransform(p, [start, start + 0.08], [0.6, 1])
  const opacity = useTransform(p, [start, start + 0.06], [0, 1])
  const Icon = t.icon
  return (
    <motion.div
      style={{ scale, opacity }}
      className={`relative grid aspect-[4/3] place-items-center rounded-2xl ${t.c} ${t.span}`}
    >
      <Icon size={i === 0 ? 30 : 22} className="text-white" />
      <span className="absolute bottom-1.5 left-2 text-[9px] font-bold uppercase tracking-wider text-white/90">
        {t.label}
      </span>
    </motion.div>
  )
}

function LeadsScreen({ p }) {
  const bars = [0.35, 0.5, 0.42, 0.68, 0.6, 0.85, 1]
  const notifs = [
    { icon: MessageCircle, text: 'Nouveau message WhatsApp', color: 'bg-mint' },
    { icon: CalendarCheck, text: 'Visite de site confirmée', color: 'bg-mango' },
    { icon: PenLine, text: 'Signature du contrat ✍️', color: 'bg-coral' },
  ]
  return (
    <div className="flex h-full flex-col bg-cream px-3 pt-2 text-ink">
      <div className="flex items-center justify-between py-2">
        <p className="font-display truncate text-[13px] font-semibold">Tableau de bord</p>
        <Megaphone size={16} className="text-coral" />
      </div>
      <div className="rounded-2xl bg-white p-3 shadow-sm">
        <p className="text-[10px] font-semibold text-ink/50">Prospects qualifiés</p>
        <p className="font-display text-sm font-semibold">Campagne Ads</p>
        <div className="mt-2 flex h-20 items-end gap-1.5">
          {bars.map((b, i) => (
            <Bar key={i} h={b} i={i} p={p} />
          ))}
        </div>
      </div>
      <div className="mt-3 space-y-2">
        {notifs.map((n, i) => (
          <Notif key={i} n={n} i={i} p={p} />
        ))}
      </div>
    </div>
  )
}

function Bar({ h, i, p }) {
  const scaleY = useTransform(p, [0.68 + i * 0.015, 0.8 + i * 0.015], [0.05, h])
  return (
    <motion.div
      style={{ scaleY }}
      className={`h-full flex-1 origin-bottom rounded-t-md ${i === 6 ? 'bg-coral' : 'bg-ink/80'}`}
    />
  )
}

function Notif({ n, i, p }) {
  const s = 0.76 + i * 0.06
  const x = useTransform(p, [s, s + 0.06], [60, 0])
  const opacity = useTransform(p, [s, s + 0.05], [0, 1])
  const Icon = n.icon
  return (
    <motion.div style={{ x, opacity }} className="flex items-center gap-2 rounded-2xl bg-white p-2 shadow-sm">
      <span className={`grid h-7 w-7 place-items-center rounded-full ${n.color}`}>
        <Icon size={14} />
      </span>
      <p className="text-[10px] font-semibold leading-tight">{n.text}</p>
    </motion.div>
  )
}

/* ---------- Section ---------- */

export default function PhoneShowcase() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const p = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 })
  const [active, setActive] = useState(0)

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const i = v < 0.33 ? 0 : v < 0.66 ? 1 : 2
    setActive((prev) => (prev === i ? prev : i))
  })

  const stripY = useTransform(
    p,
    [0, 0.28, 0.36, 0.61, 0.69, 1],
    ['0%', '0%', '-33.333%', '-33.333%', '-66.666%', '-66.666%'],
  )
  const rotate = useTransform(p, [0, 0.12, 0.88, 1], [-10, 0, 0, 8])
  const rotateY = useTransform(p, [0, 0.12], [25, 0])
  const phoneScale = useTransform(p, [0, 0.12], [0.85, 1])
  const glow = ['bg-coral', 'bg-mango', 'bg-mint']

  return (
    <section id="expertise" ref={ref} className="relative h-[340vh] bg-ink text-cream">
      <div className="sticky top-0 flex h-[100svh] flex-col items-center justify-center gap-6 overflow-hidden px-4 pt-16 sm:px-6 lg:flex-row lg:gap-20 lg:pt-0">
        <div className={`pointer-events-none absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.12] transition-colors duration-700 lg:left-[62%] ${glow[active]}`} />

        {/* Texte */}
        <div className="relative z-10 w-full max-w-md text-center lg:text-left">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-cream/50 sm:text-sm">
            Ce que je fais
          </p>
          <div className="relative min-h-[8.5rem] sm:min-h-[11rem] lg:min-h-[15rem]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -30, filter: 'blur(8px)' }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="font-semibold text-mango">{phoneScreens[active].kicker}</p>
                <h2 className="mt-2 font-display text-2xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
                  {phoneScreens[active].title}
                </h2>
                <p className="mt-3 hidden text-cream/70 sm:block lg:text-lg">{phoneScreens[active].text}</p>
              </motion.div>
            </AnimatePresence>
          </div>
          {/* indicateurs */}
          <div className="mt-2 flex justify-center gap-2 lg:justify-start">
            {phoneScreens.map((s, i) => (
              <span
                key={s.key}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === active ? 'w-10 bg-coral' : 'w-4 bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Téléphone */}
        <div className="relative z-10" style={{ perspective: 1200 }}>
          <motion.div
            style={{ rotate, rotateY, scale: phoneScale }}
            className="relative h-[min(56svh,600px)] aspect-[9/19] rounded-[2.6rem] border-[6px] border-[#2b2438] bg-black p-1.5 shadow-[0_40px_120px_-20px_rgba(255,90,54,0.45)] lg:h-[min(78svh,640px)]"
          >
            {/* boutons */}
            <span className="absolute -left-[9px] top-24 h-10 w-[3px] rounded-l bg-[#2b2438]" />
            <span className="absolute -right-[9px] top-32 h-16 w-[3px] rounded-r bg-[#2b2438]" />
            <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-white">
              {/* barre de statut */}
              <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-5 pt-2 text-[10px] font-bold mix-blend-difference text-white">
                <span>9:41</span>
                <span className="h-5 w-20 rounded-full bg-black" />
                <span className="flex items-center gap-1">
                  <Signal size={11} />
                  <Wifi size={11} />
                  <BatteryFull size={13} />
                </span>
              </div>
              <motion.div style={{ y: stripY }} className="absolute inset-x-0 top-0 h-[300%]">
                <div className="h-1/3 overflow-hidden pt-7">
                  <SocialScreen p={p} />
                </div>
                <div className="h-1/3 overflow-hidden bg-ink pt-7">
                  <ContentScreen p={p} />
                </div>
                <div className="h-1/3 overflow-hidden bg-cream pt-7">
                  <LeadsScreen p={p} />
                </div>
              </motion.div>
              <div className="absolute bottom-1.5 left-1/2 z-20 h-1 w-24 -translate-x-1/2 rounded-full bg-ink/40" />
            </div>
          </motion.div>

          {/* chips plateformes */}
          {['Facebook', 'TikTok', 'WhatsApp Business'].map((t, i) => (
            <motion.span
              key={t}
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4 + i, ease: 'easeInOut' }}
              className={`absolute hidden whitespace-nowrap rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold backdrop-blur sm:block ${
                ['-left-24 top-16', '-right-20 top-1/3', '-left-28 bottom-20'][i]
              }`}
            >
              {t}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  )
}
