// ============================================================
// constants.ts — Dados centralizados do empreendimento
// Este é o ÚNICO arquivo que muda entre empreendimentos.
// ============================================================

// === IMAGENS (imports estáticos para Vite) ===
import facadeImg from '@/assets/apartamento-alphaville-andromeda-by-mpd-fachada.webp'
import facadeNightImg from '@/assets/apartamento-alphaville-andromeda-by-mpd-fachada-noturna.webp'
import lobbyImg from '@/assets/apartamento-alphaville-andromeda-by-mpd-lobby.webp'
import living78Img from '@/assets/apartamento-alphaville-andromeda-by-mpd-living-78.webp'
import living120Img from '@/assets/apartamento-alphaville-andromeda-by-mpd-living-120.webp'
import planta90_1suite from '@/assets/apartamento-alphaville-andromeda-by-mpd-planta90m-1-suite.webp'
import planta90_2suites from '@/assets/apartamento-alphaville-andromeda-by-mpd-planta90m-2-suites.webp'
import planta123_2suites from '@/assets/apartamento-alphaville-andromeda-by-mpd-planta123m-2-suites.webp'
import planta123_3suites from '@/assets/apartamento-alphaville-andromeda-by-mpd-planta123m-3-suites.webp'
import piscinaImg from '@/assets/apartamento-alphaville-andromeda-by-mpd-piscina-descoberta.webp'
import fitnessImg from '@/assets/apartamento-alphaville-andromeda-by-mpd-fitness.webp'
import saunaImg from '@/assets/apartamento-alphaville-andromeda-by-mpd-sauna.webp'
import coworkingImg from '@/assets/apartamento-alphaville-andromeda-by-mpd-coworking.webp'
import gourmetImg from '@/assets/apartamento-alphaville-andromeda-by-mpd-espaco-gourmet.webp'
import quadraBtImg from '@/assets/apartamento-alphaville-andromeda-by-mpd-quadra-bt.webp'
import salaoImg from '@/assets/apartamento-alphaville-andromeda-by-mpd-salao-festas.webp'
import petImg from '@/assets/apartamento-alphaville-andromeda-by-mpd-espaco-pet.webp'
import brinqImg from '@/assets/apartamento-alphaville-andromeda-by-mpd-brinquedoteca.webp'
import pickleballImg from '@/assets/apartamento-alphaville-andromeda-by-mpd-pickleball.webp'

// === WHATSAPP ===
export const WHATSAPP_NUMBER = '5511964178766'
export const WHATSAPP_MESSAGE = 'Olá! Tenho interesse no Andrômeda by MPD. Pode me enviar mais informações?'
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

// === CORRETOR ===
export const BROKER = {
  name: 'Tainara',
  phone: '(11) 96417-8766',
  slug: 'tainara-broker',
}

// === EMPREENDIMENTO ===
export const PROJECT = {
  name: 'Andrômeda Home',
  productName: 'Andromeda by MPD',
  tagline: 'O último grande endereço residencial da Avenida Andrômeda',
  subtitle: 'Apartamentos de alto padrão com plantas generosas, lazer completo no 2º pavimento e assinatura MPD em uma das localizações mais estratégicas de Alphaville.',
  incorporadora: 'MPD Engenharia', // TODO: razão social completa
  realizacao: 'MPD',
  heroImage: facadeImg,
  address: {
    street: 'Av. Andrômeda, 310',
    neighborhood: 'Alphaville',
    city: 'Barueri',
    state: 'SP',
    full: 'Av. Andrômeda, 310 · Alphaville, Barueri · São Paulo',
  },
  coordinates: { lat: -23.49, lng: -46.85 }, // TODO: coordenadas exatas
  phone: '(11) 2149-0015',
  domain: 'https://andromedahome.com.br', // TODO: domínio definitivo
}

// === NAVEGAÇÃO ===
export const NAV_LINKS: { label: string; href: string }[] = [
  { label: 'O Projeto', href: '#projeto' },
  { label: 'Amenidades', href: '#amenidades' },
  { label: 'Plantas', href: '#tipologias' },
  { label: 'Localização', href: '#localizacao' },
  { label: 'FAQ', href: '#faq' },
]

