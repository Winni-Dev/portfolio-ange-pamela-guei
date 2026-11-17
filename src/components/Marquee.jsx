import { Sparkle } from 'lucide-react'
import { marquee } from '../data.js'

function Row({ items, reverse, className }) {
  const list = [...items, ...items]
  return (
    <div className={`flex overflow-hidden ${className}`}>
      <div
        className="animate-marquee flex shrink-0 items-center gap-6 whitespace-nowrap pr-6"
        style={reverse ? { animationDirection: 'reverse' } : undefined}
      >
        {list.map((t, i) => (
          <span key={i} className="flex items-center gap-6 font-display text-2xl font-bold sm:text-4xl">
            {t}
            <Sparkle size={22} className="shrink-0" fill="currentColor" />
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Marquee() {
  return (
    <section aria-label="Domaines d’expertise" className="relative -mt-6 overflow-hidden py-10">
      <Row items={marquee} className="-rotate-2 bg-coral py-4 text-white" />
      <Row items={[...marquee].reverse()} reverse className="-mt-2 rotate-1 bg-ink py-4 text-mango" />
    </section>
  )
}
