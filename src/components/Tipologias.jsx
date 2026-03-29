import { useState } from 'react'

const TIPOS = [
  {
    id: '90',
    label: '90 m² · 2 Suítes',
    title: 'Apartamento 2 Suítes',
    area: '90',
    features: [
      '2 suítes com amplo caixilho e persiana de enrolar',
      'Suíte master com closet e bancada em granito',
      'Terraço gourmet com previsão para churrasqueira',
      '2 vagas cobertas determinadas',
      'Depósito privativo incluso',
      'Previsão para ar-condicionado em dormitórios e sala',
    ],
    wppMsg: 'Quero%20saber%20mais%20sobre%20o%20apartamento%20de%2090m%C2%B2',
    Floor: Floor90,
  },
  {
    id: '123',
    label: '123 m² · 3 Suítes',
    title: 'Apartamento 3 Suítes',
    area: '123',
    features: [
      '3 suítes com amplo caixilho e persiana de enrolar',
      'Suíte master com closet, 2 cubas e bancada em granito',
      'Elevadores semi-privativos exclusivos',
      'Lavabo com bancada em mármore',
      'Terraço gourmet com previsão para churrasqueira',
      '2 vagas cobertas determinadas',
      'Depósito privativo no andar',
      'Previsão para ar-condicionado em todos os ambientes',
    ],
    wppMsg: 'Quero%20saber%20mais%20sobre%20o%20apartamento%20de%20123m%C2%B2',
    Floor: Floor123,
  },
]