// === NÚMEROS ===
export const STATS = [
  { value: '36', unit: 'pav.', label: 'Arquitetura vertical elegante em localização estratégica' },
  { value: '288', unit: 'unid.', label: 'Projeto exclusivo, com seleção limitada de unidades' },
  { value: '23', unit: 'espaços', label: 'Estrutura completa para rotina, família e bem-estar' },
  { value: '7.620', unit: 'm²', label: 'Implantação ampla, com mais conforto e respiro' },
]

// === SPECS DO PROJETO ===
export const SPECS = [
  { value: '2–3', desc: 'Suítes por unidade' },
  { value: '2', desc: 'Vagas determinadas' },
  { value: '✓', desc: 'Depósito privativo em todos os andares' },
  { value: '23', desc: 'Espaços de lazer no 2º pavimento' },
]

// === IMAGENS DO PROJETO ===
export const PROJECT_IMAGES = {
  facadeNight: facadeNightImg,
  lobby: lobbyImg,
}

// === PLANTAS ===
export interface FloorPlanVariant {
  id: string
  label: string
  image: string
  alt: string
}

export interface FloorPlan {
  id: string
  tab: string
  title: string
  area: string
  description: string
  features: string[]
  livingImg: string
  variants: FloorPlanVariant[]
}

export const FLOOR_PLANS: FloorPlan[] = [
  {
    id: '90',
    tab: '90 m²',
    title: 'Apartamento 90 m²',
    area: '90',
    description: 'Ideal para quem busca conforto, praticidade e uma rotina bem resolvida em Alphaville.',
    features: [
      'Caixilhos ampliados com persiana de enrolar nos dormitórios',
      'Suíte master com closet e bancada em granito',
      'Terraço gourmet com previsão para churrasqueira à carvão',
      'Água quente na cozinha e em todos os banheiros',
      'Piso do terraço nivelado (sem desnível na entrega)',
      '2 vagas cobertas determinadas (não sorteadas)',
      'Depósito privativo incluso no andar',
      'Infraestrutura completa para ar-condicionado',
    ],
    livingImg: living78Img,
    variants: [
      { id: '90-1', label: '1 Suíte', image: planta90_1suite, alt: 'Planta do apartamento de 90m² com 1 suíte' },
      { id: '90-2', label: '2 Suítes', image: planta90_2suites, alt: 'Planta do apartamento de 90m² com 2 suítes' },
    ],
  },
  {
    id: '123',
    tab: '123 m²',
    title: 'Apartamento 123 m²',
    area: '123',
    description: 'Mais amplitude, melhor setorização e maior potencial de valorização para famílias que buscam espaço e privacidade.',
    features: [
      'Caixilhos ampliados com persiana de enrolar nos dormitórios',
      'Suíte master com closet, 2 cubas e bancada em granito',
      'Elevadores semi-privativos exclusivos para as unidades 123m²',
      'Lavabo com bancada em mármore',
      'Terraço gourmet com previsão para churrasqueira à carvão',
      'Água quente na cozinha e em todos os banheiros',
      'Piso do terraço nivelado (sem desnível na entrega)',
      '2 vagas cobertas determinadas (não sorteadas)',
      'Depósito privativo no andar',
      'Infraestrutura de ar-condicionado em todos os ambientes, incluindo terraço',
    ],
    livingImg: living120Img,
    variants: [
      { id: '123-2', label: '2 Suítes', image: planta123_2suites, alt: 'Planta do apartamento de 123m² com 2 suítes' },
      { id: '123-3', label: '3 Suítes', image: planta123_3suites, alt: 'Planta do apartamento de 123m² com 3 suítes' },
    ],
  },
]

// === AMENIDADES ===
export interface AmenidadeItem {
  img: string
  alt: string
  label: string
  desc?: string
}

export const AMENIDADES_MAIN: AmenidadeItem[] = [
  { img: piscinaImg, alt: 'Piscina adulto raia 25m', label: 'Piscina Raia 25m', desc: 'Semiolímpica com previsão para climatização' },
  { img: fitnessImg, alt: 'Fitness indoor', label: 'Fitness Indoor & Externo', desc: 'Aparelhos individuais e duais, sauna e espaço beauty' },
  { img: saunaImg, alt: 'Sauna e área de descanso', label: 'Sauna & Descanso', desc: 'Sauna, sala de massagem e área de relaxamento' },
  { img: coworkingImg, alt: 'Coworking', label: 'Coworking Profissional', desc: 'Sala de reunião privativa, web garden e lounge' },
  { img: gourmetImg, alt: 'Espaço gourmet', label: 'Gourmet & Sport Bar', desc: 'Espaço gourmet, sport bar e churrasqueiras ao ar livre' },
]

