import { useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Mail, Phone, MapPin, ArrowUpRight, ArrowRight, Download, CheckCircle2 } from 'lucide-react'
import { profile } from '../data.js'

const subjects = ['Opportunité d’emploi', 'Stage / alternance', 'Mission freelance', 'Collaboration / partenariat', 'Autre']

/* Champ à étiquette flottante, style éditorial (simple ligne) */
function Field({ id, label, error, textarea, value, onChange, autoComplete, maxLength }) {
  const Tag = textarea ? 'textarea' : 'input'
  return (
    <div className="relative">
      <Tag
        id={id}
        value={value}
        onChange={onChange}
        placeholder=" "
        autoComplete={autoComplete}
        maxLength={maxLength}
        rows={textarea ? 4 : undefined}
        aria-invalid={!!error}
        className={`peer block w-full resize-none border-0 border-b bg-transparent px-0 pb-3 pt-6 text-base text-ink outline-none transition-colors placeholder:text-transparent ${
          error ? 'border-coral' : 'border-ink/20 focus:border-ink'
        }`}
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-0 top-6 text-base text-ink/45 transition-all duration-300 peer-focus:top-0 peer-focus:text-xs peer-focus:uppercase peer-focus:tracking-[0.18em] peer-focus:text-ink/60 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-[0.18em]"
      >
        {label}
      </label>
      {/* trait animé au focus */}
      <span
        className={`pointer-events-none absolute left-0 h-px w-full origin-left scale-x-0 bg-coral transition-transform duration-500 peer-focus:scale-x-100 ${
          textarea ? 'bottom-1.5' : 'bottom-0'
        }`}
      />
      <AnimatePresence>
        {error && (
          <motion.span
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-2 block text-xs font-medium text-coral"
          >
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  )
}

function WhatsAppIcon({ size = 16 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden>
      <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.1c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4C2.7 15.6 2.2 13.8 2.2 12 2.2 6.6 6.6 2.2 12 2.2c2.6 0 5.1 1 6.9 2.9 1.8 1.8 2.9 4.3 2.9 6.9 0 5.4-4.4 9.8-9.8 9.8zM20.5 3.5C18.2 1.2 15.2 0 12 0 5.4 0 0 5.4 0 12c0 2.1.6 4.2 1.6 6L0 24l6.2-1.6c1.8 1 3.8 1.5 5.8 1.5 6.6 0 12-5.4 12-12 0-3.2-1.2-6.2-3.5-8.4z" />
    </svg>
  )
}

const MAX = 600

function WhatsAppForm() {
  const [form, setForm] = useState({ name: '', company: '', subject: subjects[0], message: '' })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }))
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }))
  }

  function onSubmit(e) {
    e.preventDefault()
    const errs = {}
    if (!form.name.trim()) errs.name = 'Merci d’indiquer votre nom.'
    if (form.message.trim().length < 5) errs.message = 'Quelques mots suffisent pour commencer.'
    setErrors(errs)
    if (Object.keys(errs).length) return

    const text = [
      `Bonjour Pamela 👋`,
      ``,
      `*Nom :* ${form.name.trim()}`,
      form.company.trim() ? `*Entreprise :* ${form.company.trim()}` : null,
      `*Objet :* ${form.subject}`,
      ``,
      form.message.trim(),
      ``,
      `— Envoyé depuis votre portfolio`,
    ]
      .filter((l) => l !== null)
      .join('\n')

    window.open(`https://wa.me/${profile.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank', 'noopener')
    setSent(true)
  }

  return (
    <motion.form
      onSubmit={onSubmit}
      noValidate
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative rounded-[2rem] bg-cream p-6 text-ink shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)] sm:p-10"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-coral">Formulaire de contact</p>
          <p className="mt-2 font-display text-3xl leading-tight sm:text-4xl">
            Écrivez-moi <span className="italic">un mot.</span>
          </p>
        </div>
        <span className="mt-1 grid h-11 w-11 shrink-0 place-items-center rounded-full border border-ink/15 text-[#1da851]">
          <WhatsAppIcon size={20} />
        </span>
      </div>

      <div className="mt-8 grid gap-7 sm:grid-cols-2 sm:gap-6">
        <Field id="f-name" label="Votre nom *" value={form.name} onChange={set('name')} error={errors.name} autoComplete="name" />
        <Field id="f-company" label="Entreprise (optionnel)" value={form.company} onChange={set('company')} autoComplete="organization" />
      </div>

      <fieldset className="mt-8">
        <legend className="text-xs font-semibold uppercase tracking-[0.18em] text-ink/60">Objet</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {subjects.map((s) => {
            const active = form.subject === s
            return (
              <button
                type="button"
                key={s}
                aria-pressed={active}
                onClick={() => setForm((f) => ({ ...f, subject: s }))}
                className={`relative rounded-full px-4 py-2 text-sm transition-colors ${
                  active ? 'text-cream' : 'text-ink/70 ring-1 ring-ink/15 hover:ring-ink/40'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="subject-pill"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.45 }}
                    className="absolute inset-0 rounded-full bg-ink"
                  />
                )}
                <span className="relative">{s}</span>
              </button>
            )
          })}
        </div>
      </fieldset>

      <div className="mt-8">
        <Field
          id="f-message"
          label="Votre message *"
          textarea
          value={form.message}
          onChange={set('message')}
          error={errors.message}
          maxLength={MAX}
        />
        <p className="mt-2 text-right text-xs text-ink/40">
          {form.message.length}/{MAX}
        </p>
      </div>

      <div className="mt-6 flex flex-col-reverse items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-[16rem] text-xs leading-relaxed text-ink/50">
          Votre message s’ouvrira dans WhatsApp, prêt à être envoyé.
        </p>
        <button
          type="submit"
          className="group inline-flex w-full items-center justify-between gap-6 rounded-full bg-ink py-2 pl-6 pr-2 text-cream transition-colors hover:bg-coral sm:w-auto"
        >
          <span className="font-medium">Envoyer le message</span>
          <span className="grid h-11 w-11 place-items-center rounded-full bg-cream text-ink transition-transform duration-500 group-hover:-rotate-45">
            <ArrowRight size={18} />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {sent && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <p className="mt-6 flex items-center gap-2 border-t border-ink/10 pt-5 text-sm text-ink/70">
              <CheckCircle2 size={18} className="shrink-0 text-[#1da851]" />
              WhatsApp s’est ouvert : il ne reste plus qu’à appuyer sur « Envoyer ».
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.form>
  )
}

