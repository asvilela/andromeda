---
target: src/pages/Index.tsx
total_score: 26
p0_count: 0
p1_count: 2
timestamp: 2026-05-26T11-17-01Z
slug: src-pages-index-tsx
---
# Design Critique: Andrômeda Home

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | No inline form validation |
| 2 | Match System / Real World | 4 | n/a |
| 3 | User Control and Freedom | 3 | WhatsApp redirect is non-reversible |
| 4 | Consistency and Standards | 3 | UnitFinder uses off-brand color tokens |
| 5 | Error Prevention | 2 | No inline validation; forms accept empty fields until submit |
| 6 | Recognition Rather Than Recall | 3 | UnitFinder multi-step requires remembering prior selections |
| 7 | Flexibility and Efficiency | 2 | No keyboard shortcuts; single path to conversion |
| 8 | Aesthetic and Minimalist Design | 3 | ValueComparison identical card grid |
| 9 | Error Recovery | 1 | Forms fail silently with no user feedback |
| 10 | Help and Documentation | 2 | No contextual help on forms |
| **Total** | | **26/40** | **Acceptable** |

## Anti-Patterns Verdict

1. Gradient text class exists (index.css:110-115) - unused but available
2. Identical card grid in ValueComparison (4 same-sized icon+heading+text cards)
3. Em dashes throughout copy (6 instances in constants.ts)
4. Color violations: #f5f5f5 scrollbar, #ffffff custom property, UnitFinder off-brand palette

## Priority Issues

### [P1] UnitFinder uses off-brand color system
UnitFinder.tsx defines its own palette instead of design system tokens.

### [P1] Silent form failures with no error feedback
All 4 forms catch API errors silently with no error UI.

### [P2] ValueComparison is an identical card grid
Four same-sized cards in 2x2 grid with icon + heading + text pattern.

### [P2] Em dashes violate the design system
6 em dashes found in constants.ts and Projeto.tsx.

### [P2] max-height animation on Amenidades PhotoCard
Animates CSS layout property (max-height) instead of transform/opacity.

## Persona Red Flags

- Jordan: No inline form validation; garbled phone numbers create lost leads
- Casey: UnitFinder loses state on accidental dismiss
- Prospective Buyer: No side-by-side floor plan comparison

## Minor Observations

- Projeto.tsx:44 alt="Lobby" too generic
- Projeto.tsx:12 text stroke uses pure black
- index.css:90 scrollbar track #f5f5f5
- index.css:42 --color-bg3: #ffffff
- .text-gradient-gold utility should be removed
