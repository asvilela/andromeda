import { STATS } from '@/lib/constants'

export default function Numbers() {
  return (
    <section
      id="numbers"
      role="region"
      className="bg-charcoal px-[8vw] py-20 border-y border-white/[.06]"
      aria-label="Números do empreendimento"
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-[1200px] mx-auto">
        {STATS.map(({ value, unit, label }, i) => (
          <div
            key={label}
            className={`reveal reveal-delay-${i + 1} text-center py-6 px-4 ${i < 3 ? 'lg:border-r border-white/[.08]' : ''}`}
          >
            <div
              className="font-serif text-bg leading-none mb-2"
              style={{ fontSize: 'clamp(2.8rem, 5vw, 4rem)', fontVariantNumeric: 'tabular-nums' }}
            >
              {value}{' '}
              <span className="font-serif text-gold-lt text-base">{unit}</span>
            </div>
            <div className="font-label text-[.62rem] tracking-[.2em] uppercase text-bg/50 mt-2">{label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
