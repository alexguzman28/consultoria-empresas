---
name: Vértice Partners
description: Plataforma de Inteligencia Operativa y Consultoría Empresarial Basada en Datos
colors:
  copper-orange: "#F27427"
  copper-bright: "#FF8C42"
  carbon-black: "#09090B"
  charcoal-card: "#121215"
  charcoal-elevated: "#141417"
  pure-white: "#FFFFFF"
  muted-silver: "#9CA3AF"
  status-green: "#22C55E"
  status-red: "#EF4444"
typography:
  display:
    fontFamily: "Public Sans, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 4.5vw, 3.5rem)"
    fontWeight: 600
    lineHeight: 1.12
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Public Sans, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 3vw, 3rem)"
    fontWeight: 600
    lineHeight: 1.18
  title:
    fontFamily: "Public Sans, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: "Public Sans, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "0.75rem"
    fontWeight: 600
rounded:
  xl: "12px"
  2xl: "16px"
  3xl: "24px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "40px"
  2xl: "64px"
components:
  button-primary:
    backgroundColor: "{colors.copper-orange}"
    textColor: "{colors.pure-white}"
    rounded: "{rounded.xl}"
    padding: "12px 24px"
  button-secondary:
    backgroundColor: "{colors.charcoal-card}"
    textColor: "{colors.pure-white}"
    rounded: "{rounded.xl}"
    padding: "12px 24px"
---

# Design System: Vértice Partners

## Overview

**Creative North Star: "Luminous Copper-Carbon Executive Intelligence"**

Inspired by modern dark-mode BI & decision-intelligence platforms (Buildly / DataPulse reference), Vértice Partners combines a deep carbon-black canvas (`#09090B`), charcoal glass cards (`#121215` and `#141417`) with subtle `1px solid rgba(255,255,255,0.08)` borders, and warm copper-orange ambient spotlights (`#F27427` to `#FF8C42`).

## Colors

### Primary
- **Copper Orange** (`#F27427`): Primary CTA buttons, active spline curves, donut chart highlights, featured pricing card glow, and 4-diamond brand emblem.

### Secondary
- **Status Green** (`#22C55E`): Positive KPI deltas (`+18%`, `+9%`) and verified EBITDA expansion impacts.
- **Status Red** (`#EF4444`): Cost/scrap reduction indicators and alert badges.

### Neutral
- **Carbon Black** (`#09090B`): Primary page ground.
- **Charcoal Card** (`#121215` / `#141417`): Dashboard widgets, problem cards, pricing tiers, and FAQ accordion items.
- **Pure White** (`#FFFFFF`): Headings and primary KPI figures.
- **Muted Silver** (`#9CA3AF`): Subtitles, descriptions, and axis labels.

## Typography

**Display & Body Font:** Public Sans (clean geometric sans-serif)
**Mono Font:** JetBrains Mono (`tabular-nums` for financial KPIs and charts)

## Layout

Centered 1180px–1220px containers (`max-w-[1180px]`), starting with a floating rounded pill navbar, a centered spotlight hero over a full 12-column interactive executive dashboard showcase, a 6-card problem grid, a 3-column pricing/intervention section, an interactive case & FAQ accordion section, and a 3-pillar ascending bar-chart CTA banner.
