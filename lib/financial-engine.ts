import { simulatorInputSchema } from '@/lib/schemas';
import type {
  CascadeBridgeRow,
  CascadeSimulationResult,
  IndustrySector,
  SimulatorInput,
} from '@/lib/types';

const SECTOR_BENCHMARKS: Record<
  IndustrySector,
  {
    readonly targetOeePct: number;
    readonly cogsRatio: number;
    readonly logisticsWeight: number;
    readonly targetCashDays: number;
  }
> = {
  manufactura: {
    targetOeePct: 84,
    cogsRatio: 0.64,
    logisticsWeight: 0.08,
    targetCashDays: 42,
  },
  logistica: {
    targetOeePct: 86,
    cogsRatio: 0.58,
    logisticsWeight: 0.22,
    targetCashDays: 35,
  },
  agroindustria: {
    targetOeePct: 81,
    cogsRatio: 0.68,
    logisticsWeight: 0.12,
    targetCashDays: 48,
  },
  energia: {
    targetOeePct: 88,
    cogsRatio: 0.54,
    logisticsWeight: 0.07,
    targetCashDays: 38,
  },
  consumo: {
    targetOeePct: 85,
    cogsRatio: 0.61,
    logisticsWeight: 0.14,
    targetCashDays: 36,
  },
};

