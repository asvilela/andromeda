---
name: Andrômeda Home
description: Landing page premium para empreendimento residencial de alto padrão em Alphaville
colors:
  gold: "#B8925A"
  gold-light: "#D8C3A5"
  gold-deep: "#96743E"
  warm-linen: "#F7F4EF"
  sand-mist: "#EFEBE4"
  charcoal: "#171717"
  umber: "#5A4632"
  muted-clay: "#7A6B5D"
  whatsapp: "#25D366"
  whatsapp-deep: "#128C7E"
typography:
  display:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "clamp(3.4rem, 8vw, 7rem)"
    fontWeight: 400
    lineHeight: 1.0
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "clamp(2.8rem, 5vw, 4rem)"
    fontWeight: 400
    lineHeight: 1.06
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "clamp(2.2rem, 4.5vw, 3.4rem)"
    fontWeight: 400
    lineHeight: 1.08
  body:
    fontFamily: "Outfit, system-ui, sans-serif"
    fontSize: "1.05rem"
    fontWeight: 300
    lineHeight: 1.85
  label:
    fontFamily: "Outfit, system-ui, sans-serif"
    fontSize: "0.72rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0.18em"
rounded:
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
spacing:
  section-x: "8vw"
  section-y-sm: "5rem"
  section-y-lg: "7rem"
  stack-sm: "1.25rem"
  stack-md: "3.5rem"
  stack-lg: "5rem"
components:
  button-primary:
    backgroundColor: "{colors.gold}"
    textColor: "#FFFDF9"
    rounded: "{rounded.lg}"
    padding: "1.2rem 3rem"
  button-primary-hover:
    backgroundColor: "{colors.gold-deep}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.charcoal}"
    rounded: "{rounded.lg}"
    padding: "1.2rem 3rem"
  button-ghost-hover:
    backgroundColor: "rgba(23,23,23,0.04)"
  input-default:
    backgroundColor: "{colors.sand-mist}"
    textColor: "{colors.charcoal}"
    rounded: "{rounded.lg}"
    padding: "1.05rem 1.25rem"
  nav-link:
    textColor: "{colors.umber}"
    padding: "0"
  nav-link-hover:
    textColor: "{colors.gold-deep}"
  card-form:
    backgroundColor: "#FFFDF9"
    rounded: "{rounded.xl}"
    padding: "2rem 3rem"
---

# Design System: Andrômeda Home

## 1. Overview

**Creative North Star: "A Morada Alphaville"**

Sofisticação enraizada: o conforto de um lar com acabamento de resort. Calor humano em cada detalhe, natureza e urbanidade em equilíbrio. O sistema visual traduz a experiência de visitar o empreendimento: tons terrosos que aquecem, tipografia serif que respira autoridade sem rigidez, e espaço generoso entre elementos que transmite a mesma amplitude das plantas do Andrômeda.

O site rejeita a estética de landing page imobiliária genérica: sem carrosséis infinitos, sem selos empilhados, sem CTAs agressivos, sem stock photos frias. Rejeita igualmente a frieza corporativa e a linguagem "startup tech" com gradientes neon. Este é um lar, não um produto financeiro.

A paleta é Committed: o gold permeia 20-30% das superfícies como fio condutor, dos CTAs às linhas decorativas, sem dominar. Os neutros são sempre quentes (nunca cinza puro). O ritmo vertical varia; seções respiram com padding assimétrico.

