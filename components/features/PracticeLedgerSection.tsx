'use client';

import { useState } from 'react';
import { Icon, type IconName } from '@/components/ui/Icon';
import { SectionReveal } from '@/components/ui/SectionReveal';
import type { PracticePillar } from '@/lib/types';

export interface PracticeLedgerSectionProps {
  readonly pillars: readonly PracticePillar[];
}

const PROBLEM_CARDS: readonly {
  readonly icon: IconName;
  readonly title: string;
  readonly description: string;
}[] = [
  {
    icon: 'database',
    title: 'Datos dispersos en múltiples sistemas',
    description:
      'La información de producción, costos y tesorería vive aislada en distintos ERPs y hojas de cálculo, impidiendo ver la rentabilidad real.',
  },
  {
    icon: 'clock',
    title: 'Generación lenta de reportes de cierre',
    description:
      'Semanas perdidas conciliando estados financieros manualmente cuando el consejo directivo necesita respuestas en tiempo real.',
  },
  {
    icon: 'trend-down',
    title: 'Dificultad para predecir flujo y EBITDA',
    description:
      'Sin modelos vinculados de capacidad OEE y capital de trabajo, cada decisión de expansión o recorte se siente como una apuesta.',
  },
  {
    icon: 'alert',
    title: 'Mermas y paros ocultos en piso de planta',
    description:
      'Micro-paros, retrabajos y tiempos de cambio de formato no registrados drenan entre 250 y 450 puntos base de margen operativo.',
  },
  {
    icon: 'lock',
    title: 'Efectivo atrapado en inventario lento',
    description:
      'Políticas estáticas de reorden y SKUs con margen negativo inmovilizan millones de pesos que deberían financiar el crecimiento.',
  },
  {
    icon: 'refresh',
    title: 'Consultorías que solo entregan PDFs',
    description:
      'Diagnósticos teóricos que se quedan en el cajón porque nadie acompaña la implementación técnica con los supervisores en turno.',
  },
];

export function PracticeLedgerSection({ pillars }: PracticeLedgerSectionProps) {
  const [selectedPillarId, setSelectedPillarId] = useState<string>(
    pillars[0]?.id ?? ''
  );
  const activePillar =
    pillars.find((p) => p.id === selectedPillarId) ?? pillars[0]!;

  return (
    <section
      id="practicas-intervencion"
      aria-labelledby="practices-heading"
      className="py-20 sm:py-28 bg-[#09090B]"
    >
      <div className="mx-auto max-w-[1180px] px-4 sm:px-8">
        {/* Problems Header matching Reference Image 1 */}
        <SectionReveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2
              id="practices-heading"
              className="text-3xl sm:text-5xl font-semibold text-white tracking-tight"
            >
              Dirigir tu Operación No Debería Ser Tan Difícil
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#9CA3AF]">
              La mayoría de las empresas luchan contra el caos de datos y costos ocultos. ¿Te resulta familiar?
            </p>
          </div>
        </SectionReveal>

        {/* 6 Problem Cards Grid matching Reference Image 1 */}
        <SectionReveal delayMs={100}>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROBLEM_CARDS.map((card) => (
              <div
                key={card.title}
                className="group copper-corner-glow rounded-2xl border border-white/[0.08] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#F27427]/40"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.1] bg-white/[0.04] text-[#D4D4D8] group-hover:border-[#F27427]/50 group-hover:text-[#F27427] transition-colors">
                  <Icon name={card.icon} size={20} />
                </div>
                <h3 className="mt-6 text-lg font-semibold text-white">
                  {card.title}
                </h3>
                <p className="mt-2.5 text-sm text-[#9CA3AF] leading-relaxed">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </SectionReveal>

        {/* Interactive Consulting Practice Selector */}
        <SectionReveal delayMs={160}>
          <div className="mt-16 rounded-3xl border border-white/[0.08] bg-[#121215] p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.07] pb-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-semibold text-white">
                  Nuestras 4 Prácticas de Intervención Directa
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-[#9CA3AF]">
                  Selecciona un área para explorar cómo transformamos cada problema en flujo de efectivo auditable
                </p>
              </div>
              <span className="rounded-full border border-[#F27427]/40 bg-[#F27427]/10 px-3.5 py-1 text-xs font-semibold text-[#F27427]">
                {activePillar.typicalBpsRange}
              </span>
            </div>

            <div
              role="tablist"
              aria-label="Prácticas de intervención"
              className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"
            >
              {pillars.map((pillar) => {
                const isSelected = pillar.id === activePillar.id;
                return (
                  <button
                    key={pillar.id}
                    role="tab"
                    type="button"
                    aria-selected={isSelected}
                    onClick={() => setSelectedPillarId(pillar.id)}
                    className={`rounded-xl border p-4 text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'copper-card-glow border-[#F27427]/60 text-white shadow-[0_8px_24px_-6px_rgba(242,116,39,0.3)]'
                        : 'border-white/[0.07] bg-[#09090B] text-[#A1A1AA] hover:border-white/[0.18] hover:text-white'
                    }`}
                  >
                    <div className="text-xs font-mono text-[#F27427]">
                      {pillar.code}
                    </div>
                    <div className="mt-1.5 text-sm font-semibold text-white line-clamp-2">
                      {pillar.title}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 rounded-2xl border border-white/[0.07] bg-[#09090B] p-5 sm:p-6">
              <div className="lg:col-span-7 space-y-3">
                <h4 className="text-lg font-semibold text-white">
                  {activePillar.title}
                </h4>
                <p className="text-sm text-[#A1A1AA] leading-relaxed">
                  {activePillar.thesis}
                </p>
                <div className="pt-2 text-xs text-[#D4D4D8]">
                  <strong className="text-[#F27427]">Mecanismo en campo: </strong>
                  {activePillar.fieldMechanism}
                </div>
              </div>

              <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-white/[0.07] pt-4 lg:pt-0 lg:pl-6 flex flex-col justify-between">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#9CA3AF] mb-2">
                  Entregables Auditados ({activePillar.primaryKpi}):
                </div>
                <ul className="space-y-2 text-xs text-[#D4D4D8]">
                  {activePillar.auditArtifacts.map((artifact) => (
                    <li key={artifact} className="flex items-center gap-2">
                      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#F27427]/20 text-[#F27427]">
                        <Icon name="check" size={11} />
                      </span>
                      <span>{artifact}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
