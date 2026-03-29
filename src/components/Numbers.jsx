const STATS = [
  { value: '6',      unit: 'torres', label: 'Baixa densidade' },
  { value: '45.000', unit: 'm²',     label: 'Área total do terreno' },
  { value: '20.000', unit: 'm²',     label: 'Área verde preservada' },
  { value: 'Jan',    unit: '2026',   label: 'Previsão de entrega' },
]

export default function Numbers() {
  return (
    <div
      id="numbers"
      className="bg-bg2 border-t border-b border-border px-[8vw] py-12"
      aria-label="Números do empreendimento"
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-[1200px] mx-auto">
        {STATS.map(({ value, unit, label }, i) => (
          <div
            key={label}
            className={`reveal reveal-delay-${i} text-center py-6 px-4 ${i < 3 ? 'lg:border-r border-border' : ''}`}
          >
            <div className="font-serif text-gold leading-none mb-1" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              {value}{' '}
              <span className="font-serif text-gold-lt text-base">{unit}</span>
            </div>
            <div className="font-label text-[.62rem] tracking-[.2em] uppercase text-muted mt-2">{label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