export const AMENIDADES_STRIP: AmenidadeItem[] = [
  { img: quadraBtImg, alt: 'Quadra de beach tennis', label: 'Beach Tennis' },
  { img: salaoImg, alt: 'Salão de festas', label: 'Salão de Festas' },
  { img: petImg, alt: 'Pet place', label: 'Pet Place & Pet Care' },
  { img: brinqImg, alt: 'Brinquedoteca', label: 'Brinquedoteca' },
  { img: pickleballImg, alt: 'Pickleball', label: 'Pickleball' },
]

export const AMENIDADES_ALL: AmenidadeItem[] = [...AMENIDADES_MAIN, ...AMENIDADES_STRIP]

// === LOCALIZAÇÃO ===
export const DISTANCES = [
  { place: 'Alpha Square Mall', time: '2', unit: 'min' },
  { place: 'Pão de Açúcar · St Marche', time: '5', unit: 'min' },
  { place: 'Shopping Flamingo', time: '5', unit: 'min' },
  { place: 'Escola Internacional Alphaville', time: '5', unit: 'min' },
  { place: 'Delboni Auriemo', time: '6', unit: 'min' },
  { place: 'Shopping Iguatemi Alphaville', time: '7', unit: 'min' },
  { place: 'Hospital Albert Einstein', time: '7', unit: 'min' },
  { place: 'FGV Alphaville', time: '7', unit: 'min' },
  { place: 'Shopping Tamboré', time: '7', unit: 'min' },
  { place: 'Maple Bear', time: '10', unit: 'min' },
]

// === FAQ ===
export const FAQ_ITEMS = [
  { q: 'Qual é o valor dos apartamentos?', a: 'Os valores variam conforme metragem, andar, vista, final da unidade e disponibilidade. Por isso, fazemos uma simulação personalizada para indicar as melhores opções para seu perfil e planejamento financeiro.' },
  { q: 'Vocês enviam tabela de preços?', a: 'Como a disponibilidade muda e cada unidade possui condições específicas, o ideal é montar uma simulação atualizada com base no seu objetivo. Solicite a sua e receba as opções mais alinhadas ao seu perfil.' },
  { q: 'Quais plantas estão disponíveis?', a: 'O Andrômeda oferece apartamentos de 90m² (1 ou 2 suítes) e 123m² (2 ou 3 suítes). A disponibilidade por andar, vista e final depende do momento da consulta. Podemos verificar as opções disponíveis para você.' },
  { q: 'É possível financiar?', a: 'Sim. O empreendimento opera com diferentes modalidades, incluindo parcelamento durante a obra e financiamento bancário. Podemos avaliar um fluxo de pagamento considerando entrada, parcelas e condições disponíveis para o seu perfil.' },
  { q: 'O empreendimento é bom para morar ou investir?', a: 'Pode atender aos dois objetivos. A melhor indicação depende do seu perfil, prazo, objetivo e faixa de investimento. Solicite uma análise personalizada para avaliarmos juntos.' },
  { q: 'As vagas de garagem são sorteadas ou determinadas?', a: 'Determinadas: não há sorteio. Todas as 288 unidades possuem 2 vagas cobertas alocadas desde a aquisição, distribuídas nos 3 subsolos. O empreendimento conta ainda com 13 vagas de visitantes e 32 vagas de moto.' },
  { q: 'O que está incluído em cada apartamento na entrega?', a: 'Todos os apartamentos são entregues com: depósito privativo no andar, 2 vagas determinadas, caixilhos ampliados com persiana de enrolar, bancadas em granito (e mármore no lavabo das unidades de 123m²), água quente na cozinha e em todos os banheiros, piso do terraço nivelado e infraestrutura completa para ar-condicionado.' },
  { q: 'Como funciona a segurança do condomínio?', a: 'O empreendimento conta com guarita blindada (porta, caixilho e alvenaria), sala de segurança, câmeras de segurança perimetral e em todas as áreas comuns, pulmão de segurança para pedestres e veículos e acessos de serviço independentes do acesso social.' },
  { q: 'O empreendimento é pet-friendly?', a: 'Sim. O Andrômeda conta com Pet Place no 2º pavimento (lazer elevado) e Pet Care com serviço de banho no subsolo, ambos projetados para garantir conforto ao seu animal e praticidade para você.' },
]

