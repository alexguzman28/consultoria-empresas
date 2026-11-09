'use client';

import { useState } from 'react';
import { ActiveDossierSheet } from '@/components/features/ActiveDossierSheet';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { SectionReveal } from '@/components/ui/SectionReveal';
import { DossierSkeletonLoader } from '@/components/ui/Skeleton';
import { useCaseExplorer } from '@/hooks/useCaseExplorer';
import {
  formatBasisPoints,
  PRACTICE_LABELS,
  SECTOR_LABELS,
} from '@/lib/formatters';
import type {
  AuditPracticeArea,
  CaseStudyDossier,
  IndustrySector,
} from '@/lib/types';

export interface AuditCaseExplorerProps {
  readonly initialCases: readonly CaseStudyDossier[];
  readonly initialSector?: IndustrySector | 'todos';
  readonly initialPractice?: AuditPracticeArea | 'todas';
}

const FAQ_ITEMS = [
  {
    q: '¿Cuánto tiempo toma instalar el diagnóstico en planta?',
    a: 'Conectamos con tus fuentes de datos (ERP, MES y contabilidad) e instalamos la medición en campo en menos de 72 horas tras firmar el convenio de confidencialidad (NDA).',
  },
  {
    q: '¿Necesito contar con un equipo interno de ciencia de datos?',
    a: 'No. Nuestros socios e ingenieros de procesos despliegan los tableros, auditan los tiempos en turno y entrenan a tus supervisores sin carga adicional para tu área de TI.',
  },
  {
    q: '¿Puedo integrar su metodología con mi ERP actual (SAP, Oracle, Netsuite)?',
    a: 'Sí. Conciliamos los balances de masa y tiempos operativos directamente con las pólizas contables de tu ERP actual para que el CFO valide cada peso ahorrado.',
  },
  {
    q: '¿Qué tan precisas son las proyecciones de expansión de EBITDA?',
    a: 'Nuestros modelos operan con un intervalo de confianza del 91% auditado contra el estado de resultados mensual. Si no identificamos un retorno mínimo de 3.0x, declinamos el mandato sin costo.',
  },
] as const;

