'use client';

import { CascadeBridgeTable } from '@/components/features/CascadeBridgeTable';
import { BrandLogoMark, Icon } from '@/components/ui/Icon';
import { useEbitdaCascade } from '@/hooks/useEbitdaCascade';

export interface EbitdaCascadeSimulatorProps {
  readonly initialRevenuePreset?: number;
}

export function EbitdaCascadeSimulator({
  initialRevenuePreset,
}: EbitdaCascadeSimulatorProps) {
  const { input, simulation, updateField } =
    useEbitdaCascade(initialRevenuePreset);

  const kpiCards = [
    {
      icon: 'dollar' as const,
      delta: '+18%',
      isPositive: true,
      label: 'EBITDA Proyectado',
      value: `$${simulation.projectedEbitdaMxn.toFixed(1)}M`,
      prev: `Prev: $${simulation.baselineEbitdaMxn.toFixed(1)}M`,
    },
    {
      icon: 'users' as const,
      delta: '+9%',
      isPositive: true,
      label: 'Eficiencia OEE Planta',
      value: `${Math.min(92, input.plantOeePct + 14)}%`,
      prev: `Prev: ${input.plantOeePct}%`,
    },
    {
      icon: 'percent' as const,
      delta: `+${(simulation.totalExpansionBps / 100).toFixed(1)}%`,
      isPositive: true,
      label: 'Margen Operativo',
      value: `${simulation.projectedMarginPct.toFixed(1)}%`,
      prev: `Prev: ${input.currentEbitdaMarginPct.toFixed(1)}%`,
    },
    {
      icon: 'clock' as const,
      delta: '-4%',
      isPositive: false,
      label: 'Tasa de Merma',
      value: `${Math.max(1.1, input.scrapRatePct * 0.55).toFixed(1)}%`,
      prev: `Prev: ${input.scrapRatePct.toFixed(1)}%`,
    },
    {
      icon: 'dollar' as const,
      delta: '+3%',
      isPositive: true,
      label: 'Índice Confianza IA',
      value: '91%',
      prev: 'Prev: 84%',
    },
  ];

  const recommendations = [
    {
      title: 'Optimizar secuencias SMED en Línea A un 15%',
      confidence: '91%',
      impact: `+$${(simulation.totalExpansionMxn * 0.42).toFixed(1)}M EBITDA`,
      isPositive: true,
    },
    {
      title: 'Reducir sobre-inventario en SKU de baja rotación',
      confidence: '84%',
      impact: `-$${(simulation.releasedWorkingCapitalMxn * 0.35).toFixed(1)}M costo retenido`,
      isPositive: false,
    },
    {
      title: 'Renegociar tarifas en rutas troncales críticas',
      confidence: '88%',
      impact: '+18% conversión de flujo libre',
      isPositive: true,
    },
  ];

  return (
    <div
      id="simulador-ebitda"
      className="rounded-3xl border border-white/[0.1] bg-[#0E0E11] p-4 sm:p-6 shadow-[0_30px_90px_rgba(0,0,0,0.85)]"
    >
      {/* Top Application Bar matching Reference Image 2 */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.07] pb-4">
        <div className="flex items-center gap-3 flex-1 min-w-[240px] max-w-md rounded-full border border-white/[0.08] bg-[#141417] px-4 py-2 text-xs text-[#9CA3AF]">
          <Icon name="search" size={14} className="text-[#71717A]" />
          <span>Buscar reportes, métricas operativas, plantas...</span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="#mandato-diagnostico"
            className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-b from-[#FF8C42] to-[#E66316] px-3.5 py-2 text-xs font-semibold text-white shadow-[0_4px_16px_rgba(242,116,39,0.4)] hover:brightness-110 transition-all"
          >
            <Icon name="plus" size={14} />
            <span>Auditar Planta</span>
          </a>
          <div className="relative flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] bg-[#141417] text-[#D4D4D8]">
            <Icon name="bell" size={15} />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#EF4444] text-[10px] font-bold text-white">
              3
            </span>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#F27427]/50 bg-[#1C1917] text-xs font-bold text-[#F27427]">
            VP
          </div>
        </div>
      </div>

      {/* Main Dashboard Layout (Sidebar + Content) */}
      <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Sidebar Navigation (matching Image 1) */}
        <aside className="hidden lg:flex lg:col-span-2 flex-col justify-between rounded-2xl border border-white/[0.06] bg-[#121215] p-3.5 text-xs">
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-xl border border-white/[0.08] bg-[#18181C] px-3 py-2 text-white font-medium">
              <span className="truncate">Comité Ejecutivo</span>
              <span className="text-[#71717A]">▾</span>
            </div>

            <ul className="space-y-1 text-[#9CA3AF]">
              <li className="flex items-center gap-2.5 rounded-xl bg-white/[0.07] px-3 py-2 text-white font-medium">
                <BrandLogoMark size={14} />
                <span>Dashboard</span>
              </li>
              <li className="flex items-center justify-between px-3 py-2 hover:text-white transition-colors">
                <span>Fuentes ERP</span>
                <span className="rounded-full bg-white/[0.08] px-1.5 py-0.5 text-[10px]">
                  10
                </span>
              </li>
              <li className="px-3 py-2 hover:text-white transition-colors">
                Reportes P&amp;L
              </li>
              <li className="px-3 py-2 hover:text-white transition-colors">
                Hallazgos IA
              </li>
              <li className="px-3 py-2 text-[#F27427] font-medium">
                Simulador
              </li>
              <li className="flex items-center justify-between px-3 py-2 hover:text-white transition-colors">
                <span>Alertas</span>
                <span className="rounded-full bg-white/[0.08] px-1.5 py-0.5 text-[10px]">
                  3
                </span>
              </li>
            </ul>
          </div>

          <div className="border-t border-white/[0.06] pt-3 px-2 text-[11px] text-[#71717A]">
            Vértice OS · v4.2
          </div>
        </aside>

        {/* Right 10 Columns: Welcome + 5 KPI Cards + Charts + Simulator */}
        <div className="lg:col-span-10 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg sm:text-xl font-semibold text-white">
              Panel de Control Operativo — Grupo Industrial
            </h2>
            <div className="flex items-center gap-2 text-xs">
              <span className="rounded-xl border border-white/[0.08] bg-[#141417] px-3 py-1.5 text-[#D4D4D8]">
                Últimos 30 Días ▾
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-xl border border-white/[0.08] bg-[#141417] px-3 py-1.5 text-[#D4D4D8]">
                <Icon name="export" size={13} />
                Exportar
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-xl border border-white/[0.08] bg-[#141417] px-3 py-1.5 text-[#D4D4D8]">
                <Icon name="share" size={13} />
                Compartir
              </span>
            </div>
          </div>

          {/* 5 KPI Cards Row matching Image 2 */}
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3.5">
            {kpiCards.map((kpi) => (
              <div
                key={kpi.label}
                className="rounded-2xl border border-white/[0.07] bg-[#141417] p-4 hover:border-white/[0.16] transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.05] text-[#D4D4D8]">
                    <Icon name={kpi.icon} size={15} />
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-medium ${
                      kpi.isPositive ? 'text-[#22C55E]' : 'text-[#EF4444]'
                    }`}
                  >
                    <Icon
                      name={kpi.isPositive ? 'trend-up' : 'trend-down'}
                      size={13}
                    />
                    {kpi.delta}
                  </span>
                </div>
                <div className="mt-4 text-xs text-[#9CA3AF]">{kpi.label}</div>
                <div className="mt-1 text-xl font-bold text-white tabular-nums">
                  {kpi.value}
                </div>
                <div className="mt-1 text-[11px] text-[#71717A] tabular-nums">
                  {kpi.prev}
                </div>
              </div>
            ))}
          </div>

          {/* Charts + Strategy Simulator Row matching Image 2 */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
            <div className="xl:col-span-8">
              <CascadeBridgeTable simulation={simulation} />
            </div>

            <div className="xl:col-span-4 flex flex-col gap-4">
              {/* Segmented Donut Chart Card (Fuentes de Fuga Operativa) */}
              <div className="rounded-2xl border border-white/[0.08] bg-[#141417] p-4">
                <h3 className="text-sm font-semibold text-white">
                  Fuentes de Recuperación
                </h3>
                <div className="mt-3 flex items-center justify-between gap-4">
                  <div className="relative flex h-28 w-28 shrink-0 items-center justify-center">
                    <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                      <circle
                        cx="50"
                        cy="50"
                        r="36"
                        fill="transparent"
                        stroke="#27272A"
                        strokeWidth="12"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="36"
                        fill="transparent"
                        stroke="#F27427"
                        strokeWidth="14"
                        strokeDasharray="95 226"
                        strokeLinecap="butt"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="36"
                        fill="transparent"
                        stroke="#FFFFFF"
                        strokeWidth="12"
                        strokeDasharray="62 226"
                        strokeDashoffset="-100"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="text-xs font-bold text-white tabular-nums">
                        ${simulation.totalExpansionMxn.toFixed(0)}M
                      </span>
                      <span className="text-[9px] uppercase text-[#9CA3AF]">
                        TOTAL
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-2 text-xs text-[#D4D4D8] flex-1">
                    <li className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-[#F27427]" />
                        Planta OEE
                      </span>
                      <span className="font-mono font-semibold">42%</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-white" />
                        Merma
                      </span>
                      <span className="font-mono font-semibold">31%</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-[#52525B]" />
                        Logística
                      </span>
                      <span className="font-mono font-semibold">27%</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Strategy Simulator Card matching Image 2 */}
              <div className="rounded-2xl border border-white/[0.08] bg-[#141417] p-4 space-y-3">
                <h3 className="text-sm font-semibold text-white">
                  Simulador de Estrategia
                </h3>

                <div>
                  <div className="flex justify-between text-xs text-[#D4D4D8] mb-1">
                    <label htmlFor="sim-rev">Escala de Ingresos ($M)</label>
                    <span className="font-mono font-semibold text-white">
                      ${input.annualRevenueMxn}M
                    </span>
                  </div>
                  <input
                    id="sim-rev"
                    type="range"
                    min={300}
                    max={8000}
                    step={100}
                    value={input.annualRevenueMxn}
                    onChange={(e) =>
                      updateField('annualRevenueMxn', Number(e.target.value))
                    }
                    className="w-full simulator-slider"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs text-[#D4D4D8] mb-1">
                    <label htmlFor="sim-oee">Eficiencia OEE Actual</label>
                    <span className="font-mono font-semibold text-white">
                      {input.plantOeePct}%
                    </span>
                  </div>
                  <input
                    id="sim-oee"
                    type="range"
                    min={45}
                    max={85}
                    step={1}
                    value={input.plantOeePct}
                    onChange={(e) =>
                      updateField('plantOeePct', Number(e.target.value))
                    }
                    className="w-full simulator-slider"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs text-[#D4D4D8] mb-1">
                    <label htmlFor="sim-scrap">Reducción de Merma (%)</label>
                    <span className="font-mono font-semibold text-white">
                      +{input.scrapRatePct.toFixed(1)}%
                    </span>
                  </div>
                  <input
                    id="sim-scrap"
                    type="range"
                    min={1.0}
                    max={12.0}
                    step={0.5}
                    value={input.scrapRatePct}
                    onChange={(e) =>
                      updateField('scrapRatePct', Number(e.target.value))
                    }
                    className="w-full simulator-slider"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* AI Recommendations Row matching Image 2 */}
          <div className="pt-1">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-white">
                <Icon name="sparkles" size={16} className="text-[#F27427]" />
                <span>Recomendaciones de Auditoría e IA</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
                <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              {recommendations.map((rec) => (
                <div
                  key={rec.title}
                  className="rounded-2xl border border-white/[0.07] bg-[#141417] p-4 flex flex-col justify-between hover:border-[#F27427]/40 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="text-sm font-medium text-white leading-snug">
                      {rec.title}
                    </h4>
                    <span className="rounded-full bg-white/[0.08] px-2 py-0.5 text-[11px] font-mono text-[#D4D4D8]">
                      {rec.confidence}
                    </span>
                  </div>
                  <div className="mt-4">
                    <div className="text-[11px] text-[#71717A]">Impacto</div>
                    <div
                      className={`text-sm font-semibold mt-0.5 ${
                        rec.isPositive ? 'text-[#22C55E]' : 'text-[#EF4444]'
                      }`}
                    >
                      {rec.impact}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