// === OPÇÕES DE FORMULÁRIOS ===
export const INTERESSE_WA_OPTIONS = [
  { value: 'Valores e condições', label: 'Valores e condições' },
  { value: 'Disponibilidade de unidades', label: 'Disponibilidade de unidades' },
  { value: 'Agendar uma visita', label: 'Agendar uma visita' },
  { value: 'Investimento e valorização', label: 'Investimento e valorização' },
]

export const TIPOLOGIA_OPTIONS = [
  { value: '90 m²', label: '90 m² · 1 ou 2 Suítes' },
  { value: '123 m²', label: '123 m² · 2 ou 3 Suítes' },
]

export const OBJETIVO_OPTIONS = [
  { value: 'Moradia', label: 'Moradia' },
  { value: 'Investimento', label: 'Investimento' },
  { value: 'Ainda avaliando', label: 'Ainda avaliando' },
]

export const PREFERENCIA_OPTIONS = [
  { value: 'Andar alto', label: 'Andar alto' },
  { value: 'Andar intermediário', label: 'Andar intermediário' },
  { value: 'Sem preferência', label: 'Sem preferência' },
]

export const FAIXA_INVESTIMENTO_OPTIONS = [
  { value: 'Até R$ 800 mil', label: 'Até R$ 800 mil' },
  { value: 'R$ 800 mil a R$ 1,2M', label: 'R$ 800 mil a R$ 1,2M' },
  { value: 'Acima de R$ 1,2M', label: 'Acima de R$ 1,2M' },
  { value: 'Prefiro avaliar', label: 'Prefiro avaliar' },
]

export const HORARIO_OPTIONS = [
  { value: 'Manhã', label: 'Manhã (9h–12h)' },
  { value: 'Tarde', label: 'Tarde (12h–18h)' },
  { value: 'Noite', label: 'Noite (18h–21h)' },
]

// === INCORPORADORA ===
export const DEVELOPER = {
  name: 'MPD Engenharia',
  description: 'A MPD é uma das incorporadoras mais reconhecidas da região, com histórico de projetos residenciais que combinam localização estratégica, qualidade construtiva e valorização patrimonial.',
  highlights: [
    'Tradição e solidez em Alphaville',
    'Projetos residenciais de alto padrão',
    'Qualidade construtiva reconhecida',
    'Valorização patrimonial comprovada',
  ],
  // TODO: adicionar logo, números reais, etc.
}

// === LEGAL ===
export const DISCLAIMER = 'As imagens são meramente ilustrativas e poderão sofrer alterações. Os móveis e objetos de decoração são sugestões e não fazem parte do contrato. O memorial descritivo prevalece sobre qualquer informação contida neste material.' // TODO: dados reais

// === FOOTER ===
export const FOOTER_LINKS: { label: string; href: string }[] = [
  { label: 'O Projeto', href: '#projeto' },
  { label: 'Amenidades', href: '#amenidades' },
  { label: 'Plantas', href: '#tipologias' },
  { label: 'Localização', href: '#localizacao' },
  { label: 'Contato', href: '#contato' },
]

// === VALUE COMPARISON ===
export const VALUE_COMPARISON = [
  {
    icon: 'TrendingUp',
    title: 'Potencial de valorização',
    description: 'Compre antes da entrega e acompanhe a evolução do ativo em uma das regiões mais consolidadas de Alphaville.',
  },
  {
    icon: 'CalendarCheck',
    title: 'Fluxo mais inteligente',
    description: 'Condições durante a obra permitem planejar entrada, parcelas e financiamento com mais flexibilidade.',
  },
  {
    icon: 'LayoutGrid',
    title: 'Escolha estratégica da unidade',
    description: 'Andar, vista, posição solar e planta impactam diretamente no valor e na liquidez futura.',
  },
  {
    icon: 'Sparkles',
    title: 'Produto novo em região consolidada',
    description: 'A combinação de localização premium e baixa oferta aumenta a atratividade do imóvel.',
  },
]

// === VIDEO ===
export const VIDEO = {
  youtubeId: 'sePmENhA9fE',
  title: 'Andrômeda by MPD: Conecte-se com a arte e a sofisticação',
  thumbnail: '',
}

export const VIDEOS: { youtubeId: string; title: string; thumbnail?: string; type?: string }[] = [
  { youtubeId: '', title: 'Tour pelo empreendimento', type: 'tour' }, // TODO: ID do segundo vídeo
]