export function AuditCaseExplorer({
  initialCases,
  initialSector = 'todos',
  initialPractice = 'todas',
}: AuditCaseExplorerProps) {
  const {
    selectedSector,
    selectedPractice,
    searchQuery,
    selectedDossier,
    filteredCases,
    isTransitioning,
    filterError,
    handleSectorChange,
    handlePracticeChange,
    handleSearchChange,
    handleSelectDossier,
    resetFilters,
  } = useCaseExplorer({
    initialCases,
    initialSector,
    initialPractice,
  });

  const [openFaqIdx, setOpenFaqIdx] = useState<number>(0);

  return (
    <section
      id="expedientes-auditados"
      aria-labelledby="cases-heading"
      className="py-20 sm:py-28 bg-[#09090B]"
    >
      <div className="mx-auto max-w-[1180px] px-4 sm:px-8">
        <SectionReveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2
              id="cases-heading"
              className="text-3xl sm:text-5xl font-semibold text-white tracking-tight"
            >
              Casos de Estudio y Resultados Auditables
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#9CA3AF]">
              Explora escenarios demostrativos por sector industrial y verifica el impacto en flujo de caja y margen EBITDA.
            </p>
          </div>
        </SectionReveal>

        <SectionReveal delayMs={100}>
          {/* Filter Bar */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-4 rounded-2xl bg-[#121215] border border-white/[0.08] p-4">
            <div className="md:col-span-4 flex flex-col gap-1.5">
              <label
                htmlFor="filter-sector"
                className="text-xs font-medium text-[#D4D4D8]"
              >
                Sector Industrial
              </label>
              <select
                id="filter-sector"
                value={selectedSector}
                onChange={(e) =>
                  handleSectorChange(e.target.value as IndustrySector | 'todos')
                }
                className="min-h-[42px] rounded-xl border border-white/[0.1] bg-[#09090B] px-3 py-2 text-xs text-white cursor-pointer hover:border-[#F27427] transition-colors"
              >
                <option value="todos">Todos los Sectores</option>
                {Object.entries(SECTOR_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-4 flex flex-col gap-1.5">
              <label
                htmlFor="filter-practice"
                className="text-xs font-medium text-[#D4D4D8]"
              >
                Práctica Operativa
              </label>
              <select
                id="filter-practice"
                value={selectedPractice}
                onChange={(e) =>
                  handlePracticeChange(
                    e.target.value as AuditPracticeArea | 'todas'
                  )
                }
                className="min-h-[42px] rounded-xl border border-white/[0.1] bg-[#09090B] px-3 py-2 text-xs text-white cursor-pointer hover:border-[#F27427] transition-colors"
              >
                <option value="todas">Todas las Prácticas</option>
                {Object.entries(PRACTICE_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-4 flex flex-col gap-1.5">
              <label
                htmlFor="filter-search"
                className="text-xs font-medium text-[#D4D4D8]"
              >
                Buscar por Indicador
              </label>
              <div className="relative flex items-center">
                <input
                  id="filter-search"
                  type="search"
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  placeholder="Ej. SMED, OEE, merma, flota..."
                  className="min-h-[42px] w-full rounded-xl border border-white/[0.1] bg-[#09090B] pl-3.5 pr-9 py-2 text-xs text-white placeholder:text-[#71717A] hover:border-[#F27427] transition-colors"
                />
                <span className="pointer-events-none absolute right-3 text-[#9CA3AF]">
                  <Icon name="search" size={14} />
                </span>
              </div>
            </div>
          </div>

          {filterError ? (
            <div
              role="alert"
              className="mt-4 rounded-xl border border-[#EF4444] bg-[#450A0A]/40 p-4 flex flex-wrap items-center justify-between gap-4 text-xs text-[#FCA5A5]"
            >
              <div className="flex items-center gap-2 font-medium">
                <Icon name="alert" size={16} />
                <span>{filterError}</span>
              </div>
              <Button variant="outline" size="sm" onClick={resetFilters}>
                Restablecer
              </Button>
            </div>
          ) : null}

          {filteredCases.length > 0 ? (
            <div
              role="tablist"
              aria-label="Selector de expedientes de caso"
              className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3.5"
            >
              {filteredCases.map((dossier) => {
                const isSelected = selectedDossier?.id === dossier.id;
                return (
                  <button
                    key={dossier.id}
                    role="tab"
                    type="button"
                    aria-selected={isSelected}
                    onClick={() => handleSelectDossier(dossier.id)}
                    className={`rounded-2xl p-4 text-left border transition-all cursor-pointer ${
                      isSelected
                        ? 'copper-card-glow border-[#F27427]/60 text-white -translate-y-0.5'
                        : 'border-white/[0.08] bg-[#121215] text-[#D4D4D8] hover:border-white/[0.18]'
                    }`}
                  >
                    <div className="font-semibold text-sm text-white">
                      {dossier.sectorLabel}
                    </div>
                    <div
                      className={`mt-1 text-xs font-mono ${
                        isSelected ? 'text-[#F27427] font-bold' : 'text-[#9CA3AF]'
                      }`}
                    >
                      {formatBasisPoints(dossier.ebitdaExpansionBps)} EBITDA ·{' '}
                      {dossier.interventionWeeks} semanas
                    </div>
                  </button>
                );
              })}
            </div>
          ) : null}

          <div className="mt-6">
            {isTransitioning ? (
              <DossierSkeletonLoader />
            ) : !selectedDossier ? (
              <div className="rounded-3xl border border-white/[0.08] bg-[#121215] p-10 text-center">
                <h3 className="text-xl font-semibold text-white">
                  Sin expedientes coincidentes para el filtro seleccionado
                </h3>
                <p className="mt-2 text-sm text-[#9CA3AF] max-w-md mx-auto">
                  Restablece los parámetros para inspeccionar el archivo completo de casos demostrativos.
                </p>
                <div className="mt-5">
                  <Button variant="primary" size="md" onClick={resetFilters}>
                    <Icon name="refresh" size={16} />
                    <span>Mostrar todos</span>
                  </Button>
                </div>
              </div>
            ) : (
              <ActiveDossierSheet dossier={selectedDossier} />
            )}
          </div>
        </SectionReveal>

        {/* Frequently Asked Questions Section matching Reference Image 1 */}
        <SectionReveal delayMs={160}>
          <div id="preguntas-frecuentes" className="mt-28 mx-auto max-w-2xl">
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">
                Preguntas Frecuentes
              </h2>
              <p className="mt-3 text-sm text-[#9CA3AF]">
                Todo lo que necesitas saber sobre nuestra metodología de intervención y analítica operativa.
              </p>
            </div>

            <div className="mt-10 space-y-3">
              {FAQ_ITEMS.map((faq, idx) => {
                const isOpen = openFaqIdx === idx;
                return (
                  <div
                    key={faq.q}
                    className={`rounded-2xl border transition-all duration-200 ${
                      isOpen
                        ? 'copper-card-glow border-white/[0.15] p-5'
                        : 'border-white/[0.08] bg-[#121215] px-5 py-4 hover:border-white/[0.15]'
                    }`}
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenFaqIdx(isOpen ? -1 : idx)}
                      className="flex w-full items-center justify-between gap-4 text-left cursor-pointer"
                    >
                      <span className="text-sm sm:text-base font-medium text-white">
                        {faq.q}
                      </span>
                      <span
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs transition-colors ${
                          isOpen
                            ? 'bg-white text-[#09090B]'
                            : 'bg-white/[0.07] text-[#A1A1AA]'
                        }`}
                      >
                        <Icon name={isOpen ? 'close' : 'plus'} size={13} />
                      </span>
                    </button>
                    {isOpen ? (
                      <p className="mt-3 text-xs sm:text-sm text-[#A1A1AA] leading-relaxed pr-8">
                        {faq.a}
                      </p>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
