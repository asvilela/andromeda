const STATS = [
  { value: '36',    unit: 'pav.',     label: 'Torre única em Alphaville' },
  { value: '288',   unit: 'unid.',    label: 'De 90 m² e 123 m²' },
  { value: '23',    unit: 'espaços',  label: 'De lazer no 2º pavimento' },
  { value: '7.620', unit: 'm²',      label: 'De terreno exclusivo' },
]

export default function Numbers() {
  return (
    <div
      id="numbers"
      className="bg-white px-[8vw] py-20 border-y border-black/[.05]"
      aria-label="Números do empreendimento"
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-[1200px] mx-auto">
        {STATS.map(({ value, unit, label }, i) => (
          <div
            key={label}
            className={`reveal reveal-delay-${i + 1} text-center py-6 px-4 ${i < 3 ? 'lg:border-r border-black/[.06]' : ''}`}
          >
            <div className="font-serif text-gold-dk leading-none mb-2" style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.4rem)' }}>
              {value}{' '}
              <span className="font-serif text-gold text-base">{unit}</span>
            </div>
            <div className="font-label text-[.62rem] tracking-[.2em] uppercase text-text-2 mt-2">{label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
