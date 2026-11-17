import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll, useSpring, useMotionValueEvent } from 'framer-motion'
import { Menu, X, Download } from 'lucide-react'
import { profile } from '../data.js'

const links = [
  { id: 'about', label: 'Profil' },
  { id: 'expertise', label: 'Expertise' },
  { id: 'experience', label: 'Parcours' },
  { id: 'skills', label: 'Compétences' },
  { id: 'brand', label: 'Marque' },
  { id: 'education', label: 'Formation' },
  { id: 'contact', label: 'Contact' },
]

function useActiveSection() {
  const [active, setActive] = useState('top')
  useEffect(() => {
    const ids = ['top', ...links.map((l) => l.id)]
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean)
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      // une section est « active » quand elle traverse le milieu de l’écran
      { rootMargin: '-50% 0px -50% 0px' },
    )
    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])
  return active
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const active = useActiveSection()
  const { scrollYProgress, scrollY } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25 })

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 40))

  // bloque le défilement doux pendant que le menu mobile est ouvert
  useEffect(() => {
    if (open) window.__lenis?.stop()
    else window.__lenis?.start()
  }, [open])

  const activeLabel = links.find((l) => l.id === active)?.label ?? 'Accueil'

  return (
    <>
      <motion.div style={{ scaleX: progress }} className="fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-coral" />
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:px-6">
        <motion.nav
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className={`mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full py-2 pl-2 pr-2 text-cream transition-all duration-500 sm:pl-3 ${
            scrolled ? 'bg-ink/85 shadow-2xl shadow-ink/20 backdrop-blur-xl' : 'bg-transparent'
          }`}
        >
          <a href="#top" className="flex items-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-coral font-display text-sm font-semibold text-white">
              AP
            </span>
            {/* Mobile : on affiche la section en cours */}
            <span className="relative h-5 overflow-hidden lg:hidden">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={activeLabel}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="block text-sm font-semibold"
                >
                  {activeLabel}
                </motion.span>
              </AnimatePresence>
            </span>
            <span className="hidden font-display text-lg font-semibold lg:inline">Pamela.</span>
          </a>

          <ul className="hidden items-center gap-0.5 rounded-full bg-white/5 p-1 lg:flex">
            {links.map((l) => {
              const isActive = active === l.id
              return (
                <li key={l.id} className="relative">
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }}
                      className="absolute inset-0 rounded-full bg-cream"
                    />
                  )}
                  <a
                    href={`#${l.id}`}
                    aria-current={isActive ? 'true' : undefined}
                    className={`relative z-10 block rounded-full px-3 py-2 text-sm font-semibold xl:px-4 transition-colors ${
                      isActive ? 'text-ink' : 'text-cream/70 hover:text-cream'
                    }`}
                  >
                    {l.label}
                  </a>
                </li>
              )
            })}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={profile.cv}
              download
              className="hidden items-center gap-2 rounded-full bg-coral px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-mango hover:text-ink sm:inline-flex"
            >
              <Download size={16} /> CV
            </a>
            <button
              onClick={() => setOpen(true)}
              aria-label="Ouvrir le menu"
              className="grid h-10 w-10 place-items-center rounded-full bg-white/10 backdrop-blur lg:hidden"
            >
              <Menu size={20} />
            </button>
          </div>
        </motion.nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: 'circle(0% at 92% 6%)' }}
            animate={{ clipPath: 'circle(150% at 92% 6%)' }}
            exit={{ clipPath: 'circle(0% at 92% 6%)' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[70] flex flex-col bg-ink px-6 pt-5 text-cream lg:hidden"
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-lg font-semibold">Pamela.</span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Fermer le menu"
                className="grid h-10 w-10 place-items-center rounded-full bg-white/10"
              >
                <X size={20} />
              </button>
            </div>
            <ul className="mt-12 space-y-1">
              {links.map((l, i) => {
                const isActive = active === l.id
                return (
                  <motion.li
                    key={l.id}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <a
                      href={`#${l.id}`}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-4 py-2 font-display text-4xl font-bold ${
                        isActive ? 'text-coral' : 'text-cream'
                      }`}
                    >
                      <span className={`text-sm ${isActive ? 'text-coral' : 'text-cream/40'}`}>0{i + 1}</span>
                      {l.label}
                      {isActive && <span className="ml-auto h-3 w-3 rounded-full bg-coral" />}
                    </a>
                  </motion.li>
                )
              })}
            </ul>
            <a
              href={profile.cv}
              download
              className="mt-10 inline-flex items-center justify-center gap-2 rounded-full bg-coral px-6 py-4 font-semibold text-white"
            >
              <Download size={18} /> Télécharger mon CV
            </a>
            <p className="mt-auto pb-10 text-sm text-cream/50">Marketing digital · Communication · Abidjan</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