**Key Characteristics:**
- Tipografia serif generosa (Cormorant Garamond) para headings, sans-serif leve (Outfit 300) para corpo
- Gold (#B8925A) como cor de identidade, usado com disciplina
- Fundos warm-linen (#F7F4EF) e sand-mist (#EFEBE4) alternados; seções escuras em charcoal (#171717) para contraste narrativo
- Scroll reveal com translate-up sutil (40px, 0.8s), staggered por elemento
- Componentes discretos e refinados: a ação é clara mas nunca grita

## 2. Colors: A Paleta Terrosa

Uma paleta de tons terrosos e dourados que evoca materiais nobres: mármore travertino, madeira clara, acabamentos em latão escovado.

### Primary
- **Gold** (#B8925A): Cor de identidade. CTAs, scrollbar, linhas decorativas, kickers de seção, ícones de confirmação. Presente em todo o site mas nunca dominante.
- **Gold Claro** (#D8C3A5): Variante suave para badges, labels no hero (sobre fundo escuro), destaques tipográficos em headings.
- **Gold Profundo** (#96743E): Hover de CTAs, kickers de seção, links ativos. Fornece o contraste necessário sem perder o calor.

### Neutral
- **Warm Linen** (#F7F4EF): Background principal do site. Branco aquecido que nunca é frio nem estéril.
- **Sand Mist** (#EFEBE4): Background secundário para inputs, cards informativos, seções alternadas. Cria camadas sem bordas.
- **Charcoal** (#171717): Texto principal e seções escuras (CTA banner, hero overlay, footer). Preto quente, nunca #000.
- **Umber** (#5A4632): Texto secundário, labels, subtítulos. Marrom terroso que conecta à paleta gold.
- **Argila Suave** (#7A6B5D): Texto terciário, placeholders, captions de baixa prioridade.

### Accent (Funcional)
- **WhatsApp Green** (#25D366): Exclusivo para o botão flutuante de WhatsApp e modais de contato. Não usado em nenhum outro contexto.
- **WhatsApp Deep** (#128C7E): Hover do botão WhatsApp.

### Named Rules
**The Warm Neutral Rule.** Nenhum cinza puro (#888, #ccc, #f5f5f5) é permitido no sistema. Todo neutro carrega subtom warm (bege, areia, terracota). Se parece "frio", está errado.

**The Gold Discipline Rule.** Gold é a cor de identidade, não a cor dominante. Usado em CTAs, linhas, kickers e micro-detalhes. Nunca como background de seção inteira, nunca como cor de texto corrido.

## 3. Typography

**Display Font:** Cormorant Garamond (with Georgia fallback)
**Body Font:** Outfit (with system-ui fallback)

**Character:** A combinação serif editorial + sans geométrica leve cria uma dualidade proposital: a autoridade clássica dos headings (Cormorant) e a acessibilidade contemporânea do corpo (Outfit 300). O contraste entre os dois é grande o suficiente para criar hierarquia instantânea sem depender de cor.

### Hierarchy
- **Display** (400, clamp(3.4rem, 8vw, 7rem), line-height 1.0): Hero h1 exclusivamente. Máximo 18ch de largura.
- **Headline** (400, clamp(2.8rem, 5vw, 4rem), line-height 1.06): Títulos de seção (h2). Máximo 22ch por padrão.
- **Title** (400, clamp(2.2rem, 4.5vw, 3.4rem), line-height 1.08): Subtítulos e CTA banners.
- **Body** (300, 1.05rem, line-height 1.85): Parágrafos e descrições. Máximo 54ch.
- **Label** (500, 0.72rem, tracking 0.18-0.25em, uppercase): Kickers de seção, labels de formulário, navegação, CTAs.

### Named Rules
**The Uppercase Discipline Rule.** Uppercase é reservado exclusivamente para labels (kickers, navegação, botões, form labels). Nunca para headings, nunca para parágrafos. Sempre acompanhado de tracking generoso (0.18em+).

**The Serif Heading Rule.** Todo heading (h1-h4) usa Cormorant Garamond. Sem exceções. A serif é a voz arquitetônica do empreendimento.

## 4. Elevation

O sistema é predominantemente flat, usando diferenciação tonal (warm-linen vs sand-mist vs white vs charcoal) para criar camadas. Sombras existem apenas como resposta a estado ou para elementos que flutuam sobre o conteúdo.

### Shadow Vocabulary
- **Card** (`0 1px 3px rgba(0,0,0,0.04), 0 6px 24px rgba(0,0,0,0.06)`): Formulários e cards de conteúdo em repouso. Sutil, quase imperceptível.
- **Card Hover** (`0 8px 16px rgba(0,0,0,0.08), 0 24px 48px rgba(0,0,0,0.1)`): Elevação ao hover. Duplica blur e offset para sensação de "levantar".
- **CTA Gold** (`0 8px 32px rgba(184,146,90,0.35)`): Botões primários em repouso. Sombra quente dourada que conecta o botão à identidade.
- **CTA Gold Hover** (`0 14px 40px rgba(150,116,62,0.45)`): Botões primários ao hover. Intensifica a sombra dourada.
- **WhatsApp Glow** (`0 4px 24px rgba(37,211,102,0.3)`): Exclusivo para o FAB do WhatsApp.

### Named Rules
**The Flat-By-Default Rule.** Superfícies são flat em repouso. Sombras são resposta a estado (hover, focus) ou indicam elementos flutuantes (navbar scrolled, FAB, modais). Se uma sombra não tem justificativa funcional, remova-a.

## 5. Components

### Buttons
Discretos e refinados: a ação é clara mas nunca grita. Presença visual vem do padding generoso e da sombra dourada, não do tamanho ou cor agressiva.

- **Shape:** Bordas gentilmente arredondadas (16px / rounded-xl)
- **Primary:** Gold background (#B8925A), texto off-white (#FFFDF9), padding 1.2rem x 3rem, label uppercase 0.85rem tracking 0.18em. Sombra CTA Gold em repouso.
- **Hover / Focus:** Background gold-deep (#96743E), translate-y -2px, sombra CTA Gold Hover. Transição 200-300ms.
- **Ghost:** Borda 1px white/30 (sobre escuro) ou charcoal/06 (sobre claro), fundo transparente, mesma tipografia. Hover: fundo sutil (white/10 ou charcoal/04).
- **Nav CTA (scrolled):** Background charcoal, texto white, borda charcoal. Menor (px-6 py-2.5, rounded-lg). Hover: charcoal/90.

### Cards / Containers
- **Corner Style:** Generosamente arredondados (24px / rounded-3xl para formulários, 16px para cards menores)
- **Background:** White (#FFFDF9) sobre warm-linen, ou sand-mist (#EFEBE4) para informativos
- **Shadow Strategy:** Card shadow em repouso, card-hover em interação (ver Elevation)
- **Border:** Hairline charcoal/04 para definição sutil
- **Internal Padding:** 2rem-3rem (p-8 a p-12), responsivo

### Inputs / Fields
- **Style:** Background sand-mist (#EFEBE4), borda hairline charcoal/06, rounded-xl (16px). Sem background branco.
- **Focus:** Ring 2px gold/20, borda gold. Transição colors + shadow 200ms.
- **Placeholder:** umber/50, font-sans 1rem
- **Error / Disabled:** Não customizados explicitamente; disabled usa opacity 0.5

### Navigation
- **Desktop:** Links em label style (Outfit 500, 0.72rem, tracking 0.16em, uppercase). Cor umber; hover gold-deep. Gap 2.5rem entre links.
- **Scrolled state:** Navbar ganha bg warm-linen/95, backdrop-blur 18px, shadow-sm, borda hairline charcoal/06. Padding reduz de py-6 para py-4. Transição 400ms.
- **Transparent state:** Sobre hero, gradiente from-black/40, texto white/80, hover gold-lt.
- **Mobile:** Overlay fullscreen warm-linen/98, links em serif 2rem, CTA charcoal com sombra gold.

### Section Header (Signature)
Componente recorrente com ritmo visual consistente: kicker (label gold-dk, uppercase, tracking 0.25em) acima do heading serif, linha decorativa gold gradient abaixo (80px, fade to transparent). Margem inferior 3.5rem.

### WhatsApp FAB (Signature)
Botão flutuante fixo (bottom-right), 60px circle, bg WhatsApp green, ícone white. Pulse animation (scale 2.2x, fade out, 2.5s infinite). Shadow green glow. z-index 200.

## 6. Do's and Don'ts

### Do:
- **Do** usar warm-linen (#F7F4EF) como background padrão. Nunca branco puro (#fff) como fundo de página.
- **Do** manter headings em Cormorant Garamond, corpo em Outfit 300. A hierarquia depende desse contraste.
- **Do** usar a gold-line (80px, gradient to transparent) como separador de seção. É assinatura visual.
- **Do** respeitar o max-width de headings (18-22ch) para criar quebras naturais e leitura confortável.
- **Do** usar scroll reveal (translateY 40px, 0.8s) com stagger (100ms) para entradas de seção. Prefers-reduced-motion desativa.
- **Do** alternar seções claras (warm-linen / white) e escuras (charcoal) para criar ritmo narrativo.
- **Do** manter labels e kickers em uppercase com tracking generoso (0.18em+). É o contraste visual com os headings serif.

### Don't:
- **Don't** usar cinza puro em nenhum contexto. Todo neutro é warm-tinted (The Warm Neutral Rule).
- **Don't** usar gold como background de seção inteira ou como cor de texto corrido (The Gold Discipline Rule).
- **Don't** usar landing pages imobiliárias genéricas como referência: sem carrosséis infinitos, sem selos/badges empilhados, sem tipografia sem personalidade.
- **Don't** adotar estética "startup tech" com gradientes neon, dark mode como default, ou linguagem disruptiva.
- **Don't** usar CTAs agressivos ("COMPRE AGORA", urgência artificial, countdown timers). Conversão sem pressão.
- **Don't** usar stock photos genéricas. Toda imagem é render do empreendimento ou fotografia real.
- **Don't** usar bounce, elastic, ou spring easing. Apenas ease-out exponencial (quart/quint/expo).
- **Don't** animar propriedades de layout CSS (width, height, top, left). Apenas transform e opacity.
- **Don't** usar #000 ou #fff. Charcoal (#171717) e warm-linen (#F7F4EF) são os extremos.
