const DISTANCES = [
  { place: 'Alpha Square Mall',               time: '2',  unit: 'min' },
  { place: 'Shopping Flamingo',               time: '5',  unit: 'min' },
  { place: 'Shopping Iguatemi Alphaville',     time: '7',  unit: 'min' },
  { place: 'Shopping Tamboré',                time: '7',  unit: 'min' },
  { place: 'Hospital Albert Einstein',         time: '7',  unit: 'min' },
  { place: 'Escola Internacional Alphaville',  time: '5',  unit: 'min' },
  { place: 'FGV Alphaville',                  time: '7',  unit: 'min' },
  { place: 'Delboni Auriemo',                 time: '6',  unit: 'min' },
]

export default function Localizacao() {
  return (
    <section id="localizacao" className="bg-bg2 py-32 px-[8vw]" aria-labelledby="localizacao-title">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        {/* Left */}
        <div>
          <div className="mb-16 reveal">
            <span className="block font-label text-gold text-[.7rem] tracking-[.25em] uppercase mb-4">Localização</span>
            <h2
              id="localizacao-title"
              className="font-serif font-light text-cream leading-[1.2] max-w-[20ch]"
              style={{ fontSize: 'clamp(2rem, 3.5vw, 3.2rem)' }}
            >
              O melhor de Alphaville a <em className="not-italic text-gold-lt">poucos minutos</em>
            </h2>
            <div className="w-[60px] h-px mt-6" style={{ background: 'linear-gradient(to right, #c9a84c, transparent)' }} />
          </div>
          <p className="reveal text-[.9rem] text-muted leading-[1.7] mb-10">
            Na Av. Andrômeda, você está no endereço mais completo da região.
            Shoppings, hospitais, escolas internacionais e restaurantes premiados
            — tudo ao alcance sem abrir mão da sua tranquilidade.
          </p>
          <ul className="list-none" aria-label="Distâncias e tempos até pontos de interesse">
            {DISTANCES.map(({ place, time, unit }, i) => (
              <li
                key={place}
                className={`reveal reveal-delay-${i} flex justify-between items-center py-5 border-b border-border first:border-t first:border-border`}
              >
                <span className="text-[.88rem] text-cream/75">{place}</span>
                <span className="font-serif text-gold flex items-baseline gap-1">
                  <span className="text-[1.6rem] leading-none">{time}</span>
                  <small className="font-sans text-[.7rem] text-muted">{unit}</small>
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Map */}
        <div
          className="reveal reveal-delay-2 relative aspect-[4/5] bg-bg3 border border-border overflow-hidden"
          aria-label="Mapa ilustrativo da localização"
        >
          <div
            className="absolute inset-0"
            aria-hidden="true"
            style={{ background: 'linear-gradient(135deg, #0a1020 0%, #0e1830 60%, #080f20 100%)' }}
          />
          <div
            className="absolute inset-0"
            aria-hidden="true"
            style={{
              background: `
                repeating-linear-gradient(0deg, transparent, transparent 29px, rgba(201,168,76,.05) 30px),
                repeating-linear-gradient(90deg, transparent, transparent 29px, rgba(201,168,76,.05) 30px)
              `,
            }}
          />
          {/* Pin */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" aria-hidden="true">
            <div
              className="w-[14px] h-[14px] bg-gold rounded-full animate-[pin-pulse_2s_infinite]"
              style={{ boxShadow: '0 0 0 6px rgba(201,168,76,.2), 0 0 0 12px rgba(201,168,76,.08)' }}
            />
          </div>
          {/* Address */}
          <address
            className="absolute bottom-8 left-8 right-8 border border-border p-5 not-italic backdrop-blur-[10px]"
            style={{ background: 'rgba(8,8,16,.8)' }}
          >
            <p className="text-[.82rem] text-muted leading-[1.6]">
              <strong className="text-cream font-normal">Andrômeda Home</strong><br />
              Av. Andrômeda, 310 · Alphaville<br />
              Barueri · São Paulo
            </p>
          </address>
        </div>
      </div>
    </section>
  )
}