export default function Contact() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const scale = useTransform(scrollYProgress, [0, 0.4], [0.92, 1])
  const radius = useTransform(scrollYProgress, [0, 0.4], [64, 0])
  const x = useTransform(scrollYProgress, [0, 1], ['10%', '-25%'])

  const items = [
    { icon: Mail, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
    { icon: Phone, label: 'Téléphone', value: profile.phone, href: profile.phoneHref },
    { icon: Download, label: 'Mon CV', value: 'Télécharger (PDF)', href: profile.cv, download: true },
    { icon: MapPin, label: 'Localisation', value: profile.location },
  ]

  return (
    <section id="contact" ref={ref} className="overflow-hidden">
      <motion.div
        style={{ scale, borderTopLeftRadius: radius, borderTopRightRadius: radius }}
        className="grain relative overflow-hidden bg-ink pb-10 pt-24 text-cream sm:pt-32"
      >
        <motion.p
          style={{ x }}
          className="whitespace-nowrap font-display text-[18vw] font-semibold leading-none tracking-tighter text-white/[0.04]"
          aria-hidden
        >
          Parlons projet · Parlons projet
        </motion.p>

        <div className="relative mx-auto -mt-[8vw] max-w-6xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <motion.img
                initial={{ scale: 0, rotate: -20 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', bounce: 0.45 }}
                src={profile.photo}
                alt=""
                className="mb-6 h-20 w-20 rounded-full border-4 border-coral object-cover object-top"
              />
              <motion.h2
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-5xl font-semibold leading-[0.95] tracking-tight sm:text-7xl"
              >
                Un projet ?
                <br />
                <span className="italic text-coral">Parlons-en.</span>
              </motion.h2>
              <p className="mt-5 max-w-md text-cream/65">
                Une offre, une mission, une idée de collaboration ? Je réponds rapidement.
              </p>

              <div className="mt-8 grid gap-3">
                {items.map((it, i) => {
                  const Icon = it.icon
                  const Tag = it.href ? 'a' : 'div'
                  return (
                    <motion.div
                      key={it.label}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08, duration: 0.6 }}
                    >
                      <Tag
                        {...(it.href ? { href: it.href, download: it.download || undefined } : {})}
                        className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-coral/60 hover:bg-white/10"
                      >
                        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10 text-mango transition group-hover:bg-coral group-hover:text-white">
                          <Icon size={19} />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-xs uppercase tracking-widest text-cream/40">{it.label}</span>
                          <span className="block truncate font-semibold">{it.value}</span>
                        </span>
                        {it.href && (
                          <ArrowUpRight
                            size={18}
                            className="shrink-0 text-cream/30 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-coral"
                          />
                        )}
                      </Tag>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            <WhatsAppForm />
          </div>

          <footer className="mt-20 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-sm text-cream/40 sm:flex-row">
            <p>© {new Date().getFullYear()} Ange Pamela GUEI</p>
            <p>Marketing digital · Communication · Abidjan</p>
          </footer>
        </div>
      </motion.div>
    </section>
  )
}
