'use client';

import { useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import { formatMillionsMxn } from '@/lib/formatters';
import type { CaseStudyDossier } from '@/lib/types';

export interface ActiveDossierSheetProps {
  readonly dossier: CaseStudyDossier;
}

export function ActiveDossierSheet({ dossier }: ActiveDossierSheetProps) {
  const [activeMilestoneIdx, setActiveMilestoneIdx] = useState<number>(0);

  return (
    <div className="rounded-3xl border border-white/[0.08] bg-[#121215] p-6 sm:p-8 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.85)]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7">
          <h3 className="text-xl sm:text-2xl font-semibold text-white leading-snug">
            {dossier.title}
          </h3>
          <div className="mt-2.5 flex flex-wrap items-center gap-3 text-xs font-mono text-[#F27427]">
            <span className="rounded-lg border border-[#F27427]/40 bg-[#F27427]/10 px-2.5 py-0.5">
              {dossier.registryCode}
            </span>
            <span className="text-[#71717A]">·</span>
            <span className="text-[#D4D4D8]">{dossier.practiceLabel}</span>
          </div>
          <p className="mt-3 text-xs text-[#9CA3AF]">
            {dossier.clientProfile}
          </p>
          <p className="mt-4 text-sm sm:text-base text-[#D4D4D8] leading-relaxed">
            {dossier.contextSummary}
          </p>

          <div className="mt-7 border-t border-white/[0.08] pt-5">
            <h4 className="text-sm font-semibold text-white">
              Bitácora de Ejecución en Campo ({dossier.interventionWeeks} Semanas)
            </h4>
            <div className="mt-3 space-y-2.5">
              {dossier.milestones.map((m, idx) => {
                const isExpanded = idx === activeMilestoneIdx;
                return (
                  <button
                    key={m.weekRange}
                    type="button"
                    onClick={() => setActiveMilestoneIdx(idx)}
                    onMouseEnter={() => setActiveMilestoneIdx(idx)}
                    className={`w-full rounded-2xl border p-4 text-left transition-all duration-200 cursor-pointer ${
                      isExpanded
                        ? 'copper-card-glow border-[#F27427]/60'
                        : 'border-white/[0.07] bg-[#09090B] hover:border-white/[0.16]'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-mono text-xs font-bold text-[#F27427]">
                        {m.weekRange}
                      </span>
                      <span className="text-xs font-semibold text-white">
                        {m.title}
                      </span>
                    </div>
                    <p className="text-xs text-[#A1A1AA] mt-2 leading-relaxed">
                      {m.fieldAction}
                    </p>
                    <div className="mt-2 flex items-center gap-1.5 text-xs font-medium text-[#22C55E]">
                      <Icon name="check" size={14} />
                      <span>{m.verifiableOutput}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 rounded-2xl bg-[#09090B] border border-white/[0.08] p-5 sm:p-6">
          <h4 className="text-base font-semibold text-white">
            Conciliación Operativa y P&amp;L
          </h4>
          <p className="mt-1 text-xs text-[#9CA3AF]">
            Ingresos base auditados: {formatMillionsMxn(dossier.baselineRevenueMxn)}
          </p>

          <div className="mt-5 space-y-3 text-xs tabular-nums">
            {dossier.auditLedger.map((row) => (
              <div
                key={row.metric}
                className="rounded-xl border border-white/[0.07] bg-[#141417] p-3.5 hover:border-[#F27427]/40 transition-colors"
              >
                <div className="flex items-center justify-between gap-2 font-semibold text-white">
                  <span>{row.metric}</span>
                  <span className="font-mono font-bold text-[#22C55E]">
                    {row.delta}
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between text-xs text-[#9CA3AF]">
                  <span>Previo: {row.before}</span>
                  <span className="text-white font-semibold">
                    Auditado: {row.after}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t border-white/[0.08] pt-4 flex items-center justify-between text-xs">
            <span className="text-[#9CA3AF]">EFECTIVO LIBERADO:</span>
            <span className="text-base font-bold text-[#F27427] tabular-nums">
              +{formatMillionsMxn(dossier.cashReleasedMxn)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
