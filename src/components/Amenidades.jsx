const AMENIDADES = [
  {
    name: 'Piscina Adulto Raia 25m',
    desc: 'Piscina semiolímpica com previsão para climatização. Raia de 25m e piscina infantil com 30cm de profundidade — segura para os pequenos.',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 12c0-2.4 2.1-4.3 4.5-4 .9-2.3 3-4 5.5-4 3.3 0 6 2.7 6 6 1.7.3 3 1.8 3 3.5C22 15.4 20.4 17 18.5 17H5.5C3.6 17 2 15.4 2 13.5c0-1.7 1.3-3.1 3-3.5" /></svg>,
  },
  {
    name: 'Fitness & Wellness',
    desc: 'Fitness indoor e outdoor com equipamentos individuais e duais. Sauna, sala de descanso, massagem e espaço beauty completam o circuito.',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="3" /><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" /></svg>,
  },
  {
    name: 'Beach Tennis & Quadra Recreativa',
    desc: 'Quadra oficial de beach tennis e quadra recreativa para esportes coletivos. Lazer ativo a qualquer hora do dia.',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M12 8v8M8 12h8" /></svg>,
  },
  {
    name: 'Gourmet, Sport Bar & Churrasqueiras',
    desc: 'Espaço gourmet, sport bar e churrasqueiras ao ar livre — três ambientes para reunir amigos e família com sofisticação.',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
  },
  {
    name: 'Coworking & Sala de Reunião',
    desc: 'Coworking profissional com sala de reunião privativa e web garden. Trabalhe com produtividade sem enfrentar o trânsito.',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>,
  },
  {
    name: 'Pet Place & Espaços Kids',
    desc: 'Pet place, pet care com banho no subsolo, brinquedoteca, playground kids e playground baby — cada membro da família tem o seu espaço.',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" /></svg>,
  },
]

export default function Amenidades() {
  return (
    <section id="amenidades" className="bg-bg2 py-32 px-[8vw]" aria-labelledby="amenidades-title">
      <div className="max-w-[1200px] mx-auto">
        {/* Top */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20 items-end">
          <div>
            <div className="mb-16 reveal">
              <span className="block font-label text-gold text-[.7rem] tracking-[.25em] uppercase mb-4">Estilo de vida</span>
              <h2
                id="amenidades-title"
                className="font-serif font-light text-cream leading-[1.2] max-w-[20ch]"
                style={{ fontSize: 'clamp(2rem, 3.5vw, 3.2rem)' }}
              >
                Mais de 20 <em className="not-italic text-gold-lt">experiências</em> sem sair de casa
              </h2>
              <div className="w-[60px] h-px mt-6" style={{ background: 'linear-gradient(to right, #c9a84c, transparent)' }} />
            </div>
            <p className="reveal reveal-delay-1 text-[.95rem] leading-[1.85] text-cream/60">
              Do lazer elevado no 2° pavimento ao pet care no subsolo,
              cada espaço foi projetado para que o seu dia a dia tenha
              a qualidade de um resort cinco estrelas.
            </p>
          </div>
          <p
            className="reveal reveal-delay-2 font-serif text-gold-lt leading-[1.4] lg:text-right"
            style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontStyle: 'italic' }}
          >
            "No Andrômeda, o extraordinário é o seu cotidiano."
          </p>
        </div>

        {/* Grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px border border-border"
          style={{ background: 'rgba(201,168,76,.18)' }}
          role="list"
        >
          {AMENIDADES.map(({ name, desc, icon }, i) => (
            <article
              key={name}
              className={`reveal reveal-delay-${(i % 3) + 1} bg-bg2 p-10 flex flex-col gap-4 transition-colors duration-250 hover:bg-bg3`}
              role="listitem"
            >
              <div className="w-[42px] h-[42px] border border-border flex items-center justify-center text-gold" aria-hidden="true">
                {icon}
              </div>
              <h3 className="font-serif text-cream text-[1.1rem]">{name}</h3>
              <p className="text-[.82rem] leading-[1.65] text-muted">{desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
