const DISTANCES = [
  { place: 'Alpha Square Mall',               time: '2',  unit: 'min' },
  { place: 'Pão de Açúcar · St Marche',       time: '5',  unit: 'min' },
  { place: 'Shopping Flamingo',               time: '5',  unit: 'min' },
  { place: 'Escola Internacional Alphaville', time: '5',  unit: 'min' },
  { place: 'Delboni Auriemo',                 time: '6',  unit: 'min' },
  { place: 'Shopping Iguatemi Alphaville',    time: '7',  unit: 'min' },
  { place: 'Hospital Albert Einstein',        time: '7',  unit: 'min' },
  { place: 'FGV Alphaville',                  time: '7',  unit: 'min' },
  { place: 'Shopping Tamboré',                time: '7',  unit: 'min' },
  { place: 'Maple Bear',                      time: '10', unit: 'min' },
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
              Tudo que importa está a menos de <em className="not-italic text-gold-lt">10 minutos</em>
            </h2>
            <div className="w-[60px] h-px mt-6" style={{ background: 'linear-gradient(to right, #c9a84c, transparent)' }} />
          </div>
          <p className="reveal text-[.9rem] text-muted leading-[1.7] mb-10">
            Albert Einstein a 7 minutos, Iguatemi Alphaville a 7 minutos, Escola
            Internacional a 5 minutos, Pão de Açúcar a 5 minutos e o Alpha Square
            Mall a 2 minutos da porta. Tudo que Alphaville oferece — sem percorrer
            mais de 10 minutos do endereço mais valorizado da região.
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

        {/* Google Maps */}
        <div
          className="reveal reveal-delay-2 relative aspect-[4/5] bg-bg3 border border-border overflow-hidden"
          aria-label="Localização no Google Maps"
        >
          <iframe
            title="Localização Andrômeda Home no Google Maps"
            src="https://maps.google.com/maps?q=Av.+Andr%C3%B4meda,+310,+Alphaville,+Barueri,+SP&output=embed&z=16&hl=pt-BR"
            className="absolute inset-0 w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            style={{
              filter: 'invert(90%) hue-rotate(180deg) brightness(0.85) saturate(0.85)',
            }}
          />
          {/* Address card */}
          <address
            className="absolute bottom-8 left-8 right-8 border border-border p-5 not-italic backdrop-blur-[10px] pointer-events-none"
            style={{ background: 'rgba(8,8,16,.85)' }}
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