export default function Tipologias() {
  const [active, setActive] = useState('90')
  const tipo = TIPOS.find((t) => t.id === active)

  return (
    <section id="tipologias" className="bg-bg py-32 px-[8vw]" aria-labelledby="tipologias-title">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-16 reveal">
          <span className="block font-label text-gold text-[.7rem] tracking-[.25em] uppercase mb-4">Plantas</span>
          <h2
            id="tipologias-title"
            className="font-serif font-light text-cream leading-[1.2] max-w-[20ch]"
            style={{ fontSize: 'clamp(2rem, 3.5vw, 3.2rem)' }}
          >
            Encontre o espaço <em className="not-italic text-gold-lt">ideal</em> para a sua família
          </h2>
          <div className="w-[60px] h-px mt-6" style={{ background: 'linear-gradient(to right, #c9a84c, transparent)' }} />
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border mb-16 overflow-x-auto" role="tablist" aria-label="Tipologias de apartamentos">
          {TIPOS.map((t) => (
            <button
              key={t.id}
              className={[
                'px-10 py-4 font-label text-[.68rem] tracking-[.2em] uppercase border-b-2 -mb-px bg-transparent transition-all duration-200 whitespace-nowrap cursor-pointer',
                active === t.id
                  ? 'text-gold border-gold'
                  : 'text-muted border-transparent hover:text-cream',
              ].join(' ')}
              role="tab"
              aria-selected={active === t.id}
              aria-controls={`panel-${t.id}`}
              onClick={() => setActive(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Panel */}
        <div id={`panel-${tipo.id}`} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center" role="tabpanel">
          <div className="aspect-square bg-bg3 border border-border flex items-center justify-center overflow-hidden">
            <tipo.Floor />
          </div>
          <div>
            <h3 className="font-serif text-cream mb-4" style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}>
              {tipo.title}
            </h3>
            <div className="font-serif text-gold flex items-baseline gap-1 mb-8">
              <span className="text-[3rem] leading-none">{tipo.area}</span>m²
            </div>
            <ul className="list-none flex flex-col gap-3 mb-10" aria-label="Características">
              {tipo.features.map((f) => (
                <li key={f} className="flex items-center gap-4 text-[.9rem] text-cream/70">
                  <span className="w-5 h-px bg-gold shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <a
              href={`https://wa.me/551121490015?text=${tipo.wppMsg}`}
              className="inline-flex items-center gap-3 px-9 py-4 font-label text-[.7rem] tracking-[.2em] uppercase no-underline transition-all duration-250 hover:opacity-85 hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, #c9a84c 0%, #e8cc7e 100%)', color: '#0a0a10' }}
              target="_blank" rel="noopener"
            >
              Solicitar informações da planta de {tipo.area}m²
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function Floor90() {
  return (
    <svg width="80%" height="80%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-label="Planta do apartamento de 90m²">
      <rect x="15" y="15" width="170" height="170" fill="none" stroke="#c9a84c" strokeWidth="2.5" />
      <rect x="15" y="85" width="80" height="100" fill="rgba(201,168,76,0.04)" stroke="rgba(201,168,76,0.3)" strokeWidth="1" />
      <text x="55" y="140" fill="rgba(201,168,76,0.6)" fontSize="7" textAnchor="middle" fontFamily="Marcellus,serif" letterSpacing="1">SALA</text>
      <rect x="95" y="115" width="90" height="70" fill="rgba(201,168,76,0.04)" stroke="rgba(201,168,76,0.3)" strokeWidth="1" />
      <text x="140" y="153" fill="rgba(201,168,76,0.6)" fontSize="7" textAnchor="middle" fontFamily="Marcellus,serif" letterSpacing="1">COZINHA</text>
      <rect x="95" y="15" width="90" height="60" fill="rgba(201,168,76,0.04)" stroke="rgba(201,168,76,0.3)" strokeWidth="1" />
      <text x="140" y="48" fill="rgba(201,168,76,0.6)" fontSize="7" textAnchor="middle" fontFamily="Marcellus,serif" letterSpacing="1">SUÍTE 1</text>
      <rect x="15" y="15" width="80" height="70" fill="rgba(201,168,76,0.04)" stroke="rgba(201,168,76,0.3)" strokeWidth="1" />
      <text x="55" y="53" fill="rgba(201,168,76,0.6)" fontSize="7" textAnchor="middle" fontFamily="Marcellus,serif" letterSpacing="1">SUÍTE 2</text>
      <rect x="95" y="75" width="90" height="40" fill="rgba(201,168,76,0.02)" stroke="rgba(201,168,76,0.2)" strokeWidth="1" strokeDasharray="3,2" />
      <text x="140" y="98" fill="rgba(201,168,76,0.4)" fontSize="6" textAnchor="middle" fontFamily="Marcellus,serif" letterSpacing="1">VARANDA</text>
    </svg>
  )
}

function Floor123() {
  return (
    <svg width="80%" height="80%" viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg" aria-label="Planta do apartamento de 123m²">
      <rect x="15" y="15" width="170" height="190" fill="none" stroke="#c9a84c" strokeWidth="2.5" />
      <rect x="15" y="100" width="90" height="105" fill="rgba(201,168,76,0.04)" stroke="rgba(201,168,76,0.3)" strokeWidth="1" />
      <text x="60" y="156" fill="rgba(201,168,76,0.6)" fontSize="7" textAnchor="middle" fontFamily="Marcellus,serif" letterSpacing="1">SALA</text>
      <rect x="105" y="130" width="80" height="75" fill="rgba(201,168,76,0.04)" stroke="rgba(201,168,76,0.3)" strokeWidth="1" />
      <text x="145" y="170" fill="rgba(201,168,76,0.6)" fontSize="7" textAnchor="middle" fontFamily="Marcellus,serif" letterSpacing="1">COZINHA</text>
      <rect x="105" y="15" width="80" height="70" fill="rgba(201,168,76,0.06)" stroke="rgba(201,168,76,0.4)" strokeWidth="1.2" />
      <text x="145" y="50" fill="rgba(201,168,76,0.7)" fontSize="7" textAnchor="middle" fontFamily="Marcellus,serif" letterSpacing="1">MASTER</text>
      <rect x="15" y="15" width="90" height="45" fill="rgba(201,168,76,0.04)" stroke="rgba(201,168,76,0.3)" strokeWidth="1" />
      <text x="60" y="40" fill="rgba(201,168,76,0.6)" fontSize="7" textAnchor="middle" fontFamily="Marcellus,serif" letterSpacing="1">SUÍTE 2</text>
      <rect x="15" y="60" width="90" height="40" fill="rgba(201,168,76,0.04)" stroke="rgba(201,168,76,0.3)" strokeWidth="1" />
      <text x="60" y="82" fill="rgba(201,168,76,0.6)" fontSize="7" textAnchor="middle" fontFamily="Marcellus,serif" letterSpacing="1">SUÍTE 3</text>
      <rect x="105" y="85" width="80" height="45" fill="rgba(201,168,76,0.02)" stroke="rgba(201,168,76,0.2)" strokeWidth="1" strokeDasharray="3,2" />
      <text x="145" y="111" fill="rgba(201,168,76,0.4)" fontSize="6" textAnchor="middle" fontFamily="Marcellus,serif" letterSpacing="1">VARANDA</text>
    </svg>
  )
}