export function computeEbitdaCascade(rawInput: SimulatorInput): CascadeSimulationResult {
  const parsed = simulatorInputSchema.safeParse(rawInput);
  const input: SimulatorInput = parsed.success
    ? parsed.data
    : {
        annualRevenueMxn: 1200,
        currentEbitdaMarginPct: 13.5,
        plantOeePct: 64,
        scrapRatePct: 4.8,
        cashConversionDays: 78,
        sector: 'manufactura',
      };

  const bench = SECTOR_BENCHMARKS[input.sector];
  const revenue = input.annualRevenueMxn;
  const baselineEbitdaMxn = Number(
    ((revenue * input.currentEbitdaMarginPct) / 100).toFixed(2)
  );
  const estimatedCogsMxn = revenue * bench.cogsRatio;

  // 1. OEE Capacity & Fixed-Cost Absorption Recovery
  const oeeGapPct = Math.max(0, bench.targetOeePct - input.plantOeePct);
  const oeeRecoveryMxn = Number(
    (estimatedCogsMxn * (oeeGapPct * 0.0021)).toFixed(2)
  );
  const oeeBps = Math.round((oeeRecoveryMxn / revenue) * 10000);

  // 2. Scrap, Rework & Material Yield Compression (linked to OEE & Scrap)
  const recoverableScrapPct = Math.max(0, (input.scrapRatePct - 1.2) * 0.58);
  const scrapSavingsMxn = Number(
    (estimatedCogsMxn * (recoverableScrapPct / 100)).toFixed(2)
  );
  const scrapBps = Math.round((scrapSavingsMxn / revenue) * 10000);

  // 3. Logistics, Shift Overtime & SG&A Structural Discipline
  const structuralEfficiencyRatio =
    bench.logisticsWeight * 0.11 + (oeeGapPct > 10 ? 0.0065 : 0.0035);
  const sgaLogisticsSavingsMxn = Number(
    (revenue * structuralEfficiencyRatio).toFixed(2)
  );
  const sgaBps = Math.round((sgaLogisticsSavingsMxn / revenue) * 10000);

  // 4. Commercial Mix & Pricing Leakage Audit
  const pricingRecoveryMxn = Number((revenue * 0.0085).toFixed(2));
  const pricingBps = Math.round((pricingRecoveryMxn / revenue) * 10000);

  const totalExpansionMxn = Number(
    (
      oeeRecoveryMxn +
      scrapSavingsMxn +
      sgaLogisticsSavingsMxn +
      pricingRecoveryMxn
    ).toFixed(2)
  );
  const projectedEbitdaMxn = Number(
    (baselineEbitdaMxn + totalExpansionMxn).toFixed(2)
  );
  const projectedMarginPct = Number(
    ((projectedEbitdaMxn / revenue) * 100).toFixed(2)
  );
  const totalExpansionBps = Math.round((totalExpansionMxn / revenue) * 10000);

  // Linked Working Capital Liberation (Days reduction * daily COGS/Revenue)
  const excessCashDays = Math.max(4, input.cashConversionDays - bench.targetCashDays);
  const releasedWorkingCapitalMxn = Number(
    (((revenue * 0.72) / 365) * (excessCashDays * 0.45)).toFixed(2)
  );

  const estimatedPaybackWeeks = Math.max(
    6,
    Math.min(18, Math.round(110 / Math.max(1, totalExpansionBps / 45)))
  );

  const step1Projected = Number((baselineEbitdaMxn + oeeRecoveryMxn).toFixed(2));
  const step2Projected = Number((step1Projected + scrapSavingsMxn).toFixed(2));
  const step3Projected = Number((step2Projected + sgaLogisticsSavingsMxn).toFixed(2));

  const rows: readonly CascadeBridgeRow[] = [
    {
      id: 'ebitda-base',
      code: 'L-100',
      concept: 'EBITDA Base Auditado (LTM)',
      driverLabel: `Margen actual ${input.currentEbitdaMarginPct.toFixed(1)}% sobre ventas`,
      baselineMxn: baselineEbitdaMxn,
      deltaMxn: 0,
      projectedMxn: baselineEbitdaMxn,
      impactBps: Math.round(input.currentEbitdaMarginPct * 100),
      category: 'base',
    },
    {
      id: 'oee-absorption',
      code: 'L-210',
      concept: 'Absorción Fija y Desbloqueo OEE en Planta',
      driverLabel: `Convergencia OEE ${input.plantOeePct}% → ${Math.min(bench.targetOeePct, input.plantOeePct + Math.round(oeeGapPct * 0.75))}%`,
      baselineMxn: baselineEbitdaMxn,
      deltaMxn: oeeRecoveryMxn,
      projectedMxn: step1Projected,
      impactBps: oeeBps,
      category: 'expansion',
    },
    {
      id: 'scrap-yield',
      code: 'L-220',
      concept: 'Compresión de Merma y Retrabajo Industrial',
      driverLabel: `Reducción de desperdicio (${input.scrapRatePct.toFixed(1)}% actual)`,
      baselineMxn: step1Projected,
      deltaMxn: scrapSavingsMxn,
      projectedMxn: step2Projected,
      impactBps: scrapBps,
      category: 'expansion',
    },
    {
      id: 'supply-sga',
      code: 'L-230',
      concept: 'Reingeniería de Turnos, Fletes y Gasto SG&A',
      driverLabel: `Ciclo conversión ${input.cashConversionDays}d → ${Math.round(input.cashConversionDays - excessCashDays * 0.45)}d`,
      baselineMxn: step2Projected,
      deltaMxn: sgaLogisticsSavingsMxn,
      projectedMxn: step3Projected,
      impactBps: sgaBps,
      category: 'expansion',
    },
    {
      id: 'pricing-leakage',
      code: 'L-240',
      concept: 'Clausura de Fugas en Descuentos y Mix Comercial',
      driverLabel: 'Auditoría de rentabilidad por SKU / cliente',
      baselineMxn: step3Projected,
      deltaMxn: pricingRecoveryMxn,
      projectedMxn: projectedEbitdaMxn,
      impactBps: pricingBps,
      category: 'expansion',
    },
    {
      id: 'ebitda-target',
      code: 'L-900',
      concept: 'EBITDA Proyectado Post-Intervención (Run-Rate)',
      driverLabel: `Margen objetivo ${projectedMarginPct.toFixed(2)}% (+${totalExpansionBps} bps)`,
      baselineMxn: baselineEbitdaMxn,
      deltaMxn: totalExpansionMxn,
      projectedMxn: projectedEbitdaMxn,
      impactBps: Math.round(projectedMarginPct * 100),
      category: 'target',
    },
  ];

  return {
    baselineEbitdaMxn,
    projectedEbitdaMxn,
    totalExpansionMxn,
    projectedMarginPct,
    totalExpansionBps,
    releasedWorkingCapitalMxn,
    estimatedPaybackWeeks,
    rows,
  };
}
